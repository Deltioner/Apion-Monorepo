import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";
import { BadgeCheck } from "lucide-react";

import { getTrpc } from "@/trpc/server";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { ProductGrid } from "@/components/product-grid";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const trpc = await getTrpc();
  const product = await trpc.products.bySlug({ slug });
  if (!product) return {};

  const image = product.images?.[0]?.url;
  return {
    title: product.title,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.description.slice(0, 200),
      url: `${SITE_URL}/${locale}/products/${product.slug}`,
      images: image ? [{ url: image }] : undefined,
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const trpc = await getTrpc();
  const product = await trpc.products.bySlug({ slug });
  if (!product) notFound();

  const related = await trpc.products.related({
    category: product.category,
    excludeId: product.id,
    limit: 4,
  });

  const t = await getTranslations("Product");
  const format = await getFormatter();
  const image = product.images?.[0];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images?.map((i) => i.url),
    sku: product.id,
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: {
      "@type": "Offer",
      price: (product.priceCents / 100).toFixed(2),
      priceCurrency: product.currency,
      availability: product.active
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${SITE_URL}/${locale}/products/${product.slug}`,
    },
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
      <section
        hidden
        dangerouslySetInnerHTML={{
          __html: `<script type="application/ld+json">${JSON.stringify(productJsonLd)}</script>`,
        }}
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="bg-muted relative aspect-[4/3] overflow-hidden rounded-xl">
          {image?.url ? (
            <Image
              src={image.url}
              alt={image.alt ?? product.title}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          ) : null}
        </div>

        <div className="flex flex-col">
          <span className="text-muted-foreground text-xs uppercase">
            {product.category}
          </span>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            {product.title}
          </h1>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed">
            {product.description}
          </p>

          {product.instantDelivery ? (
            <p className="text-muted-foreground mt-4 inline-flex items-center gap-2 text-sm">
              <BadgeCheck className="size-4 text-emerald-500" />
              {t("instantDelivery")}
            </p>
          ) : null}

          <p className="mt-6 text-3xl font-semibold">
            {format.number(product.priceCents / 100, {
              style: "currency",
              currency: product.currency,
            })}
          </p>

          <div className="mt-6 flex">
            <AddToCartButton productId={product.id} />
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-20">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">
            {t("related")}
          </h2>
          <ProductGrid products={related} />
        </section>
      ) : null}
    </div>
  );
}
