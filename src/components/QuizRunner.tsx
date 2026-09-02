"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { QuizModeId } from "@/lib/types";
import { QUIZ_ITEMS, QUIZ_MODES, RED_FLAG_ITEMS, SPOT_PAIRS } from "@/lib/content";
import { track } from "@/lib/analytics";
import { completeQuiz, announceBadges } from "@/lib/store";
import MockPostView from "./quiz/MockPostView";
import { Card } from "@/components/ui";
import { EmojiIcon } from "@/components/icons";

type Phase = "intro" | "play" | "done";

const ORANGE_BTN =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#c2410c] to-[#f97316] px-5 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md shadow-black/40 transition hover:brightness-110";

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function QuizRunner({ mode }: { mode: QuizModeId }) {
  const meta = QUIZ_MODES.find((m) => m.id === mode) ?? QUIZ_MODES[0];
  const items = useMemo(() => shuffle(QUIZ_ITEMS.filter((q) => q.mode === mode)), [mode]);
  const redFlagList = useMemo(() => shuffle(RED_FLAG_ITEMS), []);
  const spotPairList = useMemo(() => shuffle(SPOT_PAIRS), []);

  const [phase, setPhase] = useState<Phase>("intro");
  const [idx, setIdx] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);

  // choice-based (hoax-or-fact, source-battle)
  const [choice, setChoice] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  // red-flag state
  const [flagFound, setFlagFound] = useState<Set<string>>(new Set());
  const [flagWrongNote, setFlagWrongNote] = useState<string | null>(null);
  const [flagScore, setFlagScore] = useState(0);

  // spot-the-hoax state
  const [selA, setSelA] = useState<string | null>(null);
  const [selB, setSelB] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [spotWrong, setSpotWrong] = useState<[string, string] | null>(null);
  const [spotScore, setSpotScore] = useState(0);

  const start = () => {
    track("quiz_started", { mode });
    setPhase("play");
  };

  const finish = (score: number, total: number) => {
    track("quiz_completed", { mode, score, total });
    const { newBadges } = completeQuiz(mode, Math.round((score / total) * 100));
    announceBadges(newBadges);
    setFinalScore(score);
    setFinalTotal(total);
    setPhase("done");
  };

  // ---------- choice modes ----------
  const isChoiceMode = mode === "hoax-or-fact" || mode === "source-battle";
  const currentItem = items[idx];

  const pickChoice = (i: number) => {
    if (choice !== null) return;
    setChoice(i);
    const ok = i === currentItem.correct;
    track("quiz_answered", { mode, correct: ok });
    if (ok) setCorrectCount((c) => c + 1);
  };

  const nextChoice = () => {
    if (idx + 1 >= items.length) {
      finish(correctCount, items.length);
    } else {
      setIdx((i) => i + 1);
      setChoice(null);
    }
  };

  // ---------- red flag ----------
  const redItem = mode === "red-flag" ? redFlagList[idx] ?? null : null;
  const redFlags = redItem ? redItem.post.hotspots.filter((h) => h.isFlag) : [];
  const flagDone = redItem ? flagFound.size >= redFlags.length : false;

  const pickFlag = (id: string) => {
    if (flagDone || !redItem) return;
    const hot = redItem.post.hotspots.find((h) => h.id === id);
    if (!hot) return;
    if (hot.isFlag) {
      setFlagFound((s) => new Set(s).add(id));
      setFlagWrongNote(null);
      track("quiz_answered", { mode, correct: true });
    } else {
      setFlagWrongNote(hot.note);
      track("quiz_answered", { mode, correct: false });
    }
  };

  const nextFlag = () => {
    setFlagScore((s) => s + redFlags.length);
    if (idx + 1 >= redFlagList.length) {
      finish(flagScore + redFlags.length, redFlagList.reduce((acc, r) => acc + r.post.hotspots.filter((h) => h.isFlag).length, 0));
    } else {
      setIdx((i) => i + 1);
      setFlagFound(new Set());
      setFlagWrongNote(null);
    }
  };

  // ---------- spot the hoax ----------
  const spotItem = mode === "spot-the-hoax" ? spotPairList[idx] ?? null : null;
  const totalDiffs = spotItem ? spotItem.differences.length : 0;
  const foundDiffs = spotItem ? spotItem.differences.filter(([aId]) => matched.has(aId)).length : 0;

  const pairIdOf = (aId: string | null, bId: string | null): [string, string] | null => {
    if (!aId || !bId || !spotItem) return null;
    const pair = spotItem.differences.find(([a, b]) => (a === aId && b === bId) || (a === bId && b === aId));
    return pair ? [pair[0], pair[1]] : null;
  };

  const pickSpot = (side: "A" | "B", id: string) => {
    if (spotDone) return;
    setSpotWrong(null);

    if (side === "A") {
      if (selA === id) {
        setSelA(null);
        return;
      }
      setSelA(id);
      const pair = pairIdOf(id, selB);
      if (pair) matchPair(pair);
      else if (selB) setSpotWrong([id, selB]);
    } else {
      if (selB === id) {
        setSelB(null);
        return;
      }
      setSelB(id);
      const pair = pairIdOf(selA, id);
      if (pair) matchPair(pair);
      else if (selA) setSpotWrong([selA, id]);
    }
  };

  const matchPair = ([aId, bId]: [string, string]) => {
    setMatched((s) => new Set(s).add(aId).add(bId));
    setSelA(null);
    setSelB(null);
    setSpotWrong(null);
    track("quiz_answered", { mode, correct: true });
  };

  const spotDone = spotItem ? foundDiffs >= totalDiffs : false;

  const nextSpot = () => {
    if (!spotItem) return;
    setSpotScore((s) => s + spotItem.differences.length);
    if (idx + 1 >= SPOT_PAIRS.length) {
      finish(spotScore + spotItem.differences.length, SPOT_PAIRS.reduce((acc, p) => acc + p.differences.length, 0));
    } else {
      setIdx((i) => i + 1);
      setMatched(new Set());
      setSelA(null);
      setSelB(null);
      setSpotWrong(null);
    }
  };

  const total = isChoiceMode
    ? items.length
    : mode === "red-flag"
      ? RED_FLAG_ITEMS.reduce((acc, r) => acc + r.post.hotspots.filter((h) => h.isFlag).length, 0)
      : SPOT_PAIRS.reduce((acc, p) => acc + p.differences.length, 0);

  const score = isChoiceMode
    ? correctCount
    : mode === "red-flag"
      ? flagScore + flagFound.size
      : spotScore + foundDiffs;

  const spotWrongNotes = (() => {
    if (!spotWrong || !spotItem) return null;
    const a = [...spotItem.postA.hotspots, ...spotItem.postB.hotspots].find((h) => h.id === spotWrong[0]);
    const b = [...spotItem.postA.hotspots, ...spotItem.postB.hotspots].find((h) => h.id === spotWrong[1]);
    if (!a || !b) return null;
    return { a, b };
  })();

  // ---------- render ----------
  if (phase === "intro") {
    return (
      <div className="jc-zone jc-zone-quiz zone-quiz">
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
          <Link href="/quiz" className="text-sm font-semibold text-slate-400 hover:text-white">
            ← Quiz Center
          </Link>
          <div className="mt-6 rounded-3xl border border-orange-500/25 bg-surface/85 p-8 text-center shadow-xl shadow-black/40 backdrop-blur-sm">
            <span className="inline-flex text-orange-400" aria-hidden>
              <EmojiIcon e={meta.emoji} size={52} />
            </span>
            <h1 className="mt-4 font-display text-3xl font-black tracking-tight text-white">{meta.title}</h1>
            <p className="mt-2 text-orange-300">{meta.tagline}</p>
            <p className="mx-auto mt-4 max-w-md text-sm text-slate-400">{meta.description}</p>
            <button type="button" onClick={start} className={`${ORANGE_BTN} mt-8 px-8`}>
              Mulai Quiz →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "done") {
    const pct = finalTotal > 0 ? Math.round((finalScore / finalTotal) * 100) : 0;
    return (
      <div className="jc-zone jc-zone-quiz zone-quiz">
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
          <div className="jc-pop rounded-3xl border border-emerald-500/30 bg-emerald-950/40 p-8 text-center shadow-xl shadow-black/40">
            <span className="inline-flex text-amber-400" aria-hidden>
              <EmojiIcon e={pct >= 80 ? "🏆" : pct >= 50 ? "💪" : "📚"} size={52} />
            </span>
            <h1 className="mt-4 font-display text-3xl font-black text-emerald-300">Quiz Selesai!</h1>
            <p className="mt-2 font-display text-2xl font-extrabold text-white">
              {finalScore}/{finalTotal} · {pct}/100
            </p>
            <p className="mt-2 text-sm text-slate-400">
              +10 XP.{" "}
              {pct >= 80 ? "Luar biasa, kamu jago!" : pct >= 50 ? "Bagus! Terus berlatih." : "Coba cek lagi materi di Academy, ya."}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/quiz" className={ORANGE_BTN}>
                Coba Quiz Lain
              </Link>
              <Link
                href="/academy"
                className="inline-flex items-center justify-center rounded-xl border border-line bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-wide text-slate-200 transition hover:border-blue-400"
              >
                Belajar di Academy
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="jc-zone jc-zone-quiz zone-quiz">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/quiz" className="text-sm font-semibold text-slate-400 hover:text-white">
            ← Quiz Center
          </Link>
          <p className="flex items-center gap-2 text-sm font-bold text-orange-300">
            <EmojiIcon e={meta.emoji} size={18} className="shrink-0" />
            {meta.title}
          </p>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            {isChoiceMode || mode === "red-flag"
              ? mode === "red-flag"
                ? `Postingan ${idx + 1} dari ${RED_FLAG_ITEMS.length}`
                : `Pertanyaan ${idx + 1} dari ${items.length}`
              : `Pasangan ${idx + 1} dari ${SPOT_PAIRS.length}`}
          </p>
          <p className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-300">
            Ditemukan: {score}/{total}
          </p>
        </div>

        {isChoiceMode && currentItem && (
          <Card className="border-orange-500/20">
            <p className="text-lg font-bold leading-snug text-white sm:text-xl">{currentItem.question}</p>
            <div className="mt-5 space-y-2.5">
              {currentItem.options.map((opt, i) => {
                const answered = choice !== null;
                const isCorrect = i === currentItem.correct;
                const isPicked = choice === i;
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
                    onClick={() => pickChoice(i)}
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
            {choice !== null && (
              <div className="jc-pop mt-4 rounded-xl border border-line bg-surface p-4">
                <p className={`font-bold ${choice === currentItem.correct ? "text-emerald-300" : "text-red-300"}`}>
                  {choice === currentItem.correct ? "Benar!" : "Coba cek lagi — jangan berkecil hati."}
                </p>
                <p className="mt-1 text-sm text-slate-300">{currentItem.explanation}</p>
                <button type="button" onClick={nextChoice} className={`${ORANGE_BTN} mt-4`}>
                  {idx + 1 >= items.length ? "Selesai" : "Berikutnya"} →
                </button>
              </div>
            )}
          </Card>
        )}

        {mode === "red-flag" && redItem && (
          <div className="space-y-5">
            {/* Prompt — lebih rapi dengan card */}
            <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 px-4 py-3">
              <p className="flex items-center gap-2 text-sm font-semibold text-orange-200">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-orange-500/20 text-orange-300">
                  <EmojiIcon e="🚩" size={14} />
                </span>
                {redItem.prompt}
                <span className="ml-auto rounded-full bg-white/5 px-2.5 py-1 text-xs font-bold text-slate-300">
                  {flagFound.size}/{redFlags.length}
                </span>
              </p>
            </div>

            <div className="mx-auto max-w-[640px]">
              <MockPostView
                post={redItem.post}
                selected={flagFound}
                onSelect={pickFlag}
                disabled={flagDone}
                showAll={flagDone}
                highlightFlags
                large
              />
              <p className="mt-3 text-center text-xs text-slate-500">
                Klik tombol berlabel di atas postingan — cari {redFlags.length} red flag
              </p>
            </div>

            <div className="space-y-3">
              {flagWrongNote && (
                <div className="jc-pop flex gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-red-500/20 text-red-300">
                    ✕
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-red-200">Bukan itu red flag utamanya</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-300">{flagWrongNote}</p>
                  </div>
                </div>
              )}
              {flagFound.size > 0 && !flagDone && (
                <div className="flex items-center gap-3 rounded-2xl border border-orange-500/25 bg-gradient-to-r from-orange-500/10 to-amber-500/10 px-4 py-3.5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-orange-500/20 text-orange-300">
                    <EmojiIcon e="🚩" size={16} />
                  </span>
                  <p className="text-sm font-semibold text-orange-200">
                    Red flag ditemukan: <span className="font-black text-white">{flagFound.size}</span>/
                    {redFlags.length} — terus cari!
                  </p>
                  <span className="ml-auto hidden h-2 w-24 overflow-hidden rounded-full bg-white/10 sm:block" aria-hidden>
                    <span
                      className="block h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all"
                      style={{ width: `${(flagFound.size / redFlags.length) * 100}%` }}
                    />
                  </span>
                </div>
              )}
              {flagDone && (
                <div className="jc-pop rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
                  <p className="flex items-center gap-2 text-base font-black text-emerald-200">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500/20">
                      <EmojiIcon e="🚩" size={18} />
                    </span>
                    SEMUA RED FLAG DITEMUKAN!
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{redItem.explanation}</p>
                  <button type="button" onClick={nextFlag} className={`${ORANGE_BTN} mt-4 w-full justify-center sm:w-auto`}>
                    {idx + 1 >= RED_FLAG_ITEMS.length ? "Selesai" : "Postingan Berikutnya"} →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {mode === "spot-the-hoax" && spotItem && (
          <div>
            <p className="mb-3 text-sm font-semibold text-slate-300">{spotItem.prompt}</p>

            {/* Side-by-side comparison */}
            <div className="relative grid gap-4 md:grid-cols-2 md:gap-6">
              <MockPostView
                post={spotItem.postA}
                selected={selA ? new Set([selA]) : new Set()}
                matchedIds={matched}
                onSelect={(id) => pickSpot("A", id)}
                large
                accent="blue"
                sideLabel="Postingan A · Asli?"
              />

              <span
                className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-orange-500/40 bg-[#0b0f17] px-3 py-2 font-display text-xs font-black tracking-widest text-orange-400 shadow-lg md:grid"
                aria-hidden
              >
                VS
              </span>

              <MockPostView
                post={spotItem.postB}
                selected={selB ? new Set([selB]) : new Set()}
                matchedIds={matched}
                onSelect={(id) => pickSpot("B", id)}
                large
                accent="orange"
                sideLabel="Postingan B · Asli?"
              />
            </div>

            <div className="mt-4 space-y-3">
              {!spotDone && (
                <p className="rounded-xl border border-orange-500/25 bg-orange-500/5 p-3 text-sm font-semibold text-orange-200">
                  Perbedaan ditemukan: {foundDiffs}/{totalDiffs}. Klik titik yang sama di kedua postingan untuk
                  mencocokkan.
                </p>
              )}

              {spotWrongNotes && (
                <div className="jc-pop rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm">
                  <p className="font-bold text-red-300">
                    “{spotWrongNotes.a.label}” dan “{spotWrongNotes.b.label}” bukan pasangan perbedaan.
                  </p>
                  <ul className="mt-2 space-y-1 text-slate-300">
                    <li>• A — {spotWrongNotes.a.note}</li>
                    <li>• B — {spotWrongNotes.b.note}</li>
                  </ul>
                </div>
              )}

              {spotDone && (
                <div className="jc-pop rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
                  <p className="flex items-center gap-2 font-bold text-emerald-300">
                    <EmojiIcon e="👀" size={18} className="shrink-0" /> SEMUA PERBEDAAN DITEMUKAN!
                  </p>

                  <ol className="mt-3 space-y-3">
                    {spotItem.differences.map(([aId, bId], i) => {
                      const a = spotItem.postA.hotspots.find((h) => h.id === aId);
                      const b = spotItem.postB.hotspots.find((h) => h.id === bId);
                      if (!a || !b) return null;
                      return (
                        <li key={aId} className="rounded-xl border border-line bg-surface/70 p-3">
                          <p className="text-xs font-bold uppercase tracking-widest text-orange-300">
                            Perbedaan {i + 1}: {a.label}
                          </p>
                          <p className="mt-1 text-sm text-slate-200">
                            <span className="font-bold text-blue-300">A:</span> {a.note}
                          </p>
                          <p className="text-sm text-slate-200">
                            <span className="font-bold text-orange-300">B:</span> {b.note}
                          </p>
                        </li>
                      );
                    })}
                  </ol>

                  <p className="mt-3 text-sm text-slate-300">{spotItem.explanation}</p>
                  <button type="button" onClick={nextSpot} className={`${ORANGE_BTN} mt-4`}>
                    {idx + 1 >= SPOT_PAIRS.length ? "Selesai" : "Pasangan Berikutnya"} →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
