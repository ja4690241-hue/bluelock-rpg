// Blue Lock RPG - Mestres (Game Master Guide) Page
// Design: Manga Dynamic - Guide for narrators and game masters

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Users, Zap, Target } from "lucide-react";

export default function Mestres() {
  const sections = [
    {
      title: "Preparando uma Partida",
      icon: <BookOpen className="w-5 h-5" />,
      tips: [
        "Defina o cenário: qual time está jogando? Qual é o objetivo?",
        "Prepare os NPCs: goleiros, defensores, árbitros com personalidades",
        "Estabeleça a dificuldade: quantos pontos de fôlego os jogadores devem ter?",
        "Crie objetivos secundários: marcar gol é o principal, mas há outros desafios?",
        "Prepare a música: Blue Lock tem trilha sonora épica para ambientar"
      ]
    },
    {
      title: "Balanceamento de Encontros",
      icon: <Target className="w-5 h-5" />,
      tips: [
        "Jogadores vs Goleiro: Goleiros devem ser desafiadores mas não impossíveis",
        "Jogadores vs Múltiplos Adversários: 1 jogador vs 3 adversários = encontro difícil",
        "Considere o Fôlego: Jogadores com pouco fôlego têm menos opções",
        "Use Condições: Flanqueado, Cercado, Intimidado tornam encontros mais dinâmicos",
        "Teste de Dificuldade (DT): Fácil (10), Médio (15), Difícil (20), Muito Difícil (25)"
      ]
    },
    {
      title: "Criando NPCs",
      icon: <Users className="w-5 h-5" />,
      tips: [
        "Defina uma classe: Velocista, Playmaker, Finalizador, etc.",
        "Escolha 2-3 habilidades: NPCs não precisam de todas as habilidades",
        "Crie uma personalidade: tímido, arrogante, estratégico, impulsivo",
        "Defina motivações: por que este NPC está em campo?",
        "Dê-lhe um objetivo: marcar gol, defender, criar caos, ajudar aliados"
      ]
    },
    {
      title: "Gerenciando Combates",
      icon: <Zap className="w-5 h-5" />,
      tips: [
        "Mantenha o ritmo: não deixe turnos durarem mais de 2 minutos",
        "Descreva as ações dramaticamente: 'Você sente o ar queimar ao seu redor'",
        "Use condições para criar tensão: Flanqueado força decisões táticas",
        "Recompense criatividade: ações criativas merecem bônus",
        "Seja justo: regras devem ser aplicadas consistentemente"
      ]
    }
  ];

  const difficultyTable = [
    { dt: 10, name: "Fácil", example: "Passar para um companheiro aberto" },
    { dt: 15, name: "Médio", example: "Chutar com um defensor próximo" },
    { dt: 20, name: "Difícil", example: "Driblar 2 adversários simultaneamente" },
    { dt: 25, name: "Muito Difícil", example: "Marcar gol em situação impossível" },
    { dt: 30, name: "Quase Impossível", example: "Ações heroicas que desafiam lógica" }
  ];

  const narratorTips = [
    {
      title: "Descreva o Campo",
      description: "Pinte uma imagem mental: 'O campo está molhado, a torcida grita, o goleiro está posicionado na linha de gol. Você tem 20 pés de espaço.'",
      icon: "🎬"
    },
    {
      title: "Use Tensão Dramática",
      description: "Pause antes de revelar resultados críticos. 'Você rola para... 19! Um acerto crítico!' Deixe o suspense construir.",
      icon: "⏸️"
    },
    {
      title: "Recompense Roleplay",
      description: "Se um jogador faz uma ação dramaticamente interessante, conceda +2 no teste. Incentive narrativa criativa.",
      icon: "🎭"
    },
    {
      title: "Permita Falhas Interessantes",
      description: "Uma falha não precisa ser apenas 'você falhou'. Talvez você chute, mas a bola bate na trave e volta para você.",
      icon: "🎯"
    },
    {
      title: "Estabeleça Consequências",
      description: "Ações têm peso. Se você falhar em um Roubo de Bola, o adversário avança. Mostre como decisões importam.",
      icon: "⚖️"
    },
    {
      title: "Mantenha o Ritmo",
      description: "Não deixe discussões de regras durarem muito. Decida rapidamente e continue. Você pode revisar regras depois.",
      icon: "⏱️"
    }
  ];

  const campaignStructure = [
    {
      phase: "Fase 1: Preparação",
      duration: "1-2 Sessões",
      description: "Jogadores criam personagens, aprendem o sistema, exploram o cenário"
    },
    {
      phase: "Fase 2: Primeiros Desafios",
      duration: "3-5 Sessões",
      description: "Encontros fáceis a médios, jogadores aprendem táticas, ganham experiência"
    },
    {
      phase: "Fase 3: Escalação",
      duration: "5-8 Sessões",
      description: "Encontros mais difíceis, NPCs memoráveis, histórias pessoais dos personagens"
    },
    {
      phase: "Fase 4: Clímax",
      duration: "2-3 Sessões",
      description: "Partida final, todos os elementos convergem, conclusão épica"
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
          <div className="bl-tag mb-4">Guia do Narrador</div>
          <h1 className="font-display text-6xl md:text-7xl text-white tracking-wider mb-4">
            MESTRES
          </h1>
          <div className="w-24 h-0.5 mb-6" style={{ background: 'oklch(0.52 0.22 260)' }} />
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            Guia completo para narradores e mestres de jogo. Aprenda a conduzir partidas épicas, balancear encontros e criar momentos memoráveis em Blue Lock RPG.
          </p>
        </motion.div>

        {/* Main Sections */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bl-card p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span style={{ color: 'oklch(0.52 0.22 260)' }}>{section.icon}</span>
                  <h3 className="font-heading text-lg font-bold text-white">{section.title}</h3>
                </div>
                <ul className="space-y-2">
                  {section.tips.map((tip) => (
                    <li key={tip} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span style={{ color: 'oklch(0.52 0.22 260)' }} className="font-bold mt-0.5">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Difficulty Table */}
        <div className="mb-16">
          <h2 className="font-display text-4xl text-white tracking-wider mb-6">TABELA DE DIFICULDADES</h2>
          <div className="bl-card p-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-heading font-bold text-white">DT</th>
                  <th className="text-left py-3 px-4 font-heading font-bold text-white">Dificuldade</th>
                  <th className="text-left py-3 px-4 font-heading font-bold text-white">Exemplo</th>
                </tr>
              </thead>
              <tbody>
                {difficultyTable.map((row) => (
                  <tr key={row.dt} className="border-b border-border/50 hover:bg-accent/5 transition-colors">
                    <td className="py-3 px-4 font-mono-stats" style={{ color: 'oklch(0.52 0.22 260)' }}>
                      {row.dt}
                    </td>
                    <td className="py-3 px-4 text-white">{row.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{row.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Narrator Tips */}
        <div className="mb-16">
          <h2 className="font-display text-4xl text-white tracking-wider mb-6">DICAS PARA NARRADORES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {narratorTips.map((tip, i) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bl-card p-5"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">{tip.icon}</span>
                  <h3 className="font-heading text-base font-bold text-white">{tip.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Campaign Structure */}
        <div>
          <h2 className="font-display text-4xl text-white tracking-wider mb-6">ESTRUTURA DE CAMPANHA</h2>
          <div className="space-y-3">
            {campaignStructure.map((phase, i) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bl-card p-6 flex items-start gap-4"
              >
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-sm flex-shrink-0 font-display text-xl"
                  style={{ background: 'oklch(0.52 0.22 260)', color: 'white' }}
                >
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-bold text-white mb-1">{phase.phase}</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    <span className="font-heading font-bold">Duração:</span> {phase.duration}
                  </p>
                  <p className="text-sm text-muted-foreground">{phase.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
