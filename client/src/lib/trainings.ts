export interface Training {
  id: string;
  name: string;
  description: string;
  effect: string;
  category: "Geral" | "Especializado" | "Avançado";
}

// Nota: As Habilidades Avançadas (Meta Visão e Percepção Espacial) não podem ser escolhidas
// por classes que já possuam essas habilidades em seu kit de classe.

export const trainings: Training[] = [
  {
    id: "passe-pos-drible",
    name: "Passe Pós Drible",
    description: "Treinamento focado em manter a precisão após desequilibrar a marcação.",
    effect: "Logo após efetuar um drible com ação de movimento, o bônus de passe na ação padrão se torna +4 (em vez de +2).",
    category: "Geral"
  },
  {
    id: "cruzamento-alta-precisao",
    name: "Cruzamento com Alta Precisão",
    description: "Especialista em bolas alçadas na área.",
    effect: "A DT do passe para cruzamentos laterais é 15, desde que o alvo esteja na sua linha do campo.",
    category: "Geral"
  },
  {
    id: "comandante-discreto",
    name: "Comandante Discreto",
    description: "Comunicação gestual avançada com o time.",
    effect: "Após 1 semana com o time, você pode dar ordens gestuais (não verbais) para aliados a até 25 pés.",
    category: "Geral"
  },
  {
    id: "suporte-finalizacao",
    name: "Suporte Para Finalização",
    description: "Passes que 'chamam' o gol.",
    effect: "Pode efetuar passes 5 pés à frente do alvo. Se o aliado receber, ganha +1 em Chute ou Pontaria.",
    category: "Geral"
  },
  {
    id: "jogada-ensaidada-aprimorada",
    name: "Jogada Ensaiada Aprimorada",
    description: "Sincronia perfeita em bolas paradas.",
    effect: "+2 em Chute, Passe, Pontaria ou Cabeçada para até dois jogadores envolvidos em faltas/escanteios ensaiados.",
    category: "Geral"
  },
  {
    id: "chute-direto-precisao",
    name: "Chute Direto Com Precisão",
    description: "Capacidade de finalizar de primeira com técnica.",
    effect: "Pode executar chute direto (na grande área) com reação usando os bônus de uma ação padrão.",
    category: "Geral"
  },
  {
    id: "ambidestria-treinada",
    name: "Ambidestria Treinada",
    description: "Desenvolvimento da perna não dominante.",
    effect: "Ao usar a perna ruim, você mantém 1/4 do seu modificador de Chute (arredondado para baixo) em vez de perder tudo.",
    category: "Geral"
  },
  {
    id: "um-dois-velocidade",
    name: "1,2 (Tabela Veloz)",
    description: "Sincronia rápida para tabelas curtas.",
    effect: "Pode fazer passe com aliado a até 5 pés e usar drible para escapar de marcação de corpo a corpo. O aliado pode se mover 5 pés se devolver o passe.",
    category: "Geral"
  },
  {
    id: "defensor-territorial",
    name: "Defensor Territorial",
    description: "Domínio de uma área específica da defesa.",
    effect: "Escolha uma área de 10 pés na sua zona defensiva: ganha +1 em Roubo de Bola e Defesa nela.",
    category: "Geral"
  },
  {
    id: "escanteio-perigoso",
    name: "Escanteio Perigoso",
    description: "Especialista em cobranças de escanteio diretas.",
    effect: "Pode chutar direto para o gol do escanteio sem penalidade de distância (não pode usar habilidades ativas no lance).",
    category: "Geral"
  },
  {
    id: "ponta-assassino",
    name: "Ponta Assassino",
    description: "Domínio total das alas do campo.",
    effect: "+5 pés de movimento nas laterais. Velocistas ganham vantagem em Explosão/Corrida nas laterais.",
    category: "Geral"
  },
  {
    id: "impulso-final",
    name: "Impulso Final",
    description: "Garra extra nos minutos finais.",
    effect: "+1 em todas as rolagens nas últimas 3 rodadas do segundo período da partida.",
    category: "Geral"
  },
  {
    id: "determinacao-aco",
    name: "Determinação de Aço (Goleiro)",
    description: "Persistência mesmo sob lesão.",
    effect: "Uma vez por partida, ignora penalidades de lesão para um teste de Defesa. A lesão piora em 1 grau após o lance.",
    category: "Especializado"
  },
  {
    id: "cai-cai",
    name: "Cai, Cai",
    description: "Mestre em cavar faltas.",
    effect: "Se falhar num drible contra Corpo a Corpo, role Enganação. Sucesso declara falta e evita lesão (se o oponente não tirou 20).",
    category: "Geral"
  },
  {
    id: "drenagem-energia",
    name: "Drenagem de Energia",
    description: "Marcador incansável que desgasta o oponente.",
    effect: "Ao vencer um Roubo de Bola, o oponente perde 1d4 de fôlego.",
    category: "Geral"
  },
  {
    id: "cooperativo",
    name: "Cooperativo",
    description: "Liderança que inspira aliados genéricos.",
    effect: "NPCs genéricos a até 15 pés ganham +5 pés de deslocamento e +1 em perícias.",
    category: "Geral"
  },
  {
    id: "precognicao",
    name: "Precognição",
    description: "Capacidade de antecipar jogadas.",
    effect: "Roda 4d20 no início e usa esses resultados na ordem para as próximas 4 perícias.",
    category: "Especializado"
  },
  {
    id: "retomar-folego",
    name: "Retomar Fôlego",
    description: "Recuperação rápida de energia em campo.",
    effect: "Uma vez por período, gasta ação padrão para recuperar 1d8+2 de fôlego (não pode usar habilidade ativa no turno).",
    category: "Geral"
  },
  {
    id: "ocultacao-presenca-aprimorada",
    name: "Ocultação de Presença Aprimorada",
    description: "Mestre da invisibilidade em campo.",
    effect: "+2 em testes de Furtividade.",
    category: "Geral"
  },
  {
    id: "ginga",
    name: "Ginga",
    description: "Dribles com malemolência brasileira.",
    effect: "+1 em testes de Drible.",
    category: "Geral"
  },
  {
    id: "chute-artistico",
    name: "Chute Artístico",
    description: "Finalizações plásticas (cavadinha, calcanhar).",
    effect: "+1 para efetuar finalizações artísticas.",
    category: "Geral"
  },
  {
    id: "dominio-habil",
    name: "Domínio Hábil",
    description: "Controle de bola refinado.",
    effect: "+1 em testes de Domínio (sem pressão adversária).",
    category: "Geral"
  },
  {
    id: "cabecada-monstruosa",
    name: "Cabeçada Monstruosa",
    description: "Poder aéreo dominante.",
    effect: "+1 em Cabeceio contra jogadores de mesma altura ou menores.",
    category: "Geral"
  },
  {
    id: "bate-na-massa",
    name: "Bate na Massa",
    description: "Uso eficiente do corpo na marcação.",
    effect: "+2 em Corpo a Corpo para manter pressão no adversário.",
    category: "Geral"
  },
  {
    id: "velocista-esguio",
    name: "Velocista Esguio",
    description: "Agilidade pura para escapar da marcação.",
    effect: "+1 em Explosão para se desvincular da marcação.",
    category: "Geral"
  },
  {
    id: "orquestrador-jogadas",
    name: "Orquestrador de Jogadas",
    description: "Liderança tática sobre a iniciativa do time.",
    effect: "Pode remanejar a iniciativa de até 2 jogadores aliados.",
    category: "Geral"
  },
  {
    id: "bicicleta-amplitude",
    name: "Bicicleta com Maior Amplitude",
    description: "Mestre em finalizações acrobáticas de costas.",
    effect: "+2 em Acrobacia para o movimento e +1 em Pontaria para o chute.",
    category: "Geral"
  },
  {
    id: "chute-trivela-sofisticado",
    name: "Chute de Trivela Sofisticado",
    description: "Mestre no chute de três dedos.",
    effect: "+3 em Chute ao executar trivela.",
    category: "Geral"
  },
  {
    id: "especializado-finalizacao-parada",
    name: "Especializado em Finalização Parada",
    description: "Mestre em cobranças de falta.",
    effect: "+4 em cobranças de falta na área A ou laterais.",
    category: "Geral"
  },
  {
    id: "analista-preciso",
    name: "Analista Preciso",
    description: "Capacidade de dissecar o adversário rapidamente.",
    effect: "Ganha 2 bônus (em vez de 1) ao analisar um time adversário.",
    category: "Geral"
  },
  {
    id: "meta-visao-ofensiva",
    name: "Meta Visão (Ofensiva)",
    description: "Visão divina do campo para criar oportunidades de gol.",
    effect: "+1 em Chute, Pontaria, Drible, Corpo a Corpo e Reflexos. Você não pode usar Meta Visão Defensiva se possui esta.",
    category: "Avançado"
  },
  {
    id: "meta-visao-defensiva",
    name: "Meta Visão (Defensiva)",
    description: "Análise perfeita das rotas ofensivas inimigas.",
    effect: "+1 em Roubo de Bola, Passe, Defesa, Reflexos, Explosão, Cabeceio e Acrobacia. +5 pés de deslocamento a 15 pés da grande área do goleiro.",
    category: "Avançado"
  },
  {
    id: "percepcao-espacial-ofensiva",
    name: "Percepção Espacial (Ofensiva)",
    description: "Visão de Deus para criar margens de gol.",
    effect: "+2 em Passe, Chute e Presença. +1 em Corpo a Corpo. Você não pode usar Percepção Espacial Defensiva se possui esta.",
    category: "Avançado"
  },
  {
    id: "percepcao-espacial-defensiva",
    name: "Percepção Espacial (Defensiva)",
    description: "Análise completa do campo defensivo.",
    effect: "+2 em Roubo de Bola, Defesa e Explosão. +1 em Passe e Cabeceio. Você funciona como um xerife da defesa.",
    category: "Avançado"
  },
  {
    id: "precognicao-aprimorada",
    name: "Precognição Aprimorada",
    description: "Capacidade avançada de reorganizar os resultados preditos.",
    effect: "Além de rodar 4d20, você pode reorganizar a ordem dos resultados como desejar (ex: 1,15,5,20 vira 20,15,5,1).",
    category: "Avançado"
  },
  {
    id: "treino-finalizacao",
    name: "Treino de Finalização",
    description: "Treinamento intensivo focado em aumentar a eficácia das finalizações.",
    effect: "Aumenta precisão e força de chute. +1 em Chute e Pontaria.",
    category: "Geral"
  },
  {
    id: "treino-passe",
    name: "Treino de Passe",
    description: "Treinamento dedicado à melhoria da qualidade dos passes.",
    effect: "Melhora precisão em passes curtos e longos. +1 em Passe.",
    category: "Geral"
  },
  {
    id: "treino-drible",
    name: "Treino de Drible",
    description: "Treinamento focado em superar adversários com o drible.",
    effect: "Aumenta capacidade de superar adversários. +1 em Drible.",
    category: "Geral"
  },
  {
    id: "treino-velocidade",
    name: "Treino de Velocidade",
    description: "Treinamento físico para aumentar a velocidade em campo.",
    effect: "Aumenta atributo de velocidade. +1 em Explosão e Corrida a Longa Distância.",
    category: "Geral"
  },
  {
    id: "treino-resistencia",
    name: "Treino de Resistência",
    description: "Treinamento de condicionamento físico para aumentar a stamina.",
    effect: "Aumenta stamina total. Recupera +2 de fôlego por rodada de descanso.",
    category: "Geral"
  },
  {
    id: "treino-defesa",
    name: "Treino de Defesa",
    description: "Treinamento especializado em técnicas defensivas.",
    effect: "Melhora interceptação e bloqueios. +1 em Roubo de Bola e Defesa.",
    category: "Especializado"
  },
  {
    id: "treino-reflexo",
    name: "Treino de Reflexo",
    description: "Treinamento para aumentar o tempo de reação em campo.",
    effect: "Aumenta tempo de reação. +1 em Reflexos e Acrobacia.",
    category: "Especializado"
  },
  {
    id: "treino-tatico",
    name: "Treino Tático",
    description: "Treinamento focado em posicionamento e leitura de jogo.",
    effect: "Melhora posicionamento e leitura de jogo. +1 em Intuição e Percepção.",
    category: "Especializado"
  },
  {
    id: "treino-trabalho-equipe",
    name: "Treino de Trabalho em Equipe",
    description: "Treinamento para aumentar a sinergia com aliados.",
    effect: "Aumenta sinergia com aliados. Aliados a até 10 pés ganham +1 em Passe quando você está próximo.",
    category: "Especializado"
  },
  {
    id: "treino-mental",
    name: "Treino Mental",
    description: "Treinamento psicológico para reduzir penalidades mentais.",
    effect: "Reduz penalidades psicológicas. -1 nas penalidades de condições mentais como Intimidado.",
    category: "Especializado"
  }
];
