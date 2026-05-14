import { config as loadEnv } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Load env from any monorepo app's .env.local, then fall back to the package's own .env
loadEnv({ path: "../../apps/website/.env.local" });
loadEnv({ path: "../../apps/shop/.env.local" });
loadEnv({ path: "../../apps/saas/.env.local" });
loadEnv();

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error(
    "DATABASE_URL is not set. Create .env.local in one of the apps (website/shop/saas) from its .env.example.",
  );
}

export default defineConfig({
  schema: "./src/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url },
  strict: true,
  verbose: true,
});
