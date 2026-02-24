import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface Player {
  id: string;
  x: number;
  y: number;
  team: "azul" | "vermelho";
  numero: number;
}

const FIELD_WIDTH = 1200;
const FIELD_HEIGHT = 800;
const GRANDE_AREA_WIDTH = 400;
const GRANDE_AREA_HEIGHT = 300;

export default function MapaTatico() {
  const [players, setPlayers] = useState<Player[]>([
    // Time Azul (esquerda)
    { id: "azul-1", x: 100, y: 400, team: "azul", numero: 1 },
    { id: "azul-2", x: 250, y: 200, team: "azul", numero: 2 },
    { id: "azul-3", x: 250, y: 600, team: "azul", numero: 3 },
    { id: "azul-4", x: 400, y: 400, team: "azul", numero: 4 },
    { id: "azul-5", x: 550, y: 300, team: "azul", numero: 5 },
    // Time Vermelho (direita)
    { id: "vermelho-1", x: 1100, y: 400, team: "vermelho", numero: 1 },
    { id: "vermelho-2", x: 950, y: 200, team: "vermelho", numero: 2 },
    { id: "vermelho-3", x: 950, y: 600, team: "vermelho", numero: 3 },
    { id: "vermelho-4", x: 800, y: 400, team: "vermelho", numero: 4 },
    { id: "vermelho-5", x: 650, y: 300, team: "vermelho", numero: 5 },
  ]);

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showDistance, setShowDistance] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

  const handleMouseDown = (e: React.MouseEvent, playerId: string) => {
    const rect = (e.currentTarget as SVGElement).getBoundingClientRect();
    const player = players.find(p => p.id === playerId);
    if (!player) return;

    setDraggingId(playerId);
    setDragOffset({
      x: e.clientX - rect.left - player.x,
      y: e.clientY - rect.top - player.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingId) return;

    const rect = (e.currentTarget as SVGElement).getBoundingClientRect();
    const newX = Math.max(0, Math.min(FIELD_WIDTH, e.clientX - rect.left - dragOffset.x));
    const newY = Math.max(0, Math.min(FIELD_HEIGHT, e.clientY - rect.top - dragOffset.y));

    setPlayers(prev =>
      prev.map(p =>
        p.id === draggingId ? { ...p, x: newX, y: newY } : p
      )
    );
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  const calculateDistance = (p1: Player, p2: Player) => {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return Math.round(distance / 30); // Converter para "pés"
  };

  const togglePlayerSelection = (playerId: string) => {
    setSelectedPlayers(prev =>
      prev.includes(playerId)
        ? prev.filter(id => id !== playerId)
        : [...prev, playerId]
    );
  };

  const resetPositions = () => {
    setPlayers([
      { id: "azul-1", x: 100, y: 400, team: "azul", numero: 1 },
      { id: "azul-2", x: 250, y: 200, team: "azul", numero: 2 },
      { id: "azul-3", x: 250, y: 600, team: "azul", numero: 3 },
      { id: "azul-4", x: 400, y: 400, team: "azul", numero: 4 },
      { id: "azul-5", x: 550, y: 300, team: "azul", numero: 5 },
      { id: "vermelho-1", x: 1100, y: 400, team: "vermelho", numero: 1 },
      { id: "vermelho-2", x: 950, y: 200, team: "vermelho", numero: 2 },
      { id: "vermelho-3", x: 950, y: 600, team: "vermelho", numero: 3 },
      { id: "vermelho-4", x: 800, y: 400, team: "vermelho", numero: 4 },
      { id: "vermelho-5", x: 650, y: 300, team: "vermelho", numero: 5 },
    ]);
    setSelectedPlayers([]);
    toast.success("Posições resetadas!");
  };

  const deletePlayer = (playerId: string) => {
    setPlayers(prev => prev.filter(p => p.id !== playerId));
    setSelectedPlayers(prev => prev.filter(id => id !== playerId));
  };

  const addPlayer = (team: "azul" | "vermelho") => {
    const newId = `${team}-${Date.now()}`;
    const newPlayer: Player = {
      id: newId,
      x: team === "azul" ? 300 : 900,
      y: 400,
      team,
      numero: Math.max(...players.filter(p => p.team === team).map(p => p.numero), 0) + 1,
    };
    setPlayers(prev => [...prev, newPlayer]);
    toast.success(`Jogador ${team === "azul" ? "Azul" : "Vermelho"} adicionado!`);
  };

  return (
    <div className="py-16">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 bl-speed-lines-animated"
        >
          <div className="bl-tag mb-4">Ferramentas</div>
          <h1 className="font-display text-6xl md:text-7xl text-white tracking-wider mb-4 bl-glitch">
            MAPA TÁTICO
          </h1>
          <div className="w-24 h-0.5 mb-6" style={{ background: "oklch(0.52 0.22 260)" }} />
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Visualize o campo de futebol em tempo real, posicione seus jogadores e planeje suas estratégias. Arraste os ícones para repositionar, clique para selecionar e veja as distâncias entre os jogadores.
          </p>
        </motion.div>

        {/* Controls */}
        <div className="mb-8 flex flex-wrap gap-4">
          <button
            onClick={() => addPlayer("azul")}
            className="bl-btn-primary"
            style={{ background: "oklch(0.52 0.22 260)" }}
          >
            <Plus className="w-4 h-4" />
            Adicionar Azul
          </button>
          <button
            onClick={() => addPlayer("vermelho")}
            className="bl-btn-primary"
            style={{ background: "oklch(0.75 0.18 25)" }}
          >
            <Plus className="w-4 h-4" />
            Adicionar Vermelho
          </button>
          <button onClick={resetPositions} className="bl-btn-secondary">
            <RotateCcw className="w-4 h-4" />
            Resetar
          </button>
          <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={showDistance}
              onChange={(e) => setShowDistance(e.target.checked)}
              className="w-4 h-4"
            />
            Mostrar Distâncias
          </label>
        </div>

        {/* Field */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bl-card p-4 overflow-auto"
        >
          <svg
            width={FIELD_WIDTH}
            height={FIELD_HEIGHT}
            className="bg-gradient-to-b from-green-900 to-green-800 rounded cursor-move"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ minWidth: "100%", height: "auto" }}
          >
            {/* Field Background */}
            <rect width={FIELD_WIDTH} height={FIELD_HEIGHT} fill="#1a4d2e" />

            {/* Center Line */}
            <line x1={FIELD_WIDTH / 2} y1="0" x2={FIELD_WIDTH / 2} y2={FIELD_HEIGHT} stroke="white" strokeWidth="2" opacity="0.5" />

            {/* Center Circle */}
            <circle cx={FIELD_WIDTH / 2} cy={FIELD_HEIGHT / 2} r="60" fill="none" stroke="white" strokeWidth="2" opacity="0.5" />

            {/* Center Spot */}
            <circle cx={FIELD_WIDTH / 2} cy={FIELD_HEIGHT / 2} r="4" fill="white" opacity="0.5" />

            {/* Goal Areas (Grande Área) */}
            {/* Left Goal Area */}
            <rect
              x="0"
              y={(FIELD_HEIGHT - GRANDE_AREA_HEIGHT) / 2}
              width={GRANDE_AREA_WIDTH}
              height={GRANDE_AREA_HEIGHT}
              fill="none"
              stroke="white"
              strokeWidth="2"
              opacity="0.3"
            />

            {/* Right Goal Area */}
            <rect
              x={FIELD_WIDTH - GRANDE_AREA_WIDTH}
              y={(FIELD_HEIGHT - GRANDE_AREA_HEIGHT) / 2}
              width={GRANDE_AREA_WIDTH}
              height={GRANDE_AREA_HEIGHT}
              fill="none"
              stroke="white"
              strokeWidth="2"
              opacity="0.3"
            />

            {/* Goal Lines */}
            <line x1="0" y1="0" x2="0" y2={FIELD_HEIGHT} stroke="white" strokeWidth="2" opacity="0.5" />
            <line x1={FIELD_WIDTH} y1="0" x2={FIELD_WIDTH} y2={FIELD_HEIGHT} stroke="white" strokeWidth="2" opacity="0.5" />

            {/* Distance Lines between selected players */}
            {showDistance && selectedPlayers.length === 2 && (
              <>
                {(() => {
                  const p1 = players.find(p => p.id === selectedPlayers[0]);
                  const p2 = players.find(p => p.id === selectedPlayers[1]);
                  if (!p1 || !p2) return null;
                  const distance = calculateDistance(p1, p2);
                  const midX = (p1.x + p2.x) / 2;
                  const midY = (p1.y + p2.y) / 2;

                  return (
                    <>
                      <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="oklch(0.75 0.15 230)" strokeWidth="2" strokeDasharray="5,5" />
                      <text
                        x={midX}
                        y={midY - 10}
                        fill="oklch(0.75 0.15 230)"
                        fontSize="16"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {distance} pés
                      </text>
                    </>
                  );
                })()}
              </>
            )}

            {/* Players */}
            {players.map((player) => (
              <g key={player.id}>
                {/* Selection Indicator */}
                {selectedPlayers.includes(player.id) && (
                  <circle
                    cx={player.x}
                    cy={player.y}
                    r="35"
                    fill="none"
                    stroke="oklch(0.75 0.15 230)"
                    strokeWidth="3"
                    opacity="0.8"
                  />
                )}

                {/* Player Circle */}
                <circle
                  cx={player.x}
                  cy={player.y}
                  r="30"
                  fill={player.team === "azul" ? "oklch(0.52 0.22 260)" : "oklch(0.75 0.18 25)"}
                  stroke="white"
                  strokeWidth="2"
                  onMouseDown={(e) => handleMouseDown(e, player.id)}
                  onClick={() => togglePlayerSelection(player.id)}
                  style={{ cursor: "grab", opacity: draggingId === player.id ? 0.8 : 1 }}
                />

                {/* Player Number */}
                <text
                  x={player.x}
                  y={player.y + 8}
                  fill="white"
                  fontSize="20"
                  fontWeight="bold"
                  textAnchor="middle"
                  pointerEvents="none"
                >
                  {player.numero}
                </text>
              </g>
            ))}
          </svg>
        </motion.div>

        {/* Info Panel */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Legend */}
          <div className="bl-card p-6">
            <h3 className="font-heading text-lg font-bold text-white mb-4">Legenda</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full" style={{ background: "oklch(0.52 0.22 260)" }} />
                <span className="text-sm text-muted-foreground">Time Azul</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full" style={{ background: "oklch(0.75 0.18 25)" }} />
                <span className="text-sm text-muted-foreground">Time Vermelho</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2" style={{ borderColor: "oklch(0.75 0.15 230)" }} />
                <span className="text-sm text-muted-foreground">Jogador Selecionado</span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bl-card p-6">
            <h3 className="font-heading text-lg font-bold text-white mb-4">Como Usar</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Arraste os ícones para repositionar jogadores</li>
              <li>✓ Clique em um jogador para selecioná-lo</li>
              <li>✓ Selecione 2 jogadores e ative "Mostrar Distâncias"</li>
              <li>✓ Use os botões para adicionar/remover jogadores</li>
              <li>✓ Clique em "Resetar" para voltar às posições iniciais</li>
            </ul>
          </div>
        </div>

        {/* Selected Players Info */}
        {selectedPlayers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bl-card p-6"
          >
            <h3 className="font-heading text-lg font-bold text-white mb-4">Jogadores Selecionados</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedPlayers.map((playerId) => {
                const player = players.find(p => p.id === playerId);
                if (!player) return null;
                return (
                  <div
                    key={playerId}
                    className="flex items-center justify-between p-4 rounded"
                    style={{ background: "oklch(0.12 0.015 260)" }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ background: player.team === "azul" ? "oklch(0.52 0.22 260)" : "oklch(0.75 0.18 25)" }}
                      >
                        {player.numero}
                      </div>
                      <span className="text-sm text-white">
                        Jogador {player.numero} ({player.team === "azul" ? "Azul" : "Vermelho"})
                      </span>
                    </div>
                    <button
                      onClick={() => deletePlayer(playerId)}
                      className="p-2 hover:bg-red-500/20 rounded transition"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
