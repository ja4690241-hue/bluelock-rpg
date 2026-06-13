import { sqliteTable, text, integer, real, primaryKey } from "drizzle-orm/sqlite-core";

export const fichasTable = sqliteTable("fichas", {
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
});

export type FichaData = typeof fichasTable.$inferSelect;
export type NewFicha = typeof fichasTable.$inferInsert;
