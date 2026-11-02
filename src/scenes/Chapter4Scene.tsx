import React, { useState } from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import { HeartGardenScene } from '../components/scenery/HeartGardenScene';
import { SecretLetterModal } from '../components/ui/SecretLetterModal';
import { FallingHeartsMinigame } from '../components/story/FallingHeartsMinigame';
import { MoonlightRealizationScene } from '../components/story/MoonlightRealizationScene';
import { AchievementPopup } from '../components/ui/AchievementPopup';
import { PixelButton } from '../components/ui/PixelButton';
import { soundManager } from '../components/audio/SoundManager';
import {
  loadStoryProgress,
  markChapterCompleted,
  markLetterDiscovered,
  unlockHeartId
} from '../data/progressConfig';
import type { CharacterSettings } from '../data/characterConfig';

interface Chapter4SceneProps {
  settings: CharacterSettings;
  onBackToLanding: () => void;
  onOpenChapterNav: () => void;
  onProceedToChapter5?: () => void;
}

type Chapter4Stage = 'heart-garden' | 'catching-feelings' | 'realization-moonlight' | 'finished';

export const Chapter4Scene: React.FC<Chapter4SceneProps> = ({
  settings,
  onBackToLanding,
  onOpenChapterNav,
  onProceedToChapter5
}) => {
  const [stage, setStage] = useState<Chapter4Stage>('heart-garden');
  const [collectedHearts, setCollectedHearts] = useState<number[]>(() => {
    return loadStoryProgress().collectedHearts;
  });
  const [hasDiscoveredLetter, setHasDiscoveredLetter] = useState<boolean>(() => {
    return loadStoryProgress().hasDiscoveredLetter;
  });
  const [isLetterModalOpen, setIsLetterModalOpen] = useState(false);
  const [showSmittenAchievement, setShowSmittenAchievement] = useState(false);

  const handleFlowerTapped = (flowerId: number) => {
    const updated = unlockHeartId(flowerId);
    setCollectedHearts(updated.collectedHearts);
  };

  const handleOpenLetter = () => {
    soundManager.playPaperRustle();
    markLetterDiscovered();
    setHasDiscoveredLetter(true);
    setIsLetterModalOpen(true);
  };

  const areAllSixCollected = [1, 2, 3, 4, 5, 6].every(id => collectedHearts.includes(id));

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fed7aa] via-[#fbcfe8] to-[#fce7f3] p-3 sm:p-6 flex flex-col items-center select-none">
      {/* Top Navigation */}
      <header className="w-full max-w-2xl flex items-center justify-between mb-4">
        <button
          onClick={onBackToLanding}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 rounded-2xl border-2 border-[#3b1d32] shadow-[2px_2px_0px_#3b1d32] font-['Silkscreen'] text-xs text-[#3b1d32] hover:bg-pink-50 active:translate-y-0.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK</span>
        </button>

        <span className="font-['Silkscreen'] text-xs text-rose-700 bg-rose-100 px-3 py-1 rounded-full border border-rose-300 font-bold">
          CH. 4: ALL THE LITTLE THINGS ♡
        </span>

        <button
          onClick={onOpenChapterNav}
          className="px-3 py-1.5 bg-purple-100 rounded-2xl border-2 border-[#3b1d32] shadow-[2px_2px_0px_#3b1d32] font-['Silkscreen'] text-xs text-purple-900 hover:bg-purple-200 cursor-pointer"
        >
          CHAPTERS
        </button>
      </header>

      {/* STAGE 1: THE HEART GARDEN */}
      {stage === 'heart-garden' && (
        <div className="w-full max-w-2xl space-y-4">
          <HeartGardenScene
            collectedHearts={collectedHearts}
            onFlowerTapped={handleFlowerTapped}
            onOpenSecretLetter={handleOpenLetter}
            hasDiscoveredLetter={hasDiscoveredLetter}
          />

          {/* Action to proceed once all 6 hearts collected (or accessible skip) */}
          <div className="p-4 bg-white/90 rounded-3xl border-4 border-[#3b1d32] shadow-[6px_6px_0px_#3b1d32] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <span className="font-['Silkscreen'] text-[10px] text-pink-600 font-bold block">
                GARDEN PROGRESS: {collectedHearts.length}/6 HEARTS
              </span>
              <p className="font-['Fredoka'] text-xs text-gray-700">
                {areAllSixCollected
                  ? "All 6 hearts revealed! Ready to catch feelings?"
                  : "Tap all glowing heart flowers above to uncover how deep he fell."}
              </p>
            </div>

            <PixelButton
              variant={areAllSixCollected ? "pink" : "outline"}
              size="sm"
              icon={<Heart className="w-4 h-4 fill-white" />}
              onClick={() => {
                soundManager.playClick();
                setStage('catching-feelings');
              }}
            >
              {areAllSixCollected ? "Play: Catching Feelings ➔" : "Continue Forward ➔"}
            </PixelButton>
          </div>
        </div>
      )}

      {/* STAGE 2: MINI-GAME (CATCHING FEELINGS) */}
      {stage === 'catching-feelings' && (
        <div className="w-full max-w-xl">
          <FallingHeartsMinigame
            onComplete={() => {
              soundManager.playFanfare();
              setShowSmittenAchievement(true);
            }}
          />
        </div>
      )}

      {/* STAGE 3: THE REALIZATION SCENE & 11 PM CONFESSION TEASER */}
      {stage === 'realization-moonlight' && (
        <MoonlightRealizationScene
          settings={settings}
          onFinishChapter4={() => {
            markChapterCompleted('chapter-4');
            if (onProceedToChapter5) {
              onProceedToChapter5();
            } else {
              onOpenChapterNav();
            }
          }}
          onBackToLanding={onBackToLanding}
        />
      )}

      {/* Secret Love Letter Modal */}
      <SecretLetterModal
        isOpen={isLetterModalOpen}
        onClose={() => setIsLetterModalOpen(false)}
      />

      {/* Achievement Popup after Catching Feelings */}
      <AchievementPopup
        isOpen={showSmittenAchievement}
        title="COMPLETELY SMITTEN ♡"
        subtitle="Warning: Feelings caught! There's no escaping how deeply he fell for her smile, eyes, cheeks and heart."
        onDismiss={() => {
          setShowSmittenAchievement(false);
          setStage('realization-moonlight');
        }}
      />
    </div>
  );
};
