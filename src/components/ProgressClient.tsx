"use client";

import { useState } from "react";
import Link from "next/link";
import { BADGES, CASES, LEVELS, QUIZ_MODES } from "@/lib/content";
import { getBadgeRequirement, resetProgress, useUserState } from "@/lib/store";
import { Card, ProgressBar, SectionHeading } from "@/components/ui";
import { EmojiIcon } from "@/components/icons";

export default function ProgressClient() {
  const state = useUserState();
  const [activeBadge, setActiveBadge] = useState<string | null>(null);

  const academyLevels = LEVELS.filter((l) => l.number <= 3);
  const totalLessons = academyLevels.reduce((acc, l) => acc + l.lessons.length, 0);
  const doneLessons = academyLevels.reduce((acc, l) => acc + l.lessons.filter((x) => state.completedLessons.includes(x.id)).length, 0);
  const academyPct = totalLessons > 0 ? Math.round((doneLessons / totalLessons) * 100) : 0;

  const aiLevelDone = state.completedLevels.includes("level-4");
  const bestDetectiveScore = Math.max(0, ...Object.values(state.caseScores));

  const active = BADGES.find((b) => b.id === activeBadge) ?? null;

  return (
    <div className="jc-zone jc-zone-progress">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <SectionHeading
          eyebrow="Progres Saya"
          title="YOUR PROGRESS"
          description="Semua progres tersimpan di perangkatmu (localStorage). Tanpa akun, tanpa ribet."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Card className="border-white/15 text-center ring-1 ring-white/10">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">XP</p>
            <p className="mt-2 bg-gradient-to-r from-blue-400 via-red-400 to-orange-400 bg-clip-text font-display text-4xl font-black text-transparent">
              {state.xp.toLocaleString("id-ID")}
            </p>
            <p className="mt-1 text-xs text-slate-500">kumpulkan XP dari lesson, quiz, case, dan challenge</p>
          </Card>
          <Card className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Badges</p>
            <p className="mt-2 font-display text-4xl font-black text-amber-300">
              {state.badges.length}/{BADGES.length}
            </p>
            <p className="mt-1 text-xs text-slate-500">badge terbuka dari aktivitas belajar</p>
          </Card>
          <Card className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Digital Detective</p>
            <p className="mt-2 font-display text-4xl font-black text-orange-400">
              {bestDetectiveScore > 0 ? `${bestDetectiveScore}/100` : "—"}
            </p>
            <p className="mt-1 text-xs text-slate-500">{state.completedCases.length} kasus selesai</p>
          </Card>
        </div>

        {/* Academy — biru */}
        <Card className="mt-6 border-blue-500/25">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="flex items-center gap-2 font-display text-lg font-extrabold text-white">
                <EmojiIcon e="🎓" size={20} className="text-blue-400" /> Antihoax Academy
              </h2>
              <p className="text-sm text-slate-400">
                {doneLessons}/{totalLessons} pelajaran selesai{aiLevelDone ? " · modul AI selesai ✓" : ""}
              </p>
            </div>
            <p className="font-display text-2xl font-black text-blue-300">{academyPct}%</p>
          </div>
          <div className="mt-3">
            <ProgressBar value={doneLessons} max={totalLessons} color="bg-gradient-to-r from-[#1d4ed8] to-[#60a5fa]" />
          </div>

          <div className="mt-6 space-y-4">
            {LEVELS.map((level) => {
              const levelDone = state.completedLevels.includes(level.id);
              const done = level.lessons.filter((l) => state.completedLessons.includes(l.id)).length;
              return (
                <div key={level.id}>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <p className="flex items-center gap-1.5 font-semibold text-slate-300">
                      {levelDone && <EmojiIcon e="✅" size={16} className="shrink-0 text-emerald-400" />}
                      Level {level.number}: {level.title}
                    </p>
                    <p className="font-bold text-white">
                      {done}/{level.lessons.length}
                    </p>
                  </div>
                  <div className="mt-1">
                    <ProgressBar value={done} max={Math.max(level.lessons.length, 1)} color="bg-gradient-to-r from-[#1d4ed8] to-[#60a5fa]" />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Badges */}
        <Card className="mt-6 border-amber-500/25">
          <h2 className="flex items-center gap-2 font-display text-lg font-extrabold text-white">
            <EmojiIcon e="🏅" size={20} className="text-amber-400" /> Badges
          </h2>
          <p className="mt-1 text-xs text-slate-500">Klik badge untuk melihat cara membukanya.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {BADGES.map((b) => {
              const earned = state.badges.includes(b.id);
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setActiveBadge(b.id)}
                  className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${
                    earned
                      ? "border-amber-500/40 bg-gradient-to-br from-amber-500/10 to-transparent"
                      : "border-line bg-surface-2/50 opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex ${earned ? "text-amber-400" : "text-slate-600"}`}
                      aria-hidden
                    >
                      <EmojiIcon e={earned ? b.emoji : "🔒"} size={32} />
                    </span>
                    <div>
                      <p className={`text-sm font-extrabold ${earned ? "text-amber-200" : "text-slate-400"}`}>{b.name}</p>
                      <p className="text-xs text-slate-500">{earned ? "Terbuka — lihat detail" : "Terkunci"}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          {state.badges.length === 0 && (
            <p className="mt-4 rounded-xl border border-line bg-white/5 p-4 text-sm text-slate-400">
              Belum ada badge. Selesaikan aktivitas di{" "}
              <Link href="/academy" className="font-bold text-blue-400 hover:underline">
                Academy
              </Link>{" "}
              untuk membukanya!
            </p>
          )}
        </Card>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {/* Quiz Center — orange */}
          <Card className="border-orange-500/25">
            <h2 className="flex items-center gap-2 font-display text-lg font-extrabold text-white">
              <EmojiIcon e="⚡" size={20} className="text-orange-400" /> Quiz Center
            </h2>
            <ul className="mt-3 space-y-2">
              {QUIZ_MODES.map((qm) => {
                const score = state.quizScores[qm.id];
                return (
                  <li key={qm.id} className="flex items-center justify-between gap-3 text-sm">
                    <Link href={`/quiz/${qm.id}`} className="flex items-center gap-2 font-semibold text-slate-300 transition hover:text-orange-400">
                      <EmojiIcon e={qm.emoji} size={18} className="shrink-0 text-orange-400/80" />
                      {qm.title}
                    </Link>
                    {score !== undefined ? (
                      <span className="rounded-full bg-orange-500/15 px-2.5 py-0.5 text-xs font-bold text-orange-300 ring-1 ring-orange-500/40">
                        {score}/100
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500">belum dicoba</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </Card>

          {/* Digital Detective — amber */}
          <Card className="border-amber-500/25">
            <h2 className="flex items-center gap-2 font-display text-lg font-extrabold text-white">
              <EmojiIcon e="🕵️" size={20} className="text-amber-400" /> Digital Detective
            </h2>
            <ul className="mt-3 space-y-2">
              {CASES.map((c) => {
                const score = state.caseScores[c.id];
                return (
                  <li key={c.id} className="flex items-center justify-between gap-3 text-sm">
                    <Link href={`/detective/${c.id}`} className="flex items-center gap-2 font-semibold text-slate-300 transition hover:text-amber-400">
                      <EmojiIcon e={c.emoji} size={18} className="shrink-0 text-amber-400/80" />
                      {c.number}: {c.title}
                    </Link>
                    {score !== undefined ? (
                      <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-bold text-amber-300 ring-1 ring-amber-500/40">
                        {score}/100
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500">belum dicoba</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>

        <Card className="mt-6">
          <p className="font-bold text-white">Catatan</p>
          <p className="mt-1 text-sm text-slate-400">
            Fact check selesai: <strong className="text-red-300">{state.factChecks}</strong> · Challenge selesai:{" "}
            <strong className="text-orange-300">{state.challenges}</strong>
          </p>
          <button
            type="button"
            onClick={() => resetProgress()}
            className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-red-300 transition hover:border-red-400"
          >
            Reset Progres
          </button>
        </Card>
      </div>

      {/* Badge modal */}
      {active && (
        <div
          className="fixed inset-0 z-[55] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Badge ${active.name}`}
          onClick={() => setActiveBadge(null)}
        >
          <div
            className="jc-pop w-full max-w-md rounded-3xl border border-amber-500/30 bg-[#141008] p-8 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className={`inline-grid h-24 w-24 place-items-center rounded-full ${
                state.badges.includes(active.id)
                  ? "bg-gradient-to-br from-amber-400 to-orange-600 text-white shadow-[0_0_40px_-8px_rgba(245,158,11,0.7)]"
                  : "bg-white/5 text-slate-500 ring-1 ring-line"
              }`}
              aria-hidden
            >
              <EmojiIcon e={state.badges.includes(active.id) ? active.emoji : "🔒"} size={48} />
            </span>
            <h3 className={`mt-4 font-display text-2xl font-black ${state.badges.includes(active.id) ? "text-amber-300" : "text-slate-300"}`}>
              {active.name}
            </h3>
            <p className="mt-2 text-sm text-slate-400">{active.description}</p>
            <div className="mt-4 rounded-xl border border-line bg-white/5 p-3 text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Cara membuka</p>
              <p className="mt-1 text-sm text-slate-300">{getBadgeRequirement(active.id)}</p>
            </div>
            <p
              className={`mt-4 text-xs font-bold uppercase tracking-widest ${
                state.badges.includes(active.id) ? "text-emerald-400" : "text-amber-400"
              }`}
            >
              {state.badges.includes(active.id) ? "✓ Sudah kamu buka" : "Belum terbuka"}
            </p>
            <button
              type="button"
              onClick={() => setActiveBadge(null)}
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#854d0e] to-[#f59e0b] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:brightness-110"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
