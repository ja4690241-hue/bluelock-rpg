// Blue Lock RPG - ADM Login Modal
// Modal de autenticação para acesso ao Painel ADM

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, AlertCircle } from 'lucide-react';
import { useAdmAuth } from '@/contexts/AdmAuthContext';

interface AdmLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdmLoginModal({ isOpen, onClose }: AdmLoginModalProps) {
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const { login } = useAdmAuth();

  const handleLogin = async () => {
    setCarregando(true);
    setErro(false);
    
    // Simular delay para melhor UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (login(senha)) {
      setSenha('');
      onClose();
    } else {
      setErro(true);
      setSenha('');
      setTimeout(() => setErro(false), 3000);
    }
    setCarregando(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.95)' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-sm rounded-sm border"
        style={{ background: 'oklch(0.08 0.01 260)', borderColor: 'oklch(0.52 0.22 260 / 0.3)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'oklch(0.22 0.03 260)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm flex items-center justify-center" style={{ background: 'oklch(0.52 0.22 260 / 0.2)', border: '1px solid oklch(0.52 0.22 260 / 0.4)' }}>
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-display text-xl text-white tracking-wider">PAINEL ADM</h3>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-8 space-y-6">
          <div className="text-center">
            <p className="text-muted-foreground text-sm mb-2">Acesso restrito ao Mestre da partida</p>
            <p className="text-xs text-muted-foreground opacity-70">Digite a senha para acessar o painel de controle</p>
          </div>

          {/* Erro */}
          {erro && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 px-4 py-3 rounded-sm"
              style={{ background: 'oklch(0.4 0.1 0 / 0.2)', border: '1px solid oklch(0.5 0.1 0 / 0.4)' }}
            >
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span className="text-xs text-red-300 font-heading">Senha incorreta</span>
            </motion.div>
          )}

          {/* Input de Senha */}
          <div>
            <label className="block font-heading text-[10px] tracking-widest uppercase text-muted-foreground mb-2">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="password"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !carregando && handleLogin()}
                placeholder="••••••••"
                disabled={carregando}
                className="w-full pl-10 pr-4 py-3 rounded-sm text-sm font-heading placeholder-muted-foreground focus:outline-none transition-all disabled:opacity-50"
                style={{
                  background: 'oklch(0.12 0.015 260)',
                  border: `1px solid ${erro ? 'oklch(0.5 0.1 0 / 0.5)' : 'oklch(0.22 0.03 260)'}`,
                  color: 'white'
                }}
                autoFocus
              />
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={carregando}
              className="flex-1 px-4 py-2.5 rounded-sm text-xs font-heading uppercase tracking-wider transition-all disabled:opacity-50"
              style={{
                background: 'oklch(0.12 0.015 260)',
                border: '1px solid oklch(0.22 0.03 260)',
                color: 'oklch(0.5 0.02 260)',
              }}
            >
              CANCELAR
            </button>
            <button
              onClick={handleLogin}
              disabled={!senha || carregando}
              className="flex-1 px-4 py-2.5 rounded-sm text-xs font-heading uppercase tracking-wider transition-all disabled:opacity-50 bl-btn-primary"
            >
              {carregando ? 'VERIFICANDO...' : 'ENTRAR'}
            </button>
          </div>

          {/* Info */}
          <div className="pt-4 border-t" style={{ borderColor: 'oklch(0.22 0.03 260)' }}>
            <p className="text-[10px] text-muted-foreground text-center opacity-60 font-heading">
              Você receberá a senha do ADM do Mestre da partida
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
