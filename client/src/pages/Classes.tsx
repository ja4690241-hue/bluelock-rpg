// Blue Lock RPG - Classes Page
// Design: Manga Dynamic - Class cards with ability accordions

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { classes } from "@/lib/data";
import { ChevronDown, ChevronUp, Zap, Filter } from "lucide-react";
import { useLocation } from "wouter";

const difficultyColor: Record<string, string> = {
  "Fácil": "oklch(0.65 0.18 145)",
  "Médio": "oklch(0.75 0.18 60)",
  "Difícil": "oklch(0.75 0.18 25)",
  "Muito Difícil": "oklch(0.58 0.22 25)"
};

const roleFilters = ["Todos", "Ataque", "Defesa", "Meio-Campo", "Suporte", "Universal"];

export default function Classes() {
  const [location] = useLocation();
  const [expandedClass, setExpandedClass] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setExpandedClass(hash);
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [location]);

  const filteredClasses = classes.filter(cls => {
    const matchesRole = selectedRole === "Todos" || cls.role.includes(selectedRole);
    const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="py-16">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="bl-tag mb-4">Parte 2</div>
          <h1 className="font-display text-6xl md:text-7xl text-white tracking-wider mb-4">
            CLASSES
          </h1>
          <div className="w-24 h-0.5 mb-6" style={{ background: 'oklch(0.52 0.22 260)' }} />
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Não somente de atributos e perícias vive o jogador. As classes mostram ainda mais a fundo quais são as especialidades do seu atleta dentro do RPG, dando bônus em atributos e as mais importantes: as habilidades! Habilidades são capacidades que os jogadores declaram usar durante a partida e elas gastam fôlego do seu personagem.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Buscar classe..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 rounded-sm text-sm font-heading tracking-wider placeholder-muted-foreground focus:outline-none transition-colors"
              style={{
                background: 'oklch(0.12 0.015 260)',
                border: '1px solid oklch(0.22 0.03 260)',
                color: 'oklch(0.94 0.01 220)'
              }}
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            {roleFilters.map(role => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className="px-3 py-1.5 text-xs font-heading tracking-wider uppercase rounded-sm transition-all duration-200"
                style={{
                  background: selectedRole === role ? 'oklch(0.52 0.22 260)' : 'oklch(0.12 0.015 260)',
                  color: selectedRole === role ? 'white' : 'oklch(0.6 0.02 260)',
                  border: `1px solid ${selectedRole === role ? 'oklch(0.52 0.22 260)' : 'oklch(0.22 0.03 260)'}`
                }}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Classes count */}
        <p className="text-xs text-muted-foreground font-heading tracking-wider mb-6">
          {filteredClasses.length} {filteredClasses.length === 1 ? 'classe encontrada' : 'classes encontradas'}
        </p>

        {/* Classes Grid */}
        <div className="space-y-4">
          {filteredClasses.map((cls, i) => (
            <motion.div
              key={cls.id}
              id={cls.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bl-card overflow-hidden"
            >
              {/* Class Header */}
              <button
                className="w-full p-6 flex items-start gap-4 text-left"
                onClick={() => setExpandedClass(expandedClass === cls.id ? null : cls.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bl-tag">{cls.role}</span>
                        <span
                          className="text-xs font-heading tracking-wider px-2 py-0.5 rounded-sm"
                          style={{
                            color: difficultyColor[cls.difficulty] || 'oklch(0.75 0.15 230)',
                            background: `${difficultyColor[cls.difficulty] || 'oklch(0.52 0.22 260)'}/15`,
                            border: `1px solid ${difficultyColor[cls.difficulty] || 'oklch(0.52 0.22 260)'}/30`
                          }}
                        >
                          {cls.difficulty}
                        </span>
                      </div>
                      <h2 className="font-heading text-2xl font-bold text-white">{cls.name}</h2>
                      <p className="text-sm text-muted-foreground font-heading tracking-wider">{cls.subtitle}</p>
                    </div>
                    <div className="flex-shrink-0 mt-1">
                      {expandedClass === cls.id
                        ? <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        : <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      }
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{cls.description}</p>
                </div>
              </button>

              {/* Expanded Content */}
              {expandedClass === cls.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-6 pb-6"
                >
                  <div className="border-t border-border/50 pt-6">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">{cls.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Attribute Bonuses */}
                      <div>
                        <h3 className="font-heading text-xs tracking-widest uppercase text-muted-foreground mb-3">Bônus em Atributos</h3>
                        <div className="space-y-2">
                          {cls.attributeBonus.map((bonus) => (
                            <div key={bonus.attr} className="flex items-center justify-between p-2 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)' }}>
                              <span className="text-sm text-white font-heading">{bonus.attr}</span>
                              <span className="font-mono-stats text-sm font-semibold" style={{ color: 'oklch(0.75 0.15 230)' }}>+{bonus.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Skill Bonuses */}
                      <div>
                        <h3 className="font-heading text-xs tracking-widest uppercase text-muted-foreground mb-3">Bônus em Perícias</h3>
                        <div className="space-y-2">
                          {cls.skillBonus.map((bonus) => (
                            <div key={bonus.skill} className="flex items-center justify-between p-2 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)' }}>
                              <span className="text-sm text-white font-heading">{bonus.skill}</span>
                              <span className="font-mono-stats text-sm font-semibold" style={{ color: 'oklch(0.75 0.15 230)' }}>+{bonus.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Abilities */}
                    <div>
                      <h3 className="font-heading text-xs tracking-widest uppercase text-muted-foreground mb-4">Habilidades</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {cls.abilities.map((ability) => (
                          <div
                            key={ability.name}
                            className="p-4 rounded-sm"
                            style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)' }}
                          >
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h4 className="font-heading text-base font-semibold text-white">{ability.name}</h4>
                              <span
                                className="text-xs px-1.5 py-0.5 rounded-sm font-heading tracking-wider flex-shrink-0"
                                style={{
                                  background: ability.type === 'Passivo' ? 'oklch(0.65 0.18 145 / 0.15)' : 'oklch(0.52 0.22 260 / 0.15)',
                                  color: ability.type === 'Passivo' ? 'oklch(0.65 0.18 145)' : 'oklch(0.75 0.15 230)',
                                  border: `1px solid ${ability.type === 'Passivo' ? 'oklch(0.65 0.18 145 / 0.3)' : 'oklch(0.52 0.22 260 / 0.3)'}`
                                }}
                              >
                                {ability.type}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <span className="bl-badge-folego">
                                <Zap className="w-3 h-3" />
                                {ability.cost}
                              </span>
                              {ability.duration !== "Instantâneo" && ability.duration !== "Permanente" && (
                                <span className="bl-badge-folego">{ability.duration}</span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed mb-3">{ability.description}</p>
                            <div className="p-2 rounded-sm" style={{ background: 'oklch(0.52 0.22 260 / 0.1)', border: '1px solid oklch(0.52 0.22 260 / 0.2)' }}>
                              <p className="text-xs font-heading font-semibold mb-0.5" style={{ color: 'oklch(0.75 0.15 230)' }}>Bônus:</p>
                              <p className="text-xs text-muted-foreground">{ability.bonus}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {filteredClasses.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground font-heading tracking-wider">Nenhuma classe encontrada com os filtros selecionados.</p>
          </div>
        )}
      </div>
    </div>
  );
}
