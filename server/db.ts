import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

// Database connection is optional - will be null if DATABASE_URL is not set
let poolInstance: pg.Pool | null = null;
let dbInstance: ReturnType<typeof drizzle> | null = null;

if (process.env.DATABASE_URL) {
  poolInstance = new Pool({ connectionString: process.env.DATABASE_URL });
  dbInstance = drizzle(poolInstance, { schema });
} else {
  console.warn("⚠️  DATABASE_URL not set. Database features will be disabled.");
}

export const pool = poolInstance;
export const db = dbInstance;
