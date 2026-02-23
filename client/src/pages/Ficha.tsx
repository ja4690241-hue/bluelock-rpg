// Blue Lock RPG - Ficha Interativa Page
// Design: Manga Dynamic - Interactive character sheet builder

import { useState } from "react";
import { motion } from "framer-motion";
import { attributes, classes } from "@/lib/data";
import { Zap, Download, RotateCcw, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { calculateOverall, calculateRadarData } from "@/lib/overall";
import { PieChart, Pie, Cell, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

interface FichaData {
  nome: string;
  numero: string;
  classId: string;
  atributos: Record<string, number>;
  pericias: Record<string, number>;
  folego: number;
  habilidadeEscolhida: string;
  notas: string;
}

const initialFicha: FichaData = {
  nome: "",
  numero: "",
  classId: "",
  atributos: {
    potencia: 0,
    tecnica: 0,
    velocidade: 0,
    agilidade: 0,
    ego: 0,
    folego: 0
  },
  pericias: {},
  folego: 0,
  habilidadeEscolhida: "",
  notas: ""
};

const allSkills = [
  "Corpo a Corpo", "Cabeceio", "Chute",
  "Pontaria", "Domínio", "Passe", "Drible/Finta", "Intuição", "Roubo de Bola", "Furtividade",
  "Corrida a Longa Distância", "Explosão",
  "Acrobacias", "Reflexos", "Defesa",
  "Intimidação", "Presença", "Diplomacia", "Enganação"
];

const attrNames: Record<string, string> = {
  potencia: "Potência",
  tecnica: "Técnica",
  velocidade: "Velocidade",
  agilidade: "Agilidade",
  ego: "Ego",
  folego: "Fôlego"
};

export default function Ficha() {
  const [ficha, setFicha] = useState<FichaData>(initialFicha);
  const [step, setStep] = useState(1);
  const [folegoDice, setFolegoDice] = useState<number[]>([]);

  const selectedClass = classes.find(c => c.id === ficha.classId);
  const overall = calculateOverall(ficha.atributos, ficha.pericias);
  const radarData = calculateRadarData(ficha.atributos, ficha.pericias);

  const rollFolego = () => {
    const d1 = Math.floor(Math.random() * 15) + 1;
    const d2 = Math.floor(Math.random() * 15) + 1;
    const total = d1 + d2;
    setFolegoDice([d1, d2]);
    setFicha(prev => ({ ...prev, folego: Math.max(12, total) }));
    toast.success(`Fôlego rolado: ${d1} + ${d2} = ${Math.max(12, total)} pontos!`);
  };

  const updateAttr = (key: string, value: number) => {
    setFicha(prev => ({
      ...prev,
      atributos: { ...prev.atributos, [key]: Math.max(0, Math.min(10, value)) }
    }));
  };

  const updatePericia = (skill: string, value: number) => {
    setFicha(prev => ({
      ...prev,
      pericias: { ...prev.pericias, [skill]: Math.max(0, Math.min(20, value)) }
    }));
  };

  const resetFicha = () => {
    setFicha(initialFicha);
    setStep(1);
    setFolegoDice([]);
    toast.info("Ficha resetada.");
  };

  const printFicha = () => {
    window.print();
  };

  const steps = [
    { id: 1, label: "Identidade" },
    { id: 2, label: "Classe" },
    { id: 3, label: "Atributos" },
    { id: 4, label: "Perícias" },
    { id: 5, label: "Fôlego" },
    { id: 6, label: "Ficha Final" }
  ];

  return (
    <div className="py-16">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="bl-tag mb-4">Ferramenta</div>
          <h1 className="font-display text-6xl md:text-7xl text-white tracking-wider mb-4">
            CRIAR FICHA
          </h1>
          <div className="w-24 h-0.5 mb-6" style={{ background: 'oklch(0.52 0.22 260)' }} />
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Crie seu atleta passo a passo. Defina sua identidade, escolha sua classe, distribua atributos e perícias.
          </p>
        </motion.div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setStep(s.id)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-heading tracking-wider uppercase transition-all"
                style={{
                  background: step === s.id ? 'oklch(0.52 0.22 260)' : step > s.id ? 'oklch(0.52 0.22 260 / 0.2)' : 'oklch(0.12 0.015 260)',
                  color: step === s.id ? 'white' : step > s.id ? 'oklch(0.75 0.15 230)' : 'oklch(0.5 0.02 260)',
                  border: `1px solid ${step >= s.id ? 'oklch(0.52 0.22 260 / 0.5)' : 'oklch(0.22 0.03 260)'}`
                }}
              >
                <span className="font-mono-stats">{s.id}</span>
                {s.label}
              </button>
              {i < steps.length - 1 && (
                <div className="w-4 h-px" style={{ background: 'oklch(0.22 0.03 260)' }} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {/* Step 1: Identity */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bl-card p-6">
                <h2 className="font-display text-3xl text-white tracking-wider mb-6">IDENTIDADE</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block font-heading text-xs tracking-widest uppercase text-muted-foreground mb-2">Nome do Atleta</label>
                    <input
                      type="text"
                      value={ficha.nome}
                      onChange={(e) => setFicha(prev => ({ ...prev, nome: e.target.value }))}
                      placeholder="Ex: Isagi Yoichi"
                      className="w-full px-4 py-2.5 rounded-sm text-sm font-heading placeholder-muted-foreground focus:outline-none"
                      style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)', color: 'white' }}
                    />
                  </div>
                  <div>
                    <label className="block font-heading text-xs tracking-widest uppercase text-muted-foreground mb-2">Número da Camisa</label>
                    <input
                      type="text"
                      value={ficha.numero}
                      onChange={(e) => setFicha(prev => ({ ...prev, numero: e.target.value }))}
                      placeholder="Ex: 11"
                      className="w-full px-4 py-2.5 rounded-sm text-sm font-heading placeholder-muted-foreground focus:outline-none"
                      style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)', color: 'white' }}
                    />
                  </div>
                  <div>
                    <label className="block font-heading text-xs tracking-widest uppercase text-muted-foreground mb-2">Notas / Backstory</label>
                    <textarea
                      value={ficha.notas}
                      onChange={(e) => setFicha(prev => ({ ...prev, notas: e.target.value }))}
                      placeholder="Descreva seu atleta, sua história, motivações..."
                      rows={4}
                      className="w-full px-4 py-2.5 rounded-sm text-sm font-heading placeholder-muted-foreground focus:outline-none resize-none"
                      style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)', color: 'white' }}
                    />
                  </div>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="bl-btn-primary mt-6"
                  disabled={!ficha.nome}
                >
                  Próximo: Classe
                </button>
              </motion.div>
            )}

            {/* Step 2: Class */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bl-card p-6">
                <h2 className="font-display text-3xl text-white tracking-wider mb-6">ESCOLHA SUA CLASSE</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2">
                  {classes.map((cls) => (
                    <button
                      key={cls.id}
                      onClick={() => setFicha(prev => ({ ...prev, classId: cls.id, habilidadeEscolhida: "" }))}
                      className="p-4 rounded-sm text-left transition-all"
                      style={{
                        background: ficha.classId === cls.id ? 'oklch(0.52 0.22 260 / 0.2)' : 'oklch(0.12 0.015 260)',
                        border: `1px solid ${ficha.classId === cls.id ? 'oklch(0.52 0.22 260)' : 'oklch(0.22 0.03 260)'}`,
                      }}
                    >
                      <div className="font-heading text-sm font-bold text-white">{cls.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{cls.subtitle}</div>
                      <div className="bl-tag mt-2 text-xs">{cls.role}</div>
                    </button>
                  ))}
                </div>
                {selectedClass && (
                  <div className="mt-4 p-4 rounded-sm" style={{ background: 'oklch(0.52 0.22 260 / 0.1)', border: '1px solid oklch(0.52 0.22 260 / 0.3)' }}>
                    <p className="text-xs text-muted-foreground leading-relaxed">{selectedClass.description}</p>
                  </div>
                )}
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(1)} className="bl-btn-secondary">Voltar</button>
                  <button onClick={() => setStep(3)} className="bl-btn-primary" disabled={!ficha.classId}>
                    Próximo: Atributos
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Attributes */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bl-card p-6">
                <h2 className="font-display text-3xl text-white tracking-wider mb-2">ATRIBUTOS</h2>
                <p className="text-xs text-muted-foreground mb-6">Distribua seus pontos (máx. 10 por atributo). Considere os bônus da sua classe.</p>
                
                {selectedClass && (
                  <div className="mb-6 p-4 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)' }}>
                    <p className="font-heading text-xs tracking-widest uppercase text-muted-foreground mb-2">Bônus da classe {selectedClass.name}:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedClass.attributeBonus.map(b => (
                        <span key={b.attr} className="bl-badge-folego">+{b.value} {b.attr}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {attributes.map((attr) => (
                    <div key={attr.id} className="flex items-center gap-4">
                      <div className="w-8 text-center text-xl">{attr.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-heading text-sm font-semibold text-white">{attr.name}</span>
                          <span className="font-mono-stats text-lg font-bold" style={{ color: attr.color }}>
                            {ficha.atributos[attr.id] || 0}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateAttr(attr.id, (ficha.atributos[attr.id] || 0) - 1)}
                            className="w-7 h-7 rounded-sm flex items-center justify-center text-sm font-bold transition-colors"
                            style={{ background: 'oklch(0.18 0.02 260)', color: 'oklch(0.6 0.02 260)' }}
                          >−</button>
                          <div className="flex-1 flex gap-1">
                            {Array.from({ length: 10 }).map((_, i) => (
                              <button
                                key={i}
                                onClick={() => updateAttr(attr.id, i + 1)}
                                className="flex-1 h-2 rounded-full transition-colors"
                                style={{
                                  background: i < (ficha.atributos[attr.id] || 0) ? attr.color : 'oklch(0.22 0.03 260)'
                                }}
                              />
                            ))}
                          </div>
                          <button
                            onClick={() => updateAttr(attr.id, (ficha.atributos[attr.id] || 0) + 1)}
                            className="w-7 h-7 rounded-sm flex items-center justify-center text-sm font-bold transition-colors"
                            style={{ background: 'oklch(0.18 0.02 260)', color: 'oklch(0.75 0.15 230)' }}
                          >+</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(2)} className="bl-btn-secondary">Voltar</button>
                  <button onClick={() => setStep(4)} className="bl-btn-primary">Próximo: Perícias</button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Skills */}
            {step === 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bl-card p-6">
                <h2 className="font-display text-3xl text-white tracking-wider mb-2">PERÍCIAS</h2>
                <p className="text-xs text-muted-foreground mb-6">O valor máximo de uma perícia é limitado pelo atributo correspondente. Considere os bônus da sua classe.</p>

                {selectedClass && (
                  <div className="mb-6 p-4 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)' }}>
                    <p className="font-heading text-xs tracking-widest uppercase text-muted-foreground mb-2">Bônus de perícias da classe:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedClass.skillBonus.map(b => (
                        <span key={b.skill} className="bl-badge-folego">+{b.value} {b.skill}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {allSkills.map((skill) => (
                    <div key={skill} className="flex items-center gap-3 p-3 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)' }}>
                      <span className="text-xs font-heading text-white flex-1">{skill}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updatePericia(skill, (ficha.pericias[skill] || 0) - 1)}
                          className="w-6 h-6 rounded-sm text-xs font-bold"
                          style={{ background: 'oklch(0.18 0.02 260)', color: 'oklch(0.6 0.02 260)' }}
                        >−</button>
                        <span className="font-mono-stats text-sm w-6 text-center" style={{ color: 'oklch(0.75 0.15 230)' }}>
                          {ficha.pericias[skill] || 0}
                        </span>
                        <button
                          onClick={() => updatePericia(skill, (ficha.pericias[skill] || 0) + 1)}
                          className="w-6 h-6 rounded-sm text-xs font-bold"
                          style={{ background: 'oklch(0.18 0.02 260)', color: 'oklch(0.75 0.15 230)' }}
                        >+</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(3)} className="bl-btn-secondary">Voltar</button>
                  <button onClick={() => setStep(5)} className="bl-btn-primary">Próximo: Fôlego</button>
                </div>
              </motion.div>
            )}

            {/* Step 5: Folego */}
            {step === 5 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bl-card p-6">
                <h2 className="font-display text-3xl text-white tracking-wider mb-2">FÔLEGO</h2>
                <p className="text-xs text-muted-foreground mb-6">Role 2d15 para definir seus pontos de fôlego. O mínimo para aventuras é 12.</p>

                <div className="text-center py-8">
                  <div className="font-display text-8xl text-white mb-4 bl-glow">
                    {ficha.folego || "?"}
                  </div>
                  {folegoDice.length > 0 && (
                    <p className="text-muted-foreground font-heading text-sm mb-4">
                      {folegoDice[0]} + {folegoDice[1]} = {folegoDice[0] + folegoDice[1]}
                      {folegoDice[0] + folegoDice[1] < 12 && " → Mínimo 12 aplicado"}
                    </p>
                  )}
                  <button onClick={rollFolego} className="bl-btn-primary mx-auto">
                    <Zap className="w-4 h-4" />
                    Rolar 2d15
                  </button>
                </div>

                <div className="mt-4">
                  <label className="block font-heading text-xs tracking-widest uppercase text-muted-foreground mb-2">Ou defina manualmente:</label>
                  <input
                    type="number"
                    min={0}
                    max={30}
                    value={ficha.folego}
                    onChange={(e) => setFicha(prev => ({ ...prev, folego: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-2.5 rounded-sm text-sm font-heading focus:outline-none"
                    style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)', color: 'white' }}
                  />
                </div>

                {selectedClass && (
                  <div className="mt-6">
                    <label className="block font-heading text-xs tracking-widest uppercase text-muted-foreground mb-3">Habilidade Inicial:</label>
                    <div className="space-y-2">
                      {selectedClass.abilities.map((ability) => (
                        <button
                          key={ability.name}
                          onClick={() => setFicha(prev => ({ ...prev, habilidadeEscolhida: ability.name }))}
                          className="w-full p-3 rounded-sm text-left transition-all"
                          style={{
                            background: ficha.habilidadeEscolhida === ability.name ? 'oklch(0.52 0.22 260 / 0.2)' : 'oklch(0.12 0.015 260)',
                            border: `1px solid ${ficha.habilidadeEscolhida === ability.name ? 'oklch(0.52 0.22 260)' : 'oklch(0.22 0.03 260)'}`
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-heading text-sm font-semibold text-white">{ability.name}</span>
                            <span className="bl-badge-folego text-xs">
                              <Zap className="w-3 h-3" />{ability.cost}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{ability.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(4)} className="bl-btn-secondary">Voltar</button>
                  <button onClick={() => setStep(6)} className="bl-btn-primary" disabled={ficha.folego === 0}>
                    Ver Ficha Final
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 6: Final Sheet */}
            {step === 6 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="bl-card p-6 print:shadow-none" id="ficha-final">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="font-display text-5xl text-white tracking-wider bl-glow">{ficha.nome || "Atleta"}</h2>
                      {ficha.numero && (
                        <span className="font-display text-2xl" style={{ color: 'oklch(0.52 0.22 260)' }}>#{ficha.numero}</span>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="mb-3">
                        <div className="font-heading text-xs tracking-widest uppercase text-muted-foreground mb-1">Overall Rating</div>
                        <div className="flex items-center gap-3">
                          <div className="text-center">
                            <div className="font-mono-stats text-5xl font-bold" style={{ color: overall.rankColor }}>
                              {overall.rank}
                            </div>
                            <div className="font-mono-stats text-2xl font-bold text-white mt-1">
                              {overall.total}
                            </div>
                          </div>
                          <div className="text-left">
                            <div className="font-heading text-sm font-bold text-white">{overall.description}</div>
                          </div>
                        </div>
                      </div>
                      {selectedClass && (
                        <div className="mt-4 pt-4 border-t" style={{ borderColor: 'oklch(0.22 0.03 260)' }}>
                          <div className="font-heading text-lg font-bold text-white">{selectedClass.name}</div>
                          <div className="text-xs text-muted-foreground">{selectedClass.subtitle}</div>
                          <div className="bl-tag mt-1">{selectedClass.role}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="font-heading text-xs tracking-widest uppercase text-muted-foreground mb-3">Atributos</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {attributes.map((attr) => (
                          <div key={attr.id} className="text-center p-3 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)' }}>
                            <div className="text-xl mb-1">{attr.icon}</div>
                            <div className="font-mono-stats text-2xl font-bold" style={{ color: attr.color }}>
                              {ficha.atributos[attr.id] || 0}
                            </div>
                            <div className="font-heading text-xs text-muted-foreground tracking-wider">{attr.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {Object.values(ficha.pericias).some(v => v > 0) && (
                      <div>
                        <h3 className="font-heading text-xs tracking-widest uppercase text-muted-foreground mb-3">Gráfico de Atributos</h3>
                        <div className="p-4 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)' }}>
                          <ResponsiveContainer width="100%" height={250}>
                            <RadarChart data={[
                              {
                                name: "Potência",
                                value: ficha.atributos.potencia * 10,
                                fill: "oklch(0.75 0.18 25)"
                              },
                              {
                                name: "Técnica",
                                value: ficha.atributos.tecnica * 10,
                                fill: "oklch(0.75 0.15 230)"
                              },
                              {
                                name: "Velocidade",
                                value: ficha.atributos.velocidade * 10,
                                fill: "oklch(0.75 0.18 160)"
                              },
                              {
                                name: "Agilidade",
                                value: ficha.atributos.agilidade * 10,
                                fill: "oklch(0.75 0.18 280)"
                              },
                              {
                                name: "Ego",
                                value: ficha.atributos.ego * 10,
                                fill: "oklch(0.75 0.18 60)"
                              },
                              {
                                name: "Fôlego",
                                value: ficha.atributos.folego * 10,
                                fill: "oklch(0.52 0.22 260)"
                              }
                            ]}>
                              <PolarGrid stroke="oklch(0.22 0.03 260)" />
                              <PolarAngleAxis dataKey="name" tick={{ fontSize: 11, fill: "oklch(0.5 0.02 260)" }} />
                              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: "oklch(0.5 0.02 260)" }} />
                              <Radar name="Atributos" dataKey="value" stroke="oklch(0.52 0.22 260)" fill="oklch(0.52 0.22 260)" fillOpacity={0.25} />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Zap className="w-4 h-4" style={{ color: 'oklch(0.52 0.22 260)' }} />
                      <span className="font-heading text-sm font-semibold text-white">Fôlego</span>
                      <span className="font-mono-stats text-2xl font-bold" style={{ color: 'oklch(0.52 0.22 260)' }}>{ficha.folego}</span>
                    </div>
                  </div>

                  {Object.entries(ficha.pericias).filter(([, v]) => v > 0).length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-heading text-xs tracking-widest uppercase text-muted-foreground mb-3">Perícias</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {Object.entries(ficha.pericias)
                          .filter(([, v]) => v > 0)
                          .sort(([, a], [, b]) => b - a)
                          .map(([skill, value]) => (
                            <div key={skill} className="flex items-center justify-between p-2 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)' }}>
                              <span className="text-xs text-white font-heading">{skill}</span>
                              <span className="font-mono-stats text-sm font-bold" style={{ color: 'oklch(0.75 0.15 230)' }}>+{value}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {ficha.habilidadeEscolhida && selectedClass && (
                    <div className="mb-6">
                      <h3 className="font-heading text-xs tracking-widest uppercase text-muted-foreground mb-3">Habilidade Inicial</h3>
                      {selectedClass.abilities.filter(a => a.name === ficha.habilidadeEscolhida).map(ability => (
                        <div key={ability.name} className="p-4 rounded-sm" style={{ background: 'oklch(0.52 0.22 260 / 0.1)', border: '1px solid oklch(0.52 0.22 260 / 0.3)' }}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-heading text-base font-bold text-white">{ability.name}</span>
                            <span className="bl-badge-folego"><Zap className="w-3 h-3" />{ability.cost}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{ability.description}</p>
                          <p className="text-xs font-heading font-semibold" style={{ color: 'oklch(0.75 0.15 230)' }}>{ability.bonus}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {ficha.notas && (
                    <div>
                      <h3 className="font-heading text-xs tracking-widest uppercase text-muted-foreground mb-2">Notas</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{ficha.notas}</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(5)} className="bl-btn-secondary">Voltar</button>
                  <button onClick={printFicha} className="bl-btn-primary">
                    <Download className="w-4 h-4" />
                    Imprimir / Salvar
                  </button>
                  <button onClick={resetFicha} className="bl-btn-secondary">
                    <RotateCcw className="w-4 h-4" />
                    Nova Ficha
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar: Preview */}
          <div className="hidden lg:block">
            <div className="bl-card p-5 sticky top-24">
              <h3 className="font-heading text-xs tracking-widest uppercase text-muted-foreground mb-4">Preview da Ficha</h3>
              
              <div className="space-y-3">
                <div>
                  <span className="font-display text-2xl text-white">{ficha.nome || "—"}</span>
                  {ficha.numero && <span className="font-display text-lg ml-2" style={{ color: 'oklch(0.52 0.22 260)' }}>#{ficha.numero}</span>}
                </div>

                {selectedClass && (
                  <div className="p-2 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)' }}>
                    <p className="text-xs font-heading font-semibold text-white">{selectedClass.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedClass.role}</p>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-1">
                  {attributes.slice(0, 5).map((attr) => (
                    <div key={attr.id} className="text-center p-2 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)' }}>
                      <div className="font-mono-stats text-lg font-bold" style={{ color: attr.color }}>
                        {ficha.atributos[attr.id] || 0}
                      </div>
                      <div className="text-xs text-muted-foreground">{attr.name.slice(0, 3)}</div>
                    </div>
                  ))}
                  <div className="text-center p-2 rounded-sm" style={{ background: 'oklch(0.52 0.22 260 / 0.1)' }}>
                    <div className="font-mono-stats text-lg font-bold" style={{ color: 'oklch(0.52 0.22 260)' }}>
                      {ficha.folego || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">FO</div>
                  </div>
                </div>

                {ficha.habilidadeEscolhida && (
                  <div className="p-2 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)' }}>
                    <p className="text-xs text-muted-foreground">Habilidade:</p>
                    <p className="text-xs font-heading font-semibold text-white">{ficha.habilidadeEscolhida}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
