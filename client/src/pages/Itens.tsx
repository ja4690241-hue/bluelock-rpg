// Blue Lock RPG - Itens Page
// Design: Manga Dynamic - Items and equipment

import { motion } from "framer-motion";
import { items } from "@/lib/data";
import { ShoppingBag, Zap, Shield, Star } from "lucide-react";

export default function Itens() {
  // Organizar itens por categorias lógicas baseadas no nome/descrição
  const categorizedItems = {
    "Equipamentos": items.filter(i => i.name.includes("Chuteira") || i.name.includes("Caneleira")),
    "Consumíveis": items.filter(i => i.name.includes("Garrafa") || i.name.includes("Bebida") || i.name.includes("Refeição") || i.name.includes("Remédio")),
    "Especiais": items.filter(i => !i.name.includes("Chuteira") && !i.name.includes("Caneleira") && !i.name.includes("Garrafa") && !i.name.includes("Bebida") && !i.name.includes("Refeição") && !i.name.includes("Remédio"))
  };

  const rarities = [
    { name: "Comum", color: "oklch(0.7 0.05 220)", description: "Itens básicos e acessíveis" },
    { name: "Incomum", color: "oklch(0.75 0.15 230)", description: "Itens melhorados com bônus moderados" },
    { name: "Raro", color: "oklch(0.75 0.18 60)", description: "Itens poderosos com bônus significativos" },
    { name: "Muito Raro", color: "oklch(0.52 0.22 260)", description: "Itens lendários com efeitos especiais" }
  ];

  return (
    <div className="py-16">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="bl-tag mb-4">Equipamento</div>
          <h1 className="font-display text-6xl md:text-7xl text-white tracking-wider mb-4">
            ITENS & EQUIPAMENTOS
          </h1>
          <div className="w-24 h-0.5 mb-6" style={{ background: 'oklch(0.52 0.22 260)' }} />
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            Equipamentos e itens especiais para melhorar seu desempenho em campo. De uniformes reforçados a cristais lendários, cada item oferece benefícios únicos.
          </p>
        </motion.div>

        {/* Rarity Guide */}
        <div className="mb-12">
          <h2 className="font-display text-3xl text-white tracking-wider mb-6">RARIDADE DOS ITENS</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {rarities.map((rarity, i) => (
              <motion.div
                key={rarity.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bl-card p-4 text-center"
              >
                <div
                  className="w-12 h-12 rounded-sm mx-auto mb-3"
                  style={{ background: rarity.color }}
                />
                <h3 className="font-heading text-sm font-bold text-white mb-1">{rarity.name}</h3>
                <p className="text-xs text-muted-foreground">{rarity.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Categorias de Itens */}
        <div className="space-y-16 mb-16">
          {Object.entries(categorizedItems).map(([category, categoryItems]) => (
            <div key={category}>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-display text-4xl text-white tracking-wider uppercase">{category}</h2>
                <div className="flex-1 h-px bg-border/50" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categoryItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bl-card p-6 group hover:bl-border-glow transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-sm flex items-center justify-center bg-primary/10 text-primary border border-primary/20">
                          {category === "Equipamentos" ? <Shield className="w-5 h-5" /> : 
                           category === "Consumíveis" ? <Zap className="w-5 h-5" /> : 
                           <Star className="w-5 h-5" />}
                        </div>
                        <div>
                          <h3 className="font-heading text-lg font-bold text-white group-hover:text-primary transition-colors">{item.name}</h3>
                          <p className="text-[10px] text-primary font-heading tracking-widest uppercase">{item.price}</p>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
                    
                    <div className="p-3 rounded-sm bg-white/5 border border-white/5">
                      <p className="text-xs text-white/90">
                        <span className="text-primary font-bold uppercase text-[10px] mr-2">Efeito:</span>
                        {item.effects}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bl-card p-8"
        >
          <h2 className="font-display text-3xl text-white tracking-wider mb-6">DICAS DE EQUIPAMENTO</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-heading text-lg font-bold text-white mb-3">Escolha Baseada em Classe</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Velocistas se beneficiam de Chuteiras de Velocista. Goleiros precisam de Luvas. Playmakers ganham com itens que aumentam Intuição. Escolha equipamentos que complementam sua classe.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white mb-3">Sinergia de Itens</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Alguns itens trabalham bem juntos. Braçadeira de Capitão + Anel de Concentração criam um líder poderoso. Experimente combinações para descobrir sinergias.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white mb-3">Orçamento Inicial</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Comece com itens Comuns e Incomuns. Conforme progride, invista em itens Raros. Itens Muito Raros são para campanhas de longo prazo.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white mb-3">Itens Consumíveis</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Bebidas Energéticas e Poções são de uso único. Guarde-as para momentos críticos. O Elixir de Fluxo é especialmente valioso em finais de campeonato.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
