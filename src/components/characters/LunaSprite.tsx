import React, { useState } from 'react';
import { soundManager } from '../audio/SoundManager';

interface LunaSpriteProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSpeechBubble?: boolean;
}

export const LunaSprite: React.FC<LunaSpriteProps> = ({
  className = '',
  size = 'md',
  showSpeechBubble = true
}) => {
  const [isSparkling, setIsSparkling] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);
  const [bubbleText, setBubbleText] = useState<string | null>(null);

  const sizeMap = {
    sm: 'w-12 h-14',
    md: 'w-16 h-18',
    lg: 'w-24 h-28'
  };

  const handleTap = () => {
    soundManager.playMeow();
    soundManager.playHeart();
    setIsSparkling(true);

    // Spawn starry sparkles
    const newSparkles = Array.from({ length: 4 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 44,
      y: -20 - Math.random() * 30
    }));
    setSparkles(prev => [...prev, ...newSparkles]);

    const quotes = [
      "Purrr~ Luna acknowledges your love! ✨",
      "Meow! 2 AM zoomies incoming! 🌙",
      "Luna gives this match 100/10 fishies! 🐟",
      "Tiny void kitten approves! 🐾"
    ];
    setBubbleText(quotes[Math.floor(Math.random() * quotes.length)]);

    setTimeout(() => {
      setIsSparkling(false);
    }, 1200);

    setTimeout(() => {
      setSparkles(prev => prev.filter(s => !newSparkles.some(ns => ns.id === s.id)));
    }, 1500);

    setTimeout(() => {
      setBubbleText(null);
    }, 2500);
  };

  return (
    <div
      onClick={handleTap}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleTap(); } }}
      aria-label="Luna the mischievous black kitten with a tiny moon collar. Click to interact!"
      className={`relative inline-block cursor-pointer select-none pixel-art group transition-transform active:scale-90 ${sizeMap[size]} ${className}`}
    >
      {/* Speech bubble */}
      {showSpeechBubble && bubbleText && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap z-30 px-3 py-1 bg-white/95 text-[#7c3aed] font-['Silkscreen'] text-[10px] rounded-full border-2 border-[#a78bfa] shadow-md animate-bounce">
          {bubbleText}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-b-2 border-r-2 border-[#a78bfa] rotate-45" />
        </div>
      )}

      {/* Floating starry sparkles */}
      {sparkles.map(s => (
        <span
          key={s.id}
          style={{
            transform: `translate(${s.x}px, ${s.y}px)`,
          }}
          className="absolute -top-2 left-1/2 text-sm pointer-events-none transition-all duration-1000 ease-out opacity-0 animate-[floatUp_1s_ease-out_forwards]"
        >
          ✨
        </span>
      ))}

      {/* Interactive hover hint */}
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-purple-100 text-[#6d28d9] text-[9px] font-['Silkscreen'] px-2 py-0.5 rounded-full border border-purple-300 shadow pointer-events-none whitespace-nowrap">
        Tap Luna! 🌙
      </div>

      <svg
        viewBox="0 0 36 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full filter drop-shadow-[0_2px_4px_rgba(76,29,149,0.25)] ${isSparkling ? 'scale-110' : ''}`}
        shapeRendering="crispEdges"
      >
        {/* Soft shadow */}
        <ellipse cx="18" cy="36" rx="12" ry="2" fill="#2e1065" fillOpacity="0.25" />

        {/* Tail - Playfully curled tail swishing */}
        <g className="animate-tail-wag">
          <rect x="28" y="24" width="3" height="4" fill="#2d2b38" />
          <rect x="30" y="20" width="3" height="6" fill="#2d2b38" />
          <rect x="31" y="16" width="3" height="5" fill="#2d2b38" />
          <rect x="29" y="14" width="3" height="3" fill="#ffffff" />
        </g>

        {/* Kitten Body */}
        <rect x="10" y="19" width="18" height="13" fill="#2d2b38" />
        <rect x="8" y="21" width="22" height="9" fill="#2d2b38" />
        {/* Sleek charcoal highlight */}
        <rect x="11" y="20" width="14" height="2" fill="#3f3d4e" />

        {/* Little White Paws */}
        <rect x="10" y="30" width="4" height="5" fill="#2d2b38" />
        <rect x="10" y="33.5" width="4" height="2" fill="#ffffff" />
        <rect x="16" y="30" width="4" height="5" fill="#2d2b38" />
        <rect x="16" y="33.5" width="4" height="2" fill="#ffffff" />
        <rect x="23" y="30" width="4" height="5" fill="#2d2b38" />
        <rect x="23" y="33.5" width="4" height="2" fill="#ffffff" />

        {/* Head */}
        <rect x="8" y="9" width="18" height="13" fill="#2d2b38" />
        <rect x="6" y="11" width="22" height="9" fill="#2d2b38" />

        {/* Pointy Cat Ears */}
        {/* Left Ear */}
        <rect x="7" y="5" width="4" height="5" fill="#2d2b38" />
        <rect x="8" y="3" width="2" height="3" fill="#2d2b38" />
        <rect x="8" y="6" width="2" height="3" fill="#f472b6" />
        {/* Right Ear */}
        <rect x="21" y="5" width="4" height="5" fill="#2d2b38" />
        <rect x="22" y="3" width="2" height="3" fill="#2d2b38" />
        <rect x="22" y="6" width="2" height="3" fill="#f472b6" />

        {/* Collar & Golden Crescent Moon Charm */}
        <rect x="11" y="21" width="13" height="2" fill="#7c3aed" />
        {/* Golden Moon Tag */}
        <g className="filter drop-shadow-[0_0_2px_#fbbf24]">
          <path d="M17.5 23 C17.5 23, 19.5 24, 19.5 26 C19.5 28, 17.5 29, 17.5 29 C19 28.5, 20.5 27.5, 20.5 26 C20.5 24.5, 19 23.5, 17.5 23 Z" fill="#f59e0b" />
          <circle cx="18" cy="26" r="1.5" fill="#fbbf24" />
        </g>

        {/* Mischievous Cat Eyes with Animated Blink */}
        {isSparkling ? (
          /* Starry blinking wink */
          <>
            <rect x="9" y="13" width="4" height="2" fill="#fbbf24" />
            <rect x="19" y="13" width="4" height="4" fill="#fbbf24" />
            <rect x="20.5" y="13" width="1.5" height="4" fill="#1e1b4b" />
            <rect x="19.5" y="13.5" width="1" height="1" fill="#ffffff" />
          </>
        ) : (
          <g className="animate-blink">
            {/* Left Eye - Vibrant Gold / Jade Cat Eye */}
            <rect x="9" y="13" width="4" height="4" fill="#fbbf24" />
            <rect x="10.5" y="13" width="1.5" height="4" fill="#1e1b4b" />
            <rect x="9.5" y="13.5" width="1" height="1.5" fill="#ffffff" />
            {/* Right Eye */}
            <rect x="19" y="13" width="4" height="4" fill="#fbbf24" />
            <rect x="20.5" y="13" width="1.5" height="4" fill="#1e1b4b" />
            <rect x="19.5" y="13.5" width="1" height="1.5" fill="#ffffff" />
          </g>
        )}

        {/* Tiny Pink Nose & Whisker Dots */}
        <rect x="15" y="16.5" width="2" height="1.5" fill="#f472b6" />
        {/* Whiskers */}
        <rect x="5" y="16" width="3" height="0.8" fill="#e5e7eb" fillOpacity="0.8" />
        <rect x="5" y="18" width="3" height="0.8" fill="#e5e7eb" fillOpacity="0.8" />
        <rect x="25" y="16" width="3" height="0.8" fill="#e5e7eb" fillOpacity="0.8" />
        <rect x="25" y="18" width="3" height="0.8" fill="#e5e7eb" fillOpacity="0.8" />

        {/* Subtle cute cat mouth */}
        <path d="M14.5 18.5 Q16 19.5 17.5 18.5" stroke="#4a2840" strokeWidth="0.8" fill="none" />
      </svg>
    </div>
  );
};
