"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useUserState } from "@/lib/store";
import { EmojiIcon } from "@/components/icons";

const LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/cek-fakta", label: "Cek Fakta" },
  { href: "/academy", label: "Academy" },
  { href: "/quiz", label: "Quiz Center" },
  { href: "/toolkit", label: "Toolkit" },
  { href: "/detective", label: "Detective" },
];

export function XpCounter() {
  const state = useUserState();

  return (
    <Link
      href="/progress"
      className="inline-flex items-center gap-1 rounded-full border border-line bg-white/5 px-3 py-1 text-xs font-bold text-amber-300 transition hover:border-amber-400/60"
      aria-label={`XP kamu: ${state.xp}`}
    >
      <EmojiIcon e="⭐" size={14} className="text-amber-400" /> {state.xp.toLocaleString("id-ID")} XP
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-[#0b0f17]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 sm:h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-base sm:text-lg font-extrabold tracking-tight text-white transition hover:opacity-90">
          <span className="grid size-7 sm:size-8 place-items-center rounded-lg bg-red-600 text-xs sm:text-sm font-black text-white shadow-[0_0_14px_-2px_rgba(239,68,68,0.7)]">
            ✓
          </span>
          <span className="tracking-tight">
            JAKARTA <span className="text-red-500">CHECK!</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
          {LINKS.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-lg px-2.5 py-1.5 text-[13px] sm:text-sm font-semibold transition ${
                  active
                    ? "bg-red-500/15 text-red-300"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <XpCounter />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-line text-slate-300 transition hover:bg-white/5 lg:hidden"
            aria-label="Buka menu"
            aria-expanded={open}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-[#0b0f17] px-4 py-3 lg:hidden" aria-label="Menu mobile">
          <div className="flex flex-col gap-1">
            {[...LINKS, { href: "/progress", label: "Progres Saya" }].map((l) => {
              const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                    active ? "bg-red-500/15 text-red-300" : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
