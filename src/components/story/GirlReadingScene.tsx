import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import { GirlSprite } from '../characters/GirlSprite';
import { PinkieSprite } from '../characters/PinkieSprite';
import { LunaSprite } from '../characters/LunaSprite';
import { PixelButton } from '../ui/PixelButton';
import { soundManager } from '../audio/SoundManager';
import type { CharacterSettings } from '../../data/characterConfig';

interface GirlReadingSceneProps {
  settings: CharacterSettings;
  onProceedToChapter6: () => void;
  className?: string;
}

export const GirlReadingScene: React.FC<GirlReadingSceneProps> = ({
  settings,
  onProceedToChapter6,
  className = ''
}) => {
  const [step, setStep] = useState(0);

  const girlName = settings.girlName || "Her";
  const boyName = settings.boyName || "Him";

  const dialogSteps = [
    {
      speaker: "system",
      name: "PHONE NOTIFICATION",
      text: "⚡ 11:00 PM: 1 New Message from " + boyName + " ♡",
      girlEmotion: "neutral" as const,
      pinkieState: "waking",
      showLuna: false,
      roomGlow: "subtle"
    },
    {
      speaker: "pinkie",
      name: "PINKIE",
      text: "OOOH, A MESSAGE! 🐶",
      girlEmotion: "neutral" as const,
      pinkieState: "excited",
      showLuna: false,
      roomGlow: "subtle"
    },
    {
      speaker: "girl",
      name: girlName.toUpperCase(),
      text: "Pinkie, it's literally 11 PM. Who messages at this hour?",
      girlEmotion: "shy" as const,
      pinkieState: "curious",
      showLuna: false,
      roomGlow: "subtle"
    },
    {
      speaker: "pinkie",
      name: "PINKIE",
      text: "WAIT... THAT'S A WHOLE ESSAY! 😱🎀",
      girlEmotion: "shocked" as const,
      pinkieState: "excited",
      showLuna: true,
      roomGlow: "warm"
    },
    {
      speaker: "luna",
      name: "LUNA (SPLIT-SCREEN COMMENTARY)",
      text: "He has been preparing for this like an exam. 🐾",
      girlEmotion: "laugh" as const,
      pinkieState: "happy",
      showLuna: true,
      roomGlow: "warm"
    },
    {
      speaker: "narrator",
      name: "QUIET WARMTH",
      text: "As she reads through the heartfelt words, her surprise softens into a gentle, touched smile. The room fills with a soft rosy glow.",
      girlEmotion: "love" as const,
      pinkieState: "happy",
      showLuna: false,
      roomGlow: "rosy"
    }
  ];

  const current = dialogSteps[step];

  const handleNext = () => {
    soundManager.playClick();
    if (step < dialogSteps.length - 1) {
      setStep(prev => prev + 1);
    } else {
      onProceedToChapter6();
    }
  };

  return (
    <div className={`relative w-full max-w-xl mx-auto flex flex-col items-center select-none ${className}`}>
      {/* Girl's Cozy Bedroom at Night Scene */}
      <div className={`relative w-full h-72 sm:h-80 rounded-3xl border-4 border-[#3b1d32] shadow-[8px_8px_0px_#3b1d32] overflow-hidden transition-all duration-700 ${
        current.roomGlow === 'rosy'
          ? 'bg-gradient-to-b from-[#3a1d37] via-[#52254b] to-[#6d3062]'
          : 'bg-gradient-to-b from-[#24152e] via-[#351e40] to-[#211129]'
      }`}>
        {/* Rosy Glow Aura in room */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
            current.roomGlow === 'rosy' ? 'opacity-70' : 'opacity-20'
          }`}
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(244, 114, 182, 0.4) 0%, transparent 70%)'
          }}
        />

        {/* Bedroom Window on Left */}
        <div className="absolute top-4 left-6 w-32 sm:w-40 h-36 rounded-2xl border-3 border-[#563668] bg-[#160c22] overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-b from-[#2f1b40] to-[#5a2e70] opacity-80" />
          {/* Peach fairy lights along curtain */}
          <div className="absolute top-1 inset-x-0 flex justify-around">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-pink-200 shadow-[0_0_6px_#fbcfe8] animate-pulse" />
            ))}
          </div>
          {/* Drifting petals outside */}
          <div className="absolute top-4 right-4 text-[9px] animate-[petalFall_6s_linear_infinite]">🌸</div>
        </div>

        {/* Glowing Smartphone in Girl's Hands */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
          <motion.div
            animate={current.girlEmotion === 'shocked' ? { scale: [1, 1.1, 1], y: [-2, 0] } : {}}
            className="relative"
          >
            <GirlSprite size="md" emotion={current.girlEmotion} />

            {/* Glowing phone screen held up */}
            <div className="absolute bottom-4 right-2 w-6 h-9 bg-white rounded border border-[#3b1d32] shadow-[0_0_15px_#f472b6] flex flex-col items-center p-0.5 animate-pulse">
              <div className="w-full h-1 bg-pink-400 rounded-full" />
              <div className="w-full flex-1 flex flex-col gap-0.5 justify-center py-0.5">
                <div className="w-3 h-0.5 bg-pink-300" />
                <div className="w-4 h-0.5 bg-pink-300" />
                <div className="w-3.5 h-0.5 bg-pink-300" />
              </div>
            </div>

            {/* Heart particles if reading */}
            {current.roomGlow === 'rosy' && (
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 1, 0], y: -20 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -top-4 right-0"
              >
                <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Pinkie Dog on Soft Rug to the Right */}
        <div className="absolute bottom-3 right-6 sm:right-10 z-20 flex flex-col items-center">
          <PinkieSprite size="md" />
          <div className="w-16 h-2 bg-pink-300/30 rounded-full -mt-1" />
        </div>

        {/* Split-screen Luna Cat Commentary Popup */}
        <AnimatePresence>
          {current.showLuna && (
            <motion.div
              initial={{ opacity: 0, x: -40, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40 }}
              className="absolute top-4 right-4 z-30 p-2.5 bg-[#1f102a]/95 rounded-2xl border-2 border-purple-400 shadow-[0_0_12px_rgba(192,132,252,0.4)] flex items-center gap-2 max-w-[200px]"
            >
              <LunaSprite size="sm" />
              <div>
                <span className="font-['Silkscreen'] text-[8px] text-purple-300 font-bold block">
                  LUNA (HIS CAT):
                </span>
                <p className="font-['Fredoka'] text-[11px] text-purple-100 italic">
                  “He drafted that like a master thesis.” 🐾
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floor mat */}
        <div className="absolute bottom-0 inset-x-0 h-4 bg-[#2b172e] border-t-2 border-[#452349]" />
      </div>

      {/* Narrative Dialogue Box */}
      <div className="w-full mt-3 bg-[#fffbf2] rounded-3xl p-5 border-4 border-[#3b1d32] shadow-[6px_6px_0px_#3b1d32]">
        <div className="flex items-center justify-between mb-2">
          <span className="font-['Silkscreen'] text-[10px] text-pink-600 font-bold tracking-wide flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5" />
            {current.name}
          </span>
          <span className="text-[10px] font-['Silkscreen'] text-gray-400">
            {step + 1} / {dialogSteps.length}
          </span>
        </div>

        <p className="font-['Fredoka'] text-sm sm:text-base text-[#3b1d32] font-semibold leading-relaxed min-h-[50px]">
          “{current.text}”
        </p>

        <div className="mt-4 pt-3 border-t-2 border-pink-100 flex items-center justify-between">
          <span className="text-[10px] font-['Fredoka'] text-gray-400 italic">
            {step === dialogSteps.length - 1
              ? "Her reply changed everything."
              : "Tap continue to advance story"}
          </span>

          <PixelButton
            variant="pink"
            size="sm"
            icon={step === dialogSteps.length - 1 ? <Sparkles className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            onClick={handleNext}
          >
            {step === dialogSteps.length - 1 ? "Chapter 6: Her Answer ➔" : "Next ➔"}
          </PixelButton>
        </div>
      </div>
    </div>
  );
};
