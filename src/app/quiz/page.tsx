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

        <Card className="mt-12 text-center">
          <p className="text-sm text-slate-400">
            Ingin latihan lebih dulu? Buka{" "}
            <Link href="/academy" className="font-bold text-blue-400 hover:underline">
              Antihoax Academy
            </Link>{" "}
            untuk belajar materi lengkapnya.
          </p>
        </Card>
      </div>
    </div>
  );
}
