// Blue Lock RPG - Itens Page
// Design: Manga Dynamic - Items and equipment

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Itens() {
  const armors = [
    {
      name: "Uniforme Padrão",
      rarity: "Comum",
      cost: "Gratuito",
      bonus: "Nenhum",
      description: "O uniforme padrão de um time profissional. Oferece proteção básica e permite movimento livre."
    },
    {
      name: "Uniforme Reforçado",
      rarity: "Incomum",
      cost: "500 Moedas",
      bonus: "+1 em testes de Defesa",
      description: "Uniforme com reforços em áreas críticas. Oferece melhor proteção sem comprometer a mobilidade."
    },
    {
      name: "Colete de Proteção",
      rarity: "Raro",
      cost: "1.500 Moedas",
      bonus: "+2 em testes de Defesa, -1 em Agilidade",
      description: "Colete de proteção especializado. Oferece proteção significativa mas reduz ligeiramente a mobilidade."
    },
    {
      name: "Armadura de Atleta Elite",
      rarity: "Muito Raro",
      cost: "5.000 Moedas",
      bonus: "+3 em testes de Defesa, sem penalidade de Agilidade",
      description: "Equipamento de elite usado por centroavantes profissionais. Combina proteção máxima com mobilidade."
    }
  ];

  const accessories = [
    {
      name: "Fita de Pulso",
      rarity: "Comum",
      cost: "100 Moedas",
      bonus: "+1 em Chute",
      description: "Fita de pulso que melhora o controle do chute."
    },
    {
      name: "Caneleira Reforçada",
      rarity: "Incomum",
      cost: "300 Moedas",
      bonus: "+1 em Corrida a Longa Distância",
      description: "Proteção para as canelas que melhora a velocidade."
    },
    {
      name: "Luvas de Goleiro",
      rarity: "Incomum",
      cost: "400 Moedas",
      bonus: "+2 em Defesa (apenas para Goleiros)",
      description: "Luvas especializadas para goleiros. Melhora significativamente o bloqueio."
    },
    {
      name: "Chuteira de Velocista",
      rarity: "Raro",
      cost: "1.200 Moedas",
      bonus: "+2 em Explosão e Corrida a Longa Distância",
      description: "Chuteira leve e aerodinâmica para velocistas. Aumenta significativamente a velocidade."
    },
    {
      name: "Braçadeira de Capitão",
      rarity: "Raro",
      cost: "2.000 Moedas",
      bonus: "+2 em Intimidação e Presença",
      description: "Braçadeira que marca a liderança. Aumenta a autoridade do jogador."
    },
    {
      name: "Anel de Concentração",
      rarity: "Muito Raro",
      cost: "3.500 Moedas",
      bonus: "+1 em testes de Fluxo, -1 custo de FO para Fluxo",
      description: "Anel misterioso que amplifica a concentração. Facilita entrada em Fluxo."
    }
  ];

  const specialItems = [
    {
      name: "Bola de Treinamento",
      rarity: "Comum",
      cost: "50 Moedas",
      effect: "Permite treinar perícias fora de partidas",
      description: "Bola padrão para treinamento. Essencial para melhorar suas habilidades."
    },
    {
      name: "Bebida Energética",
      rarity: "Incomum",
      cost: "200 Moedas",
      effect: "Recupera 5 FO durante uma partida (uso único)",
      description: "Bebida especial que recupera energia. Pode ser usada uma vez por partida."
    },
    {
      name: "Poção de Resistência",
      rarity: "Raro",
      cost: "800 Moedas",
      effect: "Vantagem em testes de Presença por 1 rodada",
      description: "Poção que fortalece a mente. Oferece resistência mental temporária."
    },
    {
      name: "Elixir de Fluxo",
      rarity: "Muito Raro",
      cost: "4.000 Moedas",
      effect: "Permite entrar em Fluxo sem requisitos por uma vez",
      description: "Elixir lendário que força entrada em Fluxo. Uso único por campanha."
    },
    {
      name: "Livro de Estratégias",
      rarity: "Incomum",
      cost: "300 Moedas",
      effect: "+1 em Intuição durante uma partida",
      description: "Livro com estratégias de jogo. Melhora sua compreensão tática."
    },
    {
      name: "Cristal de Ego",
      rarity: "Muito Raro",
      cost: "5.000 Moedas",
      effect: "+2 em Ego permanentemente",
      description: "Cristal raro que amplifica o ego. Aumenta permanentemente seu atributo de Ego."
    }
  ];

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

        {/* Tabs */}
        <Tabs defaultValue="armor" className="mb-12">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="armor">Armaduras</TabsTrigger>
            <TabsTrigger value="accessories">Acessórios</TabsTrigger>
            <TabsTrigger value="special">Itens Especiais</TabsTrigger>
          </TabsList>

          {/* Armor Tab */}
          <TabsContent value="armor" className="space-y-4">
            {armors.map((armor, i) => (
              <motion.div
                key={armor.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bl-card p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white">{armor.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="bl-tag">{armor.rarity}</span>
                      <span className="text-xs text-muted-foreground">{armor.cost}</span>
                    </div>
                  </div>
                  <span
                    className="px-3 py-1 rounded-sm text-xs font-heading font-bold"
                    style={{ background: 'oklch(0.52 0.22 260 / 0.2)', color: 'oklch(0.75 0.15 230)' }}
                  >
                    {armor.bonus}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{armor.description}</p>
              </motion.div>
            ))}
          </TabsContent>

          {/* Accessories Tab */}
          <TabsContent value="accessories" className="space-y-4">
            {accessories.map((acc, i) => (
              <motion.div
                key={acc.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bl-card p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white">{acc.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="bl-tag">{acc.rarity}</span>
                      <span className="text-xs text-muted-foreground">{acc.cost}</span>
                    </div>
                  </div>
                  <span
                    className="px-3 py-1 rounded-sm text-xs font-heading font-bold"
                    style={{ background: 'oklch(0.52 0.22 260 / 0.2)', color: 'oklch(0.75 0.15 230)' }}
                  >
                    {acc.bonus}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{acc.description}</p>
              </motion.div>
            ))}
          </TabsContent>

          {/* Special Items Tab */}
          <TabsContent value="special" className="space-y-4">
            {specialItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bl-card p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="bl-tag">{item.rarity}</span>
                      <span className="text-xs text-muted-foreground">{item.cost}</span>
                    </div>
                  </div>
                  <span
                    className="px-3 py-1 rounded-sm text-xs font-heading font-bold"
                    style={{ background: 'oklch(0.52 0.22 260 / 0.2)', color: 'oklch(0.75 0.15 230)' }}
                  >
                    {item.effect}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>

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
