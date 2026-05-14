"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@repo/ui/components/button";
import { authClient } from "@repo/auth/client";

import { trpc } from "@/trpc/react";
import { addToGuestCart } from "@/lib/guest-cart";

export function AddToCartButton({ productId }: { productId: string }) {
  const t = useTranslations("Product");
  const [adding, setAdding] = React.useState(false);
  const session = authClient.useSession();
  const utils = trpc.useUtils();
  const addMutation = trpc.cart.add.useMutation({
    onSuccess: () => utils.cart.get.invalidate(),
  });

  const onClick = async () => {
    setAdding(true);
    try {
      if (session.data?.user) {
        await addMutation.mutateAsync({ productId, quantity: 1 });
      } else {
        addToGuestCart(productId, 1);
      }
      toast.success(t("added"));
    } catch {
      toast.error("Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  return (
    <Button onClick={onClick} disabled={adding} size="lg">
      <ShoppingCart className="mr-2 size-4" />
      {adding ? t("adding") : t("addToCart")}
    </Button>
  );
}
