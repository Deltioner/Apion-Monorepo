import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";

import { Button } from "@repo/ui/components/button";

import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <section className="relative flex min-h-[60svh] items-center justify-center overflow-hidden">
      <div
        aria-hidden
        className="bg-primary/20 absolute -top-32 left-1/2 -z-10 size-[28rem] -translate-x-1/2 rounded-full blur-3xl"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,_black,_transparent_70%)] opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          color: "var(--primary)",
        }}
      />

      <div className="mx-auto max-w-2xl px-6 text-center">
        <div className="from-primary via-primary/80 to-primary/40 bg-gradient-to-br bg-clip-text text-7xl font-bold tracking-tight text-transparent sm:text-9xl">
          404
        </div>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          {t("title")}
        </h1>
        <p className="text-muted-foreground mx-auto mt-3 max-w-md text-balance text-sm sm:text-base">
          {t("subtitle")}
        </p>
        <Button asChild size="lg" className="mt-8 gap-2">
          <Link href="/">
            <ArrowLeft className="size-4 rtl:rotate-180" />
            {t("cta")}
          </Link>
        </Button>
      </div>
    </section>
  );
}
