"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";

import { Link } from "@/i18n/navigation";
import { Aurora } from "@/components/aurora";
import { Magnetic } from "@/components/magnetic";

const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
  loading: () => null,
});

function StaggerTitle({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <h1 className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-top"
          aria-hidden
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.55,
              delay: 0.1 + i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export function Hero() {
  const t = useTranslations("Home.hero");

  return (
    <section className="relative overflow-hidden">
      {/* Animated aurora background */}
      <Aurora />

      {/* Animated grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,_black,_transparent_70%)] opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          color: "var(--primary)",
        }}
      />

      {/* 3D scene — absolutely positioned, behind text */}
      <div
        aria-hidden
        className="pointer-events-auto absolute inset-0 z-0 opacity-90 [mask-image:radial-gradient(circle_at_center,_black_30%,_transparent_75%)]"
      >
        <HeroScene />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 pb-24 pt-20 text-center sm:px-6 sm:pt-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-auto"
        >
          <Badge
            variant="secondary"
            className="bg-background/70 px-3 py-1 text-xs backdrop-blur"
          >
            <span className="bg-primary mr-1.5 inline-block size-1.5 animate-pulse rounded-full" />
            {t("eyebrow")}
          </Badge>
        </motion.div>

        <StaggerTitle
          text={t("title")}
          className="pointer-events-none mt-6 max-w-4xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="pointer-events-none text-muted-foreground mt-6 max-w-2xl text-balance text-base sm:text-lg"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="pointer-events-auto mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Magnetic>
            <Button asChild size="lg" className="gap-2 shadow-lg shadow-primary/25">
              <Link href="/contact">
                {t("ctaPrimary")}
                <ArrowRight className="size-4 rtl:rotate-180" />
              </Link>
            </Button>
          </Magnetic>
          <Magnetic>
            <Button asChild size="lg" variant="outline" className="backdrop-blur">
              <Link href="/projects">{t("ctaSecondary")}</Link>
            </Button>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
