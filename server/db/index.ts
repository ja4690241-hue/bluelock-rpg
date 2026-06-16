import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

let db: ReturnType<typeof drizzle> | null = null;

export function initializeDatabase() {
  if (db) return db;

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.warn(
      "⚠️  DATABASE_URL não configurada. Usando modo sem banco de dados (localStorage apenas)."
    );
    return null;
  }

  try {
    const pool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    db = drizzle(pool, { schema });
    console.log("✅ Banco de dados conectado com sucesso!");
    return db;
  } catch (error) {
    console.error("❌ Erro ao conectar ao banco de dados:", error);
    return null;
  }
}

export function getDatabase() {
  if (!db) {
    return initializeDatabase();
  }
  return db;
}

export * from "./schema";
