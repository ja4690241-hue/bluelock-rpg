import { pgTable, text, integer, jsonb, timestamp, boolean } from "drizzle-orm/pg-core";

export const npcs = pgTable("npcs", {
  id: text("id").primaryKey(),
  nome: text("nome").notNull(),
  numero: text("numero"),
  time: text("time"),
  posicao: text("posicao"),
  imagemUrl: text("imagem_url"),
  notas: text("notas"),
  atributos: jsonb("atributos").default({}),
  pericias: jsonb("pericias").default({}),
  saude: integer("saude").default(0),
  saudeMax: integer("saude_max").default(0),
  saudeAtual: integer("saude_atual").default(0),
  folego: integer("folego").default(0),
  folegoMax: integer("folego_max").default(0),
  folegoAtual: integer("folego_atual").default(0),
  ego: integer("ego").default(0),
  egoMax: integer("ego_max").default(0),
  egoPercent: integer("ego_percent").default(0),
  status: text("status").default("ativo"),
  visibilidade: text("visibilidade").default("completo"),
  condicoes: jsonb("condicoes").default([]),
  criadoEm: timestamp("criado_em").defaultNow(),
  atualizadoEm: timestamp("atualizado_em").defaultNow(),
});

export const estadosPJ = pgTable("estados_pj", {
  id: text("id").primaryKey(),
  fichaId: text("ficha_id"),
  nome: text("nome"),
  nomePJ: text("nome_pj").notNull(),
  saude: integer("saude").default(0),
  saudeMax: integer("saude_max").default(0),
  folego: integer("folego").default(0),
  folegoMax: integer("folego_max").default(0),
  ego: integer("ego").default(0),
  egoMax: integer("ego_max").default(0),
  posicaoX: integer("posicao_x").default(0),
  posicaoY: integer("posicao_y").default(0),
  acaoUsada: boolean("acao_usada").default(false),
  acaoBonusUsada: boolean("acao_bonus_usada").default(false),
  reacaoUsada: boolean("reacao_usada").default(false),
  exausto: boolean("exausto").default(false),
  condicoes: jsonb("condicoes").default([]),
  criadoEm: timestamp("criado_em").defaultNow(),
  atualizadoEm: timestamp("atualizado_em").defaultNow(),
});

export const estadoJogo = pgTable("estado_jogo", {
  id: text("id").primaryKey().default("global"),
  rodada: integer("rodada").default(1),
  turnoAtual: integer("turno_atual").default(0),
  iniciativa: jsonb("iniciativa").default([]),
  criadoEm: timestamp("criado_em").defaultNow(),
  atualizadoEm: timestamp("atualizado_em").defaultNow(),
});

// Tabela de fichas dos jogadores — permite que o ADM veja todas as fichas
// independente do dispositivo onde foram criadas
export const fichas = pgTable("fichas", {
  id: text("id").primaryKey(),
  nome: text("nome").notNull(),
  numero: text("numero"),
  classId: text("class_id"),
  imagemUrl: text("imagem_url"),
  atributos: jsonb("atributos").default({}),
  pericias: jsonb("pericias").default({}),
  folego: integer("folego").default(0),
  treinamentos: jsonb("treinamentos").default([]),
  notas: text("notas"),
  armaNome: text("arma_nome"),
  armaDescricao: text("arma_descricao"),
  armaBonus: text("arma_bonus"),
  // Modo do Imperador: 'artilheiro' | 'defensor' | null
  modoImperador: text("modo_imperador"),
  // Classe personalizada
  classePersonalizadaNome: text("classe_personalizada_nome"),
  classePersonalizadaSubtitulo: text("classe_personalizada_subtitulo"),
  classePersonalizadaDescricao: text("classe_personalizada_descricao"),
  classePersonalizadaRole: text("classe_personalizada_role"),
  classePersonalizadaPoderes: jsonb("classe_personalizada_poderes").default([]),
  classePersonalizadaBonusAtributos: jsonb("classe_personalizada_bonus_atributos").default([]),
  classePersonalizadaBonusPericia: jsonb("classe_personalizada_bonus_pericia").default([]),
  classePersonalizadaArma: jsonb("classe_personalizada_arma").default({}),
  historico: jsonb("historico").default([]),
  jogadorId: text("jogador_id"),
  criadoEm: timestamp("criado_em").defaultNow(),
  atualizadoEm: timestamp("atualizado_em").defaultNow(),
});

export type NPC = typeof npcs.$inferSelect;
export type EstadoPJ = typeof estadosPJ.$inferSelect;
export type EstadoJogo = typeof estadoJogo.$inferSelect;
export type Ficha = typeof fichas.$inferSelect;
