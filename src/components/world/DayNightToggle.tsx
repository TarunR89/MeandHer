import React from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { soundManager } from '../audio/SoundManager';
import type { DayNightMode } from '../../data/progressConfig';

interface DayNightToggleProps {
  currentMode: DayNightMode;
  effectiveIsNight: boolean;
  onSelectMode: (mode: DayNightMode) => void;
  className?: string;
}

export const DayNightToggle: React.FC<DayNightToggleProps> = ({
  currentMode,
  effectiveIsNight,
  onSelectMode,
  className = '',
}) => {
  const modes: { mode: DayNightMode; label: string; icon: React.ReactNode }[] = [
    { mode: 'auto', label: 'Auto', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { mode: 'day', label: 'Day', icon: <Sun className="w-3.5 h-3.5 text-amber-500" /> },
    { mode: 'night', label: 'Night', icon: <Moon className="w-3.5 h-3.5 text-indigo-400" /> },
  ];

  const handleSelect = (mode: DayNightMode) => {
    soundManager.playClick();
    onSelectMode(mode);
  };

  return (
    <div className={`inline-flex items-center gap-1 p-1 bg-white/80 dark:bg-purple-950/80 backdrop-blur-md rounded-full border-2 border-pink-200 dark:border-purple-700 shadow-sm ${className}`}>
      {modes.map(item => {
        const isActive = currentMode === item.mode;
        return (
          <button
            key={item.mode}
            onClick={() => handleSelect(item.mode)}
            title={`Set time to ${item.label}${item.mode === 'auto' ? ` (${effectiveIsNight ? 'Currently Night' : 'Currently Day'})` : ''}`}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-['Silkscreen'] transition-all ${
              isActive
                ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-sm font-bold scale-105'
                : 'text-stone-600 dark:text-purple-200 hover:bg-pink-50 dark:hover:bg-purple-900/40 opacity-80 hover:opacity-100'
            }`}
          >
            {item.icon}
            <span className="hidden sm:inline">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
