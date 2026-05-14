import { auth, toNextJsHandler } from "@repo/auth/server";

export const runtime = "nodejs";

export const { GET, POST } = toNextJsHandler(auth);
