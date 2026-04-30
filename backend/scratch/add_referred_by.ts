import { pgTable, uuid, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as dotenv from "dotenv";
import { join } from "path";

dotenv.config({ path: join(process.cwd(), ".env") });

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

async function migrate() {
  console.log("Adding referred_by column to users table...");
  try {
    await pool.query('ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "referred_by" UUID;');
    console.log("Column added successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await pool.end();
  }
}

migrate();
