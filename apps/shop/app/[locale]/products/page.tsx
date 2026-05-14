import { getTranslations, setRequestLocale } from "next-intl/server";

import { getTrpc } from "@/trpc/server";
import { ProductGrid } from "@/components/product-grid";

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const [{ locale }, sp] = await Promise.all([params, searchParams]);
  setRequestLocale(locale);
  const t = await getTranslations("Products");

  const trpc = await getTrpc();
  const { items } = await trpc.products.list({
    category: sp.category,
    search: sp.q,
    limit: 48,
  });

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">
        {t("title")}
      </h1>
      <ProductGrid products={items} />
    </div>
  );
}
