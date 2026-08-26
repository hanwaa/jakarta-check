import type { Metadata } from "next";
import Link from "next/link";
import { LEVELS } from "@/lib/content";
import { SectionHeading, Card } from "@/components/ui";
import { EmojiIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Antihoax Academy — JAKARTA CHECK!",
  description:
    "Jalur belajar terstruktur: kenali hoaks, pahami psikologi di baliknya, kuasai fact-checking, dan deteksi konten AI & deepfake.",
};

export default function AcademyPage() {
  return (
    <div className="jc-zone jc-zone-academy zone-academy">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading
          eyebrow="Antihoax Academy"
          title="Jalur belajarmu menjadi pemeriksa fakta"
          description="Empat level dari dasar hingga deteksi AI. Setiap level berisi pelajaran singkat, tips praktis, dan mini quiz untuk menguji pemahamanmu."
        />

        <div className="mt-10 space-y-5">
          {LEVELS.map((level, i) => {
            return (
              <div key={level.id}>
                <Link href={`/academy/${level.id}`} className="group block">
                  <div
                    className={`flex flex-col gap-4 rounded-3xl bg-gradient-to-br ${level.gradient} p-6 text-white shadow-md shadow-black/40 ring-1 ring-white/10 transition group-hover:-translate-y-1 group-hover:shadow-xl sm:flex-row sm:items-center sm:p-8`}
                  >
                    <span
                      className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-black/25"
                      aria-hidden
                    >
                      <EmojiIcon e={level.emoji} size={32} />
                    </span>
                    <div className="flex-1">
                      <p className="text-xs font-bold uppercase tracking-widest text-white/70">
                        Level {level.number}
                      </p>
                      <h2 className="mt-1 font-display text-2xl font-extrabold tracking-tight">{level.title}</h2>
                      <p className="mt-1 text-white/85">{level.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold uppercase tracking-wide text-white/80">
                        {level.lessons.length > 0 ? `${level.lessons.length} pelajaran + mini quiz` : "Kasus investigasi"}
                      </span>
                      <span className="text-xl transition group-hover:translate-x-1" aria-hidden>
                        →
                      </span>
                    </div>
                  </div>
                </Link>
                {!isLast(i, LEVELS.length) && (
                  <div className="my-3 ml-8 h-8 border-l-2 border-dashed border-blue-500/30" aria-hidden />
                )}
              </div>
            );
          })}
        </div>

        <Card className="mt-12 text-center">
          <p className="text-sm text-slate-400">
            Sudah menguasai materi? Langsung uji kemampuanmu di{" "}
            <Link href="/quiz" className="font-bold text-orange-400 hover:underline">
              Quiz Center
            </Link>{" "}
            atau pecahkan kasus di{" "}
            <Link href="/detective" className="font-bold text-amber-300 hover:underline">
              Digital Detective
            </Link>
            .
          </p>
        </Card>
      </div>
    </div>
  );
}

function isLast(index: number, total: number) {
  return index === total - 1;
}
