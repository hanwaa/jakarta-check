"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CHALLENGE_POOL } from "@/lib/content";
import { track } from "@/lib/analytics";
import { recordChallenge } from "@/lib/store";
import { Card } from "@/components/ui";
import { EmojiIcon } from "@/components/icons";

type Phase = "intro" | "play" | "done";

const QUESTIONS_COUNT = 5;
const TIME_LIMIT_SECONDS = 60;

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function ChallengeRunner() {
  const searchParams = useSearchParams();
  const autostart = searchParams.get("autostart") === "1";

  const questions = useMemo(() => shuffle(CHALLENGE_POOL).slice(0, QUESTIONS_COUNT), []);
  const [phase, setPhase] = useState<Phase>(autostart ? "play" : "intro");
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT_SECONDS);
  const [finished, setFinished] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    if (phase !== "play" || finished) return;
    const t = window.setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 1) {
          window.clearInterval(t);
          setFinished(true);
          setPhase("done");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(t);
  }, [phase, finished]);

  const start = () => {
    track("challenge_started", {});
    setPhase("play");
  };

  const pick = (i: number) => {
    if (answer !== null || finished) return;
    setAnswer(i);
    const ok = i === questions[idx].correct;
    track("quiz_answered", { mode: "challenge", correct: ok });
    if (ok) setCorrectCount((c) => c + 1);
  };

  const next = () => {
    if (idx + 1 >= QUESTIONS_COUNT) {
      track("challenge_completed", { score: correctCount });
      recordChallenge();
      setPhase("done");
    } else {
      setIdx((i) => i + 1);
      setAnswer(null);
    }
  };

  const shareText = `I scored ${correctCount}/${QUESTIONS_COUNT} on JAKARTA CHECK! Can you spot the hoax? THINK BEFORE YOU SHARE.`;

  const share = async () => {
    track("challenge_shared", { score: correctCount });
    try {
      if (navigator.share) {
        await navigator.share({ title: "JAKARTA CHECK!", text: shareText, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
      }
      setShared(true);
    } catch {
      setShared(false);
    }
  };

  if (phase === "intro") {
    return (
      <div className="jc-zone jc-zone-quiz zone-quiz">
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
          <div className="rounded-3xl border border-orange-500/25 bg-[#1f1005]/90 p-8 text-center shadow-xl shadow-black/40">
            <span className="inline-flex text-orange-400" aria-hidden>
              <EmojiIcon e="🏁" size={52} />
            </span>
            <h1 className="mt-4 font-display text-3xl font-black tracking-tight text-white sm:text-4xl">
              CAN YOU SPOT THE HOAX?
            </h1>
            <p className="mx-auto mt-3 max-w-md text-slate-400">
              {QUESTIONS_COUNT} pertanyaan cepat. {TIME_LIMIT_SECONDS} detik. Jawab sebaik mungkin dan bagikan skormu.
            </p>
            <button
              type="button"
              onClick={start}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#c2410c] to-[#f97316] px-8 py-4 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg shadow-black/40 transition hover:brightness-110"
            >
              START →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "done") {
    const pct = Math.round((correctCount / QUESTIONS_COUNT) * 100);
    return (
      <div className="jc-zone jc-zone-quiz zone-quiz">
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
          <div className="jc-pop rounded-3xl border border-emerald-500/30 bg-emerald-950/40 p-8 text-center shadow-xl shadow-black/40">
            <span className="inline-flex text-amber-400" aria-hidden>
              <EmojiIcon e={pct >= 80 ? "🏆" : pct >= 60 ? "💪" : "📚"} size={52} />
            </span>
            <h1 className="mt-4 font-display text-3xl font-black text-emerald-300">Challenge Selesai!</h1>
            <p className="mt-2 font-display text-4xl font-black text-white">
              {correctCount}/{QUESTIONS_COUNT}
            </p>
            <p className="mt-2 text-sm text-slate-400">+30 XP · THINK BEFORE YOU SHARE.</p>

            <div className="mx-auto mt-6 max-w-md rounded-2xl border border-line bg-surface p-4 text-left">
              <p className="text-sm italic text-slate-300">{shareText}</p>
            </div>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={share}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#c2410c] to-[#f97316] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:brightness-110"
              >
                {shared ? "✓ Tersalin / Dibagikan" : "Share Result"}
              </button>
              <Link
                href="/challenge"
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center rounded-xl border border-line bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-wide text-slate-200 transition hover:border-slate-500"
              >
                Coba Challenge Lagi
              </Link>
            </div>
            <Link href="/" className="mt-4 inline-block text-sm font-semibold text-slate-500 hover:text-white">
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[idx];

  return (
    <div className="jc-zone jc-zone-quiz zone-quiz">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Pertanyaan {idx + 1} dari {QUESTIONS_COUNT}
          </p>
          <p
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black ${
              timeLeft <= 15
                ? "bg-red-500/15 text-red-300 ring-1 ring-red-500/40"
                : "bg-orange-500/15 text-orange-300 ring-1 ring-orange-500/40"
            }`}
            role="timer"
            aria-label={`Sisa waktu ${timeLeft} detik`}
          >
            <EmojiIcon e="⏱" size={14} className="shrink-0" /> {timeLeft}s
          </p>
        </div>

        <Card className="border-orange-500/20">
          <p className="text-lg font-bold leading-snug text-white sm:text-xl">{q.question}</p>
          <div className="mt-5 space-y-2.5">
            {q.options.map((opt, i) => {
              const answered = answer !== null;
              const isCorrect = i === q.correct;
              const isPicked = answer === i;
              const cls = answered
                ? isCorrect
                  ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-200"
                  : isPicked
                    ? "border-red-500/50 bg-red-500/10 text-red-200"
                    : "border-line text-slate-500"
                : "border-line bg-surface-2/60 text-slate-200 hover:border-orange-400/60 hover:bg-orange-500/10";
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
              <p className={`font-bold ${answer === q.correct ? "text-emerald-300" : "text-red-300"}`}>
                {answer === q.correct ? "Benar!" : "Coba cek lagi — jangan berkecil hati."}
              </p>
              <p className="mt-1 text-sm text-slate-300">{q.explanation}</p>
              <button
                type="button"
                onClick={next}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#c2410c] to-[#f97316] px-5 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:brightness-110"
              >
                {idx + 1 >= QUESTIONS_COUNT ? "Lihat Skor" : "Berikutnya"} →
              </button>
            </div>
          )}
        </Card>

        <div className="mt-4">
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#c2410c] to-[#f97316] transition-all"
              style={{ width: `${(timeLeft / TIME_LIMIT_SECONDS) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
