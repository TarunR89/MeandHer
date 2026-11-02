import React, { useState } from 'react';
import { Heart, X, MailOpen } from 'lucide-react';
import { LOVE_LETTERS, type LoveLetter } from '../../data/storyData';
import type { CharacterSettings } from '../../data/characterConfig';
import { soundManager } from '../audio/SoundManager';

interface LoveLetterMailboxProps {
  settings: CharacterSettings;
  effectiveIsNight?: boolean;
}

export const LoveLetterMailbox: React.FC<LoveLetterMailboxProps> = ({
  settings,
}) => {
  const [activeLetter, setActiveLetter] = useState<LoveLetter | null>(null);

  const handleOpenLetter = (letter: LoveLetter) => {
    soundManager.playPaperRustle();
    soundManager.playHeart();
    setActiveLetter(letter);
  };

  // Replace placeholders with customized names
  const renderFormattedParagraph = (content: string) => {
    return content
      .replace(/{boyName}/g, settings.boyName)
      .replace(/{girlName}/g, settings.girlName);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border-4 border-rose-300 dark:border-purple-600 shadow-2xl bg-gradient-to-b from-rose-50 via-pink-50 to-purple-50 dark:from-slate-950 dark:via-purple-950 dark:to-pink-950 text-stone-800 dark:text-purple-100 p-4 sm:p-6 select-none transition-colors duration-700">
      {/* Top Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b-2 border-rose-200 dark:border-purple-800">
        <div>
          <h2 className="font-['Silkscreen'] text-base sm:text-lg text-rose-700 dark:text-pink-300 font-bold flex items-center gap-2">
            💌 The Love Letter Mailbox
          </h2>
          <p className="text-xs text-stone-600 dark:text-purple-300">
            Open whenever you need a reminder of how cherished and loved you are
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-purple-900/60 text-rose-800 dark:text-purple-200 text-[10px] font-['Silkscreen'] border border-rose-200 dark:border-purple-700">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
          Always here for you
        </div>
      </div>

      {/* Main Mailbox Display */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Side: Pixel Mailbox Illustration */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-white/70 dark:bg-purple-900/40 rounded-3xl border-2 border-rose-200 dark:border-purple-800 text-center">
          <div className="relative inline-block mb-3">
            {/* Cute Mailbox SVG */}
            <div className="w-24 h-28 relative">
              {/* Mailbox Post */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-12 bg-amber-800 rounded-b-md border border-amber-950" />
              {/* Mailbox Body */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-16 rounded-t-full bg-gradient-to-r from-pink-400 to-rose-400 border-3 border-rose-600 shadow-md flex items-center justify-center">
                <Heart className="w-7 h-7 text-white fill-white animate-pulse" />
              </div>
              {/* Mailbox Red Flag (raised up!) */}
              <div className="absolute top-0 right-0 w-1.5 h-10 bg-stone-700">
                <div className="w-5 h-3 bg-red-500 rounded-xs border border-red-700 absolute -top-1 -right-4 animate-bounce" />
              </div>
            </div>
          </div>
          <div className="font-['Silkscreen'] text-xs text-rose-700 dark:text-pink-300 font-bold">
            Flag is Up! 🚩
          </div>
          <p className="text-[10px] text-stone-500 dark:text-purple-400 font-['Silkscreen'] mt-1">
            3 sealed letters waiting inside for you ♡
          </p>
        </div>

        {/* Right Side: The 3 Letter Envelopes */}
        <div className="md:col-span-8 flex flex-col gap-3">
          {LOVE_LETTERS.map((letter) => (
            <div
              key={letter.id}
              onClick={() => handleOpenLetter(letter)}
              role="button"
              tabIndex={0}
              className="group cursor-pointer p-4 rounded-2xl bg-white/90 dark:bg-purple-900/50 border-2 border-rose-200 dark:border-purple-700 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-10 rounded-xl bg-gradient-to-br from-pink-200 to-rose-300 dark:from-purple-800 dark:to-pink-900 border border-rose-300 dark:border-purple-600 flex items-center justify-center text-lg shadow-xs group-hover:rotate-6 transition-transform">
                  <span>{letter.icon}</span>
                </div>
                <div>
                  <h3 className="font-['Silkscreen'] text-xs sm:text-sm text-rose-700 dark:text-pink-300 font-bold group-hover:text-rose-600">
                    {letter.envelopeTitle}
                  </h3>
                  <p className="text-[10px] text-stone-500 dark:text-purple-400">
                    {letter.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-['Silkscreen'] text-rose-600 dark:text-pink-300 font-bold bg-rose-50 dark:bg-purple-950/70 px-3 py-1.5 rounded-xl border border-rose-200 dark:border-purple-800">
                <MailOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Open</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Letter Reading Modal with Unfolding Paper */}
      {activeLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-gradient-to-b from-amber-50 via-rose-50/50 to-pink-50 rounded-3xl border-4 border-rose-300 shadow-2xl p-6 sm:p-8 text-stone-800 max-h-[85vh] overflow-y-auto scrollbar-thin">
            {/* Wax seal & close */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-dashed border-rose-200 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-rose-500 border-2 border-rose-700 flex items-center justify-center text-white text-xs shadow-sm">
                  ♡
                </div>
                <span className="font-['Silkscreen'] text-xs text-rose-700 font-bold">
                  {activeLetter.envelopeTitle}
                </span>
              </div>
              <button
                onClick={() => {
                  soundManager.playPaperRustle();
                  setActiveLetter(null);
                }}
                className="text-stone-400 hover:text-stone-800 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Letter Header */}
            <div className="font-['Silkscreen'] text-sm text-pink-700 font-bold mb-3">
              {activeLetter.salutation}
            </div>

            {/* Letter Body */}
            <div className="font-serif text-sm sm:text-base leading-relaxed text-stone-800 space-y-3 px-2 sm:px-4 py-2">
              {activeLetter.paragraphs.map((p, idx) => (
                <p key={idx}>{renderFormattedParagraph(p)}</p>
              ))}
            </div>

            {/* Letter Signoff */}
            <div className="mt-4 text-right font-['Silkscreen'] text-xs text-rose-600 font-bold">
              {activeLetter.signoff} — {settings.boyName}
            </div>

            {/* Letter Footer */}
            <div className="mt-6 pt-4 border-t border-rose-200 flex items-center justify-between text-xs font-['Silkscreen'] text-rose-600">
              <div className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>Written with all my heart</span>
              </div>
              <button
                onClick={() => {
                  soundManager.playPaperRustle();
                  setActiveLetter(null);
                }}
                className="px-4 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl shadow-sm transition-all"
              >
                Fold Letter ♡
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
