import { createAuthClient } from "better-auth/react";
import { magicLinkClient } from "better-auth/client/plugins";
import type { BetterAuthClientPlugin } from "better-auth/client";

const plugins = [magicLinkClient()] satisfies BetterAuthClientPlugin[];

export const authClient = createAuthClient({ plugins });

export const { signIn, signOut, useSession, getSession } = authClient;
