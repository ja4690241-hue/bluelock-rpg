// Blue Lock RPG - ADM Authentication Context
// Gerencia autenticação global do ADM com sessão persistente

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdmAuthContextType {
  autenticado: boolean;
  login: (senha: string) => boolean;
  logout: () => void;
}

const AdmAuthContext = createContext<AdmAuthContextType | undefined>(undefined);

const STORAGE_KEY = 'bluelock_adm_auth';
const VALID_PASSWORDS = ['bluelock2024', 'adm'];

export function AdmAuthProvider({ children }: { children: React.ReactNode }) {
  const [autenticado, setAutenticado] = useState(false);
  const [carregado, setCarregado] = useState(false);

  // Restaurar sessão ao montar
  useEffect(() => {
    const sessionData = localStorage.getItem(STORAGE_KEY);
    if (sessionData) {
      try {
        const { timestamp, autenticado: wasAuth } = JSON.parse(sessionData);
        // Sessão válida por 24 horas
        const agora = Date.now();
        const umDiaEmMs = 24 * 60 * 60 * 1000;
        if (wasAuth && (agora - timestamp) < umDiaEmMs) {
          setAutenticado(true);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setCarregado(true);
  }, []);

  const login = (senha: string): boolean => {
    if (VALID_PASSWORDS.includes(senha)) {
      setAutenticado(true);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        autenticado: true,
        timestamp: Date.now()
      }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setAutenticado(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  if (!carregado) {
    return <>{children}</>;
  }

  return (
    <AdmAuthContext.Provider value={{ autenticado, login, logout }}>
      {children}
    </AdmAuthContext.Provider>
  );
}

export function useAdmAuth() {
  const context = useContext(AdmAuthContext);
  if (!context) {
    throw new Error('useAdmAuth deve ser usado dentro de AdmAuthProvider');
  }
  return context;
}
