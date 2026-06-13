// Blue Lock RPG - Visualização Pública de NPCs para os Players
// Respeita as configurações de visibilidade definidas pelo ADM

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Eye, EyeOff, ChevronDown, ChevronUp, Users, AlertTriangle } from "lucide-react";
import { useAdmStorage, NpcData } from "@/hooks/useAdmStorage";

const ATRIBUTOS_LISTA = [
  { id: "potencia", nome: "Potência", icon: "⚡" },
  { id: "tecnica", nome: "Técnica", icon: "🎯" },
  { id: "velocidade", nome: "Velocidade", icon: "💨" },
  { id: "agilidade", nome: "Agilidade", icon: "🌀" },
  { id: "ego", nome: "Ego", icon: "👑" },
];

function CardNpcPublico({ npc }: { npc: NpcData }) {
  const [expandido, setExpandido] = useState(false);

  // Visibilidade parcial: só nome e posição
  if (npc.visibilidade === 'parcial') {
    return (
      <motion.div
        layout
        className="rounded-sm border p-4"
        style={{ background: 'oklch(0.09 0.01 260)', borderColor: 'oklch(0.52 0.22 260 / 0.2)' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0" style={{ background: 'oklch(0.52 0.22 260 / 0.15)', border: '1px solid oklch(0.52 0.22 260 / 0.3)' }}>
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-display text-lg text-white tracking-wider">{npc.nome}</h4>
            <div className="flex items-center gap-2">
              {npc.numero && <span className="text-primary font-mono-stats text-sm">#{npc.numero}</span>}
              <span className="text-xs text-muted-foreground font-heading">{npc.posicao}</span>
              {npc.time && <span className="text-xs text-muted-foreground">· {npc.time}</span>}
            </div>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <EyeOff className="w-4 h-4" />
            <span className="text-xs font-heading">Atributos ocultos</span>
          </div>
        </div>
        {npc.condicoes.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {npc.condicoes.map(c => (
              <span key={c} className="px-2 py-0.5 rounded-sm text-xs font-heading border" style={{ background: 'oklch(0.12 0.015 260)', borderColor: 'oklch(0.22 0.03 260)', color: 'oklch(0.65 0.02 260)' }}>
                {c}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    );
  }

  // Visibilidade completa
  return (
    <motion.div
      layout
      className="rounded-sm border overflow-hidden"
      style={{ background: 'oklch(0.09 0.01 260)', borderColor: 'oklch(0.52 0.22 260 / 0.25)' }}
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-display text-xl text-white tracking-wider">{npc.nome}</h4>
              {npc.numero && <span className="text-primary font-mono-stats text-lg">#{npc.numero}</span>}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-muted-foreground font-heading">{npc.posicao}</span>
              {npc.time && <span className="text-xs text-muted-foreground">· {npc.time}</span>}
              {npc.condicoes.map(c => (
                <span key={c} className="px-2 py-0.5 rounded-sm text-xs font-heading border" style={{ background: 'oklch(0.12 0.015 260)', borderColor: 'oklch(0.22 0.03 260)', color: 'oklch(0.65 0.02 260)' }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
          <button onClick={() => setExpandido(!expandido)} className="p-1.5 rounded-sm transition-colors text-muted-foreground hover:text-white" style={{ background: 'oklch(0.12 0.015 260)' }}>
            {expandido ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Barras de recursos */}
        <div className="mt-3 space-y-2">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-heading uppercase tracking-widest text-muted-foreground">Saúde</span>
              <span className="text-xs font-mono-stats text-white">{npc.saudeAtual}/{npc.saudeMax}</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'oklch(0.12 0.015 260)' }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${Math.max(0, (npc.saudeAtual / npc.saudeMax) * 100)}%`, background: 'oklch(0.55 0.18 25)' }} />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-heading uppercase tracking-widest text-muted-foreground">Fôlego</span>
              <span className="text-xs font-mono-stats text-white">{npc.folegoAtual}/{npc.folegoMax}</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'oklch(0.12 0.015 260)' }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${Math.max(0, (npc.folegoAtual / npc.folegoMax) * 100)}%`, background: 'oklch(0.52 0.22 260)' }} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-heading uppercase tracking-widest text-muted-foreground">Ego</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-1.5 rounded-full overflow-hidden" style={{ background: 'oklch(0.12 0.015 260)' }}>
                <div className="h-full rounded-full" style={{ width: `${npc.egoPercent}%`, background: 'oklch(0.75 0.18 60)' }} />
              </div>
              <span className="text-xs font-mono-stats text-yellow-400">{npc.egoPercent}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Painel expandido */}
      <AnimatePresence>
        {expandido && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4 border-t" style={{ borderColor: 'oklch(0.22 0.03 260)' }}>
              {/* Atributos */}
              <div className="pt-3">
                <p className="text-[10px] font-heading uppercase tracking-widest text-muted-foreground mb-2">Atributos</p>
                <div className="grid grid-cols-5 gap-1">
                  {ATRIBUTOS_LISTA.map(attr => (
                    <div key={attr.id} className="text-center p-2 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)' }}>
                      <div className="text-base">{attr.icon}</div>
                      <div className="font-mono-stats text-sm text-white">{npc.atributos[attr.id as keyof typeof npc.atributos] || 0}</div>
                      <div className="text-[8px] font-heading uppercase text-muted-foreground">{attr.nome.slice(0, 3)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Perícias */}
              {Object.keys(npc.pericias).filter(k => (npc.pericias[k] || 0) > 0).length > 0 && (
                <div>
                  <p className="text-[10px] font-heading uppercase tracking-widest text-muted-foreground mb-2">Perícias</p>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(npc.pericias).filter(([, v]) => v > 0).map(([skill, val]) => (
                      <span key={skill} className="px-2 py-0.5 rounded-sm text-xs font-heading" style={{ background: 'oklch(0.52 0.22 260 / 0.15)', border: '1px solid oklch(0.52 0.22 260 / 0.3)', color: 'oklch(0.75 0.15 230)' }}>
                        {skill} +{val}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function NpcsPublico() {
  const { admData } = useAdmStorage();

  // Filtrar apenas NPCs ativos e não ocultos
  const npcsVisiveis = admData.npcs.filter(n => n.status === 'ativo' && n.visibilidade !== 'oculto');

  // Agrupar por time
  const times = Array.from(new Set(npcsVisiveis.map(n => n.time || 'Sem Time')));

  return (
    <div className="py-16">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="bl-tag mb-4">Times Rivais</div>
          <h1 className="font-display text-6xl md:text-7xl text-white tracking-wider mb-4 uppercase italic">CAMPO</h1>
          <div className="w-24 h-0.5 mb-6" style={{ background: 'oklch(0.52 0.22 260)' }} />
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Atletas presentes no campo. Informações disponibilizadas pelo Mestre da partida.
          </p>
        </motion.div>

        {npcsVisiveis.length === 0 ? (
          <div className="bl-card p-16 text-center">
            <Users className="w-16 h-16 mx-auto mb-6 opacity-20 text-primary" />
            <p className="font-display text-2xl text-muted-foreground tracking-wider uppercase">Nenhum atleta em campo</p>
            <p className="text-sm text-muted-foreground mt-3">O Mestre ainda não adicionou adversários ao campo.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {times.map(time => {
              const npcsDoTime = npcsVisiveis.filter(n => (n.time || 'Sem Time') === time);
              return (
                <div key={time}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-6 rounded-full" style={{ background: 'oklch(0.52 0.22 260)' }} />
                    <h2 className="font-display text-2xl text-white tracking-wider uppercase">{time}</h2>
                    <span className="text-xs text-muted-foreground font-heading">{npcsDoTime.length} atleta{npcsDoTime.length !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {npcsDoTime.map(npc => (
                      <CardNpcPublico key={npc.id} npc={npc} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
