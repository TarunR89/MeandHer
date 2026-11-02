import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Eye, Sparkles, Heart, FastForward, Clock } from 'lucide-react';
import { CONFESSION_DATA } from '../../data/storyData';
import { soundManager } from '../audio/SoundManager';
import type { CharacterSettings } from '../../data/characterConfig';

interface UnsentMessageSceneProps {
  settings: CharacterSettings;
  onSendMessage: () => void;
  className?: string;
}

export const UnsentMessageScene: React.FC<UnsentMessageSceneProps> = ({
  settings,
  onSendMessage,
  className = ''
}) => {
  const [revealMode, setRevealMode] = useState<'normal' | 'gradual'>('normal');
  const [revealedChars, setRevealedChars] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const girlName = settings.girlName || "Her";

  // Build the message paragraphs cleanly
  const messageParagraphs = [
    CONFESSION_DATA.customFullConfession
      ? CONFESSION_DATA.customFullConfession
      : `Hey ${girlName}...`,
    !CONFESSION_DATA.customFullConfession &&
      "I've rewritten this message a dozen times tonight. My hands are literally shaking while typing this.",
    !CONFESSION_DATA.customFullConfession &&
      `“${CONFESSION_DATA.confirmedFragments.takingStep}.”`,
    !CONFESSION_DATA.customFullConfession &&
      "I've been terrified that telling you how I feel might make things awkward or make you pull away. But keeping it to myself feels impossible now.",
    !CONFESSION_DATA.customFullConfession &&
      `“${CONFESSION_DATA.confirmedFragments.seenHeardUnderstood}.”`,
    !CONFESSION_DATA.customFullConfession &&
      "Whatever happens next, I just needed you to know the truth. You've become my favorite person."
  ].filter(Boolean) as string[];

  const fullText = messageParagraphs.join("\n\n");

  useEffect(() => {
    if (revealMode !== 'gradual') return;

    const interval = setInterval(() => {
      setRevealedChars((prev) => {
        if (prev >= fullText.length) {
          clearInterval(interval);
          setIsTyping(false);
          return fullText.length;
        }
        if (prev % 12 === 0) soundManager.playBlip();
        return prev + 3;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [revealMode, fullText.length]);

  const handleSkipReveal = () => {
    setRevealedChars(fullText.length);
    setIsTyping(false);
  };

  const displayText = fullText.slice(0, revealedChars);

  return (
    <div className={`relative w-full max-w-xl mx-auto flex flex-col items-center select-none ${className}`}>
      {/* Top Narration Context Card */}
      <div className="w-full mb-3 px-4 py-2.5 bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-pink-300 shadow-[2px_2px_0px_#f472b6] text-center">
        <span className="font-['Silkscreen'] text-[9px] text-pink-600 font-bold block mb-0.5">
          SCENE 5.2 — THE UNSENT MESSAGE • 11:00 PM
        </span>
        <p className="font-['Fredoka'] text-xs sm:text-sm text-[#3b1d32] font-semibold italic">
          “I tried finding the perfect words. But there weren't any. So I decided to give you the real ones.”
        </p>
      </div>

      {/* Mobile Device Mockup Container */}
      <div className="w-full bg-[#2a1329] p-3 sm:p-4 rounded-3xl border-4 border-[#3b1d32] shadow-[8px_8px_0px_#3b1d32] relative overflow-hidden">
        {/* Soft screen glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 via-transparent to-pink-400/10 pointer-events-none" />

        {/* Device Status Bar */}
        <div className="flex items-center justify-between text-[10px] text-pink-200/70 font-['Silkscreen'] px-2 pb-2 border-b border-pink-500/20">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-pink-400" />
            <span>11:00 PM</span>
          </div>
          <div className="flex items-center gap-1 text-[9px]">
            <span>TO:</span>
            <span className="text-pink-300 font-bold">{girlName} ♡</span>
          </div>
          <div className="text-[9px] text-pink-400 font-bold">DRAFT</div>
        </div>

        {/* View Mode Controls: Read Normally / Reveal Gradually / Skip */}
        <div className="flex items-center justify-between gap-2 my-2.5 px-1">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                soundManager.playClick();
                setRevealMode('normal');
              }}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-['Silkscreen'] border transition-all cursor-pointer ${
                revealMode === 'normal'
                  ? 'bg-pink-400 text-white border-pink-200 shadow-sm'
                  : 'bg-white/10 text-pink-200 border-white/20 hover:bg-white/20'
              }`}
            >
              <Eye className="w-3 h-3 inline mr-1" /> Read All
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setRevealMode('gradual');
              }}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-['Silkscreen'] border transition-all cursor-pointer ${
                revealMode === 'gradual'
                  ? 'bg-pink-400 text-white border-pink-200 shadow-sm'
                  : 'bg-white/10 text-pink-200 border-white/20 hover:bg-white/20'
              }`}
            >
              <Sparkles className="w-3 h-3 inline mr-1" /> Typewriter
            </button>
          </div>

          {isTyping && (
            <button
              onClick={handleSkipReveal}
              className="text-[10px] font-['Fredoka'] text-pink-300 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <FastForward className="w-3 h-3" /> Skip
            </button>
          )}
        </div>

        {/* Message Bubble Box */}
        <div className="relative min-h-[180px] max-h-[300px] overflow-y-auto bg-gradient-to-b from-[#fdf2f8] to-[#fff1f2] rounded-2xl p-4 border-2 border-pink-400/80 shadow-inner">
          <div className="space-y-3 font-['Fredoka'] text-sm sm:text-base text-[#3b1d32] leading-relaxed whitespace-pre-line">
            {displayText}
            {isTyping && (
              <span className="inline-block w-2 h-4 ml-1 bg-pink-500 animate-pulse align-middle" />
            )}
          </div>

          {/* Confirmed Real Lines Tag */}
          <div className="mt-4 pt-3 border-t border-pink-200 flex items-center justify-between text-[10px] font-['Silkscreen'] text-pink-600">
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3 fill-pink-500 text-pink-500" />
              CONFIRMED ORIGINAL SENTIMENTS
            </span>
            <span className="text-gray-400 italic font-['Fredoka']">Unsent Draft</span>
          </div>
        </div>

        {/* Big Glowing Send Button (Scene 5.3) */}
        <div className="mt-4 pt-2 flex flex-col items-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              soundManager.playPaperRustle();
              onSendMessage();
            }}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 hover:from-pink-600 hover:to-rose-600 text-white font-['Silkscreen'] text-xs sm:text-sm font-bold rounded-2xl border-3 border-[#3b1d32] shadow-[4px_4px_0px_#3b1d32] flex items-center justify-center gap-2.5 transition-all cursor-pointer animate-pulse ring-4 ring-pink-400/30"
          >
            <Send className="w-4 h-4 fill-white" />
            SEND THE MESSAGE ♡
          </motion.button>

          <span className="text-[10px] font-['Fredoka'] text-pink-300/80 mt-2 text-center">
            Takes a deep breath. No turning back now.
          </span>
        </div>
      </div>
    </div>
  );
};
