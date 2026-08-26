"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { DetectiveCase, ScoreKey } from "@/lib/types";
import { track } from "@/lib/analytics";
import { completeCase, announceBadges } from "@/lib/store";
import { Card, ProgressBar } from "@/components/ui";
import { EmojiIcon } from "@/components/icons";

type Phase = "briefing" | "play" | "done";

const AMBER_BTN =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#854d0e] to-[#f59e0b] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md shadow-black/40 transition hover:brightness-110";

export default function CaseRunner({ caseData }: { caseData: DetectiveCase }) {
  const [phase, setPhase] = useState<Phase>("briefing");
  const [stepIdx, setStepIdx] = useState(0);
  const [attempts, setAttempts] = useState<Record<string, number>>({});
  const [answer, setAnswer] = useState<number | null>(null);
  const [clues, setClues] = useState<string[]>([]);
  const [scoreByKey, setScoreByKey] = useState<Record<ScoreKey, number>>({
    source: 0,
    date: 0,
    crosscheck: 0,
    evidence: 0,
    conclusion: 0,
  });

  // Ref agar skor final selalu memakai nilai terbaru saat kasus diselesaikan.
  const scoreRef = useRef(scoreByKey);
  useEffect(() => {
    scoreRef.current = scoreByKey;
  }, [scoreByKey]);

  const totalScore = useMemo(
    () => Object.values(scoreByKey).reduce((a, b) => a + b, 0),
    [scoreByKey],
  );

  const evidenceViewed = useMemo(() => new Set<string>(), []);

  useEffect(() => {
    track("detective_case_started", { caseId: caseData.id });
  }, [caseData.id]);

  const step = phase === "play" ? caseData.steps[stepIdx] : undefined;

  const pick = (i: number) => {
    if (!step || answer !== null) return;
    setAnswer(i);
    const ok = i === step.correct;
    const attempt = (attempts[step.id] ?? 0) + 1;
    setAttempts((a) => ({ ...a, [step.id]: attempt }));
    track("quiz_answered", { caseId: caseData.id, step: step.id, correct: ok, attempt });

    if (ok) {
      const points = attempt === 1 ? step.points : Math.round(step.points / 2);
      setScoreByKey((s) => ({ ...s, [step.scoreKey]: s[step.scoreKey] + points }));
      if (attempt === 1 && !clues.includes(caseData.bonusClue)) {
        setClues((c) => [...c, caseData.bonusClue]);
        track("detective_clue_unlocked", { caseId: caseData.id });
      }
    }
  };

  const finishCase = () => {
    const finalTotal = Object.values(scoreRef.current).reduce((a, b) => a + b, 0);
    const rounded = Math.round(finalTotal);
    const { newBadges } = completeCase(caseData.id, rounded);
    announceBadges(newBadges);
    track("detective_case_completed", { caseId: caseData.id, score: rounded });
    setPhase("done");
  };

  // Navigasi robust: selalu bisa lanjut, tidak pernah buntu.
  const next = () => {
    if (stepIdx + 1 >= caseData.steps.length) {
      finishCase();
    } else {
      setStepIdx((i) => i + 1);
      setAnswer(null);
    }
  };

  const retry = () => {
    setAnswer(null);
  };

  const correctNow = answer !== null && answer === step?.correct;

  return (
    <div className="jc-zone jc-zone-detective zone-detective">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Link href="/detective" className="text-sm font-semibold text-slate-400 hover:text-white">
          ← Digital Detective
        </Link>

        {phase === "briefing" && (
          <div className="jc-pop mt-6">
            <div className="rounded-3xl border border-amber-500/30 bg-[#1a120b]/90 p-8 shadow-xl shadow-black/40">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400">CASE FILE</p>
              <h1 className="mt-1 flex items-center gap-3 font-display text-3xl font-black tracking-tight text-white">
                <EmojiIcon e={caseData.emoji} size={36} className="shrink-0 text-amber-400" />
                <span>{caseData.title}</span>
              </h1>
              <p className="mt-3 text-slate-300">{caseData.scenario}</p>
            </div>

            <h2 className="mt-8 font-display text-xl font-extrabold text-white">Bukti-bukti</h2>
            <div className="mt-4 space-y-3">
              {caseData.evidence.map((ev) => (
                <button
                  key={ev.label}
                  type="button"
                  onClick={() => {
                    evidenceViewed.add(ev.label);
                    track("detective_evidence_viewed", { caseId: caseData.id, evidence: ev.label });
                  }}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    evidenceViewed.has(ev.label)
                      ? "border-emerald-500/40 bg-emerald-500/10"
                      : "border-line bg-surface/80 hover:border-amber-500/50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-bold text-white">{ev.label}</p>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ring-1 ${
                        ev.isReliable
                          ? "bg-emerald-500/15 text-emerald-300 ring-emerald-500/40"
                          : "bg-red-500/15 text-red-300 ring-red-500/40"
                      }`}
                    >
                      {ev.reliability}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-400">{ev.detail}</p>
                </button>
              ))}
            </div>

            <button type="button" onClick={() => setPhase("play")} className={`${AMBER_BTN} mt-8 w-full py-4`}>
              <EmojiIcon e="🕵️" size={20} className="shrink-0" />
              Mulai Investigasi
            </button>
          </div>
        )}

        {phase === "play" && step && (
          <div className="jc-pop mt-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Langkah {stepIdx + 1} dari {caseData.steps.length} · {step.phase}
              </p>
              <p className="text-xs font-bold text-amber-300">Skor sementara: {totalScore}/100</p>
            </div>

            <Card className="border-amber-500/25">
              <p className="text-lg font-bold leading-snug text-white">{step.prompt}</p>
              <div className="mt-5 space-y-2.5">
                {step.options.map((opt, i) => {
                  const answered = answer !== null;
                  const isCorrect = i === step.correct;
                  const isPicked = answer === i;
                  const cls = answered
                    ? isCorrect
                      ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-200"
                      : isPicked
                        ? "border-red-500/50 bg-red-500/10 text-red-200"
                        : "border-line text-slate-500"
                    : "border-line bg-surface-2/60 text-slate-200 hover:border-amber-400/60 hover:bg-amber-500/10";
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => pick(i)}
                      disabled={answered}
                      className={`w-full rounded-xl border-2 p-3.5 text-left text-base font-semibold transition ${cls}`}
                    >
                      {answered && isCorrect && (
                        <EmojiIcon e="✅" size={16} className="mr-1 inline text-emerald-400" />
                      )}
                      {answered && isPicked && !isCorrect && (
                        <EmojiIcon e="❌" size={16} className="mr-1 inline text-red-400" />
                      )}
                      {opt}
                    </button>
                  );
                })}
              </div>

              {answer !== null && (
                <div className="jc-pop mt-4 rounded-xl border border-line bg-surface p-4">
                  {correctNow ? (
                    <div>
                      <p className="flex items-center gap-1.5 font-bold text-emerald-300">
                        {(attempts[step.id] ?? 0) === 1 ? (
                          <>
                            <EmojiIcon e="🔓" size={16} className="shrink-0" /> BENAR! +{step.points} poin
                          </>
                        ) : (
                          <>Benar (setelah dicoba lagi) +{Math.round(step.points / 2)} poin</>
                        )}
                      </p>
                      <p className="mt-1 text-sm text-slate-300">{step.explanation}</p>
                      {(attempts[step.id] ?? 0) === 1 && clues.length > 0 && stepIdx === 0 && (
                        <div className="mt-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3">
                          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-300">
                            <EmojiIcon e="🔓" size={14} className="shrink-0" /> CLUE UNLOCKED
                          </p>
                          <p className="mt-1 text-sm text-slate-300">{caseData.bonusClue}</p>
                        </div>
                      )}
                      <button type="button" onClick={next} className={`${AMBER_BTN} mt-4`}>
                        {stepIdx + 1 >= caseData.steps.length ? "Selesaikan Kasus" : "Langkah Berikutnya"} →
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="font-bold text-amber-300">NOT QUITE.</p>
                      <p className="mt-1 text-sm text-slate-300">
                        Pilihan itu memiliki reliabilitas lebih rendah: {step.explanation}
                      </p>
                      {/* Dua jalan keluar — pengguna tidak pernah buntu */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={retry}
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white/5 px-5 py-3 text-sm font-bold uppercase tracking-wide text-slate-200 transition hover:border-amber-400"
                        >
                          Coba Lagi
                        </button>
                        <button type="button" onClick={next} className={AMBER_BTN}>
                          {stepIdx + 1 >= caseData.steps.length ? "Selesaikan Kasus (tanpa poin langkah ini)" : "Lanjut ke Langkah Berikutnya"} →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>

            {clues.length > 0 && stepIdx > 0 && (
              <div className="mt-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-300">Clue kamu</p>
                <p className="mt-1 text-sm text-slate-300">{caseData.bonusClue}</p>
              </div>
            )}

            <div className="mt-6">
              <ProgressBar value={stepIdx} max={caseData.steps.length} color="bg-gradient-to-r from-[#854d0e] to-[#f59e0b]" />
            </div>
          </div>
        )}

        {phase === "done" && (
          <div className="jc-pop mt-6">
            <div className="rounded-3xl border border-emerald-500/30 bg-emerald-950/40 p-8 text-center shadow-xl shadow-black/40">
              <span className="inline-flex text-amber-400" aria-hidden>
                <EmojiIcon e="🎉" size={64} />
              </span>
              <h1 className="mt-4 font-display text-3xl font-black text-emerald-300">CASE SOLVED!</h1>
              <p className="mt-1 text-sm font-bold uppercase tracking-widest text-amber-400">{caseData.number}</p>
              <p className="mt-3 font-display text-4xl font-black text-white">
                Digital Detective Score: {Math.round(totalScore)}/100
              </p>
              <p className="mt-2 text-sm text-slate-400">+50 XP · {caseData.title}</p>
            </div>

            <Card className="mt-6 border-amber-500/25">
              <h2 className="font-display text-lg font-extrabold text-white">Rincian skor</h2>
              <div className="mt-4 space-y-3">
                {caseData.scoreKeys.map((sk) => {
                  const got = scoreByKey[sk.key];
                  const pct = sk.max > 0 ? Math.round((got / sk.max) * 100) : 0;
                  return (
                    <div key={sk.key}>
                      <div className="flex items-center justify-between text-sm">
                        <p className="font-semibold text-slate-300">{sk.label}</p>
                        <p className="font-bold text-white">
                          {got}/{sk.max}
                        </p>
                      </div>
                      <div className="mt-1">
                        <ProgressBar
                          value={got}
                          max={sk.max}
                          color={
                            pct >= 80
                              ? "bg-emerald-500"
                              : pct >= 50
                                ? "bg-gradient-to-r from-[#854d0e] to-[#f59e0b]"
                                : "bg-red-500"
                          }
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/detective" className={AMBER_BTN}>
                Kasus Lainnya
              </Link>
              <Link
                href="/progress"
                className="inline-flex items-center justify-center rounded-xl border border-line bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-wide text-slate-200 transition hover:border-slate-500"
              >
                Lihat Progres
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
