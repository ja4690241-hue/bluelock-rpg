/**
 * Blue Lock RPG - Overall Rating System
 * Calcula o Overall (Rank S, A, B, C, D, E, F, G) e a pontuação total do jogador
 * Baseado no sistema oficial do Blue Lock (Referência: Seishiro Nagi)
 */

export interface OverallRating {
  total: number;
  rank: "S" | "A" | "B" | "C" | "D" | "E" | "F" | "G";
  rankColor: string;
  description: string;
  categories: {
    speed: number;
    defense: number;
    pass: number;
    dribble: number;
    shoot: number;
    offense: number;
  };
}

/**
 * Calcula o Overall baseado nos atributos e perícias do jogador
 * Mapeia os dados do RPG para as 6 categorias oficiais do Blue Lock
 */
export function calculateOverall(
  atributos: Record<string, number>,
  pericias: Record<string, number>
): OverallRating {
  
  // Helper para pegar valor de perícia ou 0
  const s = (name: string) => pericias[name] || 0;
  // Helper para pegar valor de atributo ou 0 (base 0-10)
  const a = (name: string) => (atributos[name] || 0);

  /**
   * MAPEAMENTO DE CATEGORIAS (0-100)
   * Cada categoria é uma composição de Atributo Base (60%) + Perícias Relacionadas (40%)
   */

  /**
   * NOVA FÓRMULA DE CATEGORIAS (0-100)
   * Como a perícia agora já inclui (Atributo x 2), os valores são maiores.
   * Máximo teórico por perícia: (10*2) + 20 + bônus(aprox 10) = ~50
   */

  // 1. SPEED: (Corrida + Explosão)
  // Máximo esperado: 50 + 50 = 100
  const speed = Math.min(100, Math.round(s('Corrida a Longa Distância') + s('Explosão')));

  // 2. DEFENSE: (Reflexos + Defesa + Roubo de Bola) / 1.5
  // Máximo esperado: (50 + 50 + 50) = 150 / 1.5 = 100
  const defense = Math.min(100, Math.round((s('Reflexos') + s('Defesa') + s('Roubo de Bola')) / 1.5));

  // 3. PASS: (Passe + Domínio + Diplomacia) / 1.5
  const pass = Math.min(100, Math.round((s('Passe') + s('Domínio') + s('Diplomacia')) / 1.5));

  // 4. DRIBBLE: (Drible + Enganação + Acrobacia) / 1.5
  const dribble = Math.min(100, Math.round((s('Drible') + s('Enganação') + s('Acrobacia')) / 1.5));

  // 5. SHOOT: (Chute + Pontaria + Cabeceio) / 1.5
  const shoot = Math.min(100, Math.round((s('Chute') + s('Pontaria') + s('Cabeceio')) / 1.5));

  // 6. OFFENSE: (Intimidação + Presença + Intuição + Análise Individual) / 2
  // Máximo esperado: (50 * 4) = 200 / 2 = 100
  const offense = Math.min(100, Math.round((s('Intimidação') + s('Presença') + s('Intuição') + s('Análise Individual')) / 2));

  // TOTAL: Média das 6 categorias
  const total = Math.round((speed + defense + pass + dribble + shoot + offense) / 6);

  // Determinar rank
  let rank: "S" | "A" | "B" | "C" | "D" | "E" | "F" | "G";
  let rankColor: string;
  let description: string;

  if (total >= 90) {
    rank = "S";
    rankColor = "oklch(0.75 0.18 60)"; // Ouro
    description = "Elite Mundial";
  } else if (total >= 80) {
    rank = "A";
    rankColor = "oklch(0.75 0.15 230)"; // Azul
    description = "Profissional de Elite";
  } else if (total >= 70) {
    rank = "B";
    rankColor = "oklch(0.75 0.18 160)"; // Verde
    description = "Profissional";
  } else if (total >= 60) {
    rank = "C";
    rankColor = "oklch(0.75 0.18 25)"; // Laranja
    description = "Nível Nacional";
  } else if (total >= 50) {
    rank = "D";
    rankColor = "oklch(0.75 0.18 280)"; // Roxo
    description = "Promissor";
  } else if (total >= 40) {
    rank = "E";
    rankColor = "oklch(0.5 0.1 260)"; // Cinza Claro
    description = "Jogador em Evolução";
  } else if (total >= 30) {
    rank = "F";
    rankColor = "oklch(0.4 0.08 260)"; // Cinza
    description = "Jogador em Evolução";
  } else {
    rank = "G";
    rankColor = "oklch(0.3 0.05 260)"; // Cinza Escuro
    description = "Jogador em Evolução";
  }

  return {
    total,
    rank,
    rankColor,
    description: description,
    categories: {
      speed,
      defense,
      pass,
      dribble,
      shoot,
      offense
    }
  };
}

/**
 * Prepara os dados para o Radar Chart do Recharts
 */
export function calculateRadarData(rating: OverallRating) {
  return [
    { subject: 'SPEED', A: rating.categories.speed, fullMark: 100 },
    { subject: 'DEFENSE', A: rating.categories.defense, fullMark: 100 },
    { subject: 'PASS', A: rating.categories.pass, fullMark: 100 },
    { subject: 'DRIBBLE', A: rating.categories.dribble, fullMark: 100 },
    { subject: 'SHOOT', A: rating.categories.shoot, fullMark: 100 },
    { subject: 'OFFENSE', A: rating.categories.offense, fullMark: 100 },
  ];
}
