"use client";

import { ShoppingCart } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { trpc } from "@/trpc/react";
import { useGuestCart } from "@/lib/guest-cart";

export function CartIndicator({ isSignedIn }: { isSignedIn: boolean }) {
  const guestCart = useGuestCart();
  const serverCart = trpc.cart.get.useQuery(undefined, {
    enabled: isSignedIn,
    staleTime: 30_000,
  });

  const count = isSignedIn
    ? (serverCart.data?.items.reduce((s, i) => s + i.quantity, 0) ?? 0)
    : guestCart.items.reduce((s, i) => s + i.quantity, 0);

  return (
    <Link
      href="/cart"
      aria-label="Cart"
      className="hover:bg-accent relative inline-flex size-9 items-center justify-center rounded-md transition"
    >
      <ShoppingCart className="size-5" />
      {count > 0 ? (
        <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-[10px] font-semibold">
          {count > 99 ? "99+" : count}
        </span>
      ) : null}
    </Link>
  );
}
