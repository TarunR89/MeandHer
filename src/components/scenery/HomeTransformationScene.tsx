import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { BoySprite } from '../characters/BoySprite';
import { GirlSprite } from '../characters/GirlSprite';
import { PinkieSprite } from '../characters/PinkieSprite';
import { LunaSprite } from '../characters/LunaSprite';

interface HomeTransformationSceneProps {
  isTransformed: boolean;
  onHeartTapped: () => void;
  hasHeartTraveled: boolean;
  className?: string;
}

export const HomeTransformationScene: React.FC<HomeTransformationSceneProps> = ({
  isTransformed,
  onHeartTapped,
  hasHeartTraveled,
  className = ''
}) => {
  return (
    <div
      className={`relative w-full max-w-2xl mx-auto h-80 sm:h-96 rounded-3xl border-4 border-[#3b1d32] shadow-[8px_8px_0px_#3b1d32] overflow-hidden select-none transition-colors duration-1000 ${
        isTransformed
          ? 'bg-gradient-to-b from-[#fce7f3] via-[#ffedd5] to-[#fbcfe8]'
          : 'bg-gradient-to-b from-[#1a102f] via-[#2d1b4e] to-[#1e1338]'
      } ${className}`}
    >
      {/* Rain animation when NOT transformed */}
      {!isTransformed && (
        <div className="absolute inset-0 pointer-events-none opacity-50 z-10">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              style={{
                left: `${(i * 14) % 100}%`,
                animationDuration: `${0.7 + (i % 3) * 0.2}s`,
                animationDelay: `${(i * 0.08)}s`
              }}
              className="absolute w-0.5 h-6 bg-sky-300/60 rounded-full animate-[rainFall_0.8s_linear_infinite]"
            />
          ))}
        </div>
      )}

      {/* Floating Petals and Golden Light when Transformed */}
      {isTransformed && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {/* Golden radial ambient light spreading */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(254,240,138,0.3)_0%,transparent_70%)] animate-pulse" />

          {/* Floating Sakura Petals */}
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              style={{
                left: `${(i * 22) % 100}%`,
                animationDuration: `${4 + (i % 4) * 1.5}s`,
                animationDelay: `${i * 0.4}s`
              }}
              className="absolute text-xs text-pink-400 animate-[petalFall_5s_linear_infinite]"
            >
              🌸
            </div>
          ))}

          {/* Stars becoming glowing hearts */}
          {[
            { x: '15%', y: '15%' },
            { x: '45%', y: '12%' },
            { x: '78%', y: '18%' },
            { x: '88%', y: '28%' }
          ].map((pos, idx) => (
            <div
              key={idx}
              style={{ left: pos.x, top: pos.y }}
              className="absolute text-pink-400 text-xs animate-bounce"
            >
              ♡
            </div>
          ))}
        </div>
      )}

      {/* Cozy Cottage / House emerging in distance when transformed */}
      {isTransformed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10"
        >
          {/* Pixel Cottage */}
          <div className="relative">
            {/* Roof */}
            <div className="w-24 h-10 bg-[#831843] rounded-t-lg border-2 border-[#3b1d32] shadow" />
            <div className="w-28 -ml-2 h-2 bg-[#be185d] border-b-2 border-[#3b1d32]" />
            {/* Walls */}
            <div className="w-24 h-14 bg-[#fdf2f8] border-2 border-t-0 border-[#3b1d32] relative flex items-center justify-around px-2">
              {/* Glowing Warm Yellow Windows */}
              <div className="w-5 h-6 bg-[#fde047] rounded border border-[#3b1d32] shadow-[0_0_12px_#facc15] flex items-center justify-center">
                <div className="w-full h-0.5 bg-[#3b1d32]" />
              </div>
              {/* Wooden Door */}
              <div className="w-5 h-10 bg-[#78350f] rounded-t border border-[#3b1d32] self-end mb-0 relative">
                <div className="w-1 h-1 bg-amber-200 rounded-full absolute right-1 top-4" />
              </div>
              {/* Window 2 */}
              <div className="w-5 h-6 bg-[#fde047] rounded border border-[#3b1d32] shadow-[0_0_12px_#facc15] flex items-center justify-center">
                <div className="w-full h-0.5 bg-[#3b1d32]" />
              </div>
            </div>
          </div>
          <span className="font-['Silkscreen'] text-[8px] text-pink-700 bg-white/90 px-2 py-0.5 rounded-full border border-pink-300 shadow mt-1">
            HOME ♡
          </span>
        </motion.div>
      )}

      {/* Grassy ground / Meadow */}
      <div className={`absolute bottom-0 inset-x-0 h-16 border-t-3 border-[#3b1d32] z-10 transition-colors duration-1000 ${
        isTransformed ? 'bg-[#65a30d]' : 'bg-[#1f2937]'
      }`}>
        {/* Wild Flowers blooming when transformed */}
        {isTransformed && (
          <div className="flex justify-around px-4 pt-1">
            {[1, 2, 3, 4, 5, 6, 7].map(i => (
              <span key={i} className="text-xs animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
                {i % 2 === 0 ? '🌼' : '🌸'}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Characters Layer */}
      <div className="absolute bottom-6 inset-x-0 px-6 sm:px-12 flex items-end justify-between z-20">
        {/* Boy & Luna on Left */}
        <div className="flex items-end gap-2 sm:gap-3">
          <div className="pb-1">
            <LunaSprite size="sm" showSpeechBubble={false} />
          </div>
          <BoySprite size="md" emotion={isTransformed ? 'love' : 'thinking'} />
        </div>

        {/* The Traveling Heart Animation between them */}
        {isTransformed && !hasHeartTraveled && (
          <motion.button
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.9 }}
            onClick={onHeartTapped}
            className="p-3 bg-white/90 rounded-full border-2 border-pink-400 shadow-[0_0_16px_#f43f5e] cursor-pointer animate-bounce self-center z-30 flex flex-col items-center"
          >
            <Heart className="w-7 h-7 fill-rose-500 text-rose-500 animate-pulse" />
            <span className="font-['Silkscreen'] text-[8px] text-pink-700 whitespace-nowrap mt-1 font-bold">
              TAP HEART ♡
            </span>
          </motion.button>
        )}

        {/* Animated Traveled Heart */}
        {hasHeartTraveled && (
          <motion.div
            initial={{ x: 80, opacity: 1, scale: 1.2 }}
            animate={{ x: -80, opacity: 1, scale: [1, 1.3, 1] }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="self-center z-30 text-rose-500"
          >
            <Heart className="w-8 h-8 fill-rose-500 text-rose-500 filter drop-shadow-[0_0_10px_#f43f5e]" />
          </motion.div>
        )}

        {/* Girl & Pinkie on Right */}
        <div className="flex items-end gap-2 sm:gap-3">
          <GirlSprite size="md" emotion="happy" />
          <div className="pb-1">
            <PinkieSprite size="sm" showSpeechBubble={false} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes rainFall {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(220px);
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
};
