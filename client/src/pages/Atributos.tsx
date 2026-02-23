import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface Atributo {
  nome: string;
  cor: string;
  descricao: string;
  proposito: string;
  exemplo: string;
  pericias: string[];
}

const atributosData: Atributo[] = [
  {
    nome: "Potência",
    cor: "oklch(0.75 0.18 25)",
    descricao: "Potência mede a força bruta do seu personagem e sua capacidade de executar finalizações devastadoras.",
    proposito: "Um jogador com altos valores em Potência geralmente é um atleta matador capaz de finalizar o lance com um chute feroz para marcar o gol.",
    exemplo: "Um finalizador clínico com Potência 8 pode executar chutes extremamente poderosos e difíceis de defender.",
    pericias: ["Corpo a Corpo", "Cabeceio", "Chute"]
  },
  {
    nome: "Técnica",
    cor: "oklch(0.75 0.15 230)",
    descricao: "Técnica demonstra a capacidade de cumprir questões que exigem finesse e precisão do seu atleta.",
    proposito: "Agrupa competências como drible, passe, movimentos acrobáticos, domínio e pontaria. Essencial para meio-campistas e jogadores mais ágeis e flexíveis.",
    exemplo: "Um playmaker com Técnica 7 pode executar passes precisos e dribles inteligentes com maestria.",
    pericias: ["Pontaria", "Domínio", "Passe"]
  },
  {
    nome: "Velocidade",
    cor: "oklch(0.65 0.18 145)",
    descricao: "Velocidade representa o quão rápido seu personagem consegue atravessar de um ponto A para um ponto B do campo.",
    proposito: "Uma competência muito útil para jogadores que pretendem auxiliar no lado ofensivo e defensivo, pois com alta mobilidade é capaz de avançar rapidamente e servir como opção de passe.",
    exemplo: "Um velocista com Velocidade 8 pode perfurar a defesa adversária em contra-ataques com facilidade.",
    pericias: ["Aceleração", "Desaceleração"]
  },
  {
    nome: "Agilidade",
    cor: "oklch(0.52 0.22 260)",
    descricao: "Agilidade engloba fatores importantes para qualquer jogador, sendo muito utilizada para demonstrar a velocidade de reação.",
    proposito: "Define a capacidade de um jogador reagir a situações que ocorram dentro do jogo. Também é usada para definir a iniciativa dentro de uma partida.",
    exemplo: "Um defensor com Agilidade 7 pode reagir rapidamente para bloquear chutes e interceptar passes.",
    pericias: ["Acrobacias", "Reflexos", "Roubo de Bola"]
  },
  {
    nome: "Ego",
    cor: "oklch(0.75 0.18 60)",
    descricao: "Ego mede o espírito do seu personagem e sua capacidade de impor ele dentro da partida.",
    proposito: "Personagens com valores altos em Ego tendem a ser bem excêntricos e se destacarem mesmo com poucas palavras ou atitudes. Jogadores com bons modificadores neste atributo são capazes de impor sua vontade.",
    exemplo: "Um imperador com Ego 9 pode dominar mentalmente adversários e impor sua vontade em cima de toda a equipe.",
    pericias: ["Presença", "Intimidação", "Diplomacia", "Enganação"]
  }
];

export default function Atributos() {
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
            <span className="font-heading text-xs tracking-widest uppercase" style={{ color: 'oklch(0.75 0.15 230)' }}>Parte 1</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-white tracking-wider mb-6">ATRIBUTOS</h1>
          <div className="w-16 h-1 mb-8" style={{ background: 'oklch(0.52 0.22 260)' }}></div>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Os atributos no sistema de Blue Lock RPG medem o número máximo que um jogador pode ter em uma perícia respectiva. Se um jogador possui Potência 6, ele pode ter uma perícia de Chute com valor máximo de +6. O conjunto de atributos mostra onde um jogador é hábil e como cada jogador pode usar sua arma para vencer os jogos.
          </p>
        </motion.div>

        <div className="grid gap-8">
          {atributosData.map((attr, idx) => (
            <motion.div
              key={attr.nome}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-8 bl-card overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5" style={{
                  background: `radial-gradient(circle, ${attr.cor}, transparent)`,
                  filter: 'blur(40px)'
                }}></div>

                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="w-16 h-16 rounded-sm flex items-center justify-center flex-shrink-0 font-display text-2xl font-bold"
                      style={{ background: `${attr.cor}/20`, color: attr.cor }}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <h2 className="font-display text-3xl text-white mb-2" style={{ color: attr.cor }}>
                        {attr.nome}
                      </h2>
                      <p className="text-muted-foreground">{attr.descricao}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="p-4 rounded-sm" style={{ background: `${attr.cor}/10`, border: `1px solid ${attr.cor}/20` }}>
                      <h3 className="font-heading text-sm tracking-wider uppercase mb-2" style={{ color: attr.cor }}>Propósito</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{attr.proposito}</p>
                    </div>

                    <div className="p-4 rounded-sm" style={{ background: `${attr.cor}/10`, border: `1px solid ${attr.cor}/20` }}>
                      <h3 className="font-heading text-sm tracking-wider uppercase mb-2" style={{ color: attr.cor }}>Exemplo</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{attr.exemplo}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-heading text-sm tracking-wider uppercase mb-3" style={{ color: attr.cor }}>Perícias Relacionadas</h3>
                    <div className="flex flex-wrap gap-2">
                      {attr.pericias.map((pericia) => (
                        <span
                          key={pericia}
                          className="px-3 py-1 rounded-sm text-xs font-heading tracking-wider uppercase"
                          style={{
                            background: `${attr.cor}/15`,
                            border: `1px solid ${attr.cor}/30`,
                            color: attr.cor
                          }}
                        >
                          {pericia}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Sistema de Fôlego */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t"
          style={{ borderColor: 'oklch(0.22 0.03 260)' }}
        >
          <div className="mb-4 inline-block px-3 py-1 rounded-sm" style={{ background: 'oklch(0.52 0.22 260 / 0.2)', border: '1px solid oklch(0.52 0.22 260 / 0.5)' }}>
            <span className="font-heading text-xs tracking-widest uppercase" style={{ color: 'oklch(0.75 0.15 230)' }}>Sistema Especial</span>
          </div>
          <h2 className="font-display text-4xl text-white tracking-wider mb-8">FÔLEGO</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bl-card">
              <div className="w-12 h-12 rounded-sm flex items-center justify-center mb-4" style={{ background: 'oklch(0.52 0.22 260 / 0.2)', color: 'oklch(0.52 0.22 260)' }}>
                <span className="font-display text-2xl">⚡</span>
              </div>
              <h3 className="font-heading text-lg font-semibold text-white mb-2">O que é</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Fôlego é importante para todos os jogadores, pois define quantos "pontos" eles possuem. Estes pontos são consumidos quando usam habilidades de suas classes.
              </p>
            </Card>

            <Card className="p-6 bl-card">
              <div className="w-12 h-12 rounded-sm flex items-center justify-center mb-4" style={{ background: 'oklch(0.52 0.22 260 / 0.2)', color: 'oklch(0.52 0.22 260)' }}>
                <span className="font-display text-2xl">🔄</span>
              </div>
              <h3 className="font-heading text-lg font-semibold text-white mb-2">Recuperação</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                O fôlego se recupera entre rodadas ou conforme determinado pelo narrador. Geralmente, um jogador recupera 1-2 pontos de fôlego por rodada de descanso.
              </p>
            </Card>

            <Card className="p-6 bl-card">
              <div className="w-12 h-12 rounded-sm flex items-center justify-center mb-4" style={{ background: 'oklch(0.52 0.22 260 / 0.2)', color: 'oklch(0.52 0.22 260)' }}>
                <span className="font-display text-2xl">💪</span>
              </div>
              <h3 className="font-heading text-lg font-semibold text-white mb-2">Uso</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Cada habilidade de classe consome uma quantidade específica de fôlego. O narrador concede no mínimo 12 pontos de fôlego para aventuras normais.
              </p>
            </Card>
          </div>
        </motion.section>

        {/* Distribuição de Atributos */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t"
          style={{ borderColor: 'oklch(0.22 0.03 260)' }}
        >
          <h2 className="font-display text-4xl text-white tracking-wider mb-8">CRIANDO SEU ATLETA</h2>

          <Card className="p-8 bl-card mb-6">
            <h3 className="font-heading text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span style={{ color: 'oklch(0.52 0.22 260)' }}>▸</span>
              Distribuição de Pontos
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Ao criar seu personagem, você distribui pontos entre os cinco atributos. A distribuição típica começa com valores entre 3 e 6 em cada atributo, dependendo da classe escolhida e do estilo de jogo desejado.
            </p>
            <div className="grid md:grid-cols-5 gap-3">
              {["Potência", "Técnica", "Velocidade", "Agilidade", "Ego"].map((attr) => (
                <div key={attr} className="p-3 rounded-sm text-center" style={{ background: 'oklch(0.12 0.015 260)' }}>
                  <div className="font-heading text-2xl text-white mb-1">3-6</div>
                  <div className="text-xs text-muted-foreground font-heading tracking-wider uppercase">{attr}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8 bl-card">
            <h3 className="font-heading text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span style={{ color: 'oklch(0.52 0.22 260)' }}>▸</span>
              Bônus de Classe
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Sua classe fornece bônus adicionais em atributos específicos. Por exemplo, um Finalizador Clínico recebe +2 em Potência, enquanto um Playmaker recebe +1 em Técnica e Agilidade. Esses bônus são adicionados aos seus valores base.
            </p>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}
