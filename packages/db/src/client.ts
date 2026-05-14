import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

const globalForDb = globalThis as unknown as {
  conn?: ReturnType<typeof postgres>;
  db?: PostgresJsDatabase<typeof schema>;
};

function getConnectionString(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add it to apps/website/.env.local — see .env.example.",
    );
  }
  return url;
}

export function getDb(): PostgresJsDatabase<typeof schema> {
  if (!globalForDb.db) {
    if (!globalForDb.conn) {
      globalForDb.conn = postgres(getConnectionString(), {
        prepare: false,
        max: 1,
      });
    }
    globalForDb.db = drizzle(globalForDb.conn, { schema });
  }
  return globalForDb.db;
}

export { schema };
