import { cn } from "@repo/ui/lib/utils";

export function LogoMark({
  className,
  animated = true,
}: {
  className?: string;
  animated?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-7 shrink-0", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="apion-bg" x1="0" y1="0" x2="64" y2="64">
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#1E3A8A" />
        </linearGradient>
        <radialGradient id="apion-glow" cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#FFFFFF" stopOpacity="0.5" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="64" height="64" rx="14" fill="url(#apion-bg)" />
      <rect
        width="64"
        height="64"
        rx="14"
        fill="url(#apion-glow)"
        opacity="0.6"
      />

      {/* Three connecting lines forming an A */}
      <g
        stroke="white"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeOpacity="0.95"
      >
        <line x1="32" y1="14" x2="14" y2="50" />
        <line x1="32" y1="14" x2="50" y2="50" />
        <line x1="20.5" y1="38" x2="43.5" y2="38" />
      </g>

      {/* Three nodes — the "ion" particles at each vertex */}
      <g fill="white">
        <circle cx="14" cy="50" r="3.5" />
        <circle cx="50" cy="50" r="3.5" />
        {/* Apex node: pulsing glow */}
        <circle cx="32" cy="14" r="5" fillOpacity="0.25">
          {animated && (
            <animate
              attributeName="r"
              values="5;7;5"
              dur="2.4s"
              repeatCount="indefinite"
            />
          )}
        </circle>
        <circle cx="32" cy="14" r="3.75" />
      </g>
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-semibold tracking-tight",
        className,
      )}
    >
      <LogoMark />
      <span className="text-base">Apion</span>
    </span>
  );
}
