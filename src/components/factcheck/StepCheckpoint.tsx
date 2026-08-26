"use client";

import Link from "next/link";
import { EmojiIcon } from "@/components/icons";

interface CheckpointDef {
  id: string;
  question: string;
  options: string[];
  correct: number;
}

const CHECKPOINTS: Record<string, CheckpointDef> = {
  source: {
    id: "source",
    question: "Mana yang termasuk sumber yang bisa dipercaya?",
    options: [
      "Pesan berantai tanpa nama pengirim",
      "Website resmi lembaga dengan kontak jelas",
      "Tangkapan layar tanpa tautan asli",
      "Akun anonim yang klaimnya tak bisa dicek",
    ],
    correct: 1,
  },
  date: {
    id: "date",
    question: "Kenapa tanggal itu penting?",
    options: [
      "Supaya terlihat rapi",
      "Agar kita tahu apakah informasi masih relevan",
      "Karena semua orang suka tanggal",
      "Tidak penting sama sekali",
    ],
    correct: 1,
  },
  crosscheck: {
    id: "crosscheck",
    question: "Berapa sumber independen yang ideal untuk cross-check?",
    options: [
      "Tidak perlu, satu cukup",
      "Minimal 1 sumber",
      "Minimal 2–3 sumber independen",
      "Sebanyak mungkin yang bisa ditemukan",
    ],
    correct: 2,
  },
};

interface StepCheckpointProps {
  checkpoint: CheckpointDef;
  value: number | null;
  onPick: (i: number) => void;
  onRetry: () => void;
  onNext: () => void;
  nextLabel: string;
}

export function StepCheckpoint({ checkpoint, value, onPick, onRetry, onNext, nextLabel }: StepCheckpointProps) {
  const answered = value !== null;
  const isRight = value === checkpoint.correct;

  const retry = () => onRetry();

  return (
    <div className="mt-6 rounded-2xl border border-red-500/20 bg-[#160b0e]/80 p-4">
      <p className="font-bold text-white">{checkpoint.question}</p>
      <div className="mt-3 space-y-2">
        {checkpoint.options.map((opt, i) => {
          const isCorrect = i === checkpoint.correct;
          const isPicked = value === i;
          const cls = answered
            ? isCorrect
              ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-200"
              : isPicked
                ? "border-red-500/50 bg-red-500/10 text-red-200"
                : "border-line text-slate-500"
            : "border-line bg-surface/50 text-slate-200 hover:border-red-400/60";
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onPick(i)}
              disabled={answered}
              className={`w-full rounded-xl border-2 p-3 text-left text-sm font-semibold transition ${cls}`}
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
      {answered && (
        <p className="mt-3 flex items-start gap-2 rounded-xl border border-line bg-surface p-3 text-sm text-slate-300">
          <EmojiIcon
            e={isRight ? "✅" : "❌"}
            size={16}
            className={`mt-0.5 shrink-0 ${isRight ? "text-emerald-400" : "text-red-400"}`}
          />
          <span>
            {isRight
              ? "Benar — lanjutkan! Ingat: kesimpulan harus didasarkan pada bukti, bukan perasaan."
              : "Belum tepat. Baca ulang materi di atas atau pelajari modul terkait di Academy."}
          </span>
        </p>
      )}

      {answered && !isRight && (
        <div className="jc-pop mt-4 rounded-xl border border-red-500/25 bg-red-500/5 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-red-300">Jangan buntu — pilih langkahmu:</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <Link
              href="/academy"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1d4ed8] to-[#60a5fa] px-4 py-3 text-xs font-bold uppercase tracking-wide text-white shadow-md transition hover:brightness-110"
            >
              <EmojiIcon e="🎓" size={16} className="shrink-0" /> Antihoax Academy
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#991b1b] to-[#ef4444] px-4 py-3 text-xs font-bold uppercase tracking-wide text-white shadow-md transition hover:brightness-110"
            >
              <EmojiIcon e="🏙️" size={16} className="shrink-0" /> Kembali ke Beranda
            </Link>
            <button
              type="button"
              onClick={retry}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/40 bg-white/5 px-4 py-3 text-xs font-bold uppercase tracking-wide text-red-200 transition hover:border-red-400"
            >
              <EmojiIcon e="🔁" size={16} className="shrink-0" /> Coba Lagi
            </button>
          </div>
        </div>
      )}

      {answered && isRight && (
        <button
          type="button"
          onClick={onNext}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#991b1b] to-[#ef4444] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md shadow-black/40 transition hover:brightness-110"
        >
          {nextLabel} →
        </button>
      )}
    </div>
  );
}

export function getCheckpoint(id: string): CheckpointDef {
  return CHECKPOINTS[id];
}
