import type { Metadata } from "next";
import ProgressClient from "@/components/ProgressClient";

export const metadata: Metadata = {
  title: "Progres Saya — JAKARTA CHECK!",
  description: "Pantau XP, badge, dan progres belajarmu di JAKARTA CHECK!",
};

export default function ProgressPage() {
  return <ProgressClient />;
}