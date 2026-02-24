// Blue Lock RPG - Criação de Ficha Page
// Design: Manga Dynamic - Stats display with attribute cards and skill descriptions

import { motion } from "framer-motion";
import { attributes, skillDescriptions } from "@/lib/data";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function Criacao() {
  const [expandedAttr, setExpandedAttr] = useState<string | null>("potencia");

  return (
    <div className="py-16">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 bl-speed-lines-animated"
        >
          <div className="bl-tag mb-4">Parte 1</div>
          <h1 className="font-display text-6xl md:text-7xl text-white tracking-wider mb-4 bl-glitch">
            CRIAÇÃO DE FICHA
          </h1>
          <div className="w-24 h-0.5 mb-6" style={{ background: 'oklch(0.52 0.22 260)' }} />
          <p className="text-muted-foreground max-w-2xl leading-relaxed text-base">
            Os atributos no sistema de Blue Lock RPG são bem simples: eles basicamente medem o número máximo que um jogador pode ter em uma perícia respectiva a um atributo. O conjunto de atributos mostra onde um jogador é hábil, onde ele possui algo para evoluir e como cada jogador pode usar sua arma para vencer os jogos.
          </p>
        </motion.div>

        {/* Attributes Section */}
        <section className="mb-20">
          <h2 className="font-display text-4xl text-white tracking-wider mb-8">ATRIBUTOS</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {attributes.map((attr, i) => (
              <motion.div
                key={attr.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bl-card bl-card-flow overflow-hidden"
              >
                <button
                  className="w-full p-5 flex items-start gap-4 text-left"
                  onClick={() => setExpandedAttr(expandedAttr === attr.id ? null : attr.id)}
                >
                  <div
                    className="w-12 h-12 rounded-sm flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: `${attr.color}/15`, border: `1px solid ${attr.color}/30` }}
                  >
                    {attr.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-xl font-bold text-white">{attr.name}</h3>
                      {expandedAttr === attr.id
                        ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      }
                    </div>
                    {attr.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {attr.skills.map(skill => (
                          <span key={skill} className="bl-tag text-xs">{skill}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </button>

                {expandedAttr === attr.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-5 pb-5"
                  >
                    <div className="border-t border-border/50 pt-4">
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{attr.description}</p>
                      
                      {attr.id === "folego" && (
                        <div className="p-4 rounded-sm" style={{ background: 'oklch(0.52 0.22 260 / 0.1)', border: '1px solid oklch(0.52 0.22 260 / 0.3)' }}>
                          <p className="text-sm font-heading font-semibold text-white mb-1">Como definir seus pontos de Fôlego:</p>
                          <p className="text-sm text-muted-foreground">Role <span className="font-mono-stats text-primary">2d15</span> para definir seus pontos. Para aventuras, o narrador deve conceder no mínimo <span className="font-mono-stats text-primary">12 pontos</span>.</p>
                        </div>
                      )}

                      {attr.skills.length > 0 && (
                        <div className="mt-4">
                          <p className="font-heading text-xs tracking-widest uppercase text-muted-foreground mb-3">Perícias deste atributo:</p>
                          <div className="space-y-3">
                            {attr.skills.map(skill => (
                              <div key={skill} className="p-3 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)' }}>
                                <p className="font-heading text-sm font-semibold text-white mb-1">{skill}</p>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                  {skillDescriptions[skill] || "Perícia especializada deste atributo."}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Overview */}
        <section className="mb-20">
          <h2 className="font-display text-4xl text-white tracking-wider mb-4">PERÍCIAS</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed max-w-2xl">
            Para cada atributo existe uma lista com algumas perícias que são formas mais específicas de usar seus atributos. Um jogador pode ter um bom valor na perícia de Passe e no atributo de Técnica, mas não necessariamente é um bom driblador — isso porque são perícias diferentes que mostram diferentes competências de um mesmo atleta.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid oklch(0.22 0.03 260)' }}>
                  <th className="text-left py-3 px-4 font-heading text-xs tracking-widest uppercase text-muted-foreground">Atributo</th>
                  <th className="text-left py-3 px-4 font-heading text-xs tracking-widest uppercase text-muted-foreground">Perícias</th>
                </tr>
              </thead>
              <tbody>
                {attributes.filter(a => a.skills.length > 0).map((attr, i) => (
                  <tr
                    key={attr.id}
                    className="transition-colors"
                    style={{ borderBottom: '1px solid oklch(0.22 0.03 260 / 0.5)', background: i % 2 === 0 ? 'transparent' : 'oklch(0.10 0.01 260 / 0.3)' }}
                  >
                    <td className="py-3 px-4">
                      <span className="font-heading font-semibold" style={{ color: attr.color }}>
                        {attr.icon} {attr.name}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {attr.skills.map(skill => (
                          <span key={skill} className="bl-tag">{skill}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA to Class Selection */}
        <div className="bl-card p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-3xl text-white tracking-wider mb-2">PRÓXIMO PASSO</h3>
            <p className="text-muted-foreground">Agora que você entende os atributos e perícias, é hora de escolher sua classe.</p>
          </div>
          <div className="flex gap-4 flex-shrink-0">
            <Link href="/classes" className="bl-btn-primary">
              Ver Classes
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/ficha" className="bl-btn-secondary">
              Criar Ficha
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
