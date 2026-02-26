// Blue Lock RPG - Interactive character sheet builder with image upload and local storage

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { attributes, classes, skillDescriptions, skills as dataSkills } from "@/lib/data";
import { trainings } from "@/lib/trainings";
import { Zap, Download, RotateCcw, ChevronDown, Trophy, Star, Save, Folder, Upload as UploadIcon } from "lucide-react";
import { toast } from "sonner";
import { calculateOverall } from "@/lib/overall";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";
import ImageUpload from "@/components/ImageUpload";
import { useFichaStorage, FichaData as StoredFichaData } from "@/hooks/useFichaStorage";

interface FichaData {
  id: string;
  nome: string;
  numero: string;
  classId: string;
  imagemUrl?: string;
  atributos: Record<string, number>;
  pericias: Record<string, number>;
  folego: number;
  treinamentos: string[];
  notas: string;
}

const initialFicha: FichaData = {
  id: `ficha_${Date.now()}`,
  nome: "",
  numero: "",
  classId: "",
  imagemUrl: "",
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

const allSkills = dataSkills.map(s => s.name);

export default function Ficha() {
  const [ficha, setFicha] = useState<FichaData>(initialFicha);
  const [step, setStep] = useState(1);
  const [folegoDice, setFolegoDice] = useState<number[]>([]);
  const [showSavedFichas, setShowSavedFichas] = useState(false);
  const { fichas, isLoaded, saveFicha: saveFichaStorage, deleteFicha, exportFicha: exportFichaStorage, importFicha } = useFichaStorage();

  const selectedClass = classes.find(c => c.id === ficha.classId);
  const overallData = calculateOverall(ficha.atributos, ficha.pericias);
  const radarData = [
    { subject: 'VELOCIDADE', A: overallData.categories.speed, fullMark: 100 },
    { subject: 'DEFESA', A: overallData.categories.defense, fullMark: 100 },
    { subject: 'PASSE', A: overallData.categories.pass, fullMark: 100 },
    { subject: 'DRIBLE', A: overallData.categories.dribble, fullMark: 100 },
    { subject: 'CHUTE', A: overallData.categories.shoot, fullMark: 100 },
    { subject: 'ATAQUE', A: overallData.categories.offense, fullMark: 100 },
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

  const saveFicha = () => {
    if (!ficha.nome) {
      toast.error('Por favor, defina um nome para a ficha');
      return;
    }

    const fichaSalva = saveFichaStorage(ficha as StoredFichaData);
    toast.success(`Ficha "${ficha.nome}" salva com sucesso!`);
  };

  const loadFicha = (loadedFicha: StoredFichaData) => {
    setFicha({
      id: loadedFicha.id,
      nome: loadedFicha.nome,
      numero: loadedFicha.numero,
      classId: loadedFicha.classId,
      imagemUrl: loadedFicha.imagemUrl,
      atributos: loadedFicha.atributos,
      pericias: loadedFicha.pericias,
      folego: loadedFicha.folego,
      treinamentos: loadedFicha.treinamentos,
      notas: loadedFicha.notas,
    });
    setShowSavedFichas(false);
    setStep(1);
    toast.success(`Ficha "${loadedFicha.nome}" carregada!`);
  };

  const exportCurrentFicha = () => {
    if (!ficha.nome) {
      toast.error('Por favor, defina um nome para a ficha');
      return;
    }
    exportFichaStorage(ficha as StoredFichaData);
    toast.success('Ficha exportada com sucesso!');
  };

  const printFicha = () => {
    window.print();
  };

  const handleImportFicha = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;

    try {
      const imported = await importFicha(file);
      loadFicha(imported);
      toast.success('Ficha importada com sucesso!');
    } catch (error) {
      toast.error('Erro ao importar ficha');
    }
  };

  const resetFicha = () => {
    if (confirm('Tem certeza que deseja criar uma nova ficha? Certifique-se de salvar a atual.')) {
      setFicha({ ...initialFicha, id: `ficha_${Date.now()}` });
      setStep(1);
      setFolegoDice([]);
    }
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
            Crie seu atleta passo a passo. Defina sua identidade, escolha sua classe, distribua atributos, perícias e treinamentos. Suas fichas são salvas automaticamente no navegador.
          </p>
        </motion.div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 custom-scrollbar no-print">
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
          <div className={`lg:col-span-2 ${step === 7 ? 'print:lg:col-span-3' : ''}`}>
            {/* Step 1: Identity */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bl-card p-6">
                <h2 className="font-display text-3xl text-white tracking-wider mb-6">IDENTIDADE</h2>
                <div className="space-y-6">
                  {/* Image Upload */}
                  <ImageUpload
                    onImageChange={(url) => setFicha(prev => ({ ...prev, imagemUrl: url }))}
                    currentImage={ficha.imagemUrl}
                    label="Foto do Atleta"
                  />

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
                  className="bl-btn-primary w-full mt-6"
                >
                  Próximo: Classe
                </button>
              </motion.div>
            )}

            {/* Step 2: Class */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bl-card p-6">
                <h2 className="font-display text-3xl text-white tracking-wider mb-6">CLASSE</h2>
                <div className="space-y-4 mb-8 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {classes.map((c, idx) => (
                    <motion.button
                      key={c.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => setFicha(prev => ({ ...prev, classId: c.id }))}
                      className={`w-full p-6 rounded-sm border-2 transition-all text-left ${
                        ficha.classId === c.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-white/5 hover:border-primary/50'
                      }`}
                    >
                      <div className="mb-4">
                        <p className="font-display text-lg font-bold text-white mb-1">{c.name}</p>
                        <p className="text-xs text-muted-foreground italic">{c.subtitle}</p>
                        <p className="text-xs text-muted-foreground mt-2">{c.description}</p>
                      </div>

                      <div className="mb-4 pt-4 border-t border-white/10">
                        <p className="font-heading text-[10px] uppercase tracking-widest text-primary mb-2">Bonus de Atributos</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {c.attributeBonus.map(bonus => (
                            <div key={bonus.attr} className="px-2 py-1 rounded-sm bg-white/5 border border-white/10">
                              <div className="text-[10px] text-muted-foreground">{bonus.attr}</div>
                              <div className="font-mono-stats text-sm text-primary font-bold">+{bonus.value}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/10">
                        <p className="font-heading text-[10px] uppercase tracking-widest text-primary mb-2">Bonus de Pericias</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {c.skillBonus.map(bonus => (
                            <div key={bonus.skill} className="px-2 py-1 rounded-sm bg-white/5 border border-white/10">
                              <div className="text-[10px] text-muted-foreground truncate">{bonus.skill}</div>
                              <div className="font-mono-stats text-sm text-primary font-bold">+{bonus.value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="bl-btn-secondary">Voltar</button>
                  <button onClick={() => setStep(3)} className="bl-btn-primary">Proximo: Atributos</button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Attributes */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bl-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-3xl text-white tracking-wider">ATRIBUTOS</h2>
                  <div className="px-3 py-1 rounded-sm bg-primary/10 border border-primary/20 text-primary font-heading text-xs uppercase tracking-widest">
                    Máx 10 por Atributo
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {attributes.filter(a => a.id !== 'folego').map(attr => (
                    <div key={attr.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{attr.icon}</span>
                          <span className="font-heading text-sm font-bold text-white uppercase tracking-wider">{attr.name}</span>
                        </div>
                        <span className="font-mono-stats text-2xl text-primary">{ficha.atributos[attr.id] || 0}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={ficha.atributos[attr.id] || 0}
                        onChange={(e) => updateAttr(attr.id, parseInt(e.target.value))}
                        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <p className="text-[10px] text-muted-foreground leading-relaxed">{attr.description}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="bl-btn-secondary">Voltar</button>
                  <button onClick={() => setStep(4)} className="bl-btn-primary">Próximo: Perícias</button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Perícias */}
            {step === 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bl-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-3xl text-white tracking-wider">PERÍCIAS</h2>
                  <div className="px-3 py-1 rounded-sm bg-primary/10 border border-primary/20 text-primary font-heading text-xs uppercase tracking-widest">
                    Limitado pelo Atributo
                  </div>
                </div>
                
                <div className="space-y-8 mb-8 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {attributes.filter(a => a.id !== 'folego').map(attr => (
                    <div key={attr.id} className="space-y-4">
                      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                        <span className="text-lg">{attr.icon}</span>
                        <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider">{attr.name}</h3>
                        <span className="text-[10px] text-muted-foreground ml-auto">Máx: {ficha.atributos[attr.id] || 0}</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {attr.skills.map(skill => (
                          <div key={skill} className="space-y-2 p-3 rounded-sm bg-white/5 border border-white/5">
                            <div className="flex items-center justify-between">
                              <span className="font-heading text-xs text-white uppercase">{skill}</span>
                              <span className="font-mono-stats text-lg text-primary">+{ficha.pericias[skill] || 0}</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max={ficha.atributos[attr.id] || 0}
                              value={ficha.pericias[skill] || 0}
                              onChange={(e) => updatePericia(skill, parseInt(e.target.value))}
                              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <p className="text-[9px] text-muted-foreground leading-tight italic">
                              {skillDescriptions[skill]}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(3)} className="bl-btn-secondary">Voltar</button>
                  <button onClick={() => setStep(5)} className="bl-btn-primary">Próximo: Treinos</button>
                </div>
              </motion.div>
            )}

            {/* Step 5: Trainings */}
            {step === 5 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bl-card p-6">
                <h2 className="font-display text-3xl text-white tracking-wider mb-6">TREINAMENTOS</h2>
                <div className="space-y-3 mb-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {trainings.map((training, idx) => (
                    <motion.button
                      key={training.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.02 }}
                      onClick={() => toggleTraining(training.id)}
                      className={`w-full p-4 rounded-sm border-2 transition-all text-left ${
                        ficha.treinamentos.includes(training.id)
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-white/5 hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="font-heading text-sm font-bold text-white">{training.name}</p>
                          <p className="text-[10px] text-muted-foreground mt-1">{training.description}</p>
                        </div>
                        <span className="text-[9px] font-heading uppercase tracking-widest px-2 py-0.5 rounded-sm ml-2 flex-shrink-0" style={{ background: training.category === 'Avancado' ? 'oklch(0.75 0.18 25 / 0.2)' : training.category === 'Especializado' ? 'oklch(0.52 0.22 260 / 0.2)' : 'oklch(0.75 0.15 230 / 0.2)', color: training.category === 'Avancado' ? 'oklch(0.75 0.18 25)' : training.category === 'Especializado' ? 'oklch(0.52 0.22 260)' : 'oklch(0.75 0.15 230)' }}>
                          {training.category}
                        </span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <div className="text-[10px] text-muted-foreground mb-1 font-heading uppercase tracking-widest">Efeito:</div>
                        <p className="text-xs text-white leading-relaxed">{training.effect}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(4)} className="bl-btn-secondary">Voltar</button>
                  <button onClick={() => setStep(6)} className="bl-btn-primary">Próximo: Fôlego</button>
                </div>
              </motion.div>
            )}

            {/* Step 6: Folego */}
            {step === 6 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bl-card p-6">
                <h2 className="font-display text-3xl text-white tracking-wider mb-2 uppercase italic">FÔLEGO</h2>
                <p className="text-xs text-muted-foreground mb-6 italic">Role 2d15 para determinar seus pontos de fôlego. Mínimo de 12 pontos.</p>

                <div className="bg-primary/10 border border-primary/30 rounded-sm p-6 text-center mb-6">
                  <button
                    onClick={rollFolego}
                    className="bl-btn-primary mx-auto mb-4"
                  >
                    ROLAR FÔLEGO
                  </button>
                  {folegoDice.length > 0 && (
                    <div>
                      <div className="text-4xl font-black italic text-primary mb-2">
                        {folegoDice[0]} + {folegoDice[1]} = {ficha.folego}
                      </div>
                      <p className="text-xs text-muted-foreground">Pontos de Fôlego</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(5)} className="bl-btn-secondary">Voltar</button>
                  <button onClick={() => setStep(7)} className="bl-btn-primary" disabled={ficha.folego === 0}>
                    Próximo: Ficha Final
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 7: Final Sheet - NOVO LAYOUT */}
            {step === 7 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                {/* Header com Nome e Número */}
                <div className="bl-card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="font-display text-4xl text-white tracking-wider uppercase italic">{ficha.nome || "Novo Atleta"}</h2>
                      <p className="text-primary font-heading text-sm mt-2">#{ficha.numero || "00"}</p>
                    </div>
                    {selectedClass && (
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Classe</p>
                        <p className="text-lg font-bold text-white">{selectedClass.name}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Imagem do Atleta */}
                {ficha.imagemUrl && (
                  <div className="bl-card p-0 overflow-hidden">
                    <img src={ficha.imagemUrl} alt={ficha.nome} className="w-full h-80 object-cover" />
                  </div>
                )}

                {/* Overall & Rank Display - Destaque */}
                <div className="bl-card p-8" style={{
                  background: `linear-gradient(135deg, ${overallData.rankColor}15 0%, ${overallData.rankColor}08 100%)`,
                  border: `2px solid ${overallData.rankColor}`,
                  boxShadow: `0 0 30px ${overallData.rankColor}33, inset 0 0 30px ${overallData.rankColor}11`
                }}>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Overall</div>
                      <div className="text-7xl font-black italic leading-none" style={{ color: overallData.rankColor, textShadow: `0 0 30px ${overallData.rankColor}88` }}>
                        {overallData.total}
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-px h-20 bg-white/20" />
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Rank</div>
                      <div className="text-7xl font-black italic leading-none" style={{ color: overallData.rankColor, textShadow: `0 0 30px ${overallData.rankColor}88` }}>
                        {overallData.rank}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/20 text-center">
                    <div className="text-base font-bold italic uppercase" style={{ color: overallData.rankColor }}>
                      {overallData.description}
                    </div>
                  </div>
                </div>

                {/* Gráfico de Atributos - Destaque Principal */}
                <div className="bl-card p-8">
                  <p className="text-[10px] font-heading uppercase tracking-[0.3em] text-muted-foreground mb-8 text-center">GRÁFICO DE ATRIBUTOS</p>
                  <div className="h-[350px] w-full flex items-center justify-center relative">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-48 h-48 rounded-full border border-white/5" />
                      <div className="w-32 h-32 rounded-full border border-white/5" />
                      <div className="w-16 h-16 rounded-full border border-white/5" />
                    </div>
                    
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                        <PolarGrid stroke="rgba(255,255,255,0.1)" gridType="polygon" />
                        <PolarAngleAxis 
                          dataKey="subject" 
                          tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 700, fontFamily: 'Rajdhani' }}
                        />
                        <Radar
                          name="Atleta"
                          dataKey="A"
                          stroke="oklch(0.52 0.22 260)"
                          fill="oklch(0.52 0.22 260)"
                          fillOpacity={0.4}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Atributos Base */}
                <div className="bl-card p-6">
                  <p className="text-[10px] font-heading uppercase tracking-[0.3em] text-muted-foreground mb-4">ATRIBUTOS BASE</p>
                  <div className="grid grid-cols-5 gap-2">
                    {attributes.filter(a => a.id !== 'folego').map(attr => (
                      <div key={attr.id} className="text-center p-3 rounded-sm bg-white/5 border border-border/50">
                        <div className="text-2xl font-black text-white">{ficha.atributos[attr.id] || 0}</div>
                        <div className="text-[10px] font-heading uppercase text-muted-foreground mt-1">{attr.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Perícias por Atributo */}
                <div className="bl-card p-6">
                  <p className="text-[10px] font-heading uppercase tracking-[0.3em] text-muted-foreground mb-6">PERÍCIAS & COMPETÊNCIAS</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {attributes.filter(a => a.id !== 'folego').map(attr => (
                      <div key={attr.id} className="space-y-3">
                        <div className="flex items-center gap-2 border-b border-white/5 pb-1">
                          <span className="text-xs">{attr.icon}</span>
                          <span className="font-heading text-[10px] font-bold text-white uppercase tracking-wider">{attr.name}</span>
                        </div>
                        <div className="space-y-2">
                          {attr.skills.map(skill => (
                            <div key={skill} className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">{skill}</span>
                              <span className="font-mono-stats text-sm text-primary">+{ficha.pericias[skill] || 0}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fôlego */}
                <div className="bl-card p-6">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Fôlego</p>
                  <div className="text-3xl font-black text-primary">{ficha.folego} pontos</div>
                </div>

                {/* Notas */}
                {ficha.notas && (
                  <div className="bl-card p-6">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Notas</p>
                    <p className="text-sm text-white leading-relaxed">{ficha.notas}</p>
                  </div>
                )}

                {/* Botões de Ação */}
                <div className="flex flex-wrap gap-3 no-print">
                  <button onClick={() => setStep(6)} className="bl-btn-secondary">Voltar</button>
                  <button onClick={saveFicha} className="bl-btn-primary flex items-center gap-2">
                    <Save className="w-4 h-4" /> SALVAR
                  </button>
                  <button 
                    onClick={printFicha} 
                    className="bl-btn-secondary flex items-center gap-2"
                    style={{ background: 'oklch(0.52 0.22 260 / 0.2)', borderColor: 'oklch(0.52 0.22 260)' }}
                  >
                    <Download className="w-4 h-4" /> IMPRIMIR PDF
                  </button>
                  <button onClick={exportCurrentFicha} className="bl-btn-secondary flex items-center gap-2">
                    <Folder className="w-4 h-4" /> JSON
                  </button>
                  <button onClick={resetFicha} className="bl-btn-secondary flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" /> NOVA FICHA
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block no-print">
            <div className="sticky top-24 space-y-6">
              {/* Preview Card */}
              <div className="bl-card p-6 border-primary/20">
                <div className="text-[10px] font-heading uppercase tracking-[0.3em] text-muted-foreground mb-4">PREVIEW DA FICHA</div>
                <div className="space-y-4">
                  <div>
                    <div className="text-xl font-display text-white uppercase italic truncate">{ficha.nome || "Novo Atleta"}</div>
                    <div className="text-primary font-heading text-xs">#{ficha.numero || "00"}</div>
                  </div>
                  
                  <div className="flex items-center gap-4 py-4 border-y border-white/5">
                    <div className="text-center">
                      <div className="text-3xl font-black italic leading-none" style={{ color: overallData.rankColor }}>{overallData.total}</div>
                      <div className="text-[8px] font-heading uppercase tracking-widest text-muted-foreground">TOTAL</div>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <div>
                      <div className="text-4xl font-black italic leading-none" style={{ color: overallData.rankColor }}>{overallData.rank}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(overallData.categories).map(([key, val]) => (
                      <div key={key} className="text-center p-2 rounded-sm bg-white/5 border border-white/5">
                        <div className="text-xs font-bold text-white">{val}</div>
                        <div className="text-[8px] font-heading uppercase text-muted-foreground">{key}</div>
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

              {/* Saved Fichas */}
              {isLoaded && fichas.length > 0 && (
                <div className="bl-card p-6">
                  <button
                    onClick={() => setShowSavedFichas(!showSavedFichas)}
                    className="w-full flex items-center justify-between font-heading text-sm uppercase tracking-wider text-white mb-4"
                  >
                    <span className="flex items-center gap-2">
                      <Folder className="w-4 h-4" /> Minhas Fichas ({fichas.length})
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showSavedFichas ? 'rotate-180' : ''}`} />
                  </button>

                  {showSavedFichas && (
                    <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                      {fichas.map(f => (
                        <div key={f.id} className="p-3 rounded-sm bg-white/5 border border-border/50">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex-1">
                              <p className="font-bold text-white text-sm">{f.nome}</p>
                              <p className="text-[10px] text-muted-foreground">#{f.numero}</p>
                            </div>
                            <button
                              onClick={() => deleteFicha(f.id)}
                              className="text-red-500 hover:text-red-400 transition-colors"
                              title="Deletar"
                            >
                              ✕
                            </button>
                          </div>
                          <button
                            onClick={() => loadFicha(f)}
                            className="w-full py-1.5 text-[10px] font-heading uppercase tracking-wider rounded-sm transition-colors"
                            style={{ background: 'oklch(0.52 0.22 260 / 0.2)', color: 'oklch(0.75 0.15 230)' }}
                          >
                            Carregar
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <label className="mt-4 flex items-center justify-center gap-2 w-full py-2 rounded-sm font-heading text-xs uppercase tracking-wider cursor-pointer transition-colors"
                    style={{ background: 'oklch(0.52 0.22 260 / 0.1)', color: 'oklch(0.75 0.15 230)' }}>
                    <UploadIcon className="w-4 h-4" />
                    Importar Ficha
                    <input type="file" accept=".json" onChange={handleImportFicha} className="hidden" />
                  </label>
                </div>
              )}

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
