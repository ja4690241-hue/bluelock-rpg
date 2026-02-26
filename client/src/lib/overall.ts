/**
 * Blue Lock RPG - Overall Rating System
 * Calcula o Overall (Rank S, A, B, C, D, E, F, G) e a pontuação total do jogador
 * Baseado no sistema oficial do Blue Lock RPG
 */

export interface OverallRating {
  total: number;
  rank: "S" | "A" | "B" | "C" | "D" | "E" | "F" | "G";
  rankColor: string;
  description: string;
}

/**
 * Calcula o Overall baseado nos atributos e perícias do jogador
 * 
 * Fórmula Oficial:
 * 1. Média dos 5 Atributos Base (Potência, Técnica, Velocidade, Agilidade, Ego)
 *    - Cada atributo vai de 0 a 10.
 *    - Média = (Soma dos Atributos) / 5
 *    - Multiplicamos por 10 para ter uma base de 0-100.
 * 
 * 2. Bônus de Perícias:
 *    - Cada perícia treinada (valor > 0) adiciona um pequeno bônus ao Overall.
 *    - Bônus = (Soma de todas as perícias) / 20
 *    - Isso reflete que um jogador mais versátil tem um overall ligeiramente maior.
 * 
 * 3. Total = Média Atributos + Bônus Perícias (Limitado a 99)
 * 
 * Ranks:
 * S: 90-99 (Elite Mundial)
 * A: 80-89 (Profissional de Elite)
 * B: 70-79 (Profissional)
 * C: 60-69 (Nível Nacional)
 * D: 50-59 (Promissor)
 * E: 40-49 (Iniciante)
 * F: 30-39 (Amador)
 * G: 0-29 (Novato)
 */
export function calculateOverall(
  atributos: Record<string, number>,
  pericias: Record<string, number>
): OverallRating {
  // 1. Média dos Atributos (Base 0-100)
  const attrKeys = ["potencia", "tecnica", "velocidade", "agilidade", "ego"];
  const atributosSum = attrKeys.reduce((sum, key) => sum + (atributos[key] || 0), 0);
  const mediaAtributos = (atributosSum / 5) * 10;

  // 2. Bônus de Perícias
  // Soma de todos os valores de perícias. 
  // Se o jogador tiver +5 em 5 perícias, soma 25. 25 / 5 = +5 no overall.
  const periciasSum = Object.values(pericias).reduce((sum, val) => sum + val, 0);
  const bonusPericias = periciasSum / 5;

  // 3. Total Final
  let total = Math.round(mediaAtributos + bonusPericias);
  total = Math.min(total, 99); // O limite é 99 (estilo FIFA/Blue Lock)

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
    description = "Iniciante";
  } else if (total >= 30) {
    rank = "F";
    rankColor = "oklch(0.4 0.08 260)"; // Cinza
    description = "Amador";
  } else {
    rank = "G";
    rankColor = "oklch(0.3 0.05 260)"; // Cinza Escuro
    description = "Novato";
  }

  return {
    total,
    rank,
    rankColor,
    description
  };
}

/**
 * Calcula a pontuação de cada categoria para o radar chart
 */
export function calculateRadarData(
  atributos: Record<string, number>,
  pericias: Record<string, number>
) {
  return [
    { subject: 'Potência', A: (atributos.potencia || 0) * 10, fullMark: 100 },
    { subject: 'Técnica', A: (atributos.tecnica || 0) * 10, fullMark: 100 },
    { subject: 'Velocidade', A: (atributos.velocidade || 0) * 10, fullMark: 100 },
    { subject: 'Agilidade', A: (atributos.agilidade || 0) * 10, fullMark: 100 },
    { subject: 'Ego', A: (atributos.ego || 0) * 10, fullMark: 100 },
  ];
}
