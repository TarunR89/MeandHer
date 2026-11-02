import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, BookOpen, Heart, Clock } from 'lucide-react';
import type { Chapter } from '../../data/storyData';
import { PixelButton } from '../ui/PixelButton';

interface ChapterPreviewModalProps {
  chapter: Chapter | null;
  isOpen: boolean;
  onClose: () => void;
  onPlayChapter1?: () => void;
}

export const ChapterPreviewModal: React.FC<ChapterPreviewModalProps> = ({
  chapter,
  isOpen,
  onClose,
  onPlayChapter1
}) => {
  if (!isOpen || !chapter) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative max-w-lg w-full bg-[#fffbf2] rounded-3xl border-4 border-[#3b1d32] shadow-[8px_8px_0px_#3b1d32] overflow-hidden"
        >
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 px-6 py-4 border-b-3 border-[#3b1d32] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-white/80 rounded-xl border border-[#3b1d32] text-pink-600">
                <BookOpen className="w-5 h-5" />
              </span>
              <div>
                <span className="font-['Silkscreen'] text-xs font-bold text-[#4a2840] tracking-wider">
                  CHAPTER {chapter.number}
                </span>
                <h3 className="font-['Fredoka'] text-lg font-bold text-[#3b1d32] leading-tight">
                  {chapter.title}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close story preview"
              className="p-1.5 bg-white rounded-full border-2 border-[#3b1d32] hover:bg-pink-100 active:scale-95 transition-transform"
            >
              <X className="w-5 h-5 text-[#3b1d32]" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            {/* Status Pill */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-[#7c3aed] border border-purple-300 rounded-full font-['Silkscreen'] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                {chapter.badge}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-['Fredoka'] text-gray-500">
                <Clock className="w-3.5 h-3.5" />
                {chapter.timeframe}
              </span>
            </div>

            {/* Subtitle */}
            <p className="text-base font-semibold text-pink-600 font-['Fredoka'] italic">
              "{chapter.subtitle}"
            </p>

            {/* Quote Callout */}
            <div className="p-4 bg-pink-50/80 border-2 border-dashed border-pink-300 rounded-2xl">
              <p className="text-sm text-[#4a2840] font-['Fredoka'] leading-relaxed font-medium">
                {chapter.previewQuote}
              </p>
            </div>

            {/* Teaser Paragraphs */}
            <div className="space-y-3 font-['Quicksand'] text-sm text-[#4a2840]/90 leading-relaxed">
              {chapter.teaserParagraphs.map((para, idx) => (
                <p key={idx} className="bg-white/70 p-3 rounded-xl border border-pink-100">
                  {para}
                </p>
              ))}
            </div>

            {/* Development note */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 font-['Fredoka']">
              ✨ <strong>Phase 1 Experience:</strong> Chapter 1 is fully playable end-to-end! Chapters 2 through 6 will expand with their full branching visual novel cutscenes in Phase 2.
            </div>
          </div>

          {/* Footer Controls */}
          <div className="bg-white/80 p-4 border-t-2 border-pink-200 flex items-center justify-between gap-3">
            <PixelButton variant="outline" size="sm" onClick={onClose}>
              Back
            </PixelButton>

            {onPlayChapter1 && (
              <PixelButton
                variant="pink"
                size="sm"
                icon={<Heart className="w-4 h-4 fill-white" />}
                onClick={() => {
                  onClose();
                  onPlayChapter1();
                }}
              >
                Play Chapter 1 Now
              </PixelButton>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
