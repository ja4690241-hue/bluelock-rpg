// Blue Lock RPG - Interactive character sheet builder with image upload and local storage

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { attributes, classes, skillDescriptions, skills as dataSkills } from "@/lib/data";
import { trainings } from "@/lib/trainings";
import { Zap, Download, RotateCcw, ChevronDown, Trophy, Star, Save, Folder, Upload as UploadIcon, Sword } from "lucide-react";
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
  armaNome: string;
  armaDescricao: string;
  armaBonus: string;
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
  notas: "",
  armaNome: "",
  armaDescricao: "",
  armaBonus: ""
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
    { subject: 'POTÊNCIA', A: ficha.atributos.potencia || 0, fullMark: 10 },
    { subject: 'TÉCNICA', A: ficha.atributos.tecnica || 0, fullMark: 10 },
    { subject: 'EGO', A: ficha.atributos.ego || 0, fullMark: 10 },
    { subject: 'AGILIDADE', A: ficha.atributos.agilidade || 0, fullMark: 10 },
    { subject: 'VELOCIDADE', A: ficha.atributos.velocidade || 0, fullMark: 10 },
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
      armaNome: loadedFicha.armaNome || "",
      armaDescricao: loadedFicha.armaDescricao || "",
      armaBonus: loadedFicha.armaBonus || ""
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
    { id: 6, label: "Arma" },
    { id: 7, label: "Fôlego" },
    { id: 8, label: "Ficha Final" }
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
          <div className={`lg:col-span-2 ${step === 8 ? 'print:lg:col-span-3' : ''}`}>
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
                  PRÓXIMO PASSO
                </button>
              </motion.div>
            )}

            {/* Step 2: Class */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h2 className="font-display text-3xl text-white tracking-wider mb-6">ESCOLHA SUA CLASSE</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {classes.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setFicha(prev => ({ ...prev, classId: c.id }))}
                      className={`text-left p-4 rounded-sm border transition-all ${ficha.classId === c.id ? 'border-primary bg-primary/10' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-display text-xl text-white italic">{c.name}</h3>
                        {ficha.classId === c.id && <Star className="w-4 h-4 text-primary fill-primary" />}
                      </div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">{c.subtitle}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{c.description}</p>
                      
                      <div className="space-y-3 pt-3 border-t border-white/5">
                        {c.attributeBonus && c.attributeBonus.length > 0 && (
                          <div>
                            <p className="text-[9px] font-heading uppercase tracking-widest text-primary mb-1.5">Bônus de Atributos</p>
                            <div className="flex flex-wrap gap-1.5">
                              {c.attributeBonus.map((ab, idx) => (
                                <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-white font-medium">
                                  {ab.attr} +{ab.value}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {c.skillBonus && c.skillBonus.length > 0 && (
                          <div>
                            <p className="text-[9px] font-heading uppercase tracking-widest text-primary mb-1.5">Bônus de Perícias</p>
                            <div className="flex flex-wrap gap-1.5">
                              {c.skillBonus.map((sb, idx) => (
                                <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground">
                                  {sb.skill} +{sb.value}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(1)} className="bl-btn-secondary flex-1">VOLTAR</button>
                  <button onClick={() => setStep(3)} className="bl-btn-primary flex-1" disabled={!ficha.classId}>PRÓXIMO PASSO</button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Attributes */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bl-card p-6">
                <h2 className="font-display text-3xl text-white tracking-wider mb-6">DISTRIBUIR ATRIBUTOS</h2>
                <div className="space-y-8">
                  {attributes.filter(a => a.id !== 'folego' && a.id !== 'inteligencia').map(attr => (
                    <div key={attr.id} className="space-y-3">
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{attr.icon}</span>
                          <label className="font-heading text-xs tracking-widest uppercase text-white">{attr.name}</label>
                        </div>
                        <span className="font-mono-stats text-2xl text-primary">{ficha.atributos[attr.id] || 0}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={ficha.atributos[attr.id] || 0}
                        onChange={(e) => updateAttr(attr.id, parseInt(e.target.value))}
                        className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary"
                      />
                      <p className="text-[10px] text-muted-foreground leading-relaxed">{attr.description}</p>
                    </div>
                  ))}
                  
                  {/* Inteligência (Especial para Analista) */}
                  {ficha.classId === 'analista' && (
                    <div className="space-y-3 p-4 rounded-sm bg-primary/5 border border-primary/20">
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">🧠</span>
                          <label className="font-heading text-xs tracking-widest uppercase text-white">Inteligência</label>
                        </div>
                        <span className="font-mono-stats text-2xl text-primary">{ficha.atributos.inteligencia || 0}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={ficha.atributos.inteligencia || 0}
                        onChange={(e) => updateAttr('inteligencia', parseInt(e.target.value))}
                        className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary"
                      />
                      <p className="text-[10px] text-muted-foreground leading-relaxed">Atributo especial do Analista para estratégias e anulação de habilidades.</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-3 mt-8">
                  <button onClick={() => setStep(2)} className="bl-btn-secondary flex-1">VOLTAR</button>
                  <button onClick={() => setStep(4)} className="bl-btn-primary flex-1">PRÓXIMO PASSO</button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Skills */}
            {step === 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bl-card p-6">
                <h2 className="font-display text-3xl text-white tracking-wider mb-6">PERÍCIAS</h2>
                <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                  {attributes.filter(a => a.id !== 'folego').map(attr => (
                    <div key={attr.id} className="space-y-4">
                      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                        <span className="text-sm">{attr.icon}</span>
                        <h3 className="font-heading text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{attr.name}</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {attr.skills.map(skill => (
                          <div key={skill} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <label className="text-xs text-white">{skill}</label>
                              <input
                                type="number"
                                value={ficha.pericias[skill] || 0}
                                onChange={(e) => updatePericia(skill, parseInt(e.target.value))}
                                className="w-12 bg-white/5 border border-white/10 rounded-sm text-center font-mono-stats text-sm text-primary py-1"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-8">
                  <button onClick={() => setStep(3)} className="bl-btn-secondary flex-1">VOLTAR</button>
                  <button onClick={() => setStep(5)} className="bl-btn-primary flex-1">PRÓXIMO PASSO</button>
                </div>
              </motion.div>
            )}

            {/* Step 5: Trainings */}
            {step === 5 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bl-card p-6">
                <h2 className="font-display text-3xl text-white tracking-wider mb-6">TREINAMENTOS</h2>
                <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                  {trainings.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => toggleTraining(t.id)}
                      className={`w-full text-left p-4 rounded-sm border transition-all ${ficha.treinamentos.includes(t.id) ? 'border-primary bg-primary/10' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-heading text-sm text-white uppercase tracking-wider">{t.name}</h3>
                        {ficha.treinamentos.includes(t.id) && <Star className="w-4 h-4 text-primary fill-primary" />}
                      </div>
                      <div className="flex gap-2 mb-2">
                        <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-white/10 text-muted-foreground uppercase font-bold">{t.category}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">{t.description}</p>
                      <div className="p-2 rounded-sm bg-primary/5 border border-primary/10">
                        <p className="text-[10px] font-heading uppercase tracking-widest text-primary mb-1">Efeito</p>
                        <p className="text-[11px] text-white leading-relaxed">{t.effect}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-8">
                  <button onClick={() => setStep(4)} className="bl-btn-secondary flex-1">VOLTAR</button>
                  <button onClick={() => setStep(6)} className="bl-btn-primary flex-1">PRÓXIMO PASSO</button>
                </div>
              </motion.div>
            )}

            {/* Step 6: Arma Blue Lock */}
            {step === 6 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bl-card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Sword className="w-8 h-8 text-primary" />
                  <h2 className="font-display text-3xl text-white tracking-wider">ARMA BLUE LOCK</h2>
                </div>
                <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                  Todo atacante de elite no Blue Lock possui uma "Arma" — uma habilidade ou característica física única que o torna um monstro em campo. Defina a sua agora.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block font-heading text-xs tracking-widest uppercase text-muted-foreground mb-2">Nome da Arma</label>
                    <input
                      type="text"
                      value={ficha.armaNome}
                      onChange={(e) => setFicha(prev => ({ ...prev, armaNome: e.target.value }))}
                      placeholder="Ex: Chute Direto, Meta-Visão, Drible Elástico..."
                      className="w-full px-4 py-2.5 rounded-sm text-sm font-heading placeholder-muted-foreground focus:outline-none"
                      style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)', color: 'white' }}
                    />
                  </div>
                  
                  <div>
                    <label className="block font-heading text-xs tracking-widest uppercase text-muted-foreground mb-2">Descrição da Arma</label>
                    <textarea
                      value={ficha.armaDescricao}
                      onChange={(e) => setFicha(prev => ({ ...prev, armaDescricao: e.target.value }))}
                      placeholder="Como sua arma funciona? Em que momento ela é ativada?"
                      rows={4}
                      className="w-full px-4 py-2.5 rounded-sm text-sm font-heading placeholder-muted-foreground focus:outline-none resize-none"
                      style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)', color: 'white' }}
                    />
                  </div>

                  <div>
                    <label className="block font-heading text-xs tracking-widest uppercase text-muted-foreground mb-2">Bônus da Arma</label>
                    <input
                      type="text"
                      value={ficha.armaBonus}
                      onChange={(e) => setFicha(prev => ({ ...prev, armaBonus: e.target.value }))}
                      placeholder="Ex: +5 em Pontaria, Vantagem em Drible..."
                      className="w-full px-4 py-2.5 rounded-sm text-sm font-heading placeholder-muted-foreground focus:outline-none"
                      style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.22 0.03 260)', color: 'white' }}
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button onClick={() => setStep(5)} className="bl-btn-secondary flex-1">VOLTAR</button>
                  <button onClick={() => setStep(7)} className="bl-btn-primary flex-1">PRÓXIMO PASSO</button>
                </div>
              </motion.div>
            )}

            {/* Step 7: Fôlego */}
            {step === 7 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bl-card p-8 text-center">
                <h2 className="font-display text-3xl text-white tracking-wider mb-6">DEFINIR FÔLEGO</h2>
                <p className="text-muted-foreground text-sm mb-10 max-w-md mx-auto">
                  O fôlego é sua energia para usar habilidades. Role 2d15 para definir seus pontos. O sistema garante um mínimo de 12 pontos.
                </p>
                
                <div className="flex justify-center gap-4 mb-10">
                  {folegoDice.length > 0 ? (
                    folegoDice.map((d, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="w-20 h-20 flex items-center justify-center bg-primary text-white text-3xl font-black italic rounded-sm shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]"
                      >
                        {d}
                      </motion.div>
                    ))
                  ) : (
                    <div className="w-20 h-20 flex items-center justify-center bg-white/5 border border-white/10 text-muted-foreground text-3xl font-black italic rounded-sm">?</div>
                  )}
                </div>

                {ficha.folego > 0 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
                    <div className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Total de Fôlego</div>
                    <div className="text-6xl font-black text-white italic">{ficha.folego}</div>
                  </motion.div>
                )}

                <button
                  onClick={rollFolego}
                  className="bl-btn-primary px-12 py-4 flex items-center gap-3 mx-auto"
                >
                  <Zap className="w-5 h-5" /> ROLAR DADOS
                </button>

                <div className="flex gap-3 mt-12">
                  <button onClick={() => setStep(6)} className="bl-btn-secondary flex-1">VOLTAR</button>
                  <button onClick={() => setStep(8)} className="bl-btn-primary flex-1" disabled={ficha.folego === 0}>VER FICHA FINAL</button>
                </div>
              </motion.div>
            )}

            {/* Step 8: Final Sheet */}
            {step === 8 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                {/* Header da Ficha */}
                <div className="bl-card p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                  <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                      <div className="bl-tag mb-4">Atleta Blue Lock</div>
                      <h2 className="font-display text-6xl text-white tracking-tighter italic uppercase leading-none mb-2">
                        {ficha.nome || "Sem Nome"}
                      </h2>
                      <div className="flex items-center gap-4">
                        <span className="text-primary font-mono-stats text-2xl">#{ficha.numero || "00"}</span>
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-muted-foreground font-heading text-xs uppercase tracking-widest">
                          {selectedClass?.role || "Posição não definida"}
                        </span>
                      </div>
                    </div>
                    {selectedClass && (
                      <div className="text-right">
                        <p className="text-[10px] font-heading uppercase tracking-widest text-muted-foreground mb-1">Classe Selecionada</p>
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

                {/* Arma Blue Lock - Destaque */}
                {(ficha.armaNome || ficha.armaDescricao) && (
                  <div className="bl-card p-8 border-primary/30 bg-primary/5">
                    <div className="flex items-center gap-3 mb-6">
                      <Sword className="w-6 h-6 text-primary" />
                      <p className="text-[10px] font-heading uppercase tracking-[0.3em] text-primary">ARMA BLUE LOCK</p>
                    </div>
                    <h3 className="font-display text-3xl text-white italic uppercase mb-4">{ficha.armaNome || "Arma Sem Nome"}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">{ficha.armaDescricao}</p>
                    {ficha.armaBonus && (
                      <div className="inline-block px-4 py-2 bg-primary/20 border border-primary/30 rounded-sm">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">BÔNUS: {ficha.armaBonus}</span>
                      </div>
                    )}
                  </div>
                )}

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
                    {attributes.filter(a => a.id !== 'folego' && a.id !== 'inteligencia').map(attr => (
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
                  <button onClick={() => setStep(7)} className="bl-btn-secondary">Voltar</button>
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

                  {ficha.armaNome && (
                    <div className="pt-2 border-t border-white/5">
                      <div className="text-[10px] font-heading uppercase text-primary mb-1">ARMA</div>
                      <div className="text-xs font-bold text-white uppercase italic truncate">{ficha.armaNome}</div>
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
