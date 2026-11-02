import React, { useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { soundManager } from '../audio/SoundManager';

export const AudioControls: React.FC = () => {
  const [isMuted, setIsMuted] = useState(soundManager.getIsMuted());
  const [showTooltip, setShowTooltip] = useState(false);

  const handleToggle = () => {
    const nextState = soundManager.toggleMute();
    setIsMuted(nextState);
  };

  return (
    <div className="relative inline-block z-40">
      <button
        onClick={handleToggle}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label={isMuted ? "Enable 8-bit cozy sound & music" : "Mute audio"}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-2xl
          border-2 border-[#3b1d32] shadow-[3px_3px_0px_#3b1d32]
          cursor-pointer select-none transition-all duration-150
          focus:outline-none focus:ring-2 focus:ring-pink-400
          ${isMuted 
            ? 'bg-white/80 text-[#6b7280] hover:bg-white active:translate-y-0.5' 
            : 'bg-pink-100 text-[#db2777] border-[#be185d] shadow-[3px_3px_0px_#be185d] hover:bg-pink-200 active:translate-y-0.5 animate-pulse'
          }
        `}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-gray-500" />
        ) : (
          <div className="flex items-center gap-1.5">
            <Volume2 className="w-5 h-5 text-pink-600 animate-bounce" style={{ animationDuration: '1s' }} />
            <Music className="w-4 h-4 text-pink-500" />
          </div>
        )}
        <span className="font-['Silkscreen'] text-[11px] font-bold">
          {isMuted ? 'SOUND: OFF' : 'SOUND: ON ♪'}
        </span>
      </button>

      {/* Floating tooltip */}
      {showTooltip && (
        <div className="absolute right-0 top-12 whitespace-nowrap px-3 py-1.5 bg-[#3b1d32] text-pink-100 text-xs font-['Fredoka'] rounded-xl shadow-lg border border-pink-400/30 pointer-events-none">
          {isMuted ? 'Click to play gentle 8-bit chiptune melody ♫' : 'Sound active! Click to mute'}
        </div>
      )}
    </div>
  );
};
