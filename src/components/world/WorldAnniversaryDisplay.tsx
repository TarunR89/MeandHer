import React, { useState } from 'react';
import { Heart, Calendar, Sparkles, Gift } from 'lucide-react';
import {
  type CharacterSettings,
  getDaysTogether,
  getNextMonthlyAnniversary,
  getNextYearlyAnniversary,
  saveCharacterSettings,
} from '../../data/characterConfig';
import { soundManager } from '../audio/SoundManager';

interface WorldAnniversaryDisplayProps {
  settings: CharacterSettings;
  onUpdateSettings?: (newSettings: CharacterSettings) => void;
  className?: string;
  compact?: boolean;
}

export const WorldAnniversaryDisplay: React.FC<WorldAnniversaryDisplayProps> = ({
  settings,
  onUpdateSettings,
  className = '',
  compact = false,
}) => {
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [dateInput, setDateInput] = useState(settings.relationshipStartDate || '');

  const daysTogether = getDaysTogether(settings.relationshipStartDate);
  const nextMonthly = getNextMonthlyAnniversary(settings.relationshipStartDate);
  const nextYearly = getNextYearlyAnniversary(settings.relationshipStartDate);

  const handleSaveDate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateInput) return;
    const updated = { ...settings, relationshipStartDate: dateInput };
    saveCharacterSettings(updated);
    if (onUpdateSettings) onUpdateSettings(updated);
    soundManager.playHeart();
    setIsEditingDate(false);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border-2 border-pink-200/90 dark:border-purple-600/60 bg-gradient-to-br from-pink-50/95 via-white/95 to-purple-50/90 dark:from-purple-950/90 dark:via-purple-900/80 dark:to-pink-950/80 backdrop-blur-md shadow-md p-4 transition-all ${className}`}
    >
      {/* Background cute decorative sparkle */}
      <div className="absolute -top-3 -right-3 text-pink-200/60 dark:text-purple-700/40 select-none pointer-events-none">
        <Heart className="w-16 h-16 fill-current" />
      </div>

      <div className="relative z-10 flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 border-b border-pink-100 dark:border-purple-800/60 pb-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-pink-100 dark:bg-purple-800 text-pink-500 dark:text-pink-300">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </span>
            <h3 className="font-['Silkscreen'] text-xs text-pink-700 dark:text-pink-300 font-bold uppercase tracking-wider">
              Our Journey Together
            </h3>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              setIsEditingDate(!isEditingDate);
            }}
            className="text-[10px] font-['Silkscreen'] text-purple-600 dark:text-purple-300 hover:text-pink-600 underline underline-offset-2"
          >
            {settings.relationshipStartDate ? (isEditingDate ? 'Cancel' : 'Edit Date') : '+ Set Date'}
          </button>
        </div>

        {/* Date setter inline form */}
        {isEditingDate && (
          <form onSubmit={handleSaveDate} className="flex flex-col sm:flex-row items-center gap-2 p-2 bg-pink-100/60 dark:bg-purple-900/60 rounded-xl">
            <label className="text-[10px] font-['Silkscreen'] text-stone-600 dark:text-purple-200">
              Special Date:
            </label>
            <input
              type="date"
              value={dateInput}
              onChange={e => setDateInput(e.target.value)}
              className="text-xs px-2.5 py-1 rounded-lg border border-pink-300 dark:border-purple-500 bg-white dark:bg-purple-950 text-stone-800 dark:text-purple-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
            <button
              type="submit"
              className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-lg text-[10px] font-['Silkscreen'] shadow-sm"
            >
              Save ♡
            </button>
          </form>
        )}

        {/* Stats view */}
        {settings.relationshipStartDate && daysTogether !== null ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Days Together */}
            <div className="flex flex-col items-center justify-center p-2.5 bg-white/70 dark:bg-purple-900/40 rounded-xl border border-pink-100 dark:border-purple-800/50 text-center">
              <span className="text-[10px] font-['Silkscreen'] text-stone-500 dark:text-purple-300">Days of Us</span>
              <div className="flex items-center gap-1 my-0.5">
                <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 animate-pulse" />
                <span className="font-['Silkscreen'] text-lg text-pink-600 dark:text-pink-300 font-bold">
                  {daysTogether}
                </span>
              </div>
              <span className="text-[9px] text-stone-400 dark:text-purple-400">and forever to go ♡</span>
            </div>

            {/* Next Monthly Anniversary */}
            {nextMonthly && (
              <div
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all ${
                  nextMonthly.isToday
                    ? 'bg-pink-100 dark:bg-pink-900/60 border-pink-400 shadow-sm animate-bounce'
                    : 'bg-white/70 dark:bg-purple-900/40 border-pink-100 dark:border-purple-800/50'
                }`}
              >
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-purple-500 dark:text-purple-300" />
                  <span className="text-[10px] font-['Silkscreen'] text-stone-500 dark:text-purple-300">
                    {nextMonthly.isToday ? 'Monthly Day! 🎉' : 'Next Monthiversary'}
                  </span>
                </div>
                <div className="font-['Silkscreen'] text-xs text-purple-700 dark:text-purple-200 font-bold mt-1">
                  {nextMonthly.isToday ? 'Today! ♡' : `${nextMonthly.daysUntil} days away`}
                </div>
                <span className="text-[9px] text-stone-400 dark:text-purple-400">
                  {nextMonthly.dateStr} (#{nextMonthly.monthsCount} mos)
                </span>
              </div>
            )}

            {/* Next Yearly Anniversary */}
            {nextYearly && (
              <div
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all ${
                  nextYearly.isToday
                    ? 'bg-purple-100 dark:bg-purple-900/60 border-purple-400 shadow-sm animate-bounce'
                    : 'bg-white/70 dark:bg-purple-900/40 border-pink-100 dark:border-purple-800/50'
                }`}
              >
                <div className="flex items-center gap-1">
                  <Gift className="w-3 h-3 text-pink-500 dark:text-pink-300" />
                  <span className="text-[10px] font-['Silkscreen'] text-stone-500 dark:text-purple-300">
                    {nextYearly.isToday ? 'Yearly Day! 🎂' : 'Next Anniversary'}
                  </span>
                </div>
                <div className="font-['Silkscreen'] text-xs text-pink-600 dark:text-pink-300 font-bold mt-1">
                  {nextYearly.isToday ? 'Today! 🎂♡' : `${nextYearly.daysUntil} days away`}
                </div>
                <span className="text-[9px] text-stone-400 dark:text-purple-400">
                  {nextYearly.dateStr} (Year {nextYearly.yearsCount})
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-2 px-3 bg-white/60 dark:bg-purple-900/30 rounded-xl border border-dashed border-pink-300 dark:border-purple-700">
            <p className="text-xs text-stone-600 dark:text-purple-200 font-['Silkscreen']">
              Set your relationship anniversary date to unlock your live relationship counter! ♡
            </p>
          </div>
        )}

        {/* Sweet footer footnote */}
        {!compact && (
          <div className="text-[10px] text-center text-pink-600/80 dark:text-purple-300/80 font-['Silkscreen']">
            {settings.boyName} ♡ {settings.girlName} • Our Little Universe
          </div>
        )}
      </div>
    </div>
  );
};
