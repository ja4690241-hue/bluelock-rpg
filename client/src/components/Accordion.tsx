import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
}

export default function Accordion({ items, allowMultiple = false, defaultOpen = [] }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpen));

  const toggleItem = (id: string) => {
    const newOpen = new Set(openItems);
    
    if (allowMultiple) {
      if (newOpen.has(id)) {
        newOpen.delete(id);
      } else {
        newOpen.add(id);
      }
    } else {
      // Se não permite múltiplos, fecha os outros
      if (newOpen.has(id)) {
        newOpen.delete(id);
      } else {
        newOpen.clear();
        newOpen.add(id);
      }
    }
    
    setOpenItems(newOpen);
  };

  return (
    <div className="space-y-2">
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        
        return (
          <div key={item.id} className="rounded-sm border border-border/50 overflow-hidden">
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
              style={{
                background: isOpen ? 'oklch(0.52 0.22 260 / 0.1)' : 'oklch(0.12 0.015 260)',
              }}
            >
              <div className="flex items-center gap-3 text-left">
                {item.icon && <div className="text-xl">{item.icon}</div>}
                <span className="font-heading text-sm font-bold text-white uppercase tracking-wider">
                  {item.title}
                </span>
              </div>
              <ChevronDown
                className="w-5 h-5 transition-transform flex-shrink-0"
                style={{
                  color: 'oklch(0.75 0.15 230)',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </button>

            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="border-t border-border/50 p-4"
                style={{ background: 'oklch(0.08 0.01 260)' }}
              >
                <div className="text-sm text-muted-foreground leading-relaxed">
                  {item.content}
                </div>
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
}
