import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, Mail } from 'lucide-react';
import { BoySprite } from '../characters/BoySprite';
import { GirlSprite } from '../characters/GirlSprite';
import { PinkieSprite } from '../characters/PinkieSprite';
import { LunaSprite } from '../characters/LunaSprite';
import { soundManager } from '../audio/SoundManager';
import { unlockHeartId } from '../../data/progressConfig';

interface HeartGardenSceneProps {
  collectedHearts: number[];
  onFlowerTapped: (flowerId: number) => void;
  onOpenSecretLetter: () => void;
  hasDiscoveredLetter: boolean;
  className?: string;
}

export const HeartGardenScene: React.FC<HeartGardenSceneProps> = ({
  collectedHearts,
  onFlowerTapped,
  onOpenSecretLetter,
  hasDiscoveredLetter,
  className = ''
}) => {
  const [activeFlowerId, setActiveFlowerId] = useState<number | null>(null);

  const flowers = [
    {
      id: 1,
      title: "1. HER EYES",
      icon: "✨",
      text: "“Your eyes... I swear they have their own little universe. And somehow, I get lost in it every time.”",
      girlEmotion: 'laugh' as const,
      color: "bg-purple-100 text-purple-800 border-purple-400"
    },
    {
      id: 2,
      title: "2. HER SMILE",
      icon: "☀️",
      text: "“Your smile. The kind that makes an ordinary day feel a little less ordinary. And yes, I'm probably smiling like an idiot right now.”",
      girlEmotion: 'happy' as const,
      color: "bg-amber-100 text-amber-800 border-amber-400"
    },
    {
      id: 3,
      title: "3. HER CHEEKS",
      icon: "🌸",
      text: "“Your cute cheeks. I genuinely don't think you understand how adorable you are. Respectfully, it's unfair.”",
      girlEmotion: 'shy' as const,
      color: "bg-pink-100 text-pink-800 border-pink-400"
    },
    {
      id: 4,
      title: "4. HER CONFIDENCE",
      icon: "👑",
      text: "“The way you carry yourself. Your confidence. How you keep being yourself without needing anyone's permission. I admire that more than you know.”",
      girlEmotion: 'laugh' as const,
      color: "bg-indigo-100 text-indigo-800 border-indigo-400"
    },
    {
      id: 5,
      title: "5. HER KINDNESS",
      icon: "💖",
      text: "“Your kindness. The way you listen. The way you make people feel heard. And how you made me feel safe enough to be myself.”",
      girlEmotion: 'love' as const,
      color: "bg-rose-100 text-rose-800 border-rose-400"
    },
    {
      id: 6,
      title: "6. HOW SHE MAKES HIM FEEL",
      icon: "🌟",
      text: "“There are so many beautiful things about you. But my favorite might be how I feel when I'm with you. Seen. Heard. Understood. Like I've found somewhere I belong.”",
      girlEmotion: 'love' as const,
      color: "bg-gradient-to-r from-pink-200 to-rose-200 text-rose-900 border-pink-500 font-bold"
    }
  ];

  const areFirstFiveCollected = [1, 2, 3, 4, 5].every(id => collectedHearts.includes(id));

  const handleSelect = (id: number) => {
    if (id === 6 && !areFirstFiveCollected) {
      soundManager.playClick();
      return;
    }
    soundManager.playHeart();
    unlockHeartId(id);
    onFlowerTapped(id);
    setActiveFlowerId(id);
  };

  const activeFlower = flowers.find(f => f.id === activeFlowerId);

  return (
    <div className={`relative w-full max-w-2xl mx-auto rounded-3xl border-4 border-[#3b1d32] shadow-[8px_8px_0px_#3b1d32] overflow-hidden select-none bg-gradient-to-b from-[#fed7aa] via-[#fbcfe8] to-[#f472b6]/40 p-4 sm:p-6 ${className}`}>
      {/* Sunset Pixel Clouds & Floating Heart Lanterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft sunset glow */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-amber-200/40 to-transparent" />

        {/* Heart shaped lanterns hanging */}
        {[
          { x: '18%', y: '12%' },
          { x: '42%', y: '8%' },
          { x: '70%', y: '14%' },
          { x: '88%', y: '10%' }
        ].map((pos, idx) => (
          <div
            key={idx}
            style={{ left: pos.x, top: pos.y }}
            className="absolute p-1 bg-amber-100/90 rounded-full border border-amber-300 shadow-[0_0_10px_#fde047] animate-pulse"
          >
            <Heart className="w-3.5 h-3.5 fill-amber-300 text-amber-500" />
          </div>
        ))}

        {/* Tiny Fireflies */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            style={{
              left: `${(i * 14 + 10) % 90}%`,
              top: `${(i * 20 + 30) % 70}%`,
              animationDelay: `${i * 0.5}s`
            }}
            className="absolute w-1.5 h-1.5 bg-yellow-200 rounded-full shadow-[0_0_8px_#fef08a] animate-ping"
          />
        ))}
      </div>

      {/* Header Info */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b-2 border-[#3b1d32]/20 mb-3">
        <div>
          <span className="font-['Silkscreen'] text-[10px] text-pink-700 font-bold block">
            SCENE 4.1: THE HEART GARDEN
          </span>
          <h3 className="font-['Fredoka'] text-sm sm:text-base font-bold text-[#3b1d32]">
            Discover the 6 heart flowers
          </h3>
        </div>

        {/* Collectible Secret Letter Trigger nestled in top right */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 6 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenSecretLetter}
          className={`px-3 py-1.5 rounded-2xl border-2 border-[#3b1d32] shadow-[2px_2px_0px_#3b1d32] font-['Silkscreen'] text-[10px] flex items-center gap-1.5 cursor-pointer ${
            hasDiscoveredLetter ? 'bg-amber-100 text-amber-900 border-amber-400' : 'bg-white text-rose-600 animate-bounce'
          }`}
        >
          <Mail className="w-3.5 h-3.5 fill-pink-400" />
          <span>{hasDiscoveredLetter ? 'READ LETTER' : 'SECRET ENVELOPE!'}</span>
        </motion.button>
      </div>

      {/* Meadow Characters & Garden Scenery */}
      <div className="relative z-10 h-44 sm:h-48 rounded-2xl border-2 border-[#3b1d32] bg-gradient-to-b from-[#fdf2f8]/60 to-[#a3e635]/40 overflow-hidden flex items-end justify-between px-6 sm:px-10 pb-3">
        {/* Heart shaped pond in center */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-14 bg-sky-200/80 rounded-full border border-sky-400 flex items-center justify-center opacity-70">
          <span className="text-[10px] text-sky-600 font-['Silkscreen']">♡ pond</span>
        </div>

        {/* Left Side: Boy & Luna */}
        <div className="flex items-end gap-2 z-10">
          <BoySprite size="md" emotion={activeFlower ? 'love' : 'neutral'} />
          <div className="pb-1">
            <LunaSprite size="sm" showSpeechBubble={false} />
          </div>
        </div>

        {/* Right Side: Girl & Pinkie */}
        <div className="flex items-end gap-2 z-10">
          <div className="pb-1">
            <PinkieSprite size="sm" showSpeechBubble={false} />
          </div>
          <GirlSprite size="md" emotion={activeFlower ? activeFlower.girlEmotion : 'happy'} />
        </div>
      </div>

      {/* The 6 Interactive Glowing Heart Flowers */}
      <div className="relative z-10 mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
        {flowers.map(f => {
          const isCollected = collectedHearts.includes(f.id);
          const isLocked = f.id === 6 && !areFirstFiveCollected;

          return (
            <motion.button
              key={f.id}
              whileHover={!isLocked ? { scale: 1.03, y: -2 } : {}}
              whileTap={!isLocked ? { scale: 0.96 } : {}}
              onClick={() => handleSelect(f.id)}
              className={`p-2.5 rounded-2xl border-2 text-left font-['Fredoka'] text-xs transition-all cursor-pointer shadow-sm relative overflow-hidden ${
                isLocked
                  ? 'bg-gray-100/80 border-gray-300 text-gray-400 cursor-not-allowed'
                  : activeFlowerId === f.id
                  ? 'bg-white border-[#3b1d32] shadow-[3px_3px_0px_#3b1d32] scale-[1.02]'
                  : `${f.color} border-[#3b1d32]/30 hover:border-[#3b1d32]`
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-['Silkscreen'] text-[9px] font-bold">
                  {f.title}
                </span>
                {isLocked ? (
                  <Lock className="w-3.5 h-3.5 text-gray-400" />
                ) : (
                  <span>{f.icon}</span>
                )}
              </div>

              <div className="text-[10px] text-gray-600 line-clamp-1">
                {isLocked ? "Unlock flowers 1-5 first" : isCollected ? "Collected ♡ (Replay)" : "Tap to reveal"}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Active Romantic Card Display */}
      <AnimatePresence mode="wait">
        {activeFlower && (
          <motion.div
            key={activeFlower.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="relative z-10 mt-3 p-4 bg-white/95 rounded-2xl border-2 border-pink-400 shadow-md text-center"
          >
            <div className="flex items-center justify-center gap-1.5 text-pink-600 font-['Silkscreen'] text-xs font-bold mb-1">
              <Heart className="w-4 h-4 fill-pink-500" />
              <span>{activeFlower.title}</span>
            </div>
            <p className="font-['Fredoka'] text-sm sm:text-base text-[#3b1d32] font-semibold leading-relaxed">
              {activeFlower.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
