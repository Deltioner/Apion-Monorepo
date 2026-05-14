"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { LogOut, User as UserIcon } from "lucide-react";

import { Button } from "@repo/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { authClient } from "@repo/auth/client";

import { Link, useRouter } from "@/i18n/navigation";

export function UserMenu({
  user,
}: {
  user: { email: string; name: string | null } | null;
}) {
  const t = useTranslations("Nav");
  const router = useRouter();

  if (!user) {
    return (
      <Button asChild size="sm" variant="default">
        <Link href="/sign-in">{t("signIn")}</Link>
      </Button>
    );
  }

  const initials = (user.name ?? user.email)
    .split(/\s+/)
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const onSignOut = async () => {
    await authClient.signOut();
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="bg-muted text-foreground hover:bg-accent inline-flex size-9 items-center justify-center rounded-full text-xs font-semibold transition"
          aria-label="Open user menu"
        >
          {initials || <UserIcon className="size-4" />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span className="text-sm font-medium">{user.name ?? user.email}</span>
          {user.name ? (
            <span className="text-muted-foreground text-xs">{user.email}</span>
          ) : null}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/orders">{t("orders")}</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onSignOut} className="text-destructive">
          <LogOut className="mr-2 size-4" />
          {t("signOut")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
