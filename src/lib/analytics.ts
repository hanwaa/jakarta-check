"use client";

export type EventName =
  | "page_view"
  | "hero_cta_click"
  | "fact_check_started"
  | "fact_check_completed"
  | "academy_level_started"
  | "academy_level_completed"
  | "lesson_started"
  | "lesson_completed"
  | "quiz_started"
  | "quiz_answered"
  | "quiz_completed"
  | "detective_case_started"
  | "detective_evidence_viewed"
  | "detective_clue_unlocked"
  | "detective_case_completed"
  | "challenge_started"
  | "challenge_completed"
  | "challenge_shared"
  | "badge_unlocked"
  | "external_tool_clicked";

export interface AnalyticsEvent {
  name: EventName;
  props?: Record<string, string | number | boolean>;
  ts: number;
  sessionId: string;
}

const EVENTS_KEY = "jc_analytics_events";
const SESSION_KEY = "jc_session_id";

export function getSessionId(): string {
  if (typeof window === "undefined") return "server";
  try {
    let id = window.sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      window.sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return "unknown";
  }
}

export function track(name: EventName, props?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  const event: AnalyticsEvent = {
    name,
    props,
    ts: Date.now(),
    sessionId: getSessionId(),
  };
  try {
    const raw = window.localStorage.getItem(EVENTS_KEY);
    const events: AnalyticsEvent[] = raw ? JSON.parse(raw) : [];
    events.push(event);
    // cap at 2000 events to avoid storage overflow
    if (events.length > 2000) events.splice(0, events.length - 2000);
    window.localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  } catch {
    // storage unavailable — ignore
  }
  if (process.env.NODE_ENV === "development") {
    console.info("[analytics]", name, props ?? {});
  }
}

export function getEvents(): AnalyticsEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(EVENTS_KEY);
    return raw ? (JSON.parse(raw) as AnalyticsEvent[]) : [];
  } catch {
    return [];
  }
}
