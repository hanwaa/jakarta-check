"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";

interface MenuItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const ITEMS: MenuItem[] = [
  {
    label: "Academy",
    href: "/academy",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0 text-slate-400 group-hover:text-white transition-colors">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    label: "Quiz Center",
    href: "/quiz",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0 text-slate-400 group-hover:text-white transition-colors">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" x2="12" y1="8" y2="12" />
        <line x1="12" x2="12.01" y1="16" y2="16" />
      </svg>
    ),
  },
  {
    label: "Toolkit",
    href: "/toolkit",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0 text-slate-400 group-hover:text-white transition-colors">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    label: "Detective",
    href: "/detective",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0 text-slate-400 group-hover:text-white transition-colors">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
  },
  {
    label: "Ikuti Challenge",
    href: "/challenge?autostart=1",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0 text-slate-400 group-hover:text-white transition-colors">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
];

export default function ChallengeFAB() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Tutup menu otomatis saat berpindah halaman
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Sembunyikan FAB jika sedang berada di layar pengerjaan soal
  const isChallenge = pathname === "/challenge" || pathname?.startsWith("/challenge/");
  const isQuizMode = pathname?.startsWith("/quiz/") && pathname !== "/quiz";
  const isDetectiveCase = pathname?.startsWith("/detective/") && pathname !== "/detective";

  if (isChallenge || isQuizMode || isDetectiveCase) {
    return null;
  }

  return (
    <aside
      ref={containerRef}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2 font-sans"
      aria-label="Navigasi Aksi Cepat"
    >
      {/* Pop-up Menu */}
      <div
        className={`flex flex-col items-end gap-1.5 transition-all duration-200 ease-out origin-bottom-right ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100 scale-100"
            : "pointer-events-none translate-y-3 opacity-0 scale-90"
        }`}
      >
        <div className="flex flex-col gap-0.5 rounded-2xl border border-white/10 bg-[#0d1421]/95 p-1.5 shadow-xl shadow-black/80 backdrop-blur-md min-w-[170px]">
          {ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => {
                track("fab_click", { cta: item.label, href: item.href });
                setOpen(false);
              }}
              className="group flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium text-slate-200 transition-all hover:bg-white/10 hover:text-white"
            >
              <span className="grid place-items-center size-4">
                {item.icon}
              </span>
              <span className="leading-none">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Floating Trigger Button - Proportional 48px/52px size */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Tutup menu" : "Buka menu cepat"}
        aria-expanded={open}
        className={`group relative flex size-12 sm:size-13 items-center justify-center rounded-2xl bg-gradient-to-tr from-red-600 to-orange-500 text-white shadow-lg shadow-red-950/60 ring-2 ring-red-500/30 ring-offset-2 ring-offset-[#0b0f17] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-600/40 active:scale-95 ${
          open ? "rotate-90 ring-red-400" : "rotate-0"
        }`}
      >
        <span className="pointer-events-none absolute inset-0 rounded-2xl bg-red-400/20 blur-sm group-hover:bg-red-400/30 transition-all" />

        {open ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="relative size-5 text-white transition-transform duration-200"
            aria-hidden="true"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="relative size-5 text-white transition-transform duration-200 group-hover:scale-110"
            aria-hidden="true"
          >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" fillOpacity="0.2" />
          </svg>
        )}
      </button>
    </aside>
  );
}
