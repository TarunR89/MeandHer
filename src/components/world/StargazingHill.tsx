import React, { useState } from 'react';
import { Sparkles, Star, Heart, Send } from 'lucide-react';
import { BoySprite } from '../characters/BoySprite';
import { GirlSprite } from '../characters/GirlSprite';
import { PinkieSprite } from '../characters/PinkieSprite';
import { LunaSprite } from '../characters/LunaSprite';
import { soundManager } from '../audio/SoundManager';
import { STARGAZING_WISH_LINES } from '../../data/storyData';
import type { CharacterSettings } from '../../data/characterConfig';

interface StargazingHillProps {
  settings: CharacterSettings;
  effectiveIsNight?: boolean;
}

export const StargazingHill: React.FC<StargazingHillProps> = ({
  settings,
}) => {
  const [wishHistory, setWishHistory] = useState<string[]>([
    STARGAZING_WISH_LINES[0],
  ]);
  const [customWishInput, setCustomWishInput] = useState('');
  const [isShootingStarActive, setIsShootingStarActive] = useState(false);
  const [starCoordinates, setStarCoordinates] = useState({ x: 20, y: 15 });

  const currentWish = wishHistory[wishHistory.length - 1];

  const handleMakeWish = () => {
    soundManager.playShootingStar();
    setIsShootingStarActive(true);
    setStarCoordinates({
      x: 10 + Math.random() * 30,
      y: 10 + Math.random() * 20,
    });

    const nextWish =
      STARGAZING_WISH_LINES[Math.floor(Math.random() * STARGAZING_WISH_LINES.length)];
    setWishHistory((prev) => [...prev, nextWish]);

    setTimeout(() => {
      setIsShootingStarActive(false);
    }, 1500);
  };

  const handleSendCustomWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customWishInput.trim()) return;

    soundManager.playShootingStar();
    soundManager.playHeart();
    setIsShootingStarActive(true);

    const formattedWish = `"${customWishInput.trim()}" — A wish whispered by ${settings.girlName} & ${settings.boyName} into the eternal stars ♡`;
    setWishHistory((prev) => [...prev, formattedWish]);
    setCustomWishInput('');

    setTimeout(() => {
      setIsShootingStarActive(false);
    }, 1500);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border-4 border-indigo-400 dark:border-purple-600 shadow-2xl bg-gradient-to-b from-indigo-950 via-slate-900 to-purple-950 text-white p-4 sm:p-8 select-none transition-colors duration-700">
      {/* Dynamic Starfield Background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            style={{
              top: `${(i * 17) % 75}%`,
              left: `${(i * 23) % 96}%`,
              animationDelay: `${(i % 5) * 0.4}s`,
            }}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70 animate-ping"
          />
        ))}

        {/* Constellation lines */}
        <div className="absolute top-12 left-1/4 opacity-40 font-mono text-[9px] text-pink-300">
          ✦ ——— ✦ ——— ✦ (Sirius & Home)
        </div>
        <div className="absolute top-20 right-1/4 opacity-40 font-mono text-[9px] text-purple-300">
          ✦ ——— ✦ (The "Of Course" Star)
        </div>
      </div>

      {/* Shooting Star Animation */}
      {isShootingStarActive && (
        <div
          style={{ top: `${starCoordinates.y}%`, left: `${starCoordinates.x}%` }}
          className="absolute z-30 pointer-events-none animate-[ping_1.5s_ease-out_forwards]"
        >
          <div className="flex items-center">
            <span className="text-2xl filter drop-shadow-[0_0_12px_#fde047]">⭐</span>
            <div className="w-48 h-0.5 bg-gradient-to-r from-amber-200 via-pink-400 to-transparent -rotate-12 blur-[1px]" />
          </div>
        </div>
      )}

      {/* Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-indigo-800">
        <div>
          <h2 className="font-['Silkscreen'] text-base sm:text-lg text-pink-300 font-bold flex items-center gap-2">
            ⭐ The Stargazing Hilltop
          </h2>
          <p className="text-xs text-purple-200">
            Sitting quietly beside you under billions of stars
          </p>
        </div>

        <button
          onClick={handleMakeWish}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 font-['Silkscreen'] text-xs font-bold text-white shadow-lg active:scale-95 transition-all animate-pulse"
        >
          <Sparkles className="w-4 h-4 text-amber-200 animate-spin" />
          MAKE A WISH ♡
        </button>
      </div>

      {/* Current Wish Banner */}
      <div className="relative z-10 mb-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-purple-400/40 text-center shadow-lg">
        <div className="text-[10px] font-['Silkscreen'] text-amber-300 uppercase tracking-widest font-bold mb-1 flex items-center justify-center gap-1.5">
          <Star className="w-3.5 h-3.5 fill-amber-300" />
          Wish on a Falling Star
          <Star className="w-3.5 h-3.5 fill-amber-300" />
        </div>
        <p className="font-['Silkscreen'] text-xs sm:text-sm text-pink-100 leading-relaxed max-w-xl mx-auto">
          {currentWish}
        </p>
      </div>

      {/* Hill Scene with Characters and Sleeping Pets */}
      <div className="relative z-10 mt-8 pt-8 pb-4 flex flex-col items-center">
        {/* Soft Hill Grassy Mound SVG */}
        <div className="relative w-full max-w-lg p-6 rounded-t-[100px] bg-gradient-to-b from-indigo-900/90 to-purple-950/90 border-t-4 border-indigo-400/60 shadow-2xl flex flex-col items-center">
          {/* Picnic Blanket */}
          <div className="p-4 rounded-3xl bg-pink-900/40 border-2 border-pink-400/40 flex items-center justify-center gap-6 shadow-inner">
            <div className="transform -rotate-6">
              <BoySprite emotion="love" size="md" />
            </div>

            <div className="flex flex-col items-center">
              <Heart className="w-5 h-5 text-pink-400 fill-pink-400 animate-bounce" />
              <span className="text-[8px] font-['Silkscreen'] text-pink-200 mt-1">
                Under the Stars
              </span>
            </div>

            <div className="transform rotate-6">
              <GirlSprite emotion="love" size="md" />
            </div>
          </div>

          {/* Sleeping Pets at their feet */}
          <div className="mt-4 flex items-center justify-center gap-8">
            <div className="text-center">
              <PinkieSprite size="sm" showSpeechBubble={false} />
              <div className="text-[8px] font-['Silkscreen'] text-pink-300 mt-1">
                Pinkie snoozing zZz 🐶
              </div>
            </div>
            <div className="text-center">
              <LunaSprite size="sm" showSpeechBubble={false} />
              <div className="text-[8px] font-['Silkscreen'] text-purple-300 mt-1">
                Luna dreaming zZz 🐱
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Whisper Custom Wish to the Sky */}
      <div className="relative z-10 mt-6 pt-4 border-t border-indigo-800/80">
        <form
          onSubmit={handleSendCustomWish}
          className="flex flex-col sm:flex-row items-center gap-2 max-w-lg mx-auto"
        >
          <input
            type="text"
            value={customWishInput}
            onChange={(e) => setCustomWishInput(e.target.value)}
            placeholder="Type your own wish into the night sky... ♡"
            className="flex-1 text-xs px-4 py-2.5 rounded-xl bg-purple-950/70 border border-purple-600 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 font-['Silkscreen'] text-xs font-bold shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            Send to Stars ⭐
          </button>
        </form>
      </div>
    </div>
  );
};
