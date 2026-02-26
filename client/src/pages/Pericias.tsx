import { motion } from "framer-motion";
import Accordion from "@/components/Accordion";
import { skills, attributes } from "@/lib/data";

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

  const atributosItems = Object.entries(skillsByAttribute).map(([attr, attrSkills]) => {
    const attrData = attributes.find(a => a.name === attr);
    const color = attrData?.color || 'var(--primary)';
    
    return {
      id: attr.toLowerCase(),
      title: attr,
      icon: attrData?.icon || "⚡",
      color: color,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {attrSkills.map((skill, idx) => (
            <div key={idx} className="p-4 rounded-sm border border-white/5 hover:border-primary/30 transition-colors" style={{ background: 'oklch(0.12 0.015 260)' }}>
              <p className="font-bold text-white mb-1 uppercase tracking-wider text-sm">{skill.name}</p>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed italic">{skill.description}</p>
              <div className="pt-2 border-t border-white/5">
                <p className="text-[10px] text-white/80 leading-relaxed">
                  <strong className="text-primary uppercase mr-1">Uso:</strong> {skill.usage}
                </p>
              </div>
            </div>
          ))}
        </div>
      )
    };
  });

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
          className="space-y-4"
        >
          {atributosItems.map((item) => (
            <Accordion 
              key={item.id} 
              items={[item]} 
              allowMultiple={true} 
              className="border-l-4"
              style={{ borderLeftColor: item.color }}
            />
          ))}
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
