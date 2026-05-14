"use client";

import * as React from "react";

/**
 * Anonymous (pre-sign-in) cart, persisted to localStorage.
 *
 * On sign-in the contents are flushed to the server via
 * `trpc.cart.mergeGuest.mutate(...)` and cleared.
 */

const KEY = "apion.shop.cart.v1";

export type GuestCartItem = {
  productId: string;
  quantity: number;
};

function read(): GuestCartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (i): i is GuestCartItem =>
        typeof i === "object" &&
        i !== null &&
        typeof (i as GuestCartItem).productId === "string" &&
        typeof (i as GuestCartItem).quantity === "number",
    );
  } catch {
    return [];
  }
}

function write(items: GuestCartItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("guest-cart-change"));
}

export function getGuestCart(): GuestCartItem[] {
  return read();
}

export function clearGuestCart() {
  write([]);
}

export function addToGuestCart(productId: string, quantity = 1) {
  const items = read();
  const existing = items.find((i) => i.productId === productId);
  if (existing) {
    existing.quantity = Math.min(99, existing.quantity + quantity);
  } else {
    items.push({ productId, quantity });
  }
  write(items);
}

export function setGuestCartQuantity(productId: string, quantity: number) {
  let items = read();
  if (quantity <= 0) {
    items = items.filter((i) => i.productId !== productId);
  } else {
    const existing = items.find((i) => i.productId === productId);
    if (existing) existing.quantity = Math.min(99, quantity);
    else items.push({ productId, quantity });
  }
  write(items);
}

export function removeFromGuestCart(productId: string) {
  write(read().filter((i) => i.productId !== productId));
}

export function useGuestCart() {
  const [items, setItems] = React.useState<GuestCartItem[]>([]);

  React.useEffect(() => {
    setItems(read());
    const onChange = () => setItems(read());
    window.addEventListener("guest-cart-change", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("guest-cart-change", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  return { items };
}
