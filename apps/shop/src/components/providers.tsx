"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";

import { TRPCReactProvider } from "@/trpc/react";

import { CartSync } from "./cart-sync";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TRPCReactProvider>
        <CartSync />
        {children}
      </TRPCReactProvider>
    </ThemeProvider>
  );
}
