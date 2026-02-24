// Blue Lock RPG - Data file
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
    skills: ["Pontaria", "Domínio", "Passe", "Drible/Finta", "Intuição", "Roubo de Bola", "Furtividade"]
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
    skills: ["Acrobacias", "Reflexos", "Defesa"]
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
  }
];

export const skillDescriptions: Record<string, string> = {
  "Corpo a Corpo": "Usada para demonstrar a força física de um personagem. Pode ser usada para travar a passagem de outro atleta com o próprio corpo. Jogadores que não possuam habilidades para driblar com corpo a corpo ainda podem tentar, mas um resultado final menor que 18 causa falta.",
  "Cabeceio": "Demonstra a habilidade de cabeceio, servindo tanto para passes de cabeça quanto para finalizações.",
  "Chute": "Demonstra o quão forte e destrutivo é um chute. Representa um canhão que destrói o que vier na frente, não necessariamente uma técnica sofisticada.",
  "Pontaria": "Método de chute mais sofisticado que demonstra competência técnica. Área de efetividade reduzida (geralmente apenas dentro da grande área). Também pode ser usada em bolas paradas.",
  "Domínio": "Ao receber um passe com DT, o narrador pode exigir um teste de domínio para que o atleta deixe a bola segura. Falha pode resultar na bola se afastando, permitindo interceptações.",
  "Passe": "Extremamente útil para qualquer jogador. Usada para passes, cruzamentos, passes em profundidade e passes curtos.",
  "Drible/Finta": "Jogadores com bons números são verdadeiras pontas de lança capazes de atravessar as linhas inimigas com ferocidade.",
  "Intuição": "Capaz de perceber jogadores furtivos através de instintos. Também pode ser utilizada para tentar entender estratégias dos adversários.",
  "Roubo de Bola": "Usada por jogadores nas alas ofensivas e defensivas. Sempre como reação para tentar roubar a bola de um jogador que tenta driblar.",
  "Furtividade": "Usada quando um jogador deseja mascarar/ocultar sua presença dentro de campo. Jogador furtivo obtém os benefícios da condição Furtivo.",
  "Corrida a Longa Distância": "Quando dois jogadores disputam velocidade para chegarem na bola primeiro, a partir de 15 pés ou mais de distância.",
  "Explosão": "Quando um passe em profundidade é feito e dois jogadores disputam para pegar a bola primeiro, a menos de 15 pés de distância.",
  "Acrobacias": "Antes de chutes acrobáticos como voleio, o narrador pode exigir um teste. Resultado acima de 10: sucesso. Acerto crítico (20): +2 na rolagem do chute. Abaixo de 6: falha automática no chute.",
  "Reflexos": "Muito utilizada para reagir a possíveis adversidades. Defensores podem se jogar na frente de chutes para desviar a finalização.",
  "Defesa": "Centralmente dedicada aos goleiros para bloquear chutes com as mãos. Jogadores na barreira também podem usar para bloquear ângulos.",
  "Intimidação": "Impor medo ou sentimento de ameaça. Sucesso por 3: -2 por 2 rodadas em testes contra o intimidador. Sucesso por 6: -3 por 3 rodadas. 20 natural: alvo trava por 1d2+1 rodadas em estado de choque.",
  "Presença": "Resiliência mental. Representa o quão bom o personagem é em lidar com estresse psicológico da torcida, afrontes do time adversário ou críticas.",
  "Diplomacia": "Pode ser usada para livrar jogadores intimidados. Resultado igual ou superior ao teste de intimidação liberta a vítima da penalidade.",
  "Enganação": "Não apenas verbal - pode ser usada dentro do jogo para enganar oponentes, fingindo ir para um lado e indo para o outro."
};

export const classes = [
  {
    id: "playmaker",
    name: "O Playmaker",
    subtitle: "O Craque do Time",
    description: "O playmaker é uma classe de excelência para aqueles que buscam compor qualquer elenco sem muita dificuldade. Capaz de finalizar para o gol, executar passes com precisão e driblar com maestria, é praticamente um jogador perfeito capaz de orquestrar o time ou servir como um atacante matador.",
    role: "Meio-Campo / Ataque",
    difficulty: "Médio",
    attributeBonus: [
      { attr: "Técnica", value: 3 },
      { attr: "Agilidade", value: 2 },
      { attr: "Ego", value: 2 }
    ],
    skillBonus: [
      { skill: "Passes", value: 5 },
      { skill: "Drible", value: 5 },
      { skill: "Pontaria", value: 5 },
      { skill: "Roubo de Bola", value: 5 },
      { skill: "Intuição", value: 5 },
      { skill: "Intimidação", value: 5 }
    ],
    abilities: [
      {
        name: "Percepção Espacial – Armador",
        cost: "13 FO",
        duration: "3 Rodadas (5 FO para manter)",
        type: "Ativo",
        description: "Seu olhar aguçado reunido com sua genialidade e percepção territorial lhe concede uma visão praticamente divina para analisar possíveis passes que levariam seu time a marcar um gol ou rotas de infiltração para dentro da grande área.",
        bonus: "+8 para passes, +4 para pontaria e +2 para dribles."
      },
      {
        name: "Sincronização",
        cost: "9 FO",
        duration: "2 Rodadas",
        type: "Ativo",
        description: "O playmaker escolhe um jogador do time voluntário e cria uma espécie de sincronização usando-se de sua genialidade. Através dessa sincronização ambos os jogadores adquirem uma precisão entre seus passes.",
        bonus: "+15 Em passes apenas entre esses dois jogadores."
      },
      {
        name: "Olhar do Tirano",
        cost: "8 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Usando de uma aura intensa o playmaker é capaz de tentar implantar uma ideia na mente de um companheiro que se vê praticamente obrigado a obedecê-la.",
        bonus: "+5 em Diplomacia ou Intimidação contra um companheiro. O alvo deve fazer teste de Presença para resistir."
      },
      {
        name: "Chute Preciso",
        cost: "10 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Com um chute extremamente preciso o playmaker é capaz de matar um lance sendo capaz de chutar de ângulos improváveis sem dificuldades e com genialidade.",
        bonus: "+5 Em Pontaria e não recebe a penalidade de -2 por chutar das laterais."
      }
    ]
  },
  {
    id: "dominador-superior",
    name: "O Dominador Superior",
    subtitle: "Mestre do Domínio",
    description: "Possui uma arma muito clara que o destaca perante os demais: seu domínio de bola é capaz de fazê-lo ficar à frente de muitos marcadores e abre brechas para suas próprias jogadas. Um jogador extremamente difícil de se marcar.",
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
        description: "Logo após receber um passe pode declarar usar essa habilidade. Um domínio preciso que mata o giro e impacto da bola perfeitamente ainda no ar, extremamente difícil de ser impedido.",
        bonus: "+5 Em Domínio, +5 Em Acrobacia e vantagem na primeira ação do próximo turno."
      },
      {
        name: "Armadilha De Domínio",
        cost: "8 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Um domínio surreal capaz de no último instante redirecionar a bola para outra direção e praticamente quebrar as pernas de qualquer marcador desavisado.",
        bonus: "Teste de enganação vs Intuição do marcador. Sucesso: abre 5 pés de espaço e adversário não pode reagir a movimentos posteriores."
      },
      {
        name: "Domínio Sob Pressão",
        cost: "12 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Mesmo sendo marcado, um jogador da classe de dominador é capaz de ser perigoso com extremo nível de eficiência em seus domínios.",
        bonus: "+10 Em testes de domínio mesmo sendo pressionado por uma marcação."
      },
      {
        name: "Impulso Do Gênio",
        cost: "16 FO",
        duration: "2 Rodadas",
        type: "Ativo",
        description: "O jogador desperta entrando em um estado de concentração extrema para marcar seu próximo gol e vencer a partida.",
        bonus: "+5 Em Drible, +5 em Pontaria e +5 em Roubo De Bola."
      }
    ]
  },
  {
    id: "velocista",
    name: "O Velocista",
    subtitle: "A Bala do Campo",
    description: "Extremamente hábil em rapidamente perfurar a defesa adversária em um contra-ataque. Jogadores velocistas são extremamente perigosos contra adversários mais lentos, criando facilmente uma distância considerável.",
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
      { skill: "Corrida longa distância", value: 5 },
      { skill: "Roubo De Bola", value: 5 },
      { skill: "Chute", value: 5 },
      { skill: "Explosão", value: 5 }
    ],
    abilities: [
      {
        name: "Drible Com Adiantamento",
        cost: "8 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Com extrema força em sua perna o velocista faz um 'drible' que mais parece uma arrancada com tudo passando seu adversário para trás com todo o potencial da sua velocidade.",
        bonus: "+5 em Explosão e pode usar para driblar o adversário."
      },
      {
        name: "Voo Pelo Campo",
        cost: "13 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Tensionando ao extremo suas pernas e músculos inferiores você dispara como uma pantera avassaladora chegando onde deseja praticamente em questão de uma fração de segundos.",
        bonus: "+10 Em Corrida a longa distância e +5 pés de deslocamento nesta rodada."
      },
      {
        name: "Chute Veloz",
        cost: "15 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Chutando com toda a potência que você possui, é capaz de aproveitar-se da sua velocidade para emendar um chute destrutivo através dela.",
        bonus: "Usa perícia de Chute normalmente, mas soma o atributo de Velocidade na finalização."
      },
      {
        name: "Fora da Bola",
        cost: "Passiva",
        duration: "Permanente",
        type: "Passivo",
        description: "Seu movimento em campo assemelha-se a um pássaro no céu, sendo capaz de manter uma excelente constância em sua velocidade diferentemente de outros velocistas.",
        bonus: "+5 pés de deslocamento enquanto não estiver em posse da bola."
      }
    ]
  },
  {
    id: "especialista-espacial",
    name: "O Especialista Espacial",
    subtitle: "O Gênio Tático",
    description: "Um jogador oportunista extremamente tático capaz de criar brechas através de seus passes. Possui estilo semelhante ao Playmaker, mas suas percepções sobre o campo e métodos para marcar gols são distintos.",
    role: "Meio-Campo / Ataque",
    difficulty: "Difícil",
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
        duration: "3 Rodadas (7 FO para manter)",
        type: "Ativo",
        description: "Como um verdadeiro líder tático do time você é capaz de conduzir o jogo ao seu favor para fazer seu gol e possui um forte instinto para sentir o gol vindo de alguém.",
        bonus: "+5 em Intuição. Jogadores a até 10 pés rolam D20 de sorte — o melhor resultado ganha +10 em Chute e Pontaria. Se o próprio Especialista ganhar, recebe também +8 em Furtividade."
      },
      {
        name: "Tiro Direto",
        cost: "5 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Você possui um chute direto extremamente mais calibrado do que a maioria dos jogadores, tanto em termos de potência quanto outros aspectos que englobam um chute bem executado.",
        bonus: "+5 em Chute ou Pontaria, sem penalidade por chutar sem dominar a bola. Pode chutar como reação."
      },
      {
        name: "Gênio da Adaptação",
        cost: "12 FO",
        duration: "2 Rodadas (3 FO para manter)",
        type: "Ativo",
        description: "Sendo um atacante com pouca capacidade de drible você precisa se adaptar da melhor forma possível. Se desconstruir é uma força e você sabe usar isso de maneira perfeita.",
        bonus: "+5 em qualquer perícia que ainda não possua proficiência pela duração da habilidade."
      }
    ]
  },
  {
    id: "finalizador-clinico",
    name: "O Finalizador Clínico",
    subtitle: "O Canhão Humano",
    description: "Um jogador extremamente destrutivo com uma arma única: seu chute. O melhor para a função de centroavante, sendo um canhão completamente de outro nível. O finalizador se aproveitará de qualquer brecha para marcar.",
    role: "Ataque",
    difficulty: "Fácil",
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
        description: "Um jogador finalizador capaz de finalizar com qualquer uma das pernas é um perigo muito maior do que aparenta, pois não há muitas situações em que um jogador consiga impedir seu chute.",
        bonus: "+6 em todos os seus chutes."
      },
      {
        name: "Sai De Cima",
        cost: "8 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Seu físico monstruoso lhe abençoa com uma força praticamente sobrenatural sendo capaz de subjugar marcadores que tentem impedir seus lances.",
        bonus: "+5 em Corpo a Corpo para tentar se desvencilhar da marcação."
      },
      {
        name: "Finalizador De Longa Distância",
        cost: "12 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Seus adversários devem se preocupar com você mesmo estando distante da grande área. Sua finalização é destrutiva a uma distância muito maior.",
        bonus: "Pode chutar da zona A ou das laterais sem penalidades e ganha +3 para essas finalizações."
      },
      {
        name: "Finalização Oportunista",
        cost: "14 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Um finalizador é capaz de chutar de qualquer ponto do campo, com qualquer perna e principalmente, a qualquer momento, criando a sua própria sorte.",
        bonus: "Quando um jogador errar um chute e o finalizador estiver a até 10 pés do gol: teste de Reflexos DT 17. Sucesso: corre até a bola e corrige com -2 na finalização."
      }
    ]
  },
  {
    id: "driblador",
    name: "O Driblador",
    subtitle: "A Fera Imprevisível",
    description: "Um jogador livre, imprevisível e fluído, com pouco raciocínio que simplesmente segue seus instintos como uma fera que almeja evoluir e devorar a tudo e a todos com intensidade praticamente impossível de acompanhar.",
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
        description: "Um estilo de jogo tão individualista que apenas você mesmo é capaz de criar alguém que lhe acompanhe — um monstro com forma humanoide feito de sombras que somente você é capaz de ver.",
        bonus: "+10 para passe e drible. O jogador que receber terá que fazer teste de domínio DT 17; sucesso: +3 na finalização."
      },
      {
        name: "Pico De Dopamina",
        cost: "18 FO",
        duration: "2 Rodadas (4 FO para manter)",
        type: "Ativo",
        description: "Em algum momento ápice do jogo ou quando o driblador se sente desafiado, ele entra em um estado de alegria e motivação monstruosa capaz de destruir qualquer lógica do esporte.",
        bonus: "+10 para driblar, +3 em Pontaria, +2 para Intuição e +2 para Acrobacia. Perde bônus em Passe de outras habilidades."
      },
      {
        name: "Passe Rápido",
        cost: "8 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Um passe de primeira pode ser muito eficaz para criar espaço para uma finalização ou facilitar a infiltração de um jogador. Pode simplesmente quebrar completamente todo o sistema defensivo.",
        bonus: "Ao receber um passe, pode usar reação para devolver rapidamente. +5 para o passe e o alvo pode se mover 5 pés antes de receber."
      },
      {
        name: "Pedalada",
        cost: "8 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Um drible que aparenta ser simples, mas guiado pelo ego e instinto com velocidade explosiva de movimentos nas pernas pode se tornar extremamente destrutivo.",
        bonus: "+5 em drible."
      },
      {
        name: "Chute Acrobático",
        cost: "8 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Um driblador é capaz de fazer dribles, passes e finalizações muito bem, mas principalmente suas jogadas merecem ser extravagantes.",
        bonus: "+5 em Pontaria."
      }
    ]
  },
  {
    id: "atacante-completo",
    name: "O Atacante Completo",
    subtitle: "O Camaleão",
    description: "Talvez pouco chamativo a princípio, mas isso se torna sua maior força. Capaz de atuar na defesa, no meio campo e no ataque com igual efetividade. Pode se equiparar a qualquer um em bom nível em troca de muito esforço.",
    role: "Universal",
    difficulty: "Difícil",
    attributeBonus: [
      { attr: "Livre (7 pontos, máx. +3 por atributo)", value: 7 }
    ],
    skillBonus: [
      { skill: "6 perícias à escolha do jogador", value: 5 }
    ],
    abilities: [
      {
        name: "Dupla Dinâmica",
        cost: "6 FO",
        duration: "2 Rodadas (5 FO posterior)",
        type: "Ativo",
        description: "Como um camaleão social e pouco chamativo em campo, o atacante completo é capaz de se adaptar a praticamente qualquer pessoa e seu estilo de jogo.",
        bonus: "+5 para Passes ao jogador sincronizado. O alvo define duas perícias para ganhar +3 ao receber o passe."
      },
      {
        name: "Camaleão Imperfeito",
        cost: "Igual à habilidade copiada",
        duration: "Variável",
        type: "Especial",
        description: "Pode copiar qualquer habilidade física de um atleta dentro do campo vendo ela ser usada ao menos uma vez. Não pode copiar técnicas que dependam de noções individuais ou fatores psicológicos.",
        bonus: "Copia habilidade com teste da perícia relacionada DT 14. Habilidades copiadas têm -2 no bônus. Apenas uma habilidade por vez."
      }
    ]
  },
  {
    id: "cacador-de-gols",
    name: "O Caçador de Gols",
    subtitle: "O Monstro Indomável",
    description: "Muito semelhante ao finalizador clínico, é um extremo egoísta cuja única preocupação é marcar gols e sentir a dopamina de ser o astro do time. Semelhante ao driblador, seu estilo de jogo é intenso e difícil de acompanhar.",
    role: "Ataque",
    difficulty: "Médio",
    attributeBonus: [
      { attr: "Potência", value: 3 },
      { attr: "Velocidade", value: 2 },
      { attr: "Ego", value: 3 },
      { attr: "Técnica", value: 1 }
    ],
    skillBonus: [
      { skill: "Chute", value: 5 },
      { skill: "Acrobacia", value: 5 },
      { skill: "Explosão", value: 5 },
      { skill: "Intimidação", value: 5 },
      { skill: "Enganação", value: 5 },
      { skill: "Corpo a Corpo", value: 5 },
      { skill: "Pontaria", value: 5 }
    ],
    abilities: [
      {
        name: "Chute Big Bang",
        cost: "10 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Um chute de voleio extremamente forte e que é capaz de pegar seus adversários de surpresa com uma finalização devastadora.",
        bonus: "+8 em Chute. Pode ser usado como voleio sem penalidade de acrobacia."
      },
      {
        name: "Instinto de Predador",
        cost: "12 FO",
        duration: "2 Rodadas",
        type: "Ativo",
        description: "Seu instinto aguçado de caçador lhe permite identificar a melhor oportunidade de gol antes mesmo que ela se concretize.",
        bonus: "+5 em Intuição e +3 em Chute. Pode usar Explosão no lugar de Reflexos para reagir a passes."
      }
    ]
  },
  {
    id: "atacante-controlador",
    name: "O Atacante Controlador",
    subtitle: "O Maestro Ofensivo",
    description: "Um jogador capaz de controlar o ritmo do jogo e criar oportunidades para si e para o time. Combina habilidades de armação com capacidade de finalização, sendo um perigo constante tanto como passador quanto como finalizador.",
    role: "Ataque / Meio-Campo",
    difficulty: "Difícil",
    attributeBonus: [
      { attr: "Técnica", value: 3 },
      { attr: "Ego", value: 2 },
      { attr: "Agilidade", value: 2 }
    ],
    skillBonus: [
      { skill: "Passe", value: 6 },
      { skill: "Drible", value: 5 },
      { skill: "Intuição", value: 5 },
      { skill: "Pontaria", value: 5 },
      { skill: "Enganação", value: 5 }
    ],
    abilities: [
      {
        name: "Controle Total",
        cost: "10 FO",
        duration: "3 Rodadas",
        type: "Ativo",
        description: "Você assume o controle total do fluxo do jogo, ditando o ritmo e criando oportunidades onde aparentemente não existem.",
        bonus: "+6 em Passe e +4 em Intuição. Pode usar Intuição no lugar de Reflexos para antecipar movimentos adversários."
      },
      {
        name: "Marionetista",
        cost: "8 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Como um maestro, você é capaz de mover um companheiro de time para a posição ideal através de suas instruções precisas.",
        bonus: "Concede 10 pés de deslocamento para qualquer direção a um aliado à escolha. O aliado ganha +3 na próxima ação."
      }
    ]
  },
  {
    id: "multi-funcoes",
    name: "O Multi-Funções",
    subtitle: "O Coringa",
    description: "Um jogador versátil capaz de atuar em múltiplas posições com eficiência. Não possui uma especialidade única, mas compensa com adaptabilidade e capacidade de suprir necessidades do time em qualquer situação.",
    role: "Universal",
    difficulty: "Médio",
    attributeBonus: [
      { attr: "Técnica", value: 2 },
      { attr: "Velocidade", value: 2 },
      { attr: "Agilidade", value: 2 },
      { attr: "Ego", value: 1 }
    ],
    skillBonus: [
      { skill: "5 perícias à escolha", value: 5 }
    ],
    abilities: [
      {
        name: "Adaptação Rápida",
        cost: "7 FO",
        duration: "2 Rodadas",
        type: "Ativo",
        description: "Você é capaz de se adaptar rapidamente a qualquer situação do jogo, mudando sua função e estilo de jogo conforme necessário.",
        bonus: "+4 em qualquer duas perícias à escolha do jogador por 2 rodadas."
      },
      {
        name: "Suporte Versátil",
        cost: "9 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Sua versatilidade permite que você auxilie qualquer companheiro de time de maneira eficiente, independente da situação.",
        bonus: "Concede +5 em qualquer perícia a um aliado para sua próxima ação."
      }
    ]
  },
  {
    id: "atacante-saltador",
    name: "O Atacante Saltador",
    subtitle: "O Rei do Ar",
    description: "Um jogador especializado em jogadas aéreas, capaz de dominar a bola no ar com maestria e finalizar de cabeça com precisão devastadora. Sua presença na área é um pesadelo para qualquer goleiro.",
    role: "Ataque",
    difficulty: "Fácil",
    attributeBonus: [
      { attr: "Potência", value: 3 },
      { attr: "Agilidade", value: 3 },
      { attr: "Ego", value: 1 }
    ],
    skillBonus: [
      { skill: "Cabeceio", value: 7 },
      { skill: "Acrobacia", value: 6 },
      { skill: "Domínio", value: 5 },
      { skill: "Reflexos", value: 5 },
      { skill: "Corpo a Corpo", value: 5 }
    ],
    abilities: [
      {
        name: "Salto Explosivo",
        cost: "8 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Suas pernas são molas comprimidas prontas para explodir em um salto devastador que deixa seus adversários no chão.",
        bonus: "+5 em Acrobacia para saltos e +3 em Cabeceio nesta ação."
      },
      {
        name: "Rei do Ar",
        cost: "Passiva",
        duration: "Permanente",
        type: "Passivo",
        description: "Você domina o espaço aéreo da área como nenhum outro, sendo praticamente impossível de ser superado em disputas aéreas.",
        bonus: "+4 em Cabeceio e vantagem em disputas aéreas contra jogadores sem habilidades específicas de salto."
      }
    ]
  },
  {
    id: "defensor-espacial",
    name: "O Defensor Espacial",
    subtitle: "O Guardião",
    description: "Um defensor inteligente que usa o posicionamento e a leitura de jogo para neutralizar ameaças antes mesmo que elas se concretizem. Prefere antecipar a reagir, controlando o espaço com maestria.",
    role: "Defesa",
    difficulty: "Difícil",
    attributeBonus: [
      { attr: "Agilidade", value: 3 },
      { attr: "Técnica", value: 2 },
      { attr: "Ego", value: 2 }
    ],
    skillBonus: [
      { skill: "Reflexos", value: 6 },
      { skill: "Intuição", value: 6 },
      { skill: "Roubo de Bola", value: 5 },
      { skill: "Passe", value: 5 },
      { skill: "Corrida longa distância", value: 5 }
    ],
    abilities: [
      {
        name: "Leitura de Jogo",
        cost: "10 FO",
        duration: "3 Rodadas",
        type: "Ativo",
        description: "Sua inteligência tática permite antecipar os movimentos adversários com precisão cirúrgica.",
        bonus: "+6 em Intuição e pode usar Intuição no lugar de Reflexos para interceptar passes e chutes."
      },
      {
        name: "Controle de Espaço",
        cost: "Passiva",
        duration: "Permanente",
        type: "Passivo",
        description: "Você controla o espaço ao seu redor de forma natural, tornando difícil para adversários se moverem livremente perto de você.",
        bonus: "Adversários a até 5 pés de você têm -2 em Drible e Explosão."
      }
    ]
  },
  {
    id: "louco-da-estamina",
    name: "O Louco da Estamina",
    subtitle: "A Máquina Incansável",
    description: "Um jogador com resistência física absurda, capaz de manter seu nível de jogo por toda a partida enquanto adversários se cansam. Sua estamina é sua maior arma, desgastando oponentes até o limite.",
    role: "Universal",
    difficulty: "Médio",
    attributeBonus: [
      { attr: "Velocidade", value: 3 },
      { attr: "Potência", value: 2 },
      { attr: "Agilidade", value: 2 }
    ],
    skillBonus: [
      { skill: "Corrida longa distância", value: 7 },
      { skill: "Explosão", value: 5 },
      { skill: "Corpo a Corpo", value: 5 },
      { skill: "Roubo de Bola", value: 5 },
      { skill: "Reflexos", value: 5 }
    ],
    abilities: [
      {
        name: "Segunda Respiração",
        cost: "Passiva",
        duration: "Permanente",
        type: "Passivo",
        description: "Quando outros jogadores começam a sentir o cansaço, você está apenas começando. Sua resistência física é incomparável.",
        bonus: "Não sofre penalidades por uso excessivo de drible. Recupera 2 pontos de fôlego por rodada sem usar habilidades."
      },
      {
        name: "Pressão Constante",
        cost: "11 FO",
        duration: "3 Rodadas",
        type: "Ativo",
        description: "Você pressiona seu adversário sem descanso, desgastando-o física e mentalmente até que ele cometa um erro.",
        bonus: "+5 em Roubo de Bola e Corpo a Corpo. Adversário marcado perde 1 ponto de fôlego por rodada que você estiver a até 5 pés."
      }
    ]
  },
  {
    id: "vilao-do-campo",
    name: "O Vilão do Campo",
    subtitle: "O Provocador",
    description: "Um jogador que usa a psicologia e a provocação como armas tão poderosas quanto suas habilidades técnicas. Capaz de desestabilizar adversários emocionalmente, fazendo-os cometerem erros cruciais.",
    role: "Universal",
    difficulty: "Médio",
    attributeBonus: [
      { attr: "Ego", value: 4 },
      { attr: "Técnica", value: 2 },
      { attr: "Agilidade", value: 1 }
    ],
    skillBonus: [
      { skill: "Intimidação", value: 7 },
      { skill: "Enganação", value: 6 },
      { skill: "Presença", value: 5 },
      { skill: "Drible", value: 5 },
      { skill: "Intuição", value: 5 }
    ],
    abilities: [
      {
        name: "Não Recuar",
        cost: "Passiva",
        duration: "Permanente",
        type: "Passivo",
        description: "Você é um atacante puro. Nunca recuará para além da metade do campo ou ajudará na defesa. Roubo de bola apenas para benefício de marcar seu próprio gol.",
        bonus: "+3 em Chute, Pontaria e Drible enquanto estiver no campo ofensivo. Quebrar a filosofia remove os bônus até o próximo jogo."
      },
      {
        name: "Aura do Vilão",
        cost: "12 FO",
        duration: "2 Rodadas",
        type: "Ativo",
        description: "Sua presença em campo é perturbadora. Você irradia uma energia negativa que desestabiliza adversários ao seu redor.",
        bonus: "+8 em Intimidação. Adversários a até 10 pés têm -2 em Presença e Diplomacia."
      }
    ]
  },
  {
    id: "goleiro",
    name: "O Goleiro",
    subtitle: "A Última Barreira",
    description: "O goleiro pode ser uma função pouco desenvolvida no Blue Lock, mas não menos útil ou satisfatória. Ser capaz de impedir o gol quando todos pensam que o jogador tem tudo para marcá-lo é uma sensação que apenas o goleiro tem o prazer de sentir.",
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
      { skill: "Reflexo", value: 5 },
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
        description: "Sendo a última linha de defesa, você se tornou extremamente hábil em induzir o adversário a chutar em um ângulo específico e defender o ponto que deixou 'exposto'.",
        bonus: "O adversário recebe desvantagem em seu teste de Chute. Usar após o adversário declarar o chute, mas antes de rolar os dados."
      },
      {
        name: "Coordenar Contra-Ataque",
        cost: "10 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Após a defesa, um goleiro diferenciado é capaz de coordenar através de suas palavras um membro do time para uma posição perfeita para o contra-ataque.",
        bonus: "Ao defender um chute: define um jogador e concede 10 pés de deslocamento. +5 em Passe para o toque ao jogador determinado."
      },
      {
        name: "Última Esperança",
        cost: "17 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Se alongando no último nível possível que suas articulações permitem para bloquear com o último fio de esperança o chute do adversário.",
        bonus: "Após ver o resultado no dado, pode usar a habilidade e rolar novamente somando +10 na rolagem."
      }
    ]
  },
  {
    id: "ninja",
    name: "O Ninja",
    subtitle: "A Sombra do Campo",
    description: "Um jogador capaz de camuflar sua presença e utilizar disso para auxiliar os armadores do time a executarem seus passes e, vez ou outra, aproveitar-se da sua 'invisibilidade' para achar uma oportunidade de gol.",
    role: "Ataque / Suporte",
    difficulty: "Difícil",
    attributeBonus: [
      { attr: "Agilidade", value: 2 },
      { attr: "Técnica", value: 2 },
      { attr: "Ego", value: 1 },
      { attr: "Velocidade", value: 1 }
    ],
    skillBonus: [
      { skill: "Furtividade", value: 8 },
      { skill: "Pontaria", value: 5 },
      { skill: "Presença", value: 5 },
      { skill: "Passe", value: 5 },
      { skill: "Roubo de Bola", value: 5 },
      { skill: "Reflexo", value: 5 }
    ],
    abilities: [
      {
        name: "Caminhar Fantasma",
        cost: "Passiva",
        duration: "Permanente",
        type: "Passivo",
        description: "Sendo um ninja você é extremamente hábil em ficar invisível para os demais jogadores.",
        bonus: "+10 em Furtividade com vantagem nos testes. Estando furtivo, não gera reações independente da proximidade com adversários."
      },
      {
        name: "Roubo Fantasma",
        cost: "8 FO",
        duration: "3 Rodadas (5 FO para manter)",
        type: "Ativo",
        description: "De maneira sutil você é capaz de se aproximar dos seus adversários sem ser notado e roubar a posse da bola agilmente.",
        bonus: "+7 em Roubo de Bola."
      },
      {
        name: "Chute Sombrio",
        cost: "7 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Você é capaz de chegar na grande área do gol sem ser notado pelos seus adversários e pelo goleiro, sendo tarde demais quando notam sua presença.",
        bonus: "+5 em Pontaria desde que esteja furtivo."
      },
      {
        name: "Tabela com a Sombra",
        cost: "6 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Você é capaz de agir tão rapidamente que não é detectado mesmo tocando na bola por fazer isso com muita velocidade.",
        bonus: "Ao receber um passe furtivo: reação para conceder 5 pés ao passador. Não perde condição de furtivo. +5 em Passe."
      }
    ]
  },
  {
    id: "imperador",
    name: "O Imperador",
    subtitle: "O Jogador Perfeito",
    description: "Um jogador sublime, sofisticado, objetivo e que por muitos pode ser considerado 'perfeito'. Extremamente agressivo dentro de campo, capaz de fazer um time inteiro girar em torno de si. Um perito em destruir o ego e esmagar seus adversários.",
    role: "Ataque",
    difficulty: "Muito Difícil",
    attributeBonus: [
      { attr: "Potência", value: 4 },
      { attr: "Ego", value: 4 },
      { attr: "Técnica", value: 3 }
    ],
    skillBonus: [
      { skill: "Drible", value: 5 },
      { skill: "Chute", value: 5 },
      { skill: "Passe", value: 5 },
      { skill: "Intimidação", value: 5 },
      { skill: "Presença", value: 5 },
      { skill: "Roubo De Bola", value: 5 },
      { skill: "Corpo a Corpo", value: 5 },
      { skill: "Reflexos", value: 5 }
    ],
    abilities: [
      {
        name: "Meta Visão (Inicial)",
        cost: "Passiva",
        duration: "Permanente",
        type: "Passivo",
        description: "Dotado de percepção extremamente alta, você usa sua visão periférica para reunir informações e calcular rotas/trajetos para controlar o fluxo do jogo.",
        bonus: "+1 em todas as perícias. Adversários só podem reagir aos seus passes/chutes se tiverem perícia maior ou usarem habilidades. Dois modos: Artilheiro (+3 em Chute/Drible/Presença) ou Defensor (+3 em Corpo a Corpo/Reflexos/Roubo)."
      },
      {
        name: "Impact",
        cost: "17 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Você possui um chute extremamente veloz e potente, capaz de chegar ao gol extremamente rápido e com uma precisão de outro mundo.",
        bonus: "Sem penalidade por chutar a até 10 pés da grande área. +3 em Chute e Vantagem no teste."
      },
      {
        name: "Ajoelhe-se",
        cost: "Passiva",
        duration: "Permanente",
        type: "Passivo",
        description: "Seus dribles são mortais. Movimentos rápidos unidos com sofisticação e técnica impecáveis fazem alguns movimentos acabarem com o equilíbrio do oponente.",
        bonus: "Ao usar Drible com resultado 19 ou 20: derruba o adversário (gasta metade do deslocamento para levantar). +2 na próxima perícia usada."
      },
      {
        name: "Zona de Perigo",
        cost: "14 FO",
        duration: "2 Rodadas",
        type: "Ativo",
        description: "Você impõe uma presença amedrontadora como a de um monstro faminto. Aqueles que entrarem dentro desta área saberão o verdadeiro significado de medo.",
        bonus: "Aura de 5 pés de diâmetro. Teste de Presença DT 10+Presença. Falha por ≤4: -1 em todos os testes. Falha por >5: não consegue entrar na área."
      }
    ]
  },
  {
    id: "devorador-de-as",
    name: "O Devorador de Ás",
    subtitle: "O Caçador de Estrelas",
    description: "Extremamente focado em dizimar o jogador artilheiro do time adversário. Um verdadeiro 'pé no saco' de qualquer jogador que se destaca demais, diferentemente de outros defensores que marcam múltiplos jogadores.",
    role: "Defesa",
    difficulty: "Médio",
    attributeBonus: [
      { attr: "Potência", value: 3 },
      { attr: "Técnica", value: 4 },
      { attr: "Velocidade", value: 2 },
      { attr: "Ego", value: 1 }
    ],
    skillBonus: [
      { skill: "Roubo De Bola", value: 5 },
      { skill: "Presença", value: 5 },
      { skill: "Intimidação", value: 5 },
      { skill: "Corpo a Corpo", value: 5 },
      { skill: "Reflexos", value: 5 },
      { skill: "Passes", value: 5 },
      { skill: "Explosão", value: 5 },
      { skill: "Corrida a Longa distância", value: 5 },
      { skill: "Cabeceio", value: 5 },
      { skill: "Defesa", value: 5 }
    ],
    abilities: [
      {
        name: "\"Você é Meu\"",
        cost: "13 FO",
        duration: "3 Rodadas (5 FO para manter)",
        type: "Ativo",
        description: "Você é um perseguidor extremamente irritante e determinado que caçará sua presa constantemente, geralmente anulando ou prejudicando qualquer jogada que a envolva.",
        bonus: "Alvo marcado tem desvantagem em Reflexo, Corrida, Explosão, Enganação, Intimidação ou Drible contra você. Pode se mover junto ao alvo quando ele se mover (máx. 10 pés de distância)."
      },
      {
        name: "Devorador de Ás",
        cost: "Passiva",
        duration: "Permanente",
        type: "Passivo",
        description: "Você é um caçador de Ás extremamente problemático para times que girem em torno de um único jogador, ignorando completamente os outros.",
        bonus: "Estando a 5 pés do artilheiro: +5 em Roubo, Defesa, Reflexos, Corpo a Corpo, Intimidação e Presença. O marcado tem -2 em Chute, Pontaria, Drible, Enganação, Corpo a Corpo e Domínio."
      }
    ]
  },
  {
    id: "analista",
    name: "O Analista",
    subtitle: "O Gênio Estratégico",
    description: "Um jogador extremamente excêntrico capaz de ajudar de dentro ou de fora do campo. Suas estratégias são os pilares de sua força. Capaz de anular por inteiro através de seu QI um adversário caso seja bem sucedido em suas análises.",
    role: "Suporte",
    difficulty: "Muito Difícil",
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
      { skill: "Analise Individual", value: 8 },
      { skill: "Diplomacia", value: 5 },
      { skill: "Roubo De Bola", value: 5 },
      { skill: "Drible", value: 5 },
      { skill: "Reflexo", value: 5 },
      { skill: "Defesa", value: 5 },
      { skill: "Pontaria", value: 5 }
    ],
    abilities: [
      {
        name: "Inteligência Acima De Todos",
        cost: "Passiva",
        duration: "Permanente",
        type: "Passivo",
        description: "Habilidade especial que concede ao Analista não apenas um atributo novo (Inteligência) quanto uma perícia nova (Análise Individual). Todos os analistas naturalmente a possuem.",
        bonus: "Atributo Inteligência e perícia Análise Individual desbloqueados. Análise Individual serve como base para muitas habilidades da classe."
      },
      {
        name: "Desista De Jogar",
        cost: "12 FO",
        duration: "3 Rodadas (6 FO para manter)",
        type: "Ativo",
        description: "Um jogador capaz de analisar seu adversário com clareza e entender seu estilo de jogo para impossibilita-lo de fazê-lo funcionar.",
        bonus: "Teste de Análise Individual acima de 20: ANULA uma habilidade qualquer do adversário (passivas, ativas ou de Fluxo)."
      },
      {
        name: "Auxilio Ofensivo/Defensivo",
        cost: "Passiva",
        duration: "Permanente",
        type: "Passivo",
        description: "Sendo uma torre de comando para o time, você administra com mais efetividade os seus arredores e coordena ataque/defesa com mais proficiência.",
        bonus: "Campo ofensivo: genéricos a 15 pés +2 em tudo e +5 pés. Players: +2 em Drible/Chute/Pontaria/Cabeceio/Domínio. Campo defensivo: todos a 20 pés +5 pés e +1 em Roubo/Defesa/Reflexo/Explosão/Corrida/Passe."
      },
      {
        name: "Auxilio De Jogada",
        cost: "12 FO",
        duration: "Variável",
        type: "Ativo",
        description: "Você é capaz de auxiliar com perfeição um jogador durante sua jogada, servindo como um perfeito suporte para que ele consiga jogar mais livremente.",
        bonus: "+3 em qualquer perícia para reagir a qualquer coisa que o jogador escolhido solicite. Reações 'infinitas' enquanto o alvo pedir os testes."
      },
      {
        name: "Analise Prolongada",
        cost: "13 FO",
        duration: "4 Rodadas (8 FO para manter)",
        type: "Ativo",
        description: "Você analisa um adversário de maneira prolongada, reparando seus métodos de jogo para anular suas aptidões com excelência.",
        bonus: "Após adversário usar a mesma perícia 4 vezes: Análise Individual DT 16. Sucesso: anula metade do valor da perícia (baseado na Inteligência) a até 20 pés."
      }
    ]
  },
  {
    id: "cachorro-louco",
    name: "O Cachorro Louco",
    subtitle: "A Besta Defensiva",
    description: "Um jogador extremamente agressivo e intenso dentro do campo como defensor, capaz de esmagar seus adversários com extrema brutalidade e ferocidade. Sua principal arma é sua gana para defender o gol com coragem e convicção de vitória.",
    role: "Defesa",
    difficulty: "Fácil",
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
      { skill: "Reflexo", value: 7 },
      { skill: "Roubo De Bola", value: 6 },
      { skill: "Explosão", value: 5 },
      { skill: "Corpo a Corpo", value: 6 }
    ],
    abilities: [
      {
        name: "Cão Solto",
        cost: "Passiva",
        duration: "Permanente",
        type: "Passivo",
        description: "Você é um cão monstruoso em campo sendo capaz de marcar com extrema gana e potência seus adversários.",
        bonus: "+3 em Defesa, Roubo de Bola, Reflexos, Cabeceio e Explosão."
      },
      {
        name: "Continuem o Ataque!",
        cost: "10 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Você não aceita que seu time perca o ataque por bobagem, sendo capaz de manter a posse da bola mesmo quando ela está prestes a escapar.",
        bonus: "A 15 pés da bola espalmada/lateral: Reflexos ou Explosão com vantagem DT 17. Sucesso: rebote milagroso para o aliado mais próximo (ou para si se nenhum a 10 pés)."
      },
      {
        name: "Corta Luz",
        cost: "8 FO",
        duration: "Instantâneo",
        type: "Ativo",
        description: "Você é muito experiente na defesa e suporte do seu time, sendo capaz de ler os movimentos dos aliados e a reação dos adversários.",
        bonus: "+5 em Reflexos para interceptar passes destinados a adversários. Pode usar Corpo a Corpo para bloquear o caminho de um atacante."
      }
    ]
  }
];

export const mechanics = {
  passes: {
    title: "Passes e Complicações",
    description: "Passes são extremamente importantes para o futebol, pois geralmente são peças fundamentais na criação de uma jogada e na armação do ataque. Existem diversas complicações que podem dificultar a execução de um passe.",
    rules: [
      {
        title: "Distância Próxima e Visão Limpa",
        content: "Jogadores a 5-10 pés de distância com linha de visão livre não precisam fazer testes de Passe para um toque bem executado."
      },
      {
        title: "Dificuldades por Distância",
        content: "A partir de 15 pés: DT 15. A cada 5 pés adicionais, +5 na DT (Ex: 20 pés = DT 20)."
      },
      {
        title: "Resultado de Falha (1d4)",
        content: "1 - Curto demais: bola para 5 pés do ponto inicial. 2 - Distância Média: bola para no meio da trajetória. 3 - Disputa Injusta: adversário tem vantagem para interceptar. 4 - Longo demais: bola cai 5 ou 10 pés à frente do alvo (1d2)."
      },
      {
        title: "Alvo Marcado ou Adversários na Trajetória",
        content: "Com adversários a até 5 pés da trajetória: gerar teste de Reflexos para interceptação é mais recomendado que aumentar DT."
      }
    ]
  },
  chutes: {
    title: "Chutes e Complicações",
    description: "Chutes são extremamente úteis em um jogo de futebol. O narrador e os jogadores devem entender que se colocar em uma posição boa ou ruim pode auxiliar ou prejudicar as chances de marcar.",
    rules: [
      {
        title: "Chute com Perna Não Dominante",
        content: "O jogador perde totalmente seu bônus para qualquer tipo de finalização. Soma-se com a condição de Chute Marcado."
      },
      {
        title: "Chute Marcado",
        content: "Sendo marcado a 5 pés ou menos: -3 na finalização por marcador (cumulativo por cada marcador adicional). O marcador pode usar Defesa ou Roubo de Bola como reação."
      },
      {
        title: "Chutes das Laterais",
        content: "-3 na finalização ao chutar de qualquer uma das laterais."
      },
      {
        title: "Penalidades por Distância",
        content: "5-10 pés fora da área: -4. 15+ pés: -15 (ou penalidade maior a critério do narrador). Distâncias acima de 15 pés geralmente não são permitidas."
      },
      {
        title: "Bônus Situacionais",
        content: "1v1 contra o goleiro: +5. Angulação bem pensada: +1 a +4. Finalizações bem descritas: bônus a critério do narrador."
      }
    ]
  },
  dribles: {
    title: "Dribles e suas Complicações",
    description: "Para evitar dribladores completamente focados que driblam o time inteiro o jogo inteiro, é necessário implementar gradativamente algumas penalidades.",
    rules: [
      {
        title: "Gasto de Energia",
        content: "O narrador pode aplicar gasto de fôlego (2-3 pontos) por jogador que o driblador tente ultrapassar após uma quantidade (recomendado: 3-5 jogadores)."
      },
      {
        title: "Desvantagem",
        content: "Após um número de jogadores, impor desvantagem. Modificadores podem diminuir gradativamente: -2 em drible após o 2° jogador driblado."
      }
    ]
  },
  furtividade: {
    title: "Furtividade",
    description: "Um jogador furtivo é capaz de ocultar sua presença dentro de campo. Para outros jogadores não avisados, ele parece 'invisível' e se torna indetectável.",
    rules: [
      {
        title: "Bônus Furtivo",
        content: "Jogadores furtivos ganham bônus sutil flutuante entre +1 a +4 dependendo da intenção (ex: +3 para roubo de bola furtivo)."
      },
      {
        title: "Duração da Condição",
        content: "Após executar uma ação furtivo, perde a condição por no mínimo 2 rodadas sem poder rolar furtividade novamente (exceto Ninja)."
      }
    ]
  },
  flanquear: {
    title: "Flanquear",
    description: "Uma equipe bem estratégica pode flanquear seu adversário e até encurralá-lo deixando-o sem opções de saída.",
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
    description: "Cada jogador possui ações disponíveis em seu turno. Entender como gerenciar essas ações é fundamental para jogar bem.",
    rules: [
      {
        title: "Preparar a Ação",
        content: "O jogador usa sua ação padrão para declarar uma ação futura com um gatilho. Após preparar, tem ação bônus e movimento restante. Se o gatilho não se concretizar, a ação é perdida."
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
  { term: "d4, d6, d8...", definition: "Dados de 4, 6, 8 faces - usados em situações específicas" },
  { term: "Vantagem", definition: "Rolar o dado duas vezes e usar o maior resultado" },
  { term: "Desvantagem", definition: "Rolar o dado duas vezes e usar o menor resultado" },
  { term: "Ação Padrão", definition: "Ação principal do turno de um jogador" },
  { term: "Ação Bônus", definition: "Ação adicional disponível em certas situações" },
  { term: "Reação", definition: "Ação usada fora do turno do jogador, geralmente em resposta a algo" },
  { term: "Furtivo", definition: "Condição que torna o jogador difícil de ser detectado em campo" },
  { term: "Flanqueado", definition: "Condição de ter adversários na frente e atrás: -3 em dribles e passes" },
  { term: "Cercado", definition: "Condição de estar rodeado por todos os lados: -6 em passes e dribles" },
  { term: "Intimidado", definition: "Condição: -2 em Roubo De Bola, Defesa ou Reflexos contra o intimidador" },
  { term: "Convencido", definition: "Condição: +2 para obedecer a ordem passada por Diplomacia" },
  { term: "Choque", definition: "Estado de paralisia causado por intimidação crítica (20 natural): trava por 1d2+1 rodadas" },
  { term: "Fluxo", definition: "Estado de concentração extrema que potencializa as habilidades de um jogador" },
  { term: "Pés", definition: "Unidade de medida de distância usada no sistema (1 pé ≈ 30cm)" },
  { term: "Zona A", definition: "Área do campo próxima ao gol adversário" },
  { term: "Grande Área", definition: "Área retangular em frente ao gol" },
  { term: "Narrador", definition: "Jogador responsável por conduzir a história e arbitrar as regras" },
  { term: "NPC", definition: "Non-Player Character - personagem controlado pelo narrador" },
  { term: "Acerto Crítico", definition: "Resultado de 20 no d20, geralmente concede bônus especiais" },
  { term: "Modificador", definition: "Valor somado ou subtraído de um teste" },
  { term: "Proficiência", definition: "Bônus aplicado em perícias que o personagem domina" }
];

export const trainingTips = [
  {
    category: "Atributos",
    title: "Como Distribuir Atributos",
    content: "Cada atributo define o valor máximo de uma perícia relacionada. Se você tem Potência 6, pode ter Chute com valor máximo +6. Foque em 2-3 atributos principais para maximizar sua efetividade em campo."
  },
  {
    category: "Fôlego",
    title: "Gerenciando Fôlego",
    content: "Role 2d15 para definir seus pontos de fôlego iniciais. Para aventuras, o narrador deve conceder no mínimo 12 pontos. Use habilidades estrategicamente — guardar fôlego para momentos decisivos pode ser a diferença entre vitória e derrota."
  },
  {
    category: "Classes",
    title: "Escolhendo sua Classe",
    content: "Cada classe define seu estilo de jogo. Playmakers são versáteis, Velocistas são simples mas eficazes, Imperadores são poderosos mas complexos. Escolha baseado em como você quer jogar, não apenas nos números."
  },
  {
    category: "Habilidades",
    title: "Escolhendo sua Habilidade Inicial",
    content: "Cada classe oferece múltiplas habilidades para escolher ao iniciar. Considere o custo de fôlego, a duração e como a habilidade complementa seu estilo de jogo e o restante do time."
  },
  {
    category: "Perícias",
    title: "Perícias vs Atributos",
    content: "Atributos definem o máximo de uma perícia, mas você pode ter valores diferentes em perícias do mesmo atributo. Um jogador pode ter Técnica 6 mas Drible +7 e Passe +3 — mostrando onde ele é especialista."
  },
  {
    category: "Trabalho em Equipe",
    title: "Sincronização e Combos",
    content: "Algumas habilidades como Sincronização (Playmaker) e Dupla Dinâmica (Atacante Completo) são poderosas quando combinadas com companheiros de time. Planeje combos com outros jogadores antes da partida."
  }
];
