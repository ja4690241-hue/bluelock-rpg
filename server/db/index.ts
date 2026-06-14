import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import { drizzle as drizzleMySQL } from "drizzle-orm/mysql2";
import { drizzle as drizzleSQLite } from "drizzle-orm/better-sqlite3";
import postgres from "postgres";
import mysql from "mysql2/promise";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import * as schema from "./schema";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Tipo para o banco de dados
export type Database = ReturnType<typeof createDatabase>;

// Detectar qual banco de dados usar baseado na DATABASE_URL
function detectDatabaseType(url?: string): "postgres" | "mysql" | "sqlite" {
  if (!url) return "sqlite";
  if (url.includes("postgresql") || url.includes("postgres")) return "postgres";
  if (url.includes("mysql")) return "mysql";
  return "sqlite";
}

// Criar conexão com o banco de dados apropriado
export function createDatabase() {
  const databaseUrl = process.env.DATABASE_URL;
  const dbType = detectDatabaseType(databaseUrl);

  console.log(`📊 Usando banco de dados: ${dbType.toUpperCase()}`);

  if (dbType === "postgres" && databaseUrl) {
    try {
      const client = postgres(databaseUrl, {
        max: 1, // Vercel Serverless: use apenas 1 conexão
        idle_timeout: 20,
        connect_timeout: 10,
      });
      const db = drizzlePostgres(client, { schema });
      console.log("✓ Conectado ao PostgreSQL com sucesso");
      return db;
    } catch (error) {
      console.error("❌ Erro ao conectar ao PostgreSQL:", error);
      throw error;
    }
  }

  if (dbType === "mysql" && databaseUrl) {
    try {
      const pool = mysql.createPool(databaseUrl);
      const db = drizzleMySQL(pool, { schema });
      console.log("✓ Conectado ao MySQL/TiDB com sucesso");
      return db;
    } catch (error) {
      console.error("❌ Erro ao conectar ao MySQL:", error);
      throw error;
    }
  }

  // Fallback para SQLite local
  try {
    const DB_PATH = path.resolve(__dirname, "..", "..", "bluelock.db");
    const sqlite = new Database(DB_PATH);
    sqlite.pragma("foreign_keys = ON");
    const db = drizzleSQLite(sqlite, { schema });
    console.log("✓ Usando SQLite local (sem sincronização entre dispositivos)");
    return db;
  } catch (error) {
    console.error("❌ Erro ao conectar ao SQLite:", error);
    throw error;
  }
}

// Inicializar o banco de dados
export const db = createDatabase();

// Inicializar tabelas se não existirem
export async function initializeDatabase() {
  try {
    const databaseUrl = process.env.DATABASE_URL;
    const dbType = detectDatabaseType(databaseUrl);

    if (dbType === "postgres" || dbType === "mysql") {
      // Para bancos remotos, criar tabela via SQL direto
      const createTableSQL =
        dbType === "postgres"
          ? `
        CREATE TABLE IF NOT EXISTS fichas (
          id TEXT PRIMARY KEY,
          nome TEXT NOT NULL,
          numero TEXT NOT NULL,
          classId TEXT NOT NULL,
          imagemUrl TEXT,
          atributos TEXT NOT NULL,
          pericias TEXT NOT NULL,
          folego INTEGER NOT NULL DEFAULT 30,
          treinamentos TEXT NOT NULL,
          notas TEXT DEFAULT '',
          armaNome TEXT,
          armaDescricao TEXT,
          armaBonus TEXT,
          criadoEm TEXT NOT NULL,
          atualizadoEm TEXT NOT NULL,
          jogadorId TEXT
        );
      `
          : `
        CREATE TABLE IF NOT EXISTS fichas (
          id VARCHAR(255) PRIMARY KEY,
          nome VARCHAR(255) NOT NULL,
          numero VARCHAR(255) NOT NULL,
          classId VARCHAR(255) NOT NULL,
          imagemUrl TEXT,
          atributos LONGTEXT NOT NULL,
          pericias LONGTEXT NOT NULL,
          folego INT NOT NULL DEFAULT 30,
          treinamentos LONGTEXT NOT NULL,
          notas TEXT DEFAULT '',
          armaNome VARCHAR(255),
          armaDescricao TEXT,
          armaBonus TEXT,
          criadoEm VARCHAR(255) NOT NULL,
          atualizadoEm VARCHAR(255) NOT NULL,
          jogadorId VARCHAR(255)
        );
      `;

      // Executar SQL direto
      if (dbType === "postgres") {
        const client = (db as any).client;
        await client.unsafe(createTableSQL);
      } else if (dbType === "mysql") {
        const pool = (db as any).session.client;
        const connection = await pool.getConnection();
        await connection.execute(createTableSQL);
        connection.release();
      }
    } else {
      // SQLite
      const sqlite = (db as any).client;
      sqlite.exec(`
        CREATE TABLE IF NOT EXISTS fichas (
          id TEXT PRIMARY KEY,
          nome TEXT NOT NULL,
          numero TEXT NOT NULL,
          classId TEXT NOT NULL,
          imagemUrl TEXT,
          atributos TEXT NOT NULL,
          pericias TEXT NOT NULL,
          folego INTEGER NOT NULL DEFAULT 30,
          treinamentos TEXT NOT NULL,
          notas TEXT DEFAULT '',
          armaNome TEXT,
          armaDescricao TEXT,
          armaBonus TEXT,
          criadoEm TEXT NOT NULL,
          atualizadoEm TEXT NOT NULL,
          jogadorId TEXT
        );
      `);
    }

    console.log("✓ Banco de dados inicializado com sucesso");
  } catch (error) {
    console.error("Erro ao inicializar banco de dados:", error);
    // Não lançar erro aqui, deixar a aplicação continuar
  }
}

export default db;
