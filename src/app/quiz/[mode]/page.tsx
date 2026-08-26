import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QUIZ_MODES } from "@/lib/content";
import QuizRunner from "@/components/QuizRunner";

export function generateStaticParams() {
  return QUIZ_MODES.map((m) => ({ mode: m.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ mode: string }>;
}): Promise<Metadata> {
  const { mode } = await params;
  const found = QUIZ_MODES.find((m) => m.id === mode);
  if (!found) return { title: "Tidak ditemukan — JAKARTA CHECK!" };
  return {
    title: `${found.title} — JAKARTA CHECK!`,
    description: found.tagline,
  };
}

export default async function QuizModePage({
  params,
}: {
  params: Promise<{ mode: string }>;
}) {
  const { mode } = await params;
  const found = QUIZ_MODES.find((m) => m.id === mode);
  if (!found) notFound();
  return <QuizRunner mode={found.id} />;
}