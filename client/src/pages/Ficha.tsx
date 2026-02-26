import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Trophy, 
  Shield, 
  Zap, 
  ChevronRight, 
  Save, 
  Download, 
  RotateCcw,
  Camera,
  Target,
  Dumbbell,
  Activity,
  Plus,
  Minus,
  Sparkles,
  Check,
  Globe,
  LucideIcon
} from "lucide-react";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer 
} from 'recharts';
import html2canvas from 'html2canvas';
import { toast } from "sonner";

// --- Data & Types ---

type Atributo = "Ataque" | "Defesa" | "Físico" | "Velocidade" | "Drible" | "Passe";

interface Ability {
  name: string;
  cost: string;
  description: string;
}

interface Class {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: LucideIcon;
  bonus: Partial<Record<Atributo, number>>;
  abilities: Ability[];
}

const classes: Class[] = [
  {
    id: "striker",
    name: "Finalizador Nato",
    description: "Especialista em marcar gols. Possui instinto assassino dentro da área.",
    color: "oklch(0.62 0.25 20)",
    icon: Target,
    bonus: { Ataque: 3, Velocidade: 1 },
    abilities: [
      { name: "Chute Direto", cost: "15 Fôlego", description: "Um chute potente sem dominar a bola, ignorando 50% da defesa do goleiro." },
      { name: "Posicionamento Fantasma", cost: "10 Fôlego", description: "Move-se para um ponto cego da defesa, ganhando vantagem em bolas cruzadas." },
      { name: "Estado de Fluxo: Egoísta", cost: "25 Fôlego", description: "Por 3 rodadas, todos os seus chutes têm +5 de bônus e ignoram bloqueios." }
    ]
  },
  {
    id: "playmaker",
    name: "Maestro do Campo",
    description: "Visão de jogo absoluta. Controla o ritmo da partida e cria oportunidades.",
    color: "oklch(0.52 0.22 260)",
    icon: Globe,
    bonus: { Passe: 3, Drible: 1 },
    abilities: [
      { name: "Passe Milimétrico", cost: "10 Fôlego", description: "Um passe longo que encontra o companheiro exatamente onde ele precisa." },
      { name: "Metavisão", cost: "20 Fôlego", description: "Analisa todo o campo, prevendo o próximo movimento do adversário." },
      { name: "Triangulação Veloz", cost: "15 Fôlego", description: "Série de passes rápidos que desestruturam qualquer linha defensiva." }
    ]
  },
  {
    id: "dribbler",
    name: "Mago do Drible",
    description: "Incomparável no 1x1. Deixa os defensores para trás com agilidade e técnica.",
    color: "oklch(0.72 0.2 100)",
    icon: Zap,
    bonus: { Drible: 3, Velocidade: 1 },
    abilities: [
      { name: "Drible Elástico", cost: "12 Fôlego", description: "Mudança brusca de direção que deixa o marcador desequilibrado." },
      { name: "Velocidade Explosiva", cost: "15 Fôlego", description: "Arrancada curta que permite superar qualquer marcador em velocidade." },
      { name: "Finta de Corpo", cost: "8 Fôlego", description: "Engana o adversário sem tocar na bola, abrindo espaço para o chute." }
    ]
  },
  {
    id: "defender",
    name: "Muralha de Ferro",
    description: "O terror dos atacantes. Bloqueia chutes e intercepta passes com precisão.",
    color: "oklch(0.45 0.15 200)",
    icon: Shield,
    bonus: { Defesa: 3, Físico: 1 },
    abilities: [
      { name: "Bloqueio Desesperado", cost: "15 Fôlego", description: "Atira-se na frente da bola para impedir um gol certo." },
      { name: "Carga de Ombro", cost: "10 Fôlego", description: "Usa o corpo legalmente para desequilibrar o atacante e roubar a bola." },
      { name: "Leitura de Interceptação", cost: "12 Fôlego", description: "Antecipa a trajetória do passe e recupera a posse de bola." }
    ]
  },
  {
    id: "allrounder",
    name: "Motor do Time",
    description: "Equilibrado em todas as áreas. Contribui tanto no ataque quanto na defesa.",
    color: "oklch(0.6 0.1 0)",
    icon: Activity,
    bonus: { Físico: 2, Passe: 1, Defesa: 1 },
    abilities: [
      { name: "Pressão Constante", cost: "18 Fôlego", description: "Persegue o portador da bola incansavelmente, forçando o erro." },
      { name: "Infiltração Surpresa", cost: "12 Fôlego", description: "Aparece como elemento surpresa na área para finalizar." },
      { name: "Recuperação Rápida", cost: "10 Fôlego", description: "Recupera fôlego mais rápido após uma ação intensa." }
    ]
  }
];

const allSkills = [
  "Domínio", "Cruzamento", "Cabeceio", "Marcação", "Interceptação", 
  "Visão de Jogo", "Resistência", "Força", "Aceleração", "Equilíbrio",
  "Agilidade", "Finalização", "Passe Longo", "Passe Curto", "Condução"
];

const trainings = [
  { id: "t1", name: "Treino de Finalização", description: "+2 em Ataque e +3 em Finalização" },
  { id: "t2", name: "Treino de Resistência", description: "+15 de Fôlego Máximo" },
  { id: "t3", name: "Treino de Metavisão", description: "+5 em Visão de Jogo e +2 em Passe" },
  { id: "t4", name: "Treino de Drible", description: "+2 em Drible e +3 em Condução" },
  { id: "t5", name: "Treino de Defesa", description: "+2 em Defesa e +3 em Marcação" },
  { id: "t6", name: "Treino de Velocidade", description: "+2 em Velocidade e +3 em Aceleração" }
];

export default function Ficha() {
  const [step, setStep] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const fichaRef = useRef<HTMLDivElement>(null);

  const [ficha, setFicha] = useState({
    nome: "",
    numero: "",
    arma: "",
    foto: "",
    classe: "",
    folego: 0,
    atributos: {
      Ataque: 10,
      Defesa: 10,
      Físico: 10,
      Velocidade: 10,
      Drible: 10,
      Passe: 10
    },
    pericias: {} as Record<string, number>,
    treinamentos: [] as string[]
  });

  const [folegoDice, setFolegoDice] = useState<number[]>([]);

  // --- Logic ---

  const updateAtributo = (attr: Atributo, val: number) => {
    setFicha(prev => ({
      ...prev,
      atributos: { ...prev.atributos, [attr]: Math.max(1, Math.min(20, val)) }
    }));
  };

  const updatePericia = (skill: string, val: number) => {
    setFicha(prev => ({
      ...prev,
      pericias: { ...prev.pericias, [skill]: Math.max(0, Math.min(20, val)) }
    }));
  };

  const toggleTraining = (id: string) => {
    setFicha(prev => {
      const exists = prev.treinamentos.includes(id);
      if (exists) {
        return { ...prev, treinamentos: prev.treinamentos.filter(t => t !== id) };
      } else {
        if (prev.treinamentos.length >= 2) return prev;
        return { ...prev, treinamentos: [...prev.treinamentos, id] };
      }
    });
  };

  const rollFolego = () => {
    const d1 = Math.floor(Math.random() * 15) + 1;
    const d2 = Math.floor(Math.random() * 15) + 1;
    const total = Math.max(12, d1 + d2);
    setFolegoDice([d1, d2]);
    setFicha(prev => ({ ...prev, folego: total }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFicha(prev => ({ ...prev, foto: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExportImage = async () => {
    if (!fichaRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(fichaRef.current, {
        backgroundColor: '#000000',
        scale: 2,
        useCORS: true
      });
      const link = document.createElement('a');
      link.download = `ficha-${ficha.nome || 'atleta'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      toast.success("Ficha exportada como imagem!");
    } catch (err) {
      toast.error("Falha ao exportar imagem.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleSaveToGallery = () => {
    // Implementação simplificada de salvamento local já que a API não foi encontrada
    const savedFichas = JSON.parse(localStorage.getItem("bluelock_fichas") || "[]");
    localStorage.setItem("bluelock_fichas", JSON.stringify([...savedFichas, { ...ficha, id: Date.now() }]));
    toast.success("Ficha salva localmente com sucesso!");
  };

  const handleNewFicha = () => {
    if (confirm("Deseja criar uma nova ficha? Todo o progresso atual será perdido.")) {
      window.location.reload();
    }
  };

  const selectedClass = classes.find(c => c.id === ficha.classe);

  const radarData = Object.entries(ficha.atributos).map(([key, value]) => ({
    subject: key,
    A: value,
    fullMark: 20,
  }));

  const calculateOverall = () => {
    const sum = Object.values(ficha.atributos).reduce((a, b) => a + b, 0);
    const avg = sum / 6;
    const total = Math.round(avg * 5); // Escala 0-100 aprox
    
    let rank = "C";
    let rankColor = "oklch(0.7 0.05 260)";
    
    if (total >= 90) { rank = "S+"; rankColor = "oklch(0.62 0.25 20)"; }
    else if (total >= 85) { rank = "S"; rankColor = "oklch(0.62 0.25 20)"; }
    else if (total >= 80) { rank = "A+"; rankColor = "oklch(0.72 0.2 100)"; }
    else if (total >= 75) { rank = "A"; rankColor = "oklch(0.72 0.2 100)"; }
    else if (total >= 70) { rank = "B+"; rankColor = "oklch(0.52 0.22 260)"; }
    else if (total >= 60) { rank = "B"; rankColor = "oklch(0.52 0.22 260)"; }
    
    return { total, rank, rankColor };
  };

  const overallData = calculateOverall();

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Progress Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="space-y-1">
            <h1 className="font-display text-4xl text-white italic tracking-tighter">SISTEMA BLUE LOCK</h1>
            <p className="text-primary font-heading text-[10px] tracking-[0.5em] uppercase">Gerador de Ficha de Atleta</p>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map(s => (
              <div 
                key={s} 
                className={`w-8 h-1 transition-all duration-500 ${step >= s ? 'bg-primary' : 'bg-white/10'}`} 
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
          <div className="w-full">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bl-card p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <User className="text-primary w-6 h-6" />
                  </div>
                  <h2 className="font-display text-3xl text-white tracking-wider uppercase italic">DADOS DO ATLETA</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="font-heading text-[10px] text-muted-foreground uppercase tracking-widest">NOME COMPLETO</label>
                      <input 
                        type="text" 
                        value={ficha.nome}
                        onChange={(e) => setFicha(prev => ({ ...prev, nome: e.target.value }))}
                        placeholder="Ex: Yoichi Isagi"
                        className="w-full bg-white/5 border border-white/10 p-4 rounded-sm text-white focus:border-primary focus:outline-none transition-colors font-heading uppercase italic"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="font-heading text-[10px] text-muted-foreground uppercase tracking-widest">NÚMERO</label>
                        <input 
                          type="text" 
                          value={ficha.numero}
                          onChange={(e) => setFicha(prev => ({ ...prev, numero: e.target.value }))}
                          placeholder="11"
                          className="w-full bg-white/5 border border-white/10 p-4 rounded-sm text-white focus:border-primary focus:outline-none transition-colors font-mono-stats text-center text-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-heading text-[10px] text-muted-foreground uppercase tracking-widest">ARMA</label>
                        <input 
                          type="text" 
                          value={ficha.arma}
                          onChange={(e) => setFicha(prev => ({ ...prev, arma: e.target.value }))}
                          placeholder="Ex: Chute Direto"
                          className="w-full bg-white/5 border border-white/10 p-4 rounded-sm text-white focus:border-primary focus:outline-none transition-colors font-heading uppercase italic text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-heading text-[10px] text-muted-foreground uppercase tracking-widest">FOTO DO PERFIL</label>
                    <div className="relative aspect-square w-full max-w-[240px] mx-auto group">
                      <div className="absolute inset-0 border-2 border-dashed border-white/10 rounded-sm flex flex-col items-center justify-center gap-2 group-hover:border-primary/40 transition-colors">
                        {ficha.foto ? (
                          <img src={ficha.foto} alt="Preview" className="w-full h-full object-cover rounded-sm" />
                        ) : (
                          <>
                            <Camera className="w-8 h-8 text-muted-foreground" />
                            <span className="text-[10px] text-muted-foreground font-heading uppercase">Upload de Imagem</span>
                          </>
                        )}
                      </div>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex justify-end">
                  <button 
                    onClick={() => setStep(2)} 
                    disabled={!ficha.nome}
                    className="bl-btn-primary group"
                  >
                    PRÓXIMO PASSO <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Class Selection */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Trophy className="text-primary w-6 h-6" />
                  </div>
                  <h2 className="font-display text-3xl text-white tracking-wider uppercase italic">ESCOLHA SUA CLASSE</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {classes.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setFicha(prev => ({ ...prev, classe: c.id }))}
                      className={`p-6 rounded-sm text-left transition-all border group relative overflow-hidden ${
                        ficha.classe === c.id 
                        ? 'bg-primary/10 border-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]' 
                        : 'bg-white/5 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                          <c.icon className={`w-5 h-5 ${ficha.classe === c.id ? 'text-primary' : 'text-muted-foreground'}`} />
                          <h3 className="font-display text-xl text-white italic uppercase tracking-wide">{c.name}</h3>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">{c.description}</p>
                        <div className="flex gap-2">
                          {Object.entries(c.bonus).map(([attr, val]) => (
                            <span key={attr} className="text-[9px] font-heading uppercase bg-white/5 px-2 py-1 rounded-sm text-primary">
                              {attr} +{val}
                            </span>
                          ))}
                        </div>
                      </div>
                      {ficha.classe === c.id && (
                        <div className="absolute top-4 right-4">
                          <Check className="w-5 h-5 text-primary" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="mt-8 flex justify-between">
                  <button onClick={() => setStep(1)} className="bl-btn-secondary">VOLTAR</button>
                  <button 
                    onClick={() => setStep(3)} 
                    disabled={!ficha.classe}
                    className="bl-btn-primary"
                  >
                    PRÓXIMO PASSO
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Attributes */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bl-card p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Activity className="text-primary w-6 h-6" />
                  </div>
                  <h2 className="font-display text-3xl text-white tracking-wider uppercase italic">ATRIBUTOS BASE</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    {(Object.keys(ficha.atributos) as Atributo[]).map((attr) => (
                      <div key={attr} className="space-y-2">
                        <div className="flex justify-between items-end">
                          <label className="font-heading text-[10px] text-muted-foreground uppercase tracking-widest">{attr}</label>
                          <span className="font-mono-stats text-xl text-white font-bold">{ficha.atributos[attr]}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => updateAtributo(attr, ficha.atributos[attr] - 1)}
                            className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                          >
                            <Minus className="w-4 h-4 text-white" />
                          </button>
                          <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <div 
                              className="h-full bg-primary transition-all duration-300" 
                              style={{ width: `${(ficha.atributos[attr] / 20) * 100}%` }}
                            />
                          </div>
                          <button 
                            onClick={() => updateAtributo(attr, ficha.atributos[attr] + 1)}
                            className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                          >
                            <Plus className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="h-[300px] md:h-full min-h-[300px] bg-white/5 rounded-sm border border-white/10 p-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                        <PolarGrid stroke="rgba(255,255,255,0.1)" />
                        <PolarAngleAxis 
                          dataKey="subject" 
                          tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 600 }} 
                        />
                        <Radar
                          name="Atributos"
                          dataKey="A"
                          stroke="oklch(0.62 0.25 20)"
                          fill="oklch(0.62 0.25 20)"
                          fillOpacity={0.6}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="mt-12 flex justify-between">
                  <button onClick={() => setStep(2)} className="bl-btn-secondary">VOLTAR</button>
                  <button onClick={() => setStep(4)} className="bl-btn-primary">PRÓXIMO PASSO</button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Skills */}
            {step === 4 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bl-card p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Sparkles className="text-primary w-6 h-6" />
                  </div>
                  <h2 className="font-display text-3xl text-white tracking-wider uppercase italic">DEFINIR PERÍCIAS</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {allSkills.map((skill) => (
                    <div key={skill} className="flex items-center justify-between gap-4 p-3 rounded-sm bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                      <label className="font-heading text-[10px] text-white uppercase tracking-wider">{skill}</label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={ficha.pericias[skill] || 0}
                        onChange={(e) => updatePericia(skill, parseInt(e.target.value) || 0)}
                        className="w-12 bg-black border border-white/10 py-1 rounded-sm text-xs font-mono-stats text-primary text-center focus:border-primary focus:outline-none"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-12 flex justify-between">
                  <button onClick={() => setStep(3)} className="bl-btn-secondary">VOLTAR</button>
                  <button onClick={() => setStep(5)} className="bl-btn-primary">PRÓXIMO PASSO</button>
                </div>
              </motion.div>
            )}

            {/* Step 5: Trainings */}
            {step === 5 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Dumbbell className="text-primary w-6 h-6" />
                  </div>
                  <h2 className="font-display text-3xl text-white tracking-wider uppercase italic">TREINAMENTOS (MÁX. 2)</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trainings.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => toggleTraining(t.id)}
                      className={`p-6 rounded-sm text-left transition-all border relative overflow-hidden ${
                        ficha.treinamentos.includes(t.id)
                        ? 'bg-primary/10 border-primary'
                        : 'bg-white/5 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="font-display text-xl text-white italic uppercase mb-2">{t.name}</div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{t.description}</p>
                      {ficha.treinamentos.includes(t.id) && (
                        <div className="absolute top-4 right-4">
                          <Check className="w-5 h-5 text-primary" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="mt-8 flex justify-between">
                  <button onClick={() => setStep(4)} className="bl-btn-secondary">VOLTAR</button>
                  <button 
                    onClick={() => setStep(6)} 
                    disabled={ficha.treinamentos.length === 0}
                    className="bl-btn-primary"
                  >
                    PRÓXIMO PASSO
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 6: Folego */}
            {step === 6 && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bl-card p-12 text-center">
                <div className="max-w-md mx-auto space-y-8">
                  <h2 className="font-display text-5xl text-white tracking-wider uppercase italic">DEFINIR FÔLEGO</h2>
                  
                  <div className="flex justify-center gap-6">
                    {folegoDice.length > 0 ? (
                      folegoDice.map((d, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="w-24 h-24 rounded-sm bg-primary flex items-center justify-center text-4xl font-black text-white shadow-2xl shadow-primary/30"
                        >
                          {d}
                        </motion.div>
                      ))
                    ) : (
                      <div className="w-56 h-24 rounded-sm border-2 border-dashed border-white/10 flex items-center justify-center text-muted-foreground font-heading uppercase tracking-widest text-xs">
                        AGUARDANDO ROLO...
                      </div>
                    )}
                  </div>
                  
                  <div className="py-8">
                    <div className="text-[10px] font-heading uppercase tracking-[0.4em] text-muted-foreground mb-2">PONTOS DE FÔLEGO TOTAIS</div>
                    <div className="text-8xl font-display text-white italic leading-none">{ficha.folego || "--"}</div>
                  </div>

                  <button
                    onClick={rollFolego}
                    className="bl-btn-primary px-12 py-5 text-xl gap-4 mx-auto"
                  >
                    <Zap className="w-6 h-6 fill-current" /> ROLAR 2D15
                  </button>
                  
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                    VALOR MÍNIMO GARANTIDO: 12 PONTOS
                  </p>
                </div>
                <div className="flex gap-4 mt-12 justify-center">
                  <button onClick={() => setStep(5)} className="bl-btn-secondary">VOLTAR</button>
                  <button 
                    onClick={() => setStep(7)} 
                    className="bl-btn-primary" 
                    disabled={ficha.folego === 0}
                  >
                    FINALIZAR FICHA
                  </button>
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
                  className="bl-card p-4 md:p-8 border-primary/40 relative overflow-hidden bg-black max-w-full mx-auto"
                  style={{ 
                    backgroundImage: 'radial-gradient(circle at 20% 20%, oklch(0.62 0.25 20 / 0.1) 0%, transparent 50%)',
                    width: '100%',
                    maxWidth: '850px'
                  }}
                >
                  {/* Speed Lines Background */}
                  <div className="absolute inset-0 bl-speed-lines opacity-10 pointer-events-none"></div>
                  
                  <div className="relative z-10 flex flex-col gap-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 border-b border-white/10 pb-8">
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left w-full sm:w-auto">
                        {ficha.foto && (
                          <div className="w-32 h-32 rounded-sm overflow-hidden border-2 border-primary/40 flex-shrink-0 shadow-2xl shadow-primary/20">
                            <img src={ficha.foto} alt="Atleta" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="bl-tag mb-3 mx-auto sm:mx-0">ATLETA BLUE LOCK</div>
                          <h2 className="font-display text-5xl md:text-6xl text-white tracking-wider uppercase italic leading-none mb-3 break-words">{ficha.nome || "SEM NOME"}</h2>
                          <div className="flex items-center justify-center sm:justify-start gap-4">
                            <p className="font-heading text-3xl text-primary font-bold italic">#{ficha.numero || "00"}</p>
                            {ficha.arma && (
                              <>
                                <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                                <p className="font-heading text-sm text-muted-foreground uppercase tracking-[0.3em]">{ficha.arma}</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-row sm:flex-col items-center sm:items-end gap-6 sm:gap-2 bg-primary/5 sm:bg-transparent p-4 sm:p-0 rounded-sm border border-primary/10 sm:border-0 w-full sm:w-auto justify-center">
                        <div className="text-center sm:text-right">
                          <div className="text-6xl font-black italic leading-none bl-glow" style={{ color: overallData.rankColor }}>{overallData.total}</div>
                          <div className="text-[10px] font-heading uppercase tracking-widest text-muted-foreground mt-1">OVERALL</div>
                        </div>
                        <div className="w-px h-10 bg-primary/20 sm:hidden"></div>
                        <div className="text-center sm:text-right">
                          <div className="text-4xl font-black italic leading-none" style={{ color: overallData.rankColor }}>{overallData.rank}</div>
                          <div className="text-[10px] font-heading uppercase tracking-widest text-muted-foreground mt-1">RANK</div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                      <div className="md:col-span-2 space-y-10">
                        {/* Stats & Skills */}
                        <div className="grid grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <h3 className="font-heading text-xs tracking-[0.3em] uppercase text-muted-foreground">STATUS DO PROJETO</h3>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">FÔLEGO</span>
                                <span className="font-mono-stats text-xl text-white font-bold">{ficha.folego}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">CLASSE</span>
                                <span className="font-heading text-sm font-bold text-primary italic uppercase">{selectedClass?.name || "-"}</span>
                              </div>
                              <div className="pt-4 border-t border-white/5">
                                <h4 className="text-[10px] text-muted-foreground uppercase tracking-widest mb-3">HABILIDADES DE CLASSE</h4>
                                <div className="space-y-2">
                                  {selectedClass?.abilities.slice(0, 2).map((ability) => (
                                    <div key={ability.name} className="flex justify-between items-center p-2 rounded-sm bg-white/5">
                                      <span className="text-[9px] font-bold text-white uppercase italic">{ability.name}</span>
                                      <span className="text-[8px] text-primary font-bold">{ability.cost}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <h3 className="font-heading text-xs tracking-[0.3em] uppercase text-muted-foreground">PERÍCIAS DESTAQUE</h3>
                            <div className="grid grid-cols-1 gap-2">
                              {Object.entries(ficha.pericias)
                                .filter(([_, val]) => val > 0)
                                .sort((a, b) => b[1] - a[1])
                                .slice(0, 5)
                                .map(([name, val]) => (
                                  <div key={name} className="flex items-center justify-between p-2 rounded-sm bg-white/5 border-l-2 border-primary/40">
                                    <span className="text-[9px] font-heading uppercase text-muted-foreground">{name}</span>
                                    <span className="font-mono-stats text-xs font-bold text-white">+{val}</span>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>

                        {/* Full Skills Description */}
                        <div className="space-y-4">
                          <h3 className="font-heading text-xs tracking-[0.3em] uppercase text-muted-foreground">DESCRIÇÃO DE HABILIDADES</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {selectedClass?.abilities.map((ability) => (
                              <div key={ability.name} className="space-y-1">
                                <div className="flex justify-between items-center">
                                  <span className="font-heading text-[10px] font-bold text-white uppercase italic">{ability.name}</span>
                                  <span className="text-[8px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-sm">{ability.cost}</span>
                                </div>
                                <p className="text-[9px] text-muted-foreground leading-relaxed italic">{ability.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Radar Chart Section */}
                      <div className="space-y-6">
                        <h3 className="font-heading text-xs tracking-[0.3em] uppercase text-muted-foreground text-center">GRÁFICO DE ATRIBUTOS</h3>
                        <div className="h-64 bg-white/5 border border-white/10 p-4 rounded-sm">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                              <PolarGrid stroke="rgba(255,255,255,0.1)" />
                              <PolarAngleAxis 
                                dataKey="subject" 
                                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 8, fontWeight: 600 }} 
                              />
                              <Radar
                                name="Atributos"
                                dataKey="A"
                                stroke="oklch(0.62 0.25 20)"
                                fill="oklch(0.62 0.25 20)"
                                fillOpacity={0.5}
                              />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="p-4 rounded-sm bg-primary/10 border border-primary/20">
                          <p className="text-[10px] text-primary leading-relaxed italic uppercase font-bold text-center">
                            "NO MUNDO DO FUTEBOL, SÓ OS EGOÍSTAS SOBREVIVEM."
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Export Actions */}
                <div className="flex flex-wrap gap-4 pt-8 border-t border-white/10">
                  <button 
                    onClick={handleSaveToGallery}
                    className="bl-btn-primary gap-2 bg-green-600 border-green-600 hover:bg-green-700"
                  >
                    <Save className="w-4 h-4" /> SALVAR LOCALMENTE
                  </button>
                  <button 
                    onClick={handleExportImage} 
                    disabled={isExporting}
                    className="bl-btn-primary gap-2 bg-blue-600 border-blue-600 hover:bg-blue-700"
                  >
                    <Download className="w-4 h-4" /> BAIXAR IMAGEM
                  </button>
                  <button 
                    onClick={handleNewFicha} 
                    className="bl-btn-secondary gap-2"
                  >
                    <RotateCcw className="w-4 h-4" /> NOVA FICHA
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar Preview (Desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="bl-card p-6 border-primary/20">
                <div className="text-[10px] font-heading uppercase tracking-[0.3em] text-muted-foreground mb-6">PREVIEW EM TEMPO REAL</div>
                <div className="space-y-6">
                  <div>
                    <div className="text-2xl font-display text-white uppercase italic truncate leading-none mb-1">{ficha.nome || "Novo Atleta"}</div>
                    <div className="text-primary font-heading text-sm">#{ficha.numero || "00"}</div>
                  </div>
                  
                  <div className="flex items-center gap-6 py-6 border-y border-white/5">
                    <div className="text-center">
                      <div className="text-3xl font-black italic leading-none" style={{ color: overallData.rankColor }}>{overallData.total}</div>
                      <div className="text-[8px] font-heading uppercase tracking-widest text-muted-foreground mt-1">OVERALL</div>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <div className="text-center">
                      <div className="text-2xl font-black italic leading-none" style={{ color: overallData.rankColor }}>{overallData.rank}</div>
                      <div className="text-[8px] font-heading uppercase tracking-widest text-muted-foreground mt-1">RANK</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(ficha.atributos).map(([key, val]) => (
                      <div key={key} className="text-center p-2 rounded-sm bg-white/5 border border-white/5">
                        <div className="text-xs font-bold text-white">{val}</div>
                        <div className="text-[8px] font-heading uppercase text-muted-foreground">{key.slice(0, 3)}</div>
                      </div>
                    ))}
                  </div>

                  {selectedClass && (
                    <div className="pt-2">
                      <div className="text-[10px] font-heading uppercase text-muted-foreground mb-1">CLASSE SELECIONADA</div>
                      <div className="text-xs font-bold text-primary uppercase italic">{selectedClass.name}</div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground px-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="uppercase tracking-widest">Sincronizado com o Ego</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
