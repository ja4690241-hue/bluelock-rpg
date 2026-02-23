// Blue Lock RPG - Economia de Ações Page
// Design: Manga Dynamic - Action economy and game mechanics

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

export default function AcoesEconomia() {
  const actions = [
    {
      title: "Ação Padrão",
      icon: "⚡",
      description: "A ação principal do seu turno. Você pode usar para:",
      examples: [
        "Chutar a bola",
        "Fazer um passe",
        "Driblar um adversário",
        "Usar uma habilidade de classe",
        "Preparar uma ação futura"
      ]
    },
    {
      title: "Ação Bônus",
      icon: "✨",
      description: "Ação adicional disponível em certas situações:",
      examples: [
        "Concedida por certas habilidades",
        "Resultado de um acerto crítico",
        "Efeito de uma perícia bem-sucedida",
        "Bônus de classe específico"
      ]
    },
    {
      title: "Reação",
      icon: "🛡️",
      description: "Ação usada fora do seu turno, em resposta a algo:",
      examples: [
        "Roubar a bola (Roubo de Bola)",
        "Se jogar na frente de um chute (Reflexos/Defesa)",
        "Interceptar um passe",
        "Usar uma habilidade defensiva"
      ]
    },
    {
      title: "Movimento",
      icon: "💨",
      description: "Você pode se mover até sua velocidade em pés:",
      examples: [
        "Deslocamento padrão: até 30 pés",
        "Velocistas: até 40 pés",
        "Pode ser dividido antes e depois de ações",
        "Algumas habilidades concedem movimento extra"
      ]
    }
  ];

  const conditions = [
    {
      name: "Furtivo",
      icon: "👻",
      effect: "Jogador difícil de ser detectado em campo",
      rules: [
        "Ganha +5 em Furtividade para se mover sem ser visto",
        "Adversários sofrem -4 para detectá-lo",
        "Perde a condição se atacar ou for detectado",
        "Dura no mínimo 2 rodadas após perder"
      ]
    },
    {
      name: "Flanqueado",
      icon: "⚔️",
      effect: "-3 em Dribles e Passes",
      rules: [
        "Ter um adversário na frente e outro atrás",
        "Penalidade aplicada a testes de Drible e Passe",
        "Não afeta Chute ou Pontaria",
        "Termina quando o jogador se move para fora da posição"
      ]
    },
    {
      name: "Cercado",
      icon: "🔴",
      effect: "-6 em Passes e Dribles",
      rules: [
        "Estar rodeado por adversários em todos os lados",
        "Penalidade severa a ações de movimento com bola",
        "Pode usar Chute como única opção viável",
        "Termina quando conseguir se mover para fora"
      ]
    },
    {
      name: "Intimidado",
      icon: "😨",
      effect: "-2 em Roubo, Defesa ou Reflexos",
      rules: [
        "Causado por sucesso em Intimidação (diferença de 3+)",
        "Penalidade contra o jogador que intimidou",
        "Dura 2 rodadas (ou 3 se diferença de 6+)",
        "Pode ser removido com Diplomacia bem-sucedida"
      ]
    },
    {
      name: "Convencido",
      icon: "💭",
      effect: "+2 para obedecer ordens",
      rules: [
        "Causado por sucesso em Diplomacia",
        "Bônus ao seguir instruções do jogador",
        "Dura até o fim da partida ou até falha crítica",
        "Não obriga, apenas incentiva"
      ]
    },
    {
      name: "Em Choque",
      icon: "⚡",
      effect: "Paralisia temporária",
      rules: [
        "Causado por acerto crítico (20) em Intimidação",
        "Fica travado por 1d2+1 rodadas",
        "Não pode se mover, passar ou chutar",
        "Pode ser acordado por companheiros"
      ]
    }
  ];

  const turnStructure = [
    {
      step: 1,
      title: "Início do Turno",
      description: "Verifique condições ativas, recupere ações bônus se aplicável"
    },
    {
      step: 2,
      title: "Ação Padrão",
      description: "Use sua ação principal para uma ação significativa"
    },
    {
      step: 3,
      title: "Ação Bônus (opcional)",
      description: "Se disponível, use uma ação adicional"
    },
    {
      step: 4,
      title: "Movimento",
      description: "Mova-se até sua velocidade em pés (pode ser dividido)"
    },
    {
      step: 5,
      title: "Reações (durante turno de outros)",
      description: "Reaja a ações de outros jogadores quando apropriado"
    },
    {
      step: 6,
      title: "Fim do Turno",
      description: "Aplique efeitos de fim de turno, prepare-se para próximo turno"
    }
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
          <div className="bl-tag mb-4">Mecânicas</div>
          <h1 className="font-display text-6xl md:text-7xl text-white tracking-wider mb-4">
            ECONOMIA DE AÇÕES
          </h1>
          <div className="w-24 h-0.5 mb-6" style={{ background: 'oklch(0.52 0.22 260)' }} />
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            Entender como gerenciar suas ações é fundamental para jogar bem em Blue Lock RPG. Cada turno oferece oportunidades limitadas — use-as com sabedoria.
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="actions" className="mb-12">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="actions">Ações</TabsTrigger>
            <TabsTrigger value="conditions">Condições</TabsTrigger>
            <TabsTrigger value="turn">Estrutura de Turno</TabsTrigger>
          </TabsList>

          {/* Actions Tab */}
          <TabsContent value="actions" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {actions.map((action, i) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bl-card p-6"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-4xl">{action.icon}</span>
                    <div>
                      <h3 className="font-display text-2xl text-white">{action.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {action.examples.map((ex) => (
                      <li key={ex} className="flex items-start gap-2 text-sm">
                        <span style={{ color: 'oklch(0.52 0.22 260)' }} className="font-bold mt-0.5">•</span>
                        <span className="text-muted-foreground">{ex}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Conditions Tab */}
          <TabsContent value="conditions" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {conditions.map((cond, i) => (
                <motion.div
                  key={cond.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bl-card p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{cond.icon}</span>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-white">{cond.name}</h3>
                      <p className="text-xs text-muted-foreground">{cond.effect}</p>
                    </div>
                  </div>
                  <div className="space-y-2 pt-3 border-t border-border">
                    {cond.rules.map((rule) => (
                      <p key={rule} className="text-xs text-muted-foreground leading-relaxed">
                        • {rule}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Turn Structure Tab */}
          <TabsContent value="turn" className="space-y-4">
            <div className="space-y-3">
              {turnStructure.map((turn, i) => (
                <motion.div
                  key={turn.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bl-card p-6 flex items-start gap-4"
                >
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-sm flex-shrink-0 font-display text-xl"
                    style={{ background: 'oklch(0.52 0.22 260)', color: 'white' }}
                  >
                    {turn.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-lg font-bold text-white mb-1">{turn.title}</h3>
                    <p className="text-sm text-muted-foreground">{turn.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bl-card p-8"
        >
          <h2 className="font-display text-3xl text-white tracking-wider mb-6">DICAS ESTRATÉGICAS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-heading text-lg font-bold text-white mb-3">Preparar Ações</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Use sua ação padrão para preparar uma ação futura com um gatilho específico. Exemplo: "Preparo para roubar a bola se o adversário tentar driblar". Se o gatilho não se concretizar, a ação é perdida.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white mb-3">Gerenciar Movimento</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Seu movimento pode ser dividido. Você pode se mover 15 pés, usar sua ação padrão, depois se mover mais 15 pés. Isso oferece flexibilidade tática.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white mb-3">Reações Defensivas</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Guarde suas reações para momentos críticos. Um Roubo de Bola bem-colocado pode mudar o curso de uma partida. Não desperdice em situações triviais.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white mb-3">Sincronização em Equipe</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Combine ações com companheiros. Um passe bem-colocado (sua ação padrão) pode criar oportunidade para um companheiro finalizar (sua ação padrão).
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
