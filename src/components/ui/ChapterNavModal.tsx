import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Eye, BookOpen } from 'lucide-react';
import { CHAPTERS, type Chapter } from '../../data/storyData';
import { PixelButton } from './PixelButton';
import { ChapterPreviewModal } from '../story/ChapterPreviewModal';

interface ChapterNavModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChapter: (chapterId: string) => void;
}

export const ChapterNavModal: React.FC<ChapterNavModalProps> = ({
  isOpen,
  onClose,
  onSelectChapter
}) => {
  const [previewChapter, setPreviewChapter] = useState<Chapter | null>(null);

  if (!isOpen) return null;

  const handleCardClick = (chapter: Chapter) => {
    if (chapter.status === 'playable') {
      onSelectChapter(chapter.id);
      onClose();
    } else {
      setPreviewChapter(chapter);
    }
  };

  return (
    <>
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm select-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            className="relative max-w-2xl w-full bg-[#fffbf2] rounded-3xl border-4 border-[#3b1d32] shadow-[8px_8px_0px_#3b1d32] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 px-6 py-4 border-b-3 border-[#3b1d32] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-white/80 rounded-xl border border-[#3b1d32] text-pink-600">
                  <BookOpen className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="font-['Silkscreen'] text-base sm:text-lg font-bold text-[#3b1d32]">
                    STORY CHAPTERS
                  </h2>
                  <p className="font-['Fredoka'] text-xs text-[#4a2840]/80">
                    Six milestones of our unforgettable journey
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Close chapter menu"
                className="p-1.5 bg-white rounded-full border-2 border-[#3b1d32] hover:bg-pink-100 active:scale-95 transition-transform"
              >
                <X className="w-5 h-5 text-[#3b1d32]" />
              </button>
            </div>

            {/* Chapters Grid */}
            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-3.5">
              {/* Special Forever World Hub Link */}
              <div
                onClick={() => {
                  onSelectChapter('our-world');
                  onClose();
                }}
                className="relative p-4 rounded-2xl border-3 border-purple-400 bg-gradient-to-r from-purple-100 via-pink-100 to-rose-100 shadow-[4px_4px_0px_#7c3aed] hover:translate-x-1 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500 text-white border-2 border-[#3b1d32] flex items-center justify-center font-['Silkscreen'] text-lg font-bold flex-shrink-0 group-hover:rotate-12 transition-transform">
                    🏡
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-['Silkscreen'] text-sm font-bold text-purple-900">
                        OUR FOREVER WORLD ♡
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-['Silkscreen'] font-bold bg-purple-200 text-purple-800 border border-purple-400 animate-pulse">
                        EXPLORABLE HUB
                      </span>
                    </div>
                    <p className="font-['Fredoka'] text-xs text-[#4a2840]/90 mt-0.5">
                      Cozy cottage, Pinkie's playground, Luna's corner, memory garden & mailbox
                    </p>
                  </div>
                </div>
                <div className="self-end sm:self-center flex-shrink-0">
                  <PixelButton
                    variant="purple"
                    size="sm"
                    icon={<Play className="w-3.5 h-3.5 fill-white" />}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectChapter('our-world');
                      onClose();
                    }}
                  >
                    Enter World
                  </PixelButton>
                </div>
              </div>

              {CHAPTERS.map((ch) => {
                const isPlayable = ch.status === 'playable';
                return (
                  <div
                    key={ch.id}
                    onClick={() => handleCardClick(ch)}
                    className={`
                      relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3
                      ${isPlayable
                        ? 'bg-gradient-to-r from-pink-50 to-rose-50 border-pink-400 hover:border-pink-600 shadow-[4px_4px_0px_#f472b6] hover:translate-x-1'
                        : 'bg-white/70 border-purple-200 hover:border-purple-400 shadow-[3px_3px_0px_#e9d5ff] hover:bg-purple-50/50'
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl border-2 border-[#3b1d32] flex items-center justify-center font-['Silkscreen'] font-bold text-sm flex-shrink-0 ${
                          isPlayable ? 'bg-pink-300 text-[#3b1d32]' : 'bg-purple-200 text-[#3b1d32]'
                        }`}
                      >
                        {ch.number}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-['Fredoka'] text-base font-bold text-[#3b1d32]">
                            {ch.title}
                          </h3>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-['Silkscreen'] font-bold border ${
                              isPlayable
                                ? 'bg-pink-100 text-pink-700 border-pink-300 animate-pulse'
                                : 'bg-purple-100 text-purple-700 border-purple-300'
                            }`}
                          >
                            {isPlayable ? 'PLAYABLE' : 'PREVIEW'}
                          </span>
                        </div>
                        <p className="font-['Quicksand'] text-xs text-[#4a2840]/80 mt-0.5 line-clamp-1">
                          {ch.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="self-end sm:self-center flex-shrink-0">
                      {isPlayable ? (
                        <PixelButton
                          variant="pink"
                          size="sm"
                          icon={<Play className="w-3.5 h-3.5 fill-white" />}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectChapter(ch.id);
                            onClose();
                          }}
                        >
                          Play Now
                        </PixelButton>
                      ) : (
                        <PixelButton
                          variant="purple"
                          size="sm"
                          icon={<Eye className="w-3.5 h-3.5" />}
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewChapter(ch);
                          }}
                        >
                          Story Preview
                        </PixelButton>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="bg-white/80 p-4 border-t-2 border-pink-200 flex justify-end">
              <PixelButton variant="outline" size="sm" onClick={onClose}>
                Close
              </PixelButton>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>

      {/* Chapter Story Preview Modal for Phase 2 teasers */}
      <ChapterPreviewModal
        chapter={previewChapter}
        isOpen={Boolean(previewChapter)}
        onClose={() => setPreviewChapter(null)}
        onPlayChapter1={() => {
          setPreviewChapter(null);
          onSelectChapter('chapter-1');
          onClose();
        }}
      />
    </>
  );
};
