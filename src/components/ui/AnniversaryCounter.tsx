import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar } from 'lucide-react';
import { getDaysTogether } from '../../data/characterConfig';

interface AnniversaryCounterProps {
  startDate: string;
  onOpenSettings: () => void;
  className?: string;
}

export const AnniversaryCounter: React.FC<AnniversaryCounterProps> = ({
  startDate,
  onOpenSettings,
  className = ''
}) => {
  const days = getDaysTogether(startDate);

  if (days !== null) {
    return (
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={onOpenSettings}
        title="Tap to edit anniversary date"
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/95 backdrop-blur-sm rounded-full border-2 border-pink-400 shadow-[2px_2px_0px_#f472b6] cursor-pointer group ${className}`}
      >
        <motion.div
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
        </motion.div>

        <div className="flex flex-col text-left">
          <span className="font-['Silkscreen'] text-xs text-[#be185d] font-bold leading-tight">
            {days} DAYS TOGETHER ♡
          </span>
          <span className="font-['Fredoka'] text-[9px] text-pink-700/80 leading-tight">
            Since our little universe began
          </span>
        </div>
      </motion.div>
    );
  }

  // Tasteful setup placeholder when date has not been entered yet
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onOpenSettings}
      className={`inline-flex items-center gap-1.5 px-3 py-1 bg-white/85 hover:bg-white rounded-full border-2 border-pink-300 text-pink-700 font-['Silkscreen'] text-[11px] shadow-sm transition-all cursor-pointer ${className}`}
    >
      <Calendar className="w-3.5 h-3.5 text-pink-500" />
      <span>SET ANNIVERSARY DATE ♡</span>
    </motion.button>
  );
};
