import { auth } from "@repo/auth/server";
import { getDb } from "@repo/db";

/**
 * Build the per-request tRPC context.
 *
 * Receives the request headers so we can read the auth cookie without
 * depending on next/headers — the fetch handler passes req.headers, the
 * RSC caller passes `await headers()`.
 */
export async function createContext(opts: { headers: Headers }) {
  const session = await auth.api.getSession({ headers: opts.headers });

  return {
    db: getDb(),
    user: session?.user
      ? {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
        }
      : null,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
