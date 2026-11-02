import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { CONFESSION_DATA } from '../../data/storyData';
import { soundManager } from '../audio/SoundManager';
import type { CharacterSettings } from '../../data/characterConfig';

interface AnswerRevealSceneProps {
  settings: CharacterSettings;
  onRevealComplete: () => void;
  className?: string;
}

export const AnswerRevealScene: React.FC<AnswerRevealSceneProps> = ({
  settings,
  onRevealComplete,
  className = ''
}) => {
  const [hasTappedAnswer, setHasTappedAnswer] = useState(false);
  const [showMagicalLight, setShowMagicalLight] = useState(false);

  const boyName = settings.boyName || "Him";
  const girlName = settings.girlName || "Her";

  const handleTapAnswer = () => {
    soundManager.playHeart();
    setHasTappedAnswer(true);

    // After illuminated pause, start magical pink light expansion
    setTimeout(() => {
      soundManager.playMagicChime();
      setShowMagicalLight(true);

      // Trigger transition to the Grand Celebration
      setTimeout(() => {
        onRevealComplete();
      }, 2400);
    }, 1800);
  };

  return (
    <div className={`fixed inset-0 z-50 bg-[#0d0514]/95 flex flex-col items-center justify-center p-4 select-none overflow-hidden ${className}`}>
      {/* Background Dimmed Starfield */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(244,114,182,0.15)_0%,transparent_75%)]" />
      </div>

      {/* Spotlight Effect focused exclusively on the conversation */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,transparent_60%)]" />

      {/* Main Conversation Box */}
      <div className="relative z-20 w-full max-w-md flex flex-col items-center space-y-6">
        {/* Boyfriend's Question Message Bubble */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="self-end max-w-[85%] bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-3xl rounded-tr-sm border-2 border-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.35)]"
        >
          <div className="text-[10px] font-['Silkscreen'] text-purple-200 mb-1 flex items-center justify-between">
            <span>{boyName.toUpperCase()}</span>
            <span className="font-['Fredoka']">11:04 PM</span>
          </div>

          <p className="font-['Fredoka'] text-lg sm:text-xl font-bold tracking-wide">
            “{CONFESSION_DATA.boyQuestion}”
          </p>
        </motion.div>

        {/* CTA Tap Button (Before Reveal) */}
        {!hasTappedAnswer && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center gap-2 pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTapAnswer}
              className="px-6 py-3.5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-['Silkscreen'] text-xs sm:text-sm font-bold rounded-2xl border-3 border-white shadow-[0_0_25px_#f472b6] animate-pulse flex items-center gap-2 cursor-pointer ring-4 ring-pink-400/40"
            >
              <Heart className="w-4 h-4 fill-white" />
              See her answer ♡
            </motion.button>
            <span className="text-[11px] font-['Fredoka'] text-pink-200/80 italic">
              Tap to reveal the two words that changed everything
            </span>
          </motion.div>
        )}

        {/* Her Answer Message Bubble (After Reveal) */}
        <AnimatePresence>
          {hasTappedAnswer && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 14 }}
              className="self-start max-w-[90%] bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50 text-[#3b1d32] p-5 sm:p-6 rounded-3xl rounded-tl-sm border-4 border-pink-400 shadow-[0_0_35px_rgba(244,114,182,0.8)] relative"
            >
              <div className="text-[10px] font-['Silkscreen'] text-pink-600 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1 font-bold">
                  <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                  {girlName.toUpperCase()}
                </span>
                <span className="font-['Fredoka'] font-normal text-gray-400">11:05 PM</span>
              </div>

              {/* THE ILLUMINATED WORDS */}
              <div className="py-2 flex items-center gap-3">
                <h2 className="font-['Silkscreen'] text-2xl sm:text-4xl font-black text-[#be185d] tracking-wider filter drop-shadow-[0_2px_10px_rgba(244,114,182,0.8)]">
                  “{CONFESSION_DATA.girlAnswer}”
                </h2>
                <span className="text-2xl sm:text-3xl animate-bounce">
                  {CONFESSION_DATA.girlAnswerEmoji}
                </span>
              </div>

              {/* Rising Glowing Heart */}
              <motion.div
                initial={{ y: 0, opacity: 0, scale: 0.5 }}
                animate={{ y: -50, opacity: [0, 1, 1], scale: [0.5, 1.4, 2] }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
                className="absolute -top-4 right-6 text-pink-500 pointer-events-none"
              >
                <Heart className="w-8 h-8 fill-pink-500 text-pink-400 filter drop-shadow-[0_0_15px_#f472b6]" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Expanding Magical Pink Light that fills the screen */}
      <AnimatePresence>
        {showMagicalLight && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 4, 15], opacity: [0, 0.8, 1] }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
          >
            <div className="w-64 h-64 rounded-full bg-gradient-to-r from-pink-300 via-rose-200 to-pink-100 filter blur-xl shadow-[0_0_150px_#f472b6]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip pause button */}
      {hasTappedAnswer && !showMagicalLight && (
        <button
          onClick={() => {
            soundManager.playMagicChime();
            onRevealComplete();
          }}
          className="absolute bottom-6 text-xs font-['Fredoka'] text-pink-300/70 hover:text-white flex items-center gap-1 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" /> Skip Pause
        </button>
      )}
    </div>
  );
};
