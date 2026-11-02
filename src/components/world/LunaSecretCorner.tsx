import React, { useState } from 'react';
import { Sparkles, Moon, Crown, MailOpen } from 'lucide-react';
import { LunaSprite } from '../characters/LunaSprite';
import { soundManager } from '../audio/SoundManager';
import {
  type UserProgress,
  unlockLunaApproved,
} from '../../data/progressConfig';

interface LunaSecretCornerProps {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
  effectiveIsNight?: boolean;
}

export const LunaSecretCorner: React.FC<LunaSecretCornerProps> = ({
  progress,
  onUpdateProgress,
}) => {
  const [isToySwung, setIsToySwung] = useState(false);
  const [showSecretNote, setShowSecretNote] = useState(false);
  const [purrBubbles, setPurrBubbles] = useState<{ id: number; text: string }[]>([]);

  const isApproved = progress.isLunaApproved;

  const handlePetLuna = () => {
    soundManager.playPurr();
    soundManager.playHeart();

    const purrs = [
      'Purrrrrr~ (Luna approves of chin scritches) 🌙',
      'Soft motor purr activated! 🐾',
      'Luna makes invisible biscuits on the blanket... ✨',
      'Tiny paw kneads of pure contentment ♡',
    ];
    const newBubble = {
      id: Date.now(),
      text: purrs[Math.floor(Math.random() * purrs.length)],
    };
    setPurrBubbles((prev) => [...prev, newBubble]);
    setTimeout(() => {
      setPurrBubbles((prev) => prev.filter((b) => b.id !== newBubble.id));
    }, 2500);
  };

  const handleJiggleToy = () => {
    soundManager.playMeow();
    soundManager.playPop();
    setIsToySwung(true);
    setTimeout(() => setIsToySwung(false), 800);
  };

  const handleOpenSecretLetter = () => {
    soundManager.playPaperRustle();
    soundManager.playFanfare();
    setShowSecretNote(true);

    if (!isApproved) {
      const updated = unlockLunaApproved();
      onUpdateProgress(updated);
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border-4 border-purple-400 dark:border-purple-600 shadow-2xl bg-gradient-to-b from-purple-100 via-indigo-50 to-purple-200/90 dark:from-slate-950 dark:via-purple-950 dark:to-indigo-950 text-stone-800 dark:text-purple-100 p-4 sm:p-6 select-none transition-colors duration-700">
      {/* Background Star Constellations */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <span className="absolute top-6 left-12 text-lg">✨</span>
        <span className="absolute top-16 right-20 text-sm">⭐</span>
        <span className="absolute bottom-12 left-1/4 text-xs">✨</span>
        <span className="absolute top-1/2 right-1/3 text-sm">🌙</span>
      </div>

      {/* Top Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b-2 border-purple-200 dark:border-purple-800">
        <div>
          <h2 className="font-['Silkscreen'] text-base sm:text-lg text-purple-800 dark:text-purple-300 font-bold flex items-center gap-2">
            🌙 Luna's Secret Velvet Corner
          </h2>
          <p className="text-xs text-stone-600 dark:text-purple-300">
            A dreamy moonlit nook of warm blankets, plush toys, and royal purrs
          </p>
        </div>

        {/* Luna Approval Status */}
        <div className="flex items-center gap-2">
          {isApproved ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-300 via-pink-300 to-purple-300 text-stone-900 font-['Silkscreen'] text-xs font-bold shadow-md animate-pulse">
              <Crown className="w-4 h-4 text-amber-700 fill-amber-500" />
              OFFICIALLY LUNA APPROVED ♡
            </div>
          ) : (
            <div className="text-[10px] font-['Silkscreen'] px-3 py-1 rounded-full bg-purple-200/70 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-700 flex items-center gap-1">
              <Moon className="w-3.5 h-3.5" />
              Find Luna's hidden note...
            </div>
          )}
        </div>
      </div>

      {/* Main Corner View */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Side: Toy Mouse on a String */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-2xl bg-white/70 dark:bg-purple-900/40 border-2 border-purple-200 dark:border-purple-800 shadow-sm text-center">
          <div className="text-xs font-['Silkscreen'] text-purple-700 dark:text-purple-300 font-bold mb-2">
            Catnip Mouse Toy 🐭
          </div>
          <div
            onClick={handleJiggleToy}
            role="button"
            tabIndex={0}
            className={`group cursor-pointer p-4 transition-transform ${
              isToySwung ? 'scale-125 rotate-12' : 'hover:scale-105 active:scale-95'
            }`}
            title="Tap to jiggle mouse toy!"
          >
            {/* String representation */}
            <div className="w-0.5 h-12 bg-purple-400 mx-auto" />
            <div className="w-12 h-8 rounded-full bg-stone-300 border-2 border-stone-500 relative flex items-center justify-center text-xs shadow-md">
              <span className="text-base">🐭</span>
              <div className="absolute -left-2 top-2 w-3 h-1 bg-pink-300 rounded-full rotate-45" />
            </div>
          </div>
          <button
            onClick={handleJiggleToy}
            className="mt-2 px-3 py-1 rounded-xl bg-purple-200 hover:bg-purple-300 dark:bg-purple-800 dark:hover:bg-purple-700 text-purple-900 dark:text-purple-100 font-['Silkscreen'] text-[10px] transition-all"
          >
            Jiggle Toy Mouse! ✨
          </button>
        </div>

        {/* Center: Luna on Crescent Moon Pillow & Blanket */}
        <div className="md:col-span-8 flex flex-col items-center">
          {/* Floating Purr Dialogue */}
          {purrBubbles.map((b) => (
            <div
              key={b.id}
              className="mb-2 px-4 py-1.5 rounded-full bg-white/95 dark:bg-purple-950 text-purple-700 dark:text-pink-300 border-2 border-purple-300 dark:border-purple-600 font-['Silkscreen'] text-xs shadow-md animate-bounce"
            >
              {b.text}
            </div>
          ))}

          {/* Crescent Moon Pillow Platform */}
          <div className="relative w-full max-w-md p-6 rounded-3xl bg-gradient-to-r from-purple-300/80 via-pink-200/80 to-indigo-300/80 dark:from-purple-900/80 dark:via-indigo-950/80 dark:to-purple-950/80 border-3 border-purple-400 dark:border-purple-600 shadow-xl flex flex-col items-center justify-center">
            {/* Luna Cat Sprite in Center */}
            <div className="relative cursor-pointer group py-2" onClick={handlePetLuna}>
              <LunaSprite size="lg" showSpeechBubble={false} />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-purple-900/80 text-white font-['Silkscreen'] text-[8px] px-2 py-0.5 rounded-full shadow pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Tap to give chin scritches ♡
              </div>
            </div>

            {/* Knitted Lavender Blanket with Secret Note peaking out */}
            <div className="relative mt-3 w-full p-3 rounded-2xl bg-purple-400/30 dark:bg-purple-800/40 border border-dashed border-purple-400 flex items-center justify-between">
              <span className="text-[10px] font-['Silkscreen'] text-purple-900 dark:text-purple-200">
                Warm Lavender Blanket 🧶
              </span>

              {/* Secret Note under blanket */}
              <button
                onClick={handleOpenSecretLetter}
                className="group relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-200 to-pink-200 hover:from-amber-300 hover:to-pink-300 text-stone-900 font-['Silkscreen'] text-xs font-bold border-2 border-amber-400 shadow-md transition-all active:scale-95 animate-bounce"
                title="Secret letter hidden under the corner of the blanket!"
              >
                <MailOpen className="w-3.5 h-3.5 text-amber-700" />
                <span>{isApproved ? 'Read Luna’s Decree 👑' : 'Secret Letter?! 💌'}</span>
              </button>
            </div>
          </div>

          {/* Quick Pet Button */}
          <button
            onClick={handlePetLuna}
            className="mt-4 px-5 py-2 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-['Silkscreen'] text-xs font-bold shadow-md transition-all active:scale-95 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-200 animate-spin" />
            Pet Luna & Listen to Purr ♡
          </button>
        </div>
      </div>

      {/* Luna Secret Decree Modal */}
      {showSecretNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-gradient-to-b from-purple-950 via-slate-900 to-indigo-950 text-white rounded-3xl border-4 border-amber-400 shadow-2xl p-6 text-center">
            <Crown className="w-10 h-10 text-amber-400 mx-auto animate-bounce mb-2" />
            <div className="inline-block px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 font-['Silkscreen'] text-[10px] font-bold mb-3 border border-amber-400/40">
              ROYAL FELINE PROCLAMATION
            </div>
            <h3 className="font-['Silkscreen'] text-base text-pink-300 font-bold mb-3">
              OFFICIALLY LUNA APPROVED ♡
            </h3>
            <div className="p-4 bg-white/10 rounded-2xl border border-purple-500/50 mb-4 text-left font-['Silkscreen'] text-xs leading-relaxed text-purple-100">
              <p className="mb-2">"Dear human,"</p>
              <p className="mb-2">
                "I observe everything from my perch. I saw him smile at every text. I saw her laugh at every silly joke."
              </p>
              <p className="mb-2">
                "Therefore, by power vested in me by the High Council of Void Kittens, I officially give my 1000% approval to your love."
              </p>
              <p className="text-amber-300 font-bold">
                "— With love & gentle headbonks, Luna 🐾👑"
              </p>
            </div>
            <button
              onClick={() => {
                soundManager.playClick();
                setShowSecretNote(false);
              }}
              className="w-full py-2 bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-stone-900 rounded-xl font-['Silkscreen'] text-xs font-bold transition-all"
            >
              Thank You Luna! ♡
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
