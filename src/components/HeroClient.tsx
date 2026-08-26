"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

export default function HeroClient() {
  const onPrimary = () => track("hero_cta_click", { cta: "MULAI CEK FAKTA", href: "/cek-fakta" });
  const onSecondary = () => track("hero_cta_click", { cta: "IKUTI CHALLENGE", href: "/challenge" });

  return (
    <div className="relative overflow-hidden bg-[#0b0f17] text-white">
      <div className="jc-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="jc-scanlines pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-red-600/25 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-orange-500/15 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h1 className="mt-5 font-display text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              JAKARTA <span className="text-red-500 text-glow">CHECK!</span>
            </h1>
            <p className="mt-4 font-display text-2xl font-bold text-orange-300 sm:text-3xl">
              Berhenti sebelum berbagi.
            </p>
            <p className="mt-4 max-w-lg text-lg text-slate-400">
              Seberapa jago kamu membedakan fakta dan hoaks? Belajar, berlatih, dan uji kemampuanmu jadi pemeriksa
              fakta — seru dan interaktif.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/cek-fakta"
                onClick={onPrimary}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#991b1b] to-[#ef4444] px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg shadow-black/50 transition hover:-translate-y-0.5 hover:brightness-110"
              >
                Mulai Cek Fakta
              </Link>
              <Link
                href="/challenge"
                onClick={onSecondary}
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-white/5 px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-white backdrop-blur transition hover:border-white/60 hover:bg-white/10"
              >
                Ikuti Challenge
              </Link>
            </div>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              Temukan. Cek. Bongkar. Bagikan Kebenaran.
            </p>
          </div>

          <div className="relative hidden lg:block">
            <div className="jc-float rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">Simulasi Cepat</p>
              <div className="mt-4 space-y-3">
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/10 p-3 text-sm">
                  <span className="font-bold text-red-400">INFO PENTING!!!</span> Besok semua sekolah di Jakarta
                  diliburkan!
                </div>
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-red-600/80 p-3 text-sm text-white">
                  Bagikan ke semua grup!
                </div>
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-emerald-600/80 p-3 text-sm text-white">
                  Tunggu dulu. Sumbernya siapa? Cek dulu.
                </div>
              </div>
              <div className="mt-5 rounded-2xl bg-black/40 p-4 text-center">
                <p className="text-sm text-slate-300">
                  <span className="font-bold text-emerald-400">SEE → STOP → CHECK → THINK → SHARE</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
