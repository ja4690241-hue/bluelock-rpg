import express from "express";
import { getDatabase, estadosPJ } from "../db/index";
import { eq } from "drizzle-orm";

export const pjsRouter = express.Router();

// GET todos os estados de PJ
pjsRouter.get("/", async (req, res) => {
  try {
    const db = getDatabase();
    if (!db) {
      return res.status(503).json({ error: "Banco de dados não disponível" });
    }

    const allPJs = await db.select().from(estadosPJ);
    res.json(allPJs);
  } catch (error) {
    console.error("Erro ao buscar PJs:", error);
    res.status(500).json({ error: "Erro ao buscar PJs" });
  }
});

// GET um PJ específico
pjsRouter.get("/:id", async (req, res) => {
  try {
    const db = getDatabase();
    if (!db) {
      return res.status(503).json({ error: "Banco de dados não disponível" });
    }

    const pj = await db
      .select()
      .from(estadosPJ)
      .where(eq(estadosPJ.id, req.params.id));

    if (pj.length === 0) {
      return res.status(404).json({ error: "PJ não encontrado" });
    }

    res.json(pj[0]);
  } catch (error) {
    console.error("Erro ao buscar PJ:", error);
    res.status(500).json({ error: "Erro ao buscar PJ" });
  }
});

// POST criar novo estado de PJ
pjsRouter.post("/", async (req, res) => {
  try {
    const db = getDatabase();
    if (!db) {
      return res.status(503).json({ error: "Banco de dados não disponível" });
    }

    const pjData = req.body;

    const result = await db.insert(estadosPJ).values(pjData).returning();

    res.status(201).json(result[0]);
  } catch (error) {
    console.error("Erro ao criar PJ:", error);
    res.status(500).json({ error: "Erro ao criar PJ" });
  }
});

// PUT atualizar estado de PJ
pjsRouter.put("/:id", async (req, res) => {
  try {
    const db = getDatabase();
    if (!db) {
      return res.status(503).json({ error: "Banco de dados não disponível" });
    }

    const pjData = req.body;
    pjData.atualizadoEm = new Date();

    const result = await db
      .update(estadosPJ)
      .set(pjData)
      .where(eq(estadosPJ.id, req.params.id))
      .returning();

    if (result.length === 0) {
      return res.status(404).json({ error: "PJ não encontrado" });
    }

    res.json(result[0]);
  } catch (error) {
    console.error("Erro ao atualizar PJ:", error);
    res.status(500).json({ error: "Erro ao atualizar PJ" });
  }
});

// DELETE remover estado de PJ
pjsRouter.delete("/:id", async (req, res) => {
  try {
    const db = getDatabase();
    if (!db) {
      return res.status(503).json({ error: "Banco de dados não disponível" });
    }

    const result = await db
      .delete(estadosPJ)
      .where(eq(estadosPJ.id, req.params.id))
      .returning();

    if (result.length === 0) {
      return res.status(404).json({ error: "PJ não encontrado" });
    }

    res.json({ success: true, deletado: result[0] });
  } catch (error) {
    console.error("Erro ao deletar PJ:", error);
    res.status(500).json({ error: "Erro ao deletar PJ" });
  }
});
