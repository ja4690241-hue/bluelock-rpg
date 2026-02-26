import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { trainings } from "@/lib/trainings";
import { Filter } from "lucide-react";

const categoryColors: Record<string, string> = {
  "Geral": "oklch(0.52 0.22 260)",
  "Especializado": "oklch(0.75 0.18 60)",
  "Avançado": "oklch(0.58 0.22 25)"
};

export default function Treinamentos() {
  const [selectedCategory, setSelectedCategory] = useState<"Todos" | "Geral" | "Especializado" | "Avançado">("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTrainings = trainings.filter(training => {
    const matchesCategory = selectedCategory === "Todos" || training.category === selectedCategory;
    const matchesSearch = training.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-16">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="bl-tag mb-4">Parte 7</div>
          <h1 className="font-display text-6xl md:text-7xl text-white tracking-wider mb-4">
            TREINAMENTOS
          </h1>
          <div className="w-24 h-0.5 mb-6" style={{ background: 'oklch(0.52 0.22 260)' }} />
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Treinamentos são formas de seus personagens evoluírem além das limitações naturais de suas classes. Cada treinamento fornece bônus específicos e pode ser escolhido durante a criação ou ao longo da campanha. Máximo de 3 treinamentos por personagem.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Buscar treinamento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 rounded-sm text-sm font-heading tracking-wider placeholder-muted-foreground focus:outline-none transition-colors"
              style={{
                background: 'oklch(0.12 0.015 260)',
                border: '1px solid oklch(0.22 0.03 260)',
                color: 'oklch(0.94 0.01 220)'
              }}
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            {["Todos", "Geral", "Especializado", "Avançado"].map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category as any)}
                className="px-3 py-1.5 text-xs font-heading tracking-wider uppercase rounded-sm transition-all duration-200"
                style={{
                  background: selectedCategory === category ? 'oklch(0.52 0.22 260)' : 'oklch(0.12 0.015 260)',
                  color: selectedCategory === category ? 'white' : 'oklch(0.6 0.02 260)',
                  border: `1px solid ${selectedCategory === category ? 'oklch(0.52 0.22 260)' : 'oklch(0.22 0.03 260)'}`
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Trainings count */}
        <p className="text-xs text-muted-foreground font-heading tracking-wider mb-6">
          {filteredTrainings.length} {filteredTrainings.length === 1 ? 'treinamento encontrado' : 'treinamentos encontrados'}
        </p>

        {/* Trainings Grid */}
        <div className="space-y-4 max-w-7xl">
          {filteredTrainings.map((training, i) => (
            <motion.div
              key={training.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="p-6 bl-card overflow-hidden hover:border-primary/50 transition-all">
                <div className="flex items-start gap-4">
                  {/* Category Badge */}
                  <div
                    className="w-12 h-12 rounded-sm flex items-center justify-center flex-shrink-0 font-heading font-bold text-lg"
                    style={{
                      background: `${categoryColors[training.category]}/20`,
                      color: categoryColors[training.category],
                      border: `1px solid ${categoryColors[training.category]}/30`
                    }}
                  >
                    {training.category[0]}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h2 className="font-heading text-xl font-bold text-white">{training.name}</h2>
                        <p className="text-sm text-muted-foreground font-heading tracking-wider">{training.category}</p>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{training.description}</p>

                    {/* Effect */}
                    <div className="p-3 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)' }}>
                      <p className="text-xs font-heading tracking-widest uppercase text-muted-foreground mb-1">Efeito</p>
                      <p className="text-sm text-white leading-relaxed">{training.effect}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTrainings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum treinamento encontrado com os filtros selecionados.</p>
          </div>
        )}

        {/* Tips Section */}
        <section className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-display text-4xl md:text-5xl text-white tracking-wider mb-4">
              DICAS PARA NARRADORES
            </h2>
            <div className="w-16 h-0.5" style={{ background: 'oklch(0.52 0.22 260)' }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Limite de Treinamentos",
                content: "Cada personagem pode escolher no máximo 3 treinamentos. Isso garante que nenhum jogador fique excessivamente poderoso."
              },
              {
                title: "Treinamentos Avançados",
                content: "Habilidades Avançadas (Meta Visão e Percepção Espacial) não podem ser escolhidas por classes que já possuam essas habilidades em seu kit."
              },
              {
                title: "Progressão em Campanha",
                content: "Permita que jogadores ganhem novos treinamentos ao atingir marcos importantes na campanha, recompensando desenvolvimento de personagem."
              },
              {
                title: "Sinergia de Treinamentos",
                content: "Alguns treinamentos funcionam melhor juntos. Incentive escolhas temáticas e coerentes com o estilo de jogo do personagem."
              },
              {
                title: "Balanceamento",
                content: "Treinamentos Gerais são acessíveis a todos. Especializados requerem certas condições. Avançados são os mais poderosos."
              },
              {
                title: "Customização",
                content: "Sinta-se livre para criar treinamentos customizados para sua campanha, mantendo o mesmo nível de poder dos existentes."
              }
            ].map((tip, i) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6 bl-card h-full">
                  <h3 className="font-heading text-lg font-bold text-white mb-3">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tip.content}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
