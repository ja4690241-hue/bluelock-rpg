import { motion } from "framer-motion";
import Accordion from "@/components/Accordion";
import { attributes } from "@/lib/data";

export default function Atributos() {
  const atributosItems = attributes.map(attr => ({
    id: attr.id,
    title: attr.name,
    icon: "⚡",
    content: (
      <div className="space-y-4">
        <p className="italic text-muted-foreground">{attr.description}</p>
        
        <div>
          <p className="font-bold text-white mb-2">Propósito:</p>
          <p className="text-sm">{attr.purpose}</p>
        </div>

        <div>
          <p className="font-bold text-white mb-2">Perícias Relacionadas:</p>
          <div className="flex flex-wrap gap-2">
            {attr.skills.map(skill => (
              <span key={skill} className="px-3 py-1 rounded-sm text-xs bg-primary/20 text-primary border border-primary/50">
                {skill}
              </span>
            ))}
          </div>
        </div>
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
            Atributos
          </h1>
          <div className="w-24 h-0.5 mb-6" style={{ background: 'oklch(0.52 0.22 260)' }} />
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Os seis atributos fundamentais que definem as capacidades do seu atleta. Clique em cada um para conhecer mais detalhes.
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
            <span className="font-bold text-white">Dica:</span> Durante a criação de ficha, você distribui pontos entre esses atributos. Cada atributo afeta diferentes perícias e ações durante o jogo.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
