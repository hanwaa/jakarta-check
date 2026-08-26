import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CASES } from "@/lib/content";
import CaseRunner from "@/components/CaseRunner";

export function generateStaticParams() {
  return CASES.map((c) => ({ caseId: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ caseId: string }>;
}): Promise<Metadata> {
  const { caseId } = await params;
  const found = CASES.find((c) => c.id === caseId);
  if (!found) return { title: "Tidak ditemukan — JAKARTA CHECK!" };
  return {
    title: `${found.number}: ${found.title} — JAKARTA CHECK!`,
    description: found.scenario,
  };
}

export default async function DetectiveCasePage({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = await params;
  const found = CASES.find((c) => c.id === caseId);
  if (!found) notFound();
  return <CaseRunner caseData={found} />;
}