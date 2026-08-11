import express from "express";
import { getDatabase, fichas } from "../db/index";
import { eq } from "drizzle-orm";

export const fichasRouter = express.Router();

// Armazenamento em memória como fallback quando não há banco de dados
// Isso garante que o ADM veja as fichas mesmo sem DATABASE_URL configurada
const fichasMemoria: Map<string, any> = new Map();

// GET todas as fichas
fichasRouter.get("/", async (req, res) => {
  try {
    const db = getDatabase();
    if (!db) {
      // Fallback: retornar fichas da memória
      const todasFichas = Array.from(fichasMemoria.values());
      return res.json(todasFichas);
    }
    const todasFichas = await db.select().from(fichas);
    res.json(todasFichas);
  } catch (error) {
    console.error("Erro ao buscar fichas:", error);
    // Fallback em caso de erro
    const todasFichas = Array.from(fichasMemoria.values());
    res.json(todasFichas);
  }
});

// GET uma ficha específica
fichasRouter.get("/:id", async (req, res) => {
  try {
    const db = getDatabase();
    if (!db) {
      const ficha = fichasMemoria.get(req.params.id);
      if (!ficha) return res.status(404).json({ error: "Ficha não encontrada" });
      return res.json(ficha);
    }
    const resultado = await db
      .select()
      .from(fichas)
      .where(eq(fichas.id, req.params.id));
    if (resultado.length === 0) {
      return res.status(404).json({ error: "Ficha não encontrada" });
    }
    res.json(resultado[0]);
  } catch (error) {
    console.error("Erro ao buscar ficha:", error);
    res.status(500).json({ error: "Erro ao buscar ficha" });
  }
});

// POST criar ou atualizar ficha (upsert)
fichasRouter.post("/", async (req, res) => {
  try {
    const fichaData = req.body;
    if (!fichaData.id || !fichaData.nome) {
      return res.status(400).json({ error: "id e nome são obrigatórios" });
    }

    const agora = new Date().toISOString();
    const fichaSalva = {
      ...fichaData,
      atualizadoEm: agora,
      criadoEm: fichaData.criadoEm || agora,
    };

    const db = getDatabase();
    if (!db) {
      // Fallback: salvar em memória
      fichasMemoria.set(fichaData.id, fichaSalva);
      return res.status(201).json(fichaSalva);
    }

    // Verificar se já existe
    const existente = await db
      .select()
      .from(fichas)
      .where(eq(fichas.id, fichaData.id));

    // Mapear campos do cliente para colunas do banco
    const dadosBanco = {
      id: fichaData.id,
      nome: fichaData.nome,
      numero: fichaData.numero || null,
      classId: fichaData.classId || null,
      imagemUrl: fichaData.imagemUrl || null,
      atributos: fichaData.atributos || {},
      pericias: fichaData.pericias || {},
      folego: fichaData.folego || 0,
      treinamentos: fichaData.treinamentos || [],
      notas: fichaData.notas || null,
      armaNome: fichaData.armaNome || null,
      armaDescricao: fichaData.armaDescricao || null,
      armaBonus: fichaData.armaBonus || null,
      modoImperador: fichaData.modoImperador || null,
      classePersonalizadaNome: fichaData.classePersonalizadaNome || null,
      classePersonalizadaSubtitulo: fichaData.classePersonalizadaSubtitulo || null,
      classePersonalizadaDescricao: fichaData.classePersonalizadaDescricao || null,
      classePersonalizadaRole: fichaData.classePersonalizadaRole || null,
      classePersonalizadaPoderes: fichaData.classePersonalizadaPoderes || [],
      classePersonalizadaBonusAtributos: fichaData.classePersonalizadaBonusAtributos || [],
      classePersonalizadaBonusPericia: fichaData.classePersonalizadaBonusPericia || [],
      classePersonalizadaArma: fichaData.classePersonalizadaArma || {},
      historico: fichaData.historico || [],
      jogadorId: fichaData.jogadorId || null,
      atualizadoEm: new Date(),
    };

    let resultado;
    if (existente.length > 0) {
      // Atualizar
      resultado = await db
        .update(fichas)
        .set(dadosBanco)
        .where(eq(fichas.id, fichaData.id))
        .returning();
    } else {
      // Criar
      resultado = await db
        .insert(fichas)
        .values({ ...dadosBanco, criadoEm: new Date() })
        .returning();
    }

    res.status(201).json({ ...fichaSalva, ...resultado[0] });
  } catch (error) {
    console.error("Erro ao salvar ficha:", error);
    // Fallback em caso de erro no banco
    const fichaData = req.body;
    const agora = new Date().toISOString();
    const fichaSalva = { ...fichaData, atualizadoEm: agora, criadoEm: fichaData.criadoEm || agora };
    fichasMemoria.set(fichaData.id, fichaSalva);
    res.status(201).json(fichaSalva);
  }
});

// PUT atualizar ficha
fichasRouter.put("/:id", async (req, res) => {
  try {
    const fichaData = req.body;
    const db = getDatabase();
    if (!db) {
      const fichaAtual = fichasMemoria.get(req.params.id) || {};
      const fichaAtualizada = { ...fichaAtual, ...fichaData, atualizadoEm: new Date().toISOString() };
      fichasMemoria.set(req.params.id, fichaAtualizada);
      return res.json(fichaAtualizada);
    }

    const dadosBanco: any = { ...fichaData, atualizadoEm: new Date() };
    const resultado = await db
      .update(fichas)
      .set(dadosBanco)
      .where(eq(fichas.id, req.params.id))
      .returning();

    if (resultado.length === 0) {
      return res.status(404).json({ error: "Ficha não encontrada" });
    }
    res.json(resultado[0]);
  } catch (error) {
    console.error("Erro ao atualizar ficha:", error);
    res.status(500).json({ error: "Erro ao atualizar ficha" });
  }
});

// DELETE remover ficha
fichasRouter.delete("/:id", async (req, res) => {
  try {
    const db = getDatabase();
    if (!db) {
      fichasMemoria.delete(req.params.id);
      return res.json({ success: true });
    }

    const resultado = await db
      .delete(fichas)
      .where(eq(fichas.id, req.params.id))
      .returning();

    if (resultado.length === 0) {
      return res.status(404).json({ error: "Ficha não encontrada" });
    }
    res.json({ success: true, deletada: resultado[0] });
  } catch (error) {
    console.error("Erro ao deletar ficha:", error);
    res.status(500).json({ error: "Erro ao deletar ficha" });
  }
});
