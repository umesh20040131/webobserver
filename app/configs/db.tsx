import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const connectionString =
  process.env.NEXT_PUBLIC_NEON_DB_CONNECTION_STRING ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "Missing Neon connection string. Set NEXT_PUBLIC_NEON_DB_CONNECTION_STRING or DATABASE_URL."
  );
}

export const db = drizzle(neon(connectionString));
