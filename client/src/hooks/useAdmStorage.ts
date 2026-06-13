// Blue Lock RPG - ADM Storage Hook
// Gerencia NPCs, estado de jogo, iniciativa e condições via localStorage

import { useState, useEffect, useCallback } from 'react';

export type NpcStatus = 'ativo' | 'inativo';
export type NpcVisibilidade = 'completo' | 'parcial' | 'oculto';

export interface NpcData {
  id: string;
  nome: string;
  numero: string;
  posicao: string;
  time: string;
  imagemUrl?: string;
  atributos: {
    potencia: number;
    tecnica: number;
    velocidade: number;
    agilidade: number;
    ego: number;
  };
  pericias: Record<string, number>;
  saudeMax: number;
  saudeAtual: number;
  folegoMax: number;
  folegoAtual: number;
  egoPercent: number;
  status: NpcStatus;
  visibilidade: NpcVisibilidade; // 'completo' = tudo visível, 'parcial' = só nome/posição, 'oculto' = invisível
  condicoes: string[];
  notas: string;
  criadoEm: string;
  atualizadoEm: string;
}

export interface EstadoPJ {
  fichaId: string;
  nome: string;
  saudeMax: number;
  saudeAtual: number;
  folegoMax: number;
  folegoAtual: number;
  egoPercent: number;
  condicoes: string[];
  acaoUsada: boolean;
  acaoBonusUsada: boolean;
  reacaoUsada: boolean;
  movimentoUsado: number;
  posicaoX: number;
  posicaoY: number;
  exausto: boolean;
  atualizadoEm: string;
}

export interface RodadaData {
  numero: number;
  iniciativa: Array<{ id: string; nome: string; tipo: 'pj' | 'npc'; valor: number; modificador: number }>;
  turnoAtualIndex: number;
  ativa: boolean;
}

export interface AdmData {
  npcs: NpcData[];
  estadosPJ: EstadoPJ[];
  rodada: RodadaData;
  senhaAdm: string;
}

const STORAGE_KEY = 'bluelock_adm_data';
const DEFAULT_SENHA = 'bluelock2024';

const initialRodada: RodadaData = {
  numero: 1,
  iniciativa: [],
  turnoAtualIndex: 0,
  ativa: false,
};

const initialAdmData: AdmData = {
  npcs: [],
  estadosPJ: [],
  rodada: initialRodada,
  senhaAdm: DEFAULT_SENHA,
};

export function useAdmStorage() {
  const [admData, setAdmData] = useState<AdmData>(initialAdmData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AdmData;
        // Garantir que arrays existam mesmo em dados antigos do localStorage
        const sanitizedData: AdmData = {
          ...initialAdmData,
          ...parsed,
          npcs: Array.isArray(parsed.npcs) ? parsed.npcs : [],
          estadosPJ: Array.isArray(parsed.estadosPJ) ? parsed.estadosPJ : [],
          rodada: {
            ...initialRodada,
            ...(parsed.rodada || {}),
            iniciativa: Array.isArray(parsed.rodada?.iniciativa) ? parsed.rodada.iniciativa : [],
          }
        };
        setAdmData(sanitizedData);
      } catch (error) {
        console.error('Erro ao carregar dados ADM:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  const persist = useCallback((data: AdmData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setAdmData(data);
  }, []);

  // ============ NPCs ============
  const saveNpc = useCallback((npc: Omit<NpcData, 'criadoEm' | 'atualizadoEm'> & { criadoEm?: string }) => {
    const now = new Date().toISOString();
    const npcSalvo: NpcData = {
      ...npc,
      criadoEm: npc.criadoEm || now,
      atualizadoEm: now,
    };
    setAdmData(prev => {
      const idx = prev.npcs.findIndex(n => n.id === npc.id);
      const novosNpcs = idx >= 0
        ? prev.npcs.map((n, i) => i === idx ? npcSalvo : n)
        : [...prev.npcs, npcSalvo];
      const updated = { ...prev, npcs: novosNpcs };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    return npcSalvo;
  }, []);

  const deleteNpc = useCallback((id: string) => {
    setAdmData(prev => {
      const updated = { ...prev, npcs: prev.npcs.filter(n => n.id !== id) };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateNpcStatus = useCallback((id: string, status: NpcStatus) => {
    setAdmData(prev => {
      const updated = {
        ...prev,
        npcs: prev.npcs.map(n => n.id === id ? { ...n, status, atualizadoEm: new Date().toISOString() } : n)
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateNpcVisibilidade = useCallback((id: string, visibilidade: NpcVisibilidade) => {
    setAdmData(prev => {
      const updated = {
        ...prev,
        npcs: prev.npcs.map(n => n.id === id ? { ...n, visibilidade, atualizadoEm: new Date().toISOString() } : n)
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateNpcVida = useCallback((id: string, campo: 'saudeAtual' | 'folegoAtual' | 'egoPercent', valor: number) => {
    setAdmData(prev => {
      const updated = {
        ...prev,
        npcs: prev.npcs.map(n => {
          if (n.id !== id) return n;
          const novo = { ...n, [campo]: valor, atualizadoEm: new Date().toISOString() };
          // Gatilho de exaustão
          if (campo === 'folegoAtual' && valor <= 0) {
            const s = new Set([...novo.condicoes, 'Exausto']);
            novo.condicoes = Array.from(s);
          }
          return novo;
        })
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const addCondicaoNpc = useCallback((id: string, condicao: string) => {
    setAdmData(prev => {
      const updated = {
        ...prev,
        npcs: prev.npcs.map(n => n.id === id
          ? { ...n, condicoes: Array.from(new Set([...n.condicoes, condicao])), atualizadoEm: new Date().toISOString() }
          : n)
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeCondicaoNpc = useCallback((id: string, condicao: string) => {
    setAdmData(prev => {
      const updated = {
        ...prev,
        npcs: prev.npcs.map(n => n.id === id
          ? { ...n, condicoes: n.condicoes.filter(c => c !== condicao), atualizadoEm: new Date().toISOString() }
          : n)
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // ============ Estados de PJ ============
  const saveEstadoPJ = useCallback((estado: Omit<EstadoPJ, 'atualizadoEm'>) => {
    const now = new Date().toISOString();
    const estadoSalvo: EstadoPJ = { ...estado, atualizadoEm: now };
    setAdmData(prev => {
      const idx = prev.estadosPJ.findIndex(e => e.fichaId === estado.fichaId);
      const novosEstados = idx >= 0
        ? prev.estadosPJ.map((e, i) => i === idx ? estadoSalvo : e)
        : [...prev.estadosPJ, estadoSalvo];
      const updated = { ...prev, estadosPJ: novosEstados };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    return estadoSalvo;
  }, []);

  const updateEstadoPJ = useCallback((fichaId: string, campos: Partial<EstadoPJ>) => {
    setAdmData(prev => {
      const updated = {
        ...prev,
        estadosPJ: prev.estadosPJ.map(e => {
          if (e.fichaId !== fichaId) return e;
          const novo = { ...e, ...campos, atualizadoEm: new Date().toISOString() };
          // Gatilho de exaustão automático
          if (campos.folegoAtual !== undefined && campos.folegoAtual <= 0) {
            novo.exausto = true;
            const s = new Set([...novo.condicoes, 'Exausto']);
            novo.condicoes = Array.from(s);
          }
          // Remover exaustão se fôlego for restaurado
          if (campos.folegoAtual !== undefined && campos.folegoAtual > 0 && novo.exausto) {
            novo.exausto = false;
            novo.condicoes = novo.condicoes.filter(c => c !== 'Exausto');
          }
          return novo;
        })
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteEstadoPJ = useCallback((fichaId: string) => {
    setAdmData(prev => {
      const updated = { ...prev, estadosPJ: prev.estadosPJ.filter(e => e.fichaId !== fichaId) };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // ============ Rodada / Iniciativa ============
  const setRodada = useCallback((rodada: RodadaData) => {
    setAdmData(prev => {
      const updated = { ...prev, rodada };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const resetReacoes = useCallback(() => {
    setAdmData(prev => {
      const updated = {
        ...prev,
        estadosPJ: prev.estadosPJ.map(e => ({ ...e, reacaoUsada: false, atualizadoEm: new Date().toISOString() })),
        npcs: prev.npcs.map(n => ({ ...n, atualizadoEm: new Date().toISOString() }))
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const resetAcoesTurno = useCallback(() => {
    setAdmData(prev => {
      const updated = {
        ...prev,
        estadosPJ: prev.estadosPJ.map(e => ({
          ...e,
          acaoUsada: false,
          acaoBonusUsada: false,
          reacaoUsada: false,
          movimentoUsado: 0,
          atualizadoEm: new Date().toISOString()
        }))
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const avancarTurno = useCallback(() => {
    setAdmData(prev => {
      const total = prev.rodada.iniciativa.length;
      if (total === 0) return prev;
      const proximo = (prev.rodada.turnoAtualIndex + 1) % total;
      const novaRodada = proximo === 0
        ? { ...prev.rodada, turnoAtualIndex: 0, numero: prev.rodada.numero + 1 }
        : { ...prev.rodada, turnoAtualIndex: proximo };
      const updated = { ...prev, rodada: novaRodada };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const verificarSenha = useCallback((senha: string) => {
    return senha === admData.senhaAdm || senha === DEFAULT_SENHA;
  }, [admData.senhaAdm]);

  return {
    admData,
    isLoaded,
    // NPCs
    saveNpc,
    deleteNpc,
    updateNpcStatus,
    updateNpcVisibilidade,
    updateNpcVida,
    addCondicaoNpc,
    removeCondicaoNpc,
    // PJs
    saveEstadoPJ,
    updateEstadoPJ,
    deleteEstadoPJ,
    // Rodada
    setRodada,
    resetReacoes,
    resetAcoesTurno,
    avancarTurno,
    // Auth
    verificarSenha,
  };
}
