import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { config } from "../config/env";
import { logger } from "../lib/logger";
import * as schema from "./schema";

const connectionString = config.database.connectionString;

const client = postgres(connectionString, {
  max: 5,
  idle_timeout: 20,
  connect_timeout: 10,
});

export const db = drizzle(client, { schema });

export const connectDB = async (): Promise<void> => {
  try {
    await client`SELECT 1`;
    logger.info("PostgreSQL connected successfully (Drizzle)");
  } catch (error) {
    logger.error("PostgreSQL connection error", { error });
    process.exit(1);
  }
};

export async function pingDB(): Promise<boolean> {
  try {
    await client`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}

export default db;
