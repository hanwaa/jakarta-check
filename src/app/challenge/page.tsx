import { Suspense } from "react";
import type { Metadata } from "next";
import ChallengeRunner from "@/components/ChallengeRunner";

export const metadata: Metadata = {
  title: "Challenge: Can You Spot the Hoax? — JAKARTA CHECK!",
  description: "5 pertanyaan cepat untuk menguji instingmu membedakan fakta dan hoaks. Bagikan skormu!",
};

export default function ChallengePage() {
  return (
    <Suspense>
      <ChallengeRunner />
    </Suspense>
  );
}