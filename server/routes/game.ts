import express from "express";
import { getDatabase, estadoJogo } from "../db/index";
import { eq } from "drizzle-orm";

export const gameRouter = express.Router();

// GET estado do jogo
gameRouter.get("/state", async (req, res) => {
  try {
    const db = getDatabase();
    if (!db) {
      return res.status(503).json({ error: "Banco de dados não disponível" });
    }

    let state = await db
      .select()
      .from(estadoJogo)
      .where(eq(estadoJogo.id, "global"));

    if (state.length === 0) {
      // Criar estado padrão se não existir
      const result = await db
        .insert(estadoJogo)
        .values({
          id: "global",
          rodada: 1,
          turnoAtual: 0,
          iniciativa: [],
        })
        .returning();
      res.json(result[0]);
    } else {
      res.json(state[0]);
    }
  } catch (error) {
    console.error("Erro ao buscar estado do jogo:", error);
    res.status(500).json({ error: "Erro ao buscar estado do jogo" });
  }
});

// PUT atualizar estado do jogo
gameRouter.put("/state", async (req, res) => {
  try {
    const db = getDatabase();
    if (!db) {
      return res.status(503).json({ error: "Banco de dados não disponível" });
    }

    const gameData = req.body;
    gameData.atualizadoEm = new Date();

    const result = await db
      .update(estadoJogo)
      .set(gameData)
      .where(eq(estadoJogo.id, "global"))
      .returning();

    if (result.length === 0) {
      return res.status(404).json({ error: "Estado do jogo não encontrado" });
    }

    res.json(result[0]);
  } catch (error) {
    console.error("Erro ao atualizar estado do jogo:", error);
    res.status(500).json({ error: "Erro ao atualizar estado do jogo" });
  }
});

// POST resetar jogo
gameRouter.post("/reset", async (req, res) => {
  try {
    const db = getDatabase();
    if (!db) {
      return res.status(503).json({ error: "Banco de dados não disponível" });
    }

    const result = await db
      .update(estadoJogo)
      .set({
        rodada: 1,
        turnoAtual: 0,
        iniciativa: [],
        atualizadoEm: new Date(),
      })
      .where(eq(estadoJogo.id, "global"))
      .returning();

    res.json(result[0]);
  } catch (error) {
    console.error("Erro ao resetar jogo:", error);
    res.status(500).json({ error: "Erro ao resetar jogo" });
  }
});
