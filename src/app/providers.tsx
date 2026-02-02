"use client";

import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleImageError = (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLImageElement)) {
        return;
      }
      if (target.dataset.fallbackApplied === "true") {
        return;
      }
      if (!target.src.includes("figma.com/api/mcp/asset")) {
        return;
      }

      target.dataset.fallbackApplied = "true";
      target.src = "/assets/placeholder.svg";
      target.style.objectFit = "contain";
    };

    document.addEventListener("error", handleImageError, true);
    return () => {
      document.removeEventListener("error", handleImageError, true);
    };
  }, []);

  return <SessionProvider>{children}</SessionProvider>;
}
