import { useState, useEffect } from 'react';

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
  criadoEm: string;
  atualizadoEm: string;
}

const STORAGE_KEY = 'bluelock_fichas';

export function useFichaStorage() {
  const [fichas, setFichas] = useState<FichaData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carregar fichas do localStorage ao montar o componente
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setFichas(JSON.parse(stored));
      } catch (error) {
        console.error('Erro ao carregar fichas:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Salvar ficha
  const saveFicha = (ficha: FichaData) => {
    const now = new Date().toISOString();
    const fichaSalva = {
      ...ficha,
      atualizadoEm: now,
      criadoEm: ficha.criadoEm || now,
    };

    setFichas((prevFichas) => {
      const index = prevFichas.findIndex(f => f.id === ficha.id);
      let novasFichas: FichaData[];
      
      if (index >= 0) {
        // Atualizar ficha existente
        novasFichas = [...prevFichas];
        novasFichas[index] = fichaSalva;
      } else {
        // Adicionar nova ficha
        novasFichas = [...prevFichas, fichaSalva];
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(novasFichas));
      return novasFichas;
    });

    return fichaSalva;
  };

  // Deletar ficha
  const deleteFicha = (id: string) => {
    setFichas((prevFichas) => {
      const novasFichas = prevFichas.filter(f => f.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(novasFichas));
      return novasFichas;
    });
  };

  // Obter ficha por ID
  const getFicha = (id: string) => {
    return fichas.find(f => f.id === id);
  };

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
  const importFicha = (file: File): Promise<FichaData> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const ficha = JSON.parse(e.target?.result as string) as FichaData;
          saveFicha(ficha);
          resolve(ficha);
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
    saveFicha,
    deleteFicha,
    getFicha,
    exportFicha,
    importFicha,
  };
}
