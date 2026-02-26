import { motion } from "framer-motion";
import Accordion from "@/components/Accordion";
import { attributes, classes } from "@/lib/data";

export default function Regras() {
  const atributosItems = attributes.map(attr => ({
    id: attr.id,
    title: attr.name,
    icon: "⚡",
    content: (
      <div className="space-y-3">
        <p className="italic">{attr.description}</p>
        <div>
          <p className="font-bold text-white mb-1">Propósito:</p>
          <p>{attr.purpose}</p>
        </div>
        <div>
          <p className="font-bold text-white mb-1">Perícias Relacionadas:</p>
          <p>{attr.skills.join(", ")}</p>
        </div>
      </div>
    )
  }));

  const classesItems = classes.map(cls => ({
    id: cls.id,
    title: cls.name,
    icon: "🎯",
    content: (
      <div className="space-y-3">
        <div>
          <p className="text-xs text-primary font-bold mb-1">{cls.subtitle}</p>
          <p className="italic">{cls.description}</p>
        </div>
        <div>
          <p className="font-bold text-white mb-2">Bônus de Atributos:</p>
          <div className="grid grid-cols-2 gap-2">
            {cls.attributeBonus.map(b => (
              <div key={b.attr} className="text-xs bg-white/5 p-2 rounded">
                <span className="font-bold">{b.attr}</span>: +{b.value}
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="font-bold text-white mb-2">Habilidades:</p>
          <div className="space-y-2">
            {cls.abilities.slice(0, 2).map((ability, idx) => (
              <div key={idx} className="text-xs bg-white/5 p-2 rounded">
                <p className="font-bold text-primary">{ability.name}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{ability.description}</p>
              </div>
            ))}
            {cls.abilities.length > 2 && (
              <p className="text-[10px] text-muted-foreground italic">
                +{cls.abilities.length - 2} habilidades adicionais
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }));

  const mecanicasItems = [
    {
      id: "passes",
      title: "Passes e Complicações",
      icon: "🎯",
      content: (
        <div className="space-y-2">
          <p><strong>Distância Próxima:</strong> 5-10 pés com visão limpa não requerem teste.</p>
          <p><strong>Distância Média:</strong> 15 pés = DT 15. A cada 5 pés adicionais, +5 na DT.</p>
          <p><strong>Falha (1d4):</strong> 1 = Curto demais, 2 = Distância Média, 3 = Disputa Injusta, 4 = Longo demais.</p>
          <p><strong>Adversários na Trajetória:</strong> Gera teste de Reflexos para interceptação.</p>
        </div>
      )
    },
    {
      id: "dribles",
      title: "Dribles e Fintas",
      icon: "🌀",
      content: (
        <div className="space-y-2">
          <p><strong>Teste de Drible:</strong> Compara Drible do atacante vs Defesa do defensor.</p>
          <p><strong>Sucesso:</strong> Você passa pelo defensor e pode continuar se movendo.</p>
          <p><strong>Falha:</strong> Perde a bola ou é derrubado (depende da margem de falha).</p>
          <p><strong>Crítico (20):</strong> Drible tão bom que o defensor sofre -2 na próxima ação.</p>
        </div>
      )
    },
    {
      id: "chutes",
      title: "Chutes e Finalizações",
      icon: "⚽",
      content: (
        <div className="space-y-2">
          <p><strong>Teste de Chute:</strong> Compara Chute do atacante vs Defesa do goleiro.</p>
          <p><strong>DT Base:</strong> 12 (goleiro atento). Aumenta com distância e obstáculos.</p>
          <p><strong>Sucesso:</strong> Gol marcado!</p>
          <p><strong>Crítico (19-20):</strong> Gol impossível de defender.</p>
        </div>
      )
    },
    {
      id: "defesa",
      title: "Defesa e Bloqueios",
      icon: "🛡️",
      content: (
        <div className="space-y-2">
          <p><strong>Teste de Defesa:</strong> Reação para bloquear chutes ou passes.</p>
          <p><strong>Bloqueio Bem-Sucedido:</strong> Reduz dano ou intercepta o passe.</p>
          <p><strong>Posicionamento:</strong> Estar entre o atacante e o alvo concede vantagem.</p>
          <p><strong>Penalidade:</strong> Estar marcado por múltiplos adversários causa desvantagem.</p>
        </div>
      )
    }
  ];

  const fluxoItems = [
    {
      id: "entrada-fluxo",
      title: "Entrada em Fluxo",
      icon: "🌀",
      content: (
        <div className="space-y-2">
          <p><strong>Requisitos:</strong> 2 ações bem-sucedidas consecutivas + situação de pressão.</p>
          <p><strong>Custo:</strong> 8 Pontos de Fôlego</p>
          <p><strong>Duração:</strong> 3 Rodadas</p>
          <p><strong>Efeitos:</strong> +3 em todos os testes, +2 em iniciativa, vantagem em Reflexos, ação bônus adicional.</p>
        </div>
      )
    },
    {
      id: "fluxo-intenso",
      title: "Fluxo Intenso",
      icon: "⚡",
      content: (
        <div className="space-y-2">
          <p><strong>Requisitos:</strong> Estar em Fluxo por 2 rodadas + 1 ação bem-sucedida.</p>
          <p><strong>Custo:</strong> 5 Pontos de Fôlego adicionais</p>
          <p><strong>Duração:</strong> 2 Rodadas</p>
          <p><strong>Efeitos:</strong> +5 em testes, +3 em iniciativa, vantagem em Chute/Pontaria, 10 pés adicionais, crítico em 19-20.</p>
        </div>
      )
    },
    {
      id: "fluxo-absoluto",
      title: "Fluxo Absoluto",
      icon: "👑",
      content: (
        <div className="space-y-2">
          <p><strong>Requisitos:</strong> Fluxo Intenso por 2 rodadas + gol ou ação extraordinária.</p>
          <p><strong>Custo:</strong> 15 Pontos de Fôlego</p>
          <p><strong>Duração:</strong> 1 Rodada</p>
          <p><strong>Efeitos:</strong> +8 em testes, imunidade a condições negativas, crítico em 18-20, 2 ações padrão, movimento ilimitado.</p>
        </div>
      )
    }
  ];

  const itemsItems = [
    {
      id: "agua",
      title: "Garrafas de Água",
      icon: "💧",
      content: (
        <div className="space-y-2">
          <p><strong>Pequena (500ml):</strong> Recupera 1d2+1 de fôlego. 2 usos. 226 Ienes.</p>
          <p><strong>Média (1,5l):</strong> Recupera 1d4+4 de fôlego. 4 usos. 339 Ienes.</p>
          <p><strong>Grande (2l):</strong> Recupera 1d8+8 de fôlego. 6 usos. 452 Ienes.</p>
        </div>
      )
    },
    {
      id: "equipamento",
      title: "Equipamento de Proteção",
      icon: "🛡️",
      content: (
        <div className="space-y-2">
          <p><strong>Caneleira:</strong> +2 em testes de Potência para evitar lesões. 988 Ienes.</p>
          <p><strong>Caneleira Aprimorada:</strong> +3 em Potência, +1 em Corpo a Corpo. 1271 Ienes.</p>
          <p><strong>Chuteira Leve:</strong> +1 em Acrobacia. 2260-5933 Ienes.</p>
          <p><strong>Chuteira Sofisticada:</strong> +1 em Passe e Drible. 2260-5933 Ienes.</p>
        </div>
      )
    },
    {
      id: "alimentos",
      title: "Alimentos e Bebidas",
      icon: "🍽️",
      content: (
        <div className="space-y-2">
          <p><strong>Refeição Leve:</strong> +1 em Explosão e Corrida a longa distância. 500-2000 Ienes.</p>
          <p><strong>Refeição Reforçada:</strong> +1 em Corpo a Corpo. 500-2000 Ienes.</p>
          <p><strong>Bebida Energética:</strong> +1 em Reflexos, Explosão e Corrida. 565-3673 Ienes.</p>
          <p><strong>Bebida Alcoólica:</strong> +1 em Roubo de Bola, Defesa e Acrobacia. 565-3673 Ienes.</p>
        </div>
      )
    }
  ];

  const condicoesItems = [
    {
      id: "ferido",
      title: "Ferido",
      icon: "🩹",
      content: (
        <div className="space-y-2">
          <p><strong>Grau 1:</strong> -1 em testes de perícia. Pode continuar jogando.</p>
          <p><strong>Grau 2:</strong> -2 em testes de perícia. Movimento reduzido em 5 pés.</p>
          <p><strong>Grau 3:</strong> -3 em testes de perícia. Movimento reduzido em 10 pés.</p>
          <p><strong>Cura:</strong> Bandagens (teste DT 14+Grau) ou descanso entre partidas.</p>
        </div>
      )
    },
    {
      id: "esgotado",
      title: "Esgotado",
      icon: "😤",
      content: (
        <div className="space-y-2">
          <p><strong>Causa:</strong> Fôlego chegou a 0 ou usou Fluxo Absoluto.</p>
          <p><strong>Efeito:</strong> -2 em todos os testes. Não pode usar Fluxo por 2 rodadas.</p>
          <p><strong>Recuperação:</strong> Beba água ou descanse 1 rodada.</p>
        </div>
      )
    },
    {
      id: "intimidado",
      title: "Intimidado",
      icon: "😨",
      content: (
        <div className="space-y-2">
          <p><strong>Causa:</strong> Falha em teste de Presença contra adversário com Ego alto.</p>
          <p><strong>Efeito:</strong> -2 em testes de ataque. Desvantagem em testes de coragem.</p>
          <p><strong>Duração:</strong> 1 rodada. Pode ser removido com sucesso em teste de Presença.</p>
        </div>
      )
    },
    {
      id: "flanqueado",
      title: "Flanqueado",
      icon: "🔄",
      content: (
        <div className="space-y-2">
          <p><strong>Causa:</strong> Estar cercado por 2+ adversários.</p>
          <p><strong>Efeito:</strong> -2 em testes de Defesa e Reflexos.</p>
          <p><strong>Sair:</strong> Mover-se para fora da zona de controle dos adversários.</p>
        </div>
      )
    }
  ];

  return (
    <div className="py-16">
      <div className="container max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="bl-tag mb-4">Referência</div>
          <h1 className="font-display text-6xl md:text-7xl text-white tracking-wider mb-4 uppercase italic">
            REGRAS
          </h1>
          <div className="w-24 h-0.5 mb-6" style={{ background: 'oklch(0.52 0.22 260)' }} />
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Todas as regras do Blue Lock RPG em um único lugar. Clique em cada seção para expandir e explorar os detalhes.
          </p>
        </motion.div>

        {/* Atributos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="font-display text-3xl text-white tracking-wider mb-6 uppercase">Atributos</h2>
          <Accordion items={atributosItems} allowMultiple={true} />
        </motion.div>

        {/* Classes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="font-display text-3xl text-white tracking-wider mb-6 uppercase">Classes</h2>
          <Accordion items={classesItems} allowMultiple={true} />
        </motion.div>

        {/* Mecânicas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="font-display text-3xl text-white tracking-wider mb-6 uppercase">Mecânicas de Ação</h2>
          <Accordion items={mecanicasItems} allowMultiple={true} />
        </motion.div>

        {/* Fluxo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="font-display text-3xl text-white tracking-wider mb-6 uppercase">Fluxo</h2>
          <Accordion items={fluxoItems} allowMultiple={true} />
        </motion.div>

        {/* Itens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="font-display text-3xl text-white tracking-wider mb-6 uppercase">Itens</h2>
          <Accordion items={itemsItems} allowMultiple={true} />
        </motion.div>

        {/* Condições */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-display text-3xl text-white tracking-wider mb-6 uppercase">Condições</h2>
          <Accordion items={condicoesItems} allowMultiple={true} />
        </motion.div>
      </div>
    </div>
  );
}
