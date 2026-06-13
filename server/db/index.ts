import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import * as schema from "./schema";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho para o banco de dados SQLite
const DB_PATH = path.resolve(__dirname, "..", "..", "bluelock.db");

// Criar conexão com o banco de dados
const sqlite = new Database(DB_PATH);

// Habilitar foreign keys
sqlite.pragma("foreign_keys = ON");

// Criar instância do Drizzle
export const db = drizzle(sqlite, { schema });

// Inicializar tabelas se não existirem
export function initializeDatabase() {
  try {
    // Criar tabela se não existir
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
    console.log("✓ Banco de dados inicializado com sucesso");
  } catch (error) {
    console.error("Erro ao inicializar banco de dados:", error);
    throw error;
  }
}

export default db;
