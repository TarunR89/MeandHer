import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { SplitRoomScene } from '../components/scenery/SplitRoomScene';
import { FloatingMemoryCards } from '../components/story/FloatingMemoryCard';
import { HomeTransformationScene } from '../components/scenery/HomeTransformationScene';
import { AchievementPopup } from '../components/ui/AchievementPopup';
import { PixelButton } from '../components/ui/PixelButton';
import { soundManager } from '../components/audio/SoundManager';
import { markChapterCompleted } from '../data/progressConfig';
import type { CharacterSettings } from '../data/characterConfig';

interface Chapter3SceneProps {
  settings: CharacterSettings;
  onBackToLanding: () => void;
  onOpenChapterNav: () => void;
  onProceedToChapter4: () => void;
}

type Chapter3Stage = 'split-screen' | 'symbolic-cards' | 'comfort-scene' | 'complete';

export const Chapter3Scene: React.FC<Chapter3SceneProps> = ({
  settings,
  onBackToLanding,
  onOpenChapterNav,
  onProceedToChapter4
}) => {
  const [stage, setStage] = useState<Chapter3Stage>('split-screen');
  const [splitStep, setSplitStep] = useState(0);

  // Comfort scene states
  const [comfortStep, setComfortStep] = useState(0);
  const [isTransformed, setIsTransformed] = useState(false);
  const [hasHeartTraveled, setHasHeartTraveled] = useState(false);
  const [showHomeAchievement, setShowHomeAchievement] = useState(false);

  // Split screen narration lines
  const splitNarrations = [
    "At first, we talked about the most random things.",
    "Trends we hated.",
    "Serial characters we couldn't stop discussing.",
    "And jokes that probably made sense only to us.",
    "But somewhere along the way...",
    "The conversations started becoming something more."
  ];

  // Comfort scene narration lines
  const comfortNarrations = [
    "I don't know exactly when it happened.",
    `Talking to ${settings.girlName || 'you'} stopped feeling like just another conversation.`,
    "You listened with so much patience.",
    "You understood without judging.",
    "And when I told you about the things that hurt...",
    "You didn't make me feel like I had to hide.",
    "The way you comforted me...",
    "It felt like coming home."
  ];

  const handleNextSplitStep = () => {
    soundManager.playClick();
    if (splitStep < splitNarrations.length - 1) {
      setSplitStep(prev => prev + 1);
    } else {
      setStage('symbolic-cards');
    }
  };

  const handleNextComfortStep = () => {
    soundManager.playClick();
    if (comfortStep === 5) {
      // Trigger transformation!
      setIsTransformed(true);
      soundManager.playHomeChime();
    }
    if (comfortStep < comfortNarrations.length - 1) {
      setComfortStep(prev => prev + 1);
    }
  };

  const handleHeartTapped = () => {
    soundManager.playHeart();
    setHasHeartTraveled(true);
    setTimeout(() => {
      markChapterCompleted('chapter-3');
      setShowHomeAchievement(true);
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdf2f8] via-[#f5f3ff] to-[#fce7f3] p-3 sm:p-6 flex flex-col items-center select-none">
      {/* Top Header */}
      <header className="w-full max-w-2xl flex items-center justify-between mb-4">
        <button
          onClick={onBackToLanding}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 rounded-2xl border-2 border-[#3b1d32] shadow-[2px_2px_0px_#3b1d32] font-['Silkscreen'] text-xs text-[#3b1d32] hover:bg-pink-50 active:translate-y-0.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK</span>
        </button>

        <span className="font-['Silkscreen'] text-xs text-rose-700 bg-rose-100 px-3 py-1 rounded-full border border-rose-300 font-bold">
          CH. 3: YOU FELT LIKE HOME ♡
        </span>

        <button
          onClick={onOpenChapterNav}
          className="px-3 py-1.5 bg-purple-100 rounded-2xl border-2 border-[#3b1d32] shadow-[2px_2px_0px_#3b1d32] font-['Silkscreen'] text-xs text-purple-900 hover:bg-purple-200 cursor-pointer"
        >
          CHAPTERS
        </button>
      </header>

      {/* STAGE 1: TWO ROOMS, ONE CONNECTION */}
      {stage === 'split-screen' && (
        <div className="w-full max-w-xl flex flex-col items-center space-y-4">
          <SplitRoomScene proximityStep={Math.floor(splitStep / 2)} />

          {/* Stepped Dialogue Box */}
          <div className="w-full bg-[#fffdfa] rounded-3xl p-5 border-4 border-[#3b1d32] shadow-[6px_6px_0px_#3b1d32]">
            <div className="min-h-[75px] flex flex-col items-center justify-center text-center">
              <span className="font-['Silkscreen'] text-[9px] text-purple-600 font-bold mb-1">
                SCENE 3.1: TWO ROOMS, ONE CONNECTION
              </span>
              <p className="font-['Fredoka'] text-base sm:text-lg text-[#3b1d32] font-semibold leading-relaxed">
                “{splitNarrations[splitStep]}”
              </p>
            </div>

            <div className="mt-4 pt-3 border-t-2 border-pink-100 flex items-center justify-between">
              <span className="text-[10px] font-['Silkscreen'] text-gray-400">
                LINE {splitStep + 1} OF {splitNarrations.length}
              </span>

              <PixelButton
                variant="pink"
                size="sm"
                onClick={handleNextSplitStep}
              >
                {splitStep < splitNarrations.length - 1 ? "Next Reflection ➔" : "Open Honest Memories ➔"}
              </PixelButton>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 2: THE THINGS WE NEVER SAID */}
      {stage === 'symbolic-cards' && (
        <div className="w-full max-w-xl">
          <FloatingMemoryCards
            onAllRevealed={() => {
              soundManager.playHeart();
              setStage('comfort-scene');
            }}
          />
        </div>
      )}

      {/* STAGE 3: THE COMFORT SCENE */}
      {stage === 'comfort-scene' && (
        <div className="w-full max-w-xl flex flex-col items-center space-y-4">
          <HomeTransformationScene
            isTransformed={isTransformed}
            onHeartTapped={handleHeartTapped}
            hasHeartTraveled={hasHeartTraveled}
          />

          {/* Dialogue Box */}
          <div className="w-full bg-[#fffdfa] rounded-3xl p-5 border-4 border-[#3b1d32] shadow-[6px_6px_0px_#3b1d32]">
            <div className="min-h-[85px] flex flex-col items-center justify-center text-center">
              <span className="font-['Silkscreen'] text-[9px] text-pink-600 font-bold mb-1">
                SCENE 3.3: YOU FELT LIKE HOME ♡
              </span>
              <p className="font-['Fredoka'] text-base sm:text-lg text-[#3b1d32] font-semibold leading-relaxed">
                “{comfortNarrations[comfortStep]}”
              </p>
              {isTransformed && !hasHeartTraveled && (
                <p className="font-['Fredoka'] text-xs text-pink-600 font-bold mt-2 animate-bounce">
                  ✨ The world transformed! Tap the glowing heart above to bridge the feeling of home.
                </p>
              )}
            </div>

            <div className="mt-4 pt-3 border-t-2 border-pink-100 flex items-center justify-between">
              <span className="text-[10px] font-['Silkscreen'] text-gray-400">
                {isTransformed ? "WARMTH & HEALING" : "QUIET VULNERABILITY"}
              </span>

              {comfortStep < comfortNarrations.length - 1 ? (
                <PixelButton
                  variant="purple"
                  size="sm"
                  onClick={handleNextComfortStep}
                >
                  Continue ➔
                </PixelButton>
              ) : (
                <span className="text-[11px] font-['Fredoka'] text-pink-700 italic font-semibold">
                  “Home was the feeling of being understood.”
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Achievement Popup */}
      <AchievementPopup
        isOpen={showHomeAchievement}
        title="YOU FELT LIKE HOME ♡"
        subtitle="In a world full of noise, her kindness and understanding made him feel completely safe."
        onDismiss={() => {
          setShowHomeAchievement(false);
          onProceedToChapter4();
        }}
      />
    </div>
  );
};
