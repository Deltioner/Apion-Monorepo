"use client";

import { useLocale, useTranslations, useFormatter } from "next-intl";
import { toast } from "sonner";

import { Button } from "@repo/ui/components/button";

import { trpc } from "@/trpc/react";
import { Link } from "@/i18n/navigation";

export function CheckoutClient() {
  const t = useTranslations("Checkout");
  const format = useFormatter();
  const locale = useLocale();
  const cart = trpc.cart.get.useQuery();
  const createPayment = trpc.checkout.createPayment.useMutation({
    onSuccess: (data) => {
      window.location.href = data.checkoutUrl;
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const items = cart.data?.items ?? [];
  const subtotalCents = cart.data?.subtotalCents ?? 0;
  const currency = cart.data?.currency ?? "EUR";
  const amountLabel = format.number(subtotalCents / 100, {
    style: "currency",
    currency,
  });

  const onPay = () => {
    createPayment.mutate({
      origin: window.location.origin,
      locale,
    });
  };

  if (cart.isPending) {
    return (
      <div className="text-muted-foreground mx-auto max-w-lg px-4 py-16 text-center sm:px-6 lg:px-8">
        {t("loading")}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-muted-foreground">{t("emptyCart")}</p>
        <Button asChild className="mt-6">
          <Link href="/products">{t("browse")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>

      <ul className="divide-border mt-8 divide-y border-y">
        {items.map((row) => (
          <li
            key={row.product.id}
            className="flex items-center justify-between py-3 text-sm"
          >
            <span className="text-foreground">
              {row.product.title}
              <span className="text-muted-foreground ml-2">
                × {row.quantity}
              </span>
            </span>
            <span>
              {format.number((row.product.priceCents * row.quantity) / 100, {
                style: "currency",
                currency: row.product.currency,
              })}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between text-lg font-semibold">
        <span>{t("total")}</span>
        <span>{amountLabel}</span>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <Button
          size="lg"
          onClick={onPay}
          disabled={createPayment.isPending}
        >
          {createPayment.isPending
            ? t("paying")
            : t("pay", { amount: amountLabel })}
        </Button>
        <Button asChild variant="ghost" size="sm">
          <Link href="/cart">{t("back")}</Link>
        </Button>
      </div>
    </div>
  );
}
