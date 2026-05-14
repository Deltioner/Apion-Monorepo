"use client";

import * as React from "react";

import { authClient } from "@repo/auth/client";

import { trpc } from "@/trpc/react";
import { clearGuestCart, getGuestCart } from "@/lib/guest-cart";

/**
 * On sign-in, flush the guest (localStorage) cart into the user's server cart
 * via tRPC, then clear localStorage. Mounted once at the layout level.
 *
 * We watch the Better Auth session reactively — when it transitions from
 * unauthenticated to authenticated, merge once.
 */
export function CartSync() {
  const utils = trpc.useUtils();
  const merge = trpc.cart.mergeGuest.useMutation();
  const session = authClient.useSession();
  const wasSignedIn = React.useRef(false);

  React.useEffect(() => {
    const isSignedIn = !!session.data?.user;
    if (!wasSignedIn.current && isSignedIn) {
      const guest = getGuestCart();
      if (guest.length > 0) {
        merge
          .mutateAsync({ items: guest })
          .then(() => {
            clearGuestCart();
            utils.cart.get.invalidate();
          })
          .catch(() => {
            // Best-effort. Leave the guest cart alone on failure.
          });
      }
    }
    wasSignedIn.current = isSignedIn;
    // merge / utils identities are stable for the lifetime of the provider tree
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.data?.user]);

  return null;
}
