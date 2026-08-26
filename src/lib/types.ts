export interface Lesson {
  id: string;
  title: string;
  emoji: string;
  minutes: number;
  intro: string;
  points: string[];
  tips: string[];
  takeaway: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface Level {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  emoji: string;
  gradient: string;
  ring: string;
  description: string;
  lessons: Lesson[];
  quiz: QuizQuestion[];
}

export type QuizModeId = "hoax-or-fact" | "red-flag" | "source-battle" | "spot-the-hoax";

export interface QuizMode {
  id: QuizModeId;
  title: string;
  tagline: string;
  emoji: string;
  description: string;
}

export interface QuizItem {
  id: string;
  mode: QuizModeId;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface PostHotspot {
  id: string;
  label: string;
  x: number;
  y: number;
  isFlag: boolean;
  note: string;
}

export interface MockPost {
  id: string;
  platform: string;
  username: string;
  avatarText: string;
  time: string;
  headline: string;
  body: string;
  hotspots: PostHotspot[];
}

export interface SpotPair {
  id: string;
  prompt: string;
  postA: MockPost;
  postB: MockPost;
  differences: [string, string][];
  explanation: string;
}

export interface RedFlagItem {
  id: string;
  prompt: string;
  post: MockPost;
  explanation: string;
}

export type ScoreKey = "source" | "date" | "crosscheck" | "evidence" | "conclusion";

export interface CaseStep {
  id: string;
  phase: string;
  prompt: string;
  options: string[];
  correct: number;
  explanation: string;
  scoreKey: ScoreKey;
  points: number;
}

export interface Evidence {
  label: string;
  reliability: string;
  detail: string;
  isReliable: boolean;
}

export interface DetectiveCase {
  id: string;
  number: string;
  title: string;
  emoji: string;
  scenario: string;
  evidence: Evidence[];
  steps: CaseStep[];
  bonusClue: string;
  scoreKeys: { key: ScoreKey; label: string; max: number }[];
}

export interface Badge {
  id: string;
  emoji: string;
  name: string;
  description: string;
}

export interface ChallengeItem {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface HomeStats {
  learners: number;
  checks: number;
  challengers: number;
}