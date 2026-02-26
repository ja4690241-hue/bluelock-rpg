import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trainings } from "@/lib/trainings";

export default function Treinamentos() {
  const categories = ["Geral", "Especializado", "Avançado"];

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
            <span className="font-heading text-xs tracking-widest uppercase" style={{ color: 'oklch(0.75 0.15 230)' }}>Parte 7</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-white tracking-wider mb-6">TREINAMENTOS</h1>
          <div className="w-16 h-1 mb-8" style={{ background: 'oklch(0.52 0.22 260)' }}></div>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Treinamentos são formas de seus personagens evoluírem além das limitações naturais de suas classes. Cada treinamento fornece bônus específicos e pode ser escolhido durante a criação ou ao longo da campanha.
          </p>
        </motion.div>

        <Tabs defaultValue="Geral" className="mb-16">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            {categories.map(cat => (
              <TabsTrigger key={cat} value={cat} className="font-heading tracking-wider uppercase text-xs">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map(cat => (
            <TabsContent key={cat} value={cat} className="grid gap-6">
              {trainings.filter(t => t.category === cat).map((treino, idx) => (
                <motion.div
                  key={treino.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className="p-6 bl-card hover:bl-border-glow transition-all">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 font-heading font-bold text-sm"
                        style={{ background: 'oklch(0.52 0.22 260 / 0.2)', color: 'oklch(0.52 0.22 260)' }}
                      >
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-lg font-semibold text-white mb-1">
                          {treino.name}
                        </h3>
                        <p className="text-muted-foreground mb-3 text-xs leading-relaxed italic">
                          {treino.description}
                        </p>
                        <div className="pt-3 border-t border-white/5">
                          <div className="flex items-start gap-2">
                            <span className="font-heading text-[10px] uppercase tracking-widest font-bold mt-1" style={{ color: 'oklch(0.52 0.22 260)' }}>Efeito:</span>
                            <span className="text-sm text-white/90 leading-relaxed">{treino.effect}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>
          ))}
        </Tabs>

        {/* Dicas para Narradores */}
        <section>
          <h2 className="font-display text-4xl text-white tracking-wider mb-8">DICAS PARA NARRADORES</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Equilíbrio de Bônus",
                content: "Bônus de condições positivas devem ser baixos (1-3) para não tornar os modificadores absurdamente altos em níveis mais altos. Reserve bônus maiores para habilidades de classe."
              },
              {
                title: "Fôlego Inicial",
                content: "Para aventuras, conceda no mínimo 12 pontos de fôlego. Narradores 'impiedosos' podem optar por valores baixos, resultando em poucos usos de habilidades durante uma partida."
              },
              {
                title: "Dribles Excessivos",
                content: "Implemente penalidades graduais para dribladores que tentam passar por todo o time: -2 após o 2° jogador, desvantagem após 3-5 jogadores, e gasto de fôlego adicional."
              },
              {
                title: "Furtividade Balanceada",
                content: "Permita formas de jogar contra jogadores furtivos para evitar repetição excessiva, mas mantenha a furtividade como arma viável — especialmente para a classe Ninja."
              },
              {
                title: "Distâncias de Chute",
                content: "Geralmente não permita chutes de 15+ pés. Se o jogador insistir, aplique penalidade severa. Penalidades são cumulativas e podem desencorajar posicionamentos ruins."
              },
              {
                title: "Reações e Interceptações",
                content: "Para passes com adversários na trajetória, gerar teste de Reflexos para interceptação é mais recomendado que aumentar DT — dá a sensação de agência aos defensores."
              }
            ].map((tip, i) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-sm"
                style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)' }}
              >
                <h3 className="font-heading text-base font-semibold text-white mb-2 flex items-center gap-2">
                  <span style={{ color: 'oklch(0.52 0.22 260)' }}>▸</span>
                  {tip.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{tip.content}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
