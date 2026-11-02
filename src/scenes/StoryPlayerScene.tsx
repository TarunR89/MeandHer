import React, { useState } from 'react';
import { BookOpen, Home } from 'lucide-react';
import { CHAPTERS, type Chapter, type DialogueNode } from '../data/storyData';
import { PixelSky } from '../components/scenery/PixelSky';
import { MeadowGround } from '../components/scenery/MeadowGround';
import { FloatingPetals } from '../components/scenery/FloatingPetals';
import { DialogueBox } from '../components/story/DialogueBox';
import { BoySprite } from '../components/characters/BoySprite';
import { GirlSprite } from '../components/characters/GirlSprite';
import { PinkieSprite } from '../components/characters/PinkieSprite';
import { LunaSprite } from '../components/characters/LunaSprite';
import type { CharacterSettings } from '../data/characterConfig';


interface StoryPlayerSceneProps {
  chapterId: string;
  settings: CharacterSettings;
  onBackToLanding: () => void;
  onOpenChapterNav: () => void;
}

export const StoryPlayerScene: React.FC<StoryPlayerSceneProps> = ({
  chapterId,
  settings,
  onBackToLanding,
  onOpenChapterNav
}) => {
  const chapter: Chapter = CHAPTERS.find(c => c.id === chapterId) || CHAPTERS[0];
  const [currentNodeId, setCurrentNodeId] = useState<string>(chapter.initialNodeId);

  const currentNode: DialogueNode = chapter.dialogues[currentNodeId] || {
    id: 'fallback',
    speaker: 'narrator',
    text: 'To be continued in the next phase of Our Little Universe ♡',
    emotion: 'love'
  };

  const handleNext = () => {
    if (currentNode.nextId && chapter.dialogues[currentNode.nextId]) {
      setCurrentNodeId(currentNode.nextId);
    }
  };

  const handleChoice = (nextId: string) => {
    if (chapter.dialogues[nextId]) {
      setCurrentNodeId(nextId);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between select-none">
      {/* Background Pixel Scenery */}
      <PixelSky />
      <FloatingPetals count={16} />
      <MeadowGround />

      {/* Top HUD Bar */}
      <div className="relative z-30 p-4 sm:p-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToLanding}
            aria-label="Back to landing"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 rounded-2xl border-2 border-[#3b1d32] shadow-[2px_2px_0px_#3b1d32] font-['Silkscreen'] text-xs text-[#3b1d32] hover:bg-pink-50 active:translate-y-0.5 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">HOME</span>
          </button>

          <span className="px-3 py-1.5 bg-pink-100/90 rounded-2xl border-2 border-pink-300 font-['Silkscreen'] text-xs font-bold text-pink-700 shadow-sm">
            CH. {chapter.number}: {chapter.title}
          </span>
        </div>

        <button
          onClick={onOpenChapterNav}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 rounded-2xl border-2 border-[#3b1d32] shadow-[2px_2px_0px_#3b1d32] font-['Silkscreen'] text-xs text-purple-900 hover:bg-purple-200 cursor-pointer"
        >
          <BookOpen className="w-4 h-4" />
          <span>ALL CHAPTERS</span>
        </button>
      </div>

      {/* Midground: Character Sprites standing on meadow */}
      <div className="relative z-10 flex-1 flex items-end justify-center pb-2 px-4">
        <div className="flex items-end justify-center gap-4 sm:gap-12 max-w-4xl w-full">
          {/* Luna Kitten on left */}
          <div className="hidden sm:block pb-1">
            <LunaSprite size="md" />
          </div>

          {/* Boy Character */}
          <div className="relative">
            <BoySprite
              size="lg"
              emotion={currentNode.speaker === 'boy' ? (currentNode.emotion || 'neutral') : 'neutral'}
            />
          </div>

          {/* Girl Character */}
          <div className="relative">
            <GirlSprite
              size="lg"
              emotion={currentNode.speaker === 'girl' ? (currentNode.emotion || 'happy') : 'happy'}
            />
          </div>

          {/* Pinkie Puppy on right */}
          <div className="hidden sm:block pb-1">
            <PinkieSprite size="md" />
          </div>
        </div>
      </div>

      {/* Bottom Area: Visual Novel Dialogue Box */}
      <div className="relative z-20 pb-6 px-4">
        <DialogueBox
          node={currentNode}
          settings={settings}
          onChoiceSelect={handleChoice}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};
