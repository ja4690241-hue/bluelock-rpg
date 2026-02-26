import { motion } from "framer-motion";
import Accordion from "@/components/Accordion";
import { mechanics } from "@/lib/data";
import { Target, Zap, Shield, Ghost, Users, Clock } from "lucide-react";

export default function Mecanicas() {
  const icons: Record<string, any> = {
    passes: <Target className="w-4 h-4" />,
    chutes: <Zap className="w-4 h-4" />,
    dribles: <Zap className="w-4 h-4" />,
    furtividade: <Ghost className="w-4 h-4" />,
    flanquear: <Users className="w-4 h-4" />,
    acoes: <Clock className="w-4 h-4" />
  };

  const mecanicasItems = Object.entries(mechanics).map(([key, data]) => ({
    id: key,
    title: data.title,
    icon: icons[key] || <Shield className="w-4 h-4" />,
    content: (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground italic">{data.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.rules.map((rule, idx) => (
            <div key={idx} className="p-3 rounded-sm bg-white/5 border border-white/5">
              <p className="font-bold text-primary text-xs mb-1 uppercase tracking-wider">{rule.title}</p>
              <p className="text-xs text-white/80 leading-relaxed">{rule.content}</p>
            </div>
          ))}
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
            Mecânicas
          </h1>
          <div className="w-24 h-0.5 mb-6" style={{ background: 'oklch(0.52 0.22 260)' }} />
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            As mecânicas fundamentais do jogo. Clique em cada uma para entender como funcionam durante a partida.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Accordion items={mecanicasItems} allowMultiple={true} />
        </motion.div>
      </div>
    </div>
  );
}
