import type { Config } from "drizzle-kit";

export default {
  schema: ["./app/configs/schema.ts"],
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_NEON_DB_CONNECTION_STRING || process.env.DATABASE_URL!,
  },
} satisfies Config;

