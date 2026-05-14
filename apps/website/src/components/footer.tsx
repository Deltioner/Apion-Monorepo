import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";

import { Separator } from "@repo/ui/components/separator";

import { Link } from "@/i18n/navigation";
import { Logo } from "./logo";
import { AmsterdamClock } from "./amsterdam-clock";
import { NewsletterSignup } from "./newsletter-signup";

const NAV_LINKS = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/projects", key: "projects" },
  { href: "/contact", key: "contact" },
] as const;

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const year = new Date().getFullYear();

  return (
    <footer className="border-border/40 bg-muted/20 mt-24 border-t">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="text-muted-foreground mt-4 max-w-sm text-sm">
              {t("tagline")}
            </p>
            <div className="text-muted-foreground mt-6 flex items-start gap-2 text-sm">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <div>
                <div className="text-foreground font-medium">
                  {t("addressLabel")}
                </div>
                <div>{t("addressLine1")}</div>
              </div>
            </div>
            <div className="mt-5 space-y-2">
              <AmsterdamClock />
              <div className="text-muted-foreground inline-flex items-center gap-2 text-xs">
                <span className="bg-emerald-500 inline-flex size-2 rounded-full" />
                <span>{t("statusOperational")}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="text-sm font-semibold">{t("navTitle")}</div>
            <ul className="mt-3 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-sm font-semibold">{t("legalTitle")}</div>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {t("terms")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <NewsletterSignup />
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-muted-foreground flex flex-col items-start justify-between gap-2 text-xs sm:flex-row sm:items-center">
          <div>
            © {year} Apion. {t("rights")}
          </div>
        </div>
      </div>
    </footer>
  );
}
