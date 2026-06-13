import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export interface FichaData {
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

const API_BASE = '/api/fichas';

export function useFichaServerSync() {
  const [fichas, setFichas] = useState<FichaData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar fichas do servidor
  const carregarFichas = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<FichaData[]>(API_BASE);
      setFichas(response.data || []);
    } catch (err) {
      console.error('Erro ao carregar fichas do servidor:', err);
      setError('Erro ao carregar fichas');
      // Se falhar, tenta carregar do localStorage como fallback
      const stored = localStorage.getItem('bluelock_fichas');
      if (stored) {
        try {
          setFichas(JSON.parse(stored));
        } catch (e) {
          console.error('Erro ao carregar fichas do localStorage:', e);
        }
      }
    } finally {
      setIsLoading(false);
      setIsLoaded(true);
    }
  }, []);

  // Carregar fichas ao montar o componente
  useEffect(() => {
    carregarFichas();
  }, [carregarFichas]);

  // Salvar ficha no servidor
  const saveFicha = useCallback(async (ficha: FichaData) => {
    try {
      const now = new Date().toISOString();
      const fichaSalva = {
        ...ficha,
        atualizadoEm: now,
        criadoEm: ficha.criadoEm || now,
      };

      // Tentar salvar no servidor
      try {
        const response = await axios.post<FichaData>(API_BASE, fichaSalva);
        
        // Atualizar estado local
        setFichas((prevFichas) => {
          const index = prevFichas.findIndex(f => f.id === ficha.id);
          let novasFichas: FichaData[];
          
          if (index >= 0) {
            novasFichas = [...prevFichas];
            novasFichas[index] = response.data;
          } else {
            novasFichas = [...prevFichas, response.data];
          }
          
          // Também salvar no localStorage como backup
          localStorage.setItem('bluelock_fichas', JSON.stringify(novasFichas));
          return novasFichas;
        });

        return response.data;
      } catch (serverError) {
        console.warn('Erro ao salvar no servidor, usando localStorage:', serverError);
        
        // Fallback: salvar apenas no localStorage
        setFichas((prevFichas) => {
          const index = prevFichas.findIndex(f => f.id === ficha.id);
          let novasFichas: FichaData[];
          
          if (index >= 0) {
            novasFichas = [...prevFichas];
            novasFichas[index] = fichaSalva;
          } else {
            novasFichas = [...prevFichas, fichaSalva];
          }
          
          localStorage.setItem('bluelock_fichas', JSON.stringify(novasFichas));
          return novasFichas;
        });

        return fichaSalva;
      }
    } catch (err) {
      console.error('Erro ao salvar ficha:', err);
      throw err;
    }
  }, []);

  // Deletar ficha
  const deleteFicha = useCallback(async (id: string) => {
    try {
      // Tentar deletar no servidor
      try {
        await axios.delete(`${API_BASE}/${id}`);
      } catch (serverError) {
        console.warn('Erro ao deletar no servidor:', serverError);
      }

      // Atualizar estado local
      setFichas((prevFichas) => {
        const novasFichas = prevFichas.filter(f => f.id !== id);
        localStorage.setItem('bluelock_fichas', JSON.stringify(novasFichas));
        return novasFichas;
      });
    } catch (err) {
      console.error('Erro ao deletar ficha:', err);
      throw err;
    }
  }, []);

  // Obter ficha por ID
  const getFicha = useCallback((id: string) => {
    return fichas.find(f => f.id === id);
  }, [fichas]);

  // Exportar ficha como JSON
  const exportFicha = (ficha: FichaData) => {
    const dataStr = JSON.stringify(ficha, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${ficha.nome.replace(/\s+/g, '_')}_${ficha.numero}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Importar ficha de JSON
  const importFicha = async (file: File): Promise<FichaData> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const ficha = JSON.parse(e.target?.result as string) as FichaData;
          const saved = await saveFicha(ficha);
          resolve(saved);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
      reader.readAsText(file);
    });
  };

  return {
    fichas,
    isLoaded,
    isLoading,
    error,
    saveFicha,
    deleteFicha,
    getFicha,
    exportFicha,
    importFicha,
    recarregar: carregarFichas,
  };
}
