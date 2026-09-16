import type { Metadata } from "next";
import Link from "next/link";
import { QUIZ_MODES } from "@/lib/content";
import { SectionHeading, Card } from "@/components/ui";
import { EmojiIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Quiz Center — JAKARTA CHECK!",
  description: "Uji pemahamanmu dengan 4 mode kuis interaktif: Hoax or Fact, Find the Red Flag, Source Battle, Spot the Hoax.",
};

export default function QuizPage() {
  return (
    <div className="jc-zone jc-zone-quiz zone-quiz">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading
          eyebrow="Quiz Center"
          title="Uji instingmu"
          description="Empat mode kuis pendek dan interaktif. Jawab, dapatkan penjelasan, dan kumpulkan XP."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {QUIZ_MODES.map((q) => (
            <Link key={q.id} href={`/quiz/${q.id}`} className="group">
              <Card className="h-full border-orange-500/20 transition group-hover:-translate-y-1 group-hover:border-orange-400/50 group-hover:shadow-orange-900/20">
                <div className="flex items-start gap-4">
                  <span
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#c2410c] to-[#f97316] text-white shadow-md shadow-black/40"
                    aria-hidden
                  >
                    <EmojiIcon e={q.emoji} size={28} />
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-extrabold text-white">{q.title}</h2>
                    <p className="mt-1 text-sm font-semibold text-orange-300">{q.tagline}</p>
                    <p className="mt-2 text-sm text-slate-400">{q.description}</p>
                    <span className="mt-4 inline-block text-sm font-bold text-orange-400 group-hover:underline">
                      Mulai →
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-blue-500/25 bg-gradient-to-br from-blue-900/20 to-[#0b0f17] p-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400">Belum belajar dulu?</p>
          <p className="mt-2 font-display text-xl font-extrabold text-white">
            Kuasai materinya dulu di Antihoax Academy
          </p>
          <p className="mt-2 text-sm text-slate-400">
            4 level interaktif — dari kenalan dengan hoaks hingga deteksi AI & deepfake.
          </p>
          <Link
            href="/academy"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-white shadow-md shadow-black/40 transition hover:-translate-y-0.5 hover:bg-blue-500"
          >
            Mulai Belajar di Academy →
          </Link>
        </div>
      </div>
    </div>
  );
}
