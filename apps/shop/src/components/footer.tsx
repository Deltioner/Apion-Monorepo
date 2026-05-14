import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { SITE_NAME } from "@/lib/site";

export async function Footer() {
  const t = await getTranslations("Footer");
  return (
    <footer className="border-border/60 mt-16 border-t">
      <div className="text-muted-foreground mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm sm:flex-row sm:px-6 lg:px-8">
        <p>
          © {new Date().getFullYear()} {SITE_NAME} — {t("tagline")}
        </p>
        <nav className="flex items-center gap-6">
          <Link href="/terms" className="hover:text-foreground transition">
            {t("terms")}
          </Link>
          <Link href="/privacy" className="hover:text-foreground transition">
            {t("privacy")}
          </Link>
          <Link href="/contact" className="hover:text-foreground transition">
            {t("contact")}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
