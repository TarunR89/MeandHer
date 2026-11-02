import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Sparkles, X, Play, Square } from 'lucide-react';
import { soundManager } from '../audio/SoundManager';
import { saveUserProgress, loadUserProgress } from '../../data/progressConfig';

interface WorldMusicPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WorldMusicPlayerModal: React.FC<WorldMusicPlayerModalProps> = ({ isOpen, onClose }) => {
  const [isMuted, setIsMuted] = useState(soundManager.getIsMuted());
  const [masterVol, setMasterVol] = useState(Math.round(soundManager.getMasterVolume() * 100));
  const [sfxVol, setSfxVol] = useState(Math.round(soundManager.getSfxVolume() * 100));
  const [bgmVol, setBgmVol] = useState(Math.round(soundManager.getBgmVolume() * 100));

  if (!isOpen) return null;

  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    const p = loadUserProgress();
    saveUserProgress({ ...p, isMuted: muted });
  };

  const handleMasterChange = (v: number) => {
    setMasterVol(v);
    soundManager.setMasterVolume(v / 100);
    const p = loadUserProgress();
    saveUserProgress({ ...p, masterVolume: v / 100 });
  };

  const handleSfxChange = (v: number) => {
    setSfxVol(v);
    soundManager.setSfxVolume(v / 100);
    const p = loadUserProgress();
    saveUserProgress({ ...p, sfxVolume: v / 100 });
  };

  const handleBgmChange = (v: number) => {
    setBgmVol(v);
    soundManager.setBgmVolume(v / 100);
    const p = loadUserProgress();
    saveUserProgress({ ...p, bgmVolume: v / 100 });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-gradient-to-b from-pink-50 via-white to-purple-50 dark:from-purple-950 dark:via-purple-900 dark:to-pink-950 rounded-2xl border-4 border-pink-300 dark:border-purple-600 shadow-2xl p-5 overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-pink-200 dark:border-purple-800">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-pink-200 dark:bg-purple-800 text-pink-600 dark:text-pink-300">
              <Music className="w-5 h-5 animate-bounce" />
            </span>
            <div>
              <h2 className="font-['Silkscreen'] text-sm text-pink-700 dark:text-pink-200 font-bold">
                Cozy Sound Station ♫
              </h2>
              <p className="text-[10px] text-stone-500 dark:text-purple-300">
                Handcrafted 8-bit ambient lullabies & sound effects
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Master mute toggle */}
        <div className="mt-4 p-3 bg-white/80 dark:bg-purple-900/50 rounded-xl border border-pink-200 dark:border-purple-700 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-stone-400" />
            ) : (
              <Volume2 className="w-5 h-5 text-pink-500 animate-pulse" />
            )}
            <div>
              <div className="font-['Silkscreen'] text-xs text-stone-800 dark:text-purple-200">
                Audio State: {isMuted ? 'Muted' : 'Playing ♡'}
              </div>
              <div className="text-[10px] text-stone-500 dark:text-purple-400">
                {isMuted ? 'Sound is currently off' : 'Cozy vibes are active'}
              </div>
            </div>
          </div>
          <button
            onClick={handleToggleMute}
            className={`px-3 py-1.5 rounded-xl font-['Silkscreen'] text-xs flex items-center gap-1.5 shadow transition-all ${
              isMuted
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 text-white'
                : 'bg-stone-200 dark:bg-purple-800 hover:bg-stone-300 text-stone-700 dark:text-purple-200'
            }`}
          >
            {isMuted ? <Play className="w-3.5 h-3.5 fill-current" /> : <Square className="w-3.5 h-3.5 fill-current" />}
            {isMuted ? 'Unmute Sound' : 'Mute'}
          </button>
        </div>

        {/* Volume sliders */}
        <div className="mt-4 space-y-3">
          {/* Master Volume */}
          <div>
            <div className="flex justify-between text-xs font-['Silkscreen'] text-stone-700 dark:text-purple-200 mb-1">
              <span>Master Volume</span>
              <span className="text-pink-600 dark:text-pink-300">{masterVol}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={masterVol}
              onChange={e => handleMasterChange(Number(e.target.value))}
              disabled={isMuted}
              className="w-full h-2 bg-pink-200 dark:bg-purple-800 rounded-lg appearance-none cursor-pointer accent-pink-500 disabled:opacity-40"
            />
          </div>

          {/* BGM Volume */}
          <div>
            <div className="flex justify-between text-xs font-['Silkscreen'] text-stone-700 dark:text-purple-200 mb-1">
              <span>Lullaby Music (BGM)</span>
              <span className="text-pink-600 dark:text-pink-300">{bgmVol}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={bgmVol}
              onChange={e => handleBgmChange(Number(e.target.value))}
              disabled={isMuted}
              className="w-full h-2 bg-pink-200 dark:bg-purple-800 rounded-lg appearance-none cursor-pointer accent-purple-500 disabled:opacity-40"
            />
          </div>

          {/* SFX Volume */}
          <div>
            <div className="flex justify-between text-xs font-['Silkscreen'] text-stone-700 dark:text-purple-200 mb-1">
              <span>Sound Effects (SFX)</span>
              <span className="text-pink-600 dark:text-pink-300">{sfxVol}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={sfxVol}
              onChange={e => handleSfxChange(Number(e.target.value))}
              disabled={isMuted}
              className="w-full h-2 bg-pink-200 dark:bg-purple-800 rounded-lg appearance-none cursor-pointer accent-pink-500 disabled:opacity-40"
            />
          </div>
        </div>

        {/* SFX test buttons */}
        <div className="mt-4 pt-3 border-t border-pink-200 dark:border-purple-800">
          <div className="text-[10px] font-['Silkscreen'] text-stone-500 dark:text-purple-300 mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-pink-400" /> Test Sound Effects:
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => soundManager.playHeart()}
              className="px-2 py-1 text-[10px] font-['Silkscreen'] bg-pink-100 hover:bg-pink-200 dark:bg-purple-900/60 dark:hover:bg-purple-800 text-pink-700 dark:text-pink-300 rounded-lg transition-all"
            >
              💖 Sparkle
            </button>
            <button
              onClick={() => soundManager.playBark()}
              className="px-2 py-1 text-[10px] font-['Silkscreen'] bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/60 dark:hover:bg-amber-900 text-amber-800 dark:text-amber-300 rounded-lg transition-all"
            >
              🐶 Pinkie Bark
            </button>
            <button
              onClick={() => soundManager.playPurr()}
              className="px-2 py-1 text-[10px] font-['Silkscreen'] bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/60 dark:hover:bg-purple-800 text-purple-700 dark:text-purple-300 rounded-lg transition-all"
            >
              🐱 Luna Purr
            </button>
            <button
              onClick={() => soundManager.playWaterSplash()}
              className="px-2 py-1 text-[10px] font-['Silkscreen'] bg-sky-100 hover:bg-sky-200 dark:bg-sky-950/60 dark:hover:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-lg transition-all"
            >
              💧 Water Sprout
            </button>
            <button
              onClick={() => soundManager.playShootingStar()}
              className="px-2 py-1 text-[10px] font-['Silkscreen'] bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-950/60 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-lg transition-all"
            >
              ⭐ Shooting Star
            </button>
            <button
              onClick={() => soundManager.playBreeze()}
              className="px-2 py-1 text-[10px] font-['Silkscreen'] bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950/60 dark:hover:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-lg transition-all"
            >
              🍃 Soft Breeze
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-2 text-center">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-full py-2 bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-['Silkscreen'] text-xs rounded-xl shadow-md transition-all active:scale-95"
          >
            Close Station ♡
          </button>
        </div>
      </div>
    </div>
  );
};
