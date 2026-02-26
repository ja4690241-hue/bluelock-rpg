import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchItem {
  id: string;
  title: string;
  category: string;
  description?: string;
  href?: string;
  action?: () => void;
}

const searchItems: SearchItem[] = [
  // Navegação
  { id: "home", title: "Página Inicial", category: "Navegação", href: "/" },
  { id: "ficha", title: "Criar Ficha", category: "Navegação", href: "/ficha" },
  { id: "calculadora", title: "Calculadora", category: "Navegação", href: "/calculadora" },
  { id: "regras", title: "Todas as Regras", category: "Navegação", href: "/regras" },
  { id: "atributos", title: "Atributos", category: "Navegação", href: "/atributos" },
  { id: "pericias", title: "Perícias", category: "Navegação", href: "/pericias" },
  { id: "classes", title: "Classes", category: "Navegação", href: "/classes" },
  { id: "mecanicas", title: "Mecânicas", category: "Navegação", href: "/mecanicas" },
  { id: "acoes", title: "Ações & Economia", category: "Navegação", href: "/acoes" },
  { id: "fluxo", title: "Fluxo de Turno", category: "Navegação", href: "/fluxo" },
  { id: "itens", title: "Itens", category: "Navegação", href: "/itens" },
  { id: "treinamentos", title: "Treinamentos", category: "Navegação", href: "/treinamentos" },
  { id: "ego", title: "Ego", category: "Navegação", href: "/ego" },
  { id: "mestres", title: "Guia do Mestre", category: "Navegação", href: "/mestres" },
  { id: "exemplo", title: "Exemplo de Partida", category: "Navegação", href: "/exemplo" },

  // Itens
  { id: "item-chuteira", title: "Chuteira Profissional", category: "Itens", description: "+1 em Chute" },
  { id: "item-munhequeira", title: "Munhequeira de Foco", category: "Itens", description: "+1 em Passe" },
  { id: "item-faixa", title: "Faixa de Capitão", category: "Itens", description: "Liderança" },
  { id: "item-garrafa", title: "Garrafa Térmica Energética", category: "Itens", description: "Recuperação de Fôlego" },
  { id: "item-joelheira", title: "Joelheira Reforçada", category: "Itens", description: "+1 em Defesa" },
  { id: "item-oculos", title: "Óculos de Visão Tática", category: "Itens", description: "+1 em Intuição" },
  { id: "item-bandagem", title: "Bandagem de Recuperação", category: "Itens", description: "Recuperação de Lesões" },
  { id: "item-caneleira", title: "Caneleira Especial", category: "Itens", description: "+1 em Velocidade" },
  { id: "item-apito", title: "Apito Tático", category: "Itens", description: "Comunicação" },
  { id: "item-kit", title: "Kit Médico Portátil", category: "Itens", description: "Primeiros Socorros" },

  // Condições de Campo
  { id: "campo-ensolarado", title: "Ensolarado", category: "Condições de Campo", description: "Condição padrão" },
  { id: "campo-chuva", title: "Chuva", category: "Condições de Campo", description: "-2 em Passes e Chutes" },
  { id: "campo-neve", title: "Neve", category: "Condições de Campo", description: "-5 pés de movimento" },
  { id: "campo-neblina", title: "Neblina", category: "Condições de Campo", description: "-2 em Intuição" },
  { id: "campo-ventania", title: "Ventania", category: "Condições de Campo", description: "-2 em passes longos" },
  { id: "campo-calor", title: "Calor Intenso", category: "Condições de Campo", description: "+1 fôlego por rodada" },
  { id: "campo-frio", title: "Frio Extremo", category: "Condições de Campo", description: "-1 em Velocidade e Agilidade" },

  // Condições de Jogador
  { id: "cond-intimidado", title: "Intimidado", category: "Condições de Jogador", description: "-2 em Defesa e Reflexos" },
  { id: "cond-marcado", title: "Marcado", category: "Condições de Jogador", description: "-3 em Finalização" },
  { id: "cond-furtivo", title: "Furtivo", category: "Condições de Jogador", description: "+1 a +4 em ações surpresa" },
  { id: "cond-flanqueado", title: "Flanqueado", category: "Condições de Jogador", description: "-3 em Drible e Passes" },
  { id: "cond-cercado", title: "Cercado", category: "Condições de Jogador", description: "-6 em Passes e Dribles" },

  // Treinamentos Populares
  { id: "treino-finalizacao", title: "Treino de Finalização", category: "Treinamentos", description: "+1 em Chute e Pontaria" },
  { id: "treino-passe", title: "Treino de Passe", category: "Treinamentos", description: "+1 em Passe" },
  { id: "treino-drible", title: "Treino de Drible", category: "Treinamentos", description: "+1 em Drible" },
  { id: "treino-velocidade", title: "Treino de Velocidade", category: "Treinamentos", description: "+1 em Explosão" },
  { id: "treino-defesa", title: "Treino de Defesa", category: "Treinamentos", description: "+1 em Roubo de Bola" },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [, navigate] = useLocation();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredItems = searchItems.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase()) ||
    (item.description?.toLowerCase().includes(search.toLowerCase()) ?? false)
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
        setSearch("");
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
      if (isOpen) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % filteredItems.length);
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
        }
        if (e.key === "Enter") {
          e.preventDefault();
          const selected = filteredItems[selectedIndex];
          if (selected?.href) {
            navigate(selected.href);
            setIsOpen(false);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, navigate]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  return (
    <>
      {/* Button no Header */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-sm text-sm font-heading tracking-wider uppercase text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
        title="Pressione Ctrl+K para buscar"
      >
        <Search className="w-4 h-4" />
        <span className="text-xs">Buscar</span>
        <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 border border-white/20 ml-auto">Ctrl K</kbd>
      </button>

      {/* Modal de Busca */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-20"
            style={{ background: "rgba(0, 0, 0, 0.5)" }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-2xl rounded-lg border border-border/50 overflow-hidden shadow-2xl"
              style={{ background: "oklch(0.08 0.01 260)" }}
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50">
                <Search className="w-5 h-5 text-primary flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Busque itens, treinamentos, condições, regras..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  autoFocus
                  className="flex-1 bg-transparent text-white placeholder-muted-foreground outline-none text-base font-heading"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[400px] overflow-y-auto">
                {filteredItems.length === 0 ? (
                  <div className="px-4 py-8 text-center text-muted-foreground">
                    Nenhum resultado encontrado para "{search}"
                  </div>
                ) : (
                  <div className="py-2">
                    {filteredItems.map((item, index) => (
                      <motion.button
                        key={item.id}
                        onClick={() => {
                          if (item.href) {
                            navigate(item.href);
                          }
                          setIsOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left transition-colors flex items-start justify-between ${
                          index === selectedIndex
                            ? "bg-primary/20 border-l-2 border-primary"
                            : "hover:bg-white/5"
                        }`}
                        onMouseEnter={() => setSelectedIndex(index)}
                      >
                        <div className="flex-1">
                          <div className="font-heading text-sm font-bold text-white">{item.title}</div>
                          {item.description && (
                            <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
                          )}
                        </div>
                        <span className="text-[10px] text-muted-foreground ml-4 flex-shrink-0 uppercase tracking-wider">
                          {item.category}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer com dicas */}
              <div className="px-4 py-3 border-t border-border/50 bg-white/2 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex gap-4">
                  <span><kbd className="text-[9px] px-1 py-0.5 rounded bg-white/10 border border-white/20">↑↓</kbd> Navegar</span>
                  <span><kbd className="text-[9px] px-1 py-0.5 rounded bg-white/10 border border-white/20">Enter</kbd> Selecionar</span>
                  <span><kbd className="text-[9px] px-1 py-0.5 rounded bg-white/10 border border-white/20">Esc</kbd> Fechar</span>
                </div>
                <span>{filteredItems.length} resultados</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
