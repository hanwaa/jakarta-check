"use client";

import { useEffect, useState } from "react";
import { fetchGlobalStats, getLocalStats, type LiveStats } from "@/lib/stats";
import { EmojiIcon } from "@/components/icons";

function formatNumber(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}rb+` : `${n}+`;
}

const REFRESH_MS = 15000;

export default function StatsSection() {
  const [stats, setStats] = useState<LiveStats | null>(null);
  const [live, setLive] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const global = await fetchGlobalStats();
      if (cancelled) return;
      if (global) {
        setStats(global);
        setLive(true);
      } else {
        setStats(getLocalStats());
        setLive(false);
      }
    };

    void load();
    const t = window.setInterval(load, REFRESH_MS);

    return () => {
      cancelled = true;
      window.clearInterval(t);
    };
  }, []);

  const items = [
    { value: stats ? formatNumber(stats.learners) : "…", label: "Orang telah belajar", emoji: "🧑‍🎓", color: "text-blue-400" },
    { value: stats ? formatNumber(stats.checks) : "…", label: "Cara cek informasi", emoji: "🔍", color: "text-red-400" },
    { value: stats ? formatNumber(stats.challengers) : "…", label: "Peserta mengikuti challenge", emoji: "🏁", color: "text-orange-400" },
  ];

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        {items.map((it) => (
          <div
            key={it.label}
            className="rounded-2xl border border-line bg-surface/80 p-6 text-center shadow-lg shadow-black/30"
          >
            <span className={`inline-flex ${it.color}`} aria-hidden>
              <EmojiIcon e={it.emoji} size={24} />
            </span>
            <p className="mt-2 font-display text-4xl font-black tracking-tight text-white">{it.value}</p>
            <p className="mt-1 text-sm text-slate-400">{it.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-slate-500">
        <span
          className={`inline-block h-2 w-2 rounded-full ${live ? "bg-emerald-400 jc-blink" : "bg-slate-500"}`}
          aria-hidden
        />
        {live ? "Statistik global real-time — diperbarui otomatis dari seluruh pengunjung." : "Mode offline — menampilkan statistik perangkatmu."}
      </p>
    </div>
  );
}
