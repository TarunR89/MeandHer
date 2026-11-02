import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface ConnectionMeterProps {
  percentage: number; // 0 to 100
  label?: string;
  className?: string;
}

export const ConnectionMeter: React.FC<ConnectionMeterProps> = ({
  percentage,
  label = "SAME WAVELENGTH",
  className = ""
}) => {
  const clamped = Math.min(100, Math.max(0, percentage));

  return (
    <div className={`w-full max-w-xs bg-white/95 rounded-2xl border-2 border-[#3b1d32] shadow-[3px_3px_0px_#3b1d32] p-2.5 select-none ${className}`}>
      <div className="flex items-center justify-between text-[10px] font-['Silkscreen'] mb-1 text-[#3b1d32]">
        <div className="flex items-center gap-1 text-pink-600 font-bold">
          <Heart className="w-3.5 h-3.5 fill-pink-500 animate-pulse" />
          <span>{label}</span>
        </div>
        <div className="flex items-center gap-1 font-bold text-purple-700">
          <span>{clamped}%</span>
          {clamped >= 100 && <Sparkles className="w-3 h-3 text-amber-500 animate-spin" />}
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full h-3.5 bg-pink-100 rounded-lg border border-[#3b1d32] p-0.5 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-400 via-rose-400 to-purple-500 rounded relative overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Subtle diagonal scan stripes */}
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(255,255,255,0.4)_4px,rgba(255,255,255,0.4)_8px)]" />
        </motion.div>
      </div>

      <p className="text-[9px] font-['Fredoka'] text-gray-500 text-center mt-1">
        * Playful connection meter for dramatic effect ♡
      </p>
    </div>
  );
};
