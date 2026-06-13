import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho para o arquivo de persistência de fichas
const FICHAS_DB_PATH = path.resolve(__dirname, "..", "fichas.json");

// Interface para Ficha
interface FichaData {
  id: string;
  nome: string;
  numero: string;
  classId: string;
  imagemUrl?: string;
  atributos: Record<string, number>;
  pericias: Record<string, number>;
  folego: number;
  treinamentos: string[];
  notas: string;
  armaNome?: string;
  armaDescricao?: string;
  armaBonus?: string;
  criadoEm: string;
  atualizadoEm: string;
  jogadorId?: string; // ID do navegador/sessão do jogador que criou
}

// Carregar fichas do arquivo
function carregarFichas(): FichaData[] {
  try {
    if (fs.existsSync(FICHAS_DB_PATH)) {
      const data = fs.readFileSync(FICHAS_DB_PATH, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Erro ao carregar fichas:", error);
  }
  return [];
}

// Salvar fichas no arquivo
function salvarFichas(fichas: FichaData[]): void {
  try {
    fs.writeFileSync(FICHAS_DB_PATH, JSON.stringify(fichas, null, 2), "utf-8");
  } catch (error) {
    console.error("Erro ao salvar fichas:", error);
  }
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Middleware para parsear JSON
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // ============ API ENDPOINTS ============

  // GET /api/fichas - Listar todas as fichas
  app.get("/api/fichas", (_req, res) => {
    try {
      const fichas = carregarFichas();
      res.json(fichas);
    } catch (error) {
      res.status(500).json({ error: "Erro ao listar fichas" });
    }
  });

  // POST /api/fichas - Salvar ou atualizar ficha
  app.post("/api/fichas", (req, res) => {
    try {
      const ficha: FichaData = req.body;

      if (!ficha.id || !ficha.nome) {
        return res.status(400).json({ error: "ID e nome são obrigatórios" });
      }

      const fichas = carregarFichas();
      const index = fichas.findIndex((f) => f.id === ficha.id);

      const now = new Date().toISOString();
      const fichaSalva = {
        ...ficha,
        atualizadoEm: now,
        criadoEm: ficha.criadoEm || now,
      };

      if (index >= 0) {
        fichas[index] = fichaSalva;
      } else {
        fichas.push(fichaSalva);
      }

      salvarFichas(fichas);
      res.json(fichaSalva);
    } catch (error) {
      res.status(500).json({ error: "Erro ao salvar ficha" });
    }
  });

  // GET /api/fichas/:id - Obter ficha específica
  app.get("/api/fichas/:id", (req, res) => {
    try {
      const fichas = carregarFichas();
      const ficha = fichas.find((f) => f.id === req.params.id);

      if (!ficha) {
        return res.status(404).json({ error: "Ficha não encontrada" });
      }

      res.json(ficha);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter ficha" });
    }
  });

  // DELETE /api/fichas/:id - Deletar ficha
  app.delete("/api/fichas/:id", (req, res) => {
    try {
      const fichas = carregarFichas();
      const index = fichas.findIndex((f) => f.id === req.params.id);

      if (index < 0) {
        return res.status(404).json({ error: "Ficha não encontrada" });
      }

      const deletada = fichas[index];
      fichas.splice(index, 1);
      salvarFichas(fichas);

      res.json({ message: "Ficha deletada", ficha: deletada });
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar ficha" });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    console.log(`API disponível em http://localhost:${port}/api/fichas`);
  });
}

startServer().catch(console.error);
