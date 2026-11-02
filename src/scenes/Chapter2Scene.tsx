import React, { useState } from 'react';
import {
  ArrowLeft,
  Tv
} from 'lucide-react';
import { LivingRoomScene } from '../components/scenery/LivingRoomScene';
import { DramaDetectorMiniGame } from '../components/story/DramaDetectorMiniGame';
import { SunriseTransitionScene } from '../components/story/SunriseTransitionScene';
import { AchievementPopup } from '../components/ui/AchievementPopup';
import { PixelButton } from '../components/ui/PixelButton';
import { soundManager } from '../components/audio/SoundManager';
import type { CharacterSettings } from '../data/characterConfig';

interface Chapter2SceneProps {
  settings: CharacterSettings;
  onBackToLanding: () => void;
  onOpenChapterNav: () => void;
  onPreviewChapter3: () => void;
}

type Chapter2Stage = 'living-room-intro' | 'chat-serial' | 'mini-game' | 'pet-banter' | 'sunrise-transition';

export const Chapter2Scene: React.FC<Chapter2SceneProps> = ({
  settings,
  onBackToLanding,
  onOpenChapterNav,
  onPreviewChapter3
}) => {
  const [stage, setStage] = useState<Chapter2Stage>('living-room-intro');
  const [introStep, setIntroStep] = useState(0);
  const [petStep, setPetStep] = useState(0);
  const [showSerialAchievement, setShowSerialAchievement] = useState(false);


  // Intro living room dialogue lines
  const serialDialogues = [
    {
      speaker: 'narrator',
      name: 'NARRATOR',
      text: "And then came the most unexpected bonding experience...",
      color: 'text-purple-700 bg-purple-100'
    },
    {
      speaker: 'narrator',
      name: 'NARRATOR',
      text: "Talking about Rohini.",
      color: 'text-rose-700 bg-rose-100'
    },
    {
      speaker: 'boy',
      name: settings.boyName || 'Him',
      text: "Okay but can we talk about Rohini?",
      color: 'text-indigo-800 bg-indigo-100'
    },
    {
      speaker: 'girl',
      name: settings.girlName || 'Her',
      text: "PLEASE. I HAVE SO MUCH TO SAY. 😭",
      color: 'text-pink-800 bg-pink-100'
    },
    {
      speaker: 'boy',
      name: settings.boyName || 'Him',
      text: "I knew this conversation was going somewhere.",
      color: 'text-indigo-800 bg-indigo-100'
    },
    {
      speaker: 'girl',
      name: settings.girlName || 'Her',
      text: "Not us bonding over serial drama at midnight!",
      color: 'text-pink-800 bg-pink-100'
    },
    {
      speaker: 'boy',
      name: settings.boyName || 'Him',
      text: "Character development, apparently.",
      color: 'text-indigo-800 bg-indigo-100'
    },
    {
      speaker: 'pinkie',
      name: 'PINKIE 🐾',
      text: "I don't understand the drama, but I'm invested!",
      color: 'text-rose-800 bg-rose-100'
    },
    {
      speaker: 'luna',
      name: 'LUNA 🌙',
      text: "Even I'm judging the plot twists.",
      color: 'text-purple-800 bg-purple-100'
    }
  ];

  // Pet exchanges
  const petExchanges = [
    {
      pinkie: "Do you think they'll fall in love?",
      luna: "They're discussing serial villains."
    },
    {
      pinkie: "So... yes?",
      luna: "Unfortunately, yes. Look at him grinning at his screen."
    },
    {
      pinkie: "Mom's laughing so hard her cheeks are red!",
      luna: "I give this human 10/10 for endurance."
    }
  ];

  const handleNextIntroStep = () => {
    soundManager.playClick();
    if (introStep === 0 || introStep === 1) {
      soundManager.playDramaticSting();
    } else if (introStep === 6) {
      soundManager.playBark();
    } else if (introStep === 7) {
      soundManager.playMeow();
    }
    setIntroStep(prev => prev + 1);
  };

  const handleNextPetStep = () => {
    soundManager.playClick();
    if (petStep === 0) soundManager.playBark();
    if (petStep === 1) soundManager.playMeow();
    if (petStep < petExchanges.length - 1) {
      setPetStep(prev => prev + 1);
    } else {
      setShowSerialAchievement(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdf2f8] via-[#fff5f5] to-[#f3e8ff] p-3 sm:p-6 flex flex-col items-center select-none">
      {/* Top Navigation */}
      <header className="w-full max-w-2xl flex items-center justify-between mb-4">
        <button
          onClick={onBackToLanding}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 rounded-2xl border-2 border-[#3b1d32] shadow-[2px_2px_0px_#3b1d32] font-['Silkscreen'] text-xs text-[#3b1d32] hover:bg-pink-50 active:translate-y-0.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK</span>
        </button>

        <span className="font-['Silkscreen'] text-xs text-purple-700 bg-purple-100 px-3 py-1 rounded-full border border-purple-300 font-bold">
          CH. 2: THE ROHINI INCIDENT 📺
        </span>

        <button
          onClick={onOpenChapterNav}
          className="px-3 py-1.5 bg-pink-100 rounded-2xl border-2 border-[#3b1d32] shadow-[2px_2px_0px_#3b1d32] font-['Silkscreen'] text-xs text-pink-900 hover:bg-pink-200 cursor-pointer"
        >
          CHAPTERS
        </button>
      </header>

      {/* STAGE 1: LIVING ROOM TV SCENE */}
      {stage === 'living-room-intro' && (
        <div className="w-full max-w-xl flex flex-col items-center space-y-4">
          <LivingRoomScene girlEmotion={introStep >= 3 ? 'laugh' : 'happy'} />

          {/* Stepped Dialogue Box */}
          <div className="w-full bg-[#fffdfa] rounded-3xl p-5 border-4 border-[#3b1d32] shadow-[6px_6px_0px_#3b1d32]">
            <div className="min-h-[80px] flex flex-col items-center justify-center text-center">
              {introStep < serialDialogues.length ? (
                <>
                  <span className={`px-3 py-0.5 rounded-full font-['Silkscreen'] text-[10px] font-bold border border-[#3b1d32]/30 mb-2 ${serialDialogues[introStep].color}`}>
                    {serialDialogues[introStep].name}
                  </span>
                  <p className="font-['Fredoka'] text-base sm:text-lg text-[#3b1d32] font-semibold leading-relaxed">
                    “{serialDialogues[introStep].text}”
                  </p>
                </>
              ) : (
                <div className="text-center space-y-1">
                  <span className="font-['Silkscreen'] text-[10px] text-pink-600 font-bold">
                    BONDING COMPLETE!
                  </span>
                  <p className="font-['Fredoka'] text-base text-[#3b1d32] font-medium">
                    When you both share the exact same serial trauma, that's not just a chat—that's destiny.
                  </p>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="mt-4 pt-3 border-t-2 border-pink-100 flex items-center justify-between">
              <span className="text-[10px] font-['Silkscreen'] text-gray-400">
                SCENE 1 OF 3
              </span>

              {introStep < serialDialogues.length - 1 ? (
                <PixelButton
                  variant="purple"
                  size="sm"
                  onClick={handleNextIntroStep}
                >
                  Continue ➔
                </PixelButton>
              ) : (
                <PixelButton
                  variant="pink"
                  size="sm"
                  icon={<Tv className="w-4 h-4 fill-white" />}
                  onClick={() => {
                    soundManager.playClick();
                    setStage('mini-game');
                  }}
                >
                  Play Drama Detector Mini-Game ➔
                </PixelButton>
              )}
            </div>
          </div>
        </div>
      )}

      {/* STAGE 2: MINI-GAME (DRAMA DETECTOR) */}
      {stage === 'mini-game' && (
        <div className="w-full max-w-xl">
          <DramaDetectorMiniGame
            onComplete={() => {
              soundManager.playFanfare();
              setStage('pet-banter');
            }}
          />
        </div>
      )}

      {/* STAGE 3: PET BANTER EXCHANGES */}
      {stage === 'pet-banter' && (
        <div className="w-full max-w-lg bg-[#fffdf7] rounded-3xl border-4 border-[#3b1d32] shadow-[8px_8px_0px_#3b1d32] p-6 space-y-4">
          <div className="text-center pb-2 border-b-2 border-pink-200">
            <span className="font-['Silkscreen'] text-[10px] text-purple-700 font-bold bg-purple-100 px-3 py-1 rounded-full border border-purple-300">
              PET PERSPECTIVE: PINKIE & LUNA
            </span>
            <h3 className="font-['Fredoka'] text-base font-bold text-[#3b1d32] mt-1">
              Meanwhile, behind the scenes...
            </h3>
          </div>

          {/* Dialogue exchange card */}
          <div className="space-y-3 py-2">
            {/* Pinkie Box */}
            <div className="flex items-start gap-3 bg-pink-50 p-3 rounded-2xl border-2 border-pink-300">
              <div className="w-10 h-10 rounded-full bg-pink-100 border border-pink-400 flex items-center justify-center flex-shrink-0">
                🐾
              </div>
              <div>
                <span className="font-['Silkscreen'] text-[10px] text-pink-700 font-bold block">
                  PINKIE:
                </span>
                <p className="font-['Fredoka'] text-sm text-[#3b1d32] font-semibold">
                  “{petExchanges[petStep].pinkie}”
                </p>
              </div>
            </div>

            {/* Luna Box */}
            <div className="flex items-start gap-3 bg-purple-50 p-3 rounded-2xl border-2 border-purple-300">
              <div className="w-10 h-10 rounded-full bg-purple-100 border border-purple-400 flex items-center justify-center flex-shrink-0">
                🌙
              </div>
              <div>
                <span className="font-['Silkscreen'] text-[10px] text-purple-700 font-bold block">
                  LUNA:
                </span>
                <p className="font-['Fredoka'] text-sm text-[#3b1d32] font-semibold">
                  “{petExchanges[petStep].luna}”
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t-2 border-pink-100">
            <span className="font-['Silkscreen'] text-[10px] text-gray-400">
              EXCHANGE {petStep + 1} OF {petExchanges.length}
            </span>

            <PixelButton
              variant="pink"
              size="sm"
              onClick={handleNextPetStep}
            >
              {petStep < petExchanges.length - 1 ? "Next Joke ➔" : "Claim Badge & Continue ♡"}
            </PixelButton>
          </div>
        </div>
      )}

      {/* STAGE 4: TENDER SUNRISE TRANSITION */}
      {stage === 'sunrise-transition' && (
        <SunriseTransitionScene
          settings={settings}
          onFinishChapter={onPreviewChapter3}
          onBackToLanding={onBackToLanding}
        />
      )}

      {/* Achievement Popup */}
      <AchievementPopup
        isOpen={showSerialAchievement}
        title="SERIAL DETECTIVES 📺"
        subtitle="You both successfully bonded over serial drama and exposed Rohini's unbelievable lies!"
        onDismiss={() => {
          setShowSerialAchievement(false);
          setStage('sunrise-transition');
        }}
      />
    </div>
  );
};
