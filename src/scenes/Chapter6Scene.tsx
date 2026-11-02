import React, { useState } from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import { WaitingScene } from '../components/story/WaitingScene';
import { AnswerRevealScene } from '../components/story/AnswerRevealScene';
import { GrandCelebrationScene } from '../components/story/GrandCelebrationScene';
import { FinalUniverseScene } from '../components/story/FinalUniverseScene';
import { SecretPromiseModal } from '../components/story/SecretPromiseModal';
import { MemoryBookModal } from '../components/story/MemoryBookModal';
import { AchievementPopup } from '../components/ui/AchievementPopup';
import { markStoryCompleted, unlockSecretPromise } from '../data/progressConfig';
import type { CharacterSettings } from '../data/characterConfig';

interface Chapter6SceneProps {
  settings: CharacterSettings;
  onBackToLanding: () => void;
  onOpenChapterNav: () => void;
  onSelectChapter: (chapterId: string) => void;
  onOpenWorld?: () => void;
}

type Chapter6Stage = 'waiting' | 'answer-reveal' | 'celebration' | 'final-universe';

export const Chapter6Scene: React.FC<Chapter6SceneProps> = ({
  settings,
  onBackToLanding,
  onOpenChapterNav,
  onSelectChapter,
  onOpenWorld
}) => {
  const [stage, setStage] = useState<Chapter6Stage>('waiting');
  const [showUniverseAchievement, setShowUniverseAchievement] = useState(false);
  const [isSecretPromiseOpen, setIsSecretPromiseOpen] = useState(false);
  const [isMemoryBookOpen, setIsMemoryBookOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdf2f8] via-[#fff1f2] to-[#fed7aa]/30 p-3 sm:p-6 flex flex-col items-center select-none text-[#3b1d32]">
      {/* Top Header */}
      {stage !== 'answer-reveal' && (
        <header className="w-full max-w-xl flex items-center justify-between mb-4">
          <button
            onClick={onBackToLanding}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 rounded-2xl border-2 border-[#3b1d32] shadow-[2px_2px_0px_#3b1d32] font-['Silkscreen'] text-xs text-[#3b1d32] hover:bg-pink-50 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK</span>
          </button>

          <span className="font-['Silkscreen'] text-xs text-rose-700 bg-rose-100 px-3 py-1 rounded-full border border-rose-300 font-bold flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            CH. 6: THE WORD THAT CHANGED EVERYTHING
          </span>

          <button
            onClick={onOpenChapterNav}
            className="px-3 py-1.5 bg-purple-100 rounded-2xl border-2 border-[#3b1d32] shadow-[2px_2px_0px_#3b1d32] font-['Silkscreen'] text-xs text-purple-900 hover:bg-purple-200 transition-all cursor-pointer"
          >
            CHAPTERS
          </button>
        </header>
      )}

      {/* STAGE 1: WAITING (Scene 6.1) */}
      {stage === 'waiting' && (
        <WaitingScene
          settings={settings}
          onProceedToAnswer={() => setStage('answer-reveal')}
        />
      )}

      {/* STAGE 2: THE MOST IMPORTANT MOMENT (Scene 6.2) */}
      {stage === 'answer-reveal' && (
        <AnswerRevealScene
          settings={settings}
          onRevealComplete={() => {
            markStoryCompleted();
            setStage('celebration');
          }}
        />
      )}

      {/* STAGE 3: THE GRAND CELEBRATION (Scene 6.3) */}
      {stage === 'celebration' && (
        <GrandCelebrationScene
          settings={settings}
          onProceedToFinalScene={() => {
            setShowUniverseAchievement(true);
            setStage('final-universe');
          }}
        />
      )}

      {/* STAGE 4: FINAL UNIVERSE SCENE (Scene 6.4) */}
      {stage === 'final-universe' && (
        <FinalUniverseScene
          settings={settings}
          onOpenMemoryBook={() => setIsMemoryBookOpen(true)}
          onOpenSecretPromise={() => {
            unlockSecretPromise();
            setIsSecretPromiseOpen(true);
          }}
          onBackToLanding={onBackToLanding}
          onOpenWorld={onOpenWorld}
        />
      )}

      {/* Achievement Popup for Completing the Story */}
      <AchievementPopup
        isOpen={showUniverseAchievement}
        title="OUR LITTLE UNIVERSE BEGAN ♡"
        subtitle="She said of course ❤️. Two separate paths officially became one beautiful little universe."
        onDismiss={() => setShowUniverseAchievement(false)}
      />

      {/* Secret Promise Letter Modal */}
      <SecretPromiseModal
        isOpen={isSecretPromiseOpen}
        onClose={() => setIsSecretPromiseOpen(false)}
      />

      {/* Interactive Memory Book Modal */}
      <MemoryBookModal
        isOpen={isMemoryBookOpen}
        onClose={() => setIsMemoryBookOpen(false)}
        onSelectChapter={(id) => {
          setIsMemoryBookOpen(false);
          onSelectChapter(id);
        }}
      />
    </div>
  );
};
