import React, { useState } from 'react';
import { Heart, Sparkles, Cookie, RotateCcw } from 'lucide-react';
import { PinkieSprite } from '../characters/PinkieSprite';
import { LunaSprite } from '../characters/LunaSprite';
import { soundManager } from '../audio/SoundManager';
import {
  type UserProgress,
  addPinkieAffection,
} from '../../data/progressConfig';

interface PinkiePlaygroundProps {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
  effectiveIsNight?: boolean;
}

export const PinkiePlayground: React.FC<PinkiePlaygroundProps> = ({
  progress,
  onUpdateProgress,
}) => {
  const [ballState, setBallState] = useState<'idle' | 'thrown' | 'fetching' | 'returned'>('idle');
  const [ballPos, setBallPos] = useState<{ x: number; y: number }>({ x: 50, y: 70 });
  const [pinkiePos, setPinkiePos] = useState<{ x: number; y: number }>({ x: 20, y: 65 });
  const [pinkieStatusText, setPinkieStatusText] = useState<string>(
    'Pinkie is ready to play fetch! Tap anywhere to throw the ball! 🎾'
  );
  const [treatHearts, setTreatHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const affectionScore = progress.pinkieAffection || 0;
  const affectionLevel =
    affectionScore >= 15
      ? 'Pinkie’s Eternal Bestie ♡'
      : affectionScore >= 8
      ? 'Ultimate Cuddle Partner 🐾'
      : affectionScore >= 3
      ? 'Playful Puppy Pal ✨'
      : 'New Best Friend 🐶';

  // Throw ball handler
  const handleGroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ballState === 'thrown' || ballState === 'fetching') return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickXPercent = Math.max(10, Math.min(90, ((e.clientX - rect.left) / rect.width) * 100));
    const clickYPercent = Math.max(30, Math.min(85, ((e.clientY - rect.top) / rect.height) * 100));

    soundManager.playPop();
    setBallState('thrown');
    setBallPos({ x: clickXPercent, y: clickYPercent });
    setPinkieStatusText('Pinkie spotted the ball! "ARF ARF!" 🐾');

    // Pinkie starts running to ball
    setTimeout(() => {
      soundManager.playBark();
      setBallState('fetching');
      setPinkiePos({ x: clickXPercent - 4, y: clickYPercent - 4 });
      setPinkieStatusText('Pinkie retrieved the ball! Returning it to you... 🎾');

      // Pinkie returns ball
      setTimeout(() => {
        soundManager.playHeart();
        setPinkiePos({ x: 25, y: 65 });
        setBallPos({ x: 28, y: 72 });
        setBallState('returned');
        setPinkieStatusText('Good girl Pinkie! Dropped the ball at your feet! 💖');

        // Increase affection
        const updated = addPinkieAffection(1);
        onUpdateProgress(updated);

        setTimeout(() => {
          setBallState('idle');
          setBallPos({ x: 30, y: 72 });
        }, 1200);
      }, 1400);
    }, 600);
  };

  // Give treat handler
  const handleGiveTreat = () => {
    soundManager.playBark();
    soundManager.playHeart();
    setPinkieStatusText('Nom nom nom! Pinkie loves puppy biscuits! 🦴✨');

    const newH = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i,
      x: 20 + Math.random() * 20,
      y: 50 + Math.random() * 20,
    }));
    setTreatHearts((prev) => [...prev, ...newH]);

    const updated = addPinkieAffection(1);
    onUpdateProgress(updated);

    setTimeout(() => {
      setTreatHearts((prev) => prev.filter((h) => !newH.some((nh) => nh.id === h.id)));
    }, 1500);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border-4 border-pink-300 dark:border-purple-600 shadow-2xl bg-gradient-to-b from-sky-100 via-pink-50 to-emerald-100 dark:from-slate-950 dark:via-purple-950/80 dark:to-emerald-950/70 p-4 sm:p-6 select-none transition-colors duration-700">
      {/* Top Header & Affection Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b-2 border-pink-200 dark:border-purple-800">
        <div>
          <h2 className="font-['Silkscreen'] text-base sm:text-lg text-pink-700 dark:text-pink-300 font-bold flex items-center gap-2">
            🐾 Pinkie's Sunny Meadow
          </h2>
          <p className="text-xs text-stone-600 dark:text-purple-300">
            Play fetch, feed treats, and shower Pinkie with unconditional puppy love!
          </p>
        </div>

        {/* Affection Status Card */}
        <div className="flex items-center gap-3 bg-white/80 dark:bg-purple-900/60 backdrop-blur-md px-3.5 py-2 rounded-2xl border-2 border-pink-200 dark:border-purple-700 shadow-sm">
          <div className="flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500 animate-pulse" />
            <div className="text-left">
              <div className="text-[10px] font-['Silkscreen'] text-stone-500 dark:text-purple-300">
                Affection Level
              </div>
              <div className="text-xs font-['Silkscreen'] text-pink-600 dark:text-pink-300 font-bold">
                {affectionLevel} ({affectionScore} pts)
              </div>
            </div>
          </div>
          <button
            onClick={handleGiveTreat}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-pink-400 hover:from-amber-500 hover:to-pink-500 text-stone-900 font-['Silkscreen'] text-[10px] font-bold shadow-sm active:scale-95 transition-all"
            title="Give Pinkie a yummy bone treat"
          >
            <Cookie className="w-3.5 h-3.5" />
            Give Treat 🦴
          </button>
        </div>
      </div>

      {/* Floating Treat Hearts */}
      {treatHearts.map((h) => (
        <span
          key={h.id}
          style={{ left: `${h.x}%`, top: `${h.y}%` }}
          className="absolute z-30 text-lg pointer-events-none animate-bounce"
        >
          💖
        </span>
      ))}

      {/* Interactive Meadow Playfield */}
      <div
        onClick={handleGroundClick}
        className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden cursor-crosshair border-3 border-emerald-400/60 dark:border-emerald-800 shadow-inner bg-gradient-to-b from-sky-200/50 via-emerald-100 to-emerald-200/90 dark:from-slate-900 dark:via-purple-950 dark:to-emerald-950"
      >
        {/* Soft Background Hills & Clouds */}
        <div className="absolute top-4 left-8 text-2xl opacity-60 animate-pulse select-none">
          ☁️
        </div>
        <div className="absolute top-8 right-16 text-xl opacity-60 animate-pulse select-none">
          ☁️
        </div>
        <div className="absolute bottom-20 left-4 text-xl opacity-70">🌸</div>
        <div className="absolute bottom-16 right-8 text-xl opacity-70">🌼</div>
        <div className="absolute bottom-28 left-1/3 text-lg opacity-70">🌷</div>
        <div className="absolute bottom-10 right-1/3 text-xl opacity-70">🌻</div>

        {/* Luna watching on the fence */}
        <div className="absolute top-6 right-6 p-2 rounded-xl bg-white/70 dark:bg-purple-900/60 border border-purple-200 dark:border-purple-700 shadow-sm flex items-center gap-2">
          <LunaSprite size="sm" showSpeechBubble={false} />
          <div className="text-[9px] font-['Silkscreen'] text-purple-700 dark:text-purple-300">
            Luna: "Look at that zoomie puppy..." 😼
          </div>
        </div>

        {/* Pinkie Dog Sprite */}
        <div
          style={{
            left: `${pinkiePos.x}%`,
            top: `${pinkiePos.y}%`,
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
        >
          <PinkieSprite size="md" showSpeechBubble={false} />
        </div>

        {/* Fetch Ball */}
        <div
          style={{
            left: `${ballPos.x}%`,
            top: `${ballPos.y}%`,
            transition:
              ballState === 'thrown'
                ? 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
                : 'all 0.4s ease-out',
          }}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-10 transition-transform ${
            ballState === 'thrown' ? 'animate-spin' : ''
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-pink-500 via-rose-400 to-amber-300 shadow-md border-2 border-white flex items-center justify-center text-xs">
            🎾
          </div>
        </div>

        {/* Tap Ground Hint overlay */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-stone-900/70 text-white font-['Silkscreen'] text-[10px] tracking-wide backdrop-blur-xs border border-white/20 shadow-md flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-pink-300 animate-spin" />
          Tap anywhere in the grass to throw the ball for Pinkie!
        </div>
      </div>

      {/* Bottom Live Commentary */}
      <div className="mt-3 flex items-center justify-between gap-2 p-3 bg-white/80 dark:bg-purple-900/50 rounded-2xl border border-pink-200 dark:border-purple-700">
        <div className="flex items-center gap-2">
          <span className="text-xl">🐶</span>
          <p className="font-['Silkscreen'] text-xs text-stone-700 dark:text-purple-200">
            {pinkieStatusText}
          </p>
        </div>
        <button
          onClick={() => {
            soundManager.playClick();
            setBallPos({ x: 30, y: 72 });
            setPinkiePos({ x: 20, y: 65 });
            setBallState('idle');
            setPinkieStatusText('Ball reset! Ready for another round! ♡');
          }}
          className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-white"
          title="Reset ball position"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
