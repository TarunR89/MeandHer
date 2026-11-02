import React, { useState } from 'react';
import { soundManager } from '../audio/SoundManager';

interface PinkieSpriteProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSpeechBubble?: boolean;
}

export const PinkieSprite: React.FC<PinkieSpriteProps> = ({
  className = '',
  size = 'md',
  showSpeechBubble = true
}) => {
  const [isExcited, setIsExcited] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [bubbleText, setBubbleText] = useState<string | null>(null);

  const sizeMap = {
    sm: 'w-12 h-14',
    md: 'w-16 h-18',
    lg: 'w-24 h-28'
  };

  const handleTap = () => {
    soundManager.playBark();
    soundManager.playHeart();
    setIsExcited(true);

    // Spawn floating heart particles
    const newHearts = Array.from({ length: 4 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 40,
      y: -20 - Math.random() * 30
    }));
    setHearts(prev => [...prev, ...newHearts]);

    const quotes = [
      "Arf! Pinkie loves belly rubs! 💖",
      "Tail wag level: 1000%! 🐾",
      "Pink bow on fleek! ✨",
      "Puppy hugs for mom & dad! ♡"
    ];
    setBubbleText(quotes[Math.floor(Math.random() * quotes.length)]);

    setTimeout(() => {
      setIsExcited(false);
    }, 1200);

    setTimeout(() => {
      setHearts(prev => prev.filter(h => !newHearts.some(nh => nh.id === h.id)));
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
      aria-label="Pinkie the fluffy puppy wearing a pink bow. Click to interact!"
      className={`relative inline-block cursor-pointer select-none pixel-art group transition-transform active:scale-90 ${sizeMap[size]} ${className}`}
    >
      {/* Speech bubble */}
      {showSpeechBubble && bubbleText && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap z-30 px-3 py-1 bg-white/95 text-[#ec4899] font-['Silkscreen'] text-[10px] rounded-full border-2 border-[#f472b6] shadow-md animate-bounce">
          {bubbleText}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-b-2 border-r-2 border-[#f472b6] rotate-45" />
        </div>
      )}

      {/* Floating love particles */}
      {hearts.map(h => (
        <span
          key={h.id}
          style={{
            transform: `translate(${h.x}px, ${h.y}px)`,
          }}
          className="absolute -top-2 left-1/2 text-sm pointer-events-none transition-all duration-1000 ease-out opacity-0 animate-[floatUp_1s_ease-out_forwards]"
        >
          💖
        </span>
      ))}

      {/* Interactive hover hint pill */}
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-pink-100 text-[#be185d] text-[9px] font-['Silkscreen'] px-2 py-0.5 rounded-full border border-pink-300 shadow pointer-events-none whitespace-nowrap">
        Tap Pinkie! 🐾
      </div>

      <svg
        viewBox="0 0 36 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full filter drop-shadow-[0_2px_4px_rgba(244,114,182,0.3)] ${isExcited ? 'scale-110' : ''}`}
        shapeRendering="crispEdges"
      >
        {/* Soft shadow */}
        <ellipse cx="18" cy="36" rx="12" ry="2" fill="#be185d" fillOpacity="0.2" />

        {/* Tail - Wags extra fast when excited */}
        <g className={isExcited ? 'animate-[tailWagFast_0.25s_infinite]' : 'animate-tail-wag'}>
          <rect x="29" y="22" width="4" height="4" fill="#fffaf5" />
          <rect x="31" y="19" width="3" height="4" fill="#fffaf5" />
          <rect x="32" y="16" width="3" height="4" fill="#fffaf5" />
        </g>

        {/* Fluffy body */}
        <rect x="10" y="18" width="18" height="14" fill="#fffaf5" />
        <rect x="8" y="20" width="22" height="10" fill="#fffaf5" />
        <rect x="9" y="19" width="20" height="12" fill="#fffaf5" />
        {/* Underbelly soft shading */}
        <rect x="11" y="28" width="16" height="3" fill="#f7ede2" />

        {/* Paws */}
        <rect x="10" y="30" width="4" height="6" fill="#fffaf5" />
        <rect x="17" y="30" width="4" height="6" fill="#fffaf5" />
        <rect x="24" y="30" width="4" height="6" fill="#fffaf5" />
        {/* Paw pads */}
        <rect x="10" y="34.5" width="4" height="1.5" fill="#ffd1dc" />
        <rect x="17" y="34.5" width="4" height="1.5" fill="#ffd1dc" />
        <rect x="24" y="34.5" width="4" height="1.5" fill="#ffd1dc" />

        {/* Head */}
        <rect x="7" y="8" width="18" height="14" fill="#fffaf5" />
        <rect x="5" y="10" width="22" height="10" fill="#fffaf5" />

        {/* Floppy Puppy Ears */}
        {/* Left ear */}
        <rect x="4" y="10" width="4" height="8" fill="#f5ebe0" />
        <rect x="3" y="12" width="4" height="8" fill="#e3d5ca" />
        {/* Right ear */}
        <rect x="22" y="10" width="4" height="8" fill="#f5ebe0" />
        <rect x="23" y="12" width="4" height="8" fill="#e3d5ca" />

        {/* Cute Pink Bow on left ear */}
        <g className="filter drop-shadow-sm">
          {/* Bow loops */}
          <rect x="4" y="6" width="4" height="3" fill="#ec4899" />
          <rect x="10" y="6" width="4" height="3" fill="#ec4899" />
          {/* Bow knot */}
          <rect x="7" y="6.5" width="4" height="3.5" fill="#db2777" />
          {/* Ribbon tails */}
          <rect x="7" y="10" width="2" height="3" fill="#f472b6" />
          <rect x="9" y="10" width="2" height="2" fill="#f472b6" />
        </g>

        {/* Big puppy eyes */}
        <rect x="9" y="13" width="3" height="4" fill="#2b1810" />
        <rect x="9.5" y="13.5" width="1.5" height="1.5" fill="#ffffff" />
        <rect x="18" y="13" width="3" height="4" fill="#2b1810" />
        <rect x="18.5" y="13.5" width="1.5" height="1.5" fill="#ffffff" />

        {/* Blush */}
        <rect x="7" y="17" width="3" height="1.5" fill="#fbcfe8" />
        <rect x="20" y="17" width="3" height="1.5" fill="#fbcfe8" />

        {/* Cute button nose */}
        <rect x="13.5" y="16.5" width="3" height="2" fill="#2b1810" />
        {/* Little mouth & pink tongue */}
        <path d="M13.5 19 Q15 20.5 16.5 19" stroke="#2b1810" strokeWidth="1" fill="none" />
        {isExcited && (
          <rect x="14" y="19" width="2" height="2.5" fill="#fb7185" rx="1" />
        )}
      </svg>
    </div>
  );
};
