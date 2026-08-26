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
    <header className="sticky top-0 z-50 border-b border-line bg-[#0b0f17]/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight text-white">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-red-600 text-sm font-black text-white shadow-[0_0_18px_-4px_rgba(239,68,68,0.8)]">
            ✓
          </span>
          <span>
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
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
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

        <div className="flex items-center gap-2">
          <XpCounter />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-slate-300 transition hover:bg-white/5 lg:hidden"
            aria-label="Buka menu"
            aria-expanded={open}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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
