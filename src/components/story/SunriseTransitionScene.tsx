import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Home, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CherryBlossomTree } from '../scenery/CherryBlossomTree';
import { FloatingPetals } from '../scenery/FloatingPetals';
import { MeadowGround } from '../scenery/MeadowGround';
import { BoySprite } from '../characters/BoySprite';
import { GirlSprite } from '../characters/GirlSprite';
import { PinkieSprite } from '../characters/PinkieSprite';
import { LunaSprite } from '../characters/LunaSprite';
import { PixelButton } from '../ui/PixelButton';
import { soundManager } from '../audio/SoundManager';
import type { CharacterSettings } from '../../data/characterConfig';

interface SunriseTransitionSceneProps {
  settings: CharacterSettings;
  onFinishChapter: () => void;
  onBackToLanding: () => void;
}

export const SunriseTransitionScene: React.FC<SunriseTransitionSceneProps> = ({
  settings,
  onFinishChapter,
  onBackToLanding
}) => {
  const [step, setStep] = useState(0);

  const narrationLines = [
    "At first, it was just another conversation...",
    "One message became another.",
    "One silly joke became a hundred more.",
    "And somewhere between the laughter...",
    "I started looking forward to hearing from you."
  ];

  useEffect(() => {
    // Start gentle music if sound enabled
    soundManager.startBgm();

    const interval = setInterval(() => {
      setStep(prev => {
        if (prev < narrationLines.length + 2) {
          soundManager.playBlip();
          return prev + 1;
        }
        return prev;
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [narrationLines.length]);

  const isFinalStep = step >= narrationLines.length;

  useEffect(() => {
    if (isFinalStep) {
      soundManager.playHeart();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#f472b6', '#fed7aa', '#fbcfe8', '#fef08a']
      });
    }
  }, [isFinalStep]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between select-none bg-gradient-to-b from-[#fed7aa] via-[#fbcfe8] to-[#fce7f3] transition-colors duration-1000">
      {/* Warm Pastel Sunrise Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#ffedd5] via-[#fde047]/20 to-[#fbcfe8] opacity-80 pointer-events-none" />

      {/* Gentle Floating Sakura Petals */}
      <FloatingPetals count={24} />

      {/* Cherry Blossom Tree in background */}
      <div className="absolute -bottom-6 right-0 sm:right-10 md:right-24 w-72 sm:w-96 md:w-[480px] z-10 pointer-events-none opacity-95">
        <CherryBlossomTree />
      </div>

      <MeadowGround />

      {/* Top Bar */}
      <header className="relative z-30 p-4 sm:p-6 flex items-center justify-between">
        <button
          onClick={onBackToLanding}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 rounded-2xl border-2 border-[#3b1d32] shadow-[2px_2px_0px_#3b1d32] font-['Silkscreen'] text-xs text-[#3b1d32] hover:bg-pink-50 active:translate-y-0.5 cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>HOME</span>
        </button>

        <span className="font-['Silkscreen'] text-xs text-rose-700 bg-rose-100 px-3 py-1 rounded-full border border-rose-300 font-bold">
          SOMETHING BEGAN CHANGING ♡
        </span>
      </header>

      {/* Center Narration / Dialogue Panel */}
      <main className="relative z-30 max-w-xl mx-auto px-4 w-full flex flex-col items-center text-center">
        <div className="p-6 bg-white/90 backdrop-blur-md rounded-3xl border-4 border-[#3b1d32] shadow-[6px_6px_0px_#3b1d32] w-full">
          {/* Subtle Heart icon */}
          <div className="mb-3">
            <Heart className="w-8 h-8 mx-auto text-pink-500 fill-pink-300 animate-pulse" />
          </div>

          {/* Stepped Typewriter Narration */}
          <div className="min-h-[90px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {step < narrationLines.length ? (
                <motion.p
                  key={step}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="font-['Fredoka'] text-base sm:text-lg text-[#3b1d32] font-semibold leading-relaxed"
                >
                  "{narrationLines[step]}"
                </motion.p>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-2"
                >
                  <p className="font-['Fredoka'] text-sm sm:text-base text-gray-600 italic">
                    “I didn't know it then...”
                  </p>
                  <p className="font-['Fredoka'] text-base sm:text-lg text-[#be185d] font-bold">
                    “But you were slowly becoming my favorite notification.”
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Final Milestone Completion Block */}
          {isFinalStep && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 pt-4 border-t-2 border-pink-200 space-y-3"
            >
              <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-full font-['Silkscreen'] text-xs font-bold shadow">
                CHAPTER COMPLETE ♡
              </div>

              <p className="font-['Silkscreen'] text-xs text-purple-800 font-bold">
                NEXT CHAPTER: YOU FELT LIKE HOME
              </p>

              <div className="flex justify-center gap-3 pt-2">
                <PixelButton
                  variant="cream"
                  size="sm"
                  onClick={onBackToLanding}
                >
                  Return to Meadow
                </PixelButton>

                <PixelButton
                  variant="pink"
                  size="sm"
                  icon={<ArrowRight className="w-4 h-4" />}
                  onClick={onFinishChapter}
                >
                  Preview Next Chapter
                </PixelButton>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Characters Standing Together Under Tree with Floating Heart */}
      <footer className="relative z-20 pb-6 flex flex-col items-center">
        <div className="relative flex items-end justify-center gap-6 sm:gap-10">
          {/* Luna */}
          <div className="pb-1">
            <LunaSprite size="md" />
          </div>

          {/* Boy */}
          <div className="relative">
            <BoySprite size="lg" emotion="love" />
          </div>

          {/* Tiny glowing heart between them */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.25, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="pb-20 text-rose-500 filter drop-shadow-[0_0_8px_#f43f5e]"
          >
            <Heart className="w-8 h-8 fill-rose-500 stroke-white" />
          </motion.div>

          {/* Girl */}
          <div className="relative">
            <GirlSprite size="lg" emotion="love" />
          </div>

          {/* Pinkie */}
          <div className="pb-1">
            <PinkieSprite size="md" />
          </div>
        </div>

        {/* Pet Dialogue Banner */}
        <div className="mt-3 px-4 py-1.5 bg-white/85 backdrop-blur-sm rounded-full border border-pink-300 text-xs font-['Fredoka'] text-[#3b1d32] shadow-sm max-w-md text-center">
          🐾 <strong>Pinkie:</strong> "Look at {settings.girlName || 'mom'}'s smile!" • 🌙 <strong>Luna:</strong> "Told you. {settings.boyName || 'He'} is totally smitten."
        </div>

      </footer>
    </div>
  );
};
