import React from 'react';
import { GirlSprite } from '../characters/GirlSprite';
import { PinkieSprite } from '../characters/PinkieSprite';

interface LivingRoomSceneProps {
  girlEmotion?: 'happy' | 'laugh' | 'shocked' | 'love';
  className?: string;
}

export const LivingRoomScene: React.FC<LivingRoomSceneProps> = ({
  girlEmotion = 'laugh',
  className = ''
}) => {
  return (
    <div className={`relative w-full max-w-xl mx-auto h-72 sm:h-80 rounded-3xl border-4 border-[#3b1d32] shadow-[8px_8px_0px_#3b1d32] overflow-hidden select-none bg-gradient-to-b from-[#fce7f3] via-[#fae8ff] to-[#f5d0fe] ${className}`}>
      {/* Living Room Wallpaper with cute subtle pastel diamonds */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ec4899_1.5px,transparent_1.5px)] [background-size:20px_20px]" />

      {/* Hanging Framed Retro Pixel Poster on Wall */}
      <div className="absolute top-4 left-8 p-1 bg-white/90 rounded-xl border-2 border-[#3b1d32] shadow-sm flex flex-col items-center">
        <div className="w-16 h-10 bg-gradient-to-tr from-pink-300 to-purple-300 rounded flex items-center justify-center text-[10px]">
          🌸✨
        </div>
        <span className="text-[7px] font-['Silkscreen'] text-[#3b1d32] mt-0.5 font-bold">COZY VIBES</span>
      </div>

      {/* Tiny Retro Pixel Television on Left Shelf */}
      <div className="absolute bottom-10 left-4 sm:left-8 flex flex-col items-center">
        {/* Antenna */}
        <div className="flex gap-2 -mb-1">
          <div className="w-0.5 h-4 bg-[#3b1d32] -rotate-15" />
          <div className="w-0.5 h-4 bg-[#3b1d32] rotate-15" />
        </div>

        {/* TV Box */}
        <div className="w-28 sm:w-32 h-20 bg-[#5b21b6] rounded-xl border-3 border-[#3b1d32] shadow-[3px_3px_0px_#3b1d32] p-1.5 flex items-center justify-between gap-1">
          {/* Animated Generic Soap Opera TV Screen */}
          <div className="flex-1 h-full bg-[#1e1b4b] rounded-lg border border-[#3b1d32] overflow-hidden relative flex flex-col items-center justify-center p-1">
            {/* Dramatic flickering scanlines */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.15)_2px,rgba(255,255,255,0.15)_4px)]" />

            {/* Generic Soap Opera Actor Figures */}
            <div className="flex items-center gap-1.5 z-10">
              <span className="text-[12px] animate-bounce" style={{ animationDuration: '0.8s' }}>
                👩‍🦰
              </span>
              <span className="text-[9px] text-amber-300 font-bold animate-ping">
                ⚡
              </span>
              <span className="text-[12px] animate-pulse">
                🤦‍♂️
              </span>
            </div>

            <span className="font-['Silkscreen'] text-[6px] text-pink-300 z-10 font-bold mt-0.5">
              SERIAL: DRAMA 100%
            </span>
          </div>

          {/* TV Dials */}
          <div className="w-4 flex flex-col items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-300 border border-[#3b1d32]" />
            <div className="w-2.5 h-2.5 rounded-full bg-pink-300 border border-[#3b1d32]" />
            <div className="w-3 h-0.5 bg-white/50" />
          </div>
        </div>

        {/* TV Stand Shelf */}
        <div className="w-32 sm:w-36 h-4 bg-[#78350f] rounded-t-lg border-2 border-[#3b1d32]" />
      </div>

      {/* Cozy Pastel Couch on Right */}
      <div className="absolute bottom-6 right-4 sm:right-8 w-56 sm:w-64 h-24 bg-[#e9d5ff] rounded-t-3xl border-3 border-[#3b1d32] shadow-md flex items-center justify-center">
        {/* Couch Cushions */}
        <div className="absolute inset-x-2 top-2 h-14 bg-[#d8b4fe] rounded-2xl border-2 border-[#3b1d32]/30 flex justify-around items-center px-2">
          <div className="w-7 h-7 rounded-xl bg-pink-200 border border-pink-400 rotate-12 flex items-center justify-center text-[10px]">
            ♡
          </div>
          <div className="w-7 h-7 rounded-xl bg-amber-100 border border-amber-300 -rotate-12 flex items-center justify-center text-[10px]">
            ✨
          </div>
        </div>
      </div>

      {/* Girl sitting on Couch holding phone */}
      <div className="absolute bottom-10 right-24 sm:right-28 z-10">
        <GirlSprite size="md" emotion={girlEmotion} />
      </div>

      {/* Fluffy Pinkie resting on Rug beside Couch */}
      <div className="absolute bottom-4 right-6 sm:right-10 z-20">
        <PinkieSprite size="sm" showSpeechBubble={false} />
      </div>

      {/* Fluffy Rug underneath */}
      <div className="absolute bottom-2 right-12 w-48 h-6 bg-[#fbcfe8] rounded-full border border-pink-300 opacity-80" />

      {/* Cozy Floor Planks */}
      <div className="absolute bottom-0 inset-x-0 h-4 bg-[#78350f] border-t-2 border-[#451a03]" />
    </div>
  );
};
