import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { db, initializeDatabase } from "./db/index";
import { fichasTablePostgres, fichasTableMySQL, fichasTableSQLite } from "./db/schema";
import { eq } from "drizzle-orm";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Interface para Ficha (compatível com o cliente)
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
  jogadorId?: string;
}

// Detectar qual tabela usar baseado na DATABASE_URL
function detectDatabaseType(url?: string): "postgres" | "mysql" | "sqlite" {
  if (!url) return "sqlite";
  if (url.includes("postgresql") || url.includes("postgres")) return "postgres";
  if (url.includes("mysql")) return "mysql";
  return "sqlite";
}

// Obter a tabela correta baseado no tipo de banco
function getFichasTable() {
  const dbType = detectDatabaseType(process.env.DATABASE_URL);
  if (dbType === "postgres") return fichasTablePostgres;
  if (dbType === "mysql") return fichasTableMySQL;
  return fichasTableSQLite;
}

// Converter dados do banco para o formato da API
function dbToFicha(dbRow: any): FichaData {
  return {
    id: dbRow.id,
    nome: dbRow.nome,
    numero: dbRow.numero,
    classId: dbRow.classId,
    imagemUrl: dbRow.imagemUrl,
    atributos: JSON.parse(dbRow.atributos || "{}"),
    pericias: JSON.parse(dbRow.pericias || "{}"),
    folego: dbRow.folego,
    treinamentos: JSON.parse(dbRow.treinamentos || "[]"),
    notas: dbRow.notas || "",
    armaNome: dbRow.armaNome,
    armaDescricao: dbRow.armaDescricao,
    armaBonus: dbRow.armaBonus,
    criadoEm: dbRow.criadoEm,
    atualizadoEm: dbRow.atualizadoEm,
    jogadorId: dbRow.jogadorId,
  };
}

// Converter dados da API para o formato do banco
function fichaToDb(ficha: FichaData) {
  return {
    id: ficha.id,
    nome: ficha.nome,
    numero: ficha.numero,
    classId: ficha.classId,
    imagemUrl: ficha.imagemUrl,
    atributos: JSON.stringify(ficha.atributos),
    pericias: JSON.stringify(ficha.pericias),
    folego: ficha.folego,
    treinamentos: JSON.stringify(ficha.treinamentos),
    notas: ficha.notas,
    armaNome: ficha.armaNome,
    armaDescricao: ficha.armaDescricao,
    armaBonus: ficha.armaBonus,
    criadoEm: ficha.criadoEm,
    atualizadoEm: ficha.atualizadoEm,
    jogadorId: ficha.jogadorId,
  };
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Inicializar banco de dados
  try {
    await initializeDatabase();
  } catch (error) {
    console.error("Erro ao inicializar banco de dados:", error);
    // Continuar mesmo com erro
  }

  // Middleware para parsear JSON
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // ============ API ENDPOINTS ============

  // GET /api/fichas - Listar todas as fichas
  app.get("/api/fichas", async (_req, res) => {
    try {
      const fichasTable = getFichasTable();
      const fichas = await db.select().from(fichasTable);
      const resultado = fichas.map(dbToFicha);
      res.json(resultado);
    } catch (error) {
      console.error("Erro ao listar fichas:", error);
      res.status(500).json({ error: "Erro ao listar fichas" });
    }
  });

  // POST /api/fichas - Salvar ou atualizar ficha
  app.post("/api/fichas", async (req, res) => {
    try {
      const ficha: FichaData = req.body;

      if (!ficha.id || !ficha.nome) {
        return res.status(400).json({ error: "ID e nome são obrigatórios" });
      }

      const now = new Date().toISOString();
      const fichaSalva: FichaData = {
        ...ficha,
        atualizadoEm: now,
        criadoEm: ficha.criadoEm || now,
      };

      const fichasTable = getFichasTable();

      // Verificar se a ficha já existe
      const existente = await db
        .select()
        .from(fichasTable)
        .where(eq(fichasTable.id, ficha.id))
        .limit(1);

      if (existente.length > 0) {
        // Atualizar ficha existente
        await db
          .update(fichasTable)
          .set(fichaToDb(fichaSalva))
          .where(eq(fichasTable.id, ficha.id));
      } else {
        // Inserir nova ficha
        await db.insert(fichasTable).values(fichaToDb(fichaSalva));
      }

      res.json(fichaSalva);
    } catch (error) {
      console.error("Erro ao salvar ficha:", error);
      res.status(500).json({ error: "Erro ao salvar ficha" });
    }
  });

  // GET /api/fichas/:id - Obter ficha específica
  app.get("/api/fichas/:id", async (req, res) => {
    try {
      const fichasTable = getFichasTable();
      const ficha = await db
        .select()
        .from(fichasTable)
        .where(eq(fichasTable.id, req.params.id))
        .limit(1);

      if (ficha.length === 0) {
        return res.status(404).json({ error: "Ficha não encontrada" });
      }

      res.json(dbToFicha(ficha[0]));
    } catch (error) {
      console.error("Erro ao obter ficha:", error);
      res.status(500).json({ error: "Erro ao obter ficha" });
    }
  });

  // DELETE /api/fichas/:id - Deletar ficha
  app.delete("/api/fichas/:id", async (req, res) => {
    try {
      const fichasTable = getFichasTable();
      const ficha = await db
        .select()
        .from(fichasTable)
        .where(eq(fichasTable.id, req.params.id))
        .limit(1);

      if (ficha.length === 0) {
        return res.status(404).json({ error: "Ficha não encontrada" });
      }

      const deletada = dbToFicha(ficha[0]);
      await db.delete(fichasTable).where(eq(fichasTable.id, req.params.id));

      res.json({ message: "Ficha deletada", ficha: deletada });
    } catch (error) {
      console.error("Erro ao deletar ficha:", error);
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
// Trigger redeploy: Mon Jun 15 18:41:46 UTC 2026
