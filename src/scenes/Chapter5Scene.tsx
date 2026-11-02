import React, { useState } from 'react';
import { ArrowLeft, Clock } from 'lucide-react';
import { NervousBoyBedroomScene } from '../components/story/NervousBoyBedroomScene';
import { CourageMinigame } from '../components/story/CourageMinigame';
import { UnsentMessageScene } from '../components/story/UnsentMessageScene';
import { MessageDeliverySequence } from '../components/story/MessageDeliverySequence';
import { GirlReadingScene } from '../components/story/GirlReadingScene';
import { PixelButton } from '../components/ui/PixelButton';
import { soundManager } from '../components/audio/SoundManager';
import { markChapterCompleted } from '../data/progressConfig';
import type { CharacterSettings } from '../data/characterConfig';

interface Chapter5SceneProps {
  settings: CharacterSettings;
  onBackToLanding: () => void;
  onOpenChapterNav: () => void;
  onProceedToChapter6: () => void;
}

type Chapter5Stage =
  | 'nervous-boy'
  | 'courage-minigame'
  | 'unsent-message'
  | 'delivery-animation'
  | 'girl-reading';

export const Chapter5Scene: React.FC<Chapter5SceneProps> = ({
  settings,
  onBackToLanding,
  onOpenChapterNav,
  onProceedToChapter6
}) => {
  const [stage, setStage] = useState<Chapter5Stage>('nervous-boy');
  const [nervousStep, setNervousStep] = useState(0);
  const [clockTime, setClockTime] = useState("10:59 PM");

  const boyName = settings.boyName || "Him";

  // Dialogue steps for Scene 5.1 (A Very Nervous Boy)
  const nervousDialogues = [
    {
      speaker: "luna",
      name: "LUNA",
      text: "You've been staring at that phone forever. 🐾",
      boyState: "pacing" as const,
      clock: "10:59 PM"
    },
    {
      speaker: "boy",
      name: boyName.toUpperCase(),
      text: "I'm thinking.",
      boyState: "pacing" as const,
      clock: "10:59 PM"
    },
    {
      speaker: "luna",
      name: "LUNA",
      text: "That's usually how disasters begin.",
      boyState: "pacing" as const,
      clock: "10:59 PM"
    },
    {
      speaker: "boy",
      name: boyName.toUpperCase(),
      text: "What if I tell her?",
      boyState: "sitting" as const,
      clock: "10:59 PM"
    },
    {
      speaker: "luna",
      name: "LUNA",
      text: "What if you don't?",
      boyState: "sitting" as const,
      clock: "10:59 PM"
    },
    {
      speaker: "boy",
      name: boyName.toUpperCase(),
      text: "What if she blocks me?",
      boyState: "sitting" as const,
      clock: "10:59 PM"
    },
    {
      speaker: "luna",
      name: "LUNA",
      text: "Then I'm judging you in person instead of remotely. 😼",
      boyState: "sitting" as const,
      clock: "10:59 PM"
    },
    {
      speaker: "narrator",
      name: "NARRATION",
      text: "I had so much I wanted to tell you. But the closer I got to saying it... the more afraid I became.",
      boyState: "typing" as const,
      clock: "10:59 PM"
    },
    {
      speaker: "narrator",
      name: "NARRATION",
      text: "What if everything changed? What if I lost the connection we'd built?",
      boyState: "typing" as const,
      clock: "10:59 PM"
    },
    {
      speaker: "narrator",
      name: "11:00 PM",
      text: "Still... some things deserve to be said, even when you're scared.",
      boyState: "typing" as const,
      clock: "11:00 PM"
    }
  ];

  const currentDialogue = nervousDialogues[nervousStep];

  const handleNextNervousStep = () => {
    soundManager.playClick();
    if (nervousStep === nervousDialogues.length - 2) {
      // Clock ticks to 11:00 PM with heartbeat sound
      setClockTime("11:00 PM");
      soundManager.playHeartbeat();
    }

    if (nervousStep < nervousDialogues.length - 1) {
      setNervousStep(prev => prev + 1);
    } else {
      setStage('courage-minigame');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#22102b] via-[#351942] to-[#1a0a22] p-3 sm:p-6 flex flex-col items-center select-none text-white">
      {/* Top Header */}
      <header className="w-full max-w-xl flex items-center justify-between mb-4">
        <button
          onClick={onBackToLanding}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/20 text-xs font-['Silkscreen'] text-pink-200 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK</span>
        </button>

        <span className="font-['Silkscreen'] text-xs text-pink-300 bg-pink-900/50 px-3 py-1 rounded-full border border-pink-400/30 font-bold flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-pink-400" />
          CH. 5: THE 11 PM CONFESSION
        </span>

        <button
          onClick={onOpenChapterNav}
          className="px-3 py-1.5 bg-purple-900/50 hover:bg-purple-800/60 rounded-2xl border border-purple-400/40 text-xs font-['Silkscreen'] text-purple-200 transition-all cursor-pointer"
        >
          CHAPTERS
        </button>
      </header>

      {/* STAGE 1: NERVOUS BOY BEDROOM SCENE (Scene 5.1) */}
      {stage === 'nervous-boy' && (
        <div className="w-full max-w-xl space-y-4">
          <NervousBoyBedroomScene
            clockTime={clockTime}
            boyState={currentDialogue.boyState}
            showSweatDrops={nervousStep < 7}
          />

          {/* Stepped Dialogue Box */}
          <div className="w-full bg-[#fffbf2] rounded-3xl p-5 border-4 border-[#3b1d32] shadow-[6px_6px_0px_#3b1d32] text-[#3b1d32]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-['Silkscreen'] text-[10px] text-purple-700 font-bold tracking-wide">
                {currentDialogue.name}
              </span>
              <span className="text-[10px] font-['Silkscreen'] text-gray-400">
                {nervousStep + 1} / {nervousDialogues.length}
              </span>
            </div>

            <p className="font-['Fredoka'] text-sm sm:text-base text-[#3b1d32] font-semibold leading-relaxed min-h-[48px]">
              “{currentDialogue.text}”
            </p>

            <div className="mt-4 pt-3 border-t-2 border-pink-100 flex items-center justify-between">
              <span className="text-[10px] font-['Fredoka'] text-gray-400 italic">
                {clockTime === "11:00 PM" ? "The clock struck 11:00 PM." : "10:59 PM • Pacing nervously"}
              </span>

              <PixelButton
                variant="pink"
                size="sm"
                onClick={handleNextNervousStep}
              >
                {nervousStep === nervousDialogues.length - 1 ? "Find The Courage ➔" : "Continue ➔"}
              </PixelButton>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 2: COURAGE MINI-GAME */}
      {stage === 'courage-minigame' && (
        <CourageMinigame
          onComplete={() => setStage('unsent-message')}
        />
      )}

      {/* STAGE 3: THE UNSENT MESSAGE (Scene 5.2) */}
      {stage === 'unsent-message' && (
        <UnsentMessageScene
          settings={settings}
          onSendMessage={() => setStage('delivery-animation')}
        />
      )}

      {/* STAGE 4: MESSAGE DELIVERY SEQUENCE (Scene 5.3) */}
      {stage === 'delivery-animation' && (
        <MessageDeliverySequence
          onComplete={() => setStage('girl-reading')}
        />
      )}

      {/* STAGE 5: HER SIDE OF THE STORY (Scene 5.4) */}
      {stage === 'girl-reading' && (
        <GirlReadingScene
          settings={settings}
          onProceedToChapter6={() => {
            markChapterCompleted('chapter-5');
            onProceedToChapter6();
          }}
        />
      )}
    </div>
  );
};
