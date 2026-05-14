import { useFormatter, useTranslations } from "next-intl";
import Image from "next/image";

import type { Product } from "@repo/db";

import { Link } from "@/i18n/navigation";

export function ProductGrid({ products }: { products: Product[] }) {
  const t = useTranslations("Products");
  if (products.length === 0) {
    return <p className="text-muted-foreground">{t("empty")}</p>;
  }
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const format = useFormatter();
  const image = product.images?.[0];
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group border-border/60 bg-card hover:border-primary/40 flex flex-col overflow-hidden rounded-xl border transition"
    >
      <div className="bg-muted relative aspect-[4/3] w-full overflow-hidden">
        {image?.url ? (
          <Image
            src={image.url}
            alt={image.alt ?? product.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-muted-foreground text-xs uppercase">
          {product.category}
        </span>
        <h3 className="line-clamp-1 font-medium">{product.title}</h3>
        <p className="text-muted-foreground line-clamp-2 text-sm">
          {product.description}
        </p>
        <p className="mt-2 font-semibold">
          {format.number(product.priceCents / 100, {
            style: "currency",
            currency: product.currency,
          })}
        </p>
      </div>
    </Link>
  );
}
