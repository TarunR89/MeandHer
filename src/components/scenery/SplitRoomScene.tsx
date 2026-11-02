import React from 'react';
import { motion } from 'framer-motion';
import { BoySprite } from '../characters/BoySprite';
import { GirlSprite } from '../characters/GirlSprite';
import { PinkieSprite } from '../characters/PinkieSprite';
import { LunaSprite } from '../characters/LunaSprite';

interface SplitRoomSceneProps {
  proximityStep: number; // 0 (far) to 3 (closest)
  className?: string;
}

export const SplitRoomScene: React.FC<SplitRoomSceneProps> = ({
  proximityStep = 0,
  className = ''
}) => {
  // Proximity translation for bringing both rooms closer
  const boyOffset = Math.min(proximityStep * 18, 54);
  const girlOffset = -Math.min(proximityStep * 18, 54);

  return (
    <div className={`relative w-full max-w-2xl mx-auto h-72 sm:h-80 rounded-3xl border-4 border-[#3b1d32] shadow-[8px_8px_0px_#3b1d32] overflow-hidden select-none bg-[#110e1b] ${className}`}>
      {/* Background divider with glowing cosmic beam */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-transparent via-pink-400 to-transparent opacity-40 z-20" />

      {/* Floating Animated Connection Messages across rooms */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden flex items-center justify-center">
        {[
          { text: "✨", delay: 0, y: -40 },
          { text: "💬", delay: 1.2, y: 10 },
          { text: "♡", delay: 2.4, y: 45 },
          { text: "🌙", delay: 0.6, y: -15 }
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -80, scale: 0.8 }}
            animate={{
              opacity: [0, 0.9, 0.9, 0],
              x: [-60, 60],
              y: [item.y, item.y - 15]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut"
            }}
            className="absolute text-pink-300 text-sm filter drop-shadow-[0_0_6px_#f472b6]"
          >
            {item.text}
          </motion.div>
        ))}
      </div>

      <div className="w-full h-full flex flex-row">
        {/* LEFT ROOM: Boy's Room (Dim blue lighting, rain outside window, Luna) */}
        <motion.div
          animate={{ x: boyOffset }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="flex-1 h-full bg-gradient-to-b from-[#1e1b4b] via-[#2e1065] to-[#170e28] relative border-r-2 border-[#3b1d32]/60 overflow-hidden"
        >
          {/* Dim Blue Atmosphere Shadow */}
          <div className="absolute inset-0 bg-blue-950/30" />

          {/* Rainy Window on Boy's side */}
          <div className="absolute top-4 left-4 w-28 sm:w-36 h-36 rounded-2xl border-2 border-[#4338ca] bg-[#0f172a] overflow-hidden shadow-inner">
            {/* Dark Stormy Rain Sky */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#090d16] to-[#1e1b4b]" />

            {/* Falling Raindrops animation */}
            <div className="absolute inset-0 opacity-60">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    left: `${(i * 18) % 100}%`,
                    animationDuration: `${0.6 + (i % 3) * 0.2}s`,
                    animationDelay: `${(i * 0.1)}s`
                  }}
                  className="absolute w-0.5 h-4 bg-sky-300/70 rounded-full animate-[rainDrop_0.8s_linear_infinite]"
                />
              ))}
            </div>

            {/* Window Pane Lines */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-0.5 bg-[#4338ca]/80" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-0.5 h-full bg-[#4338ca]/80" />
            </div>
          </div>

          {/* Boy's Bed & Sleeping area */}
          <div className="absolute bottom-4 left-6 sm:left-12 flex flex-col items-center z-10">
            {/* Phone glowing in lap */}
            <div className="absolute top-14 left-7 w-3 h-5 bg-sky-200 rounded border border-sky-400 shadow-[0_0_8px_#38bdf8] z-20 flex items-center justify-center">
              <div className="w-1.5 h-3 bg-white rounded-xs" />
            </div>

            <BoySprite size="md" emotion="thinking" />
          </div>

          {/* Luna resting beside him */}
          <div className="absolute bottom-4 left-24 sm:left-32 z-10">
            <LunaSprite size="sm" showSpeechBubble={false} />
          </div>

          {/* Room Ambient Label */}
          <div className="absolute bottom-2 left-3 font-['Silkscreen'] text-[8px] text-indigo-300/70">
            BOY'S ROOM • 1:15 AM 🌧️
          </div>
        </motion.div>

        {/* RIGHT ROOM: Girl's Room (Warm pastel pink lighting, gentle stars outside, Pinkie) */}
        <motion.div
          animate={{ x: girlOffset }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="flex-1 h-full bg-gradient-to-b from-[#4a154b] via-[#3b1236] to-[#240c23] relative border-l-2 border-[#3b1d32]/60 overflow-hidden"
        >
          {/* Warm Pastel Pink Light Glow */}
          <div className="absolute inset-0 bg-pink-500/10" />

          {/* Cozy Window on Girl's side */}
          <div className="absolute top-4 right-4 w-28 sm:w-36 h-36 rounded-2xl border-2 border-[#ec4899] bg-[#1a0c20] overflow-hidden shadow-inner">
            {/* Gentle Twilight Stars Sky */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#2e0854] to-[#4a1236]" />

            {/* Twinkling Stars */}
            <div className="absolute top-3 left-4 w-1.5 h-1.5 bg-yellow-100 rounded-full animate-pulse" />
            <div className="absolute top-8 right-6 w-1 h-1 bg-white rounded-full animate-ping" />
            <div className="absolute top-16 left-8 w-1.5 h-1.5 bg-pink-200 rounded-full animate-pulse" />
            <div className="absolute top-6 left-16 w-1 h-1 bg-amber-100 rounded-full" />

            {/* Window Pane Lines */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-0.5 bg-[#ec4899]/80" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-0.5 h-full bg-[#ec4899]/80" />
            </div>
          </div>

          {/* Girl sitting by window with glowing phone */}
          <div className="absolute bottom-4 right-16 sm:right-20 flex flex-col items-center z-10">
            {/* Phone glowing in hands */}
            <div className="absolute top-14 right-7 w-3 h-5 bg-pink-200 rounded border border-pink-400 shadow-[0_0_8px_#f472b6] z-20 flex items-center justify-center">
              <div className="w-1.5 h-3 bg-white rounded-xs" />
            </div>

            <GirlSprite size="md" emotion="happy" />
          </div>

          {/* Pinkie sleeping peacefully beside her */}
          <div className="absolute bottom-4 right-6 sm:right-8 z-10">
            <PinkieSprite size="sm" showSpeechBubble={false} />
          </div>

          {/* Room Ambient Label */}
          <div className="absolute bottom-2 right-3 font-['Silkscreen'] text-[8px] text-pink-300/70">
            GIRL'S ROOM • 1:15 AM ✨
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes rainDrop {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          40% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(140px);
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
};
