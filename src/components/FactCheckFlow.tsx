"use client";

import { useState } from "react";
import Link from "next/link";
import { track } from "@/lib/analytics";
import { completeLesson, recordFactCheck, announceBadges } from "@/lib/store";
import { pushGlobalStat } from "@/lib/stats";
import { StatusPill } from "@/components/ui";
import { EmojiIcon } from "@/components/icons";
import { StepCheckpoint, getCheckpoint } from "./factcheck/StepCheckpoint";

type StepId = "input" | "stop" | "source" | "date" | "crosscheck" | "conclude" | "result";

const TOOLS = [
  {
    name: "Google Fact Check Explorer",
    desc: "Arsip pengecekan fakta global",
    href: "https://toolbox.google.com/factcheck/explorer",
    emoji: "🌐",
  },
  {
    name: "TurnBackHoax.id",
    desc: "Database hoaks lokal Indonesia",
    href: "https://turnbackhoax.id/",
    emoji: "🧩",
  },
  {
    name: "Reverse Image Search",
    desc: "Telusuri asal-usul foto",
    href: "https://images.google.com/",
    emoji: "🖼️",
  },
  {
    name: "Wayback Machine",
    desc: "Lihat halaman yang sudah dihapus",
    href: "https://web.archive.org/",
    emoji: "🗂️",
  },
];

const STATUSES = ["BENAR", "SALAH", "MENYESATKAN", "BELUM TERBUKTI"];

const STEP_LABELS = ["STOP", "SOURCE", "DATE", "CROSS-CHECK", "CONCLUDE"];

const STATUS_COLORS: Record<string, string> = {
  BENAR:
    "border-emerald-500/50 bg-emerald-500/10 text-emerald-200 hover:border-emerald-400",
  SALAH: "border-red-500/50 bg-red-500/10 text-red-200 hover:border-red-400",
  MENYESATKAN:
    "border-orange-500/50 bg-orange-500/10 text-orange-200 hover:border-orange-400",
  "BELUM TERBUKTI":
    "border-slate-500/40 bg-white/5 text-slate-300 hover:border-slate-400",
};

export default function FactCheckFlow() {
  const [step, setStep] = useState<StepId>("input");
  const [claim, setClaim] = useState("");
  const [sourceInput, setSourceInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [sourceAnswer, setSourceAnswer] = useState<number | null>(null);
  const [dateAnswer, setDateAnswer] = useState<number | null>(null);
  const [crossAnswer, setCrossAnswer] = useState<number | null>(null);
  const [conclusion, setConclusion] = useState<string | null>(null);
  const [reason, setReason] = useState("");

  const start = () => {
    if (!claim.trim()) return;
    track("fact_check_started", { claimLength: claim.trim().length });
    setStep("stop");
  };

  const learn = (lessonId: string) => {
    const { newBadges } = completeLesson(lessonId);
    announceBadges(newBadges);
  };

  const goSource = () => {
    setStep("source");
    learn("l3-1");
  };

  const goDate = () => {
    setStep("date");
    learn("l3-2");
  };

  const goCross = () => {
    setStep("crosscheck");
    learn("l3-4");
  };

  const goConclude = () => {
    track("quiz_answered", { mode: "fact-check-source" });
    setStep("conclude");
  };

  const finish = () => {
    if (!conclusion) return;
    recordFactCheck();
    track("fact_check_completed", { conclusion });
    void pushGlobalStat("fact_check_completed");
    setStep("result");
  };

  const toolHref = (t: (typeof TOOLS)[number]) =>
    t.href.includes("%s") ? t.href.replace("%s", encodeURIComponent(claim)) : t.href;

  const stepIndex = ["stop", "source", "date", "crosscheck", "conclude"].indexOf(step);

  return (
    <div className="jc-zone jc-zone-fact zone-fact">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="mb-8">
          <Link href="/" className="text-sm font-semibold text-slate-400 hover:text-white">
            ← Beranda
          </Link>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Cek <span className="text-red-500">Fakta</span>
          </h1>
          <p className="mt-2 text-slate-400">
            Punya informasi yang mencurigakan? Masukkan klaimnya dan ikuti alurnya.
          </p>
        </div>

        {step !== "input" && step !== "result" && (
          <ol className="mb-8 flex flex-wrap items-center gap-2" aria-label="Langkah">
            {STEP_LABELS.map((s, i) => {
              const done = i < stepIndex;
              const active = i === stepIndex;
              return (
                <li key={s} className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                      done
                        ? "bg-emerald-500/15 text-emerald-300"
                        : active
                          ? "bg-gradient-to-r from-[#991b1b] to-[#ef4444] text-white shadow-md shadow-black/40"
                          : "bg-white/5 text-slate-500"
                    }`}
                  >
                    {done && <EmojiIcon e="✅" size={12} className="shrink-0" />}
                    {i + 1}. {s}
                  </span>
                  {i < STEP_LABELS.length - 1 && (
                    <span className="text-slate-600" aria-hidden>
                      →
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        )}

        {step === "input" && (
          <div className="jc-pop rounded-3xl border border-red-500/25 bg-surface/85 p-8 shadow-xl shadow-black/40 backdrop-blur-sm">
            <label htmlFor="claim" className="text-lg font-bold text-white">
              Masukkan klaim atau informasi yang ingin kamu periksa
            </label>
            <textarea
              id="claim"
              value={claim}
              onChange={(e) => setClaim(e.target.value)}
              placeholder="Tulis informasi di sini..."
              rows={5}
              className="mt-4 w-full rounded-2xl border-2 border-line bg-surface-2 p-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-red-500"
            />
            <button
              type="button"
              onClick={start}
              disabled={!claim.trim()}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#991b1b] via-[#ef4444] to-[#f87171] px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg shadow-black/40 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Mulai Cek Fakta →
            </button>
            <p className="mt-3 text-xs text-slate-500">
              Kami tidak menghakimi klaimmu — kami mengajarkan caramu memeriksanya. Informasi di sini tidak dianalisis
              otomatis oleh AI.
            </p>
          </div>
        )}

        {step === "stop" && (
          <div className="jc-pop rounded-3xl border border-red-500/30 bg-[#1e0a0d]/90 p-8 text-center shadow-xl shadow-black/40">
            <span className="inline-flex text-red-500" aria-hidden>
              <EmojiIcon e="🛑" size={52} />
            </span>
            <h2 className="mt-3 font-display text-3xl font-black text-red-400">STOP!</h2>
            <p className="mx-auto mt-2 max-w-md text-slate-300">
              Jangan langsung percaya atau membagikan informasi. Berhenti dulu — kamu sedang memegang kekuatan untuk
              menghentikan hoaks.
            </p>
            <div className="mx-auto mt-4 max-w-md rounded-2xl border border-line bg-surface p-4 text-left text-sm text-slate-300">
              <p className="font-bold text-white">Klaim kamu:</p>
              <p className="mt-1 italic">“{claim}”</p>
            </div>
            <button
              type="button"
              onClick={goSource}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#991b1b] to-[#ef4444] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:brightness-110"
            >
              Saya Siap Mengecek →
            </button>
          </div>
        )}

        {step === "source" && (
          <div className="jc-pop rounded-3xl border border-line bg-surface/85 p-8 shadow-xl shadow-black/40 backdrop-blur-sm">
            <span className="inline-flex text-red-400" aria-hidden>
              <EmojiIcon e="🔎" size={40} />
            </span>
            <h2 className="mt-3 font-display text-2xl font-extrabold text-white">Check Source</h2>
            <p className="mt-1 text-slate-400">
              Siapa sumber pertama informasi tersebut? Bukan siapa yang membagikannya ke kamu.
            </p>

            <div className="mt-5 space-y-2 text-sm text-slate-300">
              {[
                ["✅", "Sumber asli: website resmi, lembaga, penulis dengan nama jelas."],
                ["🚩", "Akun anonim dan pesan tanpa nama tidak bisa diverifikasi."],
                ["🚩", "Tangkapan layar (screenshot) tanpa tautan asli mudah dipalsukan."],
                ["🚩", "Secondary source hanya menyalin — cari sumber utamanya."],
              ].map(([icon, text]) => (
                <p key={text} className="flex gap-2">
                  <span className="mt-0.5 shrink-0">{icon}</span> <span>{text}</span>
                </p>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-line bg-surface-2/70 p-4">
              <label htmlFor="source" className="text-sm font-bold text-white">
                Siapa sumber pertama informasi ini? (opsional)
              </label>
              <input
                id="source"
                value={sourceInput}
                onChange={(e) => setSourceInput(e.target.value)}
                placeholder="Misal: pesan berantai dari grup, akun @xxx, website..."
                className="mt-2 w-full rounded-xl border-2 border-line bg-background p-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-red-500"
              />
            </div>

            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-widest text-red-300">Tools bantuan</p>
              <p className="mt-1 text-xs text-slate-500">
                Tools eksternal hanya bantuan — kamu tetap yang mengevaluasi sumbernya.
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {TOOLS.map((t) => (
                  <a
                    key={t.name}
                    href={toolHref(t)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("external_tool_clicked", { tool: t.name })}
                    className="flex items-center gap-3 rounded-xl border border-line bg-surface-2/60 p-3 text-left transition hover:border-red-400/60 hover:bg-red-500/10"
                  >
                    <span className="inline-flex shrink-0 text-red-300" aria-hidden>
                      <EmojiIcon e={t.emoji} size={22} />
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-white">{t.name}</span>
                      <span className="block text-xs text-slate-400">{t.desc}</span>
                    </span>
                  </a>
                ))}
              </div>
              <Link href="/toolkit" className="mt-3 inline-block text-xs font-bold text-red-400 hover:underline">
                Lihat semua tools di Fact-Checking Toolkit →
              </Link>
            </div>

            <StepCheckpoint
              checkpoint={getCheckpoint("source")}
              value={sourceAnswer}
              onPick={setSourceAnswer}
              onRetry={() => setSourceAnswer(null)}
              onNext={goDate}
              nextLabel="Lanjut ke Date"
            />
          </div>
        )}

        {step === "date" && (
          <div className="jc-pop rounded-3xl border border-line bg-surface/85 p-8 shadow-xl shadow-black/40 backdrop-blur-sm">
            <span className="inline-flex text-red-400" aria-hidden>
              <EmojiIcon e="📅" size={40} />
            </span>
            <h2 className="mt-3 font-display text-2xl font-extrabold text-white">Check Date</h2>
            <p className="mt-1 text-slate-400">Apakah informasi ini masih relevan?</p>

            <div className="mt-5 space-y-2 text-sm text-slate-300">
              {[
                ["📆", "Cek tanggal publikasi dan tanggal update artikel."],
                ["📸", "Cek kapan foto atau video diambil — foto lama sering dipakai ulang."],
                ["🕒", "Cek tanggal kejadian yang dilaporkan, bukan hanya tanggal posting."],
                ["🚩", "Konteks lama yang dibagikan ulang tanpa tanggal adalah tanda bahaya."],
              ].map(([icon, text]) => (
                <p key={text} className="flex gap-2">
                  <span className="shrink-0">{icon}</span> <span>{text}</span>
                </p>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-line bg-surface-2/70 p-4">
              <label htmlFor="date" className="text-sm font-bold text-white">
                Kapan informasi ini dipublikasikan / kapan kejadiannya? (opsional)
              </label>
              <input
                id="date"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                placeholder="Misal: belum tahu, tanggal tidak terlihat, screenshot lama..."
                className="mt-2 w-full rounded-xl border-2 border-line bg-background p-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-red-500"
              />
            </div>

            <StepCheckpoint
              checkpoint={getCheckpoint("date")}
              value={dateAnswer}
              onPick={setDateAnswer}
              onRetry={() => setDateAnswer(null)}
              onNext={goCross}
              nextLabel="Lanjut ke Cross-check"
            />
          </div>
        )}

        {step === "crosscheck" && (
          <div className="jc-pop rounded-3xl border border-line bg-surface/85 p-8 shadow-xl shadow-black/40 backdrop-blur-sm">
            <span className="inline-flex text-red-400" aria-hidden>
              <EmojiIcon e="🔀" size={40} />
            </span>
            <h2 className="mt-3 font-display text-2xl font-extrabold text-white">Cross-check</h2>
            <p className="mt-1 text-slate-400">Apakah sumber terpercaya lainnya mengatakan hal yang sama?</p>

            <div className="mt-5 space-y-2 text-sm text-slate-300">
              {[
                ["🧩", "Cari minimal 2–3 sumber independen yang terpercaya."],
                ["🚫", "Jangan hanya mencari sumber yang mengonfirmasi keyakinanmu."],
                ["🔁", "Dua sumber yang saling menyalin tidak dihitung sebagai dua bukti."],
                ["✅", "Jika tidak ada sumber independen, anggap klaim belum terbukti."],
              ].map(([icon, text]) => (
                <p key={text} className="flex gap-2">
                  <span className="shrink-0">{icon}</span> <span>{text}</span>
                </p>
              ))}
            </div>

            <StepCheckpoint
              checkpoint={getCheckpoint("crosscheck")}
              value={crossAnswer}
              onPick={setCrossAnswer}
              onRetry={() => setCrossAnswer(null)}
              onNext={goConclude}
              nextLabel="Lanjut ke Kesimpulan"
            />
          </div>
        )}

        {step === "conclude" && (
          <div className="jc-pop rounded-3xl border border-line bg-surface/85 p-8 shadow-xl shadow-black/40 backdrop-blur-sm">
            <span className="inline-flex text-red-400" aria-hidden>
              <EmojiIcon e="🏁" size={40} />
            </span>
            <h2 className="mt-3 font-display text-2xl font-extrabold text-white">Conclude</h2>
            <p className="mt-1 text-slate-400">Berdasarkan bukti yang kamu temukan, apa kesimpulanmu?</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {STATUSES.map((s) => {
                const picked = conclusion === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setConclusion(s)}
                    className={`rounded-xl border-2 p-4 text-left font-bold transition ${STATUS_COLORS[s]} ${
                      picked ? "ring-2 ring-red-400 ring-offset-2 ring-offset-[#0b0f17]" : ""
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>

            <div className="mt-6">
              <label htmlFor="reason" className="text-sm font-bold text-white">
                Jelaskan alasan singkatmu (boleh kosong)
              </label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Misal: sumbernya hanya pesan berantai, tanggal tidak jelas, dan belum ada sumber independen..."
                rows={3}
                className="mt-2 w-full rounded-2xl border-2 border-line bg-surface-2 p-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-red-500"
              />
            </div>

            <button
              type="button"
              onClick={finish}
              disabled={!conclusion}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#991b1b] to-[#ef4444] px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg shadow-black/40 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Selesai & Simpulkan
            </button>
          </div>
        )}

        {step === "result" && (
          <div className="jc-pop rounded-3xl border border-emerald-500/30 bg-emerald-950/40 p-8 text-center shadow-xl shadow-black/40">
            <span className="inline-flex text-amber-400" aria-hidden>
              <EmojiIcon e="🎉" size={52} />
            </span>
            <h2 className="mt-3 font-display text-3xl font-black text-emerald-300">CHECK COMPLETE</h2>
            <p className="mt-2 text-slate-300">
              +20 XP! Kamu baru saja melakukan langkah nyata: berpikir sebelum berbagi.
            </p>

            <div className="mt-6 space-y-3 rounded-2xl border border-line bg-surface p-6 text-left text-sm">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Klaim</p>
                <p className="mt-1 text-slate-200">{claim}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Sumber</p>
                <p className="mt-1 text-slate-200">{sourceInput || "—"}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Tanggal / konteks</p>
                <p className="mt-1 text-slate-200">{dateInput || "—"}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Kesimpulan</p>
                <div className="mt-1">
                  <StatusPill status={conclusion ?? ""} />
                </div>
              </div>
              {reason && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Alasan</p>
                  <p className="mt-1 text-slate-200">{reason}</p>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/academy"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#1d4ed8] to-[#60a5fa] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:brightness-110"
              >
                Join Academy
              </Link>
              <Link
                href="/toolkit"
                className="inline-flex items-center justify-center rounded-xl border border-line bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-wide text-slate-200 transition hover:border-slate-500"
              >
                Buka Toolkit
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
