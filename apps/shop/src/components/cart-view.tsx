"use client";

import * as React from "react";
import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@repo/ui/components/button";
import { authClient } from "@repo/auth/client";

import { Link, useRouter } from "@/i18n/navigation";
import { trpc } from "@/trpc/react";
import {
  removeFromGuestCart,
  setGuestCartQuantity,
  useGuestCart,
} from "@/lib/guest-cart";

export function CartView() {
  const t = useTranslations("Cart");
  const format = useFormatter();
  const router = useRouter();
  const session = authClient.useSession();
  const isSignedIn = session.isPending ? null : !!session.data?.user;
  const utils = trpc.useUtils();

  const serverCart = trpc.cart.get.useQuery(undefined, {
    enabled: !!isSignedIn,
  });
  const setQuantity = trpc.cart.setQuantity.useMutation({
    onSuccess: () => utils.cart.get.invalidate(),
  });
  const remove = trpc.cart.remove.useMutation({
    onSuccess: () => utils.cart.get.invalidate(),
  });

  const guestCart = useGuestCart();
  const guestProductIds = guestCart.items.map((i) => i.productId);
  const guestProductsQuery = trpc.products.list.useQuery(
    { limit: 100 },
    { enabled: !isSignedIn && guestProductIds.length > 0 },
  );
  const guestProducts = (guestProductsQuery.data?.items ?? []).filter((p) =>
    guestProductIds.includes(p.id),
  );

  if (isSignedIn === null) {
    return <Loading />;
  }

  // SIGNED-IN VIEW
  if (isSignedIn) {
    const items = serverCart.data?.items ?? [];
    const subtotal = serverCart.data?.subtotalCents ?? 0;
    const currency = serverCart.data?.currency ?? "EUR";

    if (serverCart.isLoading) return <Loading />;
    if (items.length === 0) return <Empty />;

    return (
      <Container>
        <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
        <ul className="divide-border/60 mt-8 divide-y">
          {items.map((row) => (
            <li
              key={row.cartItemId}
              className="flex items-start gap-4 py-5"
            >
              {row.product.images?.[0]?.url ? (
                <Image
                  src={row.product.images[0].url}
                  alt={row.product.title}
                  width={96}
                  height={96}
                  className="bg-muted size-24 rounded-lg object-cover"
                />
              ) : (
                <div className="bg-muted size-24 rounded-lg" />
              )}
              <div className="flex-1">
                <h3 className="font-medium">{row.product.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {row.product.category}
                </p>
                <p className="mt-1 font-semibold">
                  {format.number(row.product.priceCents / 100, {
                    style: "currency",
                    currency: row.product.currency,
                  })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setQuantity.mutate({
                      cartItemId: row.cartItemId,
                      quantity: Math.max(0, row.quantity - 1),
                    })
                  }
                >
                  <Minus className="size-4" />
                </Button>
                <span className="w-6 text-center text-sm">{row.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setQuantity.mutate({
                      cartItemId: row.cartItemId,
                      quantity: row.quantity + 1,
                    })
                  }
                >
                  <Plus className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  onClick={() =>
                    remove.mutate({ cartItemId: row.cartItemId })
                  }
                  aria-label={t("remove")}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>

        <CartTotals
          subtotal={subtotal}
          currency={currency}
          onCheckout={() => router.push("/checkout")}
        />
      </Container>
    );
  }

  // GUEST VIEW
  if (guestCart.items.length === 0) return <Empty />;

  const guestRows = guestCart.items
    .map((g) => ({
      ...g,
      product: guestProducts.find((p) => p.id === g.productId),
    }))
    .filter((r): r is typeof r & { product: NonNullable<typeof r.product> } =>
      !!r.product,
    );

  const guestSubtotal = guestRows.reduce(
    (s, r) => s + r.product.priceCents * r.quantity,
    0,
  );
  const guestCurrency = guestRows[0]?.product.currency ?? "EUR";

  return (
    <Container>
      <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
      <ul className="divide-border/60 mt-8 divide-y">
        {guestRows.map((row) => (
          <li key={row.productId} className="flex items-start gap-4 py-5">
            {row.product.images?.[0]?.url ? (
              <Image
                src={row.product.images[0].url}
                alt={row.product.title}
                width={96}
                height={96}
                className="bg-muted size-24 rounded-lg object-cover"
              />
            ) : (
              <div className="bg-muted size-24 rounded-lg" />
            )}
            <div className="flex-1">
              <h3 className="font-medium">{row.product.title}</h3>
              <p className="text-muted-foreground text-sm">
                {row.product.category}
              </p>
              <p className="mt-1 font-semibold">
                {format.number(row.product.priceCents / 100, {
                  style: "currency",
                  currency: row.product.currency,
                })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setGuestCartQuantity(
                    row.productId,
                    Math.max(0, row.quantity - 1),
                  )
                }
              >
                <Minus className="size-4" />
              </Button>
              <span className="w-6 text-center text-sm">{row.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setGuestCartQuantity(row.productId, row.quantity + 1)
                }
              >
                <Plus className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive"
                onClick={() => removeFromGuestCart(row.productId)}
                aria-label={t("remove")}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <CartTotals
        subtotal={guestSubtotal}
        currency={guestCurrency}
        onCheckout={() => {
          toast.info("Please sign in to continue to checkout");
          router.push("/sign-in?next=/checkout");
        }}
      />
    </Container>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">{children}</div>
  );
}

function Loading() {
  return (
    <Container>
      <div className="text-muted-foreground py-12 text-center">Loading…</div>
    </Container>
  );
}

function Empty() {
  const t = useTranslations("Cart");
  return (
    <Container>
      <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="text-muted-foreground mt-6">{t("empty")}</p>
      <Button asChild className="mt-6">
        <Link href="/products">{t("browse")}</Link>
      </Button>
    </Container>
  );
}

function CartTotals({
  subtotal,
  currency,
  onCheckout,
}: {
  subtotal: number;
  currency: string;
  onCheckout: () => void;
}) {
  const t = useTranslations("Cart");
  const format = useFormatter();
  return (
    <div className="border-border/60 mt-10 flex items-center justify-between border-t pt-6">
      <div>
        <p className="text-muted-foreground text-sm">{t("subtotal")}</p>
        <p className="text-2xl font-semibold">
          {format.number(subtotal / 100, { style: "currency", currency })}
        </p>
      </div>
      <Button size="lg" onClick={onCheckout}>
        {t("checkout")}
      </Button>
    </div>
  );
}
