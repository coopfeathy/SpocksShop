import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString && process.env.NEXT_PHASE !== "phase-production-build") {
  console.warn("DATABASE_URL is not set. Database features will fail until it is configured.");
}

const client = postgres(connectionString ?? "postgres://127.0.0.1:5432/spocks_shop", {
  max: 10,
  idle_timeout: 20,
});

export const db = drizzle(client, { schema });
export { schema };
