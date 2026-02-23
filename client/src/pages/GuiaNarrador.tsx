import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GuiaNarrador() {
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
            <span className="font-heading text-xs tracking-widest uppercase" style={{ color: 'oklch(0.75 0.15 230)' }}>Parte 7</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-white tracking-wider mb-6">GUIA DO NARRADOR</h1>
          <div className="w-16 h-1 mb-8" style={{ background: 'oklch(0.52 0.22 260)' }}></div>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Dicas e recomendações para narradores prepararem e conduzirem campanhas memoráveis de Blue Lock RPG.
          </p>
        </motion.div>

        <Tabs defaultValue="preparacao" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="preparacao">Preparação</TabsTrigger>
            <TabsTrigger value="ambiente">Ambiente</TabsTrigger>
            <TabsTrigger value="npcs">NPCs</TabsTrigger>
            <TabsTrigger value="dicas">Dicas</TabsTrigger>
          </TabsList>

          <TabsContent value="preparacao" className="space-y-6">
            <Card className="p-8 bl-card">
              <h2 className="font-display text-3xl text-white mb-6" style={{ color: 'oklch(0.52 0.22 260)' }}>PREPARANDO UMA SESSÃO</h2>
              
              <div className="space-y-6">
                <div className="p-6 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.52 0.22 260 / 0.3)' }}>
                  <h3 className="font-heading text-lg font-semibold text-white mb-3">1. Estrutura da Partida</h3>
                  <ul className="text-muted-foreground text-sm space-y-2">
                    <li>• <span className="font-semibold">Pré-partida:</span> Apresentação dos times, clima e contexto</li>
                    <li>• <span className="font-semibold">Início:</span> Toque de saída, primeiras ações dos jogadores</li>
                    <li>• <span className="font-semibold">Desenvolvimento:</span> Fluxo natural do jogo, ações e reações</li>
                    <li>• <span className="font-semibold">Clímax:</span> Momento de maior tensão e importância</li>
                    <li>• <span className="font-semibold">Encerramento:</span> Resultado final e reflexão</li>
                  </ul>
                </div>

                <div className="p-6 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.52 0.22 260 / 0.3)' }}>
                  <h3 className="font-heading text-lg font-semibold text-white mb-3">2. Materiais Necessários</h3>
                  <ul className="text-muted-foreground text-sm space-y-2">
                    <li>• Livro de regras (este!) para consultas rápidas</li>
                    <li>• Fichas dos NPCs e adversários preparadas</li>
                    <li>• Dados (d20, d15, d12, d6 conforme necessário)</li>
                    <li>• Mapa ou descrição do campo de jogo</li>
                    <li>• Notas sobre objetivos e eventos-chave</li>
                  </ul>
                </div>

                <div className="p-6 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.52 0.22 260 / 0.3)' }}>
                  <h3 className="font-heading text-lg font-semibold text-white mb-3">3. Tempo de Preparação</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    O tempo de preparação é muito individual e depende de:
                  </p>
                  <ul className="text-muted-foreground text-sm space-y-1">
                    <li>• Seu foco e velocidade de leitura</li>
                    <li>• Ambiente onde você prepara</li>
                    <li>• Sua metodologia de escrita e organização</li>
                    <li>• Experiência prévia com o sistema</li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-3">
                    Cada narrador é livre para adaptar sua campanha conforme sua vontade. Não há tempo "correto" de preparação.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="ambiente" className="space-y-6">
            <Card className="p-8 bl-card">
              <h2 className="font-display text-3xl text-white mb-6" style={{ color: 'oklch(0.52 0.22 260)' }}>CRIANDO O AMBIENTE</h2>
              
              <div className="space-y-6">
                <div className="border-l-4 pl-6" style={{ borderColor: 'oklch(0.52 0.22 260)' }}>
                  <h3 className="font-heading text-lg font-semibold text-white mb-2">Música e Sonoridade</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    A música é extremamente bem-vinda em uma sessão. Considere preparar:
                  </p>
                  <ul className="text-muted-foreground text-sm space-y-2">
                    <li>• Música para momentos pré-partida (aquecimento)</li>
                    <li>• Música para o início da partida (tensão)</li>
                    <li>• Música para o clímax (intensidade máxima)</li>
                    <li>• Música para momentos de ação específicos</li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-3">
                    Dica: Tenha um auxiliar ou jogador cuidando das músicas para melhor execução
                  </p>
                </div>

                <div className="border-l-4 pl-6" style={{ borderColor: 'oklch(0.52 0.22 260)' }}>
                  <h3 className="font-heading text-lg font-semibold text-white mb-2">Descrição do Campo</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Descreva o estádio, o clima, a torcida e a atmosfera. Isso cria imersão e deixa claro o contexto da partida. Mencione detalhes como condições do tempo, estado do gramado e energia da multidão.
                  </p>
                </div>

                <div className="border-l-4 pl-6" style={{ borderColor: 'oklch(0.52 0.22 260)' }}>
                  <h3 className="font-heading text-lg font-semibold text-white mb-2">Clima Emocional</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Transmita a intensidade e importância da partida através de sua narração. Use pausas dramáticas, variação de tom de voz e descrições vívidas para manter a tensão.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="npcs" className="space-y-6">
            <Card className="p-8 bl-card">
              <h2 className="font-display text-3xl text-white mb-6" style={{ color: 'oklch(0.52 0.22 260)' }}>CRIANDO NPCs MEMORÁVEIS</h2>
              
              <div className="space-y-6">
                <div className="p-6 rounded-sm" style={{ background: 'oklch(0.52 0.22 260 / 0.1)', border: '1px solid oklch(0.52 0.22 260 / 0.3)' }}>
                  <h3 className="font-heading text-lg font-semibold text-white mb-3">A Relevância de um NPC</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    Um NPC relevante deve ter:
                  </p>
                  <ul className="text-muted-foreground text-sm space-y-2">
                    <li>• <span className="font-semibold">Objetivo claro:</span> O que ele quer na partida?</li>
                    <li>• <span className="font-semibold">Personalidade:</span> Como ele age e fala?</li>
                    <li>• <span className="font-semibold">Habilidades:</span> Qual é seu estilo de jogo?</li>
                    <li>• <span className="font-semibold">Relacionamento:</span> Como ele se relaciona com os jogadores?</li>
                    <li>• <span className="font-semibold">Motivação:</span> Por que ele joga?</li>
                  </ul>
                </div>

                <div className="p-6 rounded-sm" style={{ background: 'oklch(0.52 0.22 260 / 0.1)', border: '1px solid oklch(0.52 0.22 260 / 0.3)' }}>
                  <h3 className="font-heading text-lg font-semibold text-white mb-3">Tipos de NPCs</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold text-white">NPC Aliado:</span>
                      <p className="text-muted-foreground text-sm">Companheiro de time, oferece suporte e sincronização</p>
                    </div>
                    <div>
                      <span className="font-semibold text-white">NPC Adversário:</span>
                      <p className="text-muted-foreground text-sm">Rival interessante com motivações próprias</p>
                    </div>
                    <div>
                      <span className="font-semibold text-white">NPC Chave:</span>
                      <p className="text-muted-foreground text-sm">Personagem importante para a narrativa e campanha</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="dicas" className="space-y-6">
            <Card className="p-8 bl-card">
              <h2 className="font-display text-3xl text-white mb-6" style={{ color: 'oklch(0.52 0.22 260)' }}>DICAS GERAIS</h2>
              
              <div className="space-y-4">
                {[
                  {
                    titulo: "Diversão em Primeiro Lugar",
                    descricao: "Lembre-se que a diversão é o objetivo principal. Adapte as regras conforme necessário para manter a diversão e engajamento dos jogadores."
                  },
                  {
                    titulo: "Equilibre Desafio e Vitória",
                    descricao: "Crie adversários e situações desafiadoras, mas permita que os jogadores tenham oportunidades reais de sucesso e momentos de glória."
                  },
                  {
                    titulo: "Recompense Criatividade",
                    descricao: "Quando um jogador faz algo criativo ou inesperado, recompense-o com bônus ou oportunidades. Isso incentiva pensamento estratégico."
                  },
                  {
                    titulo: "Mantenha o Ritmo",
                    descricao: "Evite pausas muito longas. Mantenha a ação fluindo e a tensão presente durante toda a partida."
                  },
                  {
                    titulo: "Ouça seus Jogadores",
                    descricao: "Esteja atento ao que seus jogadores estão curtindo e ajuste a campanha para oferecer mais daquilo que os engaja."
                  },
                  {
                    titulo: "Prepare Contingências",
                    descricao: "Os jogadores sempre fazem algo inesperado. Tenha planos alternativos e esteja pronto para improvisar."
                  },
                  {
                    titulo: "Celebre Momentos Épicos",
                    descricao: "Quando algo épico acontece, pause para celebrar. Descreva cinematicamente e deixe o momento ser memorável."
                  },
                  {
                    titulo: "Aprenda com Cada Sessão",
                    descricao: "Após cada partida, reflita sobre o que funcionou e o que não funcionou. Use isso para melhorar futuras sessões."
                  }
                ].map((dica, idx) => (
                  <motion.div
                    key={dica.titulo}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex gap-4 p-4 rounded-sm"
                    style={{ background: 'oklch(0.12 0.015 260)' }}
                  >
                    <div className="w-1 flex-shrink-0" style={{ background: 'oklch(0.52 0.22 260)' }}></div>
                    <div>
                      <h3 className="font-heading text-white font-semibold mb-1">{dica.titulo}</h3>
                      <p className="text-muted-foreground text-sm">{dica.descricao}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
