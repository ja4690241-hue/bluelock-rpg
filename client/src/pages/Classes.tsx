import { motion } from "framer-motion";
import Accordion from "@/components/Accordion";
import { classes } from "@/lib/data";
import { Zap } from "lucide-react";

const difficultyColor: Record<string, string> = {
  "Fácil": "oklch(0.65 0.18 145)",
  "Médio": "oklch(0.75 0.18 60)",
  "Difícil": "oklch(0.75 0.18 25)",
  "Muito Difícil": "oklch(0.58 0.22 25)"
};

export default function Classes() {
  const classesItems = classes.map(cls => ({
    id: cls.id,
    title: `${cls.name} (${cls.role})`,
    icon: <Zap className="w-4 h-4" />,
    content: (
      <div className="space-y-4">
        <div>
          <p className="text-xs text-primary font-bold mb-1">{cls.subtitle}</p>
          <p className="italic text-muted-foreground">{cls.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-bold text-white mb-2 text-xs">Bônus de Atributos:</p>
            <div className="space-y-1">
              {cls.attributeBonus.map(b => (
                <div key={b.attr} className="text-xs bg-white/5 p-2 rounded border border-border/50">
                  <span className="font-bold text-primary">{b.attr}</span>: +{b.value}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-bold text-white mb-2 text-xs">Bônus de Perícias:</p>
            <div className="flex flex-wrap gap-1">
              {cls.skillBonus.map(b => (
                <div key={b.skill} className="text-[10px] bg-white/5 px-2 py-1 rounded border border-border/50">
                  <span className="font-bold text-primary">{b.skill}</span>: +{b.value}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p className="font-bold text-white mb-2 text-xs">Habilidades da Classe:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {cls.abilities.map((ability, idx) => (
              <div key={idx} className="text-xs bg-white/5 p-3 rounded border border-border/50 hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-bold text-primary">{ability.name}</p>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                    {ability.cost}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground mb-2 leading-relaxed">{ability.description}</p>
                {ability.bonus && (
                  <div className="mt-1 pt-1 border-t border-white/5">
                    <p className="text-[10px] text-white/80 font-medium">
                      <span className="text-primary">Bônus:</span> {ability.bonus}
                    </p>
                  </div>
                )}
                <div className="mt-1 flex gap-2 text-[9px] uppercase tracking-tighter opacity-60">
                  <span>Duração: {ability.duration}</span>
                  <span>•</span>
                  <span>Tipo: {ability.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }));

  return (
    <div className="py-16">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="bl-tag mb-4">Sistema de Jogo</div>
          <h1 className="font-display text-6xl md:text-7xl text-white tracking-wider mb-4 uppercase italic">
            Classes
          </h1>
          <div className="w-24 h-0.5 mb-6" style={{ background: 'oklch(0.52 0.22 260)' }} />
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            {classes.length} classes diferentes, cada uma com bônus únicos e habilidades especiais. Clique em cada classe para explorar seus detalhes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Accordion items={classesItems} allowMultiple={true} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 p-6 rounded-sm border border-primary/30"
          style={{ background: 'oklch(0.52 0.22 260 / 0.05)' }}
        >
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-white">Dica:</span> Escolha uma classe que combine com seu estilo de jogo. Os bônus de atributos e habilidades definem como seu atleta se comportará em campo.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
