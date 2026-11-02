import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, BookOpen, Home, ArrowRight } from 'lucide-react';
import { CherryBlossomTree } from '../scenery/CherryBlossomTree';
import { BoySprite } from '../characters/BoySprite';
import { GirlSprite } from '../characters/GirlSprite';
import { PinkieSprite } from '../characters/PinkieSprite';
import { LunaSprite } from '../characters/LunaSprite';
import { PixelButton } from '../ui/PixelButton';
import { soundManager } from '../audio/SoundManager';
import type { CharacterSettings } from '../../data/characterConfig';

interface FinalUniverseSceneProps {
  settings: CharacterSettings;
  onOpenMemoryBook: () => void;
  onOpenSecretPromise: () => void;
  onBackToLanding: () => void;
  onOpenWorld?: () => void;
  className?: string;
}

export const FinalUniverseScene: React.FC<FinalUniverseSceneProps> = ({
  settings,
  onOpenMemoryBook,
  onOpenSecretPromise,
  onBackToLanding,
  onOpenWorld,
  className = ''
}) => {
  const [scrollStep, setScrollStep] = useState(0);
  const [showGrandEnding, setShowGrandEnding] = useState(false);

  const boyName = settings.boyName || "Him";
  const girlName = settings.girlName || "Her";

  const storyScrollLines = [
    "It started with a message.",
    "Then a conversation.",
    "Then a thousand little reasons to smile.",
    "I found someone who made me feel heard.",
    "Someone who made me feel understood.",
    "Someone who somehow made the world feel a little more like home.",
    "And then...",
    "On a night I was almost too scared to tell you how I felt...",
    "You said of course."
  ];

  const handleNextStep = () => {
    soundManager.playClick();
    if (scrollStep < storyScrollLines.length - 1) {
      setScrollStep(prev => prev + 1);
    } else {
      soundManager.playConstellation();
      setShowGrandEnding(true);
    }
  };

  return (
    <div className={`relative w-full max-w-2xl mx-auto flex flex-col items-center select-none ${className}`}>
      {/* Lush Cherry Blossom Garden Scene at Warm Sunset */}
      <div className="relative w-full h-88 sm:h-96 rounded-3xl border-4 border-[#3b1d32] shadow-[8px_8px_0px_#3b1d32] overflow-hidden bg-gradient-to-b from-[#fbcfe8] via-[#fde047]/30 to-[#fed7aa] p-4 flex flex-col justify-between">
        {/* Soft Sunset Sky & Starry Constellation Glow */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Heart-Shaped Constellation above tree */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
            <svg width="120" height="70" viewBox="0 0 120 70" className="animate-pulse">
              <path
                d="M 60 60 L 25 25 A 15 15 0 0 1 55 15 L 60 20 L 65 15 A 15 15 0 0 1 95 25 Z"
                fill="none"
                stroke="rgba(244,114,182,0.8)"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <circle cx="60" cy="60" r="3" fill="#f43f5e" />
              <circle cx="25" cy="25" r="2.5" fill="#fde047" />
              <circle cx="40" cy="15" r="2" fill="#fff" />
              <circle cx="60" cy="20" r="2.5" fill="#f472b6" />
              <circle cx="80" cy="15" r="2" fill="#fff" />
              <circle cx="95" cy="25" r="2.5" fill="#fde047" />
            </svg>
            <span className="font-['Silkscreen'] text-[8px] text-pink-600 font-bold bg-white/70 px-2 py-0.5 rounded-full border border-pink-300">
              OUR CONSTELLATION ✦
            </span>
          </div>

          {/* Drifting sakura petals */}
          {[
            { x: '10%', y: '15%', delay: '0s' },
            { x: '30%', y: '35%', delay: '1.2s' },
            { x: '75%', y: '25%', delay: '0.6s' },
            { x: '90%', y: '40%', delay: '1.8s' }
          ].map((pos, idx) => (
            <div
              key={idx}
              style={{ left: pos.x, top: pos.y }}
              className="absolute text-pink-400 text-xs animate-[petalFall_6s_linear_infinite]"
            >
              🌸
            </div>
          ))}
        </div>

        {/* Massive Cherry Blossom Tree in Center Background */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-80 sm:w-96 z-10 pointer-events-none opacity-95">
          <CherryBlossomTree />
        </div>

        {/* SECRET CLICKABLE HEART BEHIND THE TREE */}
        <button
          onClick={() => {
            soundManager.playPaperRustle();
            onOpenSecretPromise();
          }}
          title="A secret promise is hidden here... ♡"
          aria-label="Secret Promise Letter"
          className="absolute top-28 sm:top-24 right-16 sm:right-24 z-30 p-2 bg-pink-400 hover:bg-pink-500 rounded-full border-2 border-white shadow-[0_0_15px_#f472b6] animate-bounce cursor-pointer group"
        >
          <Heart className="w-4 h-4 fill-white text-white group-hover:scale-125 transition-transform" />
          <span className="sr-only">Secret Promise</span>
        </button>

        {/* Top Header Milestone Badge */}
        <div className="relative z-20 flex items-center justify-between">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full border-2 border-pink-400 shadow-[2px_2px_0px_#f472b6]">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span className="font-['Silkscreen'] text-xs text-[#be185d] font-bold">
              OUR LITTLE UNIVERSE ♡
            </span>
          </div>

          <span className="text-[10px] font-['Silkscreen'] text-pink-700 bg-white/70 px-2 py-0.5 rounded-full border border-pink-300">
            FINAL CHAPTER
          </span>
        </div>

        {/* All 4 Characters Beneath the Cherry Blossom Tree */}
        <div className="relative z-20 flex items-end justify-center gap-4 sm:gap-6 mt-auto pb-2">
          {/* Boy and Luna on left */}
          <div className="flex items-end gap-1.5">
            <div className="flex flex-col items-center">
              <LunaSprite size="sm" />
              <span className="text-[8px] font-['Silkscreen'] text-purple-700 font-bold">LUNA</span>
            </div>
            <div className="flex flex-col items-center">
              <BoySprite size="md" emotion="love" />
              <span className="text-[9px] font-['Silkscreen'] text-[#3b1d32] font-bold">{boyName}</span>
            </div>
          </div>

          {/* Central Hugging Hearts */}
          <div className="p-1.5 bg-white/90 rounded-full border border-pink-400 shadow-[0_0_12px_#f472b6] mb-3 animate-pulse">
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
          </div>

          {/* Girl and Pinkie on right */}
          <div className="flex items-end gap-1.5">
            <div className="flex flex-col items-center">
              <GirlSprite size="md" emotion="love" />
              <span className="text-[9px] font-['Silkscreen'] text-[#3b1d32] font-bold">{girlName}</span>
            </div>
            <div className="flex flex-col items-center">
              <PinkieSprite size="sm" />
              <span className="text-[8px] font-['Silkscreen'] text-pink-700 font-bold">PINKIE</span>
            </div>
          </div>
        </div>

        {/* Meadow Ground */}
        <div className="absolute bottom-0 inset-x-0 h-4 bg-[#84cc16] border-t-2 border-[#3b1d32]" />
      </div>

      {/* Cinematic Narrative Box */}
      <div className="w-full mt-3 bg-[#fffbf2] rounded-3xl p-5 border-4 border-[#3b1d32] shadow-[6px_6px_0px_#3b1d32] text-[#3b1d32]">
        {!showGrandEnding ? (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-['Silkscreen'] text-[10px] text-pink-600 font-bold tracking-wide">
                NARRATION • THE JOURNEY
              </span>
              <span className="text-[10px] font-['Silkscreen'] text-gray-400">
                {scrollStep + 1} / {storyScrollLines.length}
              </span>
            </div>

            <p className="font-['Fredoka'] text-base sm:text-lg text-[#3b1d32] font-bold leading-relaxed min-h-[55px]">
              “{storyScrollLines[scrollStep]}”
            </p>

            <div className="mt-4 pt-3 border-t-2 border-pink-100 flex items-center justify-between">
              <span className="text-[10px] font-['Fredoka'] text-gray-400 italic">
                Tap continue to reflect
              </span>

              <PixelButton
                variant="pink"
                size="sm"
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={handleNextStep}
              >
                {scrollStep < storyScrollLines.length - 1 ? "Next ➔" : "The Beginning ♡"}
              </PixelButton>
            </div>
          </div>
        ) : (
          /* THE GRAND CLIMAX BANNER */
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-4"
            >
              <div className="inline-block px-4 py-1.5 bg-pink-100 rounded-full border-2 border-pink-300">
                <span className="font-['Silkscreen'] text-xs text-pink-700 font-bold">
                  AND JUST LIKE THAT...
                </span>
              </div>

              <h2 className="font-['Silkscreen'] text-xl sm:text-2xl font-black text-[#be185d] tracking-wider filter drop-shadow-sm">
                OUR LITTLE UNIVERSE BEGAN ♡
              </h2>

              <p className="font-['Fredoka'] text-sm text-[#4a2840]/90 max-w-lg mx-auto leading-relaxed">
                Thank you for being my safe space, my favorite laugh, and the sweetest part of every single day.
              </p>

              {/* Action Buttons: Our Forever World, Memory Book, Return Home */}
              <div className="pt-3 border-t-2 border-pink-100 flex flex-wrap items-center justify-center gap-3">
                {onOpenWorld && (
                  <PixelButton
                    variant="pink"
                    size="sm"
                    icon={<Sparkles className="w-4 h-4 text-amber-200" />}
                    onClick={onOpenWorld}
                    className="shadow-[0_4px_0px_#9d174d] animate-pulse"
                  >
                    Enter Our Forever World ♡
                  </PixelButton>
                )}

                <PixelButton
                  variant="purple"
                  size="sm"
                  icon={<BookOpen className="w-4 h-4" />}
                  onClick={onOpenMemoryBook}
                >
                  Open Memory Book 📖
                </PixelButton>

                <PixelButton
                  variant="cream"
                  size="sm"
                  icon={<Home className="w-4 h-4 text-[#3b1d32]" />}
                  onClick={onBackToLanding}
                >
                  Return Home
                </PixelButton>
              </div>

              <p className="text-[11px] font-['Fredoka'] text-pink-600/90 italic pt-1">
                Psst... Tap the glowing pink heart hidden in the tree for a secret letter! 💌
              </p>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
