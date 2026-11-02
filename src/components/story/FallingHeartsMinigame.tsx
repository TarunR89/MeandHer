import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FastForward, ArrowLeft, ArrowRight as ArrowRightIcon } from 'lucide-react';
import { BoySprite } from '../characters/BoySprite';
import { soundManager } from '../audio/SoundManager';

interface FallingHeartsMinigameProps {
  onComplete: () => void;
}

interface FallingHeartItem {
  id: number;
  label: string;
  icon: string;
  x: number; // percentage 10% to 90%
  y: number; // percentage 0% to 100%
  speed: number;
  color: string;
}

export const FallingHeartsMinigame: React.FC<FallingHeartsMinigameProps> = ({ onComplete }) => {
  const [boyPosition, setBoyPosition] = useState(50); // percentage across screen
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25);
  const [activeComment, setActiveComment] = useState<{ speaker: 'luna' | 'pinkie'; text: string } | null>(null);

  const [items, setItems] = useState<FallingHeartItem[]>([
    { id: 1, label: "Her smile", icon: "😊", x: 25, y: 10, speed: 2.2, color: "bg-pink-100 text-pink-700 border-pink-300" },
    { id: 2, label: "Her eyes", icon: "✨", x: 60, y: 30, speed: 1.8, color: "bg-purple-100 text-purple-700 border-purple-300" },
    { id: 3, label: "Her kindness", icon: "💖", x: 40, y: 5, speed: 2.5, color: "bg-rose-100 text-rose-700 border-rose-300" },
    { id: 4, label: "Her confidence", icon: "🌟", x: 75, y: 15, speed: 2.0, color: "bg-amber-100 text-amber-700 border-amber-300" },
    { id: 5, label: "Her silly jokes", icon: "🤣", x: 85, y: 40, speed: 2.4, color: "bg-indigo-100 text-indigo-700 border-indigo-300" }
  ]);

  // Key controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        setBoyPosition(prev => Math.max(12, prev - 9));
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setBoyPosition(prev => Math.min(88, prev + 9));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Timer & Luna commentary intervals
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Luna/Pinkie jokes at specific times
    const commentTimer1 = setTimeout(() => {
      soundManager.playMeow();
      setActiveComment({ speaker: 'luna', text: "Luna: “You're literally collecting feelings now.” 🐾" });
    }, 4000);

    const commentTimer2 = setTimeout(() => {
      soundManager.playBark();
      setActiveComment({ speaker: 'pinkie', text: "Pinkie: “HE'S IN LOVEEE! 🐾💖”" });
    }, 11000);

    const commentTimer3 = setTimeout(() => {
      soundManager.playMeow();
      setActiveComment({ speaker: 'luna', text: "Luna: “Unfortunately, this diagnosis seems accurate.” 🌙" });
    }, 18000);

    return () => {
      clearInterval(timer);
      clearTimeout(commentTimer1);
      clearTimeout(commentTimer2);
      clearTimeout(commentTimer3);
    };
  }, [onComplete]);

  // Game physics loop for falling hearts & collision
  useEffect(() => {
    const loop = setInterval(() => {
      setItems(prevItems => {
        return prevItems.map(item => {
          let newY = item.y + item.speed;

          // Check collision with boy (around y >= 75% and x proximity within 14%)
          if (newY >= 72 && newY <= 85 && Math.abs(item.x - boyPosition) < 14) {
            soundManager.playCatchHeart();
            setScore(s => s + 1);
            // Reset to top
            return {
              ...item,
              y: -5,
              x: 15 + Math.random() * 70
            };
          }

          // If fell past ground, reset to top
          if (newY > 95) {
            return {
              ...item,
              y: -5,
              x: 15 + Math.random() * 70
            };
          }

          return { ...item, y: newY };
        });
      });
    }, 50);

    return () => clearInterval(loop);
  }, [boyPosition]);

  return (
    <div className="w-full max-w-lg mx-auto bg-[#fffdf7] rounded-3xl border-4 border-[#3b1d32] shadow-[6px_6px_0px_#3b1d32] p-4 sm:p-5 select-none my-3">
      {/* Game Header */}
      <div className="flex items-center justify-between pb-2 border-b-2 border-pink-200">
        <div>
          <span className="font-['Silkscreen'] text-[9px] text-pink-600 font-bold block">
            WARNING: FALLING IN LOVE ♡
          </span>
          <h3 className="font-['Fredoka'] text-sm sm:text-base font-bold text-[#3b1d32]">
            Move to catch all her little details!
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-pink-100 text-pink-700 rounded-full font-['Silkscreen'] text-xs font-bold border border-pink-300">
            FEELINGS: {score}
          </span>
          <span className="px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full font-['Silkscreen'] text-xs font-bold border border-purple-300">
            {timeLeft}s
          </span>
        </div>
      </div>

      {/* Main Game Stage Area */}
      <div className="relative w-full h-72 sm:h-80 bg-gradient-to-b from-[#fdf2f8] via-[#fff1f2] to-[#fed7aa]/30 rounded-2xl border-2 border-[#3b1d32] overflow-hidden my-3">
        {/* Soft floating background clouds */}
        <div className="absolute top-2 inset-x-0 flex justify-between px-6 opacity-30 text-xs">
          <span>☁️</span>
          <span>☁️</span>
          <span>☁️</span>
        </div>

        {/* Falling Heart Elements */}
        {items.map(item => (
          <div
            key={item.id}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            className={`absolute px-2.5 py-1 rounded-full border shadow-sm font-['Fredoka'] font-bold text-[10px] sm:text-xs flex items-center gap-1 transition-transform pointer-events-none ${item.color}`}
          >
            <span>{item.icon}</span>
            <span className="whitespace-nowrap">{item.label}</span>
          </div>
        ))}

        {/* Luna & Pinkie Commentary Banner floating on top */}
        <AnimatePresence>
          {activeComment && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 max-w-[90%] px-3 py-1 bg-white/95 text-[#3b1d32] font-['Fredoka'] text-xs rounded-full border-2 border-pink-400 shadow-md text-center z-30"
            >
              {activeComment.text}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ground */}
        <div className="absolute bottom-0 inset-x-0 h-8 bg-[#84cc16] border-t-2 border-[#3b1d32] flex items-center justify-around text-[10px]">
          <span>🌸</span>
          <span>🌼</span>
          <span>🌸</span>
          <span>🌼</span>
        </div>

        {/* Player: Boy Sprite moving horizontally */}
        <div
          style={{
            left: `${boyPosition}%`,
            transform: 'translateX(-50%)'
          }}
          className="absolute bottom-4 flex flex-col items-center transition-all duration-75 z-20"
        >
          {/* Catcher Basket / Heart Aura */}
          <div className="w-12 h-2 bg-pink-400 rounded-full border border-[#3b1d32] -mb-1 animate-pulse" />
          <BoySprite size="sm" emotion="love" />
        </div>
      </div>

      {/* Mobile Touch Control Buttons */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          onClick={() => setBoyPosition(p => Math.max(12, p - 14))}
          aria-label="Move left"
          className="flex-1 py-2 bg-pink-100 hover:bg-pink-200 active:bg-pink-300 rounded-xl border-2 border-[#3b1d32] shadow-[2px_2px_0px_#3b1d32] font-['Silkscreen'] text-xs font-bold text-[#3b1d32] flex items-center justify-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> LEFT
        </button>

        <button
          onClick={onComplete}
          className="px-3 py-2 text-xs font-['Fredoka'] text-gray-500 hover:text-pink-600 flex items-center gap-1 cursor-pointer"
        >
          <FastForward className="w-3.5 h-3.5" /> Skip
        </button>

        <button
          onClick={() => setBoyPosition(p => Math.min(88, p + 14))}
          aria-label="Move right"
          className="flex-1 py-2 bg-pink-100 hover:bg-pink-200 active:bg-pink-300 rounded-xl border-2 border-[#3b1d32] shadow-[2px_2px_0px_#3b1d32] font-['Silkscreen'] text-xs font-bold text-[#3b1d32] flex items-center justify-center gap-1 cursor-pointer"
        >
          RIGHT <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>

      <p className="text-[10px] font-['Fredoka'] text-gray-500 text-center mt-2">
        Desktop: Use <strong>Left/Right Arrows</strong> or <strong>A/D</strong> keys • Mobile: Tap buttons
      </p>
    </div>
  );
};
