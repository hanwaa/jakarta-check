import { NextResponse } from "next/server";
import { getGlobalStats, recordStatEvent, hasDatabase } from "@/lib/db";

export async function GET() {
  if (!hasDatabase()) {
    return NextResponse.json({ error: "database_not_configured" }, { status: 503 });
  }
  const stats = await getGlobalStats();
  return NextResponse.json(stats, {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
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
