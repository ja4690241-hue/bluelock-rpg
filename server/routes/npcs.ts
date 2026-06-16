import express from "express";
import { getDatabase, npcs } from "../db/index";
import { eq } from "drizzle-orm";

export const npcsRouter = express.Router();

// GET todos os NPCs
npcsRouter.get("/", async (req, res) => {
  try {
    const db = getDatabase();
    if (!db) {
      return res.status(503).json({ error: "Banco de dados não disponível" });
    }

    const allNpcs = await db.select().from(npcs);
    res.json(allNpcs);
  } catch (error) {
    console.error("Erro ao buscar NPCs:", error);
    res.status(500).json({ error: "Erro ao buscar NPCs" });
  }
});

// GET um NPC específico
npcsRouter.get("/:id", async (req, res) => {
  try {
    const db = getDatabase();
    if (!db) {
      return res.status(503).json({ error: "Banco de dados não disponível" });
    }

    const npc = await db
      .select()
      .from(npcs)
      .where(eq(npcs.id, req.params.id));

    if (npc.length === 0) {
      return res.status(404).json({ error: "NPC não encontrado" });
    }

    res.json(npc[0]);
  } catch (error) {
    console.error("Erro ao buscar NPC:", error);
    res.status(500).json({ error: "Erro ao buscar NPC" });
  }
});

// POST criar novo NPC
npcsRouter.post("/", async (req, res) => {
  try {
    const db = getDatabase();
    if (!db) {
      return res.status(503).json({ error: "Banco de dados não disponível" });
    }

    const npcData = req.body;

    const result = await db.insert(npcs).values(npcData).returning();

    res.status(201).json(result[0]);
  } catch (error) {
    console.error("Erro ao criar NPC:", error);
    res.status(500).json({ error: "Erro ao criar NPC" });
  }
});

// PUT atualizar NPC
npcsRouter.put("/:id", async (req, res) => {
  try {
    const db = getDatabase();
    if (!db) {
      return res.status(503).json({ error: "Banco de dados não disponível" });
    }

    const npcData = req.body;
    npcData.atualizadoEm = new Date();

    const result = await db
      .update(npcs)
      .set(npcData)
      .where(eq(npcs.id, req.params.id))
      .returning();

    if (result.length === 0) {
      return res.status(404).json({ error: "NPC não encontrado" });
    }

    res.json(result[0]);
  } catch (error) {
    console.error("Erro ao atualizar NPC:", error);
    res.status(500).json({ error: "Erro ao atualizar NPC" });
  }
});

// DELETE remover NPC
npcsRouter.delete("/:id", async (req, res) => {
  try {
    const db = getDatabase();
    if (!db) {
      return res.status(503).json({ error: "Banco de dados não disponível" });
    }

    const result = await db
      .delete(npcs)
      .where(eq(npcs.id, req.params.id))
      .returning();

    if (result.length === 0) {
      return res.status(404).json({ error: "NPC não encontrado" });
    }

    res.json({ success: true, deletado: result[0] });
  } catch (error) {
    console.error("Erro ao deletar NPC:", error);
    res.status(500).json({ error: "Erro ao deletar NPC" });
  }
});
