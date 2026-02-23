// Blue Lock RPG - Ficha Interativa Page
// Design: Manga Dynamic - Interactive character sheet builder

import { useState } from "react";
import { motion } from "framer-motion";
import { attributes, classes, skillDescriptions } from "@/lib/data";
import { trainings } from "@/lib/trainings";
import { Zap, Download, RotateCcw, ChevronDown, Trophy, Star } from "lucide-react";
import { toast } from "sonner";
import { calculateOverall } from "@/lib/overall";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";

interface FichaData {
  nome: string;
  numero: string;
  classId: string;
  atributos: Record<string, number>;
  pericias: Record<string, number>;
  folego: number;
  treinamentos: string[];
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
  },
  pericias: {},
  folego: 0,
  treinamentos: [],
  notas: ""
};

const allSkills = [
  "Corpo a Corpo", "Cabeceio", "Chute",
  "Pontaria", "Domínio", "Passe", "Drible/Finta", "Intuição", "Roubo de Bola", "Furtividade",
  "Corrida a Longa Distância", "Explosão",
  "Acrobacias", "Reflexos", "Defesa",
  "Intimidação", "Presença", "Diplomacia", "Enganação"
];

export default function Ficha() {
  const [ficha, setFicha] = useState<FichaData>(initialFicha);
  const [step, setStep] = useState(1);
  const [folegoDice, setFolegoDice] = useState<number[]>([]);

  const selectedClass = classes.find(c => c.id === ficha.classId);
  const overallData = calculateOverall(ficha.atributos, ficha.pericias);
  
  // Radar data preparation based on the 5 main attributes
  const radarData = [
    { subject: 'Potência', A: (ficha.atributos.potencia || 0) * 10, fullMark: 100 },
    { subject: 'Técnica', A: (ficha.atributos.tecnica || 0) * 10, fullMark: 100 },
    { subject: 'Velocidade', A: (ficha.atributos.velocidade || 0) * 10, fullMark: 100 },
    { subject: 'Agilidade', A: (ficha.atributos.agilidade || 0) * 10, fullMark: 100 },
    { subject: 'Ego', A: (ficha.atributos.ego || 0) * 10, fullMark: 100 },
  ];

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

  const toggleTraining = (id: string) => {
    setFicha(prev => ({
      ...prev,
      treinamentos: prev.treinamentos.includes(id) 
        ? prev.treinamentos.filter(t => t !== id)
        : [...prev.treinamentos, id]
    }));
  };

  const steps = [
    { id: 1, label: "Identidade" },
    { id: 2, label: "Classe" },
    { id: 3, label: "Atributos" },
    { id: 4, label: "Perícias" },
    { id: 5, label: "Treinos" },
    { id: 6, label: "Fôlego" },
    { id: 7, label: "Ficha Final" }
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
          <h1 className="font-display text-6xl md:text-7xl text-white tracking-wider mb-4 uppercase italic">
            CRIAR FICHA
          </h1>
          <div className="w-24 h-0.5 mb-6" style={{ background: 'oklch(0.52 0.22 260)' }} />
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Crie seu atleta passo a passo. Defina sua identidade, escolha sua classe, distribua atributos, perícias e treinamentos.
          </p>
        </motion.div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 custom-scrollbar">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {classes.map((cls) => (
                    <button
                      key={cls.id}
                      onClick={() => setFicha(prev => ({ ...prev, classId: cls.id }))}
                      className="p-4 rounded-sm text-left transition-all"
                      style={{
                        background: ficha.classId === cls.id ? 'oklch(0.52 0.22 260 / 0.2)' : 'oklch(0.12 0.015 260)',
                        border: `1px solid ${ficha.classId === cls.id ? 'oklch(0.52 0.22 260)' : 'oklch(0.22 0.03 260)'}`,
                      }}
                    >
                      <div className="font-heading text-sm font-bold text-white uppercase italic">{cls.name}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wider">{cls.subtitle}</div>
                      <div className="bl-tag mt-2 text-[10px]">{cls.role}</div>
                    </button>
                  ))}
                </div>
                {selectedClass && (
                  <div className="mt-4 p-4 rounded-sm" style={{ background: 'oklch(0.52 0.22 260 / 0.1)', border: '1px solid oklch(0.52 0.22 260 / 0.3)' }}>
                    <p className="text-xs text-muted-foreground leading-relaxed italic">"{selectedClass.description}"</p>
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
                <h2 className="font-display text-3xl text-white tracking-wider mb-2 uppercase italic">ATRIBUTOS</h2>
                <p className="text-xs text-muted-foreground mb-6 italic">Distribua seus pontos (máx. 10 por atributo). Considere os bônus da sua classe.</p>
                
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

                <div className="space-y-6">
                  {attributes.filter(a => a.id !== 'folego').map((attr) => (
                    <div key={attr.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{attr.icon}</span>
                          <span className="font-heading text-sm font-bold text-white uppercase italic tracking-wider">{attr.name}</span>
                        </div>
                        <span className="font-mono-stats text-2xl font-black italic" style={{ color: attr.color }}>
                          {ficha.atributos[attr.id] || 0}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateAttr(attr.id, (ficha.atributos[attr.id] || 0) - 1)}
                          className="w-8 h-8 rounded-sm flex items-center justify-center text-lg font-black transition-colors"
                          style={{ background: 'oklch(0.18 0.02 260)', color: 'oklch(0.6 0.02 260)' }}
                        >−</button>
                        <div className="flex-1 flex gap-1.5">
                          {Array.from({ length: 10 }).map((_, i) => (
                            <button
                              key={i}
                              onClick={() => updateAttr(attr.id, i + 1)}
                              className="flex-1 h-2.5 rounded-sm transition-all duration-300"
                              style={{
                                background: i < (ficha.atributos[attr.id] || 0) ? attr.color : 'oklch(0.22 0.03 260)',
                                boxShadow: i < (ficha.atributos[attr.id] || 0) ? `0 0 10px ${attr.color}44` : 'none'
                              }}
                            />
                          ))}
                        </div>
                        <button
                          onClick={() => updateAttr(attr.id, (ficha.atributos[attr.id] || 0) + 1)}
                          className="w-8 h-8 rounded-sm flex items-center justify-center text-lg font-black transition-colors"
                          style={{ background: 'oklch(0.18 0.02 260)', color: 'oklch(0.75 0.15 230)' }}
                        >+</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mt-8">
                  <button onClick={() => setStep(2)} className="bl-btn-secondary">Voltar</button>
                  <button onClick={() => setStep(4)} className="bl-btn-primary">Próximo: Perícias</button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Skills */}
            {step === 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bl-card p-6">
                <h2 className="font-display text-3xl text-white tracking-wider mb-2 uppercase italic">PERÍCIAS</h2>
                <p className="text-xs text-muted-foreground mb-6 italic">O valor máximo de uma perícia é limitado pelo atributo correspondente.</p>

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {allSkills.map((skill) => (
                    <div key={skill} className="flex items-center gap-3 p-3 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)' }}>
                      <span className="text-xs font-heading text-white flex-1 uppercase tracking-tight">{skill}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updatePericia(skill, (ficha.pericias[skill] || 0) - 1)}
                          className="w-7 h-7 rounded-sm text-sm font-black flex items-center justify-center"
                          style={{ background: 'oklch(0.18 0.02 260)', color: 'oklch(0.6 0.02 260)' }}
                        >−</button>
                        <span className="font-mono-stats text-sm w-6 text-center font-bold" style={{ color: 'oklch(0.75 0.15 230)' }}>
                          {ficha.pericias[skill] || 0}
                        </span>
                        <button
                          onClick={() => updatePericia(skill, (ficha.pericias[skill] || 0) + 1)}
                          className="w-7 h-7 rounded-sm text-sm font-black flex items-center justify-center"
                          style={{ background: 'oklch(0.18 0.02 260)', color: 'oklch(0.75 0.15 230)' }}
                        >+</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(3)} className="bl-btn-secondary">Voltar</button>
                  <button onClick={() => setStep(5)} className="bl-btn-primary">Próximo: Treinos</button>
                </div>
              </motion.div>
            )}

            {/* Step 5: Trainings */}
            {step === 5 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bl-card p-6">
                <h2 className="font-display text-3xl text-white tracking-wider mb-2 uppercase italic">TREINAMENTOS</h2>
                <p className="text-xs text-muted-foreground mb-6 italic">Escolha seus treinamentos (recomendado 2-3). Eles fornecem bônus específicos.</p>

                <div className="grid grid-cols-1 gap-3 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                  {trainings.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => toggleTraining(t.id)}
                      className="p-4 rounded-sm text-left transition-all relative overflow-hidden group"
                      style={{
                        background: ficha.treinamentos.includes(t.id) ? 'oklch(0.52 0.22 260 / 0.15)' : 'oklch(0.12 0.015 260)',
                        border: `1px solid ${ficha.treinamentos.includes(t.id) ? 'oklch(0.52 0.22 260)' : 'oklch(0.22 0.03 260)'}`,
                      }}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-heading text-sm font-bold text-white uppercase italic">{t.name}</span>
                        <span className="text-[9px] uppercase tracking-widest text-muted-foreground">{t.category}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-tight mb-2 italic">"{t.description}"</p>
                      <div className="text-[10px] text-primary font-bold uppercase tracking-tight">{t.effect}</div>
                      {ficha.treinamentos.includes(t.id) && (
                        <div className="absolute top-0 right-0 p-1">
                          <Star className="w-3 h-3 fill-primary text-primary" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(4)} className="bl-btn-secondary">Voltar</button>
                  <button onClick={() => setStep(6)} className="bl-btn-primary">Próximo: Fôlego</button>
                </div>
              </motion.div>
            )}

            {/* Step 6: Fôlego */}
            {step === 6 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bl-card p-6">
                <h2 className="font-display text-3xl text-white tracking-wider mb-2 uppercase italic text-center">FÔLEGO</h2>
                <p className="text-xs text-muted-foreground mb-12 italic text-center">Role 2d15 para definir seus pontos de fôlego (mínimo 12).</p>

                <div className="flex flex-col items-center justify-center py-8">
                  <div className="w-48 h-48 rounded-full flex flex-col items-center justify-center mb-8 relative" style={{ background: 'oklch(0.12 0.015 260)', border: '4px solid oklch(0.52 0.22 260)' }}>
                    <div className="text-6xl font-black italic tracking-tighter" style={{ color: 'oklch(0.52 0.22 260)' }}>
                      {ficha.folego || "?"}
                    </div>
                    <div className="text-[10px] font-heading uppercase tracking-[0.3em] text-muted-foreground mt-2">PONTOS</div>
                    {folegoDice.length > 0 && (
                      <div className="absolute -bottom-4 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono">
                        Dados: {folegoDice[0]} + {folegoDice[1]}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={rollFolego}
                    className="bl-btn-primary h-16 px-12 text-lg gap-3"
                  >
                    <Zap className="w-6 h-6 fill-current" />
                    ROLAR 2D15
                  </button>
                </div>

                <div className="flex gap-3 mt-12">
                  <button onClick={() => setStep(5)} className="bl-btn-secondary">Voltar</button>
                  <button onClick={() => setStep(7)} className="bl-btn-primary" disabled={!ficha.folego}>
                    Ver Ficha Final
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 7: Final Sheet */}
            {step === 7 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bl-card p-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
                  <div>
                    <h2 className="font-display text-5xl text-white tracking-wider uppercase italic mb-2">{ficha.nome || "ATLETA SEM NOME"}</h2>
                    <p className="font-heading text-xl text-primary italic tracking-tighter">#{ficha.numero || "00"}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-heading uppercase tracking-[0.3em] text-muted-foreground mb-1">OVERALL RATING</div>
                    <div className="flex items-baseline justify-end gap-2">
                      <span className="text-6xl font-black italic tracking-tighter" style={{ color: overallData.rankColor }}>{overallData.total}</span>
                      <span className="text-3xl font-black italic" style={{ color: overallData.rankColor }}>{overallData.rank}</span>
                    </div>
                    <div className="text-xs font-heading uppercase tracking-widest mt-1" style={{ color: overallData.rankColor }}>{overallData.description}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                  <div className="space-y-8">
                    <div>
                      <h3 className="font-heading text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">ATRIBUTOS</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {attributes.filter(a => a.id !== 'folego').map(attr => (
                          <div key={attr.id} className="p-4 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)', border: `1px solid ${attr.color}33` }}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-lg">{attr.icon}</span>
                              <span className="font-mono-stats text-xl font-black italic" style={{ color: attr.color }}>{ficha.atributos[attr.id] || 0}</span>
                            </div>
                            <div className="text-[10px] font-heading uppercase tracking-widest text-muted-foreground">{attr.name}</div>
                          </div>
                        ))}
                        <div className="p-4 rounded-sm col-span-2" style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.52 0.22 260 / 0.3)' }}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-lg">💙</span>
                            <span className="font-mono-stats text-xl font-black italic" style={{ color: 'oklch(0.52 0.22 260)' }}>{ficha.folego}</span>
                          </div>
                          <div className="text-[10px] font-heading uppercase tracking-widest text-muted-foreground">FÔLEGO MÁXIMO</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-heading text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">CLASSE & HABILIDADES</h3>
                      <div className="p-6 rounded-sm mb-4" style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)' }}>
                        <div className="font-display text-2xl text-white italic uppercase mb-1">{selectedClass?.name}</div>
                        <div className="text-[10px] font-heading uppercase tracking-widest text-primary mb-4">{selectedClass?.subtitle}</div>
                        
                        <div className="space-y-6">
                          {selectedClass?.abilities.map((ability) => (
                            <div key={ability.name} className="space-y-2 pt-4 border-t border-white/5">
                              <div className="flex justify-between items-center">
                                <span className="font-heading text-sm font-bold text-white uppercase italic">{ability.name}</span>
                                <span className="bl-badge-folego">{ability.cost}</span>
                              </div>
                              <p className="text-[11px] text-muted-foreground leading-relaxed italic">{ability.description}</p>
                              <div className="p-2 rounded-sm bg-primary/5 border border-primary/10 text-[10px] text-primary font-bold uppercase">
                                EFEITO: {ability.bonus}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h3 className="font-heading text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">GRÁFICO DE ATRIBUTOS</h3>
                      <div className="h-[300px] w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                            <PolarGrid stroke="oklch(0.22 0.03 260)" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: 'oklch(0.5 0.02 260)', fontSize: 10, fontWeight: 'bold' }} />
                            <Radar
                              name="Atleta"
                              dataKey="A"
                              stroke="oklch(0.52 0.22 260)"
                              fill="oklch(0.52 0.22 260)"
                              fillOpacity={0.6}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-heading text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">TREINAMENTOS</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {ficha.treinamentos.length > 0 ? ficha.treinamentos.map(tId => {
                          const t = trainings.find(x => x.id === tId);
                          return (
                            <div key={tId} className="p-3 rounded-sm bg-white/5 border border-white/10">
                              <div className="font-heading text-[11px] font-bold text-white uppercase italic mb-1">{t?.name}</div>
                              <div className="text-[10px] text-primary font-bold leading-tight">{t?.effect}</div>
                            </div>
                          );
                        }) : (
                          <div className="text-xs text-muted-foreground italic">Nenhum treinamento selecionado.</div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-heading text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">PERÍCIAS PRINCIPAIS</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(ficha.pericias)
                          .filter(([_, val]) => val > 0)
                          .sort((a, b) => b[1] - a[1])
                          .slice(0, 8)
                          .map(([name, val]) => (
                            <div key={name} className="flex items-center justify-between p-2 rounded-sm bg-white/5">
                              <span className="text-[10px] font-heading uppercase text-muted-foreground">{name}</span>
                              <span className="font-mono-stats text-sm font-bold text-white">+{val}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-8 border-t border-white/10">
                  <button onClick={() => window.print()} className="bl-btn-primary gap-2">
                    <Download className="w-4 h-4" /> IMPRIMIR / SALVAR PDF
                  </button>
                  <button onClick={() => { setFicha(initialFicha); setStep(1); }} className="bl-btn-secondary gap-2">
                    <RotateCcw className="w-4 h-4" /> NOVA FICHA
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar Preview */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="bl-card p-6 border-primary/20">
                <div className="text-[10px] font-heading uppercase tracking-[0.3em] text-muted-foreground mb-4">PREVIEW DA FICHA</div>
                <div className="space-y-4">
                  <div>
                    <div className="text-xl font-display text-white uppercase italic truncate">{ficha.nome || "Novo Atleta"}</div>
                    <div className="text-primary font-heading text-xs">#{ficha.numero || "00"}</div>
                  </div>
                  
                  <div className="flex items-center gap-4 py-4 border-y border-white/5">
                    <div className="text-center">
                      <div className="text-2xl font-black italic" style={{ color: overallData.rankColor }}>{overallData.total}</div>
                      <div className="text-[8px] font-heading uppercase tracking-widest text-muted-foreground">OVERALL</div>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <div>
                      <div className="text-xl font-black italic" style={{ color: overallData.rankColor }}>{overallData.rank}</div>
                      <div className="text-[8px] font-heading uppercase tracking-widest text-muted-foreground">RANK</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(ficha.atributos).map(([key, val]) => (
                      <div key={key} className="text-center p-2 rounded-sm bg-white/5">
                        <div className="text-xs font-bold text-white">{val}</div>
                        <div className="text-[8px] font-heading uppercase text-muted-foreground">{key.slice(0, 3)}</div>
                      </div>
                    ))}
                  </div>

                  {selectedClass && (
                    <div className="pt-2">
                      <div className="text-[10px] font-heading uppercase text-muted-foreground mb-1">CLASSE</div>
                      <div className="text-xs font-bold text-white uppercase italic">{selectedClass.name}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-sm bg-primary/10 border border-primary/20">
                <p className="text-[10px] text-primary/80 leading-relaxed italic uppercase font-bold">
                  "O futebol é um esporte onde você cria seu próprio valor através do seu ego."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
