// Blue Lock RPG - Mecânicas Page
// Design: Manga Dynamic - Rules displayed in structured cards with examples

import { motion } from "framer-motion";
import { mechanics } from "@/lib/data";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

const sections = [
  { key: "passes", icon: "⚽", color: "oklch(0.75 0.15 230)" },
  { key: "chutes", icon: "💥", color: "oklch(0.75 0.18 25)" },
  { key: "dribles", icon: "🌀", color: "oklch(0.75 0.18 280)" },
  { key: "furtividade", icon: "👤", color: "oklch(0.65 0.18 145)" },
  { key: "flanquear", icon: "⚔️", color: "oklch(0.75 0.18 60)" },
  { key: "acoes", icon: "⏱️", color: "oklch(0.75 0.15 230)" }
];

export default function Mecanicas() {
  return (
    <div className="py-16">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="bl-tag mb-4">Parte 3</div>
          <h1 className="font-display text-6xl md:text-7xl text-white tracking-wider mb-4">
            MECÂNICAS
          </h1>
          <div className="w-24 h-0.5 mb-6" style={{ background: 'oklch(0.52 0.22 260)' }} />
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Um RPG é composto de mecânicas, diversas mecânicas. Por conta disso, algumas valem ser realçadas e devidamente explicadas. O narrador é livre para definir dificuldades maiores ou definir que algo dificulta mais ou menos uma tentativa, uma vez que o futebol possui infinitas situações imprevisíveis.
          </p>
        </motion.div>

        {/* Mechanics Sections */}
        <div className="space-y-12">
          {sections.map((section, i) => {
            const data = mechanics[section.key as keyof typeof mechanics];
            return (
              <motion.section
                key={section.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-12 h-12 rounded-sm flex items-center justify-center text-2xl"
                    style={{ background: `${section.color}/15`, border: `1px solid ${section.color}/30` }}
                  >
                    {section.icon}
                  </div>
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-white">{data.title}</h2>
                    <div className="w-16 h-0.5 mt-1" style={{ background: section.color }} />
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">{data.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.rules.map((rule, j) => (
                    <div
                      key={j}
                      className="p-4 rounded-sm"
                      style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)' }}
                    >
                      <h3 className="font-heading text-sm font-semibold text-white mb-2 flex items-center gap-2">
                        <span style={{ color: section.color }}>▸</span>
                        {rule.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{rule.content}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            );
          })}
        </div>

        {/* Additional Rules */}
        <section className="mt-16">
          <h2 className="font-display text-4xl text-white tracking-wider mb-8">REGRAS GERAIS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bl-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-5 h-5" style={{ color: 'oklch(0.65 0.18 145)' }} />
                <h3 className="font-heading text-base font-semibold text-white">Condições Positivas</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                O narrador tem o direito de dizer que uma ideia possibilita algum modificador positivo de acordo com a forma que o jogador descreve sua jogada. Bônus recomendados: <span className="font-mono-stats text-primary">+1 a +3</span>.
              </p>
            </div>

            <div className="bl-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-5 h-5" style={{ color: 'oklch(0.75 0.18 60)' }} />
                <h3 className="font-heading text-base font-semibold text-white">Fator Sorte</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Em caso de empate em testes de Chute vs Defesa, ambos rolam <span className="font-mono-stats text-primary">1d20</span> puro de sorte. Quem obtiver o melhor resultado tem sua vontade cumprida. Se os modificadores forem muito discrepantes, o narrador pode definir o vencedor diretamente.
              </p>
            </div>

            <div className="bl-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Info className="w-5 h-5" style={{ color: 'oklch(0.75 0.15 230)' }} />
                <h3 className="font-heading text-base font-semibold text-white">Bônus de Finalização</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Finalizações bem descritas, angulações bem pensadas e posicionamentos taticamente coerentes podem gerar bônus. Sugestão: <span className="font-mono-stats text-primary">+1 a +4</span>. O narrador deve dosar bem esses bônus para manter o equilíbrio.
              </p>
            </div>
          </div>
        </section>

        {/* Penalties Table */}
        <section className="mt-16">
          <h2 className="font-display text-4xl text-white tracking-wider mb-8">TABELA DE PENALIDADES</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '2px solid oklch(0.52 0.22 260 / 0.5)' }}>
                  <th className="text-left py-3 px-4 font-heading text-xs tracking-widest uppercase" style={{ color: 'oklch(0.75 0.15 230)' }}>Situação</th>
                  <th className="text-left py-3 px-4 font-heading text-xs tracking-widest uppercase" style={{ color: 'oklch(0.75 0.15 230)' }}>Penalidade</th>
                  <th className="text-left py-3 px-4 font-heading text-xs tracking-widest uppercase" style={{ color: 'oklch(0.75 0.15 230)' }}>Observação</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { situation: "Chute com perna não dominante", penalty: "Perde todos os bônus de finalização", obs: "Cumulativo com Chute Marcado" },
                  { situation: "Chute marcado (por 1 jogador)", penalty: "-3 na finalização", obs: "Cumulativo por cada marcador adicional" },
                  { situation: "Chute das laterais", penalty: "-3 na finalização", obs: "Algumas habilidades removem esta penalidade" },
                  { situation: "5-10 pés fora da área", penalty: "-4 na finalização", obs: "Penalidades são cumulativas" },
                  { situation: "15+ pés de distância", penalty: "-15 na finalização", obs: "Narrador pode não permitir" },
                  { situation: "Condição Flanqueado", penalty: "-3 em dribles e passes", obs: "Frente e atrás do jogador" },
                  { situation: "Condição Cercado", penalty: "-6 em passes e dribles", obs: "Rodeado por todos os lados" },
                  { situation: "Condição Intimidado", penalty: "-2 em Roubo/Defesa/Reflexos", obs: "Contra quem intimidou" },
                  { situation: "Drible excessivo (após 2°)", penalty: "-2 em drible", obs: "Cumulativo após cada jogador" },
                ].map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: '1px solid oklch(0.22 0.03 260 / 0.5)',
                      background: i % 2 === 0 ? 'transparent' : 'oklch(0.10 0.01 260 / 0.3)'
                    }}
                  >
                    <td className="py-3 px-4 text-white font-heading">{row.situation}</td>
                    <td className="py-3 px-4 font-mono-stats" style={{ color: 'oklch(0.75 0.18 25)' }}>{row.penalty}</td>
                    <td className="py-3 px-4 text-muted-foreground text-xs">{row.obs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bonuses Table */}
        <section className="mt-12">
          <h2 className="font-display text-4xl text-white tracking-wider mb-8">TABELA DE BÔNUS SITUACIONAIS</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '2px solid oklch(0.52 0.22 260 / 0.5)' }}>
                  <th className="text-left py-3 px-4 font-heading text-xs tracking-widest uppercase" style={{ color: 'oklch(0.75 0.15 230)' }}>Situação</th>
                  <th className="text-left py-3 px-4 font-heading text-xs tracking-widest uppercase" style={{ color: 'oklch(0.75 0.15 230)' }}>Bônus</th>
                  <th className="text-left py-3 px-4 font-heading text-xs tracking-widest uppercase" style={{ color: 'oklch(0.75 0.15 230)' }}>Observação</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { situation: "1v1 contra o goleiro", bonus: "+5 na finalização", obs: "Mesmo para jogadores com baixos modificadores" },
                  { situation: "Angulação bem pensada", bonus: "+1 a +4", obs: "A critério do narrador" },
                  { situation: "Finalização bem descrita", bonus: "+1 a +4", obs: "Dosar com cuidado em níveis altos" },
                  { situation: "Condição Convencido", bonus: "+2 para obedecer ordem", obs: "Via Diplomacia" },
                  { situation: "Passe em distância próxima", bonus: "Sem teste necessário", obs: "5-10 pés, visão limpa, sem marcação" },
                  { situation: "Ideia criativa/posicionamento", bonus: "+1 a +3", obs: "Bônus de condição positiva" },
                ].map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: '1px solid oklch(0.22 0.03 260 / 0.5)',
                      background: i % 2 === 0 ? 'transparent' : 'oklch(0.10 0.01 260 / 0.3)'
                    }}
                  >
                    <td className="py-3 px-4 text-white font-heading">{row.situation}</td>
                    <td className="py-3 px-4 font-mono-stats" style={{ color: 'oklch(0.65 0.18 145)' }}>{row.bonus}</td>
                    <td className="py-3 px-4 text-muted-foreground text-xs">{row.obs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
