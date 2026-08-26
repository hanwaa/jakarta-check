import type { Metadata } from "next";
import FactCheckFlow from "@/components/FactCheckFlow";

export const metadata: Metadata = {
  title: "Cek Fakta — JAKARTA CHECK!",
  description: "Masukkan klaim mencurigakan dan ikuti alur 5 langkah pengecekan informasi.",
};

export default function CekFaktaPage() {
  return <FactCheckFlow />;
}