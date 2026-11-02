import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, Home } from 'lucide-react';
import { BoySprite } from '../characters/BoySprite';
import { GirlSprite } from '../characters/GirlSprite';
import { PinkieSprite } from '../characters/PinkieSprite';
import { LunaSprite } from '../characters/LunaSprite';
import { soundManager } from '../audio/SoundManager';
import { PixelButton } from '../ui/PixelButton';
import type { CharacterSettings } from '../../data/characterConfig';

interface MoonlightRealizationSceneProps {
  settings: CharacterSettings;
  onFinishChapter4: () => void;
  onBackToLanding: () => void;
}

type SubStage = 'hilltop-narration' | 'constellation' | 'clock-confession-teaser';

export const MoonlightRealizationScene: React.FC<MoonlightRealizationSceneProps> = ({
  settings,
  onFinishChapter4,
  onBackToLanding
}) => {
  const [subStage, setSubStage] = useState<SubStage>('hilltop-narration');
  const [narrativeIndex, setNarrativeIndex] = useState(0);
  const [clockTime, setClockTime] = useState("10:59 PM");
  const [teaserStep, setTeaserStep] = useState(0);

  const hilltopLines = [
    "I didn't plan on falling for you.",
    "I wasn't looking for some perfect love story.",
    "And I definitely didn't expect it to start with a conversation about a trend we both hated.",
    "But then there was your smile.",
    "Your eyes.",
    "The way you understood me.",
    "The way being around you felt so natural.",
    "And suddenly...",
    "You weren't just someone I loved talking to.",
    "You were someone I was falling for."
  ];

  const handleNextHilltopLine = () => {
    soundManager.playClick();
    if (narrativeIndex < hilltopLines.length - 1) {
      setNarrativeIndex(prev => prev + 1);
    } else {
      soundManager.playConstellation();
      setSubStage('constellation');
    }
  };

  const handleGoToConfessionTeaser = () => {
    soundManager.playClick();
    setSubStage('clock-confession-teaser');
    // After 2.5 seconds, advance clock to 11:00 PM with clock tick!
    setTimeout(() => {
      soundManager.playClockTick();
      setClockTime("11:00 PM");
      setTeaserStep(1);
    }, 2500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto select-none">
      {/* 1. HILLTOP MOONLIGHT SCENE */}
      {subStage === 'hilltop-narration' && (
        <div className="space-y-4">
          {/* Hilltop Graphic */}
          <div className="relative w-full h-72 sm:h-80 rounded-3xl border-4 border-[#3b1d32] shadow-[8px_8px_0px_#3b1d32] overflow-hidden bg-gradient-to-b from-[#1e1035] via-[#2e1548] to-[#120824] flex flex-col justify-between p-4">
            {/* Huge Lavender Moon */}
            <div className="absolute top-4 right-8 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#e9d5ff] to-[#fbcfe8] shadow-[0_0_30px_#e9d5ff] flex items-center justify-center pointer-events-none">
              <div className="w-20 h-20 rounded-full bg-[#fdf2f8]/40" />
            </div>

            {/* Twinkling Stars */}
            <div className="absolute inset-0 pointer-events-none">
              {[
                { x: '12%', y: '20%' },
                { x: '25%', y: '10%' },
                { x: '45%', y: '30%' },
                { x: '70%', y: '40%' }
              ].map((s, idx) => (
                <div
                  key={idx}
                  style={{ left: s.x, top: s.y }}
                  className="absolute text-yellow-100 text-xs animate-ping"
                >
                  ✦
                </div>
              ))}
            </div>

            {/* Hilltop Crest */}
            <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#090314] to-[#25103a] rounded-t-[50%] border-t-2 border-[#582b75]" />

            {/* Characters on Hilltop */}
            <div className="relative z-10 flex items-end justify-center gap-6 pb-2 mt-auto">
              <div className="pb-1">
                <LunaSprite size="sm" showSpeechBubble={false} />
              </div>
              <BoySprite size="md" emotion="love" />
              <GirlSprite size="md" emotion="happy" />
              <div className="pb-1">
                <PinkieSprite size="sm" showSpeechBubble={false} />
              </div>
            </div>
          </div>

          {/* Stepped Dialogue Box */}
          <div className="w-full bg-[#fffdfa] rounded-3xl p-5 border-4 border-[#3b1d32] shadow-[6px_6px_0px_#3b1d32]">
            <div className="min-h-[75px] flex flex-col items-center justify-center text-center">
              <span className="font-['Silkscreen'] text-[9px] text-purple-700 font-bold mb-1">
                AND THEN I REALIZED...
              </span>
              <p className="font-['Fredoka'] text-base sm:text-lg text-[#3b1d32] font-semibold leading-relaxed">
                “{hilltopLines[narrativeIndex]}”
              </p>
            </div>

            <div className="mt-4 pt-3 border-t-2 border-pink-100 flex items-center justify-between">
              <span className="text-[10px] font-['Silkscreen'] text-gray-400">
                LINE {narrativeIndex + 1} OF {hilltopLines.length}
              </span>

              <PixelButton
                variant="pink"
                size="sm"
                onClick={handleNextHilltopLine}
              >
                {narrativeIndex < hilltopLines.length - 1 ? "Continue ➔" : "Look Into The Sky ✨"}
              </PixelButton>
            </div>
          </div>
        </div>
      )}

      {/* 2. CONSTELLATION REVELATION */}
      {subStage === 'constellation' && (
        <div className="space-y-4">
          <div className="relative w-full h-80 rounded-3xl border-4 border-[#3b1d32] shadow-[8px_8px_0px_#3b1d32] overflow-hidden bg-gradient-to-b from-[#120824] via-[#1d0d38] to-[#0a0414] flex flex-col items-center justify-center p-6 text-center">
            {/* Shimmering Constellation Heart in the sky */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="mb-4 relative"
            >
              <div className="w-24 h-24 rounded-full bg-pink-500/20 shadow-[0_0_40px_#ec4899] flex items-center justify-center animate-pulse">
                <Heart className="w-14 h-14 fill-rose-400 text-pink-300 filter drop-shadow-[0_0_12px_#f43f5e]" />
              </div>
              <span className="absolute -top-2 -right-2 text-yellow-200 text-sm animate-ping">✨</span>
              <span className="absolute -bottom-1 -left-2 text-yellow-200 text-sm animate-ping">✦</span>
            </motion.div>

            <h3 className="font-['Silkscreen'] text-sm sm:text-base font-bold text-pink-300 leading-tight">
              “I think my heart figured it out before I did.”
            </h3>

            <p className="font-['Fredoka'] text-xs sm:text-sm text-purple-200 mt-2 max-w-md">
              The feeling was undeniable. It wasn't just another crush—it was someone who made the entire universe make sense.
            </p>

            {/* Pet Whispers */}
            <div className="mt-4 px-4 py-1.5 bg-white/10 rounded-full border border-pink-300/40 text-xs font-['Fredoka'] text-pink-200">
              🐾 <strong>Pinkie:</strong> "Should we tell her?" • 🌙 <strong>Luna:</strong> "He'll get there."
            </div>
          </div>

          <div className="flex justify-center">
            <PixelButton
              variant="pink"
              size="md"
              icon={<Clock className="w-4 h-4 fill-white" />}
              onClick={handleGoToConfessionTeaser}
            >
              Approach 11:00 PM ➔
            </PixelButton>
          </div>
        </div>
      )}

      {/* 3. SECTION 9: 11 PM BEDROOM CONFESSION TEASER */}
      {subStage === 'clock-confession-teaser' && (
        <div className="space-y-4">
          <div className="relative w-full rounded-3xl border-4 border-[#3b1d32] shadow-[8px_8px_0px_#3b1d32] overflow-hidden bg-[#1e132b] p-6 text-center">
            {/* Retro Pixel Digital Clock */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-black/90 rounded-2xl border-3 border-rose-500/80 shadow-[0_0_20px_rgba(244,63,94,0.4)] mb-4">
              <Clock className="w-5 h-5 text-rose-400 animate-pulse" />
              <span className="font-['Silkscreen'] text-xl sm:text-2xl font-bold text-rose-400 tracking-wider">
                {clockTime}
              </span>
            </div>

            {/* Bedroom Narration */}
            <div className="max-w-md mx-auto space-y-3 font-['Fredoka'] text-white">
              <p className="text-base sm:text-lg text-pink-200 font-semibold">
                “I knew how I felt.”
              </p>
              <p className="text-sm text-gray-300 italic">
                “The only question was... would I be brave enough to tell you?”
              </p>

              {teaserStep >= 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 bg-purple-900/60 rounded-2xl border border-purple-400/50 text-xs text-purple-200 space-y-1 mt-4"
                >
                  <p className="font-['Silkscreen'] text-[10px] text-pink-400 font-bold">
                    🌙 LUNA:
                  </p>
                  <p className="italic">“Oh no. {settings.boyName || 'He'}'s typing the paragraph.” 🐾</p>
                </motion.div>
              )}
            </div>

            {/* Fade to Black Teaser Banner */}
            <div className="mt-6 pt-5 border-t border-purple-800 space-y-2">
              <div className="inline-block px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full font-['Silkscreen'] text-xs font-bold border border-pink-400/40">
                TO BE CONTINUED...
              </div>

              <h2 className="font-['Silkscreen'] text-base sm:text-lg font-bold text-white tracking-wide">
                CHAPTER FIVE: THE 11 PM CONFESSION ♡
              </h2>

              <p className="text-xs font-['Fredoka'] text-gray-400">
                The confession and her answer belong in Phase 4.
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <PixelButton
              variant="cream"
              size="sm"
              icon={<Home className="w-4 h-4 text-purple-700" />}
              onClick={onBackToLanding}
            >
              Return Home
            </PixelButton>

            <PixelButton
              variant="pink"
              size="sm"
              onClick={onFinishChapter4}
            >
              Finish Chapter 4 ♡
            </PixelButton>
          </div>
        </div>
      )}
    </div>
  );
};
