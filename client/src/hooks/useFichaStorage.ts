import { useEffect, useCallback, useState } from 'react';

export interface FichaData {
  id?: string;
  nome: string;
  numero: string;
  classId: string;
  atributos: Record<string, number>;
  pericias: Record<string, number>;
  folego: number;
  treinamentos: string[];
  arma: string;
  notas: string;
  foto?: string;
  createdAt?: number;
}

const DRAFT_KEY = 'bluelock_ficha_draft';
const SAVED_FICHAS_KEY = 'bluelock_saved_fichas';

export function useFichaStorage(ficha?: FichaData) {
  const [savedFichas, setSavedFichas] = useState<FichaData[]>([]);

  // Carregar todas as fichas salvas
  const loadSavedFichas = useCallback((): FichaData[] => {
    try {
      const saved = localStorage.getItem(SAVED_FICHAS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setSavedFichas(parsed);
        return parsed;
      }
    } catch (error) {
      console.error('Erro ao carregar fichas salvas:', error);
    }
    return [];
  }, []);

  // Salvar uma ficha na lista permanente
  const saveToGallery = useCallback((fichaToSave: FichaData) => {
    try {
      const currentFichas = loadSavedFichas();
      const newFicha = { 
        ...fichaToSave, 
        id: fichaToSave.id || crypto.randomUUID(),
        createdAt: fichaToSave.createdAt || Date.now() 
      };
      
      // Se já existe (mesmo ID), atualiza. Senão, adiciona.
      const index = currentFichas.findIndex(f => f.id === newFicha.id);
      let updatedFichas;
      if (index >= 0) {
        updatedFichas = [...currentFichas];
        updatedFichas[index] = newFicha;
      } else {
        updatedFichas = [newFicha, ...currentFichas];
      }

      localStorage.setItem(SAVED_FICHAS_KEY, JSON.stringify(updatedFichas));
      setSavedFichas(updatedFichas);
      return newFicha;
    } catch (error) {
      console.error('Erro ao salvar na galeria:', error);
      return null;
    }
  }, [loadSavedFichas]);

  // Deletar uma ficha
  const deleteFicha = useCallback((id: string) => {
    try {
      const currentFichas = loadSavedFichas();
      const filtered = currentFichas.filter(f => f.id !== id);
      localStorage.setItem(SAVED_FICHAS_KEY, JSON.stringify(filtered));
      setSavedFichas(filtered);
    } catch (error) {
      console.error('Erro ao deletar ficha:', error);
    }
  }, [loadSavedFichas]);

  // Lógica do Rascunho (Draft)
  const saveDraft = useCallback((draft: FichaData) => {
    if (!draft.nome && !draft.classId) return;
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  }, []);

  const loadDraft = useCallback((): FichaData | null => {
    const saved = localStorage.getItem(DRAFT_KEY);
    return saved ? JSON.parse(saved) : null;
  }, []);

  const clearDraft = useCallback(() => {
    localStorage.removeItem(DRAFT_KEY);
  }, []);

  // Auto-save draft
  useEffect(() => {
    if (ficha) {
      const timer = setTimeout(() => {
        saveDraft(ficha);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [ficha, saveDraft]);

  // Inicializar lista
  useEffect(() => {
    loadSavedFichas();
  }, [loadSavedFichas]);

  return { 
    savedFichas, 
    saveToGallery, 
    deleteFicha, 
    loadSavedFichas,
    saveDraft,
    loadDraft,
    clearDraft
  };
}
