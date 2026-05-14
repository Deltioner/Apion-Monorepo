"use client";

import * as React from "react";

import { cn } from "@repo/ui/lib/utils";

export function SpotlightCard({
  className,
  children,
  spotlightColor = "rgba(59, 130, 246, 0.18)",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { spotlightColor?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);

  const onMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn(
        "group/spot relative overflow-hidden",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), ${spotlightColor}, transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}
