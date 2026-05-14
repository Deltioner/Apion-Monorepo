import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import { ShoppingBag } from "lucide-react";

import { auth } from "@repo/auth/server";

import { Link } from "@/i18n/navigation";
import { SITE_NAME } from "@/lib/site";

import { CartIndicator } from "./cart-indicator";
import { UserMenu } from "./user-menu";

export async function Header() {
  const t = await getTranslations("Nav");
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user ?? null;

  return (
    <header className="border-border/60 bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <ShoppingBag className="size-5" />
          <span>{SITE_NAME}</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground transition"
          >
            {t("home")}
          </Link>
          <Link
            href="/products"
            className="text-muted-foreground hover:text-foreground transition"
          >
            {t("products")}
          </Link>
          {user ? (
            <Link
              href="/orders"
              className="text-muted-foreground hover:text-foreground transition"
            >
              {t("orders")}
            </Link>
          ) : null}
        </nav>

        <div className="flex items-center gap-3">
          <CartIndicator isSignedIn={!!user} />
          <UserMenu
            user={
              user
                ? {
                    email: user.email,
                    name: user.name,
                  }
                : null
            }
          />
        </div>
      </div>
    </header>
  );
}
