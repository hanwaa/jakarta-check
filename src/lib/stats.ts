"use client";

import { getEvents, getSessionId } from "./analytics";

export interface LiveStats {
  learners: number;
  checks: number;
  challengers: number;
}

export function getLocalStats(): LiveStats {
  const events = getEvents();
  const sessions = new Set<string>();
  let checks = 0;
  let challengers = 0;

  for (const e of events) {
    sessions.add(e.sessionId);
    if (e.name === "fact_check_completed" || e.name === "lesson_completed") checks += 1;
    if (e.name === "challenge_completed") challengers += 1;
  }

  return { learners: sessions.size, checks, challengers };
}

export async function fetchGlobalStats(): Promise<LiveStats | null> {
  try {
    const res = await fetch("/api/stats", { cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as Partial<LiveStats>;
    return {
      learners: Number(data.learners ?? 0),
      checks: Number(data.checks ?? 0),
      challengers: Number(data.challengers ?? 0),
    };
  } catch {
    return null;
  }
}

export async function pushGlobalStat(name: string): Promise<void> {
  try {
    await fetch("/api/stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, sessionId: getSessionId() }),
      keepalive: true,
    });
  } catch {
    // offline — stat will be missed silently
  }
}
