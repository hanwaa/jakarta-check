import type { Metadata } from "next";
import Link from "next/link";
import { CASES } from "@/lib/content";
import { SectionHeading, Card } from "@/components/ui";
import { EmojiIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Digital Detective — JAKARTA CHECK!",
  description: "Selesaikan kasus investigasi dengan bukti, petunjuk, dan skor. Buktikan kemampuanmu membongkar hoaks.",
};

export default function DetectivePage() {
  return (
    <div className="jc-zone jc-zone-detective zone-detective">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading
          eyebrow="Digital Detective"
          title="Uji insting detektifmu"
          description="Setiap case file menyediakan bukti dan pertanyaan investigasi. Jawab dengan tepat untuk membuka petunjuk dan meraih skor maksimal 100."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CASES.map((c) => (
            <Link key={c.id} href={`/detective/${c.id}`} className="group">
              <Card className="h-full border-amber-500/25 transition group-hover:-translate-y-1 group-hover:border-amber-400/50 group-hover:shadow-amber-900/20">
                <div className="flex items-center justify-between">
                  <span
                    className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#854d0e] to-[#f59e0b] text-white shadow-md shadow-black/40"
                    aria-hidden
                  >
                    <EmojiIcon e={c.emoji} size={28} />
                  </span>
                  <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold tracking-widest text-amber-300">
                    {c.number}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-xl font-extrabold text-white">{c.title}</h2>
                <p className="mt-2 text-sm text-slate-400">{c.scenario}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.scoreKeys.map((sk) => (
                    <span
                      key={sk.key}
                      className="rounded-full border border-line bg-white/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-400"
                    >
                      {sk.label} {sk.max}
                    </span>
                  ))}
                </div>
                <span className="mt-5 inline-block text-sm font-bold text-amber-400 group-hover:underline">
                  Pecahkan Kasus →
                </span>
              </Card>
            </Link>
          ))}
        </div>

        <Card className="mt-12 border-amber-500/25">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <span className="text-amber-400" aria-hidden>
              <EmojiIcon e="🕵️" size={40} />
            </span>
            <div className="flex-1">
              <h2 className="font-display text-xl font-extrabold text-white">Ingin tantangan singkat?</h2>
              <p className="mt-1 text-sm text-slate-400">
                Coba challenge kilat <strong className="text-white">CAN YOU SPOT THE HOAX?</strong> — jawab 5 pertanyaan
                cepat dan bagikan skormu.
              </p>
            </div>
            <Link
              href="/challenge"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#c2410c] to-[#f97316] px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-white shadow-md transition hover:brightness-110"
            >
              Ikuti Challenge →
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
