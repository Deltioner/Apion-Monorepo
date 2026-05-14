"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { authClient } from "@repo/auth/client";

import { Link } from "@/i18n/navigation";

export function SignUpForm() {
  const t = useTranslations("Auth");
  const search = useSearchParams();
  const next = search.get("next") ?? "/";
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    try {
      const { error } = await authClient.signIn.magicLink({
        email,
        name,
        callbackURL: next,
      });
      if (error) throw new Error(error.message);
      setSent(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send link");
    } finally {
      setPending(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t("signUpTitle")}
        </h1>
        <p className="text-muted-foreground mt-3">{t("sent")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {t("signUpTitle")}
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          {t("signUpSubtitle")}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">{t("name")}</Label>
        <Input
          id="name"
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">{t("email")}</Label>
        <Input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Button type="submit" disabled={pending || !email || !name}>
        {t("signUp")}
      </Button>
      <p className="text-muted-foreground text-center text-sm">
        {t("haveAccount")}{" "}
        <Link href="/sign-in" className="text-foreground font-medium underline">
          {t("signInLink")}
        </Link>
      </p>
    </form>
  );
}
