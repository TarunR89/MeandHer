import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, ArrowLeft, ArrowRight, Play, Heart } from 'lucide-react';
import { MEMORY_BOOK_PAGES, type MemoryBookPage } from '../../data/storyData';
import { soundManager } from '../audio/SoundManager';
import { PixelButton } from '../ui/PixelButton';

interface MemoryBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChapter: (chapterId: string) => void;
}

export const MemoryBookModal: React.FC<MemoryBookModalProps> = ({
  isOpen,
  onClose,
  onSelectChapter
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  if (!isOpen) return null;

  const page: MemoryBookPage = MEMORY_BOOK_PAGES[currentPageIndex];

  const handleNext = () => {
    soundManager.playClick();
    if (currentPageIndex < MEMORY_BOOK_PAGES.length - 1) {
      setCurrentPageIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    soundManager.playClick();
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          className="relative max-w-xl w-full bg-[#fffcf7] rounded-3xl border-4 border-[#3b1d32] shadow-[8px_8px_0px_#3b1d32] overflow-hidden flex flex-col"
        >
          {/* Scrapbook Header */}
          <div className="bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 px-5 py-3.5 border-b-3 border-[#3b1d32] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-white/80 rounded-xl border border-[#3b1d32] text-purple-700">
                <BookOpen className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-['Silkscreen'] text-base font-bold text-[#3b1d32]">
                  OUR MEMORY BOOK 📖
                </h3>
                <span className="text-[10px] font-['Fredoka'] text-[#3b1d32]/80">
                  Six chapters of memories and unfiltered laughs
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close memory book"
              className="p-1.5 bg-white rounded-full border-2 border-[#3b1d32] hover:bg-pink-100 active:scale-95 transition-transform cursor-pointer"
            >
              <X className="w-4 h-4 text-[#3b1d32]" />
            </button>
          </div>

          {/* Page Tabs Navigation (1-6) */}
          <div className="flex items-center justify-between px-4 py-2 bg-pink-50 border-b border-pink-200 overflow-x-auto">
            <div className="flex items-center gap-1.5 mx-auto">
              {MEMORY_BOOK_PAGES.map((p, idx) => (
                <button
                  key={p.chapterId}
                  onClick={() => {
                    soundManager.playClick();
                    setCurrentPageIndex(idx);
                  }}
                  className={`px-2.5 py-1 rounded-xl text-[10px] font-['Silkscreen'] border transition-all cursor-pointer ${
                    currentPageIndex === idx
                      ? 'bg-pink-400 text-white border-pink-600 shadow-[2px_2px_0px_#db2777]'
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-pink-100'
                  }`}
                >
                  {p.pageNumber}. {p.sticker}
                </button>
              ))}
            </div>
          </div>

          {/* Scrapbook Page Content */}
          <div className="p-5 sm:p-6 space-y-4 max-h-[65vh] overflow-y-auto bg-[radial-gradient(#fbcfe8_1px,transparent_1px)] [background-size:16px_16px]">
            {/* Page Header Sticker & Title */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-['Silkscreen'] text-pink-600 font-bold block mb-0.5">
                  PAGE {page.pageNumber} OF 6 • {page.dateOrPhase}
                </span>
                <h2 className="font-['Silkscreen'] text-lg sm:text-xl font-bold text-[#3b1d32] flex items-center gap-2">
                  <span>{page.sticker}</span>
                  <span>{page.title}</span>
                </h2>
              </div>

              {/* Replay Chapter Button */}
              <PixelButton
                variant="pink"
                size="sm"
                icon={<Play className="w-3.5 h-3.5 fill-white" />}
                onClick={() => onSelectChapter(page.chapterId)}
              >
                Replay
              </PixelButton>
            </div>

            {/* Authentic Summary */}
            <div className="p-3.5 bg-white rounded-2xl border-2 border-pink-200 shadow-sm">
              <p className="font-['Fredoka'] text-sm sm:text-base text-[#4a2840] leading-relaxed">
                {page.summary}
              </p>
            </div>

            {/* Highlight Quote */}
            <div className="p-3 bg-pink-100/70 rounded-2xl border border-pink-300">
              <span className="text-[9px] font-['Silkscreen'] text-pink-700 font-bold block mb-1">
                HIGHLIGHT MEMORY ♡
              </span>
              <p className="font-['Fredoka'] text-xs sm:text-sm text-[#be185d] font-bold italic">
                {page.highlightQuote}
              </p>
            </div>

            {/* Pet Sticker Note */}
            <div className="p-2.5 bg-purple-50/80 rounded-xl border border-purple-200 flex items-center gap-2 text-xs font-['Fredoka'] text-purple-900">
              <Heart className="w-3.5 h-3.5 fill-purple-400 text-purple-400 flex-shrink-0" />
              <span>{page.petNote}</span>
            </div>
          </div>

          {/* Footer Controls with Prev / Next */}
          <div className="p-3 bg-white border-t-2 border-pink-200 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentPageIndex === 0}
              className={`px-3 py-1.5 rounded-xl border-2 border-[#3b1d32] font-['Silkscreen'] text-xs flex items-center gap-1 cursor-pointer ${
                currentPageIndex === 0
                  ? 'opacity-40 pointer-events-none bg-gray-100 text-gray-400'
                  : 'bg-white hover:bg-pink-50 text-[#3b1d32] shadow-[2px_2px_0px_#3b1d32]'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Prev
            </button>

            <span className="font-['Silkscreen'] text-[11px] text-gray-500">
              {currentPageIndex + 1} / 6
            </span>

            <button
              onClick={handleNext}
              disabled={currentPageIndex === MEMORY_BOOK_PAGES.length - 1}
              className={`px-3 py-1.5 rounded-xl border-2 border-[#3b1d32] font-['Silkscreen'] text-xs flex items-center gap-1 cursor-pointer ${
                currentPageIndex === MEMORY_BOOK_PAGES.length - 1
                  ? 'opacity-40 pointer-events-none bg-gray-100 text-gray-400'
                  : 'bg-white hover:bg-pink-50 text-[#3b1d32] shadow-[2px_2px_0px_#3b1d32]'
              }`}
            >
              Next <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
