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

  // 1. SPEED: Velocidade + (Corrida + Explosão)
  const speedBase = a('velocidade') * 10; // máx 100
  const speedSkills = ((s('Corrida a Longa Distância') + s('Explosão')) / 40) * 100; // máx 100
  const speed = Math.round(speedBase * 0.6 + speedSkills * 0.4);

  // 2. DEFENSE: Agilidade + (Reflexos + Defesa + Roubo de Bola)
  const defenseBase = a('agilidade') * 10;
  const defenseSkills = ((s('Reflexos') + s('Defesa') + s('Roubo de Bola')) / 60) * 100;
  const defense = Math.round(defenseBase * 0.6 + defenseSkills * 0.4);

  // 3. PASS: Técnica + (Passe + Domínio + Diplomacia)
  const passBase = a('tecnica') * 10;
  const passSkills = ((s('Passe') + s('Domínio') + s('Diplomacia')) / 60) * 100;
  const pass = Math.round(passBase * 0.6 + passSkills * 0.4);

  // 4. DRIBBLE: Técnica + (Drible/Finta + Enganação + Acrobacias)
  const dribbleBase = a('tecnica') * 10;
  const dribbleSkills = ((s('Drible/Finta') + s('Enganação') + s('Acrobacias')) / 60) * 100;
  const dribble = Math.round(dribbleBase * 0.6 + dribbleSkills * 0.4);

  // 5. SHOOT: Potência + (Chute + Pontaria + Cabeceio)
  const shootBase = a('potencia') * 10;
  const shootSkills = ((s('Chute') + s('Pontaria') + s('Cabeceio')) / 60) * 100;
  const shoot = Math.round(shootBase * 0.6 + shootSkills * 0.4);

  // 6. OFFENSE: Ego + (Intimidação + Presença + Intuição)
  const offenseBase = a('ego') * 10;
  const offenseSkills = ((s('Intimidação') + s('Presença') + s('Intuição')) / 60) * 100;
  const offense = Math.round(offenseBase * 0.6 + offenseSkills * 0.4);

  // TOTAL: Média das 6 categorias (conforme nota na imagem: "Cumulative score is not an average, but a reflection...")
  // No entanto, para fins de sistema, usaremos a média ponderada para manter consistência.
  const total = Math.round((speed + defense + pass + dribble + shoot + offense) / 6);

  // Determinar rank (Baseado na legenda da imagem)
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
  } else if (total >= 30) {
    rank = "F";
    rankColor = "oklch(0.4 0.08 260)"; // Cinza
  } else {
    rank = "G";
    rankColor = "oklch(0.3 0.05 260)"; // Cinza Escuro
  }

  return {
    total,
    rank,
    rankColor,
    description: description || "Jogador em Evolução",
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
