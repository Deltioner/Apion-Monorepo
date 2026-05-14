"use client";

import { useTranslations } from "next-intl";

import { partners } from "@/content/partners";

export function PartnersMarquee() {
  const t = useTranslations("Trust");
  const tItems = useTranslations("Partners.items");
  const doubled = [...partners, ...partners];

  return (
    <section className="border-border/40 relative overflow-hidden border-y bg-background py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-muted-foreground text-center text-xs font-medium uppercase tracking-widest">
          {t("label")}
        </div>

        <div
          className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,_transparent,_black_10%,_black_90%,_transparent)]"
        >
          <div className="flex w-max gap-12 animate-[marquee_36s_linear_infinite] hover:[animation-play-state:paused]">
            {doubled.map((key, i) => (
              <div
                key={`${key}-${i}`}
                className="text-muted-foreground/80 hover:text-foreground flex shrink-0 items-center gap-2 text-sm font-semibold tracking-tight transition-colors"
              >
                <span className="bg-primary/60 inline-block size-2 rounded-full" />
                {tItems(key)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        :is([dir="rtl"]) .animate-\\[marquee_36s_linear_infinite\\] {
          animation-direction: reverse;
        }
      `}</style>
    </section>
  );
}
