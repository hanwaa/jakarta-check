"use client";

import { useSyncExternalStore } from "react";
import { BADGES, XP_RULES } from "./content";
import { pushGlobalStat } from "./stats";

export interface UserState {
  xp: number;
  badges: string[];
  completedLessons: string[];
  completedLevels: string[];
  completedQuizzes: string[];
  completedCases: string[];
  caseScores: Record<string, number>;
  quizScores: Record<string, number>;
  factChecks: number;
  challenges: number;
}

const KEY = "jc_user_state_v1";

const DEFAULT_STATE: UserState = {
  xp: 0,
  badges: [],
  completedLessons: [],
  completedLevels: [],
  completedQuizzes: [],
  completedCases: [],
  caseScores: {},
  quizScores: {},
  factChecks: 0,
  challenges: 0,
};

function read(): UserState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return DEFAULT_STATE;
    return { ...DEFAULT_STATE, ...(JSON.parse(raw) as Partial<UserState>) };
  } catch {
    return DEFAULT_STATE;
  }
}

let cachedState: UserState | null = null;

function getCached(): UserState {
  if (!cachedState) cachedState = read();
  return cachedState;
}

function write(state: UserState) {
  if (typeof window === "undefined") return;
  cachedState = state;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
    window.dispatchEvent(new Event("jc-store-change"));
  } catch {
    // storage unavailable — ignore
  }
}

function subscribeStore(cb: () => void): () => void {
  const handler = () => {
    cachedState = read();
    cb();
  };
  if (typeof window === "undefined") return () => {};
  window.addEventListener("jc-store-change", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("jc-store-change", handler);
    window.removeEventListener("storage", handler);
  };
}

export function useUserState(): UserState {
  return useSyncExternalStore(subscribeStore, getCached, () => DEFAULT_STATE);
}

export function announceBadges(newBadges: string[]) {
  if (typeof window === "undefined") return;
  for (const id of newBadges) {
    window.dispatchEvent(new CustomEvent("jc-badge-unlock", { detail: id }));
  }
}

function update(mutator: (state: UserState) => void): UserState {
  const state = getCached();
  mutator(state);
  write(state);
  return state;
}

function checkBadges(state: UserState): string[] {
  const earned = new Set(state.badges);
  const level1Done = state.completedLevels.includes("level-1");
  const level3Done = state.completedLevels.includes("level-3");
  const level4Done = state.completedLevels.includes("level-4");
  const academyDone = state.completedLevels.length >= 4;
  const hasCase = state.completedCases.length >= 1;
  const hasSourceCheck = state.completedLessons.includes("l3-1");

  const requirements: Record<string, boolean> = {
    "stop-and-think": level1Done,
    "source-hunter": hasSourceCheck,
    "digital-detective": hasCase,
    "fact-checker": level3Done,
    "ai-spotter": level4Done,
    "hoax-buster": academyDone,
  };

  const unlocked: string[] = [];
  for (const badge of BADGES) {
    if (requirements[badge.id] && !earned.has(badge.id)) {
      earned.add(badge.id);
      unlocked.push(badge.id);
    }
  }
  state.badges = Array.from(earned);
  if (unlocked.length > 0) write(state);
  return unlocked;
}

export function getState(): UserState {
  return getCached();
}

export function addXp(amount: number): UserState {
  return update((s) => {
    s.xp += amount;
  });
}

export function completeLesson(lessonId: string): { state: UserState; newBadges: string[] } {
  const state = update((s) => {
    if (!s.completedLessons.includes(lessonId)) {
      s.completedLessons.push(lessonId);
      s.xp += XP_RULES.lesson;
      void pushGlobalStat("lesson_completed");
    }
  });
  const newBadges = checkBadges(state);
  return { state, newBadges };
}

export function completeLevel(levelId: string): { state: UserState; newBadges: string[] } {
  const state = update((s) => {
    if (!s.completedLevels.includes(levelId)) {
      s.completedLevels.push(levelId);
      s.xp += XP_RULES.quiz;
    }
  });
  const newBadges = checkBadges(state);
  return { state, newBadges };
}

export function completeQuiz(quizId: string, score: number): { state: UserState; newBadges: string[] } {
  const state = update((s) => {
    if (!s.completedQuizzes.includes(quizId)) {
      s.completedQuizzes.push(quizId);
      s.xp += XP_RULES.quiz;
    }
    s.quizScores[quizId] = Math.max(score, s.quizScores[quizId] ?? 0);
  });
  const newBadges = checkBadges(state);
  return { state, newBadges };
}

export function completeCase(caseId: string, score: number): { state: UserState; newBadges: string[] } {
  const state = update((s) => {
    if (!s.completedCases.includes(caseId)) {
      s.completedCases.push(caseId);
      s.xp += XP_RULES.case;
    }
    s.caseScores[caseId] = Math.max(score, s.caseScores[caseId] ?? 0);
  });
  const newBadges = checkBadges(state);
  return { state, newBadges };
}

export function recordFactCheck(): UserState {
  return update((s) => {
    s.factChecks += 1;
    s.xp += XP_RULES.factCheck;
  });
}

export function recordChallenge(): UserState {
  void pushGlobalStat("challenge_completed");
  return update((s) => {
    s.challenges += 1;
    s.xp += XP_RULES.challenge;
  });
}

export function resetProgress(): UserState {
  cachedState = DEFAULT_STATE;
  write(DEFAULT_STATE);
  return DEFAULT_STATE;
}

export function getBadgeInfo(badgeId: string) {
  return BADGES.find((b) => b.id === badgeId);
}

const BADGE_REQUIREMENTS: Record<string, string> = {
  "stop-and-think": "Selesaikan Level 1 — Kenalan dengan Hoaks.",
  "source-hunter": "Selesaikan langkah Check Source di halaman Cek Fakta.",
  "digital-detective": "Selesaikan satu kasus investigasi di Digital Detective.",
  "fact-checker": "Selesaikan Level 3 — Become a Fact Checker.",
  "ai-spotter": "Selesaikan Level 4 — Mengenali AI & Deepfake.",
  "hoax-buster": "Selesaikan seluruh level Antihoax Academy.",
};

export function getBadgeRequirement(badgeId: string): string {
  return BADGE_REQUIREMENTS[badgeId] ?? "Selesaikan aktivitas untuk membuka badge ini.";
}
