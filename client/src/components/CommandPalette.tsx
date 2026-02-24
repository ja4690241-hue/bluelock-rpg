import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { Search, X, Zap } from 'lucide-react';
import { searchContent, SearchResult } from '@/lib/searchIndex';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [, setLocation] = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  // Abrir/fechar com Ctrl+K ou Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
        setQuery('');
        setSelectedIndex(0);
      }

      // Fechar com Escape
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setQuery('');
      }

      // Navegação com setas
      if (isOpen && results.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % results.length);
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
        }
        if (e.key === 'Enter') {
          e.preventDefault();
          handleSelect(results[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // Focus no input quando abrir
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen]);

  // Buscar conforme digita
  useEffect(() => {
    if (query) {
      setResults(searchContent(query));
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    if (result.href) {
      setLocation(result.href);
      setIsOpen(false);
      setQuery('');
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'classe':
        return 'text-blue-400';
      case 'perícia':
        return 'text-green-400';
      case 'treinamento':
        return 'text-purple-400';
      case 'página':
        return 'text-yellow-400';
      case 'regra':
        return 'text-pink-400';
      default:
        return 'text-gray-400';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'classe':
        return 'Classe';
      case 'perícia':
        return 'Perícia';
      case 'treinamento':
        return 'Treinamento';
      case 'página':
        return 'Página';
      case 'regra':
        return 'Regra';
      default:
        return 'Resultado';
    }
  };

  return (
    <>
      {/* Botão de Busca na Navbar */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-sm text-xs font-heading tracking-wider uppercase transition-all text-muted-foreground hover:text-white hover:bg-white/5 flex-shrink-0"
        title="Buscar (Ctrl+K)"
      >
        <Search className="w-4 h-4" />
        <span className="hidden md:inline">Buscar</span>
        <span className="hidden md:inline text-[10px] text-muted-foreground ml-1">(Ctrl+K)</span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Command Palette */}
      {isOpen && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl">
          <div className="bg-gradient-to-b from-black/98 to-black/90 border border-blue-500/20 rounded-lg shadow-2xl overflow-hidden backdrop-blur-sm">
            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
              <Zap className="w-5 h-5 text-primary flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar classes, perícias, regras, páginas..."
                className="flex-1 bg-transparent text-white placeholder-muted-foreground focus:outline-none text-sm"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-sm transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {results.length > 0 ? (
                <div className="p-2 space-y-1">
                  {results.map((result, index) => (
                    <button
                      key={result.id}
                      onClick={() => handleSelect(result)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full text-left px-4 py-3 rounded-sm transition-all ${
                        index === selectedIndex
                          ? 'bg-primary/20 border border-primary/50'
                          : 'hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-heading text-sm font-bold text-white truncate">
                            {result.title}
                          </h3>
                          <p className="text-xs text-muted-foreground truncate">
                            {result.description}
                          </p>
                        </div>
                        <span className={`text-[10px] font-heading tracking-wider uppercase flex-shrink-0 ${getCategoryColor(result.category)}`}>
                          {getCategoryLabel(result.category)}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : query ? (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground text-sm">Nenhum resultado encontrado para "{query}"</p>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground text-sm mb-4">Digite para buscar...</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="px-2 py-1 rounded-sm bg-white/5 text-[10px] text-muted-foreground">Classes</span>
                    <span className="px-2 py-1 rounded-sm bg-white/5 text-[10px] text-muted-foreground">Perícias</span>
                    <span className="px-2 py-1 rounded-sm bg-white/5 text-[10px] text-muted-foreground">Regras</span>
                    <span className="px-2 py-1 rounded-sm bg-white/5 text-[10px] text-muted-foreground">Páginas</span>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-white/10 flex items-center justify-between text-[10px] text-muted-foreground">
              <div className="flex gap-4">
                <span>↑↓ para navegar</span>
                <span>Enter para selecionar</span>
                <span>Esc para fechar</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
