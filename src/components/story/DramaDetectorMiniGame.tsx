import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tv, Sparkles, Check, FastForward } from 'lucide-react';
import { soundManager } from '../audio/SoundManager';
import { PixelButton } from '../ui/PixelButton';

interface DramaBubble {
  id: number;
  label: string;
  reaction: string;
  color: string;
  bgBadge: string;
  popped: boolean;
}

interface DramaDetectorMiniGameProps {
  onComplete: () => void;
}

export const DramaDetectorMiniGame: React.FC<DramaDetectorMiniGameProps> = ({ onComplete }) => {
  const [bubbles, setBubbles] = useState<DramaBubble[]>([
    {
      id: 1,
      label: "Plot twist! 😱",
      reaction: "“Wait, did she really just fake that phone call in front of the whole family?!”",
      color: "border-pink-400 text-pink-700 bg-pink-50",
      bgBadge: "bg-pink-200",
      popped: false
    },
    {
      id: 2,
      label: "Suspicious behavior! 👀",
      reaction: "“She is definitely hiding fake marriage documents behind the kitchen pantry!”",
      color: "border-purple-400 text-purple-700 bg-purple-50",
      bgBadge: "bg-purple-200",
      popped: false
    },
    {
      id: 3,
      label: "Another misunderstanding! 🤦‍♂️",
      reaction: "“Cue the 5-minute dramatic slow-motion gasp and lightning sound effect!”",
      color: "border-indigo-400 text-indigo-700 bg-indigo-50",
      bgBadge: "bg-indigo-200",
      popped: false
    },
    {
      id: 4,
      label: "Rohini again?! 😤",
      reaction: "“Unhinged villainy at its finest. How does she sleep at night?!”",
      color: "border-rose-400 text-rose-700 bg-rose-50",
      bgBadge: "bg-rose-200",
      popped: false
    }
  ]);

  const [activeReaction, setActiveReaction] = useState<string | null>(null);

  const poppedCount = bubbles.filter(b => b.popped).length;
  const isFinished = poppedCount === bubbles.length;

  const handlePop = (id: number) => {
    soundManager.playPop();
    soundManager.playHeart();
    setBubbles(prev =>
      prev.map(b => (b.id === id ? { ...b, popped: true } : b))
    );
    const target = bubbles.find(b => b.id === id);
    if (target) {
      setActiveReaction(target.reaction);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-[#fffdf7] rounded-3xl border-4 border-[#3b1d32] shadow-[6px_6px_0px_#3b1d32] p-5 sm:p-6 select-none my-3">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-pink-200">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-100 rounded-xl border border-[#3b1d32] text-purple-700">
            <Tv className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="font-['Silkscreen'] text-[10px] text-purple-700 font-bold">
              MINI-GAME: DRAMA DETECTOR
            </span>
            <h3 className="font-['Fredoka'] text-sm sm:text-base font-bold text-[#3b1d32]">
              Tap all soap-opera drama bubbles!
            </h3>
          </div>
        </div>

        {/* Progress pill */}
        <span className="px-2.5 py-1 bg-pink-100 rounded-full font-['Silkscreen'] text-xs text-pink-700 font-bold border border-pink-300">
          {poppedCount}/{bubbles.length}
        </span>
      </div>

      <p className="font-['Fredoka'] text-xs text-gray-600 my-3 text-center">
        Tap the floating drama tropes below to expose Rohini's unbelievable serial chaos:
      </p>

      {/* Floating Drama Bubbles */}
      <div className="grid grid-cols-2 gap-3 my-2">
        {bubbles.map(b => (
          <motion.button
            key={b.id}
            whileHover={!b.popped ? { scale: 1.04, y: -2 } : {}}
            whileTap={!b.popped ? { scale: 0.95 } : {}}
            onClick={() => !b.popped && handlePop(b.id)}
            disabled={b.popped}
            className={`p-3.5 rounded-2xl border-2 font-['Fredoka'] font-bold text-xs sm:text-sm text-center transition-all cursor-pointer shadow-sm relative overflow-hidden ${
              b.popped
                ? 'bg-gray-100/80 border-gray-300 text-gray-400 opacity-60'
                : `${b.color} border-[#3b1d32] shadow-[3px_3px_0px_#3b1d32] hover:shadow-[4px_4px_0px_#3b1d32]`
            }`}
          >
            {b.popped ? (
              <span className="flex items-center justify-center gap-1.5 text-green-600 font-['Silkscreen'] text-[10px]">
                <Check className="w-3.5 h-3.5" /> EXPOSED!
              </span>
            ) : (
              <span>{b.label}</span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Active Reaction Box */}
      <AnimatePresence mode="wait">
        {activeReaction && (
          <motion.div
            key={activeReaction}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-3 bg-purple-50 rounded-2xl border-2 border-purple-300 text-center my-3 text-xs sm:text-sm font-['Fredoka'] text-purple-900 font-medium italic shadow-inner"
          >
            {activeReaction}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-3 border-t-2 border-pink-200 mt-2">
        <button
          onClick={onComplete}
          className="flex items-center gap-1 text-[11px] font-['Fredoka'] text-gray-500 hover:text-pink-600 cursor-pointer"
        >
          <FastForward className="w-3.5 h-3.5" />
          <span>Skip mini-game</span>
        </button>

        {isFinished ? (
          <PixelButton
            variant="pink"
            size="sm"
            icon={<Sparkles className="w-4 h-4 fill-white" />}
            onClick={onComplete}
          >
            All Drama Exposed! Continue ➔
          </PixelButton>
        ) : (
          <span className="text-[10px] font-['Silkscreen'] text-gray-400">
            {bubbles.length - poppedCount} BUBBLES LEFT
          </span>
        )}
      </div>
    </div>
  );
};
