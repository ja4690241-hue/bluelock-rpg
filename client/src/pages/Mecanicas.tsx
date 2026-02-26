import { motion } from "framer-motion";
import Accordion from "@/components/Accordion";

export default function Mecanicas() {
  const mecanicasItems = [
    {
      id: "passes",
      title: "Passes e Complicações",
      icon: "🎯",
      content: (
        <div className="space-y-2 text-sm">
          <p><strong>Distância Próxima:</strong> 5-10 pés com visão limpa não requerem teste.</p>
          <p><strong>Distância Média:</strong> 15 pés = DT 15. A cada 5 pés adicionais, +5 na DT.</p>
          <p><strong>Falha (1d4):</strong> 1 = Curto demais, 2 = Distância Média, 3 = Disputa Injusta, 4 = Longo demais.</p>
          <p><strong>Adversários na Trajetória:</strong> Gera teste de Reflexos para interceptação.</p>
        </div>
      )
    },
    {
      id: "dribles",
      title: "Dribles e Fintas",
      icon: "🌀",
      content: (
        <div className="space-y-2 text-sm">
          <p><strong>Teste de Drible:</strong> Compara Drible do atacante vs Defesa do defensor.</p>
          <p><strong>Sucesso:</strong> Você passa pelo defensor e pode continuar se movendo.</p>
          <p><strong>Falha:</strong> Perde a bola ou é derrubado (depende da margem de falha).</p>
          <p><strong>Crítico (20):</strong> Drible tão bom que o defensor sofre -2 na próxima ação.</p>
        </div>
      )
    },
    {
      id: "chutes",
      title: "Chutes e Finalizações",
      icon: "⚽",
      content: (
        <div className="space-y-2 text-sm">
          <p><strong>Teste de Chute:</strong> Compara Chute do atacante vs Defesa do goleiro.</p>
          <p><strong>DT Base:</strong> 12 (goleiro atento). Aumenta com distância e obstáculos.</p>
          <p><strong>Sucesso:</strong> Gol marcado!</p>
          <p><strong>Crítico (19-20):</strong> Gol impossível de defender.</p>
        </div>
      )
    },
    {
      id: "defesa",
      title: "Defesa e Bloqueios",
      icon: "🛡️",
      content: (
        <div className="space-y-2 text-sm">
          <p><strong>Teste de Defesa:</strong> Reação para bloquear chutes ou passes.</p>
          <p><strong>Bloqueio Bem-Sucedido:</strong> Reduz dano ou intercepta o passe.</p>
          <p><strong>Posicionamento:</strong> Estar entre o atacante e o alvo concede vantagem.</p>
          <p><strong>Penalidade:</strong> Estar marcado por múltiplos adversários causa desvantagem.</p>
        </div>
      )
    }
  ];

  return (
    <div className="py-16">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="bl-tag mb-4">Sistema de Jogo</div>
          <h1 className="font-display text-6xl md:text-7xl text-white tracking-wider mb-4 uppercase italic">
            Mecânicas
          </h1>
          <div className="w-24 h-0.5 mb-6" style={{ background: 'oklch(0.52 0.22 260)' }} />
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            As mecânicas fundamentais do jogo. Clique em cada uma para entender como funcionam durante a partida.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Accordion items={mecanicasItems} allowMultiple={true} />
        </motion.div>
      </div>
    </div>
  );
}
