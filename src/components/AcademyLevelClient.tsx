"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Level } from "@/lib/types";
import { LEVELS } from "@/lib/content";
import { track } from "@/lib/analytics";
import { completeLesson, completeLevel, announceBadges, useUserState } from "@/lib/store";
import { ProgressBar, Card } from "@/components/ui";
import { EmojiIcon } from "@/components/icons";

export default function AcademyLevelClient({ level }: { level: Level }) {
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizCorrect, setQuizCorrect] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const state = useUserState();
  const completed = state.completedLessons;
  const levelDone = state.completedLevels.includes(level.id);

  useEffect(() => {
    track("academy_level_started", { level: level.id });
  }, [level.id]);

  useEffect(() => {
    if (!quizOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setQuizOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [quizOpen]);

  const lessons = level.lessons;
  const completedCount = lessons.filter((l) => completed.includes(l.id)).length;
  const allDone = lessons.length > 0 && completedCount === lessons.length;
  const current = lessons.find((l) => l.id === selectedLesson) ?? null;

  const markLessonDone = (lessonId: string) => {
    const { newBadges } = completeLesson(lessonId);
    announceBadges(newBadges);
    track("lesson_completed", { level: level.id, lesson: lessonId });
    setSelectedLesson(null);
  };

  const startLesson = (lessonId: string) => {
    track("lesson_started", { level: level.id, lesson: lessonId });
    setSelectedLesson(lessonId);
  };

  const startQuiz = () => {
    track("quiz_started", { level: level.id, quiz: "level-mini-quiz" });
    setQuizIdx(0);
    setQuizAnswer(null);
    setQuizCorrect(0);
    setQuizOpen(true);
  };

  const answerQuiz = (i: number) => {
    if (quizAnswer !== null) return;
    setQuizAnswer(i);
    const correct = i === level.quiz[quizIdx].correct;
    track("quiz_answered", { level: level.id, correct });
    if (correct) setQuizCorrect((c) => c + 1);
  };

  const nextQuiz = () => {
    if (quizIdx + 1 >= level.quiz.length) {
      const { newBadges } = completeLevel(level.id);
      announceBadges(newBadges);
      track("quiz_completed", { level: level.id, score: quizCorrect });
      track("academy_level_completed", { level: level.id });
      setQuizDone(true);
    } else {
      setQuizIdx((i) => i + 1);
      setQuizAnswer(null);
    }
  };

  const quiz = level.quiz;
  const progressPct = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;

  return (
    <div className="jc-zone jc-zone-academy zone-academy">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <Link href="/academy" className="text-sm font-semibold text-slate-400 hover:text-white">
          ← Antihoax Academy
        </Link>

        <div className={`mt-4 rounded-3xl bg-gradient-to-br ${level.gradient} p-8 text-white shadow-lg shadow-black/40 ring-1 ring-white/10`}>
          <p className="text-xs font-bold uppercase tracking-widest text-white/70">Level {level.number}</p>
          <h1 className="mt-1 flex items-center gap-3 font-display text-3xl font-black tracking-tight sm:text-4xl">
            <EmojiIcon e={level.emoji} size={36} className="shrink-0" />
            <span>{level.title}</span>
          </h1>
          <p className="mt-2 max-w-2xl text-white/90">{level.subtitle}</p>
        </div>

        <Card className="mt-6">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-bold text-slate-300">
              Progres: {completedCount}/{lessons.length} pelajaran
            </p>
            <p className="font-display text-sm font-extrabold text-blue-300">{progressPct}%</p>
          </div>
          <div className="mt-3">
            <ProgressBar value={completedCount} max={Math.max(lessons.length, 1)} color="bg-gradient-to-r from-[#1d4ed8] to-[#60a5fa]" />
          </div>
        </Card>

        <div className="mt-8">
          <h2 className="font-display text-xl font-extrabold text-white">Pelajaran</h2>
          <div className="mt-4 space-y-3">
            {lessons.map((lesson, i) => {
              const isDone = completed.includes(lesson.id);
              const isSelected = selectedLesson === lesson.id;
              return (
                <div key={lesson.id}>
                  <button
                    type="button"
                    onClick={() => startLesson(lesson.id)}
                    className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                      isSelected
                        ? "border-blue-400/60 bg-blue-500/10"
                        : "border-line bg-surface/80 hover:border-blue-400/40 hover:bg-blue-500/5"
                    }`}
                  >
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${isDone ? "bg-emerald-500/15 text-emerald-400" : "bg-blue-500/10 text-blue-300"}`}
                      aria-hidden
                    >
                      <EmojiIcon e={isDone ? "✅" : lesson.emoji} size={20} />
                    </span>
                    <span className="flex-1">
                      <span className="block font-bold text-white">
                        {i + 1}. {lesson.title}
                      </span>
                      <span className="block text-xs text-slate-400">±{lesson.minutes} menit membaca</span>
                    </span>
                    {isDone && <span className="text-xs font-bold text-emerald-400">SELESAI</span>}
                    <span className="text-slate-500" aria-hidden>
                      →
                    </span>
                  </button>

                  {isSelected && current && (
                    <Card className="mt-3 border-blue-500/20">
                      <p className="text-lg font-bold text-white">{current.title}</p>
                      <p className="mt-2 text-slate-300">{current.intro}</p>
                      <ul className="mt-4 space-y-2">
                        {current.points.map((p) => (
                          <li key={p} className="flex gap-2 text-sm text-slate-300">
                            <span className="text-blue-400" aria-hidden>
                              •
                            </span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 rounded-xl border border-blue-500/25 bg-blue-500/10 p-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-blue-300">Tips</p>
                        <ul className="mt-2 space-y-1">
                          {current.tips.map((t) => (
                            <li key={t} className="text-sm text-slate-300">
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-4 rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">Intinya</p>
                        <p className="mt-1 text-sm font-semibold text-slate-100">{current.takeaway}</p>
                      </div>
                      <div className="mt-5 flex flex-wrap gap-3">
                        {!isDone && (
                          <button
                            type="button"
                            onClick={() => markLessonDone(current.id)}
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#1d4ed8] to-[#60a5fa] px-5 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:brightness-110"
                          >
                            ✓ Tandai Selesai (+10 XP)
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setSelectedLesson(null)}
                          className="inline-flex items-center rounded-xl border border-line px-5 py-3 text-sm font-bold text-slate-300 transition hover:border-slate-500"
                        >
                          Tutup
                        </button>
                      </div>
                    </Card>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {quiz.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display text-xl font-extrabold text-white">Mini Quiz</h2>
            {!allDone && !quizOpen && !quizDone && (
              <div className="mt-4 rounded-2xl border-2 border-dashed border-blue-500/30 bg-blue-500/5 p-6 text-center">
                <span className="inline-flex text-3xl text-slate-500" aria-hidden>
                  <EmojiIcon e="🔒" size={32} />
                </span>
                <p className="mt-2 font-bold text-slate-200">Kuis terkunci</p>
                <p className="text-sm text-slate-400">Selesaikan semua pelajaran di level ini untuk membuka mini quiz.</p>
                <div className="mx-auto mt-4 max-w-sm">
                  <ProgressBar value={completedCount} max={Math.max(lessons.length, 1)} color="bg-gradient-to-r from-[#1d4ed8] to-[#60a5fa]" />
                </div>
              </div>
            )}

            {allDone && !quizOpen && !quizDone && (
              <div className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
                <span className="inline-flex text-3xl text-emerald-400" aria-hidden>
                  <EmojiIcon e="🎯" size={32} />
                </span>
                <p className="mt-2 font-bold text-slate-100">Semua pelajaran selesai! Saatnya uji pemahamanmu.</p>
                <button
                  type="button"
                  onClick={startQuiz}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#1d4ed8] to-[#60a5fa] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:brightness-110"
                >
                  Mulai Mini Quiz
                </button>
              </div>
            )}

            {quizDone && (
              <div className="jc-pop mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
                <span className="inline-flex text-5xl text-amber-400" aria-hidden>
                  <EmojiIcon e="🏅" size={52} />
                </span>
                <h3 className="mt-3 font-display text-2xl font-black text-emerald-300">LEVEL COMPLETE!</h3>
                <p className="mt-2 text-slate-300">
                  Skor kuis: {quizCorrect}/{quiz.length} · +10 XP
                </p>
                {levelDone ? (
                  <p className="mt-2 flex items-center justify-center gap-1.5 text-sm font-semibold text-emerald-400">
                    Level ini sudah selesai sebelumnya. <EmojiIcon e="👍" size={16} />
                  </p>
                ) : (
                  <p className="mt-2 text-sm font-semibold text-emerald-400">Level selesai — badge mungkin sudah terbuka!</p>
                )}
                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                  {level.number < LEVELS.length ? (
                    <Link
                      href={`/academy/level-${level.number + 1}`}
                      onClick={() => {
                        setQuizDone(false);
                        setQuizOpen(false);
                      }}
                      className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#1d4ed8] to-[#60a5fa] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:brightness-110"
                    >
                      Lanjut ke Level {level.number + 1} →
                    </Link>
                  ) : (
                    <>
                      <Link
                        href="/detective"
                        className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#854d0e] to-[#f59e0b] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:brightness-110"
                      >
                        Masuk Digital Detective →
                      </Link>
                      <Link
                        href="/quiz"
                        onClick={() => {
                          setQuizDone(false);
                          setQuizOpen(false);
                        }}
                        className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#c2410c] to-[#f97316] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:brightness-110"
                      >
                        Coba Quiz Center →
                      </Link>
                    </>
                  )}
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
        )}
      </div>

      {/* Mini Quiz modal — constrained, centered, tidak memenuhi layar */}
      {quizOpen && !quizDone && quiz.length > 0 && (
        <div
          className="fixed inset-0 z-[55] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Mini Quiz"
        >
          <div className="jc-pop w-full max-w-2xl overflow-y-auto rounded-3xl border border-blue-500/30 bg-[#0d1526] p-6 shadow-2xl sm:p-8" style={{ maxHeight: "85vh" }}>
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
                Pertanyaan {quizIdx + 1} dari {quiz.length} · Skor {quizCorrect}
              </p>
              <button
                type="button"
                onClick={() => setQuizOpen(false)}
                className="rounded-lg px-2 py-1 text-slate-400 transition hover:bg-white/10 hover:text-white"
                aria-label="Tutup kuis"
              >
                ✕
              </button>
            </div>

            <h3 className="mt-3 text-xl font-extrabold leading-snug text-white sm:text-2xl">
              {quiz[quizIdx].question}
            </h3>

            <div className="mt-5 space-y-2.5">
              {quiz[quizIdx].options.map((opt, i) => {
                const answered = quizAnswer !== null;
                const isCorrect = i === quiz[quizIdx].correct;
                const isPicked = quizAnswer === i;
                const cls = answered
                  ? isCorrect
                    ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-200"
                    : isPicked
                      ? "border-red-500/50 bg-red-500/10 text-red-200"
                      : "border-line text-slate-500"
                  : "border-line bg-surface/60 text-slate-200 hover:border-blue-400/60 hover:bg-blue-500/10";
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => answerQuiz(i)}
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

            {quizAnswer !== null && (
              <div className="jc-pop mt-5 rounded-xl border border-line bg-surface p-4">
                <p className={`font-bold ${quizAnswer === quiz[quizIdx].correct ? "text-emerald-300" : "text-red-300"}`}>
                  {quizAnswer === quiz[quizIdx].correct ? "Benar!" : "Coba cek lagi — jangan berkecil hati."}
                </p>
                <p className="mt-1 text-sm text-slate-300">{quiz[quizIdx].explanation}</p>
                <button
                  type="button"
                  onClick={nextQuiz}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#1d4ed8] to-[#60a5fa] px-5 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:brightness-110"
                >
                  {quizIdx + 1 >= quiz.length ? "Selesai" : "Pertanyaan Berikutnya"} →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
