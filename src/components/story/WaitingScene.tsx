import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MessageCircle, Heart, ArrowRight } from 'lucide-react';
import { BoySprite } from '../characters/BoySprite';
import { LunaSprite } from '../characters/LunaSprite';
import { PixelButton } from '../ui/PixelButton';
import { soundManager } from '../audio/SoundManager';
import { CONFESSION_DATA } from '../../data/storyData';
import type { CharacterSettings } from '../../data/characterConfig';

interface WaitingSceneProps {
  settings: CharacterSettings;
  onProceedToAnswer: () => void;
  className?: string;
}

export const WaitingScene: React.FC<WaitingSceneProps> = ({
  settings,
  onProceedToAnswer,
  className = ''
}) => {
  const [subStep, setSubStep] = useState<'typing-dots' | 'response-revealed' | 'boy-relief'>('typing-dots');

  const girlName = settings.girlName || "Her";
  const boyName = settings.boyName || "Him";

  useEffect(() => {
    // Show typing dots for 3 seconds before revealing her response
    const timer = setTimeout(() => {
      soundManager.playHomeChime();
      setSubStep('response-revealed');
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative w-full max-w-xl mx-auto flex flex-col items-center select-none ${className}`}>
      {/* Boy Waiting in Bedroom at Night */}
      <div className="relative w-full h-72 sm:h-80 rounded-3xl border-4 border-[#3b1d32] shadow-[8px_8px_0px_#3b1d32] overflow-hidden bg-gradient-to-b from-[#1b0d24] via-[#2c143a] to-[#14081c] p-4 flex flex-col justify-between">
        {/* Soft night window */}
        <div className="absolute top-4 left-6 w-36 h-32 rounded-2xl border-2 border-[#4c2960] bg-[#120718] overflow-hidden opacity-80">
          <div className="absolute top-2 right-3 w-5 h-5 bg-amber-100 rounded-full shadow-[0_0_8px_#fde68a]" />
          <div className="absolute top-3 left-4 text-xs">✨</div>
          <div className="absolute bottom-4 right-8 text-[9px]">🌸</div>
        </div>

        {/* Top Info Header */}
        <div className="flex items-center justify-between text-xs font-['Silkscreen'] text-pink-300 z-10">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-black/40 rounded-full border border-pink-400/30">
            <Clock className="w-3.5 h-3.5 text-pink-400" />
            <span>11:02 PM</span>
          </div>
          <span className="text-[10px] text-pink-200/80">SCENE 6.1 — WAITING</span>
        </div>

        {/* Characters: Boy at Desk staring at phone with Luna */}
        <div className="relative z-10 flex items-end justify-center gap-8 mb-2">
          <div className="flex flex-col items-center">
            <BoySprite size="md" emotion={subStep === 'boy-relief' ? "love" : "thinking"} />
            <span className="font-['Silkscreen'] text-[9px] text-pink-300 mt-1">
              {boyName.toUpperCase()}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <LunaSprite size="md" />
            <span className="font-['Silkscreen'] text-[9px] text-purple-300 mt-1">
              LUNA
            </span>
          </div>
        </div>

        {/* Floating Phone Message Overlay */}
        <div className="relative z-20 w-full max-w-md mx-auto bg-white/95 rounded-2xl p-3.5 border-2 border-pink-400 shadow-[0_0_15px_rgba(244,114,182,0.3)] text-[#3b1d32]">
          {subStep === 'typing-dots' && (
            <div className="flex items-center gap-2 py-1">
              <span className="text-xs font-['Silkscreen'] font-bold text-pink-600">
                {girlName} IS TYPING
              </span>
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" />
              </div>
            </div>
          )}

          {subStep !== 'typing-dots' && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between text-[10px] font-['Silkscreen'] text-pink-600">
                  <span className="font-bold flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-pink-500" />
                    MESSAGE FROM {girlName.toUpperCase()}
                  </span>
                  <span className="text-gray-400 font-['Fredoka']">11:03 PM</span>
                </div>

                {/* Confirmed Verbatim Fragment */}
                <div className="p-2.5 bg-pink-50 rounded-xl border border-pink-200">
                  <p className="font-['Fredoka'] text-sm sm:text-base font-bold text-[#be185d]">
                    “{CONFESSION_DATA.girlResponse.confirmedHome}”
                  </p>
                </div>

                {/* Explicitly Paraphrased Authentic Context */}
                <p className="font-['Fredoka'] text-xs text-[#4a2840]/90 leading-relaxed italic bg-purple-50/70 p-2 rounded-xl border border-purple-200/60">
                  {CONFESSION_DATA.girlResponse.contextParaphrase}
                </p>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Narration & Companion Dialogue */}
      <div className="w-full mt-3 bg-[#fffbf2] rounded-3xl p-5 border-4 border-[#3b1d32] shadow-[6px_6px_0px_#3b1d32] text-[#3b1d32]">
        {subStep === 'typing-dots' && (
          <div className="space-y-1">
            <span className="font-['Silkscreen'] text-[10px] text-purple-700 font-bold block">
              NARRATION
            </span>
            <p className="font-['Fredoka'] text-sm sm:text-base font-semibold leading-relaxed">
              “I had finally said everything I was afraid to say. And now... all I could do was hope.”
            </p>
          </div>
        )}

        {subStep === 'response-revealed' && (
          <div className="space-y-2">
            <span className="font-['Silkscreen'] text-[10px] text-pink-600 font-bold block">
              LUNA:
            </span>
            <p className="font-['Fredoka'] text-sm sm:text-base font-semibold text-[#3b1d32]">
              “You're smiling.” 🐾
            </p>
            <span className="font-['Silkscreen'] text-[10px] text-indigo-700 font-bold block mt-2">
              {boyName.toUpperCase()}:
            </span>
            <p className="font-['Fredoka'] text-sm sm:text-base font-semibold text-[#3b1d32]">
              “I think... Wait. I need to make sure.”
            </p>
          </div>
        )}

        {subStep === 'boy-relief' && (
          <div className="space-y-1">
            <span className="font-['Silkscreen'] text-[10px] text-pink-600 font-bold block">
              THE DEFINITIVE QUESTION
            </span>
            <p className="font-['Fredoka'] text-sm sm:text-base font-semibold text-[#3b1d32]">
              There was only one question left to ask.
            </p>
          </div>
        )}

        <div className="mt-4 pt-3 border-t-2 border-pink-100 flex items-center justify-between">
          <span className="text-[10px] font-['Fredoka'] text-gray-400 italic">
            {subStep === 'typing-dots' ? "Waiting for response..." : "The moment of truth"}
          </span>

          {subStep === 'typing-dots' ? (
            <button
              onClick={() => {
                soundManager.playHomeChime();
                setSubStep('response-revealed');
              }}
              className="text-xs font-['Silkscreen'] text-pink-600 hover:text-pink-800 cursor-pointer"
            >
              Skip Wait ➔
            </button>
          ) : subStep === 'response-revealed' ? (
            <PixelButton
              variant="pink"
              size="sm"
              icon={<MessageCircle className="w-4 h-4" />}
              onClick={() => setSubStep('boy-relief')}
            >
              Ask The Question ➔
            </PixelButton>
          ) : (
            <PixelButton
              variant="pink"
              size="sm"
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={onProceedToAnswer}
            >
              The Most Important Moment ➔
            </PixelButton>
          )}
        </div>
      </div>
    </div>
  );
};
