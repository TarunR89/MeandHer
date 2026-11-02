import React, { useState } from 'react';
import {
  Heart,
  Home,
  Dog,
  Cat,
  Flower2,
  Mail,
  Sparkles,
  ArrowLeft,
  Compass,
} from 'lucide-react';
import {
  type UserProgress,
  type DayNightMode,
  loadUserProgress,
  saveUserProgress,
  updateDayNightPreference,
} from '../data/progressConfig';
import type { CharacterSettings } from '../data/characterConfig';
import { WorldNavigation, type WorldLocationId } from '../components/world/WorldNavigation';
import { WorldAnniversaryDisplay } from '../components/world/WorldAnniversaryDisplay';
import { CottageInterior } from '../components/world/CottageInterior';
import { PinkiePlayground } from '../components/world/PinkiePlayground';
import { LunaSecretCorner } from '../components/world/LunaSecretCorner';
import { MemoryGarden } from '../components/world/MemoryGarden';
import { LoveLetterMailbox } from '../components/world/LoveLetterMailbox';
import { StargazingHill } from '../components/world/StargazingHill';
import { WorldMusicPlayerModal } from '../components/world/WorldMusicPlayerModal';
import { SettingsModal } from '../components/ui/SettingsModal';
import { ChapterNavModal } from '../components/ui/ChapterNavModal';
import { soundManager } from '../components/audio/SoundManager';
import { FloatingPetals } from '../components/scenery/FloatingPetals';

interface OurWorldSceneProps {
  settings: CharacterSettings;
  onUpdateSettings: (settings: CharacterSettings) => void;
  onBackToLanding: () => void;
  onSelectChapter: (chapterId: string) => void;
}

const isNightHour = (): boolean => {
  if (typeof window === 'undefined') return false;
  const h = new Date().getHours();
  return h < 6 || h >= 18;
};

export const OurWorldScene: React.FC<OurWorldSceneProps> = ({
  settings,
  onUpdateSettings,
  onBackToLanding,
  onSelectChapter,
}) => {
  const [progress, setProgress] = useState<UserProgress>(() => loadUserProgress());
  const [currentLocation, setCurrentLocation] = useState<WorldLocationId>('overworld');
  const [dayNightMode, setDayNightMode] = useState<DayNightMode>(
    () => progress.dayNightPreference || 'auto'
  );
  const [isMusicModalOpen, setIsMusicModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isChapterNavOpen, setIsChapterNavOpen] = useState(false);

  // Compute effective day/night status based on mode & real browser clock
  const effectiveIsNight =
    dayNightMode === 'night'
      ? true
      : dayNightMode === 'day'
      ? false
      : isNightHour();

  const handleSelectDayNightMode = (mode: DayNightMode) => {
    setDayNightMode(mode);
    const updated = updateDayNightPreference(mode);
    setProgress(updated);
  };

  const handleUpdateProgress = (updated: UserProgress) => {
    setProgress(updated);
    saveUserProgress(updated);
  };

  const handleReplayChapterNumber = (chapterNum: number) => {
    onSelectChapter(`chapter-${chapterNum}`);
  };

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-1000 ${
        effectiveIsNight
          ? 'bg-gradient-to-b from-slate-950 via-purple-950 to-indigo-950 text-purple-100'
          : 'bg-gradient-to-b from-[#fdf2f8] via-[#fbf7ee] to-[#ecfdf5] text-[#3b1d32]'
      } select-none overflow-x-hidden`}
    >
      {/* Ambient Petals / Fireflies */}
      {!effectiveIsNight ? (
        <FloatingPetals count={18} />
      ) : (
        <div className="fixed inset-0 pointer-events-none z-10">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              style={{
                top: `${(i * 13) % 95}%`,
                left: `${(i * 29) % 95}%`,
                animationDelay: `${(i % 4) * 0.7}s`,
              }}
              className="absolute w-1.5 h-1.5 rounded-full bg-amber-300 opacity-60 animate-ping shadow-[0_0_8px_#fde047]"
            />
          ))}
        </div>
      )}

      {/* Global World Navigation Header */}
      <WorldNavigation
        currentLocation={currentLocation}
        onSelectLocation={(loc) => setCurrentLocation(loc)}
        dayNightMode={dayNightMode}
        effectiveIsNight={effectiveIsNight}
        onSelectDayNightMode={handleSelectDayNightMode}
        onOpenMusicStation={() => setIsMusicModalOpen(true)}
        onOpenStorySelect={() => setIsChapterNavOpen(true)}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        hasLunaApproved={progress.isLunaApproved}
      />

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto p-3 sm:p-6 pb-20 relative z-20">
        {/* Back to Home / Map Breadcrumb */}
        <div className="flex items-center justify-between gap-2 mb-4">
          {currentLocation !== 'overworld' ? (
            <button
              onClick={() => {
                soundManager.playClick();
                setCurrentLocation('overworld');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 dark:bg-purple-900/80 rounded-2xl border-2 border-pink-300 dark:border-purple-600 shadow-sm font-['Silkscreen'] text-xs text-pink-700 dark:text-purple-200 hover:bg-pink-50 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>OVERWORLD MAP</span>
            </button>
          ) : (
            <button
              onClick={() => {
                soundManager.playClick();
                onBackToLanding();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 dark:bg-purple-900/80 rounded-2xl border-2 border-pink-300 dark:border-purple-600 shadow-sm font-['Silkscreen'] text-xs text-pink-700 dark:text-purple-200 hover:bg-pink-50 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>MAIN MENU</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 text-[11px] font-['Silkscreen'] text-pink-600 dark:text-pink-300 bg-pink-100/70 dark:bg-purple-900/60 px-3 py-1 rounded-full border border-pink-200 dark:border-purple-700">
            <Heart className="w-3.5 h-3.5 fill-pink-500" />
            <span>{settings.boyName} & {settings.girlName}'s Forever Universe</span>
          </div>
        </div>

        {/* OVERWORLD MAP VIEW */}
        {currentLocation === 'overworld' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Relationship Anniversary Live Counter */}
            <WorldAnniversaryDisplay
              settings={settings}
              onUpdateSettings={onUpdateSettings}
            />

            {/* Interactive 2D World Map Box */}
            <div className="relative w-full rounded-3xl overflow-hidden border-4 border-pink-300 dark:border-purple-600 shadow-2xl bg-gradient-to-b from-sky-100 via-emerald-50 to-pink-100 dark:from-slate-950 dark:via-purple-950 dark:to-slate-900 p-4 sm:p-8">
              {/* Map Title Header */}
              <div className="flex items-center justify-between mb-4 border-b-2 border-pink-200/80 dark:border-purple-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-pink-200 dark:bg-purple-800 text-pink-700 dark:text-pink-300">
                    <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '30s' }} />
                  </span>
                  <h2 className="font-['Silkscreen'] text-sm sm:text-base text-pink-700 dark:text-pink-300 font-bold">
                    EXPLORE OUR LITTLE WORLD 🗺️
                  </h2>
                </div>
                <span className="text-[10px] font-['Silkscreen'] text-stone-500 dark:text-purple-400">
                  Tap any landmark to visit!
                </span>
              </div>

              {/* The Interactive Map Landscape */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* 1. Cozy Cottage */}
                <div
                  onClick={() => {
                    soundManager.playClick();
                    setCurrentLocation('cottage');
                  }}
                  role="button"
                  tabIndex={0}
                  className="group cursor-pointer p-5 rounded-3xl bg-white/90 dark:bg-purple-900/60 border-3 border-amber-300 dark:border-purple-600 shadow-md hover:shadow-xl hover:scale-[1.03] active:scale-95 transition-all text-left flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/80 border-2 border-amber-300 flex items-center justify-center text-2xl group-hover:rotate-6 transition-transform">
                      🏡
                    </div>
                    <span className="text-[10px] font-['Silkscreen'] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 border border-amber-200">
                      Cozy Home
                    </span>
                  </div>
                  <div>
                    <h3 className="font-['Silkscreen'] text-sm font-bold text-amber-900 dark:text-pink-300 flex items-center gap-1.5">
                      <Home className="w-4 h-4 text-amber-700 dark:text-pink-400" />
                      Our Cottage
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-purple-200 mt-1 leading-relaxed">
                      Sofa hugs, bookshelf memories, retro TV, daily plant watering & warm love.
                    </p>
                  </div>
                  <div className="mt-3 text-[10px] font-['Silkscreen'] text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
                    Enter Living Room →
                  </div>
                </div>

                {/* 2. Pinkie's Sunny Meadow */}
                <div
                  onClick={() => {
                    soundManager.playBark();
                    setCurrentLocation('playground');
                  }}
                  role="button"
                  tabIndex={0}
                  className="group cursor-pointer p-5 rounded-3xl bg-white/90 dark:bg-purple-900/60 border-3 border-pink-300 dark:border-pink-600 shadow-md hover:shadow-xl hover:scale-[1.03] active:scale-95 transition-all text-left flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-pink-100 dark:bg-pink-950/80 border-2 border-pink-300 flex items-center justify-center text-2xl group-hover:bounce transition-transform">
                      🐶
                    </div>
                    <span className="text-[10px] font-['Silkscreen'] px-2 py-0.5 rounded-full bg-pink-100 dark:bg-pink-900/60 text-pink-700 dark:text-pink-200 border border-pink-200">
                      Affection: {progress.pinkieAffection}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-['Silkscreen'] text-sm font-bold text-pink-700 dark:text-pink-300 flex items-center gap-1.5">
                      <Dog className="w-4 h-4 text-pink-500" />
                      Pinkie's Park
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-purple-200 mt-1 leading-relaxed">
                      Play fetch with Pinkie, feed puppy cookies, and earn happy tail wags!
                    </p>
                  </div>
                  <div className="mt-3 text-[10px] font-['Silkscreen'] text-pink-600 dark:text-pink-400 font-bold flex items-center gap-1">
                    Play Ball With Pinkie →
                  </div>
                </div>

                {/* 3. Luna's Velvet Corner */}
                <div
                  onClick={() => {
                    soundManager.playMeow();
                    setCurrentLocation('luna-corner');
                  }}
                  role="button"
                  tabIndex={0}
                  className="group cursor-pointer p-5 rounded-3xl bg-white/90 dark:bg-purple-900/60 border-3 border-purple-300 dark:border-purple-600 shadow-md hover:shadow-xl hover:scale-[1.03] active:scale-95 transition-all text-left flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/80 border-2 border-purple-300 flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform">
                      🐱
                    </div>
                    {progress.isLunaApproved && (
                      <span className="text-[10px] font-['Silkscreen'] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 border border-amber-300">
                        👑 Approved!
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-['Silkscreen'] text-sm font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                      <Cat className="w-4 h-4 text-purple-500" />
                      Luna's Corner
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-purple-200 mt-1 leading-relaxed">
                      Crescent moon pillow, toy mouse wiggles, gentle purring, and secret royal note.
                    </p>
                  </div>
                  <div className="mt-3 text-[10px] font-['Silkscreen'] text-purple-600 dark:text-purple-400 font-bold flex items-center gap-1">
                    Visit Luna's Sanctuary →
                  </div>
                </div>

                {/* 4. Memory Garden */}
                <div
                  onClick={() => {
                    soundManager.playHeart();
                    setCurrentLocation('garden');
                  }}
                  role="button"
                  tabIndex={0}
                  className="group cursor-pointer p-5 rounded-3xl bg-white/90 dark:bg-purple-900/60 border-3 border-emerald-300 dark:border-emerald-600 shadow-md hover:shadow-xl hover:scale-[1.03] active:scale-95 transition-all text-left flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border-2 border-emerald-300 flex items-center justify-center text-2xl group-hover:rotate-6 transition-transform">
                      🌸
                    </div>
                    <span className="text-[10px] font-['Silkscreen'] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 border border-emerald-200">
                      6 Story Blooms
                    </span>
                  </div>
                  <div>
                    <h3 className="font-['Silkscreen'] text-sm font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                      <Flower2 className="w-4 h-4 text-emerald-500" />
                      Memory Garden
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-purple-200 mt-1 leading-relaxed">
                      6 milestone chapter flowers to replay, plus your own private custom memory bed!
                    </p>
                  </div>
                  <div className="mt-3 text-[10px] font-['Silkscreen'] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    Walk in the Garden →
                  </div>
                </div>

                {/* 5. Love Letter Mailbox */}
                <div
                  onClick={() => {
                    soundManager.playPaperRustle();
                    setCurrentLocation('mailbox');
                  }}
                  role="button"
                  tabIndex={0}
                  className="group cursor-pointer p-5 rounded-3xl bg-white/90 dark:bg-purple-900/60 border-3 border-rose-300 dark:border-rose-600 shadow-md hover:shadow-xl hover:scale-[1.03] active:scale-95 transition-all text-left flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/80 border-2 border-rose-300 flex items-center justify-center text-2xl group-hover:bounce transition-transform">
                      💌
                    </div>
                    <span className="text-[10px] font-['Silkscreen'] px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-200 border border-rose-200">
                      3 Open-When Letters
                    </span>
                  </div>
                  <div>
                    <h3 className="font-['Silkscreen'] text-sm font-bold text-rose-700 dark:text-pink-300 flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-rose-500" />
                      Love Letter Mailbox
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-purple-200 mt-1 leading-relaxed">
                      Open when you miss me, need a smile, or had a hard day. Real, heartfelt words.
                    </p>
                  </div>
                  <div className="mt-3 text-[10px] font-['Silkscreen'] text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1">
                    Check Mailbox →
                  </div>
                </div>

                {/* 6. Stargazing Hill */}
                <div
                  onClick={() => {
                    soundManager.playShootingStar();
                    setCurrentLocation('stargazing');
                  }}
                  role="button"
                  tabIndex={0}
                  className="group cursor-pointer p-5 rounded-3xl bg-white/90 dark:bg-purple-900/60 border-3 border-indigo-300 dark:border-indigo-600 shadow-md hover:shadow-xl hover:scale-[1.03] active:scale-95 transition-all text-left flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 border-2 border-indigo-300 flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform">
                      ⭐
                    </div>
                    <span className="text-[10px] font-['Silkscreen'] px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-200 border border-indigo-200">
                      Shooting Stars
                    </span>
                  </div>
                  <div>
                    <h3 className="font-['Silkscreen'] text-sm font-bold text-indigo-700 dark:text-pink-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-500" />
                      Stargazing Hill
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-purple-200 mt-1 leading-relaxed">
                      Sit with the pets under the cosmos, watch shooting stars, and make wishes together.
                    </p>
                  </div>
                  <div className="mt-3 text-[10px] font-['Silkscreen'] text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1">
                    Climb Hilltop →
                  </div>
                </div>
              </div>

              {/* Heart Pond in Meadow Center */}
              <div className="mt-6 p-4 rounded-3xl bg-gradient-to-r from-sky-200/70 via-blue-100/70 to-indigo-200/70 dark:from-indigo-950/60 dark:via-purple-950/60 dark:to-slate-900/60 border-2 border-sky-300 dark:border-purple-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">🪷🦆</div>
                  <div>
                    <h4 className="font-['Silkscreen'] text-xs font-bold text-sky-900 dark:text-sky-300">
                      The Heart Pond & Cherry Blossom Grove
                    </h4>
                    <p className="text-[11px] text-stone-600 dark:text-purple-200">
                      Where Pinkie chases gentle butterflies and Luna naps under the pink petals.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    soundManager.playWaterSplash();
                    soundManager.playHeart();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white/80 hover:bg-white dark:bg-purple-900 text-sky-700 dark:text-purple-200 font-['Silkscreen'] text-xs border border-sky-200 shadow-sm active:scale-95 transition-all"
                >
                  Toss a coin into pond! 🪙✨
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 1. COTTAGE LOCATION */}
        {currentLocation === 'cottage' && (
          <CottageInterior
            settings={settings}
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            effectiveIsNight={effectiveIsNight}
          />
        )}

        {/* 2. PINKIE PLAYGROUND */}
        {currentLocation === 'playground' && (
          <PinkiePlayground
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            effectiveIsNight={effectiveIsNight}
          />
        )}

        {/* 3. LUNA SECRET CORNER */}
        {currentLocation === 'luna-corner' && (
          <LunaSecretCorner
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            effectiveIsNight={effectiveIsNight}
          />
        )}

        {/* 4. MEMORY GARDEN */}
        {currentLocation === 'garden' && (
          <MemoryGarden
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            onReplayChapter={handleReplayChapterNumber}
            effectiveIsNight={effectiveIsNight}
          />
        )}

        {/* 5. LOVE LETTER MAILBOX */}
        {currentLocation === 'mailbox' && (
          <LoveLetterMailbox
            settings={settings}
            effectiveIsNight={effectiveIsNight}
          />
        )}

        {/* 6. STARGAZING HILL */}
        {currentLocation === 'stargazing' && (
          <StargazingHill
            settings={settings}
            effectiveIsNight={effectiveIsNight}
          />
        )}
      </main>

      {/* --- Global Modals for World Scene --- */}

      {/* Music & SFX Station Modal */}
      <WorldMusicPlayerModal
        isOpen={isMusicModalOpen}
        onClose={() => setIsMusicModalOpen(false)}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        settings={settings}
        onSave={(newSettings) => onUpdateSettings(newSettings)}
      />

      {/* Chapter Selection Modal */}
      <ChapterNavModal
        isOpen={isChapterNavOpen}
        onClose={() => setIsChapterNavOpen(false)}
        onSelectChapter={(id) => {
          setIsChapterNavOpen(false);
          onSelectChapter(id);
        }}
      />
    </div>
  );
};
