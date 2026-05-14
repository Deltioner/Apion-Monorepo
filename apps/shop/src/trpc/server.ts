import "server-only";

import { cache } from "react";
import { headers } from "next/headers";

import { appRouter, createContext } from "@repo/api";

/**
 * Server-side tRPC caller for use inside React Server Components.
 *
 * Wrapped in React `cache` so a single request reuses one context (which in
 * turn reuses one Supabase client and DB connection).
 */
export const getTrpc = cache(async () => {
  const ctx = await createContext({ headers: await headers() });
  return appRouter.createCaller(ctx);
});
