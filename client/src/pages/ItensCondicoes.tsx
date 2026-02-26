import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cloud, Sun, Wind, Thermometer, Eye, Snowflake, CloudRain } from "lucide-react";

export default function ItensCondicoes() {
  const condicoesJogador = [
    {
      nome: "Intimidado",
      descricao: "Um jogador Intimidado possui penalidades em suas ações defensivas.",
      efeito: "-2 em Roubo De Bola, Defesa ou Reflexos contra quem o intimidou",
      duracao: "2 rodadas (pode aumentar com sucesso crítico)",
      como: "Teste de Intimidação vs Presença do alvo"
    },
    {
      nome: "Convencido",
      descricao: "Um jogador Convencido recebe bônus para cumprir uma ordem que lhe foi passada.",
      efeito: "+2 para cumprir a ordem passada através de Diplomacia",
      duracao: "Até cumprir a ordem",
      como: "Teste de Diplomacia bem-sucedido"
    },
    {
      nome: "Marcado",
      descricao: "Um jogador Marcado recebe penalidades em seu chute enquanto está sendo marcado.",
      efeito: "-3 na finalização (cumulativo por marcador)",
      duracao: "Enquanto estiver sendo marcado a 5 pés ou menos",
      como: "Estar na linha de visão e ângulos de chute do atacante"
    },
    {
      nome: "Furtivo",
      descricao: "Um jogador em condição Furtiva fica difícil de ser detectado em campo.",
      efeito: "Bônus flutuante (+1 a +4) em ações surpresa",
      duracao: "Até agir (perde por 2 rodadas após agir)",
      como: "Teste de Furtividade bem-sucedido"
    },
    {
      nome: "Flanqueado",
      descricao: "Um jogador está flanqueado quando tem adversários na frente e atrás.",
      efeito: "-3 em Drible e Passes",
      duracao: "Enquanto estiver entre dois adversários",
      como: "Um jogador na frente e outro atrás do alvo"
    },
    {
      nome: "Cercado",
      descricao: "Um jogador está cercado quando está rodeado por todos os lados.",
      efeito: "-6 em Passes e Dribles",
      duracao: "Enquanto estiver cercado",
      como: "Rodeado por todos os lados por adversários"
    }
  ];

  const condicoesCampo = [
    {
      nome: "Ensolarado",
      icone: "☀️",
      descricao: "Campo em condições ideais. Nenhum efeito negativo.",
      efeito: "Nenhuma penalidade. Condição padrão de jogo.",
      cor: "oklch(0.75 0.18 60)"
    },
    {
      nome: "Chuva",
      icone: "🌧️",
      descricao: "Campo molhado e escorregadio. Afeta precisão e movimentação.",
      efeito: "Reduz precisão de passes e chutes. Chance de escorregões (teste de Acrobacia DT 12 ao correr).",
      cor: "oklch(0.52 0.22 260)"
    },
    {
      nome: "Neve",
      icone: "❄️",
      descricao: "Campo coberto de neve. Movimentação prejudicada.",
      efeito: "Reduz velocidade de movimento em 5 pés. Aumenta custo de fôlego em 1 por ação de movimento.",
      cor: "oklch(0.85 0.05 230)"
    },
    {
      nome: "Neblina",
      icone: "🌫️",
      descricao: "Visibilidade reduzida. Dificulta leitura de jogo.",
      efeito: "Reduz percepção e visão de jogo. -2 em Intuição e testes de leitura de jogadas.",
      cor: "oklch(0.65 0.05 260)"
    },
    {
      nome: "Ventania",
      icone: "💨",
      descricao: "Vento forte que interfere na trajetória da bola.",
      efeito: "Pode alterar trajetória da bola. -2 em passes longos e chutes de longa distância.",
      cor: "oklch(0.75 0.15 160)"
    },
    {
      nome: "Calor Intenso",
      icone: "🌡️",
      descricao: "Temperatura elevada que acelera o cansaço.",
      efeito: "Fôlego reduz mais rapidamente. Perde +1 de fôlego adicional por rodada de ação intensa.",
      cor: "oklch(0.75 0.18 25)"
    },
    {
      nome: "Frio Extremo",
      icone: "🥶",
      descricao: "Temperatura muito baixa que compromete o desempenho físico.",
      efeito: "Reduz desempenho físico geral. -1 em Velocidade e Agilidade durante toda a partida.",
      cor: "oklch(0.65 0.15 230)"
    }
  ];

  const itensPDF = [
    {
      nome: "Chuteira Profissional",
      efeito: "+2 Velocidade. Ignora penalidade leve de campo molhado.",
      tipo: "Equipamento"
    },
    {
      nome: "Munhequeira de Foco",
      efeito: "+2 Concentração. -1 penalidade mental.",
      tipo: "Acessório"
    },
    {
      nome: "Faixa de Capitão",
      efeito: "+1 Trabalho em Equipe. Aliados +1 Moral.",
      tipo: "Acessório"
    },
    {
      nome: "Garrafa Térmica Energética",
      efeito: "Recupera +10 Stamina. Uso único.",
      tipo: "Consumível"
    },
    {
      nome: "Joelheira Reforçada",
      efeito: "-2 dano físico. +1 Resistência contra faltas.",
      tipo: "Equipamento"
    },
    {
      nome: "Óculos de Visão Tática",
      efeito: "+2 Percepção. +1 leitura de jogadas.",
      tipo: "Acessório"
    },
    {
      nome: "Bandagem de Recuperação",
      efeito: "Recupera +5 HP após partida.",
      tipo: "Consumível"
    },
    {
      nome: "Caneleira Especial",
      efeito: "-1 dano de impacto. +1 contra jogadas físicas.",
      tipo: "Equipamento"
    },
    {
      nome: "Apito Tático",
      efeito: "Reorganização tática 1x por partida.",
      tipo: "Especial"
    },
    {
      nome: "Kit Médico Portátil",
      efeito: "Recupera +15 HP. Uso único.",
      tipo: "Consumível"
    }
  ];

  const itensCampanha = [
    {
      nome: "Bola de Treino Especial",
      descricao: "Uma bola de futebol modificada que responde melhor a técnicas específicas.",
      efeito: "+2 em testes de Domínio e Passe durante treinamento",
      tipo: "Equipamento"
    },
    {
      nome: "Coletes de Proteção",
      descricao: "Equipamento de proteção que reduz danos de colisões.",
      efeito: "Reduz penalidades de lesão em -1",
      tipo: "Equipamento"
    },
    {
      nome: "Chuteiras de Velocidade",
      descricao: "Chuteiras especiais que melhoram a aceleração e velocidade.",
      efeito: "+1 em testes de Velocidade e Explosão",
      tipo: "Equipamento"
    },
    {
      nome: "Fita de Suporte",
      descricao: "Fita elástica que oferece suporte a articulações e músculos.",
      efeito: "Permite recuperação de 5 pontos de fôlego uma vez por partida",
      tipo: "Consumível"
    },
    {
      nome: "Bebida Energética",
      descricao: "Bebida especial que aumenta resistência e foco.",
      efeito: "Recupera 8 pontos de fôlego, pode ser usada uma vez por partida",
      tipo: "Consumível"
    },
    {
      nome: "Banda de Confiança",
      descricao: "Acessório que aumenta a confiança e presença do jogador.",
      efeito: "+1 em testes de Ego e Presença",
      tipo: "Acessório"
    }
  ];

  const tipoCorMap: Record<string, string> = {
    "Equipamento": "oklch(0.52 0.22 260)",
    "Acessório": "oklch(0.75 0.15 230)",
    "Consumível": "oklch(0.75 0.18 160)",
    "Especial": "oklch(0.75 0.18 60)"
  };

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
            Neste capítulo resumimos condições de jogadores, condições climáticas do campo e acrescentamos itens que podem apimentar qualquer campanha.
          </p>
        </motion.div>

        <Tabs defaultValue="condicoes-jogador" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="condicoes-jogador">Condições</TabsTrigger>
            <TabsTrigger value="condicoes-campo">Campo</TabsTrigger>
            <TabsTrigger value="itens">Itens</TabsTrigger>
          </TabsList>

          {/* Aba: Condições de Jogador */}
          <TabsContent value="condicoes-jogador" className="space-y-6">
            <div className="grid gap-6">
              {condicoesJogador.map((condicao, idx) => (
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

          {/* Aba: Condições do Campo */}
          <TabsContent value="condicoes-campo" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-sm mb-6"
              style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.52 0.22 260 / 0.3)' }}
            >
              <p className="text-sm text-muted-foreground leading-relaxed">
                As condições climáticas do campo afetam todos os jogadores igualmente durante a partida. O narrador define a condição antes do início da partida ou pode alterá-la durante o jogo para criar situações dramáticas.
              </p>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2">
              {condicoesCampo.map((condicao, idx) => (
                <motion.div
                  key={condicao.nome}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <Card className="p-5 bl-card h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{condicao.icone}</span>
                      <h3 className="font-display text-xl text-white" style={{ color: condicao.cor }}>
                        {condicao.nome}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{condicao.descricao}</p>
                    <div className="p-3 rounded-sm" style={{ background: 'oklch(0.52 0.22 260 / 0.1)' }}>
                      <div className="font-heading text-xs uppercase tracking-wider mb-1" style={{ color: 'oklch(0.52 0.22 260)' }}>Efeito</div>
                      <div className="text-muted-foreground text-sm">{condicao.efeito}</div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Aba: Itens */}
          <TabsContent value="itens" className="space-y-8">
            {/* Itens do PDF */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="font-display text-3xl text-white tracking-wider" style={{ color: 'oklch(0.52 0.22 260)' }}>ITENS & BÔNUS</h2>
                <div className="flex-1 h-px bg-border/50" />
              </div>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                Equipamentos e itens especiais que concedem bônus mecânicos durante as partidas.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {itensPDF.map((item, idx) => (
                  <motion.div
                    key={item.nome}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Card className="p-5 bl-card h-full hover:bl-border-glow transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-heading text-base font-semibold text-white">{item.nome}</h3>
                        <span
                          className="text-[10px] font-heading uppercase tracking-widest px-2 py-0.5 rounded-sm"
                          style={{ background: `${tipoCorMap[item.tipo] || 'oklch(0.52 0.22 260)'} / 0.15`, color: tipoCorMap[item.tipo] || 'oklch(0.52 0.22 260)', border: `1px solid ${tipoCorMap[item.tipo] || 'oklch(0.52 0.22 260)'} / 0.3` }}
                        >
                          {item.tipo}
                        </span>
                      </div>
                      <div className="p-3 rounded-sm" style={{ background: 'oklch(0.52 0.22 260 / 0.1)' }}>
                        <span className="font-heading text-[10px] uppercase tracking-widest font-bold mr-2" style={{ color: 'oklch(0.52 0.22 260)' }}>Efeito:</span>
                        <span className="text-sm text-white/90">{item.efeito}</span>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Itens de Campanha */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="font-display text-3xl text-white tracking-wider" style={{ color: 'oklch(0.52 0.22 260)' }}>ITENS PARA CAMPANHAS</h2>
                <div className="flex-1 h-px bg-border/50" />
              </div>
              <div className="space-y-4">
                {itensCampanha.map((item, idx) => (
                  <motion.div
                    key={item.nome}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    className="border-l-4 pl-6 py-2"
                    style={{ borderColor: 'oklch(0.52 0.22 260)' }}
                  >
                    <h3 className="font-heading text-lg font-semibold text-white mb-1">{item.nome}</h3>
                    <p className="text-muted-foreground text-sm mb-1">{item.descricao}</p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-bold" style={{ color: 'oklch(0.52 0.22 260)' }}>Efeito: </span>
                      {item.efeito}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
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
