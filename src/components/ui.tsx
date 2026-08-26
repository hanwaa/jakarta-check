import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  center,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
      )}
      <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-3 text-base text-slate-400">{description}</p>}
    </div>
  );
}

export function ProgressBar({
  value,
  max,
  color,
}: {
  value: number;
  max: number;
  color?: string;
}) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div
      className="h-2.5 w-full overflow-hidden rounded-full bg-white/10"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={`Progres ${pct}%`}
    >
      <div
        className={`h-full rounded-full transition-all duration-500 ${color ?? "bg-accent"}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

const STATUS_STYLES: Record<string, string> = {
  BENAR: "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/40",
  SALAH: "bg-red-500/15 text-red-300 ring-1 ring-red-500/40",
  MENYESATKAN: "bg-orange-500/15 text-orange-300 ring-1 ring-orange-500/40",
  "BELUM TERBUKTI": "bg-slate-500/15 text-slate-300 ring-1 ring-slate-500/40",
};

export function StatusPill({ status }: { status: string }) {
  const cls = STATUS_STYLES[status] ?? "bg-slate-500/15 text-slate-300 ring-1 ring-slate-500/40";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${cls}`}>
      {status}
    </span>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-line bg-surface/80 p-6 shadow-lg shadow-black/30 backdrop-blur-sm ${className}`}>
      {children}
    </div>
  );
}

export function PrimaryButton({
  href,
  children,
  onClick,
  type = "button",
  disabled,
  full,
  className = "",
}: {
  href?: string;
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  full?: boolean;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md shadow-black/40 transition hover:brightness-110 active:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50";
  const cls = `${base} ${full ? "w-full" : ""} ${className}`;
  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}

export function GhostButton({
  href,
  children,
  onClick,
  type = "button",
  full,
  className = "",
}: {
  href?: string;
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  full?: boolean;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-wide text-slate-200 transition hover:border-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
  const cls = `${base} ${full ? "w-full" : ""} ${className}`;
  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
