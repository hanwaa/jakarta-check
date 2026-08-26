"use client";

import { useEffect, useState } from "react";
import { getBadgeInfo } from "@/lib/store";
import { track } from "@/lib/analytics";
import { EmojiIcon } from "@/components/icons";

interface Toast {
  id: string;
  badgeId: string;
}

export function BadgeToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<string>;
      const badgeId = custom.detail;
      if (!badgeId) return;
      const id = `${badgeId}-${Date.now()}`;
      setToasts((prev) => [...prev, { id, badgeId }]);
      track("badge_unlocked", { badgeId });
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 6000);
    };
    window.addEventListener("jc-badge-unlock", handler as EventListener);
    return () => window.removeEventListener("jc-badge-unlock", handler as EventListener);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex flex-col gap-2">
      {toasts.map((t) => {
        const badge = getBadgeInfo(t.badgeId);
        if (!badge) return null;
        return (
          <div
            key={t.id}
            className="jc-pop pointer-events-auto flex items-center gap-3 rounded-2xl border border-amber-500/40 bg-[#141008] p-4 shadow-xl shadow-black/50"
            role="status"
            aria-live="polite"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 text-white" aria-hidden>
              <EmojiIcon e={badge.emoji} size={26} />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Badge baru!</p>
              <p className="text-sm font-extrabold text-white">{badge.name}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}