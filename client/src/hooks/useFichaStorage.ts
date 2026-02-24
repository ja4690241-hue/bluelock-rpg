import { useEffect, useCallback } from 'react';

interface FichaData {
  nome: string;
  numero: string;
  classId: string;
  atributos: Record<string, number>;
  pericias: Record<string, number>;
  folego: number;
  treinamentos: string[];
  notas: string;
  foto?: string;
}

const STORAGE_KEY = 'bluelock_ficha_draft';

export function useFichaStorage(ficha: FichaData, shouldSave: boolean = true) {
  // Salvar ficha no localStorage
  const saveFicha = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ficha));
      console.log('Ficha salva localmente');
    } catch (error) {
      console.error('Erro ao salvar ficha:', error);
    }
  }, [ficha]);

  // Carregar ficha do localStorage
  const loadFicha = useCallback((): FichaData | null => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        console.log('Ficha carregada do localStorage');
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Erro ao carregar ficha:', error);
    }
    return null;
  }, []);

  // Limpar ficha do localStorage
  const clearFicha = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      console.log('Ficha removida do localStorage');
    } catch (error) {
      console.error('Erro ao remover ficha:', error);
    }
  }, []);

  // Auto-save a cada mudança
  useEffect(() => {
    if (shouldSave && ficha.nome) {
      const timer = setTimeout(() => {
        saveFicha();
      }, 500); // Aguarda 500ms após a última mudança para salvar

      return () => clearTimeout(timer);
    }
  }, [ficha, shouldSave, saveFicha]);

  return { saveFicha, loadFicha, clearFicha };
}
