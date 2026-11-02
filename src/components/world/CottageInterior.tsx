import React, { useState } from 'react';
import { Sparkles, Tv, Clock, Book, Heart, Droplets } from 'lucide-react';
import { BoySprite } from '../characters/BoySprite';
import { GirlSprite } from '../characters/GirlSprite';
import { PinkieSprite } from '../characters/PinkieSprite';
import { LunaSprite } from '../characters/LunaSprite';
import { soundManager } from '../audio/SoundManager';
import {
  type UserProgress,
  waterCottagePlant,
} from '../../data/progressConfig';
import type { CharacterSettings } from '../../data/characterConfig';

interface CottageInteriorProps {
  settings: CharacterSettings;
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
  effectiveIsNight: boolean;
}

const getTodayDateStr = () => (typeof window !== 'undefined' ? new Date().toISOString().slice(0, 10) : '');

export const CottageInterior: React.FC<CottageInteriorProps> = ({
  settings,
  progress,
  onUpdateProgress,
  effectiveIsNight,
}) => {
  const [activeModal, setActiveModal] = useState<
    'couch' | 'tv' | 'clock' | 'bookshelf' | 'portrait' | 'plant' | 'note' | 'pet-harmony' | null
  >(null);
  const [couchQuoteIdx, setCouchQuoteIdx] = useState(0);
  const [plantWateredAnimation, setPlantWateredAnimation] = useState(false);

  const todayStr = getTodayDateStr();
  const isWateredToday = progress.lastPlantWateredDate === todayStr;

  const couchQuotes = [
    `"${settings.boyName} & ${settings.girlName} sitting here together feels more like home than any place on Earth ♡"`,
    `"${settings.girlName}: Are we watching Siragu Adika Asai tonight? ${settings.boyName}: Only if we get to laugh at the drama together!"`,
    `"Every cozy blanket, every hot cup of tea, and every quiet evening with you is pure magic."`,
    `"${settings.boyName} glances over at ${settings.girlName} and softly smiles, feeling like the luckiest person alive."`,
  ];

  const handleCouchClick = () => {
    soundManager.playHeart();
    setCouchQuoteIdx((prev) => (prev + 1) % couchQuotes.length);
    setActiveModal('couch');
  };

  const handleTvClick = () => {
    soundManager.playDramaticSting();
    setActiveModal('tv');
  };

  const handleClockClick = () => {
    soundManager.playClockTick();
    setActiveModal('clock');
  };

  const handleBookshelfClick = () => {
    soundManager.playClick();
    setActiveModal('bookshelf');
  };

  const handlePortraitClick = () => {
    soundManager.playHeart();
    setActiveModal('portrait');
  };

  const handleNoteClick = () => {
    soundManager.playPaperRustle();
    setActiveModal('note');
  };

  const handleWaterPlant = () => {
    if (isWateredToday) {
      soundManager.playPop();
      setActiveModal('plant');
      return;
    }
    soundManager.playWaterSplash();
    soundManager.playHeart();
    setPlantWateredAnimation(true);
    const res = waterCottagePlant();
    onUpdateProgress(res.progress);
    setActiveModal('plant');
    setTimeout(() => setPlantWateredAnimation(false), 2000);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border-4 border-amber-900/20 shadow-2xl bg-gradient-to-b from-amber-50/90 via-orange-50/70 to-amber-100/80 dark:from-slate-900 dark:via-purple-950/80 dark:to-slate-950 text-stone-800 dark:text-purple-100 p-4 sm:p-8 select-none transition-colors duration-700">
      {/* Wooden Cottage Wall Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Top Banner */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 mb-6 pb-3 border-b-2 border-amber-200/60 dark:border-purple-800">
        <div>
          <h2 className="font-['Silkscreen'] text-base sm:text-lg text-amber-800 dark:text-pink-300 font-bold flex items-center gap-2">
            🏡 Our Cozy Cottage
          </h2>
          <p className="text-xs text-stone-500 dark:text-purple-300">
            A handcrafted sanctuary full of little memories and warmth
          </p>
        </div>
        <div className="text-[11px] font-['Silkscreen'] px-3 py-1 rounded-full bg-amber-100/80 dark:bg-purple-900/70 text-amber-800 dark:text-purple-200 border border-amber-300/60 dark:border-purple-700 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
          Tap items around the room!
        </div>
      </div>

      {/* Main Room Layout */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
        {/* Left Wall: Bookshelf, Vintage TV, Wall Clock */}
        <div className="md:col-span-3 flex flex-col gap-4">
          {/* Wall Clock (Easter Egg) */}
          <div
            onClick={handleClockClick}
            role="button"
            tabIndex={0}
            className="group relative cursor-pointer self-center p-3 rounded-2xl bg-amber-100 dark:bg-purple-900/60 border-2 border-amber-300 dark:border-purple-700 shadow-md hover:scale-105 active:scale-95 transition-all text-center"
            title="Vintage Wall Clock"
          >
            <div className="flex items-center justify-center gap-1.5 text-xs font-['Silkscreen'] text-amber-800 dark:text-pink-300 font-bold">
              <Clock className="w-4 h-4 text-pink-500 animate-spin" style={{ animationDuration: '60s' }} />
              <span>11:00 PM</span>
            </div>
            <div className="text-[9px] text-stone-500 dark:text-purple-300 mt-0.5">The Confession Clock ♡</div>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[8px] font-['Silkscreen'] bg-pink-100 text-pink-700 px-1.5 py-0.5 rounded shadow whitespace-nowrap transition-opacity">
              Tap Clock!
            </span>
          </div>

          {/* Bookshelf */}
          <div
            onClick={handleBookshelfClick}
            role="button"
            tabIndex={0}
            className="group relative cursor-pointer p-4 rounded-2xl bg-amber-200/70 dark:bg-purple-950/70 border-3 border-amber-400 dark:border-purple-800 shadow-md hover:scale-[1.02] active:scale-95 transition-all"
            title="Relationship Bookshelf"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-['Silkscreen'] text-xs text-amber-900 dark:text-purple-200 font-bold flex items-center gap-1.5">
                <Book className="w-3.5 h-3.5 text-amber-700 dark:text-purple-400" />
                Library of Us
              </span>
              <span className="text-[10px] text-amber-700 dark:text-purple-400">📚</span>
            </div>
            {/* Shelf rows representation */}
            <div className="space-y-1.5">
              <div className="h-3 rounded bg-amber-600/40 dark:bg-purple-800/60 flex items-center gap-1 px-1">
                <span className="w-2 h-2 rounded-xs bg-pink-400 inline-block" />
                <span className="w-3 h-2 rounded-xs bg-purple-400 inline-block" />
                <span className="w-2.5 h-2 rounded-xs bg-sky-400 inline-block" />
              </div>
              <div className="h-3 rounded bg-amber-600/40 dark:bg-purple-800/60 flex items-center gap-1 px-1">
                <span className="w-4 h-2 rounded-xs bg-amber-400 inline-block" />
                <span className="w-2 h-2 rounded-xs bg-rose-400 inline-block" />
                <span className="w-3 h-2 rounded-xs bg-indigo-400 inline-block" />
              </div>
            </div>
            <div className="mt-2 text-[9px] text-amber-900/80 dark:text-purple-300 font-['Silkscreen']">
              Serial notes & late night talks
            </div>
          </div>

          {/* Retro TV (Easter Egg) */}
          <div
            onClick={handleTvClick}
            role="button"
            tabIndex={0}
            className="group relative cursor-pointer p-3.5 rounded-2xl bg-stone-800 text-stone-100 border-3 border-stone-600 shadow-lg hover:scale-105 active:scale-95 transition-all text-center"
            title="Vintage Retro Television"
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <Tv className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="font-['Silkscreen'] text-xs font-bold text-amber-300">Retro CRT TV</span>
            </div>
            {/* CRT Screen */}
            <div className="h-14 rounded-lg bg-emerald-950/80 border-2 border-stone-700 flex items-center justify-center p-2 overflow-hidden">
              <span className="font-['Silkscreen'] text-[9px] text-emerald-400 text-center leading-tight">
                [ {settings.favoriteSerial} ]
                <br />
                Rohini Special 📺
              </span>
            </div>
            <span className="inline-block mt-1 text-[8px] text-stone-400 font-['Silkscreen']">
              Tap for TV drama!
            </span>
          </div>
        </div>

        {/* Center: Window, Framed Portrait, Comfy Couch with Boy & Girl */}
        <div className="md:col-span-6 flex flex-col items-center">
          {/* Top Wall: Framed Couple Portrait & Cottage Window */}
          <div className="flex items-center justify-center gap-4 mb-4 w-full">
            {/* Framed Couple Portrait */}
            <div
              onClick={handlePortraitClick}
              role="button"
              tabIndex={0}
              className="group cursor-pointer p-2 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 dark:from-purple-900 dark:to-purple-950 border-3 border-amber-500/80 dark:border-purple-600 shadow-md hover:scale-105 active:scale-95 transition-all text-center"
              title="Our Couple Portrait"
            >
              <div className="w-16 h-14 bg-pink-100 dark:bg-purple-950 rounded border border-amber-300 dark:border-purple-800 flex items-center justify-center relative overflow-hidden">
                <Heart className="w-6 h-6 text-pink-400 fill-pink-400/80 animate-pulse" />
                <span className="absolute bottom-0 text-[7px] font-['Silkscreen'] text-pink-600 dark:text-pink-300">
                  US ♡
                </span>
              </div>
              <span className="text-[8px] font-['Silkscreen'] text-amber-800 dark:text-purple-300 mt-1 block">
                Portrait
              </span>
            </div>

            {/* Cozy Cottage Window with Day/Night sky */}
            <div
              className={`relative w-32 sm:w-40 h-24 rounded-t-full border-4 border-amber-700 dark:border-purple-800 overflow-hidden shadow-inner ${
                effectiveIsNight
                  ? 'bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-900'
                  : 'bg-gradient-to-b from-sky-300 via-sky-200 to-amber-100'
              }`}
            >
              {/* Window Panes Grid */}
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none">
                <div className="border-r-2 border-b-2 border-amber-800/40 dark:border-purple-900/60" />
                <div className="border-b-2 border-amber-800/40 dark:border-purple-900/60" />
                <div className="border-r-2 border-amber-800/40 dark:border-purple-900/60" />
                <div />
              </div>

              {/* Sky Objects */}
              {effectiveIsNight ? (
                <div className="absolute top-2 right-4 text-amber-200">
                  <div className="w-4 h-4 rounded-full bg-amber-100 shadow-[0_0_8px_#fde68a]" />
                  <span className="text-[8px] absolute -top-1 -left-4 animate-ping">✨</span>
                  <span className="text-[7px] absolute top-6 left-2 animate-pulse">⭐</span>
                </div>
              ) : (
                <div className="absolute top-2 left-4 text-amber-400">
                  <div className="w-5 h-5 rounded-full bg-amber-300 shadow-[0_0_10px_#f59e0b]" />
                  <div className="absolute top-4 left-6 w-10 h-3 rounded-full bg-white/70 shadow-sm animate-pulse" />
                </div>
              )}
            </div>
          </div>

          {/* Comfy Couch with Boy and Girl */}
          <div
            onClick={handleCouchClick}
            role="button"
            tabIndex={0}
            className="group relative cursor-pointer w-full max-w-sm p-4 rounded-3xl bg-gradient-to-r from-pink-200/90 via-rose-100/90 to-purple-200/90 dark:from-purple-900/90 dark:via-pink-950/80 dark:to-indigo-950/90 border-3 border-pink-300 dark:border-purple-700 shadow-xl hover:shadow-2xl transition-all"
            title="Our Cozy Love Couch - Tap to cuddle!"
          >
            {/* Click hint pill */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white/95 dark:bg-purple-900 text-pink-600 dark:text-pink-300 text-[9px] font-['Silkscreen'] px-3 py-0.5 rounded-full border border-pink-300 shadow-sm">
              Tap our couch ♡
            </div>

            {/* Boy and Girl sitting together */}
            <div className="flex items-center justify-center gap-4 py-2">
              <div className="transform -rotate-3 scale-95">
                <BoySprite emotion="happy" size="md" />
              </div>
              <div className="flex flex-col items-center">
                <Heart className="w-5 h-5 text-pink-500 fill-pink-500 animate-bounce" />
                <span className="text-[9px] font-['Silkscreen'] text-pink-600 dark:text-pink-300 font-bold">
                  Always Us
                </span>
              </div>
              <div className="transform rotate-3 scale-95">
                <GirlSprite emotion="love" size="md" />
              </div>
            </div>

            {/* Cozy cushion detail */}
            <div className="mt-1 h-3 rounded-full bg-pink-300/60 dark:bg-purple-800/60 border-t border-pink-400/40" />
          </div>

          {/* Soft Living Room Rug with sleeping pets */}
          <div className="mt-4 w-full max-w-md p-3 rounded-2xl bg-gradient-to-r from-rose-100 via-pink-50 to-purple-100 dark:from-purple-950 dark:via-slate-900 dark:to-pink-950 border-2 border-dashed border-pink-200 dark:border-purple-800 flex items-center justify-around">
            <div className="text-center">
              <PinkieSprite size="sm" showSpeechBubble={false} />
              <div className="text-[8px] font-['Silkscreen'] text-stone-500 dark:text-purple-300 mt-1">
                Pinkie's Rug
              </div>
            </div>

            <div
              onClick={handleNoteClick}
              role="button"
              tabIndex={0}
              className="cursor-pointer p-2 rounded-xl bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-700 shadow-xs hover:scale-105 active:scale-95 transition-all text-center"
              title="Secret Coffee Table Note"
            >
              <span className="text-base">📝</span>
              <div className="text-[8px] font-['Silkscreen'] text-amber-800 dark:text-amber-300 font-bold">
                Secret Note
              </div>
            </div>

            {/* Pet Harmony Trigger */}
            <div
              onClick={() => {
                soundManager.playHeart();
                soundManager.playPurr();
                setActiveModal('pet-harmony');
              }}
              role="button"
              tabIndex={0}
              className="cursor-pointer p-1.5 rounded-xl bg-pink-100 hover:bg-pink-200 dark:bg-purple-900/60 border border-pink-300 dark:border-purple-600 shadow-xs hover:scale-110 active:scale-95 transition-all text-center flex flex-col items-center"
              title="Pet Harmony: Pinkie & Luna Cuddled Up ♡"
            >
              <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 animate-pulse" />
              <div className="text-[7px] font-['Silkscreen'] text-pink-700 dark:text-pink-300 font-bold mt-0.5">
                Harmony
              </div>
            </div>

            <div className="text-center">
              <LunaSprite size="sm" showSpeechBubble={false} />
              <div className="text-[8px] font-['Silkscreen'] text-stone-500 dark:text-purple-300 mt-1">
                Luna's Cushion
              </div>
            </div>
          </div>
        </div>

        {/* Right Wall: Windowsill Plant Watering Station */}
        <div className="md:col-span-3 flex flex-col items-center justify-end">
          <div
            onClick={handleWaterPlant}
            role="button"
            tabIndex={0}
            className={`group relative cursor-pointer w-full p-4 rounded-2xl border-3 shadow-lg hover:scale-105 active:scale-95 transition-all text-center ${
              isWateredToday
                ? 'bg-gradient-to-b from-emerald-100 to-green-50 dark:from-emerald-950/80 dark:to-slate-900 border-emerald-300 dark:border-emerald-700'
                : 'bg-gradient-to-b from-amber-50 to-pink-50 dark:from-purple-950 dark:to-slate-900 border-pink-300 dark:border-purple-700 animate-pulse'
            }`}
            title="Daily Plant Watering"
          >
            {/* Header */}
            <div className="flex items-center justify-center gap-1.5 font-['Silkscreen'] text-xs text-emerald-800 dark:text-emerald-300 font-bold mb-2">
              <Droplets className="w-4 h-4 text-sky-500" />
              <span>Our Sprout</span>
            </div>

            {/* Plant Pot Art */}
            <div className="relative inline-block py-2">
              {plantWateredAnimation && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm animate-bounce">
                  💧✨🌸
                </div>
              )}
              {/* Sprout Flower Graphic */}
              <div className="text-4xl transform group-hover:rotate-6 transition-transform">
                {isWateredToday ? '🌸' : '🌱'}
              </div>
              <div className="w-12 h-6 mx-auto mt-1 rounded-b-xl bg-amber-700 dark:bg-amber-800 border-t-2 border-amber-900 shadow-inner" />
            </div>

            {/* Water button / Status */}
            <div className="mt-2">
              <span
                className={`inline-block px-3 py-1 rounded-full text-[10px] font-['Silkscreen'] shadow-xs font-bold ${
                  isWateredToday
                    ? 'bg-emerald-500 text-white'
                    : 'bg-sky-500 text-white group-hover:bg-sky-600'
                }`}
              >
                {isWateredToday ? 'Watered Today ♡' : 'Water Sprout! 💧'}
              </span>
            </div>
            <p className="text-[9px] text-stone-500 dark:text-purple-300 mt-1">
              {isWateredToday ? 'Blooming happily today!' : 'Tap once daily to grow our love'}
            </p>
          </div>
        </div>
      </div>

      {/* --- Modals for Interactive Objects --- */}

      {/* Couch Modal */}
      {activeModal === 'couch' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border-4 border-pink-300 dark:border-purple-600 shadow-2xl p-6 text-center">
            <Heart className="w-8 h-8 text-pink-500 fill-pink-500 mx-auto animate-bounce mb-2" />
            <h3 className="font-['Silkscreen'] text-sm text-pink-600 dark:text-pink-300 font-bold mb-2">
              Couch Hugs & Cozy Moments ♡
            </h3>
            <p className="font-['Silkscreen'] text-xs text-stone-700 dark:text-purple-100 leading-relaxed mb-4">
              {couchQuotes[couchQuoteIdx]}
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => {
                  soundManager.playHeart();
                  setCouchQuoteIdx((prev) => (prev + 1) % couchQuotes.length);
                }}
                className="px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-xl font-['Silkscreen'] text-xs transition-all"
              >
                Another Cozy Line ♡
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveModal(null);
                }}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-['Silkscreen'] text-xs shadow-md transition-all"
              >
                Snuggle Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TV Modal */}
      {activeModal === 'tv' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-stone-900 text-stone-100 rounded-3xl border-4 border-amber-600 shadow-2xl p-6 text-center">
            <Tv className="w-8 h-8 text-amber-400 mx-auto animate-pulse mb-2" />
            <h3 className="font-['Silkscreen'] text-sm text-amber-300 font-bold mb-2">
              📺 SIRAGU ADIKA ASAI SPECIAL!
            </h3>
            <div className="p-4 bg-black/80 rounded-2xl border-2 border-emerald-500/50 mb-4 font-mono text-emerald-400 text-xs text-left leading-relaxed">
              <p className="font-bold text-amber-300 mb-1">▶ EPISODE 999: "ROHINI STRIKES AGAIN"</p>
              <p>Muthu: "Something smells fishy..." 🤨</p>
              <p>Meena: "Leave it alone please!" 😅</p>
              <p>Rohini: *fabricates entire fake background in 2.3 seconds* 🏃‍♀️💨</p>
              <div className="mt-3 pt-2 border-t border-emerald-800 text-[10px] text-pink-300 font-['Silkscreen']">
                Bonding over laughing at serial drama with you is top tier romance! ♡
              </div>
            </div>
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveModal(null);
              }}
              className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-stone-900 rounded-xl font-['Silkscreen'] text-xs font-bold transition-all"
            >
              Turn Off TV 😂
            </button>
          </div>
        </div>
      )}

      {/* Clock Modal */}
      {activeModal === 'clock' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-indigo-950 text-indigo-100 rounded-3xl border-4 border-purple-500 shadow-2xl p-6 text-center">
            <Clock className="w-8 h-8 text-pink-400 mx-auto animate-pulse mb-2" />
            <h3 className="font-['Silkscreen'] text-sm text-pink-300 font-bold mb-1">
              11:00 PM ♡ The Forever Hour
            </h3>
            <p className="text-[10px] text-purple-300 font-['Silkscreen'] mb-4">
              Where hesitation stopped and our forever began
            </p>
            <div className="p-4 bg-purple-900/60 rounded-2xl border border-purple-700/60 mb-4 text-xs font-['Silkscreen'] leading-relaxed text-left text-pink-100">
              <p className="mb-2">
                "The screen displayed 10:59 PM. Hearts racing at 140 bpm. The boy sent his confession message into the night."
              </p>
              <p className="text-pink-300 font-bold">
                "At 11:00 PM, her reply came back: 'Of course' ♡"
              </p>
            </div>
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveModal(null);
              }}
              className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-['Silkscreen'] text-xs shadow-md transition-all"
            >
              Remembered Forever ♡
            </button>
          </div>
        </div>
      )}

      {/* Bookshelf Modal */}
      {activeModal === 'bookshelf' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-amber-50 dark:bg-purple-950 rounded-3xl border-4 border-amber-300 dark:border-purple-600 shadow-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Book className="w-6 h-6 text-amber-700 dark:text-purple-300" />
              <h3 className="font-['Silkscreen'] text-sm text-amber-900 dark:text-purple-200 font-bold">
                Our Little Library 📖
              </h3>
            </div>
            <ul className="space-y-2 text-xs font-['Silkscreen'] text-stone-700 dark:text-purple-200 mb-4">
              <li className="p-2 rounded-xl bg-white/80 dark:bg-purple-900/60 border border-amber-200 dark:border-purple-800">
                📖 <strong>Vol. 1:</strong> The Day I Saw Her Posts (Best day ever)
              </li>
              <li className="p-2 rounded-xl bg-white/80 dark:bg-purple-900/60 border border-amber-200 dark:border-purple-800">
                📖 <strong>Vol. 2:</strong> 101 Reasons Why That Retro Trend Was Overrated
              </li>
              <li className="p-2 rounded-xl bg-white/80 dark:bg-purple-900/60 border border-amber-200 dark:border-purple-800">
                📖 <strong>Vol. 3:</strong> The Complete Siragu Adika Asai Commentary Log
              </li>
              <li className="p-2 rounded-xl bg-white/80 dark:bg-purple-900/60 border border-amber-200 dark:border-purple-800">
                📖 <strong>Vol. 4:</strong> Why Saying "Of Course" Made My Whole Life
              </li>
            </ul>
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveModal(null);
              }}
              className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-['Silkscreen'] text-xs transition-all"
            >
              Close Shelf
            </button>
          </div>
        </div>
      )}

      {/* Couple Portrait Modal */}
      {activeModal === 'portrait' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm bg-gradient-to-b from-pink-100 to-purple-100 dark:from-purple-950 dark:to-slate-900 rounded-3xl border-4 border-amber-400 dark:border-purple-600 shadow-2xl p-6 text-center">
            <div className="p-4 bg-white/90 dark:bg-purple-900/80 rounded-2xl border-2 border-pink-300 dark:border-purple-700 shadow-inner mb-3">
              <div className="flex items-center justify-center gap-3 py-2">
                <BoySprite emotion="love" size="sm" />
                <Heart className="w-6 h-6 text-pink-500 fill-pink-500 animate-pulse" />
                <GirlSprite emotion="love" size="sm" />
              </div>
              <h4 className="font-['Silkscreen'] text-sm text-pink-600 dark:text-pink-300 font-bold mt-2">
                {settings.boyName} & {settings.girlName}
              </h4>
              <p className="text-[10px] text-stone-500 dark:text-purple-300 font-['Silkscreen'] mt-0.5">
                Two souls who found home in each other ♡
              </p>
            </div>
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveModal(null);
              }}
              className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-['Silkscreen'] text-xs shadow-md transition-all"
            >
              Love You Always ♡
            </button>
          </div>
        </div>
      )}

      {/* Secret Table Note Modal */}
      {activeModal === 'note' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm bg-yellow-100 text-stone-900 rounded-3xl border-3 border-yellow-300 shadow-2xl p-6 rotate-1">
            <div className="flex items-center justify-between mb-2 border-b border-yellow-200 pb-2">
              <span className="font-['Silkscreen'] text-xs font-bold text-amber-800">
                📌 Sticky Note on Table
              </span>
              <span className="text-xs">✨</span>
            </div>
            <p className="font-mono text-xs leading-relaxed text-stone-800 mb-4">
              "Note to self:
              <br />
              1. Buy snacks for serial time 🍿
              <br />
              2. Do not let Rohini fool anyone today 😂
              <br />
              3. Remind {settings.girlName} that she is the sweetest, prettiest girl in the world! ♡"
            </p>
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveModal(null);
              }}
              className="w-full py-1.5 bg-amber-400 hover:bg-amber-500 text-stone-900 rounded-xl font-['Silkscreen'] text-xs font-bold transition-all"
            >
              Fold Note Back 📝
            </button>
          </div>
        </div>
      )}

      {/* Plant Watering Modal */}
      {activeModal === 'plant' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl border-4 border-emerald-300 dark:border-emerald-600 shadow-2xl p-6 text-center">
            <span className="text-4xl block mb-2">{isWateredToday ? '🌸' : '🌱'}</span>
            <h3 className="font-['Silkscreen'] text-sm text-emerald-700 dark:text-emerald-300 font-bold mb-2">
              {isWateredToday ? 'Sprout is Thriving with Love! 🌸' : 'Daily Water Complete! 💧'}
            </h3>
            <p className="font-['Silkscreen'] text-xs text-stone-600 dark:text-purple-200 mb-4 leading-relaxed">
              {isWateredToday
                ? 'You already watered our sprout today! Come back tomorrow for the next sprinkle of love.'
                : 'Our sprout drank fresh happy water and is blooming just for you two! ♡'}
            </p>
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveModal(null);
              }}
              className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-['Silkscreen'] text-xs font-bold transition-all"
            >
              Got it! ♡
            </button>
          </div>
        </div>
      )}

      {/* Pet Harmony Modal (Pinkie & Luna Sitting Together with Heart) */}
      {activeModal === 'pet-harmony' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm bg-gradient-to-b from-pink-50 via-purple-50 to-amber-50 dark:from-slate-950 dark:via-purple-950 dark:to-slate-900 rounded-3xl border-4 border-pink-300 dark:border-purple-600 shadow-2xl p-6 text-center">
            <div className="p-4 bg-white/80 dark:bg-purple-900/50 rounded-2xl border-2 border-pink-200 dark:border-purple-700 shadow-inner mb-3">
              <div className="flex items-center justify-center gap-4 py-2 relative">
                <PinkieSprite size="sm" showSpeechBubble={false} />
                <div className="flex flex-col items-center">
                  <Heart className="w-5 h-5 text-pink-500 fill-pink-500 animate-bounce" />
                  <span className="text-[8px] font-['Silkscreen'] text-pink-600 dark:text-pink-300 font-bold">
                    Pure Peace
                  </span>
                </div>
                <LunaSprite size="sm" showSpeechBubble={false} />
              </div>
              <h4 className="font-['Silkscreen'] text-xs text-stone-800 dark:text-purple-100 font-bold mt-2">
                PET HARMONY 🐾♡
              </h4>
              <p className="text-[10px] text-stone-600 dark:text-purple-200 font-['Silkscreen'] mt-1 leading-relaxed">
                Her dog. His cat.
                <br />
                Snuggled peacefully side by side in their little universe.
              </p>
            </div>
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveModal(null);
              }}
              className="w-full py-2 bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white rounded-xl font-['Silkscreen'] text-xs font-bold transition-all shadow-md"
            >
              Sweetest Pets in the World ♡
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
