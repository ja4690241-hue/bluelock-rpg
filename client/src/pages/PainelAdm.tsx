// Blue Lock RPG - Painel de Controle do ADM
// Funcionalidades: NPCs, Fichas PJ, Condições, Turnos, Iniciativa

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Plus, Trash2, Eye, EyeOff, Edit3, Zap, RotateCcw,
  ChevronDown, ChevronUp, Users, Sword, Activity, Clock,
  AlertTriangle, CheckCircle, XCircle, Dice6, Save, Lock,
  Unlock, RefreshCw, SkipForward, Heart, Wind, Star,
  ArrowUp, ArrowDown, Minus, UserCheck, UserX, Settings,
  Play, Pause, List, Target, Crown
} from "lucide-react";
import { toast } from "sonner";
import { useAdmStorage, NpcData, EstadoPJ, NpcStatus, NpcVisibilidade } from "@/hooks/useAdmStorage";
import { useFichaStorage } from "@/hooks/useFichaStorage";
import { attributes, skills as dataSkills } from "@/lib/data";
import { nanoid } from "nanoid";

// ============ CONSTANTES ============
const CONDICOES_DISPONIVEIS = [
  "Exausto", "Atordoado", "Lesionado", "Intimidado", "Concentrado",
  "Em Chamas", "Furtivo", "Marcado", "Suspenso", "Expulso"
];

const POSICOES = ["Goleiro", "Defesa", "Meio-Campo", "Ataque", "Ponta", "Centroavante", "Volante", "Lateral"];

const ATRIBUTOS_LISTA = [
  { id: "potencia", nome: "Potência", icon: "⚡" },
  { id: "tecnica", nome: "Técnica", icon: "🎯" },
  { id: "velocidade", nome: "Velocidade", icon: "💨" },
  { id: "agilidade", nome: "Agilidade", icon: "🌀" },
  { id: "ego", nome: "Ego", icon: "👑" },
];

const ALL_SKILLS = [
  "Corpo a Corpo", "Cabeceio", "Chute", "Pontaria", "Domínio", "Passe",
  "Drible", "Intuição", "Roubo de Bola", "Furtividade", "Corrida a Longa Distância",
  "Explosão", "Acrobacia", "Reflexos", "Defesa", "Intimidação", "Presença",
  "Diplomacia", "Enganação", "Análise Individual"
];

// ============ NPC INICIAL ============
const initialNpc = (): Omit<NpcData, 'criadoEm' | 'atualizadoEm'> => ({
  id: `npc_${nanoid(8)}`,
  nome: "",
  numero: "",
  posicao: "Ataque",
  time: "",
  imagemUrl: "",
  atributos: { potencia: 5, tecnica: 5, velocidade: 5, agilidade: 5, ego: 5 },
  pericias: {},
  saudeMax: 20,
  saudeAtual: 20,
  folegoMax: 30,
  folegoAtual: 30,
  egoPercent: 0,
  status: "ativo",
  visibilidade: "completo",
  condicoes: [],
  notas: "",
});

// ============ COMPONENTE BADGE CONDIÇÃO ============
function CondicaoBadge({ condicao, onRemove }: { condicao: string; onRemove?: () => void }) {
  const colors: Record<string, string> = {
    "Exausto": "bg-red-900/40 border-red-500/50 text-red-300",
    "Atordoado": "bg-yellow-900/40 border-yellow-500/50 text-yellow-300",
    "Lesionado": "bg-orange-900/40 border-orange-500/50 text-orange-300",
    "Intimidado": "bg-purple-900/40 border-purple-500/50 text-purple-300",
    "Concentrado": "bg-blue-900/40 border-blue-500/50 text-blue-300",
    "Furtivo": "bg-gray-900/40 border-gray-500/50 text-gray-300",
    "Marcado": "bg-pink-900/40 border-pink-500/50 text-pink-300",
  };
  const colorClass = colors[condicao] || "bg-white/10 border-white/20 text-white/70";
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-xs font-heading border ${colorClass}`}>
      {condicao}
      {onRemove && (
        <button onClick={onRemove} className="ml-1 hover:text-white transition-colors">
          <XCircle className="w-3 h-3" />
        </button>
      )}
    </span>
  );
}

// ============ COMPONENTE BARRA DE VIDA/FÔLEGO ============
function BarraRecurso({
  label, atual, max, cor, onAlterar, editavel = true
}: {
  label: string; atual: number; max: number; cor: string;
  onAlterar?: (novo: number) => void; editavel?: boolean;
}) {
  const [editando, setEditando] = useState(false);
  const [valorTemp, setValorTemp] = useState(String(atual));
  const pct = max > 0 ? Math.max(0, Math.min(100, (atual / max) * 100)) : 0;

  const confirmar = () => {
    const v = parseInt(valorTemp);
    if (!isNaN(v) && onAlterar) onAlterar(Math.max(0, v));
    setEditando(false);
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-heading uppercase tracking-widest text-muted-foreground">{label}</span>
        <div className="flex items-center gap-1">
          {editavel && onAlterar && (
            <>
              <button onClick={() => onAlterar(Math.max(0, atual - 1))} className="w-5 h-5 flex items-center justify-center rounded-sm bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-colors">
                <Minus className="w-3 h-3" />
              </button>
              {editando ? (
                <input
                  type="number"
                  value={valorTemp}
                  onChange={e => setValorTemp(e.target.value)}
                  onBlur={confirmar}
                  onKeyDown={e => e.key === 'Enter' && confirmar()}
                  className="w-14 text-center text-xs font-mono-stats rounded-sm px-1 py-0.5 focus:outline-none"
                  style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.52 0.22 260 / 0.5)', color: 'white' }}
                  autoFocus
                />
              ) : (
                <button
                  onClick={() => { setValorTemp(String(atual)); setEditando(true); }}
                  className="text-xs font-mono-stats text-white hover:text-primary transition-colors min-w-[3rem] text-center"
                >
                  {atual}/{max}
                </button>
              )}
              <button onClick={() => onAlterar(Math.min(max, atual + 1))} className="w-5 h-5 flex items-center justify-center rounded-sm bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-colors">
                <Plus className="w-3 h-3" />
              </button>
            </>
          )}
          {!editavel && (
            <span className="text-xs font-mono-stats text-white">{atual}/{max}</span>
          )}
        </div>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'oklch(0.12 0.015 260)' }}>
        <motion.div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${pct}%`, background: cor }}
          initial={false}
          animate={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ============ MODAL DE EDIÇÃO DE NPC ============
function ModalEditarNpc({
  npc, onSave, onClose
}: {
  npc: Omit<NpcData, 'criadoEm' | 'atualizadoEm'> | null;
  onSave: (npc: Omit<NpcData, 'criadoEm' | 'atualizadoEm'>) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Omit<NpcData, 'criadoEm' | 'atualizadoEm'>>(npc || initialNpc());

  const updateAttr = (key: string, v: number) => setForm(p => ({ ...p, atributos: { ...p.atributos, [key]: Math.max(0, Math.min(20, v)) } }));
  const updatePericia = (key: string, v: number) => setForm(p => ({ ...p, pericias: { ...p.pericias, [key]: Math.max(0, Math.min(30, v)) } }));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto" style={{ background: 'rgba(0,0,0,0.85)' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-3xl my-8 rounded-sm border"
        style={{ background: 'oklch(0.08 0.01 260)', borderColor: 'oklch(0.52 0.22 260 / 0.3)' }}
      >
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'oklch(0.22 0.03 260)' }}>
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="font-display text-2xl text-white tracking-wider">{npc ? 'EDITAR NPC' : 'CRIAR NPC'}</h3>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-white transition-colors">
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
          {/* Identidade */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-heading text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5">Nome do NPC *</label>
              <input type="text" value={form.nome} onChange={e => setForm(p => ({ ...p, nome: e.target.value }))}
                placeholder="Ex: Zantetsu Tsurugi" className="w-full px-3 py-2 rounded-sm text-sm font-heading focus:outline-none"
                style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)', color: 'white' }} />
            </div>
            <div>
              <label className="block font-heading text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5">Número</label>
              <input type="text" value={form.numero} onChange={e => setForm(p => ({ ...p, numero: e.target.value }))}
                placeholder="Ex: 9" className="w-full px-3 py-2 rounded-sm text-sm font-heading focus:outline-none"
                style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)', color: 'white' }} />
            </div>
            <div>
              <label className="block font-heading text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5">Time / Equipe</label>
              <input type="text" value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))}
                placeholder="Ex: Time Z" className="w-full px-3 py-2 rounded-sm text-sm font-heading focus:outline-none"
                style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)', color: 'white' }} />
            </div>
            <div>
              <label className="block font-heading text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5">Posição</label>
              <select value={form.posicao} onChange={e => setForm(p => ({ ...p, posicao: e.target.value }))}
                className="w-full px-3 py-2 rounded-sm text-sm font-heading focus:outline-none"
                style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)', color: 'white' }}>
                {POSICOES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          {/* Status e Visibilidade */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-heading text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5">Status</label>
              <div className="flex gap-2">
                {(['ativo', 'inativo'] as NpcStatus[]).map(s => (
                  <button key={s} onClick={() => setForm(p => ({ ...p, status: s }))}
                    className="flex-1 py-2 rounded-sm text-xs font-heading uppercase tracking-wider transition-all"
                    style={{
                      background: form.status === s ? (s === 'ativo' ? 'oklch(0.45 0.18 145 / 0.3)' : 'oklch(0.4 0.1 0 / 0.3)') : 'oklch(0.12 0.015 260)',
                      border: `1px solid ${form.status === s ? (s === 'ativo' ? 'oklch(0.55 0.18 145 / 0.6)' : 'oklch(0.5 0.1 0 / 0.6)') : 'oklch(0.22 0.03 260)'}`,
                      color: form.status === s ? (s === 'ativo' ? 'oklch(0.75 0.18 145)' : 'oklch(0.7 0.1 0)') : 'oklch(0.5 0.02 260)'
                    }}>
                    {s === 'ativo' ? '● Ativo' : '○ Inativo'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block font-heading text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5">Visibilidade para Players</label>
              <select value={form.visibilidade} onChange={e => setForm(p => ({ ...p, visibilidade: e.target.value as NpcVisibilidade }))}
                className="w-full px-3 py-2 rounded-sm text-sm font-heading focus:outline-none"
                style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)', color: 'white' }}>
                <option value="completo">Completo (tudo visível)</option>
                <option value="parcial">Parcial (só nome e posição)</option>
                <option value="oculto">Oculto (invisível)</option>
              </select>
            </div>
          </div>

          {/* Saúde e Fôlego */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Saúde Máx", field: "saudeMax" as const },
              { label: "Saúde Atual", field: "saudeAtual" as const },
              { label: "Fôlego Máx", field: "folegoMax" as const },
              { label: "Fôlego Atual", field: "folegoAtual" as const },
            ].map(({ label, field }) => (
              <div key={field}>
                <label className="block font-heading text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5">{label}</label>
                <input type="number" min="0" max="999" value={form[field]}
                  onChange={e => setForm(p => ({ ...p, [field]: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 rounded-sm text-sm font-heading text-center focus:outline-none"
                  style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)', color: 'white' }} />
              </div>
            ))}
          </div>

          {/* Ego % */}
          <div>
            <label className="block font-heading text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5">Ego % (0–100)</label>
            <input type="number" min="0" max="100" value={form.egoPercent}
              onChange={e => setForm(p => ({ ...p, egoPercent: Math.max(0, Math.min(100, parseInt(e.target.value) || 0)) }))}
              className="w-32 px-3 py-2 rounded-sm text-sm font-heading text-center focus:outline-none"
              style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)', color: 'white' }} />
          </div>

          {/* Atributos */}
          <div>
            <label className="block font-heading text-[10px] tracking-widest uppercase text-muted-foreground mb-3">Atributos</label>
            <div className="grid grid-cols-5 gap-2">
              {ATRIBUTOS_LISTA.map(attr => (
                <div key={attr.id} className="text-center p-3 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)' }}>
                  <div className="text-lg mb-1">{attr.icon}</div>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <button onClick={() => updateAttr(attr.id, (form.atributos[attr.id as keyof typeof form.atributos] || 0) - 1)}
                      className="w-5 h-5 flex items-center justify-center rounded-sm bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-colors text-xs">-</button>
                    <span className="font-mono-stats text-lg text-white w-8 text-center">{form.atributos[attr.id as keyof typeof form.atributos] || 0}</span>
                    <button onClick={() => updateAttr(attr.id, (form.atributos[attr.id as keyof typeof form.atributos] || 0) + 1)}
                      className="w-5 h-5 flex items-center justify-center rounded-sm bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-colors text-xs">+</button>
                  </div>
                  <div className="text-[9px] font-heading uppercase text-muted-foreground">{attr.nome}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Perícias */}
          <div>
            <label className="block font-heading text-[10px] tracking-widest uppercase text-muted-foreground mb-3">Perícias (valores de bônus)</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {ALL_SKILLS.map(skill => (
                <div key={skill} className="flex items-center justify-between px-3 py-2 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)' }}>
                  <span className="text-xs text-muted-foreground truncate flex-1 mr-2">{skill}</span>
                  <div className="flex items-center gap-1">
                    <button onClick={() => updatePericia(skill, (form.pericias[skill] || 0) - 1)}
                      className="w-4 h-4 flex items-center justify-center text-muted-foreground hover:text-white text-xs">-</button>
                    <span className="font-mono-stats text-xs text-primary w-6 text-center">+{form.pericias[skill] || 0}</span>
                    <button onClick={() => updatePericia(skill, (form.pericias[skill] || 0) + 1)}
                      className="w-4 h-4 flex items-center justify-center text-muted-foreground hover:text-white text-xs">+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notas */}
          <div>
            <label className="block font-heading text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5">Notas do ADM (privadas)</label>
            <textarea value={form.notas} onChange={e => setForm(p => ({ ...p, notas: e.target.value }))}
              placeholder="Anotações sobre este NPC, estratégias, segredos..." rows={3}
              className="w-full px-3 py-2 rounded-sm text-sm font-heading placeholder-muted-foreground focus:outline-none resize-none"
              style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)', color: 'white' }} />
          </div>
        </div>

        <div className="flex gap-3 p-6 border-t" style={{ borderColor: 'oklch(0.22 0.03 260)' }}>
          <button onClick={onClose} className="bl-btn-secondary flex-1">CANCELAR</button>
          <button
            onClick={() => {
              if (!form.nome.trim()) { toast.error('Nome do NPC é obrigatório'); return; }
              onSave(form);
            }}
            className="bl-btn-primary flex-1 flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" /> SALVAR NPC
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ============ CARD DE NPC (PAINEL ADM) ============
function CardNpcAdm({
  npc, onEdit, onDelete, onStatusChange, onVisibilidadeChange, onVidaChange, onCondicaoAdd, onCondicaoRemove
}: {
  npc: NpcData;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (s: NpcStatus) => void;
  onVisibilidadeChange: (v: NpcVisibilidade) => void;
  onVidaChange: (campo: 'saudeAtual' | 'folegoAtual' | 'egoPercent', valor: number) => void;
  onCondicaoAdd: (c: string) => void;
  onCondicaoRemove: (c: string) => void;
}) {
  const [expandido, setExpandido] = useState(false);
  const [showRolagem, setShowRolagem] = useState(false);
  const [resultadoRolagem, setResultadoRolagem] = useState<string | null>(null);

  const rolarDado = (pericia: string, bonus: number) => {
    const d20 = Math.floor(Math.random() * 20) + 1;
    const total = d20 + bonus;
    const resultado = `${pericia}: d20(${d20}) + ${bonus} = ${total}`;
    setResultadoRolagem(resultado);
    toast.success(resultado, { duration: 4000 });
  };

  const isExausto = npc.condicoes.includes('Exausto');

  return (
    <motion.div
      layout
      className="rounded-sm border overflow-hidden"
      style={{
        background: npc.status === 'inativo' ? 'oklch(0.07 0.01 260)' : 'oklch(0.09 0.01 260)',
        borderColor: npc.status === 'inativo' ? 'oklch(0.18 0.02 260)' : 'oklch(0.52 0.22 260 / 0.25)',
        opacity: npc.status === 'inativo' ? 0.7 : 1,
      }}
    >
      {/* Header do Card */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${npc.status === 'ativo' ? 'bg-green-400' : 'bg-gray-500'}`} />
              <h4 className="font-display text-lg text-white tracking-wider truncate">{npc.nome || "NPC Sem Nome"}</h4>
              {npc.numero && <span className="text-primary font-mono-stats text-sm">#{npc.numero}</span>}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-muted-foreground font-heading">{npc.posicao}</span>
              {npc.time && <span className="text-xs text-muted-foreground">· {npc.time}</span>}
              {npc.condicoes.map(c => <CondicaoBadge key={c} condicao={c} onRemove={() => onCondicaoRemove(c)} />)}
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            {/* Toggle Status */}
            <button
              onClick={() => onStatusChange(npc.status === 'ativo' ? 'inativo' : 'ativo')}
              title={npc.status === 'ativo' ? 'Desativar NPC' : 'Ativar NPC'}
              className="p-1.5 rounded-sm transition-colors"
              style={{ background: 'oklch(0.12 0.015 260)', color: npc.status === 'ativo' ? 'oklch(0.65 0.18 145)' : 'oklch(0.5 0.02 260)' }}
            >
              {npc.status === 'ativo' ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
            </button>
            {/* Visibilidade */}
            <button
              onClick={() => {
                const ordem: NpcVisibilidade[] = ['completo', 'parcial', 'oculto'];
                const atual = ordem.indexOf(npc.visibilidade);
                onVisibilidadeChange(ordem[(atual + 1) % 3]);
              }}
              title={`Visibilidade: ${npc.visibilidade}`}
              className="p-1.5 rounded-sm transition-colors"
              style={{ background: 'oklch(0.12 0.015 260)', color: npc.visibilidade === 'completo' ? 'oklch(0.75 0.15 230)' : npc.visibilidade === 'parcial' ? 'oklch(0.75 0.18 60)' : 'oklch(0.5 0.02 260)' }}
            >
              {npc.visibilidade === 'oculto' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            <button onClick={onEdit} title="Editar NPC" className="p-1.5 rounded-sm transition-colors hover:text-white text-muted-foreground" style={{ background: 'oklch(0.12 0.015 260)' }}>
              <Edit3 className="w-4 h-4" />
            </button>
            <button onClick={onDelete} title="Excluir NPC" className="p-1.5 rounded-sm transition-colors hover:text-red-400 text-muted-foreground" style={{ background: 'oklch(0.12 0.015 260)' }}>
              <Trash2 className="w-4 h-4" />
            </button>
            <button onClick={() => setExpandido(!expandido)} className="p-1.5 rounded-sm transition-colors text-muted-foreground hover:text-white" style={{ background: 'oklch(0.12 0.015 260)' }}>
              {expandido ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Barras de recursos */}
        <div className="mt-3 space-y-2">
          <BarraRecurso label="Saúde" atual={npc.saudeAtual} max={npc.saudeMax} cor="oklch(0.55 0.18 25)" onAlterar={v => onVidaChange('saudeAtual', v)} />
          <BarraRecurso label="Fôlego" atual={npc.folegoAtual} max={npc.folegoMax} cor="oklch(0.52 0.22 260)" onAlterar={v => onVidaChange('folegoAtual', v)} />
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

              {/* Perícias com bônus */}
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

              {/* Rolagem de dados */}
              <div>
                <p className="text-[10px] font-heading uppercase tracking-widest text-muted-foreground mb-2">Rolar Perícia</p>
                <div className="flex flex-wrap gap-1">
                  {ALL_SKILLS.map(skill => {
                    const bonus = npc.pericias[skill] || 0;
                    const attrBonus = (() => {
                      const attrMap: Record<string, keyof typeof npc.atributos> = {
                        "Chute": "potencia", "Corpo a Corpo": "potencia", "Cabeceio": "potencia",
                        "Pontaria": "tecnica", "Domínio": "tecnica", "Passe": "tecnica", "Drible": "tecnica",
                        "Intuição": "tecnica", "Roubo de Bola": "tecnica", "Furtividade": "tecnica",
                        "Corrida a Longa Distância": "velocidade", "Explosão": "velocidade",
                        "Acrobacia": "agilidade", "Reflexos": "agilidade", "Defesa": "agilidade",
                        "Intimidação": "ego", "Presença": "ego", "Diplomacia": "ego", "Enganação": "ego",
                      };
                      const attrKey = attrMap[skill];
                      return attrKey ? (npc.atributos[attrKey] || 0) : 0;
                    })();
                    const totalBonus = bonus + attrBonus;
                    return (
                      <button key={skill} onClick={() => rolarDado(skill, totalBonus)}
                        className="px-2 py-1 rounded-sm text-xs font-heading transition-all hover:scale-105"
                        style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)', color: 'oklch(0.65 0.15 230)' }}>
                        <Dice6 className="w-3 h-3 inline mr-1" />{skill} +{totalBonus}
                      </button>
                    );
                  })}
                </div>
                {resultadoRolagem && (
                  <div className="mt-2 px-3 py-2 rounded-sm text-sm font-mono-stats" style={{ background: 'oklch(0.52 0.22 260 / 0.15)', border: '1px solid oklch(0.52 0.22 260 / 0.3)', color: 'oklch(0.85 0.15 230)' }}>
                    🎲 {resultadoRolagem}
                  </div>
                )}
              </div>

              {/* Adicionar condição */}
              <div>
                <p className="text-[10px] font-heading uppercase tracking-widest text-muted-foreground mb-2">Adicionar Condição</p>
                <div className="flex flex-wrap gap-1">
                  {CONDICOES_DISPONIVEIS.filter(c => !npc.condicoes.includes(c)).map(c => (
                    <button key={c} onClick={() => onCondicaoAdd(c)}
                      className="px-2 py-0.5 rounded-sm text-xs font-heading transition-all hover:bg-white/10"
                      style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)', color: 'oklch(0.5 0.02 260)' }}>
                      + {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Visibilidade info */}
              <div className="px-3 py-2 rounded-sm text-xs" style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)' }}>
                <span className="text-muted-foreground">Visibilidade players: </span>
                <span className={npc.visibilidade === 'completo' ? 'text-green-400' : npc.visibilidade === 'parcial' ? 'text-yellow-400' : 'text-red-400'}>
                  {npc.visibilidade === 'completo' ? '✓ Ficha completa visível' : npc.visibilidade === 'parcial' ? '◐ Apenas nome e posição' : '✗ Oculto dos players'}
                </span>
              </div>

              {npc.notas && (
                <div className="px-3 py-2 rounded-sm text-xs text-muted-foreground italic" style={{ background: 'oklch(0.12 0.015 260)' }}>
                  📝 {npc.notas}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ============ CARD DE PJ (PAINEL ADM) ============
function CardPjAdm({
  estado, onUpdate, onDelete
}: {
  estado: EstadoPJ;
  onUpdate: (campos: Partial<EstadoPJ>) => void;
  onDelete: () => void;
}) {
  const [expandido, setExpandido] = useState(false);
  const [resultadoRolagem, setResultadoRolagem] = useState<string | null>(null);

  const rolarDado = (pericia: string, bonus: number) => {
    const d20 = Math.floor(Math.random() * 20) + 1;
    const total = d20 + bonus;
    const resultado = `${pericia}: d20(${d20}) + ${bonus} = ${total}`;
    setResultadoRolagem(resultado);
    toast.success(resultado, { duration: 4000 });
  };

  const isExausto = estado.exausto || estado.condicoes.includes('Exausto');

  return (
    <motion.div
      layout
      className="rounded-sm border overflow-hidden"
      style={{
        background: isExausto ? 'oklch(0.08 0.02 0)' : 'oklch(0.09 0.01 260)',
        borderColor: isExausto ? 'oklch(0.5 0.1 0 / 0.4)' : 'oklch(0.52 0.22 260 / 0.25)',
      }}
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Crown className="w-4 h-4 text-yellow-400 flex-shrink-0" />
              <h4 className="font-display text-lg text-white tracking-wider truncate">{estado.nome}</h4>
              {isExausto && <span className="text-xs font-heading text-red-400 border border-red-500/40 px-1.5 py-0.5 rounded-sm">EXAUSTO</span>}
            </div>
            <div className="flex flex-wrap gap-1">
              {estado.condicoes.map(c => (
                <CondicaoBadge key={c} condicao={c} onRemove={() => {
                  const novas = estado.condicoes.filter(x => x !== c);
                  const exausto = novas.includes('Exausto');
                  onUpdate({ condicoes: novas, exausto });
                }} />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button onClick={onDelete} title="Remover do painel" className="p-1.5 rounded-sm transition-colors hover:text-red-400 text-muted-foreground" style={{ background: 'oklch(0.12 0.015 260)' }}>
              <Trash2 className="w-4 h-4" />
            </button>
            <button onClick={() => setExpandido(!expandido)} className="p-1.5 rounded-sm transition-colors text-muted-foreground hover:text-white" style={{ background: 'oklch(0.12 0.015 260)' }}>
              {expandido ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Barras */}
        <div className="mt-3 space-y-2">
          <BarraRecurso label="Saúde" atual={estado.saudeAtual} max={estado.saudeMax} cor="oklch(0.55 0.18 25)"
            onAlterar={v => onUpdate({ saudeAtual: v })} />
          <BarraRecurso label="Fôlego" atual={estado.folegoAtual} max={estado.folegoMax} cor="oklch(0.52 0.22 260)"
            onAlterar={v => {
              const exausto = v <= 0;
              const novasCondicoes = exausto
                ? Array.from(new Set([...estado.condicoes, 'Exausto']))
                : estado.condicoes.filter(c => c !== 'Exausto');
              onUpdate({ folegoAtual: v, exausto, condicoes: novasCondicoes });
              if (exausto && !estado.exausto) toast.error(`${estado.nome} ficou EXAUSTO! Ações bloqueadas.`);
            }} />
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-heading uppercase tracking-widest text-muted-foreground">Ego %</span>
            <div className="flex items-center gap-2">
              <button onClick={() => onUpdate({ egoPercent: Math.max(0, estado.egoPercent - 5) })} className="w-4 h-4 flex items-center justify-center text-muted-foreground hover:text-white text-xs">-</button>
              <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: 'oklch(0.12 0.015 260)' }}>
                <div className="h-full rounded-full" style={{ width: `${estado.egoPercent}%`, background: 'oklch(0.75 0.18 60)' }} />
              </div>
              <button onClick={() => onUpdate({ egoPercent: Math.min(100, estado.egoPercent + 5) })} className="w-4 h-4 flex items-center justify-center text-muted-foreground hover:text-white text-xs">+</button>
              <span className="text-xs font-mono-stats text-yellow-400 w-8">{estado.egoPercent}%</span>
            </div>
          </div>
        </div>

        {/* Economia de Ações */}
        <div className="mt-3 grid grid-cols-4 gap-1">
          {[
            { label: "Ação", field: "acaoUsada" as const, color: "oklch(0.52 0.22 260)" },
            { label: "Bônus", field: "acaoBonusUsada" as const, color: "oklch(0.65 0.18 145)" },
            { label: "Reação", field: "reacaoUsada" as const, color: "oklch(0.75 0.18 60)" },
          ].map(({ label, field, color }) => (
            <button key={field}
              onClick={() => onUpdate({ [field]: !estado[field] })}
              className="py-1.5 rounded-sm text-[10px] font-heading uppercase tracking-wider transition-all"
              style={{
                background: estado[field] ? `${color} / 0.2` : 'oklch(0.12 0.015 260)',
                border: `1px solid ${estado[field] ? color : 'oklch(0.22 0.03 260)'}`,
                color: estado[field] ? color : 'oklch(0.4 0.02 260)',
                opacity: isExausto && field !== 'reacaoUsada' ? 0.4 : 1,
              }}>
              {estado[field] ? '✓' : '○'} {label}
            </button>
          ))}
          <div className="py-1.5 rounded-sm text-[10px] font-heading text-center"
            style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)', color: 'oklch(0.4 0.02 260)' }}>
            Mov: {isExausto ? '5pés' : `${estado.movimentoUsado}pés`}
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
            <div className="px-4 pb-4 space-y-3 border-t" style={{ borderColor: 'oklch(0.22 0.03 260)' }}>
              {/* Edição de máximos */}
              <div className="pt-3">
                <p className="text-[10px] font-heading uppercase tracking-widest text-muted-foreground mb-2">Editar Máximos</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Saúde Máx", field: "saudeMax" as const },
                    { label: "Fôlego Máx", field: "folegoMax" as const },
                  ].map(({ label, field }) => (
                    <div key={field} className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground flex-1">{label}</span>
                      <input type="number" min="1" max="9999" value={estado[field]}
                        onChange={e => onUpdate({ [field]: parseInt(e.target.value) || 1 })}
                        className="w-20 px-2 py-1 rounded-sm text-xs font-mono-stats text-center focus:outline-none"
                        style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)', color: 'white' }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Rolagem de dados */}
              <div>
                <p className="text-[10px] font-heading uppercase tracking-widest text-muted-foreground mb-2">Rolar Dado (d20)</p>
                <div className="flex flex-wrap gap-1">
                  {ALL_SKILLS.slice(0, 10).map(skill => (
                    <button key={skill} onClick={() => rolarDado(skill, 0)}
                      className="px-2 py-1 rounded-sm text-xs font-heading transition-all hover:scale-105"
                      style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)', color: 'oklch(0.65 0.15 230)' }}>
                      <Dice6 className="w-3 h-3 inline mr-1" />{skill}
                    </button>
                  ))}
                </div>
                {resultadoRolagem && (
                  <div className="mt-2 px-3 py-2 rounded-sm text-sm font-mono-stats" style={{ background: 'oklch(0.52 0.22 260 / 0.15)', border: '1px solid oklch(0.52 0.22 260 / 0.3)', color: 'oklch(0.85 0.15 230)' }}>
                    🎲 {resultadoRolagem}
                  </div>
                )}
              </div>

              {/* Adicionar condição */}
              <div>
                <p className="text-[10px] font-heading uppercase tracking-widest text-muted-foreground mb-2">Adicionar Condição</p>
                <div className="flex flex-wrap gap-1">
                  {CONDICOES_DISPONIVEIS.filter(c => !estado.condicoes.includes(c)).map(c => (
                    <button key={c} onClick={() => {
                      const novas = Array.from(new Set([...estado.condicoes, c]));
                      const exausto = novas.includes('Exausto');
                      onUpdate({ condicoes: novas, exausto });
                    }}
                      className="px-2 py-0.5 rounded-sm text-xs font-heading transition-all hover:bg-white/10"
                      style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)', color: 'oklch(0.5 0.02 260)' }}>
                      + {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Posição no grid */}
              <div>
                <p className="text-[10px] font-heading uppercase tracking-widest text-muted-foreground mb-2">Posição no Campo (X, Y)</p>
                <div className="flex items-center gap-2">
                  <input type="number" min="0" max="100" value={estado.posicaoX}
                    onChange={e => onUpdate({ posicaoX: parseInt(e.target.value) || 0 })}
                    className="w-20 px-2 py-1 rounded-sm text-xs font-mono-stats text-center focus:outline-none"
                    style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)', color: 'white' }}
                    placeholder="X" />
                  <span className="text-muted-foreground text-xs">,</span>
                  <input type="number" min="0" max="100" value={estado.posicaoY}
                    onChange={e => onUpdate({ posicaoY: parseInt(e.target.value) || 0 })}
                    className="w-20 px-2 py-1 rounded-sm text-xs font-mono-stats text-center focus:outline-none"
                    style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)', color: 'white' }}
                    placeholder="Y" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ============ PAINEL DE INICIATIVA ============
function PainelIniciativa({ admData, onSetRodada, onAvancarTurno, onResetAcoes, onResetReacoes, estadosPJ, npcs }: {
  admData: ReturnType<typeof useAdmStorage>['admData'];
  onSetRodada: ReturnType<typeof useAdmStorage>['setRodada'];
  onAvancarTurno: () => void;
  onResetAcoes: () => void;
  onResetReacoes: () => void;
  estadosPJ: EstadoPJ[];
  npcs: NpcData[];
}) {
  const [rolando, setRolando] = useState(false);

  const rolarIniciativa = () => {
    setRolando(true);
    const iniciativa = [
      ...estadosPJ.map(pj => ({
        id: pj.fichaId,
        nome: pj.nome,
        tipo: 'pj' as const,
        modificador: 0,
        valor: Math.floor(Math.random() * 20) + 1,
      })),
      ...npcs.filter(n => n.status === 'ativo').map(npc => ({
        id: npc.id,
        nome: npc.nome,
        tipo: 'npc' as const,
        modificador: npc.atributos.agilidade || 0,
        valor: Math.floor(Math.random() * 20) + 1 + (npc.atributos.agilidade || 0),
      }))
    ].sort((a, b) => b.valor - a.valor);

    onSetRodada({ ...admData.rodada, iniciativa, turnoAtualIndex: 0, ativa: true });
    setRolando(false);
    toast.success('Iniciativa rolada! Ordem definida.');
  };

  const { rodada } = admData;
  const atual = rodada.iniciativa[rodada.turnoAtualIndex];

  return (
    <div className="bl-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <List className="w-5 h-5 text-primary" />
          <h3 className="font-display text-xl text-white tracking-wider">INICIATIVA</h3>
          {rodada.ativa && (
            <span className="px-2 py-0.5 rounded-sm text-xs font-heading" style={{ background: 'oklch(0.52 0.22 260 / 0.2)', border: '1px solid oklch(0.52 0.22 260 / 0.4)', color: 'oklch(0.75 0.15 230)' }}>
              Rodada {rodada.numero}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={rolarIniciativa} disabled={rolando}
            className="flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-heading uppercase tracking-wider transition-all"
            style={{ background: 'oklch(0.52 0.22 260 / 0.2)', color: 'oklch(0.75 0.15 230)', border: '1px solid oklch(0.52 0.22 260 / 0.4)' }}>
            <Dice6 className="w-3.5 h-3.5" /> Rolar Iniciativa
          </button>
          {rodada.ativa && (
            <button onClick={onAvancarTurno}
              className="flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-heading uppercase tracking-wider transition-all"
              style={{ background: 'oklch(0.45 0.18 145 / 0.2)', color: 'oklch(0.65 0.18 145)', border: '1px solid oklch(0.45 0.18 145 / 0.4)' }}>
              <SkipForward className="w-3.5 h-3.5" /> Próximo
            </button>
          )}
        </div>
      </div>

      {rodada.iniciativa.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground text-sm">
          <List className="w-8 h-8 mx-auto mb-3 opacity-30" />
          <p>Nenhuma iniciativa rolada ainda.</p>
          <p className="text-xs mt-1">Adicione PJs e NPCs ao painel, depois role a iniciativa.</p>
        </div>
      ) : (
        <div className="space-y-1">
          {rodada.iniciativa.map((item, idx) => (
            <div key={item.id}
              className="flex items-center gap-3 px-3 py-2 rounded-sm transition-all"
              style={{
                background: idx === rodada.turnoAtualIndex ? 'oklch(0.52 0.22 260 / 0.2)' : 'oklch(0.12 0.015 260)',
                border: `1px solid ${idx === rodada.turnoAtualIndex ? 'oklch(0.52 0.22 260 / 0.5)' : 'oklch(0.22 0.03 260)'}`,
              }}>
              <span className="font-mono-stats text-sm w-6 text-center" style={{ color: idx === rodada.turnoAtualIndex ? 'oklch(0.75 0.15 230)' : 'oklch(0.4 0.02 260)' }}>
                {idx + 1}
              </span>
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${item.tipo === 'pj' ? 'bg-yellow-400' : 'bg-blue-400'}`} />
              <span className="flex-1 text-sm font-heading" style={{ color: idx === rodada.turnoAtualIndex ? 'white' : 'oklch(0.65 0.02 260)' }}>
                {item.nome}
              </span>
              <span className="text-xs text-muted-foreground font-heading">{item.tipo === 'pj' ? 'PJ' : 'NPC'}</span>
              <span className="font-mono-stats text-sm text-primary">{item.valor}</span>
              {idx === rodada.turnoAtualIndex && <span className="text-xs text-primary animate-pulse">← AGINDO</span>}
            </div>
          ))}
        </div>
      )}

      {/* Controles de rodada */}
      <div className="flex gap-2 pt-2 border-t" style={{ borderColor: 'oklch(0.22 0.03 260)' }}>
        <button onClick={onResetReacoes}
          className="flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-heading uppercase tracking-wider transition-all flex-1 justify-center"
          style={{ background: 'oklch(0.75 0.18 60 / 0.1)', color: 'oklch(0.75 0.18 60)', border: '1px solid oklch(0.75 0.18 60 / 0.3)' }}>
          <RotateCcw className="w-3.5 h-3.5" /> Reset Reações
        </button>
        <button onClick={onResetAcoes}
          className="flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-heading uppercase tracking-wider transition-all flex-1 justify-center"
          style={{ background: 'oklch(0.55 0.18 25 / 0.1)', color: 'oklch(0.75 0.18 25)', border: '1px solid oklch(0.55 0.18 25 / 0.3)' }}>
          <RefreshCw className="w-3.5 h-3.5" /> Reset Ações
        </button>
      </div>
    </div>
  );
}

// ============ MODAL ADICIONAR PJ ============
function ModalAdicionarPJ({
  fichas, estadosExistentes, onAdd, onClose
}: {
  fichas: ReturnType<typeof useFichaStorage>['fichas'];
  estadosExistentes: EstadoPJ[];
  onAdd: (estado: Omit<EstadoPJ, 'atualizadoEm'>) => void;
  onClose: () => void;
}) {
  const fichasDisponiveis = fichas.filter(f => !estadosExistentes.find(e => e.fichaId === f.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md rounded-sm border"
        style={{ background: 'oklch(0.08 0.01 260)', borderColor: 'oklch(0.52 0.22 260 / 0.3)' }}
      >
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'oklch(0.22 0.03 260)' }}>
          <h3 className="font-display text-xl text-white tracking-wider">ADICIONAR PJ AO PAINEL</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-white transition-colors">
            <XCircle className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          {fichasDisponiveis.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              <Users className="w-8 h-8 mx-auto mb-3 opacity-30" />
              <p>Nenhuma ficha disponível.</p>
              <p className="text-xs mt-1">Crie fichas na página "Criar Ficha" primeiro.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {fichasDisponiveis.map(ficha => (
                <button key={ficha.id}
                  onClick={() => {
                    onAdd({
                      fichaId: ficha.id,
                      nome: ficha.nome,
                      saudeMax: 20,
                      saudeAtual: 20,
                      folegoMax: ficha.folego || 30,
                      folegoAtual: ficha.folego || 30,
                      egoPercent: 0,
                      condicoes: [],
                      acaoUsada: false,
                      acaoBonusUsada: false,
                      reacaoUsada: false,
                      movimentoUsado: 0,
                      posicaoX: 0,
                      posicaoY: 0,
                      exausto: false,
                    });
                    onClose();
                    toast.success(`${ficha.nome} adicionado ao painel!`);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-left transition-all hover:bg-white/5"
                  style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)' }}>
                  <Crown className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  <div>
                    <div className="font-heading text-sm text-white">{ficha.nome}</div>
                    <div className="text-xs text-muted-foreground">#{ficha.numero} · Fôlego: {ficha.folego}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ============ TELA DE LOGIN ADM ============
function TelaLoginAdm({ onLogin }: { onLogin: () => void }) {
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(false);

  const tentar = () => {
    if (senha === 'bluelock2024' || senha === 'adm') {
      onLogin();
    } else {
      setErro(true);
      setTimeout(() => setErro(false), 2000);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="bl-card p-8 text-center">
          <div className="w-16 h-16 rounded-sm flex items-center justify-center mx-auto mb-6" style={{ background: 'oklch(0.52 0.22 260 / 0.2)', border: '1px solid oklch(0.52 0.22 260 / 0.4)' }}>
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-display text-3xl text-white tracking-wider mb-2">PAINEL ADM</h2>
          <p className="text-muted-foreground text-sm mb-8">Acesso restrito ao Mestre da partida</p>
          <div className="space-y-4">
            <input
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && tentar()}
              placeholder="Senha do ADM"
              className="w-full px-4 py-3 rounded-sm text-sm font-heading text-center placeholder-muted-foreground focus:outline-none"
              style={{
                background: 'oklch(0.12 0.015 260)',
                border: `1px solid ${erro ? 'oklch(0.5 0.18 25)' : 'oklch(0.22 0.03 260)'}`,
                color: 'white'
              }}
            />
            {erro && <p className="text-xs text-red-400 font-heading">Senha incorreta</p>}
            <button onClick={tentar} className="bl-btn-primary w-full flex items-center justify-center gap-2">
              <Unlock className="w-4 h-4" /> ENTRAR
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-6 opacity-50">Senha padrão: bluelock2024</p>
        </div>
      </motion.div>
    </div>
  );
}

// ============ COMPONENTE PRINCIPAL ============
export default function PainelAdm() {
  const [autenticado, setAutenticado] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState<'npcs' | 'pjs' | 'iniciativa'>('npcs');
  const [modalNpc, setModalNpc] = useState<{ aberto: boolean; npc: Omit<NpcData, 'criadoEm' | 'atualizadoEm'> | null }>({ aberto: false, npc: null });
  const [modalPJ, setModalPJ] = useState(false);

  const {
    admData, isLoaded,
    saveNpc, deleteNpc, updateNpcStatus, updateNpcVisibilidade, updateNpcVida, addCondicaoNpc, removeCondicaoNpc,
    saveEstadoPJ, updateEstadoPJ, deleteEstadoPJ,
    setRodada, resetReacoes, resetAcoesTurno, avancarTurno,
  } = useAdmStorage();

  const { fichas } = useFichaStorage();

  if (!autenticado) {
    return (
      <div className="py-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <div className="bl-tag mb-4">Acesso Restrito</div>
            <h1 className="font-display text-6xl md:text-7xl text-white tracking-wider mb-4 uppercase italic">PAINEL ADM</h1>
            <div className="w-24 h-0.5 mb-6" style={{ background: 'oklch(0.52 0.22 260)' }} />
          </motion.div>
          <TelaLoginAdm onLogin={() => setAutenticado(true)} />
        </div>
      </div>
    );
  }

  const abas = [
    { id: 'npcs' as const, label: 'NPCs', icon: Shield, count: admData.npcs.length },
    { id: 'pjs' as const, label: 'Personagens', icon: Crown, count: admData.estadosPJ.length },
    { id: 'iniciativa' as const, label: 'Iniciativa', icon: List, count: admData.rodada.iniciativa.length },
  ];

  return (
    <div className="py-16">
      <div className="container">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="bl-tag mb-4">Mestre da Partida</div>
              <h1 className="font-display text-5xl md:text-6xl text-white tracking-wider mb-4 uppercase italic">PAINEL ADM</h1>
              <div className="w-24 h-0.5 mb-4" style={{ background: 'oklch(0.52 0.22 260)' }} />
              <p className="text-muted-foreground text-sm max-w-xl">
                Controle total sobre NPCs, fichas dos jogadores, condições de jogo e ordem de iniciativa.
              </p>
            </div>
            <button onClick={() => setAutenticado(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-sm text-xs font-heading uppercase tracking-wider text-muted-foreground hover:text-white transition-colors"
              style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)' }}>
              <Lock className="w-4 h-4" /> Sair
            </button>
          </div>
        </motion.div>

        {/* Abas */}
        <div className="flex gap-2 mb-8 border-b" style={{ borderColor: 'oklch(0.22 0.03 260)' }}>
          {abas.map(aba => {
            const Icon = aba.icon;
            return (
              <button key={aba.id} onClick={() => setAbaAtiva(aba.id)}
                className="flex items-center gap-2 px-4 py-3 text-sm font-heading uppercase tracking-wider transition-all relative"
                style={{
                  color: abaAtiva === aba.id ? 'white' : 'oklch(0.5 0.02 260)',
                  borderBottom: abaAtiva === aba.id ? '2px solid oklch(0.52 0.22 260)' : '2px solid transparent',
                }}>
                <Icon className="w-4 h-4" />
                {aba.label}
                {aba.count > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono-stats"
                    style={{ background: 'oklch(0.52 0.22 260 / 0.3)', color: 'oklch(0.75 0.15 230)' }}>
                    {aba.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ABA: NPCs */}
        {abaAtiva === 'npcs' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl text-white tracking-wider">CONTROLE DE NPCs</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {admData.npcs.filter(n => n.status === 'ativo').length} ativos · {admData.npcs.filter(n => n.status === 'inativo').length} inativos
                </p>
              </div>
              <button
                onClick={() => setModalNpc({ aberto: true, npc: null })}
                className="bl-btn-primary flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Criar NPC
              </button>
            </div>

            {admData.npcs.length === 0 ? (
              <div className="bl-card p-12 text-center">
                <Shield className="w-12 h-12 mx-auto mb-4 opacity-20 text-primary" />
                <p className="text-muted-foreground font-heading uppercase tracking-wider text-sm">Nenhum NPC criado</p>
                <p className="text-xs text-muted-foreground mt-2">Crie NPCs para os times rivais e controle sua visibilidade.</p>
                <button onClick={() => setModalNpc({ aberto: true, npc: null })} className="bl-btn-primary mt-6 mx-auto flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Criar Primeiro NPC
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {admData.npcs.map(npc => (
                  <CardNpcAdm
                    key={npc.id}
                    npc={npc}
                    onEdit={() => setModalNpc({ aberto: true, npc })}
                    onDelete={() => {
                      if (confirm(`Excluir NPC "${npc.nome}"?`)) deleteNpc(npc.id);
                    }}
                    onStatusChange={s => updateNpcStatus(npc.id, s)}
                    onVisibilidadeChange={v => updateNpcVisibilidade(npc.id, v)}
                    onVidaChange={(campo, valor) => updateNpcVida(npc.id, campo, valor)}
                    onCondicaoAdd={c => addCondicaoNpc(npc.id, c)}
                    onCondicaoRemove={c => removeCondicaoNpc(npc.id, c)}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* ABA: PJs */}
        {abaAtiva === 'pjs' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl text-white tracking-wider">FICHAS DOS JOGADORES</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {admData.estadosPJ.length} personagens no painel · {admData.estadosPJ.filter(e => e.exausto).length} exaustos
                </p>
              </div>
              <button onClick={() => setModalPJ(true)} className="bl-btn-primary flex items-center gap-2">
                <Plus className="w-4 h-4" /> Adicionar PJ
              </button>
            </div>

            {admData.estadosPJ.length === 0 ? (
              <div className="bl-card p-12 text-center">
                <Crown className="w-12 h-12 mx-auto mb-4 opacity-20 text-yellow-400" />
                <p className="text-muted-foreground font-heading uppercase tracking-wider text-sm">Nenhum PJ no painel</p>
                <p className="text-xs text-muted-foreground mt-2">Adicione as fichas dos jogadores para monitorar e editar em tempo real.</p>
                <button onClick={() => setModalPJ(true)} className="bl-btn-primary mt-6 mx-auto flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Adicionar Personagem
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {admData.estadosPJ.map(estado => (
                  <CardPjAdm
                    key={estado.fichaId}
                    estado={estado}
                    onUpdate={campos => updateEstadoPJ(estado.fichaId, campos)}
                    onDelete={() => {
                      if (confirm(`Remover ${estado.nome} do painel?`)) deleteEstadoPJ(estado.fichaId);
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* ABA: Iniciativa */}
        {abaAtiva === 'iniciativa' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <PainelIniciativa
              admData={admData}
              onSetRodada={setRodada}
              onAvancarTurno={avancarTurno}
              onResetAcoes={resetAcoesTurno}
              onResetReacoes={resetReacoes}
              estadosPJ={admData.estadosPJ}
              npcs={admData.npcs}
            />
          </motion.div>
        )}
      </div>

      {/* Modal Criar/Editar NPC */}
      <AnimatePresence>
        {modalNpc.aberto && (
          <ModalEditarNpc
            npc={modalNpc.npc}
            onSave={npc => {
              saveNpc(npc);
              setModalNpc({ aberto: false, npc: null });
              toast.success(`NPC "${npc.nome}" salvo!`);
            }}
            onClose={() => setModalNpc({ aberto: false, npc: null })}
          />
        )}
      </AnimatePresence>

      {/* Modal Adicionar PJ */}
      <AnimatePresence>
        {modalPJ && (
          <ModalAdicionarPJ
            fichas={fichas}
            estadosExistentes={admData.estadosPJ}
            onAdd={saveEstadoPJ}
            onClose={() => setModalPJ(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
