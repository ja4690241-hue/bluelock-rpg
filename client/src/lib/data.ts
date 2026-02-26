// Blue Lock RPG - Data file (Atualizado com dados oficiais do PDF v4.0.1.1)
// Contains all game data: attributes, skills, classes, mechanics, etc.

export const attributes = [
  {
    id: "potencia",
    name: "Potência",
    icon: "⚡",
    color: "oklch(0.75 0.18 25)",
    description: "Mede a potência do chute do personagem. Jogadores com altos valores geralmente são aqueles atletas matadores capazes de finalizar com um chute feroz. Por via de regra, é o atributo usado para chutar/finalizar.",
    skills: ["Corpo a Corpo", "Cabeceio", "Chute"]
  },
  {
    id: "tecnica",
    name: "Técnica",
    icon: "🎯",
    color: "oklch(0.75 0.15 230)",
    description: "Demonstra a capacidade de cumprir questões que exigem mais finesse do atleta: drible, passe, movimentos acrobáticos, domínio e pontaria. Essencial para meio campistas e jogadores mais ágeis.",
    skills: ["Pontaria", "Domínio", "Passe", "Drible", "Intuição", "Roubo de Bola", "Furtividade"]
  },
  {
    id: "velocidade",
    name: "Velocidade",
    icon: "💨",
    color: "oklch(0.75 0.18 160)",
    description: "Representa o quão rápido o personagem consegue atravessar de um ponto A para um ponto B do campo. Muito útil para jogadores que pretendem auxiliar no lado ofensivo e defensivo.",
    skills: ["Corrida a Longa Distância", "Explosão"]
  },
  {
    id: "agilidade",
    name: "Agilidade",
    icon: "🌀",
    color: "oklch(0.75 0.18 280)",
    description: "Engloba fatores importantes para qualquer jogador: a velocidade de reação a situações que ocorram dentro do jogo. Também é usada para definir a iniciativa dentro de uma partida.",
    skills: ["Acrobacia", "Reflexos", "Defesa"]
  },
  {
    id: "ego",
    name: "Ego",
    icon: "👑",
    color: "oklch(0.75 0.18 60)",
    description: "Mede o espírito do personagem e sua capacidade de impor ele dentro da partida. Personagens com valores altos tendem a ser excêntricos e se destacarem. Capazes de impor sua vontade sobre membros do time e adversários.",
    skills: ["Intimidação", "Presença", "Diplomacia", "Enganação"]
  },
  {
    id: "folego",
    name: "Fôlego",
    icon: "💙",
    color: "oklch(0.52 0.22 260)",
    description: "Diferentemente dos outros atributos, funciona como 'mana' para o personagem. Define quantos pontos ele possui para usar habilidades. Para definir os pontos, role 2d15. Para aventuras, o narrador deve conceder no mínimo 12 pontos.",
    skills: []
  },
  {
    id: "inteligencia",
    name: "Inteligência",
    icon: "🧠",
    color: "oklch(0.75 0.15 280)",
    description: "Mede a capacidade intelectual e analítica do personagem. Essencial para o Analista, permite compreender estratégias, analisar adversários e coordenar ações táticas.",
    skills: ["Análise Individual", "Intuição", "Diplomacia"]
  }
];

export const skillDescriptions: Record<string, string> = {
  "Corpo a Corpo": "Usada para demonstrar a força física de um personagem. Pode ser usada para travar a passagem de outro atleta com o próprio corpo.",
  "Cabeceio": "Demonstra a habilidade de cabeceio, servindo tanto para passes de cabeça quanto para finalizações.",
  "Chute": "Demonstra o quão forte e destrutivo é um chute. Representa um canhão que destrói o que vier na frente.",
  "Pontaria": "Método de chute mais sofisticado que demonstra competência técnica. Área de efetividade reduzida.",
  "Domínio": "Ao receber um passe com DT, o narrador pode exigir um teste de domínio para que o atleta deixe a bola segura.",
  "Passe": "Extremamente útil para qualquer jogador. Usada para passes, cruzamentos, passes em profundidade e passes curtos.",
  "Drible": "Jogadores com bons números são verdadeiras pontas de lança capazes de atravessar as linhas inimigas.",
  "Intuição": "Capaz de perceber jogadores furtivos através de instintos. Também pode ser utilizada para entender estratégias.",
  "Roubo de Bola": "Usada por jogadores nas alas ofensivas e defensivas. Sempre como reação para tentar roubar a bola.",
  "Furtividade": "Usada quando um jogador deseja mascarar/ocultar sua presença dentro de campo.",
  "Corrida a Longa Distância": "Quando dois jogadores disputam velocidade para chegarem na bola primeiro, a partir de 15 pés ou mais.",
  "Explosão": "Quando um passe em profundidade é feito e dois jogadores disputam para pegar a bola primeiro.",
  "Acrobacia": "Antes de chutes acrobáticos como voleio, o narrador pode exigir um teste.",
  "Reflexos": "Muito utilizada para reagir a possíveis adversidades. Defensores podem se jogar na frente de chutes.",
  "Defesa": "Centralmente dedicada aos goleiros para bloquear chutes com as mãos.",
  "Intimidação": "Impor medo ou sentimento de ameaça.",
  "Presença": "Resiliência mental. Representa o quão bom o personagem é em lidar com estresse psicológico.",
  "Diplomacia": "Pode ser usada para livrar jogadores intimidados.",
  "Enganação": "Pode ser usada dentro do jogo para enganar oponentes.",
  "Análise Individual": "Usada pelo Analista para estudar adversários, entender seus padrões de jogo e anular suas habilidades."
};

export const classes = [
  {
    id: "playmaker",
    name: "O PlayMaker",
    subtitle: "O Craque do Time",
    description: "O playmaker é uma classe de excelência para aqueles que buscam compor qualquer elenco sem muita dificuldade. Capaz de finalizar para o gol, executar passes com precisão e driblar com maestria.",
    role: "Meio-Campo / Ataque",
    difficulty: "Médio",
    attributeBonus: [
      { attr: "Técnica", value: 3 },
      { attr: "Agilidade", value: 2 },
      { attr: "Ego", value: 2 }
    ],
    skillBonus: [
      { skill: "Passe", value: 5 },
      { skill: "Drible", value: 5 },
      { skill: "Pontaria", value: 5 },
      { skill: "Roubo de Bola", value: 5 },
      { skill: "Intuição", value: 5 },
      { skill: "Intimidação", value: 5 }
    ],
    abilities: [
      {
        name: "Percepção Espacial",
        cost: "13 FO",
        duration: "3 Rodadas (5 FO para manter)",
        type: "Ativo",
        description: "Seu olhar aguçado reunido com sua genialidade lhe concede uma visão praticamente divina para analisar possíveis passes.",
        bonus: "+8 para passes, +4 para pontaria e +2 para dribles."
      },
      {
        name: "Sincronização",
        cost: "9 FO",
        duration: "2 Rodadas",
        type: "Ativo",
        description: "O playmaker cria uma sincronização com um jogador do time, adquirindo precisão entre seus passes.",
        bonus: "+15 em passes apenas entre esses dois jogadores."
      },
      {
        name: "Olhar do Tirano",
        cost: "8 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Usando de uma aura intensa o playmaker implanta uma ideia na mente de um companheiro.",
        bonus: "+5 em Diplomacia ou Intimidação contra um companheiro."
      },
      {
        name: "Chute Preciso",
        cost: "10 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Com um chute extremamente preciso o playmaker é capaz de matar um lance.",
        bonus: "+5 em Pontaria e não recebe penalidade de -2 por chutar das laterais."
      }
    ]
  },
  {
    id: "dominador-superior",
    name: "O Dominador Superior",
    subtitle: "Mestre do Domínio",
    description: "Possui uma arma muito clara que o destaca: seu domínio de bola é capaz de fazê-lo ficar à frente de muitos marcadores.",
    role: "Ataque",
    difficulty: "Médio",
    attributeBonus: [
      { attr: "Técnica", value: 3 },
      { attr: "Agilidade", value: 2 },
      { attr: "Ego", value: 2 }
    ],
    skillBonus: [
      { skill: "Domínio", value: 5 },
      { skill: "Acrobacia", value: 5 },
      { skill: "Pontaria", value: 5 },
      { skill: "Drible", value: 5 },
      { skill: "Enganação", value: 5 }
    ],
    abilities: [
      {
        name: "Domínio em Pleno Ar",
        cost: "9 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Um domínio preciso que mata o giro e impacto da bola perfeitamente ainda no ar.",
        bonus: "+5 em Domínio, +5 em Acrobacia."
      },
      {
        name: "Armadilha de Domínio",
        cost: "8 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Um domínio que redireciona a bola e quebra as pernas de qualquer marcador.",
        bonus: "Teste de enganação vs Intuição. Sucesso: abre 5 pés de espaço."
      },
      {
        name: "Domínio Sob Pressão",
        cost: "12 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Mesmo sendo marcado, é capaz de ser perigoso com extremo nível de eficiência.",
        bonus: "+10 em testes de domínio mesmo sendo pressionado."
      },
      {
        name: "Impulso do Gênio",
        cost: "16 FO",
        duration: "2 Rodadas",
        type: "Ativo",
        description: "O jogador desperta em um estado de concentração extrema.",
        bonus: "+5 em Drible, +5 em Pontaria e +5 em Roubo de Bola."
      }
    ]
  },
  {
    id: "velocista",
    name: "O Velocista",
    subtitle: "A Bala do Campo",
    description: "Extremamente hábil em rapidamente perfurar a defesa adversária em um contra-ataque.",
    role: "Ataque",
    difficulty: "Fácil",
    attributeBonus: [
      { attr: "Velocidade", value: 3 },
      { attr: "Potência", value: 2 },
      { attr: "Agilidade", value: 1 },
      { attr: "Ego", value: 1 }
    ],
    skillBonus: [
      { skill: "Drible", value: 5 },
      { skill: "Corrida a Longa Distância", value: 5 },
      { skill: "Roubo de Bola", value: 5 },
      { skill: "Chute", value: 5 },
      { skill: "Explosão", value: 5 }
    ],
    abilities: [
      {
        name: "Drible com Adiantamento",
        cost: "8 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Um drible rápido que cria espaço.",
        bonus: "+5 em Drible e ganha 5 pés de movimento extra."
      },
      {
        name: "Voo pelo Campo",
        cost: "13 FO",
        duration: "2 Rodadas",
        type: "Ativo",
        description: "Velocidade extrema que permite atravessar o campo.",
        bonus: "+8 em Corrida a Longa Distância."
      },
      {
        name: "Chute Veloz",
        cost: "15 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Um chute executado com extrema velocidade.",
        bonus: "+6 em Chute."
      },
      {
        name: "Fora da Bola",
        cost: "Passiva",
        duration: "Permanente",
        type: "Passivo",
        description: "Você se move sem que a bola o acompanhe.",
        bonus: "+3 em Corrida a Longa Distância e Explosão."
      }
    ]
  },
  {
    id: "especialista-espacial",
    name: "O Especialista Espacial",
    subtitle: "O Mestre da Percepção",
    description: "Um jogador que domina a percepção espacial e consegue ver oportunidades onde outros não veem.",
    role: "Ataque / Meio-Campo",
    difficulty: "Médio",
    attributeBonus: [
      { attr: "Ego", value: 3 },
      { attr: "Potência", value: 3 },
      { attr: "Agilidade", value: 2 }
    ],
    skillBonus: [
      { skill: "Intuição", value: 5 },
      { skill: "Intimidação", value: 5 },
      { skill: "Enganação", value: 5 },
      { skill: "Chute", value: 5 },
      { skill: "Passe", value: 5 },
      { skill: "Furtividade", value: 5 },
      { skill: "Reflexos", value: 5 }
    ],
    abilities: [
      {
        name: "Percepção Espacial Básica",
        cost: "11 FO",
        duration: "3 Rodadas",
        type: "Ativo",
        description: "Você vê o espaço de forma diferente.",
        bonus: "+6 em Intuição e Passe."
      },
      {
        name: "Tiro Direto",
        cost: "5 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Um chute direto e preciso.",
        bonus: "+4 em Pontaria."
      },
      {
        name: "Gênio da Adaptação",
        cost: "12 FO",
        duration: "2 Rodadas",
        type: "Ativo",
        description: "Você se adapta à situação do jogo.",
        bonus: "+5 em qualquer perícia à escolha."
      }
    ]
  },
  {
    id: "finalizador-clinico",
    name: "O Finalizador Clínico",
    subtitle: "O Matador Preciso",
    description: "Um finalizador que combina força bruta com precisão técnica, capaz de finalizar em qualquer situação.",
    role: "Ataque",
    difficulty: "Médio",
    attributeBonus: [
      { attr: "Potência", value: 4 },
      { attr: "Agilidade", value: 1 },
      { attr: "Ego", value: 2 }
    ],
    skillBonus: [
      { skill: "Chute", value: 6 },
      { skill: "Corpo a Corpo", value: 5 },
      { skill: "Cabeceio", value: 5 },
      { skill: "Domínio", value: 5 },
      { skill: "Reflexos", value: 5 }
    ],
    abilities: [
      {
        name: "Ambidestro",
        cost: "Passiva",
        duration: "Permanente",
        type: "Passivo",
        description: "Você chuta com ambos os pés com igual eficiência.",
        bonus: "+2 em Chute com qualquer pé."
      }
    ]
  },
  {
    id: "dribblador",
    name: "O Dribblador",
    subtitle: "O Mestre do Drible",
    description: "Um jogador especializado em drible, capaz de deixar defensores para trás com movimentos acrobáticos.",
    role: "Ataque",
    difficulty: "Médio",
    attributeBonus: [
      { attr: "Agilidade", value: 3 },
      { attr: "Técnica", value: 3 },
      { attr: "Ego", value: 1 }
    ],
    skillBonus: [
      { skill: "Drible", value: 7 },
      { skill: "Intuição", value: 5 },
      { skill: "Passe", value: 5 },
      { skill: "Acrobacia", value: 5 },
      { skill: "Pontaria", value: 5 }
    ],
    abilities: [
      {
        name: "Monstro Interno",
        cost: "15 FO",
        duration: "2 Rodadas (5 FO para manter)",
        type: "Ativo",
        description: "Você desperta seu monstro interior para driblar com maestria.",
        bonus: "+8 em Drible."
      },
      {
        name: "Pico de Dopamina",
        cost: "18 FO",
        duration: "2 Rodadas (4 FO para manter)",
        type: "Ativo",
        description: "Você atinge um pico de adrenalina.",
        bonus: "+10 em Drible e +5 em Acrobacia."
      },
      {
        name: "Passe Rápido",
        cost: "8 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Um passe executado com velocidade.",
        bonus: "+5 em Passe."
      },
      {
        name: "Pedalada",
        cost: "8 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Um movimento de drible rápido.",
        bonus: "+5 em Drible."
      },
      {
        name: "Chute Acrobático",
        cost: "8 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Um chute executado em movimento.",
        bonus: "+4 em Chute."
      }
    ]
  },
  {
    id: "atacante-completo",
    name: "O Atacante Completo",
    subtitle: "O Camaleão",
    description: "Um jogador versátil capaz de atuar em múltiplas posições com eficiência.",
    role: "Universal",
    difficulty: "Difícil",
    attributeBonus: [
      { attr: "Técnica", value: 3 },
      { attr: "Agilidade", value: 2 },
      { attr: "Velocidade", value: 1 },
      { attr: "Potência", value: 1 }
    ],
    skillBonus: [
      { skill: "6 perícias à escolha", value: 5 }
    ],
    abilities: [
      {
        name: "Dupla Dinâmica",
        cost: "6 FO",
        duration: "2 Rodadas (5 FO para manter)",
        type: "Ativo",
        description: "Você se sincroniza com um companheiro.",
        bonus: "+5 em Passe para o jogador sincronizado."
      },
      {
        name: "Camaleão Imperfeito",
        cost: "Variável",
        duration: "Variável",
        type: "Ativo",
        description: "Você copia uma habilidade física de um atleta.",
        bonus: "Pode copiar qualquer habilidade vendo-a ser usada."
      }
    ]
  },
  {
    id: "atacante-controlador",
    name: "O Atacante Controlador",
    subtitle: "O Maestro",
    description: "Um jogador que controla o jogo através de passes e movimentos calculados.",
    role: "Ataque / Meio-Campo",
    difficulty: "Difícil",
    attributeBonus: [
      { attr: "Técnica", value: 3 },
      { attr: "Ego", value: 2 },
      { attr: "Potência", value: 1 },
      { attr: "Agilidade", value: 1 }
    ],
    skillBonus: [
      { skill: "Pontaria", value: 5 },
      { skill: "Drible", value: 5 },
      { skill: "Passe", value: 5 },
      { skill: "Intimidação", value: 5 },
      { skill: "Presença", value: 5 },
      { skill: "Furtividade", value: 5 },
      { skill: "Intuição", value: 5 },
      { skill: "Roubo de Bola", value: 5 }
    ],
    abilities: [
      {
        name: "Marionetista",
        cost: "14 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Você controla os movimentos de seus companheiros.",
        bonus: "+5 em Passe e aliados ganham +3 em ações."
      },
      {
        name: "Chute Sofisticado",
        cost: "13 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Um chute refinado e preciso.",
        bonus: "+5 em Pontaria."
      },
      {
        name: "Enganador de Percepções",
        cost: "11 FO",
        duration: "2 Rodadas (7 FO para manter)",
        type: "Ativo",
        description: "Você engana a percepção do adversário.",
        bonus: "+5 em Enganação."
      },
      {
        name: "Fake Shot",
        cost: "10 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Você finge chutar para passar.",
        bonus: "+5 em Enganação e Passe."
      }
    ]
  },
  {
    id: "multi-funcoes",
    name: "O Multi-Funções",
    subtitle: "O Coringa",
    description: "Um jogador versátil capaz de atuar em múltiplas posições.",
    role: "Universal",
    difficulty: "Médio",
    attributeBonus: [
      { attr: "Agilidade", value: 3 },
      { attr: "Potência", value: 1 },
      { attr: "Técnica", value: 1 },
      { attr: "Velocidade", value: 1 }
    ],
    skillBonus: [
      { skill: "Defesa", value: 5 },
      { skill: "Reflexos", value: 5 },
      { skill: "Chute", value: 3 },
      { skill: "Cabeceio", value: 3 },
      { skill: "Pontaria", value: 3 },
      { skill: "Roubo de Bola", value: 5 },
      { skill: "Passe", value: 3 },
      { skill: "Corpo a Corpo", value: 3 },
      { skill: "Intuição", value: 3 },
      { skill: "Acrobacia", value: 3 }
    ],
    abilities: [
      {
        name: "Reação Explosiva",
        cost: "8 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Você reage rapidamente a qualquer situação.",
        bonus: "+5 em Reflexos."
      }
    ]
  },
  {
    id: "atacante-saltador",
    name: "O Atacante Saltador",
    subtitle: "O Rei do Ar",
    description: "Um jogador especializado em jogadas aéreas e finalizações de cabeça.",
    role: "Ataque",
    difficulty: "Fácil",
    attributeBonus: [
      { attr: "Potência", value: 3 },
      { attr: "Agilidade", value: 3 }
    ],
    skillBonus: [
      { skill: "Cabeceio", value: 7 },
      { skill: "Chute", value: 3 },
      { skill: "Corpo a Corpo", value: 5 },
      { skill: "Domínio", value: 5 },
      { skill: "Reflexos", value: 3 },
      { skill: "Roubo de Bola", value: 3 },
      { skill: "Passe", value: 5 },
      { skill: "Acrobacia", value: 5 }
    ],
    abilities: [
      {
        name: "Pressão do Gigante",
        cost: "Passiva",
        duration: "Permanente",
        type: "Passivo",
        description: "Sua presença é intimidadora.",
        bonus: "+3 em Cabeceio."
      },
      {
        name: "Impulso Aprimorado",
        cost: "12 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Um salto explosivo.",
        bonus: "+5 em Cabeceio e Acrobacia."
      }
    ]
  },
  {
    id: "defensor-espacial",
    name: "O Defensor Espacial",
    subtitle: "O Guardião",
    description: "Um defensor inteligente que usa o posicionamento para neutralizar ameaças.",
    role: "Defesa",
    difficulty: "Difícil",
    attributeBonus: [
      { attr: "Potência", value: 4 },
      { attr: "Agilidade", value: 4 },
      { attr: "Técnica", value: 1 },
      { attr: "Ego", value: 2 }
    ],
    skillBonus: [
      { skill: "Defesa", value: 7 },
      { skill: "Roubo de Bola", value: 7 },
      { skill: "Acrobacia", value: 5 },
      { skill: "Reflexos", value: 5 },
      { skill: "Passe", value: 5 },
      { skill: "Corrida a Longa Distância", value: 5 },
      { skill: "Intuição", value: 5 },
      { skill: "Corpo a Corpo", value: 5 },
      { skill: "Chute", value: 2 }
    ],
    abilities: [
      {
        name: "Bote da Serpente",
        cost: "15 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Um movimento defensivo rápido.",
        bonus: "+8 em Defesa e Roubo de Bola."
      },
      {
        name: "Defesa Impenetrável",
        cost: "15 FO",
        duration: "2 Rodadas (6 FO para manter)",
        type: "Ativo",
        description: "Você cria uma defesa quase impenetrável.",
        bonus: "+10 em Defesa."
      },
      {
        name: "Troca de Mentalidade",
        cost: "18 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Você muda sua mentalidade defensiva.",
        bonus: "+5 em qualquer perícia defensiva."
      }
    ]
  },
  {
    id: "louco-da-estamina",
    name: "O Louco da Estamina",
    subtitle: "A Máquina Incansável",
    description: "Um jogador com resistência física absurda.",
    role: "Universal",
    difficulty: "Médio",
    attributeBonus: [
      { attr: "Potência", value: 6 },
      { attr: "Velocidade", value: 2 }
    ],
    skillBonus: [
      { skill: "Corpo a Corpo", value: 7 },
      { skill: "Chute", value: 5 },
      { skill: "Reflexos", value: 3 },
      { skill: "Corrida a Longa Distância", value: 2 },
      { skill: "Explosão", value: 1 }
    ],
    abilities: [
      {
        name: "Objeto Imóvel",
        cost: "10 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Você se torna praticamente imóvel.",
        bonus: "+8 em Corpo a Corpo e Defesa."
      }
    ]
  },
  {
    id: "vilao-do-campo",
    name: "O Vilão do Campo",
    subtitle: "O Provocador",
    description: "Um jogador que usa a psicologia como arma.",
    role: "Ataque",
    difficulty: "Médio",
    attributeBonus: [
      { attr: "Potência", value: 3 },
      { attr: "Ego", value: 3 },
      { attr: "Técnica", value: 2 }
    ],
    skillBonus: [
      { skill: "Chute", value: 5 },
      { skill: "Drible", value: 5 },
      { skill: "Intimidação", value: 5 },
      { skill: "Corpo a Corpo", value: 5 },
      { skill: "Reflexos", value: 5 },
      { skill: "Presença", value: 5 }
    ],
    abilities: [
      {
        name: "Área do Rei",
        cost: "Passiva",
        duration: "Permanente",
        type: "Passivo",
        description: "Você possui uma área de domínio.",
        bonus: "+8 em Chute dentro de sua área."
      },
      {
        name: "Imprevisibilidade do Rei",
        cost: "Passiva",
        duration: "Permanente",
        type: "Passivo",
        description: "Você é imprevisível.",
        bonus: "Adversários não são afetados por habilidades que obrigam movimento."
      },
      {
        name: "Olho do Predador",
        cost: "15 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Você vê como um predador.",
        bonus: "+3 em Chute e +2 em Vantagem."
      },
      {
        name: "Filosofia Imperial",
        cost: "Passiva",
        duration: "Permanente",
        type: "Passivo",
        description: "Você possui uma filosofia pessoal.",
        bonus: "+3 em Chute enquanto mantiver sua filosofia."
      }
    ]
  },
  {
    id: "goleiro",
    name: "O Goleiro",
    subtitle: "A Última Barreira",
    description: "O goleiro é a última linha de defesa do time.",
    role: "Defesa",
    difficulty: "Difícil",
    attributeBonus: [
      { attr: "Agilidade", value: 8 },
      { attr: "Velocidade", value: 3 },
      { attr: "Ego", value: 3 },
      { attr: "Técnica", value: 3 }
    ],
    skillBonus: [
      { skill: "Defesa", value: 10 },
      { skill: "Passe", value: 5 },
      { skill: "Reflexos", value: 5 },
      { skill: "Acrobacia", value: 5 },
      { skill: "Intimidação", value: 5 },
      { skill: "Intuição", value: 8 }
    ],
    abilities: [
      {
        name: "Indução",
        cost: "14 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Você induz o adversário a chutar em um ângulo específico.",
        bonus: "Adversário recebe desvantagem em seu teste de Chute."
      },
      {
        name: "Coordenar Contra-Ataque",
        cost: "10 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Você coordena um contra-ataque.",
        bonus: "Concede 10 pés de deslocamento a um aliado e +5 em Passe."
      },
      {
        name: "Última Esperança",
        cost: "17 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Você faz uma última tentativa de defesa.",
        bonus: "Pode rolar novamente e somar +10."
      }
    ]
  },
  {
    id: "analista",
    name: "O Analista",
    subtitle: "O Estrategista",
    description: "Um jogador extremamente excêntrico capaz de ajudar de dentro ou de fora do campo.",
    role: "Suporte",
    difficulty: "Difícil",
    attributeBonus: [
      { attr: "Agilidade", value: 4 },
      { attr: "Técnica", value: 4 },
      { attr: "Ego", value: 3 },
      { attr: "Velocidade", value: 3 },
      { attr: "Inteligência", value: 8 }
    ],
    skillBonus: [
      { skill: "Passe", value: 5 },
      { skill: "Explosão", value: 5 },
      { skill: "Intuição", value: 5 },
      { skill: "Análise Individual", value: 8 },
      { skill: "Diplomacia", value: 5 },
      { skill: "Roubo de Bola", value: 5 },
      { skill: "Drible", value: 5 },
      { skill: "Reflexos", value: 5 },
      { skill: "Defesa", value: 5 },
      { skill: "Pontaria", value: 5 }
    ],
    abilities: [
      {
        name: "Inteligência Acima de Todos",
        cost: "Passiva",
        duration: "Permanente",
        type: "Passivo",
        description: "Você possui inteligência superior.",
        bonus: "+1 em todas as perícias que você possui ou venha a aprender."
      },
      {
        name: "Desista de Jogar",
        cost: "12 FO",
        duration: "3 Rodadas (6 FO para manter)",
        type: "Ativo",
        description: "Você analisa um adversário e o anula.",
        bonus: "Adversário perde bônus passivos e ativos."
      },
      {
        name: "Auxílio Ofensivo/Defensivo",
        cost: "12 FO",
        duration: "Variável",
        type: "Ativo",
        description: "Você auxilia seu time ofensiva ou defensivamente.",
        bonus: "+2 em testes para aliados a até 15 pés."
      },
      {
        name: "Análise Prolongada",
        cost: "13 FO",
        duration: "4 Rodadas (8 FO para manter)",
        type: "Ativo",
        description: "Você analisa um adversário prolongadamente.",
        bonus: "+4 em testes contra esse adversário."
      }
    ]
  },
  {
    id: "devorador-de-as",
    name: "O Devorador de Ás",
    subtitle: "O Perseguidor",
    description: "Um defensor extremamente focado em dizimar o artilheiro do time.",
    role: "Defesa",
    difficulty: "Médio",
    attributeBonus: [
      { attr: "Potência", value: 3 },
      { attr: "Técnica", value: 4 },
      { attr: "Velocidade", value: 2 },
      { attr: "Ego", value: 1 }
    ],
    skillBonus: [
      { skill: "Roubo de Bola", value: 5 },
      { skill: "Presença", value: 5 },
      { skill: "Intimidação", value: 5 },
      { skill: "Corpo a Corpo", value: 5 },
      { skill: "Reflexos", value: 5 },
      { skill: "Passe", value: 5 },
      { skill: "Explosão", value: 5 },
      { skill: "Corrida a Longa Distância", value: 5 },
      { skill: "Cabeceio", value: 5 },
      { skill: "Defesa", value: 5 }
    ],
    abilities: [
      {
        name: "Você é Meu",
        cost: "13 FO",
        duration: "3 Rodadas (5 FO para manter)",
        type: "Ativo",
        description: "Você marca um adversário constantemente.",
        bonus: "Adversário marcado tem -2 em testes e você ganha +3 em testes contra ele."
      }
    ]
  },
  {
    id: "cachorro-louco",
    name: "O Cachorro Louco",
    subtitle: "A Fera da Defesa",
    description: "Um defensor extremamente agressivo e intenso.",
    role: "Defesa",
    difficulty: "Médio",
    attributeBonus: [
      { attr: "Potência", value: 4 },
      { attr: "Agilidade", value: 3 },
      { attr: "Ego", value: 2 },
      { attr: "Técnica", value: 1 }
    ],
    skillBonus: [
      { skill: "Cabeceio", value: 5 },
      { skill: "Passe", value: 5 },
      { skill: "Defesa", value: 8 },
      { skill: "Reflexos", value: 7 },
      { skill: "Roubo de Bola", value: 6 },
      { skill: "Explosão", value: 5 },
      { skill: "Corpo a Corpo", value: 6 }
    ],
    abilities: [
      {
        name: "Cão Solto",
        cost: "Passiva",
        duration: "Permanente",
        type: "Passivo",
        description: "Você é um cão monstruoso em campo.",
        bonus: "+3 em Defesa, Roubo de Bola, Reflexos, Cabeceio e Explosão."
      }
    ]
  }
];

export const items = [
  {
    name: "Item Afetuoso",
    description: "Um item dado por alguém importante da sua família.",
    effects: "1 Vez por dia você possui vantagem desde que você esteja carregando o item.",
    price: "Sem preço (item pessoal)"
  },
  {
    name: "Garrafa D'água Pequena",
    description: "Uma garrafa d'água de 500ml",
    effects: "Gasta uma ação padrão para beber água e recupera 1d2+1 de fôlego. Possui 2 usos.",
    price: "226 Ienes"
  },
  {
    name: "Garrafa D'água Média",
    description: "Uma garrafa d'água média de 1,5l",
    effects: "Gasta uma ação padrão para beber e recupera 1d4+4 de fôlego. Possui 4 usos.",
    price: "339 Ienes"
  },
  {
    name: "Garrafa D'água Grande",
    description: "Uma garrafa d'água grande de 2l",
    effects: "Gasta uma ação padrão para beber e recuperar 1d8+8 de fôlego. Possui 6 usos.",
    price: "452 Ienes"
  },
  {
    name: "Chuteira Profissional",
    description: "Chuteira de alto desempenho para jogadores profissionais.",
    effects: "+2 Velocidade. Ignora penalidade leve de campo molhado.",
    price: "Equipamento Especial"
  },
  {
    name: "Munhequeira de Foco",
    description: "Munhequeira que auxilia na concentração mental durante o jogo.",
    effects: "+2 Concentração. -1 penalidade mental.",
    price: "Equipamento Especial"
  },
  {
    name: "Faixa de Capitão",
    description: "A faixa que simboliza a liderança do time.",
    effects: "+1 Trabalho em Equipe. Aliados +1 Moral.",
    price: "Equipamento Especial"
  },
  {
    name: "Garrafa Térmica Energética",
    description: "Garrafa especial com bebida energética de alto desempenho.",
    effects: "Recupera +10 Stamina. Uso único.",
    price: "Item Consumível"
  },
  {
    name: "Joelheira Reforçada",
    description: "Joelheira de proteção reforçada contra impactos.",
    effects: "-2 dano físico. +1 Resistência contra faltas.",
    price: "Equipamento Especial"
  },
  {
    name: "Óculos de Visão Tática",
    description: "Equipamento ótico que melhora a percepção tática em campo.",
    effects: "+2 Percepção. +1 leitura de jogadas.",
    price: "Equipamento Especial"
  },
  {
    name: "Bandagem de Recuperação",
    description: "Bandagem medicinal para recuperação pós-jogo.",
    effects: "Recupera +5 HP após partida.",
    price: "Item Consumível"
  },
  {
    name: "Caneleira Especial",
    description: "Caneleira reforçada para proteção contra jogadas físicas.",
    effects: "-1 dano de impacto. +1 contra jogadas físicas.",
    price: "Equipamento Especial"
  },
  {
    name: "Apito Tático",
    description: "Apito especial utilizado pelo narrador para reorganizações táticas.",
    effects: "Reorganização tática 1x por partida.",
    price: "Item Especial"
  },
  {
    name: "Kit Médico Portátil",
    description: "Kit de primeiros socorros para uso durante a partida.",
    effects: "Recupera +15 HP. Uso único.",
    price: "Item Consumível"
  }
];


export const mechanics = {
  passes: {
    title: "Passes e Complicações",
    description: "Passes são extremamente importantes para o futebol, pois geralmente são peças fundamentais na criação de uma jogada e na armação do ataque.",
    rules: [
      {
        title: "Distância Próxima e Visão Limpa",
        content: "Jogadores a 5-10 pés de distância com linha de visão livre não precisam fazer testes de Passe para um toque bem executado."
      },
      {
        title: "Dificuldades por Distância",
        content: "A partir de 15 pés: DT 15. A cada 5 pés adicionais, +5 na DT."
      },
      {
        title: "Resultado de Falha",
        content: "1 - Curto demais: bola para 5 pés do ponto inicial. 2 - Distância Média: bola para no meio da trajetória. 3 - Disputa Injusta: adversário tem vantagem. 4 - Longo demais: bola cai 5 ou 10 pés à frente."
      }
    ]
  },
  chutes: {
    title: "Chutes e Complicações",
    description: "Chutes são extremamente úteis em um jogo de futebol. O posicionamento pode auxiliar ou prejudicar as chances de marcar.",
    rules: [
      {
        title: "Chute com Perna Não Dominante",
        content: "O jogador perde totalmente seu bônus para qualquer tipo de finalização."
      },
      {
        title: "Chute Marcado",
        content: "Sendo marcado a 5 pés ou menos: -3 na finalização por marcador."
      },
      {
        title: "Chutes das Laterais",
        content: "-3 na finalização ao chutar de qualquer uma das laterais."
      },
      {
        title: "Penalidades por Distância",
        content: "5-10 pés fora da área: -4. 15+ pés: -15 ou penalidade maior a critério do narrador."
      }
    ]
  },
  dribles: {
    title: "Dribles e suas Complicações",
    description: "Para evitar dribladores completamente focados, é necessário implementar gradativamente algumas penalidades.",
    rules: [
      {
        title: "Gasto de Energia",
        content: "O narrador pode aplicar gasto de fôlego (2-3 pontos) por jogador que o driblador tente ultrapassar."
      },
      {
        title: "Desvantagem",
        content: "Após um número de jogadores, impor desvantagem. Modificadores podem diminuir gradativamente."
      }
    ]
  },
  furtividade: {
    title: "Furtividade",
    description: "Um jogador furtivo é capaz de ocultar sua presença dentro de campo.",
    rules: [
      {
        title: "Bônus Furtivo",
        content: "Jogadores furtivos ganham bônus sutil flutuante entre +1 a +4 dependendo da intenção."
      },
      {
        title: "Duração da Condição",
        content: "Após executar uma ação furtivo, perde a condição por no mínimo 2 rodadas."
      }
    ]
  },
  flanquear: {
    title: "Flanquear",
    description: "Uma equipe bem estratégica pode flanquear seu adversário.",
    rules: [
      {
        title: "Condição Flanqueado",
        content: "Com um jogador na frente e outro atrás: -3 para driblar e passes."
      },
      {
        title: "Condição Cercado",
        content: "Rodeado por todos os lados: -6 para passes e dribles."
      }
    ]
  },
  acoes: {
    title: "A Economia de Ações",
    description: "Cada jogador possui ações disponíveis em seu turno.",
    rules: [
      {
        title: "Preparar a Ação",
        content: "O jogador usa sua ação padrão para declarar uma ação futura com um gatilho."
      },
      {
        title: "Condição Intimidado",
        content: "-2 em Roubo De Bola, Defesa ou Reflexos contra quem intimidou."
      },
      {
        title: "Condição Convencido",
        content: "+2 para obedecer a ordem passada através de Diplomacia."
      }
    ]
  }
};

export const glossary = [
  { term: "FO", definition: "Fôlego - pontos usados para ativar habilidades das classes" },
  { term: "DT", definition: "Dificuldade - valor mínimo necessário em um teste para ter sucesso" },
  { term: "d20", definition: "Dado de 20 faces - principal dado usado no sistema" },
  { term: "Vantagem", definition: "Rolar o dado duas vezes e usar o maior resultado" },
  { term: "Desvantagem", definition: "Rolar o dado duas vezes e usar o menor resultado" },
  { term: "Ação Padrão", definition: "Ação principal do turno de um jogador" },
  { term: "Ação Bônus", definition: "Ação adicional disponível em certas situações" },
  { term: "Reação", definition: "Ação usada fora do turno do jogador" },
  { term: "Furtivo", definition: "Condição que torna o jogador difícil de ser detectado em campo" },
  { term: "Flanqueado", definition: "Condição de ter adversários na frente e atrás: -3 em dribles e passes" },
  { term: "Cercado", definition: "Condição de estar rodeado por todos os lados: -6 em passes e dribles" },
  { term: "Intimidado", definition: "Condição: -2 em Roubo De Bola, Defesa ou Reflexos contra o intimidador" },
  { term: "Convencido", definition: "Condição: +2 para obedecer a ordem passada por Diplomacia" },
  { term: "Fluxo", definition: "Estado de concentração extrema que potencializa as habilidades de um jogador" },
  { term: "Pés", definition: "Unidade de medida de distância usada no sistema (1 pé ≈ 30cm)" },
  { term: "Zona A", definition: "Área do campo próxima ao gol adversário" },
  { term: "Grande Área", definition: "Área retangular em frente ao gol" },
  { term: "Narrador", definition: "Jogador responsável por conduzir a história e arbitrar as regras" },
  { term: "NPC", definition: "Non-Player Character - personagem controlado pelo narrador" },
  { term: "Acerto Crítico", definition: "Resultado de 20 no d20, geralmente concede bônus especiais" }
];

export const trainingTips = [
  {
    category: "Atributos",
    title: "Como Distribuir Atributos",
    content: "Cada atributo define o valor máximo de uma perícia relacionada. Foque em 2-3 atributos principais para maximizar sua efetividade em campo."
  },
  {
    category: "Fôlego",
    title: "Gerenciando Fôlego",
    content: "Role 2d15 para definir seus pontos de fôlego iniciais. Use habilidades estrategicamente — guardar fôlego para momentos decisivos pode ser a diferença entre vitória e derrota."
  },
  {
    category: "Classes",
    title: "Escolhendo sua Classe",
    content: "Cada classe define seu estilo de jogo. Escolha baseado em como você quer jogar, não apenas nos números."
  },
  {
    category: "Habilidades",
    title: "Escolhendo sua Habilidade Inicial",
    content: "Cada classe oferece múltiplas habilidades para escolher ao iniciar. Considere o custo de fôlego, a duração e como a habilidade complementa seu estilo de jogo."
  },
  {
    category: "Perícias",
    title: "Perícias vs Atributos",
    content: "Atributos definem o máximo de uma perícia, mas você pode ter valores diferentes em perícias do mesmo atributo."
  },
  {
    category: "Trabalho em Equipe",
    title: "Sincronização e Combos",
    content: "Algumas habilidades são poderosas quando combinadas com companheiros de time. Planeje combos com outros jogadores antes da partida."
  }
];


export const skills = [
  // Potência
  {
    attribute: "Potência",
    name: "Corpo a Corpo",
    description: "Usada para demonstrar a força física de um personagem.",
    usage: "Sem habilidades específicas, usar para driblar com resultado menor que 18 causa falta."
  },
  {
    attribute: "Potência",
    name: "Cabeceio",
    description: "Demonstra a habilidade de cabeceio.",
    usage: "Usada em disputas aéreas, passes de cabeça e finalizações."
  },
  {
    attribute: "Potência",
    name: "Chute",
    description: "Demonstra o quão forte e destrutivo é um chute.",
    usage: "Usada para finalizações com força bruta."
  },
  // Técnica
  {
    attribute: "Técnica",
    name: "Pontaria",
    description: "Método de chute mais sofisticado que demonstra competência técnica.",
    usage: "Usada para finalizações precisas e bolas paradas."
  },
  {
    attribute: "Técnica",
    name: "Domínio",
    description: "Ao receber um passe com DT, o narrador pode exigir um teste de domínio.",
    usage: "Falha pode resultar na bola se afastando."
  },
  {
    attribute: "Técnica",
    name: "Passe",
    description: "Extremamente útil para qualquer jogador.",
    usage: "Usada em toda ação de passe, cruzamento ou lançamento."
  },
  {
    attribute: "Técnica",
    name: "Drible",
    description: "Jogadores com bons números são verdadeiras pontas de lança.",
    usage: "Usada para ultrapassar marcadores e criar espaço em campo."
  },
  {
    attribute: "Técnica",
    name: "Intuição",
    description: "Capaz de perceber jogadores furtivos através de instintos.",
    usage: "Usada para detectar furtividade e antecipar movimentos."
  },
  {
    attribute: "Técnica",
    name: "Roubo de Bola",
    description: "Usada por jogadores nas alas ofensivas e defensivas.",
    usage: "Sempre como reação ao drible de um adversário."
  },
  {
    attribute: "Técnica",
    name: "Furtividade",
    description: "Usada quando um jogador deseja mascarar sua presença.",
    usage: "Jogador furtivo obtém os benefícios da condição Furtivo."
  },
  // Velocidade
  {
    attribute: "Velocidade",
    name: "Corrida a Longa Distância",
    description: "Quando dois jogadores disputam velocidade para chegarem na bola primeiro.",
    usage: "Usada em corridas longas para disputar a bola."
  },
  {
    attribute: "Velocidade",
    name: "Explosão",
    description: "Quando um passe em profundidade é feito e dois jogadores disputam.",
    usage: "Usada em arrancadas curtas e disputas de bola próximas."
  },
  // Agilidade
  {
    attribute: "Agilidade",
    name: "Acrobacia",
    description: "Antes de chutes acrobáticos como voleio.",
    usage: "Resultado acima de 10: sucesso. Crítico (20): +2 no chute."
  },
  {
    attribute: "Agilidade",
    name: "Reflexos",
    description: "Muito utilizada para reagir a possíveis adversidades.",
    usage: "Usada como reação a chutes, passes e situações imprevistas."
  },
  {
    attribute: "Agilidade",
    name: "Defesa",
    description: "Centralmente dedicada aos goleiros para bloquear chutes.",
    usage: "Usada por goleiros para defesas e por jogadores em barreiras."
  },
  // Ego
  {
    attribute: "Ego",
    name: "Intimidação",
    description: "Impor medo ou sentimento de ameaça.",
    usage: "Sucesso por 3: -2 por 2 rodadas. Sucesso por 6: -3 por 3 rodadas."
  },
  {
    attribute: "Ego",
    name: "Presença",
    description: "Resiliência mental e capacidade de lidar com estresse.",
    usage: "Usada para resistir a intimidações e pressões psicológicas."
  },
  {
    attribute: "Ego",
    name: "Diplomacia",
    description: "Pode ser usada para livrar jogadores intimidados.",
    usage: "Resultado igual ou superior ao teste de intimidação liberta a vítima."
  },
  {
    attribute: "Ego",
    name: "Enganação",
    description: "Pode ser usada dentro do jogo para enganar oponentes.",
    usage: "Usada para fintas psicológicas e enganar adversários em campo."
  }
];
