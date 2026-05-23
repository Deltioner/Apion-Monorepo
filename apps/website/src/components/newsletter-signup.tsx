"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, ArrowRight } from "lucide-react";
import { z } from "zod";

import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";

const emailSchema = z.string().trim().email();

async function subscribe(email: string) {
  const res = await fetch("/api/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error("subscribe failed");
  return res.json() as Promise<{ ok: true }>;
}

export function NewsletterSignup() {
  const t = useTranslations("Newsletter");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: subscribe,
    onSuccess: () => {
      toast.success(t("successTitle"), { description: t("successBody") });
      setEmail("");
    },
    onError: () => {
      toast.error(t("errorTitle"), { description: t("errorBody") });
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setError(t("invalidEmail"));
      return;
    }
    setError(null);
    mutation.mutate(parsed.data);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <div className="text-sm font-semibold">{t("title")}</div>
      <p className="text-muted-foreground text-xs">{t("body")}</p>
      <div className="mt-3 flex gap-2">
        <Input
          type="email"
          placeholder={t("placeholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!error}
          required
          className="bg-background flex-1"
        />
        <Button
          type="submit"
          size="sm"
          disabled={mutation.isPending}
          aria-label={t("submit")}
          className="shrink-0"
        >
          {mutation.isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <ArrowRight className="size-4 rtl:rotate-180" />
          )}
        </Button>
      </div>
      {error ? (
        <p className="text-destructive text-xs">{error}</p>
      ) : null}
    </form>
  );
}
