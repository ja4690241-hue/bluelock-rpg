import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dices } from "lucide-react";
import { toast } from "sonner";

interface DiceResult {
  id: string;
  dice: string;
  result: number;
  timestamp: number;
}

export default function DiceRoller() {
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<DiceResult[]>([]);
  const [selectedDice, setSelectedDice] = useState("d20");

  const diceTypes = [
    { label: "d4", value: "d4", sides: 4 },
    { label: "d6", value: "d6", sides: 6 },
    { label: "d8", value: "d8", sides: 8 },
    { label: "d10", value: "d10", sides: 10 },
    { label: "d12", value: "d12", sides: 12 },
    { label: "d20", value: "d20", sides: 20 },
    { label: "d100", value: "d100", sides: 100 },
    { label: "2d15", value: "2d15", sides: 15, count: 2 },
  ];

  const rollDice = (diceType: string) => {
    const dice = diceTypes.find(d => d.value === diceType);
    if (!dice) return;

    const count = dice.count || 1;
    let total = 0;
    const rolls = [];

    for (let i = 0; i < count; i++) {
      const roll = Math.floor(Math.random() * dice.sides) + 1;
      rolls.push(roll);
      total += roll;
    }

    const result: DiceResult = {
      id: `${Date.now()}-${Math.random()}`,
      dice: diceType,
      result: total,
      timestamp: Date.now(),
    };

    setResults(prev => [result, ...prev.slice(0, 9)]);

    // Toast notification
    if (count === 1) {
      toast.success(`${diceType}: ${total}`, {
        description: `Resultado: ${total}`,
      });
    } else {
      toast.success(`${diceType}: ${rolls.join(" + ")} = ${total}`, {
        description: `Total: ${total}`,
      });
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-sm flex items-center justify-center"
        style={{
          background: "oklch(0.52 0.22 260)",
          boxShadow: "0 0 20px oklch(0.52 0.22 260 / 0.4)",
        }}
      >
        <Dices className="w-6 h-6 text-white" />
      </motion.button>

      {/* Dice Roller Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/50"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed bottom-24 right-6 z-50 w-80 rounded-sm p-6"
              style={{
                background: "oklch(0.10 0.015 260)",
                border: "1px solid oklch(0.22 0.03 260)",
                boxShadow: "0 0 30px oklch(0.52 0.22 260 / 0.2)",
              }}
            >
              {/* Header */}
              <div className="mb-6">
                <h3 className="font-display text-xl text-white tracking-wider mb-1">
                  ROLADOR DE DADOS
                </h3>
                <div className="w-12 h-1" style={{ background: "oklch(0.52 0.22 260)" }} />
              </div>

              {/* Dice Buttons */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {diceTypes.map((dice) => (
                  <motion.button
                    key={dice.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => rollDice(dice.value)}
                    className="p-2 rounded-sm text-sm font-heading font-bold text-white transition-all"
                    style={{
                      background:
                        selectedDice === dice.value
                          ? "oklch(0.52 0.22 260)"
                          : "oklch(0.12 0.015 260)",
                      border: "1px solid oklch(0.22 0.03 260)",
                    }}
                    onMouseEnter={() => setSelectedDice(dice.value)}
                  >
                    {dice.label}
                  </motion.button>
                ))}
              </div>

              {/* Results History */}
              {results.length > 0 && (
                <div className="border-t border-border/50 pt-4">
                  <p className="text-xs font-heading tracking-widest uppercase text-muted-foreground mb-3">
                    Últimos Resultados
                  </p>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    <AnimatePresence>
                      {results.map((result, idx) => (
                        <motion.div
                          key={result.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="p-2 rounded-sm flex items-center justify-between"
                          style={{
                            background: "oklch(0.12 0.015 260)",
                            border: "1px solid oklch(0.22 0.03 260)",
                          }}
                        >
                          <span className="text-xs font-heading text-muted-foreground">
                            {result.dice}
                          </span>
                          <span
                            className="text-sm font-mono-stats font-bold"
                            style={{ color: "oklch(0.52 0.22 260)" }}
                          >
                            {result.result}
                          </span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
