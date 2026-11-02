import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

interface LoadingScreenProps {
  onLoaded: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(15);
  const [statusMessage, setStatusMessage] = useState('Gathering starry memories...');

  useEffect(() => {
    let current = 15;
    const stages = [
      { at: 35, text: 'Waking up Pinkie & Luna...' },
      { at: 65, text: 'Polishing retro pixel skies...' },
      { at: 88, text: 'Blooming cherry blossoms...' },
      { at: 100, text: 'Welcome to Our Little Universe ♡' },
    ];

    // Real readiness check for document and fonts
    const checkReady = async () => {
      if (document.fonts) {
        try {
          await document.fonts.ready;
        } catch {
          // ignore
        }
      }
    };

    checkReady();

    const timer = setInterval(() => {
      current += Math.floor(Math.random() * 18) + 12;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        setStatusMessage('Welcome to Our Little Universe ♡');
        clearInterval(timer);
        setTimeout(() => {
          onLoaded();
        }, 500);
      } else {
        setProgress(current);
        const stage = stages.find(s => current <= s.at);
        if (stage) {
          setStatusMessage(stage.text);
        }
      }
    }, 120);

    return () => clearInterval(timer);
  }, [onLoaded]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.03 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#fce7f3] via-[#fed7aa] to-[#fbcfe8] select-none overflow-hidden"
      >
        {/* Floating background pixel hearts */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { left: '15%', delay: 0.2, duration: 4 },
            { left: '30%', delay: 1.1, duration: 4.5 },
            { left: '50%', delay: 0.6, duration: 3.8 },
            { left: '72%', delay: 1.8, duration: 4.2 },
            { left: '85%', delay: 0.9, duration: 5 }
          ].map((h, i) => (
            <motion.div
              key={i}
              initial={{ y: '110vh', opacity: 0, scale: 0.8 }}
              animate={{
                y: '-10vh',
                opacity: [0, 0.8, 0.8, 0],
                scale: [0.8, 1.2, 1, 0.9]
              }}
              transition={{
                duration: h.duration,
                repeat: Infinity,
                delay: h.delay,
                ease: 'easeInOut'
              }}
              style={{ left: h.left }}
              className="absolute text-pink-400/60 pixel-art"
            >
              <Heart className="w-8 h-8 fill-pink-300 stroke-pink-500" />
            </motion.div>
          ))}
        </div>

        {/* Central Loading Box */}
        <div className="relative z-10 flex flex-col items-center max-w-sm w-11/12 p-8 bg-white/90 backdrop-blur-md rounded-3xl border-3 border-[#3b1d32] shadow-[6px_6px_0px_#3b1d32] text-center">
          {/* Animated Heart Icon */}
          <motion.div
            animate={{ scale: [1, 1.18, 1], rotate: [0, -3, 3, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-4 p-4 bg-pink-100 rounded-2xl border-2 border-pink-400 text-pink-500 shadow-inner"
          >
            <Sparkles className="w-10 h-10 text-pink-500 animate-spin" style={{ animationDuration: '6s' }} />
          </motion.div>

          <h2 className="font-['Silkscreen'] text-lg sm:text-xl font-bold text-[#4a2840] mb-2 tracking-wide">
            Our Little Universe
          </h2>

          <p className="font-['Fredoka'] text-sm text-pink-600 font-medium mb-6 min-h-[22px]">
            {statusMessage}
          </p>

          {/* Retro Pixel Progress Bar */}
          <div className="w-full bg-pink-100/90 h-6 rounded-lg border-2 border-[#3b1d32] p-0.5 overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-400 to-rose-400 rounded-sm relative overflow-hidden"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.2 }}
            >
              {/* Retro scan stripe on progress fill */}
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_6px,rgba(255,255,255,0.4)_6px,rgba(255,255,255,0.4)_12px)]" />
            </motion.div>
          </div>

          <div className="flex justify-between w-full mt-2 font-['Silkscreen'] text-[11px] text-[#4a2840]/70 font-bold">
            <span>LOADING</span>
            <span>{progress}%</span>
          </div>
        </div>

        {/* Small bottom hint */}
        <p className="mt-6 text-xs font-['Fredoka'] text-[#4a2840]/70 tracking-wider">
          Made with infinite warmth & silly laughs ♡
        </p>
      </motion.div>
    </AnimatePresence>
  );
};
