import { getTranslations, setRequestLocale } from "next-intl/server";

import { Button } from "@repo/ui/components/button";

import { Link } from "@/i18n/navigation";
import { getTrpc } from "@/trpc/server";
import { ProductGrid } from "@/components/product-grid";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Hero");
  const tHome = await getTranslations("Home");

  const trpc = await getTrpc();
  const featured = await trpc.products.featured({ limit: 8 });

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="from-primary/5 absolute inset-0 -z-10 bg-gradient-to-b to-transparent" />
        <div className="mx-auto flex max-w-screen-xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
          <span className="text-primary text-xs font-semibold tracking-widest uppercase">
            {t("eyebrow")}
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="text-muted-foreground mt-6 max-w-xl text-lg">
            {t("subtitle")}
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/products">{t("cta")}</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-screen-xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">
            {tHome("featured")}
          </h2>
          <Link
            href="/products"
            className="text-primary text-sm hover:underline"
          >
            {tHome("viewAll")} →
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>
    </>
  );
}
