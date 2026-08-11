import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle } from "lucide-react";

interface TooltipProps {
  term: string;
  definition: string;
  children?: React.ReactNode;
  className?: string;
}

// Dicionário de termos técnicos do Blue Lock RPG
export const glossarioTecnico: Record<string, string> = {
  "FO": "Fôlego — Energia necessária para usar habilidades e realizar ações especiais durante a partida. Recupera-se entre rodadas.",
  "DT": "Dificuldade de Teste — O número que você precisa igualar ou superar no dado para ter sucesso em uma ação.",
  "Crítico": "Sucesso crítico — Quando você rola 20 em um d20, obtendo o melhor resultado possível com bônus extras.",
  "Falha crítica": "Falha crítica — Quando você rola 1 em um d20, obtendo o pior resultado possível com penalidades extras.",
  "Vantagem": "Vantagem — Role o dado duas vezes e use o resultado mais alto. Representa uma situação favorável.",
  "Desvantagem": "Desvantagem — Role o dado duas vezes e use o resultado mais baixo. Representa uma situação desfavorável.",
  "Bônus": "Bônus — Um modificador positivo adicionado ao seu teste. Ex: +2 em Chute.",
  "Penalidade": "Penalidade — Um modificador negativo subtraído do seu teste. Ex: -1 em Velocidade.",
  "Teste": "Teste — Uma rolagem de dado para determinar o sucesso ou falha de uma ação.",
  "Perícia": "Perícia — Uma habilidade específica que você treinou. Ex: Chute, Passe, Drible.",
  "Atributo": "Atributo — Uma característica fundamental do seu personagem. Ex: Potência, Técnica, Velocidade.",
  "Fluxo": "Fluxo (Flow) — Estado de concentração extrema onde o jogador obtém bônus massivos em seus testes.",
  "Ego": "Ego — A vontade e determinação do jogador. Quanto maior o Ego, mais forte o jogador fica.",
  "Arma Blue Lock": "Arma Blue Lock — Uma técnica ou estilo de jogo único que define o atleta. Cada jogador tem a sua.",
  "Overall": "Overall — Valor total que representa o nível geral do atleta, calculado a partir de todos os atributos.",
  "Rank": "Rank — Classificação do atleta (S, A, B, C, D, E, F) baseada no seu Overall.",
  "Rodada": "Rodada — Um turno de jogo onde todos os jogadores realizam suas ações.",
  "Turno": "Turno — Seu momento para agir durante uma rodada de combate.",
};

export default function Tooltip({ term, definition, children, className = "" }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Se a definição não for fornecida, tenta buscar no glossário
  const finalDefinition = definition || glossarioTecnico[term] || `${term} — Termo não definido no glossário.`;

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1 cursor-help hover:opacity-80 transition-opacity"
        title={`Clique ou passe o mouse para ver: ${finalDefinition}`}
      >
        {children || (
          <>
            <span className="font-bold text-primary underline decoration-dotted">{term}</span>
            <HelpCircle className="w-3.5 h-3.5 text-primary/60" />
          </>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 left-1/2 -translate-x-1/2 mt-2 w-max max-w-xs"
          >
            <div
              className="px-3 py-2 rounded-sm text-xs font-heading text-white shadow-lg border border-primary/30 pointer-events-none"
              style={{
                background: "oklch(0.10 0.015 260)",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5), 0 0 20px oklch(0.52 0.22 260 / 0.2)"
              }}
            >
              <p className="leading-relaxed">{finalDefinition}</p>
              <div
                className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent"
                style={{ borderBottomColor: "oklch(0.10 0.015 260)" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Componente auxiliar para envolver texto com tooltip automático
export function TooltipText({ text, className = "" }: { text: string; className?: string }) {
  const definition = glossarioTecnico[text];
  
  if (!definition) {
    return <span className={className}>{text}</span>;
  }

  return (
    <Tooltip term={text} definition={definition} className={className}>
      <span className={`font-bold text-primary underline decoration-dotted cursor-help hover:opacity-80 transition-opacity ${className}`}>
        {text}
      </span>
    </Tooltip>
  );
}
