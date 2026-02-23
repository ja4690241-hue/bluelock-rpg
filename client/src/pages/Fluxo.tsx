// Blue Lock RPG - Fluxo Page
// Design: Manga Dynamic - Flow state mechanics

import { motion } from "framer-motion";
import { Zap, TrendingUp, Heart } from "lucide-react";

export default function Fluxo() {
  const flowStages = [
    {
      stage: 1,
      title: "Entrada em Fluxo",
      icon: "🌀",
      requirements: [
        "Ter realizado pelo menos 2 ações bem-sucedidas consecutivas",
        "Estar em uma situação de pressão (adversário próximo ou situação crítica)",
        "Declarar que está entrando em Fluxo no início de seu turno"
      ],
      cost: "8 Pontos de Fôlego",
      duration: "3 Rodadas",
      effects: [
        "+3 em todos os testes de perícias",
        "+2 em iniciativa",
        "Vantagem em testes de Reflexos",
        "Pode usar uma ação bônus adicional por rodada"
      ]
    },
    {
      stage: 2,
      title: "Fluxo Intenso",
      icon: "⚡",
      requirements: [
        "Estar em Fluxo por 2 rodadas",
        "Ter realizado pelo menos 1 ação bem-sucedida neste turno",
        "Gastar 5 pontos de fôlego adicionais"
      ],
      cost: "5 Pontos de Fôlego (adicional)",
      duration: "2 Rodadas",
      effects: [
        "+5 em todos os testes de perícias",
        "+3 em iniciativa",
        "Vantagem em testes de Chute e Pontaria",
        "Pode se mover 10 pés adicionais por rodada",
        "Acertos críticos em 19 ou 20"
      ]
    },
    {
      stage: 3,
      title: "Fluxo Absoluto",
      icon: "👑",
      requirements: [
        "Estar em Fluxo Intenso por 2 rodadas",
        "Ter marcado um gol ou realizado uma ação extraordinária",
        "Gastar 15 pontos de fôlego"
      ],
      cost: "15 Pontos de Fôlego",
      duration: "1 Rodada",
      effects: [
        "+8 em todos os testes de perícias",
        "Imunidade a condições negativas (Flanqueado, Cercado, Intimidado)",
        "Acertos críticos em 18, 19 ou 20",
        "Pode usar 2 ações padrão neste turno",
        "Movimento ilimitado"
      ]
    }
  ];

  const mechanics = [
    {
      title: "Saindo do Fluxo",
      icon: "❌",
      description: "Você sai do Fluxo quando:",
      points: [
        "A duração termina naturalmente",
        "Sofre um acerto crítico contra você",
        "Falha em um teste crítico (rolar 1 no d20)",
        "Seu fôlego chega a 0",
        "Escolhe voluntariamente sair"
      ]
    },
    {
      title: "Penalidade ao Sair",
      icon: "😤",
      description: "Após sair do Fluxo, você sofre:",
      points: [
        "-2 em todos os testes por 1 rodada",
        "Não pode entrar em Fluxo novamente por 2 rodadas",
        "Cansaço mental — o corpo pede descanso"
      ]
    },
    {
      title: "Fluxo em Equipe",
      icon: "🤝",
      description: "Efeitos especiais quando múltiplos jogadores estão em Fluxo:",
      points: [
        "Cada aliado em Fluxo concede +1 em testes para você",
        "Passes entre jogadores em Fluxo ganham +5",
        "Finalizações coordenadas ganham bônus de +3",
        "Máximo de +3 de bônus de aliados"
      ]
    },
    {
      title: "Quebra de Fluxo",
      icon: "💥",
      description: "Situações que podem quebrar seu Fluxo:",
      points: [
        "Ser marcado por 3 ou mais adversários",
        "Sofrer uma penalidade de -6 ou pior",
        "Seu time sofrer um gol",
        "Ser substituído do jogo"
      ]
    }
  ];

  const examples = [
    {
      title: "Exemplo 1: Entrada Simples",
      scenario: "Você é um Velocista. Conseguiu driblar um adversário (sucesso 1) e depois passou para um companheiro (sucesso 2). No seu próximo turno, declara Fluxo.",
      result: "Você entra em Fluxo, gastando 8 FO. Recebe +3 em testes por 3 rodadas."
    },
    {
      title: "Exemplo 2: Escalação",
      scenario: "Você está em Fluxo há 2 rodadas. Neste turno, conseguiu um Acerto Crítico em um Chute. Declara Fluxo Intenso, gastando 5 FO adicionais.",
      result: "Você entra em Fluxo Intenso. Agora recebe +5 em testes, acertos críticos em 19-20, e pode se mover 10 pés adicionais."
    },
    {
      title: "Exemplo 3: Fluxo Absoluto",
      scenario: "Você está em Fluxo Intenso há 2 rodadas e acabou de marcar um gol espetacular. Declara Fluxo Absoluto, gastando 15 FO.",
      result: "Por 1 rodada, você recebe +8 em testes, imunidade a condições, acertos críticos em 18-20, e pode usar 2 ações padrão. Após isso, sofre -2 por 1 rodada."
    }
  ];

  return (
    <div className="py-16">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="bl-tag mb-4">Mecânica Avançada</div>
          <h1 className="font-display text-6xl md:text-7xl text-white tracking-wider mb-4">
            FLUXO
          </h1>
          <div className="w-24 h-0.5 mb-6" style={{ background: 'oklch(0.52 0.22 260)' }} />
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            Fluxo é um estado de concentração extrema que potencializa as habilidades de um jogador. É o ápice do desempenho, onde tudo flui perfeitamente. Apenas os melhores centroavantes conseguem dominar essa mecânica.
          </p>
        </motion.div>

        {/* Flow Stages */}
        <div className="mb-16">
          <h2 className="font-display text-4xl text-white tracking-wider mb-8">ESTÁGIOS DO FLUXO</h2>
          <div className="space-y-6">
            {flowStages.map((flow, i) => (
              <motion.div
                key={flow.stage}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bl-card p-8"
              >
                <div className="flex items-start gap-6 mb-6">
                  <span className="text-5xl">{flow.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono-stats text-sm" style={{ color: 'oklch(0.52 0.22 260)' }}>
                        ESTÁGIO {flow.stage}
                      </span>
                      <span className="bl-badge-folego">{flow.cost}</span>
                    </div>
                    <h3 className="font-display text-3xl text-white">{flow.title}</h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-heading text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">Requisitos</h4>
                    <ul className="space-y-2">
                      {flow.requirements.map((req) => (
                        <li key={req} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span style={{ color: 'oklch(0.52 0.22 260)' }} className="font-bold mt-0.5">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-heading text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">Efeitos</h4>
                    <ul className="space-y-2">
                      {flow.effects.map((effect) => (
                        <li key={effect} className="text-sm text-muted-foreground flex items-start gap-2">
                          <Zap className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'oklch(0.52 0.22 260)' }} />
                          {effect}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-heading font-bold">Duração:</span> {flow.duration}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mechanics */}
        <div className="mb-16">
          <h2 className="font-display text-4xl text-white tracking-wider mb-8">MECÂNICAS ESPECIAIS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mechanics.map((mech, i) => (
              <motion.div
                key={mech.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bl-card p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{mech.icon}</span>
                  <h3 className="font-heading text-lg font-bold text-white">{mech.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{mech.description}</p>
                <ul className="space-y-2">
                  {mech.points.map((point) => (
                    <li key={point} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span style={{ color: 'oklch(0.52 0.22 260)' }} className="font-bold mt-0.5">▸</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Examples */}
        <div>
          <h2 className="font-display text-4xl text-white tracking-wider mb-8">EXEMPLOS PRÁTICOS</h2>
          <div className="space-y-4">
            {examples.map((ex, i) => (
              <motion.div
                key={ex.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bl-card p-6"
              >
                <h3 className="font-heading text-lg font-bold text-white mb-3">{ex.title}</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground font-heading uppercase tracking-wider mb-1">Cenário</p>
                    <p className="text-sm text-muted-foreground">{ex.scenario}</p>
                  </div>
                  <div className="pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground font-heading uppercase tracking-wider mb-1">Resultado</p>
                    <p className="text-sm" style={{ color: 'oklch(0.75 0.15 230)' }}>{ex.result}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
