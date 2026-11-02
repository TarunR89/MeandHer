import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import type { DialogueNode, EmotionType } from '../../data/storyData';
import { BoySprite } from '../characters/BoySprite';
import { GirlSprite } from '../characters/GirlSprite';
import { soundManager } from '../audio/SoundManager';
import type { CharacterSettings } from '../../data/characterConfig';

interface DialogueBoxProps {
  node: DialogueNode;
  settings: CharacterSettings;
  onChoiceSelect: (nextId: string) => void;
  onNext: () => void;
  onSkipTypewriter?: () => void;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  node,
  settings,
  onChoiceSelect,
  onNext
}) => {
  const [prevNodeId, setPrevNodeId] = useState(node.id);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  if (node.id !== prevNodeId) {
    setPrevNodeId(node.id);
    setDisplayedText('');
    setIsTyping(true);
  }

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const fullText = node.text;

    // Trigger node sound effect if any
    if (node.soundEffect === 'blip') soundManager.playBlip();
    else if (node.soundEffect === 'heart') soundManager.playHeart();
    else if (node.soundEffect === 'fanfare') soundManager.playFanfare();
    else if (node.soundEffect === 'bark') soundManager.playBark();
    else if (node.soundEffect === 'meow') soundManager.playMeow();

    const interval = setInterval(() => {
      index++;
      setDisplayedText(fullText.slice(0, index));
      if (index % 3 === 0) {
        soundManager.playBlip();
      }
      if (index >= fullText.length) {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 24);

    return () => clearInterval(interval);
  }, [node]);

  const handleBoxClick = () => {
    if (isTyping) {
      // Fast forward typewriter
      setDisplayedText(node.text);
      setIsTyping(false);
    } else if (!node.choices || node.choices.length === 0) {
      if (node.nextId) {
        onNext();
      }
    }
  };

  const getSpeakerDetails = () => {
    switch (node.speaker) {
      case 'boy':
        return {
          name: settings.boyName || 'Him',
          color: '#818cf8',
          bgBadge: 'bg-indigo-100 text-indigo-900 border-indigo-400',
          side: 'left'
        };
      case 'girl':
        return {
          name: settings.girlName || 'Her',
          color: '#f472b6',
          bgBadge: 'bg-pink-100 text-pink-900 border-pink-400',
          side: 'right'
        };
      case 'narrator':
        return {
          name: 'Memory',
          color: '#a855f7',
          bgBadge: 'bg-purple-100 text-purple-900 border-purple-400',
          side: 'center'
        };
      default:
        return {
          name: 'Universe',
          color: '#ec4899',
          bgBadge: 'bg-rose-100 text-rose-900 border-rose-400',
          side: 'center'
        };
    }
  };

  const speaker = getSpeakerDetails();

  return (
    <div className="relative w-full max-w-3xl mx-auto select-none">
      {/* Character Avatars sitting on top of dialogue box */}
      <div className="relative h-20 -mb-4 px-6 flex justify-between items-end pointer-events-none z-10">
        {/* Boy Avatar */}
        <div className={`transition-opacity duration-300 ${node.speaker === 'boy' ? 'opacity-100 scale-105' : 'opacity-40 scale-95'}`}>
          <div className="w-16 h-20 overflow-hidden flex items-end justify-center">
            <BoySprite size="sm" emotion={node.speaker === 'boy' ? (node.emotion as EmotionType) : 'neutral'} />
          </div>
        </div>

        {/* Girl Avatar */}
        <div className={`transition-opacity duration-300 ${node.speaker === 'girl' ? 'opacity-100 scale-105' : 'opacity-40 scale-95'}`}>
          <div className="w-16 h-20 overflow-hidden flex items-end justify-center">
            <GirlSprite size="sm" emotion={node.speaker === 'girl' ? (node.emotion as EmotionType) : 'happy'} />
          </div>
        </div>
      </div>

      {/* Main Dialogue Box */}
      <div
        onClick={handleBoxClick}
        className="relative bg-[#fffdfa] rounded-3xl p-5 sm:p-6 border-4 border-[#3b1d32] shadow-[6px_6px_0px_#3b1d32] cursor-pointer transition-transform active:translate-y-0.5"
      >
        {/* Speaker Name Tag */}
        <div className="absolute -top-4 left-6">
          <span className={`inline-block px-4 py-1 rounded-xl border-2 font-['Silkscreen'] text-xs font-bold shadow-sm ${speaker.bgBadge}`}>
            {speaker.name}
          </span>
        </div>

        {/* Text Content */}
        <div className="min-h-[70px] pt-2">
          <p className="font-['Fredoka'] text-base sm:text-lg text-[#3b1d32] leading-relaxed">
            {displayedText}
            {isTyping && (
              <span className="inline-block w-2 h-4 ml-1 bg-pink-500 animate-pulse" />
            )}
          </p>
        </div>

        {/* Branching choices (if any) */}
        {!isTyping && node.choices && node.choices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 pt-3 border-t-2 border-pink-100 space-y-2"
          >
            <span className="block font-['Silkscreen'] text-[11px] text-pink-600 font-bold mb-1">
              CHOOSE YOUR RESPONSE:
            </span>
            {node.choices.map((choice, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  soundManager.playClick();
                  onChoiceSelect(choice.nextId);
                }}
                className="w-full text-left p-3 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 border-2 border-[#3b1d32] shadow-[3px_3px_0px_#3b1d32] text-xs sm:text-sm font-['Fredoka'] text-[#3b1d32] font-semibold transition-all hover:translate-x-1 cursor-pointer flex items-center justify-between"
              >
                <span>{choice.text}</span>
                <ChevronRight className="w-4 h-4 text-pink-500 flex-shrink-0 ml-2" />
              </button>
            ))}
          </motion.div>
        )}

        {/* Continue indicator prompt */}
        {!isTyping && (!node.choices || node.choices.length === 0) && node.nextId && (
          <div className="flex justify-end items-center gap-1 mt-2 text-pink-600 font-['Silkscreen'] text-[10px] animate-bounce">
            <span>TAP TO CONTINUE</span>
            <span>▼</span>
          </div>
        )}
      </div>
    </div>
  );
};
