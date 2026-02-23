import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface ClassBonus {
  nome: string;
  potencia: number;
  tecnica: number;
  velocidade: number;
  agilidade: number;
  ego: number;
}

const classes: ClassBonus[] = [
  { nome: "PlayMaker", potencia: 0, tecnica: 2, velocidade: 1, agilidade: 1, ego: 1 },
  { nome: "Dominador Superior", potencia: 2, tecnica: 1, velocidade: 0, agilidade: 1, ego: 2 },
  { nome: "Velocista", potencia: 0, tecnica: 1, velocidade: 3, agilidade: 1, ego: 0 },
  { nome: "Especialista Espacial", potencia: 0, tecnica: 2, velocidade: 1, agilidade: 1, ego: 1 },
  { nome: "Finalizador Clínico", potencia: 3, tecnica: 1, velocidade: 0, agilidade: 0, ego: 1 },
  { nome: "Driblador", potencia: 0, tecnica: 2, velocidade: 1, agilidade: 2, ego: 0 },
  { nome: "Atacante Completo", potencia: 0, tecnica: 0, velocidade: 0, agilidade: 0, ego: 0 },
  { nome: "Caçador de Gols", potencia: 2, tecnica: 1, velocidade: 1, agilidade: 0, ego: 2 },
  { nome: "Atacante Controlador", potencia: 1, tecnica: 2, velocidade: 0, agilidade: 1, ego: 1 },
  { nome: "Multi-Funções", potencia: 1, tecnica: 1, velocidade: 1, agilidade: 1, ego: 0 },
  { nome: "Atacante Saltador", potencia: 1, tecnica: 1, velocidade: 1, agilidade: 1, ego: 0 },
  { nome: "Defensor Espacial", potencia: 1, tecnica: 1, velocidade: 0, agilidade: 2, ego: 0 },
  { nome: "Louco da Estamina", potencia: 1, tecnica: 1, velocidade: 2, agilidade: 1, ego: 0 },
  { nome: "Vilão do Campo", potencia: 2, tecnica: 1, velocidade: 1, agilidade: 0, ego: 1 },
  { nome: "Goleiro", potencia: 1, tecnica: 1, velocidade: 0, agilidade: 1, ego: 1 },
  { nome: "Ninja", potencia: 0, tecnica: 2, velocidade: 1, agilidade: 2, ego: 0 },
  { nome: "Imperador", potencia: 1, tecnica: 1, velocidade: 1, agilidade: 1, ego: 3 },
  { nome: "Devorador de Ás", potencia: 2, tecnica: 1, velocidade: 1, agilidade: 1, ego: 0 },
  { nome: "Analista", potencia: 0, tecnica: 1, velocidade: 0, agilidade: 1, ego: 2 },
  { nome: "Cachorro Louco", potencia: 1, tecnica: 1, velocidade: 2, agilidade: 1, ego: 0 },
];

export default function Calculadora() {
  const [selectedClass, setSelectedClass] = useState<ClassBonus>(classes[0]);
  const [baseAttributes, setBaseAttributes] = useState({
    potencia: 3,
    tecnica: 3,
    velocidade: 3,
    agilidade: 3,
    ego: 3,
  });

  const finalAttributes = {
    potencia: baseAttributes.potencia + selectedClass.potencia,
    tecnica: baseAttributes.tecnica + selectedClass.tecnica,
    velocidade: baseAttributes.velocidade + selectedClass.velocidade,
    agilidade: baseAttributes.agilidade + selectedClass.agilidade,
    ego: baseAttributes.ego + selectedClass.ego,
  };

  const totalFolego = Math.floor((finalAttributes.potencia + finalAttributes.tecnica + finalAttributes.velocidade + finalAttributes.agilidade + finalAttributes.ego) * 1.5);

  const handleAttributeChange = (attr: keyof typeof baseAttributes, value: number) => {
    setBaseAttributes(prev => ({
      ...prev,
      [attr]: value
    }));
  };

  const resetCalculator = () => {
    setBaseAttributes({
      potencia: 3,
      tecnica: 3,
      velocidade: 3,
      agilidade: 3,
      ego: 3,
    });
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="mb-4 inline-block px-3 py-1 rounded-sm" style={{ background: 'oklch(0.52 0.22 260 / 0.2)', border: '1px solid oklch(0.52 0.22 260 / 0.5)' }}>
            <span className="font-heading text-xs tracking-widest uppercase" style={{ color: 'oklch(0.75 0.15 230)' }}>Ferramenta Interativa</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-white tracking-wider mb-6">CALCULADORA DE FICHA</h1>
          <div className="w-16 h-1 mb-8" style={{ background: 'oklch(0.52 0.22 260)' }}></div>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Calcule seus atributos finais, fôlego e bônus de classe em tempo real. Escolha sua classe e distribua seus pontos base para ver como sua ficha fica.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Seleção de Classe */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="p-6 bl-card sticky top-24">
              <h2 className="font-display text-2xl text-white mb-4">ESCOLHA SUA CLASSE</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {classes.map((cls) => (
                  <button
                    key={cls.nome}
                    onClick={() => setSelectedClass(cls)}
                    className="w-full text-left px-4 py-2 rounded-sm text-sm font-heading tracking-wider transition-all"
                    style={{
                      background: selectedClass.nome === cls.nome ? 'oklch(0.52 0.22 260 / 0.3)' : 'oklch(0.12 0.015 260)',
                      border: selectedClass.nome === cls.nome ? '1px solid oklch(0.52 0.22 260)' : '1px solid oklch(0.22 0.03 260)',
                      color: selectedClass.nome === cls.nome ? 'oklch(0.75 0.15 230)' : 'text-muted-foreground'
                    }}
                  >
                    {cls.nome}
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Distribuição de Atributos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <Card className="p-8 bl-card">
              <h2 className="font-display text-2xl text-white mb-6">ATRIBUTOS BASE</h2>
              <div className="space-y-6">
                {Object.entries(baseAttributes).map(([attr, value]) => {
                  const colors: Record<string, string> = {
                    potencia: 'oklch(0.75 0.18 25)',
                    tecnica: 'oklch(0.75 0.15 230)',
                    velocidade: 'oklch(0.65 0.18 145)',
                    agilidade: 'oklch(0.52 0.22 260)',
                    ego: 'oklch(0.75 0.18 60)',
                  };
                  const color = colors[attr];

                  return (
                    <div key={attr}>
                      <div className="flex items-center justify-between mb-2">
                        <label className="font-heading text-sm uppercase tracking-wider" style={{ color }}>
                          {attr.charAt(0).toUpperCase() + attr.slice(1)}
                        </label>
                        <span className="font-display text-2xl" style={{ color }}>{value}</span>
                      </div>
                      <Slider
                        value={[value]}
                        onValueChange={(val) => handleAttributeChange(attr as keyof typeof baseAttributes, val[0])}
                        min={1}
                        max={8}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Resumo da Classe */}
            <Card className="p-8 bl-card" style={{ background: 'oklch(0.12 0.015 260)', border: '1px solid oklch(0.52 0.22 260 / 0.3)' }}>
              <h2 className="font-display text-2xl text-white mb-4" style={{ color: 'oklch(0.52 0.22 260)' }}>
                {selectedClass.nome}
              </h2>
              <div className="grid grid-cols-5 gap-3 mb-6">
                {Object.entries(selectedClass).map(([key, value]) => {
                  if (key === 'nome') return null;
                  const colors: Record<string, string> = {
                    potencia: 'oklch(0.75 0.18 25)',
                    tecnica: 'oklch(0.75 0.15 230)',
                    velocidade: 'oklch(0.65 0.18 145)',
                    agilidade: 'oklch(0.52 0.22 260)',
                    ego: 'oklch(0.75 0.18 60)',
                  };
                  const color = colors[key];

                  return (
                    <div key={key} className="text-center p-3 rounded-sm" style={{ background: `${color}/10` }}>
                      <div className="font-heading text-xs uppercase tracking-wider" style={{ color }}>
                        {key.slice(0, 3)}
                      </div>
                      <div className="font-display text-2xl" style={{ color }}>
                        +{value}
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-muted-foreground text-sm">Bônus de classe adicionados aos seus atributos base</p>
            </Card>

            {/* Atributos Finais */}
            <Card className="p-8 bl-card" style={{ background: 'oklch(0.52 0.22 260 / 0.1)', border: '2px solid oklch(0.52 0.22 260)' }}>
              <h2 className="font-display text-2xl text-white mb-6" style={{ color: 'oklch(0.52 0.22 260)' }}>
                ATRIBUTOS FINAIS
              </h2>
              <div className="grid grid-cols-5 gap-3 mb-6">
                {Object.entries(finalAttributes).map(([attr, value]) => {
                  const colors: Record<string, string> = {
                    potencia: 'oklch(0.75 0.18 25)',
                    tecnica: 'oklch(0.75 0.15 230)',
                    velocidade: 'oklch(0.65 0.18 145)',
                    agilidade: 'oklch(0.52 0.22 260)',
                    ego: 'oklch(0.75 0.18 60)',
                  };
                  const color = colors[attr];

                  return (
                    <div key={attr} className="text-center p-4 rounded-sm" style={{ background: `${color}/15`, border: `1px solid ${color}/30` }}>
                      <div className="font-heading text-xs uppercase tracking-wider" style={{ color }}>
                        {attr.slice(0, 3)}
                      </div>
                      <div className="font-display text-3xl font-bold" style={{ color }}>
                        {value}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 rounded-sm mb-6" style={{ background: 'oklch(0.12 0.015 260)' }}>
                <div className="flex items-center justify-between">
                  <span className="font-heading text-sm uppercase tracking-wider text-muted-foreground">Fôlego Total</span>
                  <span className="font-display text-4xl" style={{ color: 'oklch(0.52 0.22 260)' }}>
                    {totalFolego}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Calculado como: (Soma de Atributos) × 1.5
                </p>
              </div>

              <Button
                onClick={resetCalculator}
                className="w-full"
                style={{
                  background: 'oklch(0.52 0.22 260)',
                  color: 'white'
                }}
              >
                Resetar Calculadora
              </Button>
            </Card>
          </motion.div>
        </div>

        {/* Dicas */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t"
          style={{ borderColor: 'oklch(0.22 0.03 260)' }}
        >
          <h2 className="font-display text-3xl text-white tracking-wider mb-8">DICAS DE DISTRIBUIÇÃO</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bl-card">
              <h3 className="font-heading text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span style={{ color: 'oklch(0.52 0.22 260)' }}>▸</span>
                Especialista
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Foque em 2-3 atributos altos (6-8) e deixe os outros baixos (1-3). Isso cria um personagem com arma única e poderosa.
              </p>
            </Card>

            <Card className="p-6 bl-card">
              <h3 className="font-heading text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span style={{ color: 'oklch(0.52 0.22 260)' }}>▸</span>
                Balanceado
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Distribua pontos de forma equilibrada (4-5 em cada). Bom para jogadores versáteis que querem múltiplas opções.
              </p>
            </Card>

            <Card className="p-6 bl-card">
              <h3 className="font-heading text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span style={{ color: 'oklch(0.52 0.22 260)' }}>▸</span>
                Híbrido
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Combine 1 atributo muito alto (7-8) com 2-3 atributos médios (4-5). Equilibra força com versatilidade.
              </p>
            </Card>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
