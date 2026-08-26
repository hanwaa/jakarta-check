"use client";

import type { ReactNode } from "react";
import { track } from "@/lib/analytics";

export default function ToolLink({
  href,
  tool,
  className = "",
  children,
}: {
  href: string;
  tool: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("external_tool_clicked", { tool })}
      className={className}
    >
      {children}
    </a>
  );
}
