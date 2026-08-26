import type { ReactNode } from "react";

export type IconProps = {
  className?: string;
  size?: number;
  strokeWidth?: number;
  filled?: boolean;
};

function Base({
  className,
  size = 24,
  strokeWidth = 2,
  filled,
  children,
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const StopIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 2.5 21.5 12 12 21.5 2.5 12 12 2.5z" />
    <circle cx="12" cy="12" r="3.5" />
  </Base>
);

export const SearchIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20.5 20.5-3.8-3.8" />
  </Base>
);

export const DetectiveIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20.5 20.5-3.8-3.8" />
    <circle cx="11" cy="11" r="3" />
  </Base>
);

export const BrainIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M9.5 2A2.5 2.5 0 0 0 7 4.5v.5H6a2.5 2.5 0 0 0 0 5h1v2.5a2.5 2.5 0 0 1-2.5 2.5H4a2.5 2.5 0 0 0 0 5h.5A2.5 2.5 0 0 1 7 22.5v.5a2.5 2.5 0 0 0 5 0V20a2.5 2.5 0 0 1 2.5-2.5h.5a2.5 2.5 0 0 0 0-5H14V10a2.5 2.5 0 0 1 2.5-2.5h.5a2.5 2.5 0 0 0 0-5h-.5A2.5 2.5 0 0 1 14 .5V0a2.5 2.5 0 0 0-4.5 0z" />
  </Base>
);

export const TrophyIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 4h12v5a6 6 0 0 1-12 0z" />
    <path d="M6 6H3a3 3 0 0 0 3 6" />
    <path d="M18 6h3a3 3 0 0 1-3 6" />
    <path d="M12 15v4" />
    <path d="M8 21h8" />
  </Base>
);

export const ScaleIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3v18" />
    <path d="M8 21h8" />
    <path d="M5 7h14" />
    <path d="m12 3-7 4" />
    <path d="m12 3 7 4" />
    <path d="M5 7l-2.2 4a2 2 0 0 0 4.4 0z" />
    <path d="M19 7l2.2 4a2 2 0 0 1-4.4 0z" />
  </Base>
);

export const FlagIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 21V3" />
    <path d="M5 4c4-2.5 8 2.5 14 0v8c-6 2.5-10-2.5-14 0" />
  </Base>
);

export const ShieldIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 2 20 6v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
    <path d="m9 12 2 2 4-4" />
  </Base>
);

export const EyesIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
    <circle cx="12" cy="12" r="2.5" />
  </Base>
);

export const CityIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 21V10h5v11" />
    <path d="M10 21V5h5v16" />
    <path d="M16 21V8h5v13" />
    <path d="M2 21h20" />
    <path d="M6 13h1M12 8h1M18 11h1" />
  </Base>
);

export const ClockIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9.5V13l2.5 2.5" />
    <path d="M9 3h6" />
    <path d="M10 5h4" />
  </Base>
);

export const ChartIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 3v18h18" />
    <path d="M7 15v3" />
    <path d="M11 11v7" />
    <path d="M15 7v11" />
    <path d="M19 4v14" />
  </Base>
);

export const SmileIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 14s1.5 2.5 4 2.5 4-2.5 4-2.5" />
    <path d="M8.5 9.5h.01" />
    <path d="M15.5 9.5h.01" />
    <path d="M14.5 3.5c.8 1.2 0 1.8-1 2.3" />
  </Base>
);

export const MasksIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 6c0-2 3.5-3 8-3s8 1 8 3" />
    <path d="M4 6l-1 10c0 2 3 4 5 4s4-2 4-4l.5-8" />
    <path d="M20 6l1 10c0 2-3 4-5 4s-4-2-4-4" />
    <circle cx="8.5" cy="11.5" r="1.5" />
    <circle cx="15.5" cy="11.5" r="1.5" />
  </Base>
);

export const WarningIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3 2 21h20z" />
    <path d="M12 10v4" />
    <path d="M12 17.5h.01" />
  </Base>
);

export const GlobeIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z" />
  </Base>
);

export const FlaskIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M9 3h6" />
    <path d="M10 3v5.5L5.5 19a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2L14 8.5V3" />
    <path d="M8 14h8" />
  </Base>
);

export const FishingIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 2v4" />
    <path d="M4 2h4" />
    <path d="m6 6-4 5" />
    <path d="M6 6l4 1.5 2.5 8" />
    <path d="M12.5 15.5a2.5 2.5 0 0 1 4.5 1.5" />
  </Base>
);

export const TargetIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
  </Base>
);

export const FlameIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.3 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </Base>
);

export const ScreamIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="13" r="9" />
    <circle cx="9" cy="12" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="15" cy="12" r="1.3" fill="currentColor" stroke="none" />
    <ellipse cx="12" cy="16" rx="3.2" ry="4" />
  </Base>
);

export const MirrorIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M9 3h6" />
    <ellipse cx="12" cy="12" rx="4.5" ry="8" />
    <path d="M12 20v3" />
    <path d="M8 23h8" />
  </Base>
);

export const CompassIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m15.5 8.5-2 5-5 2 2-5z" />
  </Base>
);

export const CalendarIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M8 3v4" />
    <path d="M16 3v4" />
    <path d="M3 10h18" />
    <circle cx="12" cy="15" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="16.5" cy="15" r="1.5" fill="currentColor" stroke="none" />
  </Base>
);

export const PictureIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="9" cy="10" r="1.5" />
    <path d="m4 19 5-5 3 3 4-4 4 4" />
  </Base>
);

export const ShuffleIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.8-1.1 2-1.7 3.3-1.7H22" />
    <path d="m18 2 4 4-4 4" />
    <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" />
    <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" />
    <path d="m18 14 4 4-4 4" />
  </Base>
);

export const ToolboxIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M10 3h4a2 2 0 0 1 2 2v2H8V5a2 2 0 0 1 2-2z" />
    <path d="M3 9a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2h-5v-1h-2v1h-6v-1H7v1H2z" />
    <path d="M2 12h5v1h10v-1h5v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
  </Base>
);

export const CheckCircleIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12.5 2.5 2.5L16 9.5" />
  </Base>
);

export const XCircleIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m9 9 6 6" />
    <path d="m15 9-6 6" />
  </Base>
);

export const ReceiptIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 3h14v18l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5-2 1.5z" />
    <path d="M9 8h6" />
    <path d="M9 12h6" />
    <path d="M9 16h3" />
  </Base>
);

export const GraduationIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m22 9-10-4-10 4 10 4z" />
    <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
    <path d="M22 9v5" />
  </Base>
);

export const BoltIcon = (p: IconProps) => (
  <Base {...p} filled>
    <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
  </Base>
);

export const TrendingUpIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m3 17 6-6 4 4 8-8" />
    <path d="M15 7h6v6" />
  </Base>
);

export const BookIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 6c-1.5-1.5-4-2-8-2v16c4 0 6.5.5 8 2 1.5-1.5 4-2 8-2V4c-4 0-6.5.5-8 2z" />
    <path d="M12 6v16" />
  </Base>
);

export const ShareIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="11" width="18" height="10" rx="1.5" />
    <path d="M12 12V3" />
    <path d="m7 8 5-5 5 5" />
  </Base>
);

export const TabsIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="6" width="18" height="15" rx="1" />
    <path d="M7 6V3h14v15" />
    <path d="M3 11h18" />
    <path d="M3 16h18" />
  </Base>
);

export const PuzzleIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M10 3h4v2a1.5 1.5 0 0 0 3 0V3h4v4h-2a1.5 1.5 0 0 0 0 3h2v4h-2a1.5 1.5 0 0 0 0 3h2v4h-4v-2a1.5 1.5 0 0 0-3 0v2h-4v-2a1.5 1.5 0 0 0-3 0v2H3v-4h2a1.5 1.5 0 0 0 0-3H3V9h2a1.5 1.5 0 0 0 0-3H3V3h4v2a1.5 1.5 0 0 0 3 0z" />
  </Base>
);

export const FinishIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 21V3" />
    <rect x="6" y="4" width="11" height="12" />
    <path d="M6 9h11" />
    <path d="M6 13h11" />
    <path d="M11.5 4v5" />
    <path d="M11.5 9v5" />
  </Base>
);

export const PartyIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 19 19 5" />
    <path d="M8 8 6 6" />
    <path d="M16 16l2 2" />
    <path d="m14 5 1-2 1 2 2 1-2 1-1 2-1-2-2-1z" />
    <path d="m6 13 1-2 1 2 2 1-2 1-1 2-1-2-2-1z" />
  </Base>
);

export const ThumbUpIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 10v12" />
    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88z" />
  </Base>
);

export const BooksIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M9 7h7" />
    <path d="M9 12h5" />
  </Base>
);

export const StopwatchIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9.5V13l2 2" />
    <path d="M9 2h6" />
    <path d="M12 2v3" />
  </Base>
);

export const LockIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    <circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none" />
  </Base>
);

export const LockOpenIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 7.5-2" />
    <circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none" />
  </Base>
);

export const StarIcon = (p: IconProps) => (
  <Base {...p} filled>
    <path d="m12 2 3 6.3 6.9.6-5.2 4.6 1.6 6.8L12 17l-6.3 3.3 1.6-6.8L2 8.9 9 8.3z" />
  </Base>
);

export const UserIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="7" r="3.5" />
    <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
  </Base>
);

export const CameraIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
    <circle cx="12" cy="14" r="3.5" />
  </Base>
);

export const BanIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m5 5 14 14" />
  </Base>
);

export const RepeatIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M17 2l4 4-4 4" />
    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <path d="M7 22l-4-4 4-4" />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </Base>
);

export const RobotIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="4" y="8" width="16" height="12" rx="2" />
    <path d="M12 8V4" />
    <circle cx="12" cy="3" r="1" fill="currentColor" stroke="none" />
    <circle cx="9" cy="13" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="15" cy="13" r="1.2" fill="currentColor" stroke="none" />
    <path d="M9 17h6" />
    <path d="M2 12v4" />
    <path d="M22 12v4" />
  </Base>
);

export const CheckIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m5 12 5 5 9-10" />
  </Base>
);

const norm = (e: string) => e.replace(/[\uFE0F\u200D]/g, "");

const MAP: Record<string, (p: IconProps) => ReactNode> = {
  "🛑": StopIcon,
  "🔍": SearchIcon,
  "🔎": SearchIcon,
  "🕵": DetectiveIcon,
  "🧠": BrainIcon,
  "🏆": TrophyIcon,
  "⚖": ScaleIcon,
  "🚩": FlagIcon,
  "🥊": ShieldIcon,
  "👀": EyesIcon,
  "🏙": CityIcon,
  "🕰": ClockIcon,
  "🕒": ClockIcon,
  "📊": ChartIcon,
  "😅": SmileIcon,
  "🎭": MasksIcon,
  "⚠": WarningIcon,
  "🌐": GlobeIcon,
  "🧪": FlaskIcon,
  "🎣": FishingIcon,
  "🎯": TargetIcon,
  "🔥": FlameIcon,
  "😱": ScreamIcon,
  "🪞": MirrorIcon,
  "🧭": CompassIcon,
  "📅": CalendarIcon,
  "📆": CalendarIcon,
  "🖼": PictureIcon,
  "🔀": ShuffleIcon,
  "🧰": ToolboxIcon,
  "✅": CheckCircleIcon,
  "❌": XCircleIcon,
  "🧾": ReceiptIcon,
  "🎓": GraduationIcon,
  "⚡": BoltIcon,
  "📈": TrendingUpIcon,
  "📖": BookIcon,
  "📤": ShareIcon,
  "🗂": TabsIcon,
  "🧩": PuzzleIcon,
  "🏁": FinishIcon,
  "🎉": PartyIcon,
  "💪": ThumbUpIcon,
  "👍": ThumbUpIcon,
  "📚": BooksIcon,
  "⏱": StopwatchIcon,
  "🔒": LockIcon,
  "🔓": LockOpenIcon,
  "⭐": StarIcon,
  "🧑🎓": UserIcon,
  "📸": CameraIcon,
  "🚫": BanIcon,
  "🔁": RepeatIcon,
  "🤖": RobotIcon,
};

export function EmojiIcon({ e, ...rest }: IconProps & { e: string }) {
  const Icon = MAP[norm(e)];
  if (!Icon) return <span aria-hidden>{e}</span>;
  return <>{Icon(rest)}</>;
}