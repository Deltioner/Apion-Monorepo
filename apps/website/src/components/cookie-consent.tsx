"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@repo/ui/components/button";

import { Link } from "@/i18n/navigation";

const STORAGE_KEY = "apion-cookie-consent";

export function CookieConsent() {
  const t = useTranslations("Cookies");
  const [shown, setShown] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setShown(true);
    } catch {
      // localStorage unavailable (e.g. SSR or private mode) — skip the banner.
    }
  }, []);

  const choose = (value: "accept" | "decline") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore
    }
    setShown(false);
  };

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-xl border bg-background/95 p-4 shadow-xl backdrop-blur sm:p-5"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-5">
            <div className="flex-1">
              <div className="text-sm font-semibold">{t("title")}</div>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                {t("body")}{" "}
                <Link
                  href="/privacy"
                  className="text-foreground underline underline-offset-4"
                >
                  {t("learnMore")}
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => choose("decline")}
              >
                {t("decline")}
              </Button>
              <Button size="sm" onClick={() => choose("accept")}>
                {t("accept")}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
