"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { track } from "@/lib/analytics";

type Choice = "red" | "yellow" | "green" | null;

interface Feedback {
  title: string;
  message: string;
  tone: "red" | "yellow" | "green";
  cta: string;
  href: string;
}

const FEEDBACK: Record<Exclude<Choice, null>, Feedback> = {
  red: {
    title: "WAIT!",
    message: "Membagikan informasi sebelum mengecek dapat membantu hoaks menyebar. Kamu bisa menjadi bagian dari masalah tanpa sadar.",
    tone: "red",
    cta: "PELAJARI BAHAYANYA",
    href: "/academy/level-1",
  },
  yellow: {
    title: "Better, but not enough.",
    message: "Bertanya kepada teman belum tentu membuat informasi menjadi benar. Temanmu bisa saja salah percaya juga.",
    tone: "yellow",
    cta: "BELAJAR CARA CEK",
    href: "/academy/level-3",
  },
  green: {
    title: "GOOD CHOICE!",
    message: "Kamu sudah melakukan langkah pertama sebagai fact checker: berhenti sebelum berbagi.",
    tone: "green",
    cta: "LANJUTKAN",
    href: "/cek-fakta",
  },
};

export default function ChatSim() {
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState<Choice>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const shown = sessionStorage.getItem("jc_popup_shown");
    if (shown) return;
    const t = window.setTimeout(() => setOpen(true), 2500);
    return () => window.clearTimeout(t);
  }, []);

  const close = () => {
    sessionStorage.setItem("jc_popup_shown", "1");
    setOpen(false);
    window.setTimeout(() => setChoice(null), 300);
  };

  const pick = (c: Exclude<Choice, null>) => {
    setChoice(c);
    track("quiz_answered", { mode: "popup-chat", answer: c });
  };

  const fb = choice ? FEEDBACK[choice] : null;

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[55] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-title"
    >
      <div className="jc-pop w-full max-w-md overflow-hidden rounded-3xl border border-line bg-[#10161f] shadow-2xl">
        <div className="flex items-center justify-between bg-emerald-700 px-5 py-3 text-white">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-900 text-sm font-black">
              GK
            </span>
            <div>
              <p className="text-sm font-bold leading-tight">GRUP KELUARGA</p>
              <p className="text-xs text-emerald-200">3 suara · sedang online</p>
            </div>
          </div>
          <button
            type="button"
            onClick={close}
            className="rounded-lg px-2 py-1 text-emerald-100 transition hover:bg-emerald-800"
            aria-label="Tutup"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3 bg-[#0b0f17] p-5">
          <div className="jc-pop max-w-[85%] rounded-2xl rounded-tl-sm border border-line bg-surface p-3 shadow-sm">
            <p className="text-sm font-bold text-red-400">INFO PENTING!!!</p>
            <p className="mt-1 text-sm text-slate-200">Besok sekolah diliburkan karena cuaca ekstrem. Segera bagikan ke semua grup!</p>
          </div>
          <p className="text-xs text-slate-500">diteruskan 17 kali</p>

          {!fb && (
            <div className="jc-pop pt-2">
              <h3 id="chat-title" className="text-center text-sm font-extrabold uppercase tracking-wide text-white">
                Kamu akan melakukan apa?
              </h3>
              <div className="mt-3 space-y-2">
                <button
                  type="button"
                  onClick={() => pick("red")}
                  className="flex w-full items-center gap-3 rounded-xl border-2 border-red-500/30 bg-red-500/10 px-4 py-3 text-left font-bold text-red-300 transition hover:border-red-400"
                >
                  <span className="inline-block size-3.5 shrink-0 rounded-sm bg-red-500" aria-hidden /> Langsung share
                </button>
                <button
                  type="button"
                  onClick={() => pick("yellow")}
                  className="flex w-full items-center gap-3 rounded-xl border-2 border-amber-500/30 bg-amber-500/10 px-4 py-3 text-left font-bold text-amber-300 transition hover:border-amber-400"
                >
                  <span className="inline-block size-3.5 shrink-0 rounded-sm bg-amber-400" aria-hidden /> Tanya teman dulu
                </button>
                <button
                  type="button"
                  onClick={() => pick("green")}
                  className="flex w-full items-center gap-3 rounded-xl border-2 border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-left font-bold text-emerald-300 transition hover:border-emerald-400"
                >
                  <span className="inline-block size-3.5 shrink-0 rounded-sm bg-emerald-500" aria-hidden /> Cek sumber
                  terlebih dahulu
                </button>
              </div>
            </div>
          )}

          {fb && (
            <div
              className={`jc-pop rounded-2xl border-2 p-5 text-center ${
                fb.tone === "red"
                  ? "border-red-500/40 bg-red-500/10"
                  : fb.tone === "yellow"
                    ? "border-amber-500/40 bg-amber-500/10"
                    : "border-emerald-500/40 bg-emerald-500/10"
              }`}
            >
              <p
                className={`text-2xl font-black ${
                  fb.tone === "red" ? "text-red-300" : fb.tone === "yellow" ? "text-amber-300" : "text-emerald-300"
                }`}
              >
                {fb.title}
              </p>
              <p className="mt-2 text-sm text-slate-300">{fb.message}</p>
              <Link
                href={fb.href}
                onClick={close}
                className={`mt-4 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-sm ${
                  fb.tone === "red"
                    ? "bg-gradient-to-r from-[#991b1b] to-[#ef4444] hover:brightness-110"
                    : fb.tone === "yellow"
                      ? "bg-gradient-to-r from-[#b45309] to-[#f59e0b] hover:brightness-110"
                      : "bg-gradient-to-r from-[#047857] to-[#10b981] hover:brightness-110"
                }`}
              >
                {fb.cta}
              </Link>
              <button type="button" onClick={close} className="mt-3 text-xs font-semibold text-slate-500 hover:text-slate-300">
                Tutup
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}