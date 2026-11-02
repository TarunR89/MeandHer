import React from 'react';
import { BoySprite } from '../characters/BoySprite';
import { LunaSprite } from '../characters/LunaSprite';

interface BedroomNightSceneProps {
  boyEmotion?: 'shy' | 'neutral' | 'thinking' | 'love' | 'laugh';
  lunaAwake?: boolean;
  showSweatdrop?: boolean;
  className?: string;
}

export const BedroomNightScene: React.FC<BedroomNightSceneProps> = ({
  boyEmotion = 'shy',
  lunaAwake = true,
  showSweatdrop = false,
  className = ''
}) => {
  return (
    <div className={`relative w-full max-w-xl mx-auto h-72 sm:h-80 rounded-3xl border-4 border-[#3b1d32] shadow-[8px_8px_0px_#3b1d32] overflow-hidden select-none bg-gradient-to-b from-[#2e1d38] via-[#3d274c] to-[#25152e] ${className}`}>
      {/* Bedroom Window looking out into lavender night sky */}
      <div className="absolute top-4 left-6 w-36 sm:w-44 h-40 rounded-2xl border-3 border-[#563668] bg-[#1a0f26] overflow-hidden shadow-inner">
        {/* Soft Lavender Night Sky Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#311b47] via-[#4a2868] to-[#6b3a8a] opacity-90" />

        {/* Moving Pixel Clouds */}
        <div className="absolute top-2 left-0 w-[200%] h-8 flex gap-12 animate-[marquee_20s_linear_infinite] opacity-50 pixel-art">
          <svg width="40" height="14" viewBox="0 0 32 12" fill="white" shapeRendering="crispEdges">
            <rect x="6" y="2" width="20" height="8" rx="2" />
            <rect x="10" y="0" width="12" height="4" rx="2" />
          </svg>
          <svg width="35" height="12" viewBox="0 0 32 12" fill="white" shapeRendering="crispEdges">
            <rect x="4" y="3" width="24" height="7" rx="2" />
          </svg>
        </div>

        {/* Twinkling Stars outside window */}
        <div className="absolute top-3 left-4 w-1.5 h-1.5 bg-yellow-100 rounded-full animate-pulse" />
        <div className="absolute top-10 left-16 w-1 h-1 bg-white rounded-full animate-ping" />
        <div className="absolute top-6 right-6 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-pulse" />
        <div className="absolute top-20 left-8 w-1 h-1 bg-white rounded-full" />

        {/* Slowly drifting cherry blossom petals outside window */}
        <div className="absolute top-4 right-12 text-[10px] text-pink-300 animate-[petalFall_6s_linear_infinite]">
          🌸
        </div>
        <div className="absolute top-12 left-10 text-[9px] text-pink-300 animate-[petalFall_8s_linear_infinite_1.5s]">
          🌸
        </div>

        {/* Window Cross Panes */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-1 bg-[#563668]" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-1 h-full bg-[#563668]" />
        </div>

        {/* Soft Window Sill */}
        <div className="absolute bottom-0 inset-x-0 h-2 bg-[#422650]" />
      </div>

      {/* Fairy Lights string across bedroom ceiling */}
      <div className="absolute top-2 left-0 right-0 flex justify-around px-4 pointer-events-none">
        {[1, 2, 3, 4, 5, 6, 7].map(i => (
          <div
            key={i}
            className="w-2 h-2.5 rounded-full bg-amber-200 shadow-[0_0_8px_#fde68a] animate-pulse"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </div>

      {/* Warm Ambient Desk Lamp Glow */}
      <div className="absolute bottom-24 right-16 w-32 h-32 bg-amber-200/15 rounded-full blur-2xl pointer-events-none" />

      {/* Cozy Desk on Right */}
      <div className="absolute bottom-0 right-4 sm:right-8 w-56 sm:w-64 h-24 bg-[#4a2e2b] border-t-3 border-l-3 border-[#6b423d] rounded-tl-2xl shadow-lg">
        {/* Desk Lamp */}
        <div className="absolute -top-16 right-6 flex flex-col items-center">
          <div className="w-8 h-6 bg-[#fde047] rounded-t-xl border border-[#3b1d32] shadow-[0_0_12px_#fde047]" />
          <div className="w-1.5 h-10 bg-[#3b1d32]" />
          <div className="w-8 h-2 bg-[#3b1d32] rounded-full" />
        </div>

        {/* Glowing Phone on Desk */}
        <div className="absolute top-3 right-20 w-8 h-12 bg-[#1e1b4b] rounded-lg border-2 border-[#818cf8] shadow-[0_0_8px_#818cf8] flex items-center justify-center">
          <div className="w-5 h-8 bg-pink-100 rounded-sm flex flex-col items-center justify-center">
            <span className="text-[7px]">💬</span>
          </div>
        </div>

        {/* Curled up Luna on Desk */}
        <div className="absolute -top-12 left-4">
          <LunaSprite size="sm" showSpeechBubble={lunaAwake} />
        </div>
      </div>

      {/* Boy sitting near desk with his phone */}
      <div className="absolute bottom-2 left-28 sm:left-36 flex flex-col items-center z-10">
        <BoySprite size="md" emotion={boyEmotion} />

        {/* Tiny sweatdrop animation when teased by Luna */}
        {showSweatdrop && (
          <div className="absolute top-4 right-2 text-sky-400 font-bold text-sm animate-bounce">
            💧
          </div>
        )}
      </div>

      {/* Wooden Floor Planks */}
      <div className="absolute bottom-0 inset-x-0 h-6 bg-[#2d1b19] border-t-2 border-[#432825]" />
    </div>
  );
};
