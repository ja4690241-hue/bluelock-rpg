import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Pericia {
  nome: string;
  descricao: string;
  uso: string;
}

interface AtributoPericia {
  atributo: string;
  cor: string;
  pericias: Pericia[];
}

const periciasData: AtributoPericia[] = [
  {
    atributo: "Potência",
    cor: "oklch(0.75 0.18 25)",
    pericias: [
      {
        nome: "Corpo a Corpo",
        descricao: "Demonstra a força física de um personagem. Usada para travar a passagem de outro atleta com o próprio corpo.",
        uso: "Confrontos físicos diretos. Em caso de resultado menor que 18, o jogador marca falta."
      },
      {
        nome: "Cabeceio",
        descricao: "A habilidade de executar passes de cabeça e finalizações com a cabeça.",
        uso: "Passes e finalizações aéreas, disputas de bola no ar."
      },
      {
        nome: "Chute",
        descricao: "A perícia fundamental de chutar a bola com força e precisão para marcar gols.",
        uso: "Finalizações, chutes de longa distância, tentativas de gol."
      }
    ]
  },
  {
    atributo: "Técnica",
    cor: "oklch(0.75 0.15 230)",
    pericias: [
      {
        nome: "Pontaria",
        descricao: "Um método de chute mais sofisticado que demonstra competência técnica. Sua área de efetividade é reduzida, geralmente apenas dentro da grande área.",
        uso: "Finalizações precisas, bolas paradas, chutes com controle."
      },
      {
        nome: "Domínio",
        descricao: "A capacidade de controlar a bola após recebê-la. Pode exigir teste se houver mudança de trajetória ou distância.",
        uso: "Recepção de passes, controle de bola em movimento."
      },
      {
        nome: "Passe",
        descricao: "A perícia de executar passes com precisão. Extremamente útil para qualquer tipo de passe, cruzamentos e passes em profundidade.",
        uso: "Passes curtos e longos, cruzamentos, passes em profundidade."
      }
    ]
  },
  {
    atributo: "Velocidade",
    cor: "oklch(0.65 0.18 145)",
    pericias: [
      {
        nome: "Aceleração",
        descricao: "A capacidade de ganhar velocidade rapidamente em curtas distâncias.",
        uso: "Sprints, saídas rápidas, contra-ataques."
      },
      {
        nome: "Desaceleração",
        descricao: "A habilidade de frear e mudar de direção com eficiência.",
        uso: "Mudanças de direção, frenagens, dribles laterais."
      }
    ]
  },
  {
    atributo: "Agilidade",
    cor: "oklch(0.52 0.22 260)",
    pericias: [
      {
        nome: "Acrobacias",
        descricao: "Executar movimentos acrobáticos como voleios e finalizações aéreas. Resultado acima de 10 = sucesso, 20 = +2 bônus, abaixo de 6 = falha.",
        uso: "Chutes acrobáticos, voleios, finalizações aéreas criativas."
      },
      {
        nome: "Reflexos",
        descricao: "Reagir a adversidades e situações inesperadas. Muito utilizada por defensores para desviar chutes.",
        uso: "Defesa de chutes, reações rápidas, bloqueios."
      },
      {
        nome: "Roubo de Bola",
        descricao: "A capacidade de tirar a bola do adversário através de técnica e oportunismo.",
        uso: "Interceptações, disputa de bola, recuperação defensiva."
      }
    ]
  },
  {
    atributo: "Ego",
    cor: "oklch(0.75 0.18 60)",
    pericias: [
      {
        nome: "Presença",
        descricao: "Resiliência mental. Representa o quão bom seu personagem é em lidar com stress psicológico e pressão.",
        uso: "Resistência a intimidação, manutenção de foco, liderança."
      },
      {
        nome: "Intimidação",
        descricao: "Impor medo ou sentimento de ameaça. Teste contra Presença do alvo. Sucesso por 3+ = -2 por 2 rodadas, por 6+ = -3 por 3 rodadas, 20 natural = travado.",
        uso: "Psicologia do jogo, desestabilização de adversários."
      },
      {
        nome: "Diplomacia",
        descricao: "Persuasão e negociação. Pode anular penalidades de intimidação se o resultado for igual ou superior ao teste original.",
        uso: "Recuperação de aliados intimidados, motivação do time."
      },
      {
        nome: "Enganação",
        descricao: "Enganar adversários tanto verbalmente quanto durante o jogo. Fingir ir para um lado e ir para outro, por exemplo.",
        uso: "Dribles psicológicos, fintas, confusão tática."
      }
    ]
  }
];

export default function Pericias() {
  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="mb-4 inline-block px-3 py-1 rounded-sm" style={{ background: 'oklch(0.52 0.22 260 / 0.2)', border: '1px solid oklch(0.52 0.22 260 / 0.5)' }}>
            <span className="font-heading text-xs tracking-widest uppercase" style={{ color: 'oklch(0.75 0.15 230)' }}>Parte 1</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-white tracking-wider mb-6">PERÍCIAS</h1>
          <div className="w-16 h-1 mb-8" style={{ background: 'oklch(0.52 0.22 260)' }}></div>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            As perícias são formas específicas de usar seus atributos. Cada atributo possui uma lista de perícias que mostram diferentes competências de um mesmo atleta. Um jogador pode ter um bom valor em Passe e Técnica, mas não necessariamente ser um bom driblador.
          </p>
        </motion.div>

        <Tabs defaultValue="potencia" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 bg-transparent gap-2 h-auto p-0">
            {periciasData.map((attr) => (
              <TabsTrigger
                key={attr.atributo}
                value={attr.atributo.toLowerCase()}
                className="px-4 py-2 rounded-sm text-xs font-heading tracking-wider uppercase"
                style={{
                  background: `${attr.cor}/10`,
                  border: `1px solid ${attr.cor}/30`,
                  color: attr.cor
                }}
              >
                {attr.atributo}
              </TabsTrigger>
            ))}
          </TabsList>

          {periciasData.map((attr) => (
            <TabsContent
              key={attr.atributo}
              value={attr.atributo.toLowerCase()}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6 pb-4 border-b" style={{ borderColor: `${attr.cor}/20` }}>
                  <h2 className="font-display text-3xl" style={{ color: attr.cor }}>
                    {attr.atributo}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-2">
                    {attr.atributo === "Potência" && "Força e poder ofensivo"}
                    {attr.atributo === "Técnica" && "Finesse e controle técnico"}
                    {attr.atributo === "Velocidade" && "Mobilidade e deslocamento"}
                    {attr.atributo === "Agilidade" && "Reação e reflexos"}
                    {attr.atributo === "Ego" && "Espírito e influência mental"}
                  </p>
                </div>

                <div className="grid gap-4">
                  {attr.pericias.map((pericia, idx) => (
                    <motion.div
                      key={pericia.nome}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Card className="p-6 bl-card hover:bl-border-glow transition-all">
                        <div className="flex items-start gap-4">
                          <div
                            className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0"
                            style={{ background: `${attr.cor}/20`, color: attr.cor }}
                          >
                            <span className="font-heading font-bold text-lg">{idx + 1}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-heading text-lg font-semibold text-white mb-2">
                              {pericia.nome}
                            </h3>
                            <p className="text-muted-foreground mb-3 leading-relaxed">
                              {pericia.descricao}
                            </p>
                            <div className="flex items-start gap-2 text-sm">
                              <span className="font-heading text-xs uppercase tracking-wider" style={{ color: attr.cor }}>Uso:</span>
                              <span className="text-muted-foreground">{pericia.uso}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Regras Gerais */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t"
          style={{ borderColor: 'oklch(0.22 0.03 260)' }}
        >
          <h2 className="font-display text-3xl text-white tracking-wider mb-8">REGRAS DE PERÍCIAS</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bl-card">
              <h3 className="font-heading text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span style={{ color: 'oklch(0.52 0.22 260)' }}>▸</span>
                Testes de Perícia
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Quando um jogador tenta algo que pode falhar, o narrador pode exigir um teste. O resultado é 1d20 + modificador da perícia. Sucesso em testes acima de 10 geralmente resulta em ação bem-sucedida.
              </p>
            </Card>

            <Card className="p-6 bl-card">
              <h3 className="font-heading text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span style={{ color: 'oklch(0.52 0.22 260)' }}>▸</span>
                Perícias Relacionadas
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Cada perícia está ligada a um atributo específico. O modificador da perícia não pode exceder o valor do atributo relacionado.
              </p>
            </Card>

            <Card className="p-6 bl-card">
              <h3 className="font-heading text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span style={{ color: 'oklch(0.52 0.22 260)' }}>▸</span>
                Críticos
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Resultado 20 natural = acerto crítico com bônus adicional (geralmente +2). Resultado 1 natural = falha crítica com consequências.
              </p>
            </Card>

            <Card className="p-6 bl-card">
              <h3 className="font-heading text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span style={{ color: 'oklch(0.52 0.22 260)' }}>▸</span>
                Bônus Situacionais
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                O narrador pode conceder bônus de +1 a +3 para ações bem descritas ou criativamente executadas.
              </p>
            </Card>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
