import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { soundManager } from '../audio/SoundManager';
import { PixelButton } from '../ui/PixelButton';
import { BoySprite } from '../characters/BoySprite';
import { GirlSprite } from '../characters/GirlSprite';

interface SameWavelengthMiniGameProps {
  onComplete: () => void;
}

export const SameWavelengthMiniGame: React.FC<SameWavelengthMiniGameProps> = ({ onComplete }) => {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [reactionText, setReactionText] = useState<string | null>(null);
  const [girlReaction, setGirlReaction] = useState<string | null>(null);

  const choices = [
    {
      id: 0,
      badge: "OPTION A",
      text: "“Absolute masterpiece.” (Said no one with working eyesight)",
      boyComment: "10/10 for irony, 0/10 for fashion taste.",
      girlReply: "LMAO if you said this unironically I would have blocked you immediately! 💀",
      color: "border-pink-300 hover:bg-pink-50"
    },
    {
      id: 1,
      badge: "OPTION B",
      text: "“We respectfully disagree with its entire existence.”",
      boyComment: "Diplomatic, sensible, and objectively correct.",
      girlReply: "FINALLY! Respectfully wiping it from history with you! 💅✨",
      color: "border-purple-300 hover:bg-purple-50"
    },
    {
      id: 2,
      badge: "OPTION C",
      text: "“Rohini probably started it to distract everyone from her lies.”",
      boyComment: "She definitely smuggled neon velvet in her secret bag.",
      girlReply: "STOPPP!! 😭 You literally brought serial villainy into fashion discourse! I'M CRYING!",
      color: "border-rose-300 hover:bg-rose-50"
    }
  ];

  const handleSelect = (idx: number) => {
    soundManager.playHeart();
    setSelectedChoice(idx);
    setReactionText(choices[idx].boyComment);
    setGirlReaction(choices[idx].girlReply);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-[#fffdf7] rounded-3xl border-4 border-[#3b1d32] shadow-[6px_6px_0px_#3b1d32] p-5 sm:p-6 select-none my-3">
      {/* Header */}
      <div className="text-center mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-100 text-[#be185d] font-['Silkscreen'] text-[10px] rounded-full border border-pink-300 font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          INTERACTIVE MINI-GAME
        </span>
        <h3 className="font-['Silkscreen'] text-sm sm:text-base font-bold text-[#3b1d32]">
          ARE WE ON THE SAME WAVELENGTH?
        </h3>
        <p className="font-['Fredoka'] text-xs text-gray-600 mt-1">
          Pick your official verdict on the retro trend:
        </p>
      </div>

      {/* Choices List */}
      <div className="space-y-2.5">
        {choices.map((c, i) => (
          <button
            key={c.id}
            onClick={() => handleSelect(i)}
            className={`w-full text-left p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-2.5 ${
              selectedChoice === i
                ? 'bg-pink-100 border-[#3b1d32] shadow-[3px_3px_0px_#3b1d32] scale-[1.01]'
                : `bg-white ${c.color} border-[#3b1d32]/30 shadow-sm hover:translate-x-1`
            }`}
          >
            <span className={`px-2 py-0.5 rounded-lg text-[9px] font-['Silkscreen'] font-bold flex-shrink-0 mt-0.5 ${
              selectedChoice === i ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}>
              {c.badge}
            </span>
            <span className="font-['Fredoka'] text-xs sm:text-sm font-semibold text-[#3b1d32]">
              {c.text}
            </span>
          </button>
        ))}
      </div>

      {/* Dynamic Animated Reaction */}
      <AnimatePresence>
        {selectedChoice !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 pt-4 border-t-2 border-pink-200 space-y-3"
          >
            {/* Split Screen reaction preview */}
            <div className="grid grid-cols-2 gap-2 bg-pink-50/70 p-3 rounded-2xl border border-pink-200">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-14 overflow-hidden mb-1">
                  <BoySprite size="sm" emotion="laugh" />
                </div>
                <p className="font-['Fredoka'] text-[11px] text-[#3b1d32] italic">
                  "{reactionText}"
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-14 overflow-hidden mb-1">
                  <GirlSprite size="sm" emotion="laugh" />
                </div>
                <p className="font-['Fredoka'] text-[11px] text-pink-700 font-medium italic">
                  "{girlReaction}"
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <PixelButton
                variant="pink"
                size="md"
                icon={<Heart className="w-4 h-4 fill-white" />}
                onClick={onComplete}
              >
                Claim Connection & Continue ♡
              </PixelButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
