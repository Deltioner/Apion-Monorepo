"use client";

import { motion } from "framer-motion";

import { Badge } from "@repo/ui/components/badge";

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="from-primary/8 absolute inset-0 -z-10 bg-gradient-to-b via-transparent to-transparent"
      />
      <div
        aria-hidden
        className="bg-primary/15 absolute -top-32 -right-32 -z-10 h-72 w-72 rounded-full blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-4 pb-12 pt-20 sm:px-6 sm:pt-28 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Badge variant="secondary" className="px-3 py-1 text-xs">
            {eyebrow}
          </Badge>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mt-5 max-w-3xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
        >
          {title}
        </motion.h1>
        {subtitle ? (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-muted-foreground mt-5 max-w-2xl text-balance text-base sm:text-lg"
          >
            {subtitle}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
}
