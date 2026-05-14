import { betterAuth, type BetterAuthOptions } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
import { nextCookies, toNextJsHandler } from "better-auth/next-js";

export { toNextJsHandler };

import { getDb, schema } from "@repo/db";
import { getFromAddress, getResend } from "@repo/email/client";

const options = {
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  database: drizzleAdapter(getDb(), {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        await getResend().emails.send({
          from: getFromAddress(),
          to: email,
          subject: "Your sign-in link",
          html: `
            <p>Click the link below to sign in. It expires in 5 minutes.</p>
            <p><a href="${url}">${url}</a></p>
            <p>If you didn't request this, ignore this email.</p>
          `,
        });
      },
    }),
    nextCookies(),
  ],
} satisfies BetterAuthOptions;

export const auth = betterAuth(options);
