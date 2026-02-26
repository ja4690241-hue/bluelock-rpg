import { motion } from "framer-motion";
import Accordion from "@/components/Accordion";
import { skills } from "@/lib/data";

export default function Pericias() {
  // Agrupar perícias por atributo
  const skillsByAttribute = skills.reduce((acc, skill) => {
    const attr = skill.attribute;
    if (!acc[attr]) {
      acc[attr] = [];
    }
    acc[attr].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const attributeColors: Record<string, string> = {
    "Potência": "🔴",
    "Técnica": "🔵",
    "Velocidade": "🟢",
    "Agilidade": "🟣",
    "Ego": "🟡",
    "Fôlego": "⚪"
  };

  const atributosItems = Object.entries(skillsByAttribute).map(([attr, attrSkills]) => ({
    id: attr.toLowerCase(),
    title: attr,
    icon: attributeColors[attr] || "⚡",
    content: (
      <div className="space-y-3">
        {attrSkills.map((skill, idx) => (
          <div key={idx} className="p-3 rounded-sm border border-border/50" style={{ background: 'oklch(0.08 0.01 260)' }}>
            <p className="font-bold text-white mb-1">{skill.name}</p>
            <p className="text-xs text-muted-foreground mb-2">{skill.description}</p>
            <p className="text-xs text-primary"><strong>Uso:</strong> {skill.usage}</p>
          </div>
        ))}
      </div>
    )
  }));

  return (
    <div className="py-16">
      <div className="container max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="bl-tag mb-4">Sistema de Jogo</div>
          <h1 className="font-display text-6xl md:text-7xl text-white tracking-wider mb-4 uppercase italic">
            Perícias
          </h1>
          <div className="w-24 h-0.5 mb-6" style={{ background: 'oklch(0.52 0.22 260)' }} />
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            As 19 perícias que seu atleta pode dominar. Cada uma está relacionada a um atributo específico. Clique em cada atributo para ver suas perícias.
          </p>
        </motion.div>

        {/* Accordions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Accordion items={atributosItems} allowMultiple={true} />
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 p-6 rounded-sm border border-primary/30"
          style={{ background: 'oklch(0.52 0.22 260 / 0.05)' }}
        >
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-white">Dica:</span> Suas perícias ganham modificadores baseados nos atributos. Um atleta com Potência alta terá bônus em perícias de Potência como Chute e Corpo a Corpo.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
