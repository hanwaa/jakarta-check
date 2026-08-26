import type { Metadata } from "next";
import Link from "next/link";
import { TOOL_CATEGORIES } from "@/lib/content/toolkit";
import { SectionHeading, Card } from "@/components/ui";
import ToolLink from "@/components/ToolLink";
import { EmojiIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Fact-Checking Toolkit — JAKARTA CHECK!",
  description:
    "Katalog tools pengecekan fakta all-round: reverse image search, detektor AI & deepfake, database cek fakta, hingga forensik metadata.",
};

const HOW_TO_USE = [
  "Mulai dari yang paling mudah: salin klaim ke database cek fakta (mungkin sudah diperiksa).",
  "Foto/video viral? Telusuri asal-usulnya dengan reverse image search sebelum percaya.",
  "Curiga konten dibuat AI? Pindai dengan AI & deepfake detector, lalu cek detailnya manual.",
  "Butuh bukti kuat? Bedah arsip dan metadata dengan Wayback Machine atau SunCalc.",
];

export default function ToolkitPage() {
  return (
    <div className="jc-zone jc-zone-academy zone-academy">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading
          eyebrow="All-Round Toolkit"
          title="Fact-Checking Toolkit"
          description="Katalog tools pengecekan fakta yang dipakai jurnalis dan fact checker. Semua gratis dipakai — klik untuk membuka langsung."
        />

        <Card className="mt-8 border-blue-500/20">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-300">Cara memakai toolkit ini</p>
          <ol className="mt-3 space-y-2 text-sm text-slate-300">
            {HOW_TO_USE.map((step, i) => (
              <li key={step} className="flex gap-2">
                <span className="font-bold text-blue-400">{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </Card>

        <div className="mt-10 space-y-10">
          {TOOL_CATEGORIES.map((cat) => (
            <section key={cat.id} aria-label={cat.title}>
              <div className="flex items-center gap-3">
                <span className={`inline-grid h-11 w-11 place-items-center rounded-xl border ${cat.accent}`} aria-hidden>
                  <EmojiIcon e={cat.emoji} size={22} />
                </span>
                <div>
                  <h2 className="font-display text-xl font-extrabold text-white">{cat.title}</h2>
                  <p className="text-sm text-slate-400">{cat.description}</p>
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cat.tools.map((tool) => (
                  <ToolLink
                    key={tool.name}
                    href={tool.url}
                    tool={tool.name}
                    className="group flex h-full flex-col rounded-2xl border border-line bg-surface/80 p-5 shadow-lg shadow-black/30 transition hover:-translate-y-1 hover:border-accent/60"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-base font-extrabold text-white">{tool.name}</h3>
                      <span className="shrink-0 text-xs font-bold text-accent opacity-70 transition group-hover:opacity-100">
                        BUKA ↗
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-slate-200">{tool.use}</p>
                    <p className="mt-2 text-xs leading-relaxed text-slate-400">{tool.how}</p>
                  </ToolLink>
                ))}
              </div>
            </section>
          ))}
        </div>

        <Card className="mt-12 text-center">
          <p className="text-sm text-slate-400">
            Ingin latihan memakai alur ini? Buka{" "}
            <Link href="/cek-fakta" className="font-bold text-red-400 hover:underline">
              Cek Fakta
            </Link>{" "}
            — beberapa tools di atas sudah terpasang langsung di langkah-langkahnya.
          </p>
        </Card>
      </div>
    </div>
  );
}
