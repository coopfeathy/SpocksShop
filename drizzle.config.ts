import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "postgres://spocks:spocks@127.0.0.1:5432/spocks_shop",
  },
  strict: true,
  verbose: true,
});
