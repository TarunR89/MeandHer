import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sparkles, MailOpen } from 'lucide-react';
import { SECRET_PROMISE_DATA } from '../../data/storyData';
import { soundManager } from '../audio/SoundManager';

interface SecretPromiseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecretPromiseModal: React.FC<SecretPromiseModalProps> = ({ isOpen, onClose }) => {
  const [isOpenEnvelope, setIsOpenEnvelope] = useState(true);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 20 }}
          className="relative max-w-lg w-full bg-[#fffcf7] rounded-3xl border-4 border-[#3b1d32] shadow-[8px_8px_0px_#3b1d32] overflow-hidden flex flex-col"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-pink-300 via-rose-300 to-amber-200 px-5 py-3.5 border-b-3 border-[#3b1d32] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-white/80 rounded-xl border border-[#3b1d32] text-pink-600">
                <Heart className="w-4 h-4 fill-pink-500" />
              </span>
              <div>
                <h3 className="font-['Silkscreen'] text-sm sm:text-base font-bold text-[#3b1d32]">
                  {SECRET_PROMISE_DATA.title}
                </h3>
                <span className="text-[10px] font-['Fredoka'] text-[#3b1d32]/80">
                  Hidden behind the cherry blossom tree
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close letter"
              className="p-1.5 bg-white rounded-full border-2 border-[#3b1d32] hover:bg-pink-100 active:scale-95 transition-transform cursor-pointer"
            >
              <X className="w-4 h-4 text-[#3b1d32]" />
            </button>
          </div>

          {/* Letter Body Area */}
          <div className="p-5 sm:p-6 max-h-[70vh] overflow-y-auto space-y-4 bg-[radial-gradient(#fbcfe8_1px,transparent_1px)] [background-size:16px_16px]">
            {/* Interactive Heart Envelope Flap Toggle */}
            <div className="flex justify-center mb-1">
              <button
                onClick={() => {
                  soundManager.playPaperRustle();
                  setIsOpenEnvelope(prev => !prev);
                }}
                className="px-3 py-1 bg-pink-100 hover:bg-pink-200 rounded-full border border-pink-300 text-[10px] font-['Silkscreen'] text-pink-700 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <MailOpen className="w-3.5 h-3.5" />
                {isOpenEnvelope ? "Fold Letter" : "Unfold Letter"}
              </button>
            </div>

            <AnimatePresence>
              {isOpenEnvelope ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-[#fef9f2] p-5 rounded-2xl border-2 border-pink-300 shadow-sm space-y-3 font-['Fredoka'] text-sm sm:text-base text-[#4a2840] leading-relaxed"
                >
                  <p className="font-bold text-pink-700 font-['Silkscreen'] text-xs sm:text-sm">
                    {SECRET_PROMISE_DATA.salutation}
                  </p>

                  {SECRET_PROMISE_DATA.bodyParagraphs.map((para, idx) => (
                    <p key={idx} className="whitespace-pre-line">
                      {para}
                    </p>
                  ))}

                  <div className="pt-2 text-right">
                    <span className="font-['Silkscreen'] text-base text-rose-500 font-bold block">
                      {SECRET_PROMISE_DATA.signoff}
                    </span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-2"
                >
                  <div className="w-16 h-16 bg-pink-200 rounded-2xl border-2 border-[#3b1d32] shadow-[3px_3px_0px_#3b1d32] flex items-center justify-center">
                    <Heart className="w-8 h-8 fill-pink-500 text-pink-500 animate-pulse" />
                  </div>
                  <p className="font-['Silkscreen'] text-xs text-pink-600 font-bold">
                    LETTER SEALED WITH LOVE ♡
                  </p>
                  <p className="font-['Fredoka'] text-xs text-gray-500">
                    Tap the button above to unfold again.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="p-3 bg-pink-50/70 border-t-2 border-pink-200 flex items-center justify-between text-[11px] font-['Fredoka'] text-pink-700">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Permanent Secret Collectible
            </span>
            <button
              onClick={onClose}
              className="px-3 py-1 bg-white hover:bg-pink-100 rounded-xl border border-pink-300 font-['Silkscreen'] text-[10px] text-[#3b1d32] cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
