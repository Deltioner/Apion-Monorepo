"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

function formatTime(locale: string) {
  return new Intl.DateTimeFormat(locale, {
    timeZone: "Europe/Amsterdam",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

export function AmsterdamClock() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatTime(locale));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [locale]);

  // Avoid hydration mismatch — only render the live time on the client
  if (!time) return null;

  return (
    <div className="text-muted-foreground inline-flex items-center gap-2 text-xs">
      <span className="relative flex size-2">
        <span className="bg-emerald-500/60 absolute inset-0 animate-ping rounded-full" />
        <span className="bg-emerald-500 relative inline-flex size-2 rounded-full" />
      </span>
      <span>{t("amsterdamTime", { time })}</span>
    </div>
  );
}
