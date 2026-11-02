import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Play, BookOpen, Settings } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PixelSky } from '../components/scenery/PixelSky';
import { CherryBlossomTree } from '../components/scenery/CherryBlossomTree';
import { FloatingPetals } from '../components/scenery/FloatingPetals';
import { MeadowGround } from '../components/scenery/MeadowGround';
import { BoySprite } from '../components/characters/BoySprite';
import { GirlSprite } from '../components/characters/GirlSprite';
import { PinkieSprite } from '../components/characters/PinkieSprite';
import { LunaSprite } from '../components/characters/LunaSprite';
import { PixelButton } from '../components/ui/PixelButton';
import { AudioControls } from '../components/ui/AudioControls';
import { soundManager } from '../components/audio/SoundManager';
import { type CharacterSettings } from '../data/characterConfig';
import { AnniversaryCounter } from '../components/ui/AnniversaryCounter';

interface LandingSceneProps {
  settings: CharacterSettings;
  onStartStory: () => void;
  onOpenChapterNav: () => void;
  onOpenSettings: () => void;
  onOpenMemoryBook: () => void;
  onOpenSecretPromise: () => void;
  onOpenWorld?: () => void;
}

export const LandingScene: React.FC<LandingSceneProps> = ({
  settings,
  onStartStory,
  onOpenChapterNav,
  onOpenSettings,
  onOpenMemoryBook,
  onOpenSecretPromise,
  onOpenWorld
}) => {
  const handleTitleClick = () => {
    soundManager.playHeart();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.25 },
      colors: ['#f472b6', '#fbcfe8', '#e9d5ff', '#fef08a']
    });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between select-none">
      {/* Dynamic Pixel Scenery Background */}
      <PixelSky />
      <FloatingPetals count={26} />

      {/* Cherry Blossom Tree Layer (positioned to right/center on meadow) */}
      <div className="absolute -bottom-8 right-0 sm:right-6 md:right-16 w-72 sm:w-96 md:w-[480px] z-10 pointer-events-none opacity-95">
        <CherryBlossomTree />
      </div>

      {/* Secret Clickable Heart on Cherry Blossom Tree */}
      <button
        onClick={() => {
          soundManager.playPaperRustle();
          onOpenSecretPromise();
        }}
        title="A secret promise is hidden here... ♡"
        aria-label="Secret Promise Letter"
        className="absolute bottom-48 sm:bottom-64 right-8 sm:right-28 md:right-40 z-20 p-2 bg-pink-400/90 hover:bg-pink-500 rounded-full border-2 border-white shadow-[0_0_12px_#f472b6] animate-bounce cursor-pointer group"
      >
        <Heart className="w-3.5 h-3.5 fill-white text-white group-hover:scale-125 transition-transform" />
        <span className="sr-only">Secret Promise</span>
      </button>

      <MeadowGround />

      {/* Top Header Controls Bar */}
      <header className="relative z-30 p-4 sm:p-6 flex items-center justify-between">
        {/* Dynamic Anniversary Counter */}
        <AnniversaryCounter
          startDate={settings.relationshipStartDate}
          onOpenSettings={onOpenSettings}
        />

        {/* Right Action Icons: Audio Toggle & Settings */}
        <div className="flex items-center gap-2 sm:gap-3">
          <AudioControls />

          <button
            onClick={onOpenSettings}
            aria-label="Customize names and relationship settings"
            className="p-2 sm:px-3 sm:py-2 bg-white/85 hover:bg-white rounded-2xl border-2 border-[#3b1d32] shadow-[3px_3px_0px_#3b1d32] font-['Silkscreen'] text-xs text-[#3b1d32] flex items-center gap-1.5 transition-all active:translate-y-0.5 cursor-pointer"
          >
            <Settings className="w-4 h-4 text-pink-600" />
            <span className="hidden sm:inline">CUSTOMIZE</span>
          </button>
        </div>
      </header>

      {/* Hero Title & Subtitle Card */}
      <main className="relative z-30 flex flex-col items-center text-center px-4 pt-2 sm:pt-4 max-w-2xl mx-auto">
        {/* Clickable Heart Stamp Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          onClick={handleTitleClick}
          className="cursor-pointer group inline-block"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-2 bg-pink-100/90 rounded-full border-2 border-pink-300 text-pink-600 text-xs font-['Silkscreen'] shadow-sm group-hover:scale-105 transition-transform">
            <Heart className="w-3.5 h-3.5 fill-pink-500" />
            <span>TAP FOR LOVE PARTICLES</span>
            <Heart className="w-3.5 h-3.5 fill-pink-500" />
          </div>

          <h1 className="font-['Silkscreen'] text-2xl sm:text-4xl md:text-5xl font-black text-[#3b1d32] tracking-wider filter drop-shadow-[0_4px_0px_rgba(244,114,182,0.8)] leading-tight">
            Our Little Universe ♡
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-['Fredoka'] text-sm sm:text-lg text-[#4a2840] font-medium max-w-lg mt-2 sm:mt-3 px-4 py-1.5 bg-white/75 backdrop-blur-sm rounded-2xl border border-pink-200/80 shadow-sm"
        >
          A little story about how you became my favorite person.
        </motion.p>

        {/* Main CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-3"
        >
          {/* Start Our Story Primary Button */}
          <PixelButton
            variant="pink"
            size="lg"
            icon={<Play className="w-5 h-5 fill-white" />}
            onClick={onStartStory}
            className="animate-pulse shadow-[0_6px_0px_#9d174d] hover:shadow-[0_8px_0px_#9d174d] ring-4 ring-pink-300/40 text-sm sm:text-base"
          >
            Start Our Story
          </PixelButton>

          {/* Enter Our Little World Button */}
          {onOpenWorld && (
            <PixelButton
              variant="purple"
              size="lg"
              icon={<Heart className="w-5 h-5 fill-pink-300 text-pink-300" />}
              onClick={() => {
                soundManager.playHeart();
                onOpenWorld();
              }}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 text-white shadow-[0_6px_0px_#4c1d95] hover:shadow-[0_8px_0px_#4c1d95] ring-2 ring-purple-300/60 text-sm sm:text-base"
            >
              Our World ♡
            </PixelButton>
          )}

          {/* Chapter Navigation Modal Trigger */}
          <PixelButton
            variant="cream"
            size="lg"
            icon={<BookOpen className="w-5 h-5 text-purple-600" />}
            onClick={onOpenChapterNav}
            className="text-sm sm:text-base border-[#3b1d32]"
          >
            Chapters
          </PixelButton>

          {/* Memory Book Scrapbook Trigger */}
          <PixelButton
            variant="purple"
            size="lg"
            icon={<BookOpen className="w-5 h-5 text-purple-200" />}
            onClick={onOpenMemoryBook}
            className="text-sm sm:text-base border-[#3b1d32]"
          >
            Memory Book
          </PixelButton>
        </motion.div>

        {/* Characters subtitle hint */}
        <p className="mt-3 text-xs font-['Fredoka'] text-[#4a2840]/75 bg-pink-50/60 px-3 py-1 rounded-full border border-pink-200">
          Featuring: <strong>{settings.boyName}</strong>, <strong>{settings.girlName}</strong>, and their pets <strong>Pinkie</strong> 🐾 & <strong>Luna</strong> 🌙
        </p>
      </main>

      {/* Bottom Interactive Meadow Stage */}
      <footer className="relative z-20 pb-4 sm:pb-8 flex flex-col items-center justify-end">
        {/* Interactive Character lineup */}
        <div className="relative flex items-end justify-center gap-3 sm:gap-8 md:gap-14 px-4 w-full max-w-3xl">
          {/* Luna the Mischievous Kitten (HIS pet) */}
          <div className="relative group flex flex-col items-center">
            <LunaSprite size="md" />
            <span className="mt-1 font-['Silkscreen'] text-[10px] text-purple-800 font-bold bg-white/90 px-2 py-0.5 rounded-full border border-purple-300 shadow-sm">
              Luna 🌙
            </span>
          </div>

          {/* Boy Chibi Character */}
          <div className="relative flex flex-col items-center">
            <BoySprite size="lg" emotion="shy" />
            <span className="mt-1 font-['Silkscreen'] text-[11px] text-[#3b1d32] font-bold bg-indigo-100/90 px-2.5 py-0.5 rounded-full border border-indigo-300 shadow-sm">
              {settings.boyName} 🌸
            </span>
          </div>

          {/* Girl Chibi Character */}
          <div className="relative flex flex-col items-center">
            <GirlSprite size="lg" emotion="laugh" />
            <span className="mt-1 font-['Silkscreen'] text-[11px] text-[#be185d] font-bold bg-pink-100/90 px-2.5 py-0.5 rounded-full border border-pink-300 shadow-sm">
              {settings.girlName} ✨
            </span>
          </div>

          {/* Pinkie the Fluffy Puppy (HER pet) */}
          <div className="relative group flex flex-col items-center">
            <PinkieSprite size="md" />
            <span className="mt-1 font-['Silkscreen'] text-[10px] text-pink-700 font-bold bg-white/90 px-2 py-0.5 rounded-full border border-pink-300 shadow-sm">
              Pinkie 🐾
            </span>
          </div>
        </div>

        {/* Cozy bottom footer note */}
        <div className="mt-4 text-center">
          <span className="font-['Fredoka'] text-[11px] sm:text-xs text-[#3b1d32]/70 bg-white/60 backdrop-blur-sm px-4 py-1 rounded-full border border-pink-200">
            Tip: Tap Pinkie 🐾 or Luna 🌙 to pet them! • Keyboard & Touch Accessible
          </span>
        </div>
      </footer>
    </div>
  );
};
