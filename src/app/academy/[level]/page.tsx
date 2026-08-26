import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LEVELS } from "@/lib/content";
import AcademyLevelClient from "@/components/AcademyLevelClient";

export function generateStaticParams() {
  return LEVELS.map((l) => ({ level: l.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ level: string }>;
}): Promise<Metadata> {
  const { level } = await params;
  const found = LEVELS.find((l) => l.id === level);
  if (!found) return { title: "Tidak ditemukan — JAKARTA CHECK!" };
  return {
    title: `Level ${found.number}: ${found.title} — JAKARTA CHECK!`,
    description: found.subtitle,
  };
}

export default async function AcademyLevelPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
  const found = LEVELS.find((l) => l.id === level);
  if (!found) notFound();

  return <AcademyLevelClient level={found} />;
}
