import { getTranslations, setRequestLocale } from "next-intl/server";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@repo/ui/components/button";

import { Link } from "@/i18n/navigation";

export default async function PaymentConfirmPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Confirm");

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <CheckCircle2 className="size-16 text-emerald-500" />
      <h1 className="mt-6 text-2xl font-semibold tracking-tight">
        {t("title")}
      </h1>
      <p className="text-muted-foreground mt-3">{t("subtitle")}</p>
      <div className="mt-8 flex gap-3">
        <Button asChild>
          <Link href="/orders">{t("viewOrders")}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/products">{t("continue")}</Link>
        </Button>
      </div>
    </div>
  );
}
