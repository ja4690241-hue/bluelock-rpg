/**
 * Blue Lock RPG - Overall Rating System
 * Calcula o Overall (Rank S, A, B, C, D, E, F, G) e a pontuação total do jogador
 * Baseado na imagem de referência do Michael Kaiser
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
 * Fórmula:
 * - Soma de todos os atributos (máx 60 pontos: 6 atributos x 10)
 * - Soma das 3 perícias mais altas (máx 60 pontos: 3 x 20)
 * - Total máximo: 120 pontos
 * 
 * Ranks:
 * S: 90-100
 * A: 80-89
 * B: 70-79
 * C: 60-69
 * D: 50-59
 * E: 40-49
 * F: 30-39
 * G: 0-29
 */
export function calculateOverall(
  atributos: Record<string, number>,
  pericias: Record<string, number>
): OverallRating {
  // Soma dos atributos (máx 60)
  const atributosSum = Object.values(atributos).reduce((sum, val) => sum + val, 0);
  const atributosNormalized = Math.min(atributosSum, 60);

  // Soma das 3 perícias mais altas (máx 60)
  const top3Skills = Object.values(pericias)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((sum, val) => sum + val, 0);
  const skillsNormalized = Math.min(top3Skills, 60);

  // Total (máx 120, mas normalizamos para 100)
  const rawTotal = atributosNormalized + skillsNormalized;
  const total = Math.round((rawTotal / 120) * 100);

  // Determinar rank
  let rank: "S" | "A" | "B" | "C" | "D" | "E" | "F" | "G";
  let rankColor: string;
  let description: string;

  if (total >= 90) {
    rank = "S";
    rankColor = "oklch(0.75 0.18 60)"; // Ouro/Amarelo
    description = "Excepcional - Jogador de Elite";
  } else if (total >= 80) {
    rank = "A";
    rankColor = "oklch(0.75 0.15 230)"; // Azul
    description = "Excelente - Jogador de Classe Mundiai";
  } else if (total >= 70) {
    rank = "B";
    rankColor = "oklch(0.75 0.18 160)"; // Verde
    description = "Muito Bom - Jogador Profissional";
  } else if (total >= 60) {
    rank = "C";
    rankColor = "oklch(0.75 0.18 25)"; // Laranja
    description = "Bom - Jogador Competente";
  } else if (total >= 50) {
    rank = "D";
    rankColor = "oklch(0.75 0.18 280)"; // Roxo
    description = "Mediano - Jogador em Desenvolvimento";
  } else if (total >= 40) {
    rank = "E";
    rankColor = "oklch(0.5 0.1 260)"; // Cinza Claro
    description = "Abaixo da Média - Iniciante";
  } else if (total >= 30) {
    rank = "F";
    rankColor = "oklch(0.4 0.08 260)"; // Cinza
    description = "Fraco - Muito Iniciante";
  } else {
    rank = "G";
    rankColor = "oklch(0.3 0.05 260)"; // Cinza Escuro
    description = "Muito Fraco - Novato";
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
 * Retorna valores normalizados de 0-100 para cada atributo
 */
export function calculateRadarData(
  atributos: Record<string, number>,
  pericias: Record<string, number>
) {
  // Normalizar atributos (0-10 -> 0-100)
  const normalizedAttrs = {
    potencia: (atributos.potencia || 0) * 10,
    tecnica: (atributos.tecnica || 0) * 10,
    velocidade: (atributos.velocidade || 0) * 10,
    agilidade: (atributos.agilidade || 0) * 10,
    ego: (atributos.ego || 0) * 10,
    folego: (atributos.folego || 0) * 10,
  };

  // Média das perícias relacionadas a cada atributo
  const skillCategories = {
    chute: Math.max(
      pericias["Corpo a Corpo"] || 0,
      pericias["Cabeceio"] || 0,
      pericias["Chute"] || 0
    ),
    tecnica: Math.max(
      pericias["Pontaria"] || 0,
      pericias["Domínio"] || 0,
      pericias["Passe"] || 0,
      pericias["Drible/Finta"] || 0,
      pericias["Intuição"] || 0,
      pericias["Roubo de Bola"] || 0,
      pericias["Furtividade"] || 0
    ),
    velocidade: Math.max(
      pericias["Corrida a Longa Distância"] || 0,
      pericias["Explosão"] || 0
    ),
    agilidade: Math.max(
      pericias["Acrobacias"] || 0,
      pericias["Reflexos"] || 0,
      pericias["Defesa"] || 0
    ),
    ego: Math.max(
      pericias["Intimidação"] || 0,
      pericias["Presença"] || 0,
      pericias["Diplomacia"] || 0,
      pericias["Enganação"] || 0
    ),
  };

  return {
    atributos: normalizedAttrs,
    skills: skillCategories
  };
}

/**
 * Retorna a cor do rank em formato RGB para uso em gráficos
 */
export function getRankColorRGB(rank: "S" | "A" | "B" | "C" | "D" | "E" | "F" | "G"): string {
  const colors: Record<string, string> = {
    S: "#FFD700", // Ouro
    A: "#4DA6FF", // Azul
    B: "#4DD9FF", // Ciano
    C: "#FF8C00", // Laranja
    D: "#B366FF", // Roxo
    E: "#A9A9A9", // Cinza
    F: "#696969", // Cinza Escuro
    G: "#2F4F4F", // Cinza Muito Escuro
  };
  return colors[rank] || "#A9A9A9";
}
