import { NextResponse } from "next/server";
import { getGlobalStats, recordStatEvent, hasDatabase, checkRateLimit } from "@/lib/db";

// Cache GET 30 detik di Edge/CDN Vercel, stale-while-revalidate 60 detik
// Ini mengurangi 95%+ query ke Neon saat banyak user
export async function GET() {
  if (!hasDatabase()) {
    return NextResponse.json({ error: "database_not_configured" }, { status: 503 });
  }
  const stats = await getGlobalStats();
  return NextResponse.json(stats, {
    headers: {
      "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
      "CDN-Cache-Control": "public, s-maxage=30",
    },
  });
}

export async function POST(request: Request) {
  // Rate limiting sederhana berbasis header IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }

  let body: { name?: unknown; sessionId?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name : "";
  const sessionId = typeof body.sessionId === "string" ? body.sessionId.slice(0, 64) : "";
  const ok = await recordStatEvent(name, sessionId);
  return NextResponse.json({ ok }, { headers: { "Cache-Control": "no-store" } });
}
