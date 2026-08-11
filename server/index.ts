import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { initializeDatabase } from "./db/index";
import { npcsRouter } from "./routes/npcs";
import { pjsRouter } from "./routes/pjs";
import { gameRouter } from "./routes/game";
import { fichasRouter } from "./routes/fichas";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Inicializar banco de dados
  initializeDatabase();

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Rotas de API
  app.use("/api/npcs", npcsRouter);
  app.use("/api/pjs", pjsRouter);
  app.use("/api/game", gameRouter);
  app.use("/api/fichas", fichasRouter);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all non-API routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
