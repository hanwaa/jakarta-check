import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BadgeToast } from "@/components/BadgeToast";
import AnalyticsTracker from "@/components/AnalyticsTracker";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JAKARTA CHECK! — Berhenti sebelum berbagi",
  description:
    "Platform edukasi literasi digital dan fact-checking. Temukan. Cek. Bongkar. Bagikan Kebenaran.",
  keywords: [
    "fact check",
    "cek fakta",
    "hoaks",
    "literasi digital",
    "jakarta",
    "anti hoax",
  ],
  openGraph: {
    title: "JAKARTA CHECK! — Berhenti sebelum berbagi",
    description:
      "Platform edukasi literasi digital dan fact-checking. Temukan. Cek. Bongkar. Bagikan Kebenaran.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${jakarta.variable} ${grotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0b0f17] text-slate-100">
        <AnalyticsTracker />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <BadgeToast />
      </body>
    </html>
  );
}