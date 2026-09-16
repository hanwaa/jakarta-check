import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

export interface GlobalStats {
  learners: number;
  checks: number;
  challengers: number;
}

type SqlClient = NeonQueryFunction<false, false>;

const FALLBACK_STATS: GlobalStats = { learners: 0, checks: 0, challengers: 0 };

export function hasDatabase(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

// Cache neon() instance — jangan buat ulang tiap request
let _sql: SqlClient | null = null;
function getSql(): SqlClient | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!_sql) _sql = neon(url) as SqlClient;
  return _sql;
}

// Schema hanya dibuat sekali per process lifetime
let schemaReady: Promise<void> | null = null;
function ensureSchema(sql: SqlClient): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      // Satu tabel saja: jc_counters
      // key: 'learners' | 'checks' | 'challengers'
      await sql`
        CREATE TABLE IF NOT EXISTS jc_counters (
          key   TEXT PRIMARY KEY,
          value BIGINT NOT NULL DEFAULT 0
        )
      `;
      // Migrate: jika masih ada tabel jc_sessions, pindah count-nya lalu drop
      await sql`
        DO $$
        BEGIN
          IF EXISTS (
            SELECT FROM pg_tables WHERE schemaname='public' AND tablename='jc_sessions'
          ) THEN
            INSERT INTO jc_counters (key, value)
              SELECT 'learners', count(*) FROM jc_sessions
            ON CONFLICT (key) DO UPDATE
              SET value = GREATEST(jc_counters.value, EXCLUDED.value);
            DROP TABLE jc_sessions;
          END IF;
        END $$
      `;
    })();
  }
  return schemaReady;
}

// In-memory cache untuk GET stats — refresh tiap 30 detik
let cachedStats: GlobalStats | null = null;
let cacheExpiry = 0;
const CACHE_TTL_MS = 30_000;

export async function getGlobalStats(): Promise<GlobalStats> {
  const now = Date.now();
  if (cachedStats && now < cacheExpiry) return cachedStats;

  const sql = getSql();
  if (!sql) return FALLBACK_STATS;
  try {
    await ensureSchema(sql);
    const rows = await sql`
      SELECT key, value FROM jc_counters
      WHERE key IN ('learners', 'checks', 'challengers')
    `;
    const map: Record<string, number> = {};
    for (const r of rows) map[r.key as string] = Number(r.value);
    cachedStats = {
      learners: map.learners ?? 0,
      checks: map.checks ?? 0,
      challengers: map.challengers ?? 0,
    };
    cacheExpiry = now + CACHE_TTL_MS;
    return cachedStats;
  } catch (err) {
    console.error("[stats] getGlobalStats error:", err);
    return cachedStats ?? FALLBACK_STATS;
  }
}

const CHECK_EVENTS = new Set(["fact_check_completed", "lesson_completed"]);
const CHALLENGE_EVENTS = new Set(["challenge_completed"]);

// Simple in-memory rate limiter per IP — maks 30 POST/menit per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30;
const RATE_WINDOW_MS = 60_000;

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

export async function recordStatEvent(name: string, sessionId: string): Promise<boolean> {
  const sql = getSql();
  if (!sql || !name || !sessionId) return false;
  try {
    await ensureSchema(sql);

    let key: string | null = null;
    if (name === "page_view") key = "learners";
    else if (CHECK_EVENTS.has(name)) key = "checks";
    else if (CHALLENGE_EVENTS.has(name)) key = "challengers";
    if (!key) return false;

    await sql`
      INSERT INTO jc_counters (key, value)
      VALUES (${key}, 1)
      ON CONFLICT (key) DO UPDATE SET value = jc_counters.value + 1
    `;

    // Invalidasi cache agar GET berikutnya fresh
    cachedStats = null;
    return true;
  } catch (err) {
    console.error("[stats] recordStatEvent error:", err);
    return false;
  }
}
