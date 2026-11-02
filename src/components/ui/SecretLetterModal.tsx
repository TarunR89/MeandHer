import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Mail } from 'lucide-react';
import { soundManager } from '../audio/SoundManager';
import { PixelButton } from './PixelButton';

interface SecretLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecretLetterModal: React.FC<SecretLetterModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative max-w-lg w-full bg-[#fffbf2] rounded-3xl border-4 border-[#3b1d32] shadow-[8px_8px_0px_#3b1d32] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-300 via-rose-300 to-amber-200 px-6 py-4 border-b-3 border-[#3b1d32] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-white/80 rounded-xl border border-[#3b1d32] text-rose-600">
                <Mail className="w-5 h-5" />
              </span>
              <div>
                <span className="font-['Silkscreen'] text-[10px] font-bold text-[#4a2840] tracking-wider block">
                  SECRET ENVELOPE DISCOVERED
                </span>
                <h3 className="font-['Fredoka'] text-base font-bold text-[#3b1d32]">
                  A Letter Kept In The Heart Garden ♡
                </h3>
              </div>
            </div>

            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              aria-label="Close letter"
              className="p-1.5 bg-white rounded-full border-2 border-[#3b1d32] hover:bg-pink-100 active:scale-95 transition-transform cursor-pointer"
            >
              <X className="w-5 h-5 text-[#3b1d32]" />
            </button>
          </div>

          {/* Letter Parchment Body */}
          <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto bg-[repeating-linear-gradient(0deg,#fffdf7,#fffdf7_28px,#fde2e4_29px)] font-['Fredoka'] text-[#3b1d32] text-sm sm:text-base leading-relaxed space-y-4">
            <p className="font-bold text-pink-700 font-['Silkscreen'] text-xs">
              Hey pretty girl,
            </p>

            <p>
              It's funny how something as small as a conversation can change so much.
            </p>

            <p>
              I never expected that someone I met through a screen could make me feel so understood.
            </p>

            <p>
              I love your smile, your eyes, your cheeks, and the confidence that makes you so beautifully yourself.
            </p>

            <p className="font-semibold text-[#be185d]">
              But what made me fall the hardest was your heart.
            </p>

            <p className="italic pl-3 border-l-3 border-pink-400">
              The way you listened to me.<br />
              The way you comforted me.<br />
              The way you made things feel a little lighter without even trying.
            </p>

            <p>
              You probably don't realize how much those little moments meant to me.
            </p>

            <p>
              Somewhere between the jokes, the conversations, and all the things we shared, you became someone incredibly special to me.
            </p>

            <p className="font-bold text-pink-700">
              And I'm really glad it was you.
            </p>

            <div className="flex justify-end pt-2 text-rose-500 font-['Silkscreen'] text-lg">
              ♡
            </div>
          </div>

          {/* Footer Controls */}
          <div className="bg-white/90 p-4 border-t-2 border-pink-200 flex items-center justify-between">
            <span className="font-['Silkscreen'] text-[10px] text-gray-500">
              SAVED IN YOUR UNIVERSE
            </span>
            <PixelButton
              variant="pink"
              size="sm"
              icon={<Heart className="w-4 h-4 fill-white" />}
              onClick={() => {
                soundManager.playHeart();
                onClose();
              }}
            >
              Close & Keep in Heart ♡
            </PixelButton>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
