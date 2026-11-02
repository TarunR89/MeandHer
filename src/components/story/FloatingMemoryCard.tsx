import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { soundManager } from '../audio/SoundManager';
import { PixelButton } from '../ui/PixelButton';

interface MemoryItem {
  id: number;
  title: string;
  reflection: string;
  color: string;
  revealed: boolean;
}

interface FloatingMemoryCardsProps {
  onAllRevealed: () => void;
}

export const FloatingMemoryCards: React.FC<FloatingMemoryCardsProps> = ({ onAllRevealed }) => {
  const [cards, setCards] = useState<MemoryItem[]>([
    {
      id: 1,
      title: "The things we kept to ourselves.",
      reflection: "Behind the laughs and jokes, we both held quiet pieces of our lives that few people ever got to see.",
      color: "border-indigo-300 bg-indigo-50/70 text-indigo-950",
      revealed: false
    },
    {
      id: 2,
      title: "The difficult days.",
      reflection: "We didn't pretend everything was effortless. Being real mattered more than keeping up a polished front.",
      color: "border-purple-300 bg-purple-50/70 text-purple-950",
      revealed: false
    },
    {
      id: 3,
      title: "The memories that still mattered.",
      reflection: "Listening to your past made me realize how resilient you are. Your empathy wasn't an act—it was genuine.",
      color: "border-pink-300 bg-pink-50/70 text-pink-950",
      revealed: false
    },
    {
      id: 4,
      title: "The stories we weren't used to sharing.",
      reflection: "With you, vulnerability didn't feel like a risk. It felt like breathing out after holding my breath.",
      color: "border-rose-300 bg-rose-50/70 text-rose-950",
      revealed: false
    },
    {
      id: 5,
      title: "The courage it took to open up.",
      reflection: "You made sharing feel safe. In a world full of noise, you actually heard me.",
      color: "border-amber-300 bg-amber-50/70 text-amber-950",
      revealed: false
    }
  ]);

  const [activeReflection, setActiveReflection] = useState<string | null>(null);

  const handleReveal = (id: number) => {
    soundManager.playHeart();
    setCards(prev =>
      prev.map(c => (c.id === id ? { ...c, revealed: true } : c))
    );
    const target = cards.find(c => c.id === id);
    if (target) {
      setActiveReflection(target.reflection);
    }
  };

  const revealedCount = cards.filter(c => c.revealed).length;
  const isComplete = revealedCount === cards.length;

  return (
    <div className="w-full max-w-xl mx-auto bg-[#fffdf9] rounded-3xl border-4 border-[#3b1d32] shadow-[6px_6px_0px_#3b1d32] p-5 sm:p-6 select-none my-3">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-pink-200">
        <div>
          <span className="font-['Silkscreen'] text-[10px] text-purple-700 font-bold block">
            SCENE 3.2: THE THINGS WE NEVER SAID
          </span>
          <h3 className="font-['Fredoka'] text-sm sm:text-base font-bold text-[#3b1d32]">
            Tap the cards to reflect together
          </h3>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-['Silkscreen'] bg-pink-100 text-pink-700 border border-pink-300 font-bold">
          {revealedCount}/{cards.length}
        </span>
      </div>

      <p className="font-['Fredoka'] text-xs text-gray-600 my-2 text-center">
        No score or pressure—just the quiet honesty that drew both hearts closer:
      </p>

      {/* Cards List */}
      <div className="space-y-2.5 my-3">
        {cards.map(c => (
          <motion.button
            key={c.id}
            whileHover={!c.revealed ? { x: 4 } : {}}
            whileTap={!c.revealed ? { scale: 0.98 } : {}}
            onClick={() => handleReveal(c.id)}
            className={`w-full p-3 rounded-2xl border-2 text-left font-['Fredoka'] font-semibold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${
              c.revealed
                ? 'bg-white border-[#3b1d32] shadow-[2px_2px_0px_#3b1d32]'
                : `${c.color} border-[#3b1d32]/30 shadow-sm hover:border-[#3b1d32]`
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-['Silkscreen'] ${
                c.revealed ? 'bg-pink-400 text-white' : 'bg-white/80 text-gray-500'
              }`}>
                {c.revealed ? '✓' : c.id}
              </span>
              <span>{c.title}</span>
            </div>
            {c.revealed && <Sparkles className="w-3.5 h-3.5 text-pink-500 flex-shrink-0" />}
          </motion.button>
        ))}
      </div>

      {/* Active Reflection Display */}
      <AnimatePresence mode="wait">
        {activeReflection && (
          <motion.div
            key={activeReflection}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-3.5 bg-pink-50/80 rounded-2xl border-2 border-pink-300 text-center font-['Fredoka'] text-xs sm:text-sm text-[#3b1d32] italic leading-relaxed shadow-inner"
          >
            “{activeReflection}”
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue Action */}
      <div className="flex justify-end pt-3 border-t-2 border-pink-100 mt-3">
        {isComplete ? (
          <PixelButton
            variant="pink"
            size="sm"
            icon={<ArrowRight className="w-4 h-4" />}
            onClick={onAllRevealed}
          >
            Enter The Comfort Scene ➔
          </PixelButton>
        ) : (
          <span className="text-[10px] font-['Silkscreen'] text-gray-400">
            {cards.length - revealedCount} MEMORIES REMAINING
          </span>
        )}
      </div>
    </div>
  );
};
