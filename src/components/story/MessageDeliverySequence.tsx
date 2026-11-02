import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles, Heart } from 'lucide-react';
import { BoySprite } from '../characters/BoySprite';
import { GirlSprite } from '../characters/GirlSprite';
import { soundManager } from '../audio/SoundManager';

interface MessageDeliverySequenceProps {
  onComplete: () => void;
  className?: string;
}

export const MessageDeliverySequence: React.FC<MessageDeliverySequenceProps> = ({
  onComplete,
  className = ''
}) => {
  const [stage, setStage] = useState<'departing' | 'flying' | 'arriving'>('departing');

  useEffect(() => {
    soundManager.playPaperRustle();

    const t1 = setTimeout(() => {
      setStage('flying');
      soundManager.playHeart();
    }, 1200);

    const t2 = setTimeout(() => {
      setStage('arriving');
      soundManager.playHomeChime();
    }, 3800);

    const t3 = setTimeout(() => {
      onComplete();
    }, 5500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div className={`relative w-full max-w-xl mx-auto h-80 sm:h-96 rounded-3xl border-4 border-[#3b1d32] shadow-[8px_8px_0px_#3b1d32] overflow-hidden select-none bg-gradient-to-b from-[#1e0e29] via-[#2f173f] to-[#12071a] flex flex-col items-center justify-center ${className}`}>
      {/* Starry Night Sky Canvas */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft celestial nebula glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(244,114,182,0.25)_0%,transparent_70%)]" />

        {/* Twinkling pixel stars */}
        {[
          { x: '15%', y: '20%', size: 'w-1.5 h-1.5', delay: '0s' },
          { x: '82%', y: '18%', size: 'w-2 h-2', delay: '0.5s' },
          { x: '35%', y: '65%', size: 'w-1 h-1', delay: '1s' },
          { x: '70%', y: '75%', size: 'w-1.5 h-1.5', delay: '1.5s' },
          { x: '50%', y: '15%', size: 'w-1.5 h-1.5', delay: '0.8s' },
          { x: '88%', y: '50%', size: 'w-1 h-1', delay: '1.2s' }
        ].map((star, i) => (
          <div
            key={i}
            style={{ left: star.x, top: star.y, animationDelay: star.delay }}
            className={`absolute ${star.size} bg-yellow-100 rounded-full animate-pulse shadow-[0_0_8px_#fef08a]`}
          />
        ))}

        {/* Drifting pixel clouds */}
        <motion.div
          animate={{ x: [-100, 400] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute top-10 left-0 opacity-30 text-white text-xl"
        >
          ☁️
        </motion.div>
        <motion.div
          animate={{ x: [-80, 450] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear', delay: 2 }}
          className="absolute bottom-16 left-0 opacity-20 text-white text-2xl"
        >
          ☁️
        </motion.div>
      </div>

      {/* STAGE 1: Boy Closes Eyes & Message Departs */}
      {stage === 'departing' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-center z-10"
        >
          <div className="relative mb-3">
            <BoySprite size="md" emotion="shy" />
            <motion.div
              initial={{ scale: 0, y: 10 }}
              animate={{ scale: [0, 1.2, 1], y: -15 }}
              className="absolute -top-4 right-0 p-1.5 bg-pink-400 rounded-full border border-white shadow-[0_0_12px_#f472b6]"
            >
              <Heart className="w-4 h-4 fill-white text-white animate-pulse" />
            </motion.div>
          </div>

          <span className="font-['Silkscreen'] text-xs text-pink-300 font-bold mb-1">
            THE MESSAGE HAS TAKEN FLIGHT...
          </span>
          <p className="font-['Fredoka'] text-sm text-pink-100 italic">
            Eyes closed. Heart pounding. Sent into the starlit sky.
          </p>
        </motion.div>
      )}

      {/* STAGE 2: Envelope Flying Through Starry Sky */}
      {stage === 'flying' && (
        <div className="relative w-full h-full flex flex-col items-center justify-center z-10">
          <motion.div
            initial={{ x: -160, y: 60, scale: 0.6, rotate: -25 }}
            animate={{
              x: [ -160, -30, 40, 160 ],
              y: [ 60, -40, -10, 40 ],
              scale: [ 0.6, 1.2, 1.1, 0.9 ],
              rotate: [ -25, 10, -10, 15 ]
            }}
            transition={{ duration: 2.6, ease: 'easeInOut' }}
            className="flex flex-col items-center"
          >
            {/* Glowing Pink Envelope */}
            <div className="p-3 bg-gradient-to-r from-pink-400 via-rose-300 to-pink-400 rounded-2xl border-2 border-white shadow-[0_0_25px_#f472b6] flex items-center justify-center relative">
              <Mail className="w-8 h-8 text-white fill-pink-500" />
              {/* Trailing heart particles */}
              <div className="absolute -bottom-2 -left-3 text-pink-300 text-xs animate-ping">
                ♡
              </div>
              <div className="absolute -top-2 -right-3 text-pink-200 text-sm animate-pulse">
                ✨
              </div>
            </div>
            <span className="font-['Silkscreen'] text-[9px] text-pink-200 font-bold mt-2 bg-black/40 px-2 py-0.5 rounded-full border border-pink-400/30">
              TRAVELING TO HER...
            </span>
          </motion.div>
        </div>
      )}

      {/* STAGE 3: Reaches Girl's Bedroom Window */}
      {stage === 'arriving' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-center z-10"
        >
          <div className="relative mb-3">
            <GirlSprite size="md" emotion="shocked" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10 }}
              className="absolute -top-3 -right-2 p-1.5 bg-amber-300 rounded-full border border-[#3b1d32] shadow-[0_0_12px_#fde047]"
            >
              <Sparkles className="w-4 h-4 text-[#3b1d32]" />
            </motion.div>
          </div>

          <span className="font-['Silkscreen'] text-xs text-rose-300 font-bold mb-1">
            ARRIVED AT HER WINDOW ♡
          </span>
          <p className="font-['Fredoka'] text-sm text-pink-100 italic">
            A soft tap at the glass. Her phone screen lights up in the quiet dark.
          </p>
        </motion.div>
      )}

      {/* Skip Button */}
      <button
        onClick={onComplete}
        className="absolute bottom-3 right-4 text-[10px] font-['Silkscreen'] text-gray-400 hover:text-white px-2 py-1 bg-black/30 rounded-lg border border-white/20 transition-all cursor-pointer z-30"
      >
        Skip Animation ➔
      </button>
    </div>
  );
};
