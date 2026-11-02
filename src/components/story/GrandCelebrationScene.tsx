import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BoySprite } from '../characters/BoySprite';
import { GirlSprite } from '../characters/GirlSprite';
import { PinkieSprite } from '../characters/PinkieSprite';
import { LunaSprite } from '../characters/LunaSprite';
import { PixelButton } from '../ui/PixelButton';
import { soundManager } from '../audio/SoundManager';
import type { CharacterSettings } from '../../data/characterConfig';

interface GrandCelebrationSceneProps {
  settings: CharacterSettings;
  onProceedToFinalScene: () => void;
  className?: string;
}

export const GrandCelebrationScene: React.FC<GrandCelebrationSceneProps> = ({
  settings,
  onProceedToFinalScene,
  className = ''
}) => {
  const [petStep, setPetStep] = useState(0);

  const boyName = settings.boyName || "Him";
  const girlName = settings.girlName || "Her";

  const petExchanges = [
    {
      pinkie: "SHE SAID YESSSSS! 🐶🎉",
      luna: "Finally. 🐾",
      pinkieActive: true
    },
    {
      pinkie: "WE'RE A FAMILY NOW! 🎀",
      luna: "Please don't make this weird. 😼",
      pinkieActive: true
    },
    {
      pinkie: "YOU LITERALLY SAID HE'D GET BLOCKED!",
      luna: "Allegedly. For the record, I knew all along. 🌙",
      pinkieActive: false
    }
  ];

  useEffect(() => {
    soundManager.playFanfare();

    // Trigger romantic confetti bursts
    const end = Date.now() + 2500;
    const colors = ['#f472b6', '#fbcfe8', '#f43f5e', '#fed7aa', '#e9d5ff'];

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const currentExchange = petExchanges[petStep];

  const handleNextPetStep = () => {
    soundManager.playHeart();
    if (petStep < petExchanges.length - 1) {
      setPetStep(prev => prev + 1);
    } else {
      onProceedToFinalScene();
    }
  };

  return (
    <div className={`relative w-full max-w-xl mx-auto flex flex-col items-center select-none ${className}`}>
      {/* Visual Sunrise Stage */}
      <div className="relative w-full h-80 sm:h-92 rounded-3xl border-4 border-[#3b1d32] shadow-[8px_8px_0px_#3b1d32] overflow-hidden bg-gradient-to-b from-[#fbcfe8] via-[#fed7aa] to-[#f472b6]/40 p-4 flex flex-col justify-between">
        {/* Sky Layers: Golden Pink Sunrise & Pixel Clouds */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Radiant Sun Glow */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-b from-amber-200/60 to-transparent rounded-full blur-2xl" />

          {/* Pixel Rainbow Arch */}
          <div className="absolute top-4 inset-x-8 h-24 border-t-8 border-pink-400/50 rounded-t-full shadow-[0_-4px_0_#fed7aa,0_-8px_0_#e9d5ff] pointer-events-none opacity-80" />

          {/* Drifting Clouds */}
          <motion.div
            animate={{ x: [-80, 400] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="absolute top-8 left-0 opacity-40 text-xl"
          >
            ☁️
          </motion.div>
          <motion.div
            animate={{ x: [-120, 380] }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear', delay: 3 }}
            className="absolute top-16 left-0 opacity-30 text-2xl"
          >
            ☁️
          </motion.div>

          {/* Drifting Hearts & Petals (Bounded Particle System) */}
          {[
            { x: '12%', y: '30%', delay: '0s' },
            { x: '28%', y: '20%', delay: '1.2s' },
            { x: '45%', y: '40%', delay: '0.6s' },
            { x: '68%', y: '15%', delay: '1.8s' },
            { x: '82%', y: '35%', delay: '0.4s' }
          ].map((pos, idx) => (
            <motion.div
              key={idx}
              style={{ left: pos.x, top: pos.y }}
              animate={{ y: [-15, 15, -15], scale: [1, 1.2, 1] }}
              transition={{ duration: 3, delay: parseFloat(pos.delay), repeat: Infinity }}
              className="absolute text-pink-500/70 text-sm pointer-events-none"
            >
              ♡
            </motion.div>
          ))}
        </div>

        {/* Milestone Badge at Top */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full border-2 border-pink-400 shadow-[2px_2px_0px_#f472b6]">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-bounce" />
            <span className="font-['Silkscreen'] text-xs text-[#be185d] font-bold">
              SHE SAID OF COURSE ❤️
            </span>
          </div>

          <span className="font-['Silkscreen'] text-[10px] text-pink-800 bg-white/80 px-2.5 py-1 rounded-full border border-pink-300">
            SCENE 6.3 • CELEBRATION
          </span>
        </div>

        {/* Center: Boy and Girl Running & Hugging with Blushing Cheeks! */}
        <div className="relative z-20 flex items-end justify-center gap-2 sm:gap-4 my-auto">
          {/* Boy Sprite */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="flex flex-col items-center"
          >
            <div className="relative">
              <BoySprite size="md" emotion="love" />
              {/* Blushing heart cheeks */}
              <div className="absolute top-4 -right-1 text-pink-500 text-xs">♡</div>
            </div>
            <span className="font-['Silkscreen'] text-[9px] text-[#3b1d32] font-bold mt-1">
              {boyName.toUpperCase()}
            </span>
          </motion.div>

          {/* Central Hugging Heart Glow */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="p-2 bg-white/90 rounded-full border-2 border-pink-400 shadow-[0_0_20px_#f472b6] mb-4"
          >
            <Heart className="w-7 h-7 fill-pink-500 text-pink-500" />
          </motion.div>

          {/* Girl Sprite */}
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="flex flex-col items-center"
          >
            <div className="relative">
              <GirlSprite size="md" emotion="love" />
              {/* Blushing heart cheeks */}
              <div className="absolute top-4 -left-1 text-pink-500 text-xs">♡</div>
            </div>
            <span className="font-['Silkscreen'] text-[9px] text-[#3b1d32] font-bold mt-1">
              {girlName.toUpperCase()}
            </span>
          </motion.div>
        </div>

        {/* Bottom Row: Pinkie and Luna cuddle beside the couple */}
        <div className="relative z-20 flex items-end justify-between px-4 pb-1">
          <div className="flex flex-col items-center">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            >
              <PinkieSprite size="md" />
            </motion.div>
            <span className="font-['Silkscreen'] text-[8px] text-pink-700 font-bold">
              PINKIE 🐶
            </span>
          </div>

          <div className="flex flex-col items-center">
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 1.4 }}
            >
              <LunaSprite size="md" />
            </motion.div>
            <span className="font-['Silkscreen'] text-[8px] text-purple-700 font-bold">
              LUNA 🐾
            </span>
          </div>
        </div>

        {/* Meadow Ground */}
        <div className="absolute bottom-0 inset-x-0 h-4 bg-[#84cc16] border-t-2 border-[#3b1d32]" />
      </div>

      {/* Pet Dialogue & Celebration Card */}
      <div className="w-full mt-3 bg-[#fffbf2] rounded-3xl p-5 border-4 border-[#3b1d32] shadow-[6px_6px_0px_#3b1d32] text-[#3b1d32]">
        <div className="flex items-center justify-between mb-3 border-b-2 border-pink-100 pb-2">
          <span className="font-['Silkscreen'] text-[10px] text-pink-600 font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            PET CELEBRATION CHAT
          </span>
          <span className="text-[10px] font-['Silkscreen'] text-gray-400">
            {petStep + 1} / {petExchanges.length}
          </span>
        </div>

        <div className="space-y-2.5 min-h-[70px]">
          <div className="flex items-start gap-2.5">
            <span className="px-2 py-0.5 bg-pink-100 text-pink-800 rounded-md font-['Silkscreen'] text-[9px] font-bold flex-shrink-0">
              PINKIE:
            </span>
            <p className="font-['Fredoka'] text-sm sm:text-base font-bold text-pink-700">
              “{currentExchange.pinkie}”
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded-md font-['Silkscreen'] text-[9px] font-bold flex-shrink-0">
              LUNA:
            </span>
            <p className="font-['Fredoka'] text-sm sm:text-base font-semibold text-purple-900 italic">
              “{currentExchange.luna}”
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t-2 border-pink-100 flex items-center justify-between">
          <span className="text-[10px] font-['Fredoka'] text-gray-400 italic">
            {petStep < petExchanges.length - 1 ? "Two families become one ♡" : "And so, our universe began..."}
          </span>

          <PixelButton
            variant="pink"
            size="sm"
            icon={<ArrowRight className="w-4 h-4" />}
            onClick={handleNextPetStep}
          >
            {petStep < petExchanges.length - 1 ? "Next Banter ➔" : "Final Scene ➔"}
          </PixelButton>
        </div>
      </div>
    </div>
  );
};
