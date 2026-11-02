import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, FastForward, Check } from 'lucide-react';
import { BoySprite } from '../characters/BoySprite';
import { LunaSprite } from '../characters/LunaSprite';
import { soundManager } from '../audio/SoundManager';

interface CourageMinigameProps {
  onComplete: () => void;
  className?: string;
}

interface CourageHeartItem {
  id: number;
  text: string;
  color: string;
  bgLight: string;
}

const COURAGE_HEARTS: CourageHeartItem[] = [
  {
    id: 1,
    text: "She makes me feel understood.",
    color: "from-pink-400 to-rose-400 border-rose-300 text-rose-950",
    bgLight: "rgba(254, 205, 211, 0.4)"
  },
  {
    id: 2,
    text: "Her smile makes my day.",
    color: "from-amber-300 to-pink-300 border-amber-300 text-amber-950",
    bgLight: "rgba(254, 240, 138, 0.4)"
  },
  {
    id: 3,
    text: "She feels like home.",
    color: "from-purple-300 to-pink-300 border-purple-300 text-purple-950",
    bgLight: "rgba(233, 213, 255, 0.4)"
  }
];

export const CourageMinigame: React.FC<CourageMinigameProps> = ({
  onComplete,
  className = ''
}) => {
  const [collectedIds, setCollectedIds] = useState<number[]>([]);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleCollect = useCallback((id: number) => {
    if (collectedIds.includes(id)) return;
    soundManager.playHeart();
    const next = [...collectedIds, id];
    setCollectedIds(next);

    if (next.length === COURAGE_HEARTS.length) {
      setTimeout(() => {
        soundManager.playFanfare();
        setIsUnlocked(true);
      }, 400);
    }
  }, [collectedIds]);

  // Keyboard accessibility: 1, 2, 3 keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '1') handleCollect(1);
      if (e.key === '2') handleCollect(2);
      if (e.key === '3') handleCollect(3);
      if (e.key === 'Enter' && isUnlocked) {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleCollect, isUnlocked, onComplete]);

  const illuminationLevel = collectedIds.length / COURAGE_HEARTS.length;

  return (
    <div className={`relative w-full max-w-xl mx-auto p-5 sm:p-6 bg-gradient-to-b from-[#2a1636] via-[#3a1d47] to-[#1e0e29] rounded-3xl border-4 border-[#3b1d32] shadow-[8px_8px_0px_#3b1d32] select-none text-white overflow-hidden ${className}`}>
      {/* Background glow that brightens as courage hearts are collected */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at 50% 60%, rgba(244, 114, 182, ${0.15 + illuminationLevel * 0.45}) 0%, transparent 70%)`
        }}
      />

      {/* Floating sparkles */}
      <div className="absolute top-3 right-6 pointer-events-none text-pink-300/40 text-xs animate-pulse">
        ✦ ✧ ✦
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-pink-400/20 pb-3 mb-4">
        <div>
          <span className="font-['Silkscreen'] text-[10px] text-pink-300 tracking-wider font-bold block">
            INTERACTIVE MOMENT
          </span>
          <h3 className="font-['Silkscreen'] text-sm sm:text-base text-pink-100 flex items-center gap-2">
            <Heart className="w-4 h-4 fill-pink-400 text-pink-400 animate-pulse" />
            HELP HIM FIND HIS COURAGE ♡
          </h3>
        </div>

        <button
          onClick={onComplete}
          className="text-xs font-['Fredoka'] text-gray-400 hover:text-pink-300 flex items-center gap-1 px-2.5 py-1 bg-white/10 hover:bg-white/15 rounded-xl border border-white/20 transition-all cursor-pointer"
        >
          <FastForward className="w-3.5 h-3.5" /> Skip
        </button>
      </div>

      <p className="relative z-10 font-['Fredoka'] text-xs sm:text-sm text-pink-200/90 mb-4 text-center">
        Tap each heartfelt truth to fill his room with light and give him the courage to hit send.
      </p>

      {/* 3 Floating Hearts Grid */}
      <div className="relative z-10 space-y-3 mb-5">
        {COURAGE_HEARTS.map((heart) => {
          const isCollected = collectedIds.includes(heart.id);
          return (
            <motion.div
              key={heart.id}
              whileHover={{ scale: isCollected ? 1 : 1.02 }}
              whileTap={{ scale: isCollected ? 1 : 0.98 }}
              onClick={() => handleCollect(heart.id)}
              className={`
                p-3.5 sm:p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 cursor-pointer
                ${isCollected
                  ? 'bg-white/15 border-pink-300/60 shadow-[0_0_15px_rgba(244,114,182,0.4)] opacity-95'
                  : 'bg-white/5 border-pink-400/30 hover:border-pink-300 hover:bg-white/10 shadow-[3px_3px_0px_rgba(0,0,0,0.3)] animate-pulse'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center font-['Silkscreen'] text-xs font-bold transition-all ${
                    isCollected
                      ? 'bg-pink-400 border-pink-200 text-white shadow-[0_0_10px_#f472b6]'
                      : 'bg-white/10 border-pink-400/50 text-pink-300'
                  }`}
                >
                  {isCollected ? <Check className="w-5 h-5" /> : heart.id}
                </div>

                <span className="font-['Fredoka'] text-sm sm:text-base font-semibold text-pink-50">
                  “{heart.text}”
                </span>
              </div>

              <motion.div
                animate={isCollected ? { rotate: [0, 15, -15, 0], scale: [1, 1.25, 1] } : {}}
                transition={{ duration: 0.6 }}
              >
                <Heart
                  className={`w-6 h-6 transition-colors ${
                    isCollected
                      ? 'fill-pink-400 text-pink-300 filter drop-shadow-[0_0_8px_#f472b6]'
                      : 'text-pink-400/40 hover:text-pink-400'
                  }`}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Characters on bottom row */}
      <div className="relative z-10 flex items-center justify-between pt-3 border-t border-pink-400/20">
        <div className="flex items-center gap-3">
          <BoySprite size="sm" emotion={isUnlocked ? "love" : "shy"} />
          <div>
            <span className="font-['Silkscreen'] text-[10px] text-pink-300 font-bold block">
              COURAGE METER
            </span>
            <div className="w-28 sm:w-36 h-2.5 bg-black/40 rounded-full border border-pink-300/40 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-pink-400 to-rose-400 shadow-[0_0_8px_#f472b6]"
                initial={{ width: 0 }}
                animate={{ width: `${(collectedIds.length / COURAGE_HEARTS.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <LunaSprite size="sm" />
          <div className="hidden sm:block text-right">
            <span className="font-['Silkscreen'] text-[9px] text-purple-300 font-bold block">
              LUNA
            </span>
            <span className="font-['Fredoka'] text-xs text-gray-300 italic">
              {isUnlocked ? "“Go tell her.”" : "“Don't back out now.”"}
            </span>
          </div>
        </div>
      </div>

      {/* COURAGE UNLOCKED BANNER */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 p-4 bg-gradient-to-r from-pink-500/90 to-rose-500/90 rounded-2xl border-2 border-pink-200 text-center shadow-[0_0_20px_rgba(244,114,182,0.6)]"
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-yellow-200 animate-spin" />
              <h4 className="font-['Silkscreen'] text-sm sm:text-base font-bold text-white tracking-wider">
                COURAGE UNLOCKED ♡
              </h4>
              <Sparkles className="w-4 h-4 text-yellow-200 animate-spin" />
            </div>

            <p className="font-['Fredoka'] text-xs sm:text-sm text-pink-100 italic mb-3">
              Luna: “Alright, Romeo. Go tell her.” 🐾
            </p>

            <button
              onClick={onComplete}
              className="px-5 py-2 bg-white text-[#3b1d32] font-['Silkscreen'] text-xs font-bold rounded-xl border-2 border-[#3b1d32] shadow-[3px_3px_0px_#3b1d32] hover:bg-pink-100 active:scale-95 transition-all cursor-pointer"
            >
              Compose The Message ➔
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
