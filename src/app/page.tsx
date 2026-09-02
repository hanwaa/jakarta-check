import type { Metadata } from "next";
import Link from "next/link";
import HeroClient from "@/components/HeroClient";
import StatsSection from "@/components/StatsSection";
import ChatSim from "@/components/ChatSim";
import { SectionHeading, Card } from "@/components/ui";
import { EmojiIcon } from "@/components/icons";
import { BADGES } from "@/lib/content";

export const metadata: Metadata = {
  title: "JAKARTA CHECK! — Think Before You Share",
  description:
    "Platform edukasi literasi digital untuk melawan hoaks. Belajar, tes, cek fakta, deteksi AI & deepfake, dan jadi detektif digital.",
};

const FEATURES = [
  {
    href: "/cek-fakta",
    emoji: "🧾",
    title: "Cek Fakta",
    desc: "Masukkan klaim mencurigakan dan ikuti alur 5 langkah: STOP, cek sumber, cek tanggal, cross-check, dan simpulkan.",
    color: "bg-red-500/15 text-red-400",
    hover: "hover:border-red-500/50",
  },
  {
    href: "/academy",
    emoji: "🎓",
    title: "Antihoax Academy",
    desc: "Belajar dari nol: kenali hoaks, pahami kenapa kita bisa tertipu, deteksi AI & deepfake, dan jadilah fact checker sejati.",
    color: "bg-blue-500/15 text-blue-400",
    hover: "hover:border-blue-500/50",
  },
  {
    href: "/quiz",
    emoji: "⚡",
    title: "Quiz Center",
    desc: "Uji pemahamanmu dengan 4 mode kuis interaktif: Hoax or Fact, Find the Red Flag, Source Battle, dan Spot the Hoax.",
    color: "bg-orange-500/15 text-orange-400",
    hover: "hover:border-orange-500/50",
  },
  {
    href: "/toolkit",
    emoji: "🧰",
    title: "Fact-Checking Toolkit",
    desc: "Katalog tools all-round: reverse image search, detektor AI & deepfake, database cek fakta, hingga forensik metadata.",
    color: "bg-sky-500/15 text-sky-400",
    hover: "hover:border-sky-500/50",
  },
  {
    href: "/detective",
    emoji: "🕵️",
    title: "Digital Detective",
    desc: "Selesaikan case file investigasi nyata dengan bukti, petunjuk, dan skor. Buktikan kamu bisa membongkar hoaks.",
    color: "bg-amber-500/15 text-amber-400",
    hover: "hover:border-amber-500/50",
  },
  {
    href: "/progress",
    emoji: "📈",
    title: "Progres Saya",
    desc: "Pantau XP, badge, dan progres belajarmu. Selesaikan aktivitas untuk mengumpulkan penghargaan.",
    color: "bg-emerald-500/15 text-emerald-400",
    hover: "hover:border-emerald-500/50",
  },
];

const STEPS = [
  { emoji: "📖", title: "LEARN", desc: "Belajar konsep dasar hoaks dan literasi informasi." },
  { emoji: "🧪", title: "TEST", desc: "Uji pemahamanmu lewat quiz yang seru." },
  { emoji: "🔍", title: "CHECK", desc: "Praktikkan proses pengecekan informasi." },
  { emoji: "🕵️", title: "CHALLENGE", desc: "Pecahkan kasus sebagai Digital Detective." },
  { emoji: "📤", title: "SHARE", desc: "Bagikan pengetahuan dan ajak orang berpikir dulu." },
];

export default function Home() {
  return (
    <>
      {/* 1 — Hero */}
      <HeroClient />

      {/* 2 — Chat simulation teaser */}
      <ChatSim />

      {/* 3 — Statistik */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-label="Statistik">
        <StatsSection />
      </section>

      {/* 4 — Pilih petualanganmu (moved here so users immediately see what they can do) */}
      <section className="border-y border-line bg-[#0d1421]/60 py-20" aria-label="Fitur">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Mulai sekarang"
            title="Pilih petualanganmu"
            description="Semua aktivitas bisa langsung dicoba tanpa akun. Progres dan XP tersimpan otomatis di perangkatmu."
            center
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <Link key={f.href} href={f.href} className="group">
                <Card className={`h-full transition group-hover:-translate-y-1 group-hover:shadow-xl ${f.hover}`}>
                  <span className={`inline-grid h-12 w-12 place-items-center rounded-xl ${f.color}`} aria-hidden>
                    <EmojiIcon e={f.emoji} size={24} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-extrabold text-white">{f.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{f.desc}</p>
                  <span className="mt-4 inline-block text-sm font-bold text-accent group-hover:underline">
                    Jelajahi →
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Masalah */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6" aria-label="Masalah">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Masalahnya nyata"
              title="Kelihatannya meyakinkan? Pause dulu."
              description="Kita menerima banyak informasi dari WhatsApp, Instagram, TikTok, X, dan grup keluarga. Masalahnya, kita sering percaya, hanya baca judul, dan membagikan tanpa mengecek sumber."
            />
            <div className="mt-6 space-y-3">
              {[
                "Hanya membaca judul tanpa membaca isi",
                "Tidak mengecek sumber dan tanggal publikasi",
                "Membagikan screenshot tanpa konteks",
                "Sulit membedakan fakta, opini, dan disinformasi",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-line bg-surface/70 p-3">
                  <EmojiIcon e="⚠️" className="mt-0.5 size-5 shrink-0 text-amber-400" />
                  <p className="text-sm text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/40 p-8 shadow-xl shadow-black/40">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Ubah kebiasaanmu</p>
            <div className="mt-4 space-y-4">
              <div className="rounded-2xl bg-red-500/10 p-4 ring-1 ring-red-500/30">
                <p className="text-sm font-bold text-red-300">Sebelum</p>
                <p className="mt-1 font-mono text-lg font-bold text-white">SEE → BELIEVE → SHARE</p>
              </div>
              <p className="text-center text-slate-600" aria-hidden>
                ↓
              </p>
              <div className="rounded-2xl bg-emerald-500/10 p-4 ring-1 ring-emerald-500/30">
                <p className="text-sm font-bold text-emerald-300">Setelah menggunakan JAKARTA CHECK!</p>
                <p className="mt-1 font-mono text-lg font-bold leading-relaxed text-white">
                  SEE → STOP → CHECK → CROSS-CHECK → CONCLUDE → SHARE
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm text-slate-400">
              Kami tidak mengajarkan <em>&quot;mana yang hoaks?&quot;</em> — kami mengajarkan{" "}
              <strong className="text-white">&quot;bagaimana kamu tahu bahwa informasi itu benar?&quot;</strong>
            </p>
          </div>
        </div>
      </section>

      {/* 6 — Cara kerja */}
      <section className="border-y border-line bg-[#0d1421]/60 py-20" aria-label="Cara kerja">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Cara kerja"
            title="LEARN → TEST → CHECK → CHALLENGE → SHARE"
            description="Satu alur belajar yang membawamu dari pemula menjadi pemeriksa fakta yang percaya diri."
            center
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((s, i) => (
              <div key={s.title} className="relative rounded-2xl border border-line bg-surface/80 p-5 text-center shadow-lg shadow-black/30">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-2.5 py-0.5 text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className="inline-flex mt-1 text-3xl text-white" aria-hidden>
                  <EmojiIcon e={s.emoji} size={32} />
                </span>
                <p className="mt-2 font-display text-sm font-extrabold tracking-wide text-white">{s.title}</p>
                <p className="mt-1 text-xs text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — Badge */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6" aria-label="Badge">
        <SectionHeading
          eyebrow="Gamifikasi"
          title="Kumpulkan badge, naikkan XP"
          description="Setiap aktivitas selesai memberimu XP. Selesaikan target tertentu untuk membuka badge eksklusif."
          center
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BADGES.map((b) => (
            <div
              key={b.id}
              className="rounded-2xl border border-amber-500/25 bg-gradient-to-br from-amber-500/10 to-transparent p-5 text-center"
            >
              <span className="inline-flex text-amber-400" aria-hidden>
                <EmojiIcon e={b.emoji} size={40} />
              </span>
              <p className="mt-2 font-display text-sm font-extrabold text-amber-200">{b.name}</p>
              <p className="mt-1 text-xs text-slate-400">{b.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8 — CTA hero */}
      <section className="relative overflow-hidden py-20 text-white" aria-label="Panggilan aksi">
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#1e0a0d] via-[#991b1b] to-[#ef4444]"
          aria-hidden
        />
        <div className="jc-dotted pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="font-display text-4xl font-black tracking-tight sm:text-5xl">THINK BEFORE YOU SHARE.</p>
          <p className="mt-4 text-lg text-red-100">
            Temukan. Cek. Bongkar. Bagikan Kebenaran. Mulai dari langkah pertama sekarang.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/cek-fakta"
              className="inline-flex items-center justify-center rounded-xl bg-white px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-red-700 shadow-lg transition hover:-translate-y-0.5"
            >
              Mulai Cek Fakta
            </Link>
            <Link
              href="/academy"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white/40 px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-white/10"
            >
              Masuk Academy
            </Link>
          </div>
        </div>
      </section>

      {/* 9 — Academy CTA (replaces all-levels grid) */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6" aria-label="Academy">
        <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-900/20 via-[#0b0f17] to-[#0b0f17] p-8 sm:p-12">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-400">Antihoax Academy</p>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Belajar dari nol sampai mahir.
              </h2>
              <p className="mt-3 max-w-xl text-base text-slate-400">
                4 level interaktif — dari mengenal hoaks, memahami bias kognitif, mendeteksi AI &amp; deepfake, hingga menjadi fact checker sejati. Gratis, tanpa akun, langsung mulai.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Kenalan dengan Hoaks", "Kenapa Kita Bisa Tertipu", "Deteksi AI & Deepfake", "Become a Fact Checker"].map((label, i) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/25 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300"
                  >
                    <span className="font-black text-blue-400">L{i + 1}</span>
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href="https://jakarta-check.vercel.app/academy"
              className="inline-flex shrink-0 items-center gap-2.5 rounded-xl bg-blue-600 px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg shadow-black/40 transition hover:-translate-y-0.5 hover:bg-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-4"
                aria-hidden="true"
              >
                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
              </svg>
              Masuk Academy
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

