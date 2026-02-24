// Blue Lock RPG - Ficha Interativa Page
// Design: Manga Dynamic - Interactive character sheet builder

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { attributes, classes, skillDescriptions } from "@/lib/data";
import { trainings } from "@/lib/trainings";
import { Zap, Download, RotateCcw, ChevronDown, Trophy, Star, Save, Image as ImageIcon, FileText } from "lucide-react";
import { toast } from "sonner";
import { calculateOverall } from "@/lib/overall";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";
import { useFichaStorage } from "@/hooks/useFichaStorage";
import { exportFichaAsImage, exportFichaAsPDF } from "@/lib/exportFicha";

interface FichaData {
  nome: string;
  numero: string;
  classId: string;
  atributos: Record<string, number>;
  pericias: Record<string, number>;
  folego: number;
  treinamentos: string[];
  notas: string;
  foto?: string;
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
  notas: "",
  foto: undefined
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
  const [isExporting, setIsExporting] = useState(false);
  const fichaRef = useRef<HTMLDivElement>(null);

  const { loadFicha, clearFicha } = useFichaStorage(ficha);

  // Carregar ficha salva ao iniciar
  useEffect(() => {
    const saved = loadFicha();
    if (saved) {
      setFicha(saved);
      toast.info("Ficha carregada do rascunho salvo!");
    }
  }, []);

  const selectedClass = classes.find(c => c.id === ficha.classId);
  const overallData = calculateOverall(ficha.atributos, ficha.pericias);
  
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

  const handleExportImage = async () => {
    setIsExporting(true);
    toast.promise(exportFichaAsImage(ficha, selectedClass, 'ficha-final-card'), {
      loading: 'Gerando imagem da ficha...',
      success: 'Imagem baixada com sucesso!',
      error: 'Erro ao gerar imagem.',
    }).finally(() => setIsExporting(false));
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    toast.promise(exportFichaAsPDF(ficha, selectedClass, 'ficha-final-card'), {
      loading: 'Gerando PDF da ficha...',
      success: 'PDF baixado com sucesso!',
      error: 'Erro ao gerar PDF.',
    }).finally(() => setIsExporting(false));
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
            Crie seu atleta passo a passo. Defina sua identidade, escolha sua classe, distribua atributos, perícias e treinamentos. O progresso é salvo automaticamente.
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
                    <label className="block font-heading text-xs tracking-widest uppercase text-muted-foreground mb-2">Foto do Personagem</label>
                    <div className="flex items-center gap-4">
                      {ficha.foto && (
                        <div className="w-24 h-24 rounded-sm overflow-hidden border-2" style={{ borderColor: 'oklch(0.52 0.22 260)' }}>
                          <img src={ficha.foto} alt="Foto do personagem" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              setFicha(prev => ({ ...prev, foto: event.target?.result as string }));
                              toast.success("Foto adicionada!");
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="flex-1 px-4 py-2.5 rounded-sm text-sm font-heading placeholder-muted-foreground focus:outline-none cursor-pointer"
                        style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)', color: 'white' }}
                      />
                    </div>
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
                      className={`p-4 rounded-sm text-left transition-all border ${
                        ficha.classId === cls.id 
                          ? 'bg-primary/20 border-primary' 
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-heading text-sm font-bold text-white uppercase italic">{cls.name}</span>
                        <span className="bl-tag text-[8px]">{cls.role}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground line-clamp-2">{cls.description}</p>
                    </button>
                  ))}
                </div>
                <div className="flex gap-4 mt-6">
                  <button onClick={() => setStep(1)} className="bl-btn-secondary">Voltar</button>
                  <button onClick={() => setStep(3)} className="bl-btn-primary" disabled={!ficha.classId}>Próximo: Atributos</button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Attributes */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bl-card p-6">
                <h2 className="font-display text-3xl text-white tracking-wider mb-6">ATRIBUTOS</h2>
                <div className="space-y-6">
                  {attributes.filter(a => a.id !== 'folego').map((attr) => (
                    <div key={attr.id} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="font-heading text-xs tracking-widest uppercase text-white flex items-center gap-2">
                          <span style={{ color: attr.color }}>{attr.icon}</span>
                          {attr.name}
                        </label>
                        <span className="font-mono-stats text-xl text-primary">{ficha.atributos[attr.id] || 0}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={ficha.atributos[attr.id] || 0}
                        onChange={(e) => updateAttr(attr.id, parseInt(e.target.value))}
                        className="w-full accent-primary"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-8">
                  <button onClick={() => setStep(2)} className="bl-btn-secondary">Voltar</button>
                  <button onClick={() => setStep(4)} className="bl-btn-primary">Próximo: Perícias</button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Skills */}
            {step === 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bl-card p-6">
                <h2 className="font-display text-3xl text-white tracking-wider mb-6">PERÍCIAS</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-h-[450px] overflow-y-auto pr-4 custom-scrollbar">
                  {allSkills.map((skill) => (
                    <div key={skill} className="flex items-center justify-between p-2 rounded-sm bg-white/5 border border-white/5">
                      <label className="font-heading text-[10px] tracking-widest uppercase text-muted-foreground truncate mr-2">{skill}</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          value={ficha.pericias[skill] || 0}
                          onChange={(e) => updatePericia(skill, parseInt(e.target.value) || 0)}
                          className="w-12 bg-black/40 border border-white/10 rounded-sm text-center font-mono-stats text-sm text-white py-1"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-8">
                  <button onClick={() => setStep(3)} className="bl-btn-secondary">Voltar</button>
                  <button onClick={() => setStep(5)} className="bl-btn-primary">Próximo: Treinos</button>
                </div>
              </motion.div>
            )}

            {/* Step 5: Trainings */}
            {step === 5 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bl-card p-6">
                <h2 className="font-display text-3xl text-white tracking-wider mb-6">TREINAMENTOS</h2>
                <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {trainings.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => toggleTraining(t.id)}
                      className={`p-4 rounded-sm text-left transition-all border ${
                        ficha.treinamentos.includes(t.id) 
                          ? 'bg-primary/20 border-primary' 
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-heading text-sm font-bold text-white uppercase italic">{t.name}</span>
                        {ficha.treinamentos.includes(t.id) && <Star className="w-3 h-3 text-primary fill-primary" />}
                      </div>
                      <p className="text-[10px] text-primary font-bold mb-1 uppercase tracking-tighter">{t.effect}</p>
                      <p className="text-[10px] text-muted-foreground leading-tight">{t.description}</p>
                    </button>
                  ))}
                </div>
                <div className="flex gap-4 mt-6">
                  <button onClick={() => setStep(4)} className="bl-btn-secondary">Voltar</button>
                  <button onClick={() => setStep(6)} className="bl-btn-primary">Próximo: Fôlego</button>
                </div>
              </motion.div>
            )}

            {/* Step 6: Folego */}
            {step === 6 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bl-card p-6 text-center">
                <h2 className="font-display text-3xl text-white tracking-wider mb-6">DEFINIR FÔLEGO</h2>
                <div className="py-12 flex flex-col items-center gap-8">
                  <div className="flex gap-4">
                    {folegoDice.map((d, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="w-16 h-16 rounded-sm bg-primary flex items-center justify-center text-2xl font-black text-white shadow-lg shadow-primary/20"
                      >
                        {d}
                      </motion.div>
                    ))}
                  </div>
                  
                  <div>
                    <div className="text-[10px] font-heading uppercase tracking-[0.4em] text-muted-foreground mb-2">PONTOS DE FÔLEGO</div>
                    <div className="text-7xl font-display text-white italic">{ficha.folego || "--"}</div>
                  </div>

                  <button
                    onClick={rollFolego}
                    className="bl-btn-primary px-10 py-4 text-lg gap-3"
                  >
                    <Zap className="w-6 h-6" /> ROLAR 2D15
                  </button>
                  
                  <p className="text-xs text-muted-foreground max-w-xs">
                    Seu fôlego inicial é a soma de 2d15. O valor mínimo garantido é 12.
                  </p>
                </div>
                <div className="flex gap-4 mt-8 justify-center">
                  <button onClick={() => setStep(5)} className="bl-btn-secondary">Voltar</button>
                  <button onClick={() => setStep(7)} className="bl-btn-primary" disabled={ficha.folego === 0}>Finalizar Ficha</button>
                </div>
              </motion.div>
            )}

            {/* Step 7: Final Sheet */}
            {step === 7 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                {/* Exportable Ficha Card */}
                <div 
                  id="ficha-final-card" 
                  ref={fichaRef}
                  className="bl-card p-8 border-primary/40 relative overflow-hidden bg-black"
                  style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, oklch(0.52 0.22 260 / 0.1) 0%, transparent 50%)' }}
                >
                  {/* Speed Lines Background for Export */}
                  <div className="absolute inset-0 bl-speed-lines opacity-20 pointer-events-none"></div>
                  
                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-8">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="bl-tag mb-2">ATLETA BLUE LOCK</div>
                          <h2 className="font-display text-5xl text-white tracking-wider uppercase italic leading-none">{ficha.nome || "SEM NOME"}</h2>
                          <p className="font-heading text-xl text-primary font-bold">#{ficha.numero || "00"}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-4xl font-black italic leading-none" style={{ color: overallData.rankColor }}>{overallData.total}</div>
                          <div className="text-[10px] font-heading uppercase tracking-widest text-muted-foreground">OVERALL</div>
                          <div className="text-2xl font-black italic mt-1" style={{ color: overallData.rankColor }}>{overallData.rank}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                        <div className="space-y-4">
                          <h3 className="font-heading text-xs tracking-[0.3em] uppercase text-muted-foreground">STATUS</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-muted-foreground uppercase">Fôlego</span>
                              <span className="font-mono-stats text-white">{ficha.folego}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-muted-foreground uppercase">Classe</span>
                              <span className="font-heading font-bold text-primary italic uppercase">{selectedClass?.name || "-"}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="md:col-span-2 space-y-4">
                          <h3 className="font-heading text-xs tracking-[0.3em] uppercase text-muted-foreground">HABILIDADES DE CLASSE</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {selectedClass?.abilities.slice(0, 2).map((ability) => (
                              <div key={ability.name} className="p-2 rounded-sm bg-white/5 border border-white/10">
                                <div className="text-[10px] font-bold text-white uppercase italic">{ability.name}</div>
                                <div className="text-[8px] text-primary font-bold uppercase">Custo: {ability.cost}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-heading text-xs tracking-[0.3em] uppercase text-muted-foreground">RESUMO DE HABILIDADES</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                          {selectedClass?.abilities.map((ability) => (
                            <div key={ability.name} className="pt-2 border-t border-white/5">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-heading text-[11px] font-bold text-white uppercase italic">{ability.name}</span>
                                <span className="bl-badge-folego text-[8px]">{ability.cost}</span>
                              </div>
                              <p className="text-[9px] text-muted-foreground leading-tight italic line-clamp-2">{ability.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div>
                        <h3 className="font-heading text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">GRÁFICO DE ATRIBUTOS</h3>
                        <div className="h-[220px] w-full flex items-center justify-center">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                              <PolarGrid stroke="oklch(0.22 0.03 260)" />
                              <PolarAngleAxis dataKey="subject" tick={{ fill: 'oklch(0.5 0.02 260)', fontSize: 9, fontWeight: 'bold' }} />
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
                        <h3 className="font-heading text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">PERÍCIAS DESTAQUE</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(ficha.pericias)
                            .filter(([_, val]) => val > 0)
                            .sort((a, b) => b[1] - a[1])
                            .slice(0, 6)
                            .map(([name, val]) => (
                              <div key={name} className="flex items-center justify-between p-2 rounded-sm bg-white/5">
                                <span className="text-[9px] font-heading uppercase text-muted-foreground">{name}</span>
                                <span className="font-mono-stats text-xs font-bold text-white">+{val}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Export Actions */}
                <div className="flex flex-wrap gap-4 pt-8 border-t border-white/10">
                  <button 
                    onClick={handleExportImage} 
                    disabled={isExporting}
                    className="bl-btn-primary gap-2"
                  >
                    <ImageIcon className="w-4 h-4" /> EXPORTAR COMO IMAGEM (PNG)
                  </button>
                  <button 
                    onClick={handleExportPDF} 
                    disabled={isExporting}
                    className="bl-btn-primary gap-2"
                  >
                    <FileText className="w-4 h-4" /> EXPORTAR COMO PDF
                  </button>
                  <button 
                    onClick={() => { clearFicha(); setFicha(initialFicha); setStep(1); }} 
                    className="bl-btn-secondary gap-2"
                  >
                    <RotateCcw className="w-4 h-4" /> LIMPAR E NOVA FICHA
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar Preview */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="bl-card p-6 border-primary/20">
                <div className="text-[10px] font-heading uppercase tracking-[0.3em] text-muted-foreground mb-4">STATUS EM TEMPO REAL</div>
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
              
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <Save className="w-3 h-3 text-primary" />
                <span>Progresso salvo localmente</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
