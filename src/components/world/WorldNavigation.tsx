import React from 'react';
import {
  MapPin,
  Home,
  Dog,
  Cat,
  Flower2,
  Mail,
  Sparkles,
  Music,
  BookOpen,
  Settings as SettingsIcon,
} from 'lucide-react';
import { soundManager } from '../audio/SoundManager';
import { DayNightToggle } from './DayNightToggle';
import type { DayNightMode } from '../../data/progressConfig';

export type WorldLocationId =
  | 'overworld'
  | 'cottage'
  | 'playground'
  | 'luna-corner'
  | 'garden'
  | 'mailbox'
  | 'stargazing';

interface WorldNavigationProps {
  currentLocation: WorldLocationId;
  onSelectLocation: (loc: WorldLocationId) => void;
  dayNightMode: DayNightMode;
  effectiveIsNight: boolean;
  onSelectDayNightMode: (mode: DayNightMode) => void;
  onOpenMusicStation: () => void;
  onOpenStorySelect: () => void;
  onOpenSettings: () => void;
  hasLunaApproved?: boolean;
}

export const WorldNavigation: React.FC<WorldNavigationProps> = ({
  currentLocation,
  onSelectLocation,
  dayNightMode,
  effectiveIsNight,
  onSelectDayNightMode,
  onOpenMusicStation,
  onOpenStorySelect,
  onOpenSettings,
  hasLunaApproved,
}) => {
  const locations: { id: WorldLocationId; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overworld', label: 'Map', icon: <MapPin className="w-3.5 h-3.5" /> },
    { id: 'cottage', label: 'Cottage', icon: <Home className="w-3.5 h-3.5" /> },
    { id: 'playground', label: 'Pinkie', icon: <Dog className="w-3.5 h-3.5 text-pink-500" /> },
    { id: 'luna-corner', label: 'Luna', icon: <Cat className="w-3.5 h-3.5 text-purple-400" />, badge: hasLunaApproved ? '👑' : undefined },
    { id: 'garden', label: 'Garden', icon: <Flower2 className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: 'mailbox', label: 'Mailbox', icon: <Mail className="w-3.5 h-3.5 text-rose-400" /> },
    { id: 'stargazing', label: 'Stargaze', icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" /> },
  ];

  const handleNavClick = (loc: WorldLocationId) => {
    soundManager.playClick();
    onSelectLocation(loc);
  };

  return (
    <header className="sticky top-0 z-40 w-full px-2 sm:px-4 py-2 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b-2 border-pink-200/80 dark:border-purple-800/80 shadow-sm">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Location tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full sm:w-auto">
          {locations.map(item => {
            const isActive = currentLocation === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-['Silkscreen'] text-xs whitespace-nowrap transition-all select-none ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md font-bold scale-105'
                    : 'text-stone-700 dark:text-purple-200 hover:bg-pink-100/70 dark:hover:bg-purple-900/50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && <span className="text-[10px] ml-0.5">{item.badge}</span>}
              </button>
            );
          })}
        </nav>

        {/* Right: Quick Tools */}
        <div className="flex items-center gap-1.5 ml-auto">
          {/* Day / Night mode toggle */}
          <DayNightToggle
            currentMode={dayNightMode}
            effectiveIsNight={effectiveIsNight}
            onSelectMode={onSelectDayNightMode}
          />

          {/* Sound & Music Station modal */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenMusicStation();
            }}
            title="Music & Sound Station"
            className="p-1.5 rounded-full bg-white/80 dark:bg-purple-950/80 border-2 border-pink-200 dark:border-purple-700 text-pink-600 dark:text-pink-300 hover:bg-pink-100 transition-all shadow-sm"
          >
            <Music className="w-4 h-4" />
          </button>

          {/* Story Chapter Selector */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenStorySelect();
            }}
            title="Revisit Story Chapters"
            className="p-1.5 rounded-full bg-white/80 dark:bg-purple-950/80 border-2 border-pink-200 dark:border-purple-700 text-purple-600 dark:text-purple-300 hover:bg-purple-100 transition-all shadow-sm"
          >
            <BookOpen className="w-4 h-4" />
          </button>

          {/* Character / Anniversary Settings */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenSettings();
            }}
            title="Settings & Names"
            className="p-1.5 rounded-full bg-white/80 dark:bg-purple-950/80 border-2 border-pink-200 dark:border-purple-700 text-stone-600 dark:text-stone-300 hover:bg-pink-100 transition-all shadow-sm"
          >
            <SettingsIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
