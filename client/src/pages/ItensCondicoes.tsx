import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ItensCondicoes() {
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
            <span className="font-heading text-xs tracking-widest uppercase" style={{ color: 'oklch(0.75 0.15 230)' }}>Parte 6</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-white tracking-wider mb-6">ITENS E CONDIÇÕES</h1>
          <div className="w-16 h-1 mb-8" style={{ background: 'oklch(0.52 0.22 260)' }}></div>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Neste capítulo resumimos algumas condições explicadas nas perícias e acrescentamos itens que podem apimentar qualquer campanha.
          </p>
        </motion.div>

        <Tabs defaultValue="condicoes" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="condicoes">Condições</TabsTrigger>
            <TabsTrigger value="itens">Itens</TabsTrigger>
          </TabsList>

          <TabsContent value="condicoes" className="space-y-6">
            <div className="grid gap-6">
              {[
                {
                  nome: "Intimidado",
                  descricao: "Um jogador Intimidado possui penalidades em suas ações defensivas.",
                  efeito: "-2 em Roubo De Bola, Defesa e Reflexos contra quem o intimidou",
                  duracao: "2 rodadas (pode ser estendido com sucesso crítico)",
                  como: "Teste de Intimidação bem-sucedido contra o alvo"
                },
                {
                  nome: "Convencido",
                  descricao: "Um jogador Convencido recebe bônus para cumprir uma ordem que lhe foi passada.",
                  efeito: "+2 para cumprir a ordem passada através de Diplomacia",
                  duracao: "Até o fim da rodada ou até cumprir a ordem",
                  como: "Teste de Diplomacia bem-sucedido contra o alvo"
                },
                {
                  nome: "Marcado",
                  descricao: "Um jogador Marcado recebe penalidades em seu chute enquanto está sendo marcado.",
                  efeito: "-3 em seu chute desde que esteja sendo marcado por qualquer um dos lados ou pela frente",
                  duracao: "Enquanto o marcador estiver próximo",
                  como: "Marcação defensiva ativa de um adversário"
                },
                {
                  nome: "Furtivo",
                  descricao: "Um jogador em condição Furtiva fica difícil de ser detectado em campo.",
                  efeito: "+5 em Furtividade, difícil de ser visto ou marcado",
                  duracao: "Até ser descoberto ou atacar",
                  como: "Teste de Furtividade bem-sucedido"
                },
                {
                  nome: "Flanqueado",
                  descricao: "Um jogador está flanqueado quando tem adversários na frente e atrás.",
                  efeito: "-3 em Drible e Passes",
                  duracao: "Enquanto estiver entre dois adversários",
                  como: "Posicionamento estratégico de adversários"
                },
                {
                  nome: "Cercado",
                  descricao: "Um jogador está cercado quando está rodeado por todos os lados.",
                  efeito: "-6 em Passes e Dribles",
                  duracao: "Enquanto estiver cercado",
                  como: "Múltiplos adversários ao redor"
                }
              ].map((condicao, idx) => (
                <motion.div
                  key={condicao.nome}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="p-6 bl-card">
                    <h3 className="font-display text-2xl text-white mb-2" style={{ color: 'oklch(0.52 0.22 260)' }}>
                      {condicao.nome}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm">{condicao.descricao}</p>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-3 rounded-sm" style={{ background: 'oklch(0.52 0.22 260 / 0.1)' }}>
                        <div className="font-heading text-xs uppercase tracking-wider mb-1" style={{ color: 'oklch(0.52 0.22 260)' }}>Efeito</div>
                        <div className="text-muted-foreground text-sm">{condicao.efeito}</div>
                      </div>

                      <div className="p-3 rounded-sm" style={{ background: 'oklch(0.52 0.22 260 / 0.1)' }}>
                        <div className="font-heading text-xs uppercase tracking-wider mb-1" style={{ color: 'oklch(0.52 0.22 260)' }}>Duração</div>
                        <div className="text-muted-foreground text-sm">{condicao.duracao}</div>
                      </div>

                      <div className="p-3 rounded-sm md:col-span-2" style={{ background: 'oklch(0.52 0.22 260 / 0.1)' }}>
                        <div className="font-heading text-xs uppercase tracking-wider mb-1" style={{ color: 'oklch(0.52 0.22 260)' }}>Como Aplicar</div>
                        <div className="text-muted-foreground text-sm">{condicao.como}</div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="itens" className="space-y-6">
            <Card className="p-8 bl-card">
              <h2 className="font-display text-3xl text-white mb-6" style={{ color: 'oklch(0.52 0.22 260)' }}>ITENS PARA CAMPANHAS</h2>

              <div className="space-y-6">
                <div className="border-l-4 pl-6" style={{ borderColor: 'oklch(0.52 0.22 260)' }}>
                  <h3 className="font-heading text-lg font-semibold text-white mb-2">Bola de Treino Especial</h3>
                  <p className="text-muted-foreground text-sm mb-2">Uma bola de futebol modificada que responde melhor a técnicas específicas.</p>
                  <p className="text-xs text-muted-foreground">Efeito: +2 em testes de Domínio e Passe durante treinamento</p>
                </div>

                <div className="border-l-4 pl-6" style={{ borderColor: 'oklch(0.52 0.22 260)' }}>
                  <h3 className="font-heading text-lg font-semibold text-white mb-2">Coletes de Proteção</h3>
                  <p className="text-muted-foreground text-sm mb-2">Equipamento de proteção que reduz danos de colisões.</p>
                  <p className="text-xs text-muted-foreground">Efeito: Reduz penalidades de lesão em -1</p>
                </div>

                <div className="border-l-4 pl-6" style={{ borderColor: 'oklch(0.52 0.22 260)' }}>
                  <h3 className="font-heading text-lg font-semibold text-white mb-2">Chuteiras de Velocidade</h3>
                  <p className="text-muted-foreground text-sm mb-2">Chuteiras especiais que melhoram a aceleração e velocidade.</p>
                  <p className="text-xs text-muted-foreground">Efeito: +1 em testes de Velocidade e Explosão</p>
                </div>

                <div className="border-l-4 pl-6" style={{ borderColor: 'oklch(0.52 0.22 260)' }}>
                  <h3 className="font-heading text-lg font-semibold text-white mb-2">Fita de Suporte</h3>
                  <p className="text-muted-foreground text-sm mb-2">Fita elástica que oferece suporte a articulações e músculos.</p>
                  <p className="text-xs text-muted-foreground">Efeito: Permite recuperação de 5 pontos de fôlego uma vez por partida</p>
                </div>

                <div className="border-l-4 pl-6" style={{ borderColor: 'oklch(0.52 0.22 260)' }}>
                  <h3 className="font-heading text-lg font-semibold text-white mb-2">Bebida Energética</h3>
                  <p className="text-muted-foreground text-sm mb-2">Bebida especial que aumenta resistência e foco.</p>
                  <p className="text-xs text-muted-foreground">Efeito: Recupera 8 pontos de fôlego, pode ser usada uma vez por partida</p>
                </div>

                <div className="border-l-4 pl-6" style={{ borderColor: 'oklch(0.52 0.22 260)' }}>
                  <h3 className="font-heading text-lg font-semibold text-white mb-2">Banda de Confiança</h3>
                  <p className="text-muted-foreground text-sm mb-2">Acessório que aumenta a confiança e presença do jogador.</p>
                  <p className="text-xs text-muted-foreground">Efeito: +1 em testes de Ego e Presença</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Regras de Lesão */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t"
          style={{ borderColor: 'oklch(0.22 0.03 260)' }}
        >
          <h2 className="font-display text-3xl text-white tracking-wider mb-8">LESÕES E EXPULSÃO</h2>

          <Card className="p-8 bl-card">
            <div className="space-y-6">
              <div className="p-6 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.52 0.22 260 / 0.3)' }}>
                <h3 className="font-heading text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <span style={{ color: 'oklch(0.75 0.18 25)' }}>⚠</span>
                  Lesão Grave
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  Uma ação que causa lesão grave a um adversário resulta em expulsão imediata do jogador responsável.
                </p>
                <p className="text-xs text-muted-foreground">
                  Exemplos: Chute deliberado fora da bola, empurrão violento, entrada perigosa
                </p>
              </div>

              <div className="p-6 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.52 0.22 260 / 0.3)' }}>
                <h3 className="font-heading text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <span style={{ color: 'oklch(0.75 0.18 25)' }}>🚫</span>
                  Expulsão
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  O jogador expulso não pode mais participar da partida e seu time fica com um jogador a menos.
                </p>
                <p className="text-xs text-muted-foreground">
                  A expulsão é permanente até o fim da partida, exceto se o narrador permitir substituição
                </p>
              </div>

              <div className="p-6 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.52 0.22 260 / 0.3)' }}>
                <h3 className="font-heading text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <span style={{ color: 'oklch(0.75 0.15 230)' }}>💙</span>
                  Recuperação de Lesão
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Jogadores com lesões graves podem precisar de tempo de recuperação fora de campo antes de poderem jogar novamente em campanhas futuras.
                </p>
              </div>
            </div>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}
