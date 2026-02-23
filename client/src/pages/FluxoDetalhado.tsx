import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FluxoDetalhado() {
  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="mb-4 inline-block px-3 py-1 rounded-sm" style={{ background: 'oklch(0.52 0.22 260 / 0.2)', border: '1px solid oklch(0.52 0.22 260 / 0.5)' }}>
            <span className="font-heading text-xs tracking-widest uppercase" style={{ color: 'oklch(0.75 0.15 230)' }}>Parte 9</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-white tracking-wider mb-6">O FLUXO</h1>
          <div className="w-16 h-1 mb-8" style={{ background: 'oklch(0.52 0.22 260)' }}></div>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            O Fluxo é um estado de imersão profunda e extremo nível de concentração em uma atividade. É raramente alcançado e possui diversos fatores que influenciam sua ativação. Um estado alcançável por qualquer jogador que se desafie e esteja sob situação de estresse emocional.
          </p>
        </motion.div>

        <Tabs defaultValue="conceito" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="conceito">Conceito</TabsTrigger>
            <TabsTrigger value="ativacao">Ativação</TabsTrigger>
            <TabsTrigger value="beneficios">Benefícios</TabsTrigger>
            <TabsTrigger value="duracao">Duração</TabsTrigger>
          </TabsList>

          <TabsContent value="conceito" className="space-y-6">
            <Card className="p-8 bl-card">
              <h2 className="font-display text-3xl text-white mb-6" style={{ color: 'oklch(0.52 0.22 260)' }}>O QUE É O FLUXO?</h2>
              
              <div className="space-y-6">
                <div className="border-l-4 pl-6" style={{ borderColor: 'oklch(0.52 0.22 260)' }}>
                  <h3 className="font-heading text-lg font-semibold text-white mb-2">Definição Científica</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    O Fluxo gera uma mudança nos padrões químicos e elétricos no cérebro, levando a consciência do atleta ao nível ideal. Em estado de fluxo, um jogador possui aceleração na tomada de decisões complexas através do reconhecimento de padrões e criatividade aprimorada.
                  </p>
                </div>

                <div className="border-l-4 pl-6" style={{ borderColor: 'oklch(0.52 0.22 260)' }}>
                  <h3 className="font-heading text-lg font-semibold text-white mb-2">Requisitos para Alcançar</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Alcançar o estado de Fluxo não é simplesmente se concentrar. Um jogador deve se desafiar e estar sob situação de estresse emocional para se superar. Deve estar consciente e inconscientemente buscando superar um obstáculo que o force a sair da zona de conforto.
                  </p>
                </div>

                <div className="border-l-4 pl-6" style={{ borderColor: 'oklch(0.52 0.22 260)' }}>
                  <h3 className="font-heading text-lg font-semibold text-white mb-2">Exemplos na Prática</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Qualquer jogador que evolua em um esporte chegou em seu estado de fluxo para adquirir um novo nível. É um estado alcançável por atletas de alto rendimento e em qualquer tarefa que exija concentração extrema.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="ativacao" className="space-y-6">
            <Card className="p-8 bl-card">
              <h2 className="font-display text-3xl text-white mb-6" style={{ color: 'oklch(0.52 0.22 260)' }}>COMO ATIVAR O FLUXO</h2>
              
              <div className="space-y-6">
                <div className="p-6 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.52 0.22 260 / 0.3)' }}>
                  <h3 className="font-heading text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span style={{ color: 'oklch(0.52 0.22 260)' }}>▸</span>
                    Decisão do Narrador
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    O narrador pode recompensar jogadores que estejam desempenhando um bom jogo com o estado de Fluxo sendo ativo de repente. Isso deve ser baseado em: interpretação, entendimento sobre como utilizar suas armas, noções mecânicas sobre o sistema.
                  </p>
                </div>

                <div className="p-6 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.52 0.22 260 / 0.3)' }}>
                  <h3 className="font-heading text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span style={{ color: 'oklch(0.52 0.22 260)' }}>▸</span>
                    Critérios de Ativação
                  </h3>
                  <ul className="text-muted-foreground text-sm space-y-2">
                    <li>• Jogador demonstrando excelente interpretação e criatividade</li>
                    <li>• Uso estratégico e inteligente de habilidades</li>
                    <li>• Momento de intensidade alta na partida</li>
                    <li>• Jogador superando desafios significativos</li>
                    <li>• Demonstração de domínio do sistema e tática</li>
                  </ul>
                </div>

                <div className="p-6 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.52 0.22 260 / 0.3)' }}>
                  <h3 className="font-heading text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span style={{ color: 'oklch(0.52 0.22 260)' }}>▸</span>
                    Recomendação do Narrador
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    O narrador deve comunicar claramente ao jogador que ele entrou em estado de Fluxo, descrevendo cinematicamente o momento e os efeitos que começam a se manifestar.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="beneficios" className="space-y-6">
            <Card className="p-8 bl-card">
              <h2 className="font-display text-3xl text-white mb-6" style={{ color: 'oklch(0.52 0.22 260)' }}>BENEFÍCIOS DO FLUXO</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-sm" style={{ background: 'oklch(0.52 0.22 260 / 0.1)', border: '1px solid oklch(0.52 0.22 260 / 0.3)' }}>
                  <h3 className="font-heading text-lg font-semibold text-white mb-3" style={{ color: 'oklch(0.52 0.22 260)' }}>Aumento de Perícias</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    Durante o estado de Flow o jogador possui <span className="font-semibold text-white">+5 em todas as suas perícias</span>.
                  </p>
                  <p className="text-xs text-muted-foreground">Efeito: Multiplicador geral de efetividade em todas as ações</p>
                </div>

                <div className="p-6 rounded-sm" style={{ background: 'oklch(0.52 0.22 260 / 0.1)', border: '1px solid oklch(0.52 0.22 260 / 0.3)' }}>
                  <h3 className="font-heading text-lg font-semibold text-white mb-3" style={{ color: 'oklch(0.52 0.22 260)' }}>Arma Aprendida</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    Um jogador desenvolvendo uma nova arma poderá usá-la como se já tivesse dominado, mesmo sem completar o requisito de tempo.
                  </p>
                  <p className="text-xs text-muted-foreground">Efeito: Ao fim do jogo, a habilidade é considerada aprendida sem necessidade de continuar treinando</p>
                </div>

                <div className="p-6 rounded-sm" style={{ background: 'oklch(0.52 0.22 260 / 0.1)', border: '1px solid oklch(0.52 0.22 260 / 0.3)' }}>
                  <h3 className="font-heading text-lg font-semibold text-white mb-3" style={{ color: 'oklch(0.52 0.22 260)' }}>Evolução a Novo Nível</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    <span className="font-semibold text-white">Vitória:</span> +2 pontos de evolução +1 ponto para cada gol feito
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    <span className="font-semibold text-white">Derrota:</span> +2 pontos de evolução independente de gols
                  </p>
                </div>

                <div className="p-6 rounded-sm" style={{ background: 'oklch(0.52 0.22 260 / 0.1)', border: '1px solid oklch(0.52 0.22 260 / 0.3)' }}>
                  <h3 className="font-heading text-lg font-semibold text-white mb-3" style={{ color: 'oklch(0.52 0.22 260)' }}>Recuperação Rápida</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    O jogador em estado de fluxo recupera <span className="font-semibold text-white">10 pontos de fôlego</span> assim que entra neste estado.
                  </p>
                  <p className="text-xs text-muted-foreground">Efeito: Permite uso contínuo de habilidades poderosas</p>
                </div>

                <div className="p-6 rounded-sm" style={{ background: 'oklch(0.52 0.22 260 / 0.1)', border: '1px solid oklch(0.52 0.22 260 / 0.3)' }}>
                  <h3 className="font-heading text-lg font-semibold text-white mb-3" style={{ color: 'oklch(0.52 0.22 260)' }}>Aperfeiçoamento</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    Se não estiver desenvolvendo uma arma própria, pode escolher uma habilidade da classe ou evoluir a que já possui.
                  </p>
                  <p className="text-xs text-muted-foreground">Efeito: Flexibilidade na progressão do personagem</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="duracao" className="space-y-6">
            <Card className="p-8 bl-card">
              <h2 className="font-display text-3xl text-white mb-6" style={{ color: 'oklch(0.52 0.22 260)' }}>DURAÇÃO E MANUTENÇÃO</h2>
              
              <div className="space-y-6">
                <div className="p-6 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)', border: '2px solid oklch(0.52 0.22 260)' }}>
                  <h3 className="font-heading text-lg font-semibold text-white mb-3">Duração Inicial</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    O estado de fluxo dura por <span className="font-semibold text-white">3 rodadas</span> automaticamente quando ativado.
                  </p>
                </div>

                <div className="p-6 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)', border: '2px solid oklch(0.52 0.22 260)' }}>
                  <h3 className="font-heading text-lg font-semibold text-white mb-3">Teste de Manutenção</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    Após as 3 rodadas iniciais, é necessário um <span className="font-semibold text-white">teste de Ego com dificuldade 11</span> para manter o fluxo em rodadas posteriores.
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    A dificuldade <span className="font-semibold text-white">aumenta em +3 para cada rodada posterior</span> às 3 rodadas iniciais.
                  </p>
                </div>

                <div className="p-6 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)' }}>
                  <h3 className="font-heading text-lg font-semibold text-white mb-3">Exemplo de Progressão</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Rodadas 1-3:</span>
                      <span className="font-semibold text-white">Fluxo Ativo (sem teste)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rodada 4:</span>
                      <span className="font-semibold text-white">Teste de Ego DT 11</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rodada 5:</span>
                      <span className="font-semibold text-white">Teste de Ego DT 14</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rodada 6:</span>
                      <span className="font-semibold text-white">Teste de Ego DT 17</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rodada 7+:</span>
                      <span className="font-semibold text-white">Teste de Ego DT 20+</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dicas para Narradores */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t"
          style={{ borderColor: 'oklch(0.22 0.03 260)' }}
        >
          <h2 className="font-display text-3xl text-white tracking-wider mb-8">DICAS PARA NARRADORES</h2>

          <Card className="p-8 bl-card">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-1 bg-gradient-to-b" style={{ background: 'oklch(0.52 0.22 260)' }}></div>
                <div>
                  <h3 className="font-heading text-white font-semibold mb-2">Não Abuse do Fluxo</h3>
                  <p className="text-muted-foreground text-sm">
                    O Fluxo deve ser uma recompensa rara e especial. Use-o para momentos verdadeiramente épicos e memoráveis, não em toda partida.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1 bg-gradient-to-b" style={{ background: 'oklch(0.52 0.22 260)' }}></div>
                <div>
                  <h3 className="font-heading text-white font-semibold mb-2">Comunique Claramente</h3>
                  <p className="text-muted-foreground text-sm">
                    Quando um jogador entra em Fluxo, descreva cinematicamente o momento. Explique os efeitos e deixe claro quanto tempo durará.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1 bg-gradient-to-b" style={{ background: 'oklch(0.52 0.22 260)' }}></div>
                <div>
                  <h3 className="font-heading text-white font-semibold mb-2">Valorize a Performance</h3>
                  <p className="text-muted-foreground text-sm">
                    Use o Fluxo como ferramenta para recompensar jogadores que estão realmente se esforçando, criando momentos memoráveis e jogando estrategicamente.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1 bg-gradient-to-b" style={{ background: 'oklch(0.52 0.22 260)' }}></div>
                <div>
                  <h3 className="font-heading text-white font-semibold mb-2">Balanceie com Inimigos</h3>
                  <p className="text-muted-foreground text-sm">
                    Se um jogador entra em Fluxo, considere dar oportunidades similares para adversários importantes, mantendo a tensão e dramaticidade.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}
