import { createContext, useContext, useState, useEffect } from 'react';

interface FlowContextType {
  isFlowActive: boolean;
  toggleFlow: () => void;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);

export function FlowProvider({ children }: { children: React.ReactNode }) {
  const [isFlowActive, setIsFlowActive] = useState(false);

  // Carregar estado do Flow do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('bluelock_flow_mode');
    if (saved === 'true') {
      setIsFlowActive(true);
    }
  }, []);

  // Salvar estado do Flow no localStorage
  useEffect(() => {
    localStorage.setItem('bluelock_flow_mode', String(isFlowActive));
  }, [isFlowActive]);

  const toggleFlow = () => {
    setIsFlowActive(prev => !prev);
  };

  return (
    <FlowContext.Provider value={{ isFlowActive, toggleFlow }}>
      {children}
    </FlowContext.Provider>
  );
}

export function useFlow() {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error('useFlow deve ser usado dentro de FlowProvider');
  }
  return context;
}
