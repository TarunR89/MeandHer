import React, { useState } from 'react';
import {
  Flower2,
  Sparkles,
  Plus,
  Play,
  Trash2,
  Edit2,
  Calendar,
  X,
  Heart,
  ShieldCheck,
} from 'lucide-react';
import {
  MEMORY_GARDEN_FLOWERS,
  type MemoryGardenFlower,
  type CustomMemory,
} from '../../data/storyData';
import {
  type StoryProgress,
  saveCustomMemory,
  deleteCustomMemory,
} from '../../data/progressConfig';
import { soundManager } from '../audio/SoundManager';

interface MemoryGardenProps {
  progress: StoryProgress;
  onUpdateProgress: (updated: StoryProgress) => void;
  onReplayChapter: (chapterNumber: number) => void;
  effectiveIsNight?: boolean;
}

export const MemoryGarden: React.FC<MemoryGardenProps> = ({
  progress,
  onUpdateProgress,
  onReplayChapter,
}) => {
  const [selectedFlower, setSelectedFlower] = useState<MemoryGardenFlower | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMemory, setEditingMemory] = useState<CustomMemory | null>(null);

  // Form fields
  const [formTitle, setFormTitle] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formColor, setFormColor] = useState('pink');

  const customMemories: CustomMemory[] = progress.customMemories || [];

  const getMemoryEmoji = (color?: string) => {
    switch (color) {
      case 'yellow':
        return '🌻';
      case 'purple':
        return '🪻';
      case 'sky':
        return '🪷';
      default:
        return '🌷';
    }
  };

  const handleOpenAddModal = (mem?: CustomMemory) => {
    soundManager.playClick();
    if (mem) {
      setEditingMemory(mem);
      setFormTitle(mem.title);
      setFormDate(mem.date || new Date().toISOString().slice(0, 10));
      setFormDescription(mem.description);
      setFormColor(mem.color || 'pink');
    } else {
      setEditingMemory(null);
      setFormTitle('');
      setFormDate(new Date().toISOString().slice(0, 10));
      setFormDescription('');
      setFormColor('pink');
    }
    setIsAddModalOpen(true);
  };

  const handleSaveMemoryForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    soundManager.playHeart();
    const newMem: CustomMemory = {
      id: editingMemory ? editingMemory.id : `mem_${Date.now()}`,
      title: formTitle.trim(),
      date: formDate.trim() || new Date().toISOString().slice(0, 10),
      description: formDescription.trim(),
      color: formColor,
      createdAt: editingMemory?.createdAt || Date.now(),
    };

    const updated = saveCustomMemory(newMem);
    onUpdateProgress(updated);
    setIsAddModalOpen(false);
  };

  const handleDeleteMemory = (id: string) => {
    soundManager.playPop();
    const updated = deleteCustomMemory(id);
    onUpdateProgress(updated);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border-4 border-emerald-300 dark:border-emerald-700 shadow-2xl bg-gradient-to-b from-emerald-50 via-teal-50 to-pink-50 dark:from-slate-950 dark:via-purple-950 dark:to-emerald-950 text-stone-800 dark:text-purple-100 p-4 sm:p-6 select-none transition-colors duration-700">
      {/* Garden Top Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b-2 border-emerald-200 dark:border-emerald-800">
        <div>
          <h2 className="font-['Silkscreen'] text-base sm:text-lg text-emerald-800 dark:text-emerald-300 font-bold flex items-center gap-2">
            🌸 Our Blooming Memory Garden
          </h2>
          <p className="text-xs text-stone-600 dark:text-purple-300">
            Every chapter bloomed into an eternal flower. Plant your own private memories below!
          </p>
        </div>

        <button
          onClick={() => handleOpenAddModal()}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-['Silkscreen'] text-xs font-bold shadow-md active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          Plant New Memory 🌷
        </button>
      </div>

      {/* Part 1: The 6 Milestone Chapter Flowers */}
      <div className="relative z-10 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-pink-500 animate-spin" />
          <h3 className="font-['Silkscreen'] text-xs sm:text-sm text-stone-700 dark:text-purple-200 font-bold uppercase tracking-wider">
            Story Milestone Blooms (Chapters 1–6)
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {MEMORY_GARDEN_FLOWERS.map((flower) => (
            <div
              key={flower.id}
              onClick={() => {
                soundManager.playHeart();
                setSelectedFlower(flower);
              }}
              role="button"
              tabIndex={0}
              className="group cursor-pointer p-3 rounded-2xl bg-white/80 dark:bg-purple-900/40 border-2 border-pink-200 dark:border-purple-700 shadow-sm hover:shadow-lg hover:scale-105 active:scale-95 transition-all text-center flex flex-col items-center justify-between"
            >
              <div className="text-3xl mb-1 group-hover:rotate-12 transition-transform">
                {flower.icon}
              </div>
              <div className="font-['Silkscreen'] text-[11px] font-bold text-pink-700 dark:text-pink-300">
                Ch. {flower.id}
              </div>
              <div className="text-[10px] text-stone-600 dark:text-purple-200 line-clamp-1 mt-0.5 font-bold">
                {flower.name}
              </div>
              <div className="text-[9px] text-stone-500 dark:text-purple-400 line-clamp-1">
                {flower.subtitle}
              </div>
              <span className="mt-2 text-[9px] font-['Silkscreen'] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                Tap to View ♡
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Part 2: Custom Memories Bed */}
      <div className="relative z-10 pt-4 border-t-2 border-emerald-200 dark:border-emerald-800">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            <h3 className="font-['Silkscreen'] text-xs sm:text-sm text-stone-700 dark:text-purple-200 font-bold uppercase tracking-wider">
              Our Personal Planted Memories ({customMemories.length})
            </h3>
          </div>
          <span className="text-[10px] font-['Silkscreen'] text-stone-500 dark:text-purple-400">
            Stored locally on your browser 🔒
          </span>
        </div>

        {customMemories.length === 0 ? (
          <div className="text-center py-8 px-4 rounded-2xl bg-white/60 dark:bg-purple-950/40 border-2 border-dashed border-emerald-300 dark:border-emerald-700">
            <p className="font-['Silkscreen'] text-xs text-stone-600 dark:text-purple-300 mb-2">
              No custom memory flowers planted yet! 🌱
            </p>
            <p className="text-xs text-stone-500 dark:text-purple-400 max-w-md mx-auto mb-4">
              Plant your first memory together — like a special date night, a funny inside joke, or a trip you took!
            </p>
            <button
              onClick={() => handleOpenAddModal()}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-['Silkscreen'] text-xs shadow-md transition-all"
            >
              + Plant First Memory 🌸
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {customMemories.map((mem) => (
              <div
                key={mem.id}
                className="relative p-4 rounded-2xl bg-white/85 dark:bg-purple-900/50 border-2 border-pink-200 dark:border-purple-700 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-2xl">{getMemoryEmoji(mem.color)}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenAddModal(mem)}
                        className="p-1 rounded text-stone-400 hover:text-stone-700 dark:hover:text-white"
                        title="Edit Memory"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteMemory(mem.id)}
                        className="p-1 rounded text-stone-400 hover:text-rose-500"
                        title="Delete Memory"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <h4 className="font-['Silkscreen'] text-xs font-bold text-pink-700 dark:text-pink-300">
                    {mem.title}
                  </h4>
                  <div className="flex items-center gap-1 text-[10px] text-stone-400 dark:text-purple-400 my-1">
                    <Calendar className="w-3 h-3" />
                    <span>{mem.date}</span>
                  </div>
                  <p className="text-xs text-stone-700 dark:text-purple-200 whitespace-pre-wrap leading-relaxed mt-1">
                    {mem.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* LocalStorage Privacy Notice */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-stone-500 dark:text-purple-400 font-['Silkscreen']">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Browser-only private storage. Never sent to any external server.</span>
        </div>
      </div>

      {/* Chapter Flower Detail Modal */}
      {selectedFlower && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-purple-950 rounded-3xl border-4 border-pink-300 dark:border-purple-600 shadow-2xl p-6 text-center">
            <div className="text-4xl mb-2">{selectedFlower.icon}</div>
            <div className="text-[10px] font-['Silkscreen'] text-pink-500 dark:text-pink-300 uppercase tracking-widest font-bold">
              Chapter {selectedFlower.id} Milestone • {selectedFlower.subtitle}
            </div>
            <h3 className="font-['Silkscreen'] text-base text-stone-800 dark:text-purple-100 font-bold mt-1 mb-2">
              {selectedFlower.name}
            </h3>
            <p className="font-['Fredoka'] text-xs text-stone-600 dark:text-purple-200 leading-relaxed mb-3">
              {selectedFlower.summary}
            </p>
            <div className="font-['Silkscreen'] text-xs text-pink-600 dark:text-pink-300 leading-relaxed mb-6 bg-pink-50 dark:bg-purple-900/60 p-4 rounded-2xl border border-pink-200 dark:border-purple-800 italic">
              {selectedFlower.quote}
            </div>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => {
                  soundManager.playClick();
                  onReplayChapter(selectedFlower.id);
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-['Silkscreen'] text-xs font-bold rounded-xl shadow-md transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Replay Chapter {selectedFlower.id} ♡
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setSelectedFlower(null);
                }}
                className="px-4 py-2 bg-stone-200 hover:bg-stone-300 dark:bg-purple-800 dark:hover:bg-purple-700 text-stone-700 dark:text-purple-200 font-['Silkscreen'] text-xs rounded-xl transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Memory Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border-4 border-emerald-300 dark:border-emerald-600 shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-purple-800 mb-4">
              <h3 className="font-['Silkscreen'] text-sm text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1.5">
                <Flower2 className="w-4 h-4" />
                {editingMemory ? 'Edit Memory Flower' : 'Plant a New Memory Flower'}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMemoryForm} className="space-y-3">
              <div>
                <label className="block text-xs font-['Silkscreen'] text-stone-700 dark:text-purple-200 mb-1">
                  Memory Title:
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g., First Long Drive / Cute serial call"
                  required
                  className="w-full text-xs px-3 py-2 rounded-xl border border-stone-300 dark:border-purple-700 bg-stone-50 dark:bg-purple-950 text-stone-800 dark:text-purple-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-['Silkscreen'] text-stone-700 dark:text-purple-200 mb-1">
                  Date:
                </label>
                <input
                  type="date"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-stone-300 dark:border-purple-700 bg-stone-50 dark:bg-purple-950 text-stone-800 dark:text-purple-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-['Silkscreen'] text-stone-700 dark:text-purple-200 mb-1">
                  Memory Story / Note:
                </label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="What made this moment unforgettable? ♡"
                  rows={3}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-stone-300 dark:border-purple-700 bg-stone-50 dark:bg-purple-950 text-stone-800 dark:text-purple-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-['Silkscreen'] text-stone-700 dark:text-purple-200 mb-1">
                  Flower Color:
                </label>
                <div className="flex gap-2">
                  {[
                    { id: 'pink', emoji: '🌸' },
                    { id: 'yellow', emoji: '🌻' },
                    { id: 'purple', emoji: '🪻' },
                    { id: 'sky', emoji: '🪷' },
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setFormColor(c.id)}
                      className={`text-xl p-2 rounded-xl border-2 transition-all ${
                        formColor === c.id
                          ? 'border-emerald-500 bg-emerald-100 dark:bg-purple-900 scale-110'
                          : 'border-transparent bg-stone-100 dark:bg-purple-950 opacity-60'
                      }`}
                    >
                      {c.emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-['Silkscreen'] text-xs font-bold shadow-md hover:from-emerald-600 hover:to-teal-600 transition-all"
                >
                  {editingMemory ? 'Update Memory ♡' : 'Plant Flower ♡'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-stone-200 dark:bg-purple-800 text-stone-700 dark:text-purple-200 rounded-xl font-['Silkscreen'] text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
