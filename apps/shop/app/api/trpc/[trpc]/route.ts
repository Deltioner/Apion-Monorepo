import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter, createContext } from "@repo/api";

export const runtime = "nodejs";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext({ headers: req.headers }),
    onError({ error, path }) {
      if (process.env.NODE_ENV !== "production") {
        console.error(`[trpc] ${path ?? "<no-path>"}:`, error);
      }
    },
  });

export { handler as GET, handler as POST };
