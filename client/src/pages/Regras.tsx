import { motion } from "framer-motion";
import Accordion from "@/components/Accordion";
import { attributes, classes, mechanics, items, glossary } from "@/lib/data";
import { Zap, Target, Shield, Star, Book, Info } from "lucide-react";

export default function Regras() {
  const atributosItems = attributes.map(attr => ({
    id: attr.id,
    title: attr.name,
    icon: attr.icon || "⚡",
    content: (
      <div className="space-y-3">
        <p className="italic text-muted-foreground">{attr.description}</p>
        <div>
          <p className="font-bold text-white mb-1">Perícias Relacionadas:</p>
          <div className="flex flex-wrap gap-1">
            {attr.skills.map(s => (
              <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">{s}</span>
            ))}
          </div>
        </div>
      </div>
    )
  }));

  const classesItems = classes.map(cls => ({
    id: cls.id,
    title: `${cls.name} (${cls.role})`,
    icon: <Zap className="w-4 h-4" />,
    content: (
      <div className="space-y-3">
        <div>
          <p className="text-xs text-primary font-bold mb-1">{cls.subtitle}</p>
          <p className="italic text-sm text-muted-foreground">{cls.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-bold text-white mb-2 text-xs">Bônus de Atributos:</p>
            <div className="flex flex-wrap gap-1">
              {cls.attributeBonus.map(b => (
                <div key={b.attr} className="text-[10px] bg-white/5 px-2 py-1 rounded border border-border/50">
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
      </div>
    )
  }));

  const mecanicasItems = Object.entries(mechanics).map(([key, data]) => ({
    id: key,
    title: data.title,
    icon: <Target className="w-4 h-4" />,
    content: (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground italic">{data.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.rules.map((rule, idx) => (
            <div key={idx} className="p-3 rounded-sm bg-white/5 border border-white/5">
              <p className="font-bold text-primary text-[10px] mb-1 uppercase tracking-wider">{rule.title}</p>
              <p className="text-[11px] text-white/80 leading-relaxed">{rule.content}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }));

  const itemsItems = items.map((item, i) => ({
    id: `item-${i}`,
    title: item.name,
    icon: <Star className="w-4 h-4" />,
    content: (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs text-primary font-bold uppercase tracking-widest">{item.price}</p>
        </div>
        <p className="text-sm text-muted-foreground">{item.description}</p>
        <div className="p-2 rounded-sm bg-primary/5 border border-primary/10">
          <p className="text-xs text-white/90"><span className="text-primary font-bold mr-2">EFEITO:</span>{item.effects}</p>
        </div>
      </div>
    )
  }));

  const glossaryItems = glossary.map((g, i) => ({
    id: `glossary-${i}`,
    title: g.term,
    icon: <Info className="w-4 h-4" />,
    content: (
      <p className="text-sm text-muted-foreground leading-relaxed">{g.definition}</p>
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
          <div className="bl-tag mb-4">Referência</div>
          <h1 className="font-display text-6xl md:text-7xl text-white tracking-wider mb-4 uppercase italic">
            REGRAS
          </h1>
          <div className="w-24 h-0.5 mb-6" style={{ background: 'oklch(0.52 0.22 260)' }} />
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Todas as regras do Blue Lock RPG em um único lugar. Clique em cada seção para expandir e explorar os detalhes.
          </p>
        </motion.div>

        {/* Atributos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="font-display text-3xl text-white tracking-wider mb-6 uppercase">Atributos</h2>
          <Accordion items={atributosItems} allowMultiple={true} />
        </motion.div>

        {/* Classes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="font-display text-3xl text-white tracking-wider mb-6 uppercase">Classes</h2>
          <Accordion items={classesItems} allowMultiple={true} />
        </motion.div>

        {/* Mecânicas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="font-display text-3xl text-white tracking-wider mb-6 uppercase">Mecânicas de Ação</h2>
          <Accordion items={mecanicasItems} allowMultiple={true} />
        </motion.div>

        {/* Fluxo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="font-display text-3xl text-white tracking-wider mb-6 uppercase">Fluxo</h2>
          <Accordion items={fluxoItems} allowMultiple={true} />
        </motion.div>

        {/* Itens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="font-display text-3xl text-white tracking-wider mb-6 uppercase">Itens</h2>
          <Accordion items={itemsItems} allowMultiple={true} />
        </motion.div>

        {/* Glossário */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-display text-3xl text-white tracking-wider mb-6 uppercase">Glossário de Termos</h2>
          <Accordion items={glossaryItems} allowMultiple={true} />
        </motion.div>
      </div>
    </div>
  );
}
