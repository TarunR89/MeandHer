import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, Calendar, Heart, Volume2, Save, RotateCcw } from 'lucide-react';
import {
  type CharacterSettings,
  defaultCharacterSettings,
  saveCharacterSettings,
  getDaysTogether
} from '../../data/characterConfig';
import { PixelButton } from './PixelButton';
import { soundManager } from '../audio/SoundManager';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: CharacterSettings;
  onSave: (newSettings: CharacterSettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave
}) => {
  const [formData, setFormData] = useState<CharacterSettings>(settings);
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const daysTogether = getDaysTogether(formData.relationshipStartDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveCharacterSettings(formData);
    onSave(formData);
    soundManager.playHeart();
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 1000);
  };

  const handleReset = () => {
    setFormData(defaultCharacterSettings);
    saveCharacterSettings(defaultCharacterSettings);
    onSave(defaultCharacterSettings);
    soundManager.playClick();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          className="relative max-w-md w-full bg-[#fffbf2] rounded-3xl border-4 border-[#3b1d32] shadow-[8px_8px_0px_#3b1d32] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 px-6 py-4 border-b-3 border-[#3b1d32] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-white/80 rounded-xl border border-[#3b1d32] text-pink-600">
                <Settings className="w-5 h-5" />
              </span>
              <div>
                <h2 className="font-['Silkscreen'] text-base font-bold text-[#3b1d32]">
                  OUR UNIVERSE SETTINGS
                </h2>
                <p className="font-['Fredoka'] text-xs text-[#4a2840]/80">
                  Customize our names & relationship date
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close settings"
              className="p-1.5 bg-white rounded-full border-2 border-[#3b1d32] hover:bg-pink-100 active:scale-95 transition-transform"
            >
              <X className="w-5 h-5 text-[#3b1d32]" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {savedNotice && (
              <div className="p-3 bg-pink-100 border-2 border-pink-400 rounded-xl text-center font-['Fredoka'] text-pink-700 text-sm font-bold animate-bounce">
                ✨ Settings saved with love!
              </div>
            )}

            {/* Days Together Counter Banner (if date set) */}
            {daysTogether !== null ? (
              <div className="p-3.5 bg-gradient-to-r from-pink-100 to-rose-100 border-2 border-pink-300 rounded-2xl text-center">
                <div className="flex items-center justify-center gap-1.5 text-pink-600 mb-1">
                  <Heart className="w-4 h-4 fill-pink-500" />
                  <span className="font-['Silkscreen'] text-xs font-bold">DAYS TOGETHER</span>
                </div>
                <div className="font-['Silkscreen'] text-2xl text-[#be185d]">
                  {daysTogether} DAYS
                </div>
                <p className="text-xs text-pink-700/80 font-['Fredoka'] mt-0.5">
                  ...and counting every single beautiful second! ♡
                </p>
              </div>
            ) : (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-800 font-['Fredoka'] flex items-center gap-2">
                <Calendar className="w-4 h-4 flex-shrink-0 text-amber-600" />
                <span>Add your special relationship start date below to track days together!</span>
              </div>
            )}

            {/* Boy's Name */}
            <div>
              <label className="block font-['Silkscreen'] text-xs text-[#4a2840] mb-1 font-bold">
                BOY'S NAME
              </label>
              <input
                type="text"
                value={formData.boyName}
                onChange={(e) => setFormData({ ...formData, boyName: e.target.value })}
                placeholder="e.g. Him or your name"
                className="w-full px-4 py-2.5 bg-white rounded-xl border-2 border-[#3b1d32] font-['Fredoka'] text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Girl's Name */}
            <div>
              <label className="block font-['Silkscreen'] text-xs text-[#4a2840] mb-1 font-bold">
                GIRL'S NAME
              </label>
              <input
                type="text"
                value={formData.girlName}
                onChange={(e) => setFormData({ ...formData, girlName: e.target.value })}
                placeholder="e.g. Her or her name"
                className="w-full px-4 py-2.5 bg-white rounded-xl border-2 border-[#3b1d32] font-['Fredoka'] text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Relationship Start Date */}
            <div>
              <label className="block font-['Silkscreen'] text-xs text-[#4a2840] mb-1 font-bold">
                RELATIONSHIP START DATE
              </label>
              <input
                type="date"
                value={formData.relationshipStartDate}
                onChange={(e) => setFormData({ ...formData, relationshipStartDate: e.target.value })}
                className="w-full px-4 py-2 bg-white rounded-xl border-2 border-[#3b1d32] font-['Fredoka'] text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <span className="text-[11px] text-gray-500 font-['Fredoka'] mt-1 block">
                Leave blank or set when ready (e.g. the day she said "of course ♡")
              </span>
            </div>

            {/* Serial & Inside Jokes Settings */}
            <div className="pt-2 border-t border-pink-200">
              <span className="font-['Silkscreen'] text-[11px] text-purple-700 block mb-2 font-bold">
                INSIDE JOKES & DRAMA
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-500 block text-[10px]">Favorite Serial</span>
                  <input
                    type="text"
                    value={formData.favoriteSerial}
                    onChange={(e) => setFormData({ ...formData, favoriteSerial: e.target.value })}
                    className="w-full px-2 py-1.5 bg-white rounded-lg border border-[#3b1d32] font-['Fredoka'] text-xs"
                  />
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">Drama Character</span>
                  <input
                    type="text"
                    value={formData.serialCharacter}
                    onChange={(e) => setFormData({ ...formData, serialCharacter: e.target.value })}
                    className="w-full px-2 py-1.5 bg-white rounded-lg border border-[#3b1d32] font-['Fredoka'] text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Audio SFX Test */}
            <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 flex items-center justify-between">
              <span className="font-['Fredoka'] text-xs text-purple-900 font-semibold flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-purple-600" />
                Test Retro Sound FX
              </span>
              <button
                type="button"
                onClick={() => {
                  soundManager.setMuted(false);
                  soundManager.playHeart();
                }}
                className="px-2.5 py-1 bg-purple-200 hover:bg-purple-300 rounded-lg text-[10px] font-['Silkscreen'] text-purple-900 border border-purple-400 cursor-pointer"
              >
                Chime! ♫
              </button>
            </div>

            {/* Buttons */}
            <div className="pt-3 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1 px-3 py-2 text-xs font-['Fredoka'] text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>

              <div className="flex gap-2">
                <PixelButton type="button" variant="outline" size="sm" onClick={onClose}>
                  Cancel
                </PixelButton>
                <PixelButton
                  type="submit"
                  variant="pink"
                  size="sm"
                  icon={<Save className="w-3.5 h-3.5" />}
                >
                  Save Settings
                </PixelButton>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
