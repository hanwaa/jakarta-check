"use client";

import type { MockPost } from "@/lib/types";
import { EmojiIcon } from "@/components/icons";

interface MockPostViewProps {
  post: MockPost;
  selected: Set<string>;
  onSelect: (hotspotId: string) => void;
  disabled?: boolean;
  showAll?: boolean;
  highlightFlags?: boolean;
  large?: boolean;
  accent?: "orange" | "blue";
  sideLabel?: string;
  matchedIds?: Set<string>;
}

export default function MockPostView({
  post,
  selected,
  onSelect,
  disabled,
  showAll,
  highlightFlags,
  large,
  accent = "orange",
  sideLabel,
  matchedIds,
}: MockPostViewProps) {
  const pad = large ? "px-5 py-5 sm:px-6" : "px-4 py-4";

  return (
    <div
      className={`relative overflow-visible rounded-2xl border shadow-lg shadow-black/30 transition ${
        accent === "blue"
          ? "border-blue-500/25 bg-[#0d1526]"
          : "border-orange-500/25 bg-[#171009]"
      }`}
    >
      {sideLabel && (
        <p
          className={`text-center text-[10px] font-black uppercase tracking-[0.3em] ${
            accent === "blue" ? "bg-blue-500/15 text-blue-300" : "bg-orange-500/15 text-orange-300"
          }`}
        >
          {sideLabel}
        </p>
      )}

      <div className={`flex items-center gap-3 border-b border-line ${pad}`}>
        <span
          className={`grid place-items-center rounded-full text-xs font-black ${
            large ? "h-11 w-11 text-sm" : "h-9 w-9"
          } ${accent === "blue" ? "bg-blue-500/20 text-blue-200" : "bg-orange-500/20 text-orange-200"}`}
          aria-hidden
        >
          {post.avatarText}
        </span>
        <div className="flex-1">
          <p className={`${large ? "text-base" : "text-sm"} font-bold text-white`}>{post.username}</p>
          <p className="text-xs text-slate-400">
            {post.platform} · {post.time}
          </p>
        </div>
        <span className="text-slate-500" aria-hidden>
          ⋯
        </span>
      </div>

      <div className={pad}>
        <p className={`font-bold leading-snug text-white ${large ? "text-lg sm:text-xl" : ""}`}>{post.headline}</p>
        <p className={`mt-2 leading-relaxed text-slate-300 ${large ? "text-sm sm:text-base" : "text-sm"}`}>
          {post.body}
        </p>
      </div>

      {/* Hotspot layer — proporsi tombol diperbesar & dirapikan */}
      <div className="pointer-events-none absolute inset-0" aria-hidden={false}>
        {post.hotspots.map((h) => {
          const isSelected = selected.has(h.id);
          const isMatched = matchedIds?.has(h.id) ?? false;
          const isFlag = h.isFlag;
          const showCorrect = showAll && isFlag && highlightFlags;
          return (
            <button
              key={h.id}
              type="button"
              disabled={disabled || isSelected || isMatched}
              onClick={() => onSelect(h.id)}
              title={h.note}
              className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center gap-1.5 rounded-full border-2 px-3.5 py-1.5 text-xs font-bold leading-none shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                showCorrect
                  ? "border-red-400 bg-red-500 text-white shadow-red-500/30 animate-pulse"
                  : isMatched
                    ? "border-emerald-400 bg-emerald-500 text-white shadow-emerald-500/30"
                    : isSelected
                      ? "border-emerald-300 bg-emerald-600 text-white shadow-emerald-500/20"
                      : "border-white/15 bg-[#0b0f17]/90 text-slate-200 hover:border-orange-400 hover:bg-orange-500/20 hover:text-orange-200 hover:shadow-orange-500/20"
              }`}
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              aria-label={`Titik: ${h.label}`}
            >
              {showCorrect ? (
                <EmojiIcon e="🚩" size={12} className="shrink-0" />
              ) : isMatched || isSelected ? (
                <EmojiIcon e="✅" size={12} className="shrink-0" />
              ) : null}
              <span className="whitespace-nowrap">{h.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
