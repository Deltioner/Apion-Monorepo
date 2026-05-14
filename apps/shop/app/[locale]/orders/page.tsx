import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";

import { auth } from "@repo/auth/server";

import { getTrpc } from "@/trpc/server";

export default async function OrdersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect(`/${locale}/sign-in?next=/orders`);

  const trpc = await getTrpc();
  const orders = await trpc.orders.mine({ limit: 20 });

  const t = await getTranslations("Orders");
  const format = await getFormatter();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>

      {orders.length === 0 ? (
        <p className="text-muted-foreground mt-6">{t("empty")}</p>
      ) : (
        <ul className="divide-border/60 mt-8 divide-y">
          {orders.map((o) => (
            <li
              key={o.id}
              className="flex items-center justify-between gap-4 py-5"
            >
              <div>
                <p className="font-medium">
                  {t("orderNumber")} {o.orderNumber}
                </p>
                <p className="text-muted-foreground text-sm">
                  {format.dateTime(o.createdAt, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  {format.number(o.totalCents / 100, {
                    style: "currency",
                    currency: o.currency,
                  })}
                </p>
                <p className="text-muted-foreground text-xs uppercase">
                  {o.status}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
