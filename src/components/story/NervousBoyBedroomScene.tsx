import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { BoySprite } from '../characters/BoySprite';
import { LunaSprite } from '../characters/LunaSprite';

interface NervousBoyBedroomSceneProps {
  clockTime: string; // "10:59 PM" or "11:00 PM"
  boyState?: 'pacing' | 'sitting' | 'typing';
  showSweatDrops?: boolean;
  isTrembling?: boolean;
  className?: string;
}

export const NervousBoyBedroomScene: React.FC<NervousBoyBedroomSceneProps> = ({
  clockTime,
  boyState = 'pacing',
  showSweatDrops = true,
  isTrembling = true,
  className = ''
}) => {
  return (
    <div className={`relative w-full max-w-xl mx-auto h-72 sm:h-84 rounded-3xl border-4 border-[#3b1d32] shadow-[8px_8px_0px_#3b1d32] overflow-hidden select-none bg-gradient-to-b from-[#22122d] via-[#351b42] to-[#1e0e27] ${className}`}>
      {/* Lavender Night Sky Window */}
      <div className="absolute top-4 left-6 w-36 sm:w-44 h-40 rounded-2xl border-3 border-[#563668] bg-[#160c22] overflow-hidden shadow-inner">
        {/* Soft Lavender Night Sky Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#311b47] via-[#4a2868] to-[#6b3a8a] opacity-90" />

        {/* Bright Moon outside window */}
        <div className="absolute top-3 right-4 w-7 h-7 bg-amber-100 rounded-full border border-amber-200 shadow-[0_0_12px_#fde68a]">
          <div className="w-1.5 h-1.5 bg-amber-200/60 rounded-full absolute top-2 left-2" />
        </div>

        {/* Moving Pixel Clouds */}
        <div className="absolute top-6 left-0 w-[200%] h-8 flex gap-12 animate-[marquee_20s_linear_infinite] opacity-50 pixel-art">
          <svg width="40" height="14" viewBox="0 0 32 12" fill="white" shapeRendering="crispEdges">
            <rect x="6" y="2" width="20" height="8" rx="2" />
            <rect x="10" y="0" width="12" height="4" rx="2" />
          </svg>
          <svg width="35" height="12" viewBox="0 0 32 12" fill="white" shapeRendering="crispEdges">
            <rect x="4" y="3" width="24" height="7" rx="2" />
          </svg>
        </div>

        {/* Twinkling Stars */}
        <div className="absolute top-4 left-3 w-1.5 h-1.5 bg-yellow-100 rounded-full animate-pulse" />
        <div className="absolute top-12 left-14 w-1 h-1 bg-white rounded-full animate-ping" />
        <div className="absolute top-24 left-6 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-pulse" />

        {/* Subtle rain drops or falling petals outside */}
        <div className="absolute top-2 right-12 text-[9px] text-pink-300 animate-[petalFall_6s_linear_infinite]">
          🌸
        </div>

        {/* Window Panes */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-1 bg-[#563668]" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-1 h-full bg-[#563668]" />
        </div>
        <div className="absolute bottom-0 inset-x-0 h-2 bg-[#422650]" />
      </div>

      {/* Fairy Lights across ceiling */}
      <div className="absolute top-2 left-0 right-0 flex justify-around px-4 pointer-events-none">
        {[1, 2, 3, 4, 5, 6, 7].map(i => (
          <div
            key={i}
            className="w-2 h-2.5 rounded-full bg-amber-200 shadow-[0_0_8px_#fde68a] animate-pulse"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </div>

      {/* Retro Digital Clock on Wall reading 10:59 PM or 11:00 PM */}
      <div className="absolute top-5 right-6 px-3 py-1.5 bg-[#12071a] rounded-xl border-2 border-pink-400/50 shadow-[0_0_12px_rgba(244,114,182,0.4)] flex items-center gap-1.5 z-20">
        <Clock className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
        <span className="font-['Silkscreen'] text-xs font-bold text-pink-300 tracking-wider">
          {clockTime}
        </span>
      </div>

      {/* Cozy Bed on Left where Luna is sitting */}
      <div className="absolute bottom-0 left-4 sm:left-8 w-44 sm:w-52 h-24 bg-[#3d274c] border-t-4 border-r-4 border-[#5a3b6f] rounded-tr-2xl shadow-lg">
        {/* Pillow */}
        <div className="absolute -top-5 left-3 w-16 h-8 bg-[#e9d5ff] rounded-t-xl border border-[#3b1d32]" />
        {/* Soft Lavender Quilt */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-pink-300/30 rounded-tr-xl p-2">
          <div className="text-[10px] text-pink-300/50">✦ ✦ ✦</div>
        </div>

        {/* Luna on Bed */}
        <div className="absolute -top-12 left-16 z-20">
          <LunaSprite size="md" />
        </div>
      </div>

      {/* Warm Desk on Right with Desk Lamp & Glowing Smartphone */}
      <div className="absolute bottom-0 right-4 sm:right-6 w-48 sm:w-56 h-24 bg-[#4a2e2b] border-t-3 border-l-3 border-[#6b423d] rounded-tl-2xl shadow-lg">
        {/* Warm Ambient Desk Lamp */}
        <div className="absolute -top-16 right-4 flex flex-col items-center">
          <div className="w-8 h-6 bg-[#fde047] rounded-t-xl border border-[#3b1d32] shadow-[0_0_16px_#fde047]" />
          <div className="w-1.5 h-10 bg-[#3b1d32]" />
          <div className="w-8 h-2 bg-[#3b1d32] rounded-full" />
        </div>

        {/* Glowing smartphone resting on desk */}
        <div className="absolute -top-4 left-6 w-8 h-12 bg-[#1f1d24] rounded-lg border-2 border-pink-400 shadow-[0_0_10px_#f472b6] flex flex-col items-center justify-center p-0.5">
          <div className="w-full h-full bg-pink-100/90 rounded flex flex-col items-center justify-between p-1">
            <div className="w-4 h-1 bg-pink-400 rounded-full" />
            <div className="text-[7px] text-pink-600 font-bold font-['Silkscreen']">11:00</div>
            <div className="w-1 h-1 rounded-full bg-pink-500 animate-ping" />
          </div>
        </div>

        {/* Scattered handwritten notes on desk */}
        <div className="absolute top-2 left-18 w-7 h-5 bg-amber-50 rounded border border-amber-300 rotate-6 shadow-sm p-0.5">
          <div className="w-4 h-0.5 bg-amber-400 mb-0.5" />
          <div className="w-5 h-0.5 bg-amber-400" />
        </div>
        <div className="absolute top-3 left-26 w-6 h-6 bg-pink-50 rounded border border-pink-300 -rotate-12 shadow-sm p-0.5">
          <div className="w-4 h-0.5 bg-pink-400 mb-0.5" />
          <div className="w-3 h-0.5 bg-pink-400" />
        </div>
      </div>

      {/* Pacing Boy Character */}
      {boyState === 'pacing' && (
        <motion.div
          className="absolute bottom-3 left-1/2 z-30 flex flex-col items-center"
          animate={{
            x: [-35, 35, -35],
            scaleX: [1, 1, -1, -1, 1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Nervous Pixel Sweatdrop */}
          {showSweatDrops && (
            <motion.div
              animate={{ y: [-2, 4, -2], opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="absolute -top-3 right-0 text-cyan-300 font-bold text-xs"
            >
              💦
            </motion.div>
          )}

          {/* Trembling Hands Aura */}
          <div className={isTrembling ? "animate-[bounce_0.25s_infinite]" : ""}>
            <BoySprite size="md" emotion="shy" />
          </div>
        </motion.div>
      )}

      {boyState === 'sitting' && (
        <div className="absolute bottom-3 right-28 z-30 flex flex-col items-center">
          <BoySprite size="md" emotion="thinking" />
        </div>
      )}

      {boyState === 'typing' && (
        <div className="absolute bottom-3 right-28 z-30 flex flex-col items-center animate-pulse">
          <BoySprite size="md" emotion="love" />
        </div>
      )}

      {/* Wooden Floor Planks */}
      <div className="absolute bottom-0 inset-x-0 h-4 bg-[#2e1c18] border-t-2 border-[#452a24] flex justify-around opacity-75">
        <div className="w-px h-full bg-[#1c100e]" />
        <div className="w-px h-full bg-[#1c100e]" />
        <div className="w-px h-full bg-[#1c100e]" />
      </div>
    </div>
  );
};
