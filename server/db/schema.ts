import { 
  pgTable, 
  text, 
  integer, 
  timestamp,
  mysqlTable,
  sqliteTable
} from "drizzle-orm/sql-core";

// Schema genérico que funciona com PostgreSQL, MySQL e SQLite
export const fichasTableSchema = {
  id: text("id").primaryKey(),
  nome: text("nome").notNull(),
  numero: text("numero").notNull(),
  classId: text("classId").notNull(),
  imagemUrl: text("imagemUrl"),
  atributos: text("atributos").notNull(), // JSON string
  pericias: text("pericias").notNull(), // JSON string
  folego: integer("folego").notNull().default(30),
  treinamentos: text("treinamentos").notNull(), // JSON string array
  notas: text("notas").default(""),
  armaNome: text("armaNome"),
  armaDescricao: text("armaDescricao"),
  armaBonus: text("armaBonus"),
  criadoEm: text("criadoEm").notNull(),
  atualizadoEm: text("atualizadoEm").notNull(),
  jogadorId: text("jogadorId"),
};

// Tabelas específicas para cada banco de dados
export const fichasTablePostgres = pgTable("fichas", fichasTableSchema);
export const fichasTableMySQL = mysqlTable("fichas", fichasTableSchema);
export const fichasTableSQLite = sqliteTable("fichas", fichasTableSchema);

export type FichaData = {
  id: string;
  nome: string;
  numero: string;
  classId: string;
  imagemUrl?: string;
  atributos: string;
  pericias: string;
  folego: number;
  treinamentos: string;
  notas: string;
  armaNome?: string;
  armaDescricao?: string;
  armaBonus?: string;
  criadoEm: string;
  atualizadoEm: string;
  jogadorId?: string;
};
