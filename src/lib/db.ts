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

function getSql(): SqlClient | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return neon(url) as SqlClient;
}

let schemaReady: Promise<void> | null = null;

function ensureSchema(sql: SqlClient): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS jc_counters (
          key TEXT PRIMARY KEY,
          value BIGINT NOT NULL DEFAULT 0
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS jc_sessions (
          session_id TEXT PRIMARY KEY,
          first_seen TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
    })();
  }
  return schemaReady;
}

export async function getGlobalStats(): Promise<GlobalStats> {
  const sql = getSql();
  if (!sql) return FALLBACK_STATS;
  try {
    await ensureSchema(sql);
    const [rows] = await sql`
      SELECT
        (SELECT count(*) FROM jc_sessions) AS learners,
        COALESCE((SELECT value FROM jc_counters WHERE key = 'checks'), 0) AS checks,
        COALESCE((SELECT value FROM jc_counters WHERE key = 'challengers'), 0) AS challengers
    `;
    return {
      learners: Number(rows?.learners ?? 0),
      checks: Number(rows?.checks ?? 0),
      challengers: Number(rows?.challengers ?? 0),
    };
  } catch (err) {
    console.error("[stats] failed to read", err);
    return FALLBACK_STATS;
  }
}

const CHECK_EVENTS = new Set(["fact_check_completed", "lesson_completed"]);
const CHALLENGE_EVENTS = new Set(["challenge_completed"]);

export async function recordStatEvent(name: string, sessionId: string): Promise<boolean> {
  const sql = getSql();
  if (!sql || !name || !sessionId) return false;
  try {
    await ensureSchema(sql);

    if (name === "page_view") {
      await sql`
        INSERT INTO jc_sessions (session_id)
        VALUES (${sessionId})
        ON CONFLICT (session_id) DO NOTHING
      `;
      return true;
    }

    let key: string | null = null;
    if (CHECK_EVENTS.has(name)) key = "checks";
    else if (CHALLENGE_EVENTS.has(name)) key = "challengers";
    if (!key) return false;

    await sql`
      INSERT INTO jc_counters (key, value)
      VALUES (${key}, 1)
      ON CONFLICT (key) DO UPDATE SET value = jc_counters.value + 1
    `;
    return true;
  } catch (err) {
    console.error("[stats] failed to record", name, err);
    return false;
  }
}
