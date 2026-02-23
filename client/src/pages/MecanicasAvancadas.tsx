import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface Mecanica {
  nome: string;
  descricao: string;
  como: string;
  bonus: string;
}

const mecanicasData: Mecanica[] = [
  {
    nome: "Analisar um Adversário",
    descricao: "Analisar um único adversário em específico pode não parecer vantajoso à primeira vista, entretanto, jogadores mais criativos podem usufruir disso de diversas formas.",
    como: "Para analisar um jogador, um personagem deve rolar um teste de Intuição para analisar um jogador importante do outro time e se tiver sucesso em um teste de DT 20.",
    bonus: "+1 em Roubo De Bola, Defesa e Drible contra o jogador que escolheu analisar"
  },
  {
    nome: "Analisar Marcação Adversária",
    descricao: "Analisar uma marcação é uma ideia para defensores principalmente, uma vez que, sendo bem sucedido em um teste de Intuição com mesma DT 20.",
    como: "Defensores ganham bônus especiais quando analisam a marcação adversária com sucesso em teste de Intuição.",
    bonus: "Quando o goleiro defende um chute e passa a bola para qualquer jogador antes do meio do campo, este jogador possui +3 em seus testes de passe"
  },
  {
    nome: "Precognição",
    descricao: "Além de rodar os 4d20 e levá-los ao pé da letra, agora você pode reorganizar a ordem deles.",
    como: "Se os resultados foram: 1, 15, 5 e 20, o jogador pode optar por colocar da seguinte forma: 20, 15, 5 e 1. Agora devendo ser essa ordem a obedecida.",
    bonus: "Reorganiza completamente a ordem dos 4d20 conforme desejado"
  },
  {
    nome: "Meta Visão",
    descricao: "Habilidades de Meta Visão não podem ser escolhidas por classes que já possuam Meta Visão em seu kit de habilidades.",
    como: "Personagens com Meta Visão conseguem enxergar o campo de forma diferente, prevendo movimentos e criando oportunidades.",
    bonus: "Varia conforme a habilidade específica de Meta Visão escolhida"
  }
];

export default function MecanicasAvancadas() {
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
            <span className="font-heading text-xs tracking-widest uppercase" style={{ color: 'oklch(0.75 0.15 230)' }}>Parte 8</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-white tracking-wider mb-6">MECÂNICAS AVANÇADAS</h1>
          <div className="w-16 h-1 mb-8" style={{ background: 'oklch(0.52 0.22 260)' }}></div>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Aqui estão mecânicas avançadas que buscam auxiliar ainda mais os narradores e dar mais suporte para que as campanhas fluam com mais agilidade, mais diversão e que valorize a interpretação mas também conceda bônus mecânicos para aqueles "combeiros" de plantão.
          </p>
        </motion.div>

        <div className="grid gap-8">
          {mecanicasData.map((mecanica, idx) => (
            <motion.div
              key={mecanica.nome}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-8 bl-card overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5" style={{
                  background: `radial-gradient(circle, oklch(0.52 0.22 260), transparent)`,
                  filter: 'blur(40px)'
                }}></div>

                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="w-16 h-16 rounded-sm flex items-center justify-center flex-shrink-0 font-display text-2xl font-bold"
                      style={{ background: 'oklch(0.52 0.22 260 / 0.2)', color: 'oklch(0.52 0.22 260)' }}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <h2 className="font-display text-3xl text-white mb-2" style={{ color: 'oklch(0.52 0.22 260)' }}>
                        {mecanica.nome}
                      </h2>
                      <p className="text-muted-foreground">{mecanica.descricao}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 rounded-sm" style={{ background: 'oklch(0.52 0.22 260 / 0.1)', border: '1px solid oklch(0.52 0.22 260 / 0.2)' }}>
                      <h3 className="font-heading text-sm tracking-wider uppercase mb-2" style={{ color: 'oklch(0.52 0.22 260)' }}>Como Funciona</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{mecanica.como}</p>
                    </div>

                    <div className="p-4 rounded-sm" style={{ background: 'oklch(0.52 0.22 260 / 0.1)', border: '1px solid oklch(0.52 0.22 260 / 0.2)' }}>
                      <h3 className="font-heading text-sm tracking-wider uppercase mb-2" style={{ color: 'oklch(0.52 0.22 260)' }}>Bônus</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{mecanica.bonus}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Análise de Adversário Detalhada */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t"
          style={{ borderColor: 'oklch(0.22 0.03 260)' }}
        >
          <h2 className="font-display text-4xl text-white tracking-wider mb-8">ANÁLISE DE ADVERSÁRIO - FORMAS CRIATIVAS</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bl-card">
              <h3 className="font-heading text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span style={{ color: 'oklch(0.52 0.22 260)' }}>▸</span>
                Análise Direta
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Teste de Intuição contra DT 20. Se bem-sucedido, ganhe +1 em Roubo De Bola, Defesa e Drible contra o jogador analisado.
              </p>
            </Card>

            <Card className="p-6 bl-card">
              <h3 className="font-heading text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span style={{ color: 'oklch(0.52 0.22 260)' }}>▸</span>
                Análise por Vídeo
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Um Atacante Completo que passe ao menos 8 horas analisando um jogo adversário pode copiar uma habilidade vista na gravação sem necessidade de teste.
              </p>
            </Card>

            <Card className="p-6 bl-card">
              <h3 className="font-heading text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span style={{ color: 'oklch(0.52 0.22 260)' }}>▸</span>
                Análise de Time
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Analise um time inteiro para ganhar bônus gerais. Diferentes formas de análise podem ser combinadas para máxima efetividade.
              </p>
            </Card>

            <Card className="p-6 bl-card">
              <h3 className="font-heading text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span style={{ color: 'oklch(0.52 0.22 260)' }}>▸</span>
                Análise Tática
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Estude o padrão de jogo adversário para antecipar movimentos e ganhar vantagem estratégica durante a partida.
              </p>
            </Card>
          </div>
        </motion.section>

        {/* Regras de Balanceamento */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t"
          style={{ borderColor: 'oklch(0.22 0.03 260)' }}
        >
          <h2 className="font-display text-4xl text-white tracking-wider mb-8">RECOMENDAÇÕES PARA NARRADORES</h2>

          <Card className="p-8 bl-card">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-1 bg-gradient-to-b" style={{ background: 'oklch(0.52 0.22 260)' }}></div>
                <div>
                  <h3 className="font-heading text-white font-semibold mb-2">Não Combine Todas as Formas</h3>
                  <p className="text-muted-foreground text-sm">
                    Recomenda-se que pelo menos uma forma de análise seja seguida, mas não todas de uma vez para evitar um jogador/time com muitos bônus contra outro time de maneira "desleal".
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1 bg-gradient-to-b" style={{ background: 'oklch(0.52 0.22 260)' }}></div>
                <div>
                  <h3 className="font-heading text-white font-semibold mb-2">Mecânicas Avançadas para Jogadores Experientes</h3>
                  <p className="text-muted-foreground text-sm">
                    Estas mecânicas são especialmente recomendadas para jogadores em níveis intermediários/avançados e narradores neste mesmo estágio, pois é necessária muita conversa para que essas mecânicas se apliquem de maneira agradável.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1 bg-gradient-to-b" style={{ background: 'oklch(0.52 0.22 260)' }}></div>
                <div>
                  <h3 className="font-heading text-white font-semibold mb-2">Valorize a Criatividade</h3>
                  <p className="text-muted-foreground text-sm">
                    Mecanismo é sempre bem-vindo em um RPG e deve ser valorizada por todos. Use essas regras avançadas para apimentar a competitividade que flui em Blue Lock.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1 bg-gradient-to-b" style={{ background: 'oklch(0.52 0.22 260)' }}></div>
                <div>
                  <h3 className="font-heading text-white font-semibold mb-2">Restrições de Habilidades</h3>
                  <p className="text-muted-foreground text-sm">
                    Habilidades de Meta Visão não podem ser escolhidas por classes que já possuam Meta Visão em seu kit. Percepção Espacial não pode ser adquirida por personagens de classes que já possuem Percepção Espacial.
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
