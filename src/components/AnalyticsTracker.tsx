"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";
import { pushGlobalStat } from "@/lib/stats";

export default function AnalyticsTracker() {
  useEffect(() => {
    track("page_view", { path: window.location.pathname });

    // Register this visitor once per session to the global counter.
    const flag = "jc_global_pv";
    try {
      if (!sessionStorage.getItem(flag)) {
        sessionStorage.setItem(flag, "1");
        void pushGlobalStat("page_view");
      }
    } catch {
      void pushGlobalStat("page_view");
    }
  }, []);

  return null;
}
