import { classes } from './data';
import { trainings } from './trainings';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: 'classe' | 'perícia' | 'página' | 'treinamento' | 'regra';
  href?: string;
  keywords: string[];
}

export const searchIndex: SearchResult[] = [
  // Páginas principais
  {
    id: 'home',
    title: 'Início',
    description: 'Página inicial do Blue Lock RPG',
    category: 'página',
    href: '/',
    keywords: ['home', 'início', 'principal', 'blue lock']
  },
  {
    id: 'criacao',
    title: 'Criação de Ficha',
    description: 'Crie seu personagem passo a passo',
    category: 'página',
    href: '/criacao',
    keywords: ['criação', 'ficha', 'personagem', 'criar']
  },
  {
    id: 'classes',
    title: 'Classes',
    description: 'Veja todas as classes disponíveis',
    category: 'página',
    href: '/classes',
    keywords: ['classes', 'classe', 'especialização']
  },
  {
    id: 'atributos',
    title: 'Atributos',
    description: 'Entenda os atributos do sistema',
    category: 'página',
    href: '/atributos',
    keywords: ['atributos', 'potência', 'técnica', 'velocidade', 'agilidade', 'ego']
  },
  {
    id: 'pericias',
    title: 'Perícias',
    description: 'Conheça todas as perícias disponíveis',
    category: 'página',
    href: '/pericias',
    keywords: ['perícias', 'perícia', 'habilidades']
  },
  {
    id: 'mecanicas',
    title: 'Mecânicas',
    description: 'Regras e mecânicas do jogo',
    category: 'página',
    href: '/mecanicas',
    keywords: ['mecânicas', 'regras', 'sistema', 'jogo']
  },
  {
    id: 'mecanicas-avancadas',
    title: 'Mecânicas Avançadas',
    description: 'Regras avançadas e complexas',
    category: 'página',
    href: '/mecanicas-avancadas',
    keywords: ['mecânicas avançadas', 'regras avançadas', 'flow', 'ego']
  },
  {
    id: 'acoes',
    title: 'Ações e Fluxo',
    description: 'Fluxo de ações durante o jogo',
    category: 'página',
    href: '/acoes',
    keywords: ['ações', 'fluxo', 'turno', 'combate']
  },
  {
    id: 'fluxo',
    title: 'Fluxo Detalhado',
    description: 'Detalhamento completo do fluxo de jogo',
    category: 'página',
    href: '/fluxo-detalhado',
    keywords: ['fluxo', 'turno', 'rodada', 'sequência']
  },
  {
    id: 'itens',
    title: 'Itens e Condições',
    description: 'Itens, equipamentos e condições de status',
    category: 'página',
    href: '/itens-condicoes',
    keywords: ['itens', 'equipamentos', 'condições', 'status']
  },
  {
    id: 'calculadora',
    title: 'Calculadora',
    description: 'Ferramenta de cálculo para o RPG',
    category: 'página',
    href: '/calculadora',
    keywords: ['calculadora', 'cálculo', 'ferramenta']
  },
  {
    id: 'mestres',
    title: 'Guia do Mestre',
    description: 'Guia completo para mestres de jogo',
    category: 'página',
    href: '/mestres',
    keywords: ['mestre', 'narrador', 'guia', 'dm']
  },
  {
    id: 'guia-narrador',
    title: 'Guia do Narrador',
    description: 'Dicas para narradores',
    category: 'página',
    href: '/guia-narrador',
    keywords: ['narrador', 'guia', 'mestre']
  },
  {
    id: 'exemplo',
    title: 'Exemplo de Partida',
    description: 'Veja um exemplo completo de partida',
    category: 'página',
    href: '/exemplo',
    keywords: ['exemplo', 'partida', 'jogo', 'demonstração']
  },
  {
    id: 'treinamentos-page',
    title: 'Treinamentos',
    description: 'Sistema de treinamentos e evolução',
    category: 'página',
    href: '/treinamentos',
    keywords: ['treinamentos', 'evolução', 'desenvolvimento']
  },
  {
    id: 'ego-page',
    title: 'Ego',
    description: 'Entenda o sistema de Ego',
    category: 'página',
    href: '/ego',
    keywords: ['ego', 'despertar', 'flow', 'poder']
  },

  // Classes
  ...classes.map(cls => ({
    id: `class-${cls.id}`,
    title: cls.name,
    description: cls.description,
    category: 'classe' as const,
    href: `/classes#${cls.id}`,
    keywords: [cls.name.toLowerCase(), cls.role.toLowerCase(), cls.subtitle.toLowerCase()]
  })),

  // Treinamentos
  ...trainings.map(training => ({
    id: `training-${training.id}`,
    title: training.name,
    description: training.description,
    category: 'treinamento' as const,
    href: '/treinamentos',
    keywords: [training.name.toLowerCase(), training.effect.toLowerCase()]
  }))
];

export function searchContent(query: string): SearchResult[] {
  if (!query || query.length < 2) return [];

  const lowerQuery = query.toLowerCase();
  
  return searchIndex
    .filter(item => {
      // Busca no título
      if (item.title.toLowerCase().includes(lowerQuery)) return true;
      
      // Busca na descrição
      if (item.description.toLowerCase().includes(lowerQuery)) return true;
      
      // Busca nas palavras-chave
      if (item.keywords.some(keyword => keyword.includes(lowerQuery))) return true;
      
      return false;
    })
    .sort((a, b) => {
      // Priorizar resultados que começam com a query
      const aStartsWith = a.title.toLowerCase().startsWith(lowerQuery);
      const bStartsWith = b.title.toLowerCase().startsWith(lowerQuery);
      
      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;
      
      return 0;
    })
    .slice(0, 10); // Limitar a 10 resultados
}
