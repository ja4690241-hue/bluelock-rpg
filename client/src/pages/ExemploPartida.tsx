// Blue Lock RPG - Exemplo de Partida Page
// Design: Manga Dynamic - Example gameplay walkthrough

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function ExemploPartida() {
  const turns = [
    {
      round: 1,
      title: "Turno 1: Isagi (Playmaker) - Iniciativa 18",
      actions: [
        {
          step: "Ação Padrão",
          description: "Isagi tenta passar para Bachira que está 15 pés à frente. Teste de Passe: 14 + 5 (bônus) = 19. Sucesso!"
        },
        {
          step: "Movimento",
          description: "Isagi se move 10 pés para frente, mantendo posição de suporte."
        }
      ],
      narrative: "Isagi sente o ritmo do jogo. Com um toque preciso, passa a bola para Bachira, que a recebe com controle perfeito."
    },
    {
      round: 1,
      title: "Turno 2: Defensor Inimigo - Iniciativa 12",
      actions: [
        {
          step: "Reação (Imediata)",
          description: "O defensor tenta interceptar o passe. Teste de Intuição: 8. Falha! Não consegue antecipar."
        },
        {
          step: "Ação Padrão",
          description: "O defensor se move 20 pés para marcar Bachira."
        }
      ],
      narrative: "O defensor vê o perigo vindo, mas é rápido demais. Bachira já tem a bola e está aceleando."
    },
    {
      round: 2,
      title: "Turno 3: Bachira (Velocista) - Iniciativa 19",
      actions: [
        {
          step: "Ação Padrão",
          description: "Bachira usa 'Drible com Adiantamento' (8 FO). Teste de Explosão: 16 + 5 = 21. Acerto crítico!"
        },
        {
          step: "Efeito do Crítico",
          description: "Ganha +2 adicional. Dribla o defensor com estilo, abrindo 10 pés de espaço."
        },
        {
          step: "Movimento",
          description: "Bachira se move 30 pés (seu deslocamento padrão) + 10 pés extras da habilidade = 40 pés totais."
        }
      ],
      narrative: "Bachira explode em velocidade! Seus pés mal tocam o chão enquanto passa pelo defensor como se ele fosse um fantasma. A torcida grita!"
    },
    {
      round: 2,
      title: "Turno 4: Goleiro - Iniciativa 10",
      actions: [
        {
          step: "Ação Padrão",
          description: "Goleiro se posiciona na linha de gol, esperando. Teste de Presença: 14. Ele está pronto."
        }
      ],
      narrative: "O goleiro vê Bachira se aproximando. Seus olhos se focam, corpo tenso, pronto para qualquer coisa."
    },
    {
      round: 3,
      title: "Turno 5: Isagi (Playmaker) - Ação Bônus",
      actions: [
        {
          step: "Reação",
          description: "Isagi vê Bachira em posição. Como reação, passa a bola novamente. Teste de Passe: 17 + 5 = 22. Sucesso perfeito!"
        }
      ],
      narrative: "Isagi antecipa o movimento de Bachira. A bola chega perfeitamente no seu pé, no momento exato."
    },
    {
      round: 3,
      title: "Turno 6: Bachira - Finalizando",
      actions: [
        {
          step: "Ação Padrão",
          description: "Bachira usa 'Chute Veloz' (15 FO). Teste de Chute: 18 + 5 (Potência) + 3 (Velocidade) = 26. Acerto crítico!"
        },
        {
          step: "Resultado",
          description: "O chute é tão rápido e poderoso que o goleiro não consegue reagir. GOL! A bola entra no canto superior direito."
        }
      ],
      narrative: "Bachira recua o pé. O ar ao seu redor queima. Ele solta um grito enquanto chuta com toda sua força. A bola voa como uma bala. O goleiro levanta as mãos, mas é tarde demais. GOOOOOOL!"
    }
  ];

  const characterStats = [
    {
      name: "Isagi Yoichi",
      class: "Playmaker",
      stats: {
        potencia: 4,
        tecnica: 7,
        velocidade: 5,
        agilidade: 6,
        ego: 5,
        folego: 18
      },
      skills: {
        "Passe": 10,
        "Drible": 9,
        "Pontaria": 8,
        "Intuição": 9
      }
    },
    {
      name: "Bachira Meguru",
      class: "Velocista",
      stats: {
        potencia: 6,
        tecnica: 5,
        velocidade: 8,
        agilidade: 7,
        ego: 6,
        folego: 20
      },
      skills: {
        "Explosão": 10,
        "Corrida Longa Distância": 10,
        "Chute": 9,
        "Drible": 8
      }
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
          <div className="bl-tag mb-4">Demonstração</div>
          <h1 className="font-display text-6xl md:text-7xl text-white tracking-wider mb-4">
            EXEMPLO DE PARTIDA
          </h1>
          <div className="w-24 h-0.5 mb-6" style={{ background: 'oklch(0.52 0.22 260)' }} />
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            Veja um exemplo completo de como uma partida funciona em Blue Lock RPG. Isagi e Bachira trabalham juntos para marcar um gol espetacular contra um defensor e goleiro.
          </p>
        </motion.div>

        {/* Character Stats */}
        <div className="mb-12">
          <h2 className="font-display text-3xl text-white tracking-wider mb-6">PERSONAGENS DO EXEMPLO</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {characterStats.map((char, i) => (
              <motion.div
                key={char.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bl-card p-6"
              >
                <div className="mb-4">
                  <h3 className="font-display text-2xl text-white">{char.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{char.class}</p>
                </div>

                <div className="mb-4 pb-4 border-b border-border">
                  <p className="text-xs text-muted-foreground font-heading uppercase tracking-wider mb-3">Atributos</p>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(char.stats).map(([attr, val]) => (
                      <div key={attr} className="text-center p-2 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)' }}>
                        <div className="font-mono-stats text-lg font-bold" style={{ color: 'oklch(0.75 0.15 230)' }}>
                          {val}
                        </div>
                        <div className="text-xs text-muted-foreground">{attr.slice(0, 3)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground font-heading uppercase tracking-wider mb-3">Perícias Principais</p>
                  <div className="space-y-1">
                    {Object.entries(char.skills).map(([skill, val]) => (
                      <div key={skill} className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{skill}</span>
                        <span className="font-mono-stats font-bold" style={{ color: 'oklch(0.75 0.15 230)' }}>+{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Turn-by-turn */}
        <div className="mb-12">
          <h2 className="font-display text-3xl text-white tracking-wider mb-6">SEQUÊNCIA DE TURNOS</h2>
          <div className="space-y-6">
            {turns.map((turn, i) => (
              <motion.div
                key={`${turn.round}-${i}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bl-card p-6"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-sm flex-shrink-0 font-display"
                    style={{ background: 'oklch(0.52 0.22 260)', color: 'white' }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white">{turn.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">Rodada {turn.round}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  {turn.actions.map((action, j) => (
                    <div key={j} className="pl-4 border-l-2" style={{ borderColor: 'oklch(0.52 0.22 260 / 0.5)' }}>
                      <p className="text-xs font-heading font-bold text-white mb-1">{action.step}</p>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm leading-relaxed" style={{ color: 'oklch(0.75 0.15 230)' }}>
                    <span className="font-heading font-bold">Narrativa:</span> {turn.narrative}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Key Takeaways */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bl-card p-8"
        >
          <h2 className="font-display text-3xl text-white tracking-wider mb-6">LIÇÕES IMPORTANTES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-heading text-lg font-bold text-white mb-3">Sincronização em Equipe</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Isagi e Bachira trabalham juntos. Isagi passa, Bachira finaliza. Quando jogadores se sincronizam, seus bônus se multiplicam.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white mb-3">Uso Estratégico de Habilidades</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Bachira usa 'Drible com Adiantamento' e 'Chute Veloz' nos momentos certos. Habilidades bem-colocadas mudam o resultado.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white mb-3">Acertos Críticos Importam</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Dois acertos críticos (21 e 26) foram decisivos. Sorte e habilidade combinadas criam momentos épicos.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white mb-3">Narrativa Dramática</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Cada ação é descrita dramaticamente. Isso torna o jogo emocionante e memorável para todos os jogadores.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
