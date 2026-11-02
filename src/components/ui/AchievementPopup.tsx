import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../audio/SoundManager';
import { PixelButton } from './PixelButton';

interface AchievementPopupProps {
  isOpen: boolean;
  title: string;
  subtitle: string;
  onDismiss: () => void;
}

export const AchievementPopup: React.FC<AchievementPopupProps> = ({
  isOpen,
  title,
  subtitle,
  onDismiss
}) => {
  useEffect(() => {
    if (isOpen) {
      soundManager.playFanfare();
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#f472b6', '#fb7185', '#c084fc', '#fde047']
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.75, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ type: "spring", damping: 15 }}
          className="relative max-w-sm w-full bg-[#fffbf2] rounded-3xl border-4 border-[#3b1d32] shadow-[8px_8px_0px_#3b1d32] p-6 text-center overflow-hidden"
        >
          {/* Decorative Sparkles */}
          <div className="absolute top-3 left-3 text-amber-400">
            <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
          <div className="absolute top-3 right-3 text-pink-400">
            <Heart className="w-5 h-5 fill-pink-300 animate-pulse" />
          </div>

          {/* Trophy Badge */}
          <motion.div
            animate={{ rotate: [0, -6, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-16 h-16 mx-auto mb-3 bg-gradient-to-tr from-amber-300 to-yellow-100 rounded-2xl border-3 border-[#3b1d32] shadow-[3px_3px_0px_#3b1d32] flex items-center justify-center text-amber-700"
          >
            <Trophy className="w-9 h-9" />
          </motion.div>

          <span className="font-['Silkscreen'] text-[10px] text-pink-600 font-bold bg-pink-100 px-3 py-1 rounded-full border border-pink-300">
            ACHIEVEMENT UNLOCKED
          </span>

          <h3 className="font-['Silkscreen'] text-base sm:text-lg font-bold text-[#3b1d32] mt-3 leading-tight">
            {title}
          </h3>

          <p className="font-['Fredoka'] text-sm text-[#4a2840]/90 mt-2 mb-5 font-medium leading-relaxed">
            {subtitle}
          </p>

          <PixelButton
            variant="pink"
            size="md"
            onClick={onDismiss}
            className="w-full"
          >
            Yay! Continue ♡
          </PixelButton>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
