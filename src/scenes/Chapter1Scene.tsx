import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Heart,
  Send,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { GirlSprite } from '../components/characters/GirlSprite';
import { BedroomNightScene } from '../components/scenery/BedroomNightScene';
import { ConnectionMeter } from '../components/ui/ConnectionMeter';
import { AchievementPopup } from '../components/ui/AchievementPopup';

import { SameWavelengthMiniGame } from '../components/story/SameWavelengthMiniGame';
import { PixelButton } from '../components/ui/PixelButton';
import { soundManager } from '../components/audio/SoundManager';
import type { CharacterSettings } from '../data/characterConfig';

interface Chapter1SceneProps {
  settings: CharacterSettings;
  onBackToLanding: () => void;
  onOpenChapterNav: () => void;
  onProceedToChapter2?: () => void;
}

type Stage = 'opening-bedroom' | 'profile-view' | 'chat-banter' | 'mini-game' | 'milestone';

interface ChatMessage {
  id: string;
  sender: 'boy' | 'girl' | 'luna' | 'pinkie';
  text: string;
  time: string;
}

export const Chapter1Scene: React.FC<Chapter1SceneProps> = ({
  settings,
  onBackToLanding,
  onOpenChapterNav,
  onProceedToChapter2
}) => {
  const [currentStage, setCurrentStage] = useState<Stage>('opening-bedroom');

  // Opening sequence states
  const [bedroomStep, setBedroomStep] = useState(0);
  const [showSweatdrop, setShowSweatdrop] = useState(false);

  // Profile view states
  const [hasLikedPost, setHasLikedPost] = useState(false);
  const [likeCount, setLikeCount] = useState(1324);
  const [heartsList, setHeartsList] = useState<{ id: number; x: number; y: number }[]>([]);

  // Chat sequence states
  const [chatStep, setChatStep] = useState(0);
  const [isGirlTyping, setIsGirlTyping] = useState(false);
  const [connectionPercent, setConnectionPercent] = useState(20);
  const [screenShake, setScreenShake] = useState(false);
  const [showLaughEmojis, setShowLaughEmojis] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Opening sequence text lines
  const openingLines = [
    "Some love stories begin with flowers...",
    "Some begin with a magical first meeting...",
    "Ours?",
    "Instagram. And a trend we both couldn't stand."
  ];

  // Advance bedroom narration
  const handleNextBedroomStep = () => {
    soundManager.playClick();
    if (bedroomStep === 2) {
      soundManager.playNotification();
    }
    if (bedroomStep === 4) {
      // Luna's dialogue
      soundManager.playMeow();
    }
    if (bedroomStep === 6) {
      // Comedic pause with sweat-drop!
      setShowSweatdrop(true);
    }
    setBedroomStep(prev => prev + 1);
  };

  // Profile like handler
  const handleLikePost = () => {
    soundManager.playHeart();
    setHasLikedPost(prev => !prev);
    setLikeCount(prev => (hasLikedPost ? prev - 1 : prev + 1));

    // Spawn floating pink heart reaction particles
    const newHearts = Array.from({ length: 5 }).map((_, i) => ({

      id: Date.now() + i,
      x: (Math.random() - 0.5) * 60,
      y: -20 - Math.random() * 40
    }));
    setHeartsList(prev => [...prev, ...newHearts]);
    setTimeout(() => {
      setHeartsList(prev => prev.filter(h => !newHearts.some(nh => nh.id === h.id)));
    }, 1200);
  };

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isGirlTyping]);

  // Handle player sending dialogue choice in retro trend conversation
  const sendPlayerChat = (text: string, nextStep: number, targetConnection: number) => {
    soundManager.playClick();
    const newMsg: ChatMessage = {
      id: `boy-${chatMessages.length}-${nextStep}`,
      sender: 'boy',
      text,
      time: '10:52 PM'
    };
    setChatMessages(prev => [...prev, newMsg]);
    setChatStep(nextStep);
    setConnectionPercent(targetConnection);

    // Trigger Her reply
    setIsGirlTyping(true);
    setTimeout(() => {
      setIsGirlTyping(false);
      handleGirlChatResponse(nextStep);
    }, 1300);
  };

  const handleGirlChatResponse = (step: number) => {
    soundManager.playHeart();

    if (step === 1) {
      // Dramatic reaction with screen shake & laughing emojis!
      setScreenShake(true);
      setShowLaughEmojis(true);
      setTimeout(() => setScreenShake(false), 600);
      setTimeout(() => setShowLaughEmojis(false), 2000);

      setChatMessages(prev => [
        ...prev,
        {
          id: `girl-${Date.now()}`,
          sender: 'girl',
          text: "WAIT. YOU TOO?! 😭💀",
          time: '10:53 PM'
        }
      ]);
    } else if (step === 2) {
      setChatMessages(prev => [
        ...prev,
        {
          id: `girl-${Date.now()}`,
          sender: 'girl',
          text: "We might actually agree on something historic here.",
          time: '10:54 PM'
        },
        {
          id: `luna-${Date.now() + 1}`,
          sender: 'luna',
          text: "Luna: Two certified haters. Truly beautiful. 🐾",
          time: '10:54 PM'
        },
        {
          id: `pinkie-${Date.now() + 2}`,
          sender: 'pinkie',
          text: "Pinkie: *wags tail excitedly* Woof! Same team! ♡",
          time: '10:55 PM'
        }
      ]);
      setConnectionPercent(85);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b from-[#fdf2f8] via-[#fff5f5] to-[#f3e8ff] p-3 sm:p-6 flex flex-col items-center select-none ${screenShake ? 'animate-[idleBob_0.1s_infinite]' : ''}`}>
      {/* Top Header Navigation */}
      <header className="w-full max-w-2xl flex items-center justify-between mb-4">
        <button
          onClick={onBackToLanding}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 rounded-2xl border-2 border-[#3b1d32] shadow-[2px_2px_0px_#3b1d32] font-['Silkscreen'] text-xs text-[#3b1d32] hover:bg-pink-50 active:translate-y-0.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="font-['Silkscreen'] text-xs text-pink-700 bg-pink-100 px-3 py-1 rounded-full border border-pink-300 font-bold">
            CH. 1: IT ALL STARTED WITH A DM...
          </span>
        </div>

        <button
          onClick={onOpenChapterNav}
          className="px-3 py-1.5 bg-purple-100 rounded-2xl border-2 border-[#3b1d32] shadow-[2px_2px_0px_#3b1d32] font-['Silkscreen'] text-xs text-purple-900 hover:bg-purple-200 cursor-pointer"
        >
          CHAPTERS
        </button>
      </header>

      {/* Floating Pixel Laughing Emojis during dramatic agreement */}
      {showLaughEmojis && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-around">
          {[1, 2, 3, 4, 5].map(i => (
            <motion.div
              key={i}
              initial={{ y: 50, opacity: 0, scale: 0.5 }}
              animate={{ y: -100, opacity: 1, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, delay: i * 0.15 }}
              className="text-3xl filter drop-shadow-md"
            >
              😂💀
            </motion.div>
          ))}
        </div>
      )}

      {/* STAGE 1: OPENING BEDROOM SEQUENCE */}
      {currentStage === 'opening-bedroom' && (
        <div className="w-full max-w-xl flex flex-col items-center space-y-4">
          <BedroomNightScene
            boyEmotion={bedroomStep >= 4 ? 'shy' : 'neutral'}
            lunaAwake={bedroomStep >= 4}
            showSweatdrop={showSweatdrop}
          />

          {/* Stepped Dialogue Box */}
          <div className="w-full bg-[#fffdfa] rounded-3xl p-5 border-4 border-[#3b1d32] shadow-[6px_6px_0px_#3b1d32]">
            <div className="min-h-[75px] flex items-center justify-center text-center">
              {bedroomStep < 4 ? (
                <p className="font-['Fredoka'] text-base sm:text-lg text-[#3b1d32] font-semibold leading-relaxed">
                  "{openingLines[bedroomStep]}"
                </p>
              ) : bedroomStep === 4 ? (
                <div className="space-y-1">
                  <span className="font-['Silkscreen'] text-[10px] text-purple-700 font-bold block">
                    🌙 LUNA:
                  </span>
                  <p className="font-['Fredoka'] text-base text-[#3b1d32] font-medium">
                    “You're smiling at your phone again.”
                  </p>
                </div>
              ) : bedroomStep === 5 ? (
                <div className="space-y-1">
                  <span className="font-['Silkscreen'] text-[10px] text-indigo-700 font-bold block">
                    🌸 {settings.boyName}:
                  </span>
                  <p className="font-['Fredoka'] text-base text-[#3b1d32] font-medium">
                    “I'm literally just looking at her content.”
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <span className="font-['Silkscreen'] text-[10px] text-purple-700 font-bold block">
                    🌙 LUNA:
                  </span>
                  <p className="font-['Fredoka'] text-base text-[#3b1d32] font-medium">
                    “Sure. Very professional research.” 🐾
                  </p>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="mt-4 pt-3 border-t-2 border-pink-100 flex items-center justify-between">
              <span className="text-[10px] font-['Silkscreen'] text-gray-400">
                SCENE 1 OF 3
              </span>

              {bedroomStep < 6 ? (
                <PixelButton
                  variant="pink"
                  size="sm"
                  onClick={handleNextBedroomStep}
                >
                  Continue ➔
                </PixelButton>
              ) : (
                <PixelButton
                  variant="pink"
                  size="sm"
                  icon={<Send className="w-4 h-4 fill-white" />}
                  onClick={() => {
                    soundManager.playClick();
                    setCurrentStage('profile-view');
                  }}
                >
                  View Her Profile & DM 💌
                </PixelButton>
              )}
            </div>
          </div>
        </div>
      )}

      {/* STAGE 2: FICTIONAL INSTAGRAM-INSPIRED PROFILE CARD */}
      {currentStage === 'profile-view' && (
        <div className="w-full max-w-md bg-white rounded-[2.5rem] border-4 border-[#3b1d32] shadow-[8px_8px_0px_#3b1d32] p-5 space-y-4">
          {/* App Header */}
          <div className="flex items-center justify-between pb-3 border-b-2 border-pink-100">
            <div className="flex items-center gap-1.5 font-['Silkscreen'] text-sm font-bold text-pink-600">
              <Sparkles className="w-4 h-4" />
              <span>ChibiGram ♡</span>
            </div>
            <span className="text-[10px] font-['Silkscreen'] bg-pink-50 text-pink-700 px-2.5 py-0.5 rounded-full border border-pink-200">
              PROFILE VIEW
            </span>
          </div>

          {/* Profile Card Info */}
          <div className="flex items-center gap-4">
            {/* Glowing Story Ring Avatar */}
            <div className="p-1 rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 animate-spin-slow">
              <div className="w-16 h-16 bg-pink-100 rounded-full border-2 border-white flex items-center justify-center overflow-hidden">
                <GirlSprite size="sm" emotion="laugh" />
              </div>
            </div>

            <div>
              <h2 className="font-['Fredoka'] text-base font-bold text-[#3b1d32]">
                {settings.girlName || "sunshine.chaos"}
              </h2>
              <span className="text-xs text-pink-600 font-semibold block">
                Creator • Sarcastic humor & serial rants ✨
              </span>
              <div className="flex gap-3 text-xs text-gray-500 font-['Quicksand'] mt-1">
                <span><strong>42</strong> posts</span>
                <span><strong>42.8K</strong> followers</span>
              </div>
            </div>
          </div>

          {/* Profile Romantic Quote */}
          <div className="p-3 bg-pink-50/70 border border-pink-200 rounded-2xl text-center font-['Fredoka'] text-xs text-[#3b1d32] italic">
            “Somewhere between scrolling and smiling... someone caught my attention.”
          </div>

          {/* Miniature Post Previews */}
          <div className="grid grid-cols-3 gap-2">
            <div className="aspect-square bg-gradient-to-tr from-pink-200 to-rose-200 rounded-xl border-2 border-[#3b1d32] flex flex-col items-center justify-center p-1 text-center">
              <span className="text-lg">🎙️</span>
              <span className="text-[8px] font-['Silkscreen'] text-[#3b1d32] mt-0.5 font-bold">REEL #1</span>
            </div>
            <div className="aspect-square bg-gradient-to-tr from-purple-200 to-indigo-200 rounded-xl border-2 border-[#3b1d32] flex flex-col items-center justify-center p-1 text-center">
              <span className="text-lg">📺</span>
              <span className="text-[8px] font-['Silkscreen'] text-[#3b1d32] mt-0.5 font-bold">ROHINI?</span>
            </div>
            <div className="aspect-square bg-gradient-to-tr from-amber-100 to-pink-200 rounded-xl border-2 border-[#3b1d32] flex flex-col items-center justify-center p-1 text-center">
              <span className="text-lg">🐾</span>
              <span className="text-[8px] font-['Silkscreen'] text-[#3b1d32] mt-0.5 font-bold">PINKIE</span>
            </div>
          </div>

          {/* Featured Post Card */}
          <div className="rounded-2xl border-2 border-[#3b1d32] p-3 bg-pink-50/40 relative">
            <div className="flex items-center justify-between mb-2">
              <span className="font-['Silkscreen'] text-[10px] text-pink-700 font-bold">
                FEATURED REEL: ROASTING RETRO CRINGE
              </span>
              <div className="relative">
                <button
                  onClick={handleLikePost}
                  className="flex items-center gap-1 text-xs font-['Silkscreen'] cursor-pointer"
                >
                  <Heart className={`w-5 h-5 transition-transform active:scale-125 ${hasLikedPost ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}`} />
                  <span>{likeCount}</span>
                </button>

                {/* Floating hearts particles */}
                {heartsList.map(h => (
                  <span
                    key={h.id}
                    style={{ transform: `translate(${h.x}px, ${h.y}px)` }}
                    className="absolute -top-1 left-0 pointer-events-none text-xs animate-[floatUp_1s_ease-out_forwards]"
                  >
                    💖
                  </span>
                ))}
              </div>
            </div>

            <p className="font-['Fredoka'] text-xs text-[#3b1d32] leading-relaxed">
              "Why was everyone in retro movies dressed like a disco ball?! Tell me I'm not the only one praying this fashion never returns 💀"
            </p>
          </div>

          {/* Send Message Button */}
          <div className="pt-2">
            <PixelButton
              variant="pink"
              size="lg"
              icon={<Send className="w-4 h-4 fill-white" />}
              onClick={() => {
                soundManager.playClick();
                setCurrentStage('chat-banter');
              }}
              className="w-full"
            >
              Send Message (The First DM) 💌
            </PixelButton>
          </div>
        </div>
      )}

      {/* STAGE 3: THE RETRO TREND INCIDENT (INTERACTIVE CHAT) */}
      {currentStage === 'chat-banter' && (
        <div className="w-full max-w-md bg-white rounded-[2.5rem] border-4 border-[#3b1d32] shadow-[8px_8px_0px_#3b1d32] overflow-hidden flex flex-col h-[720px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 px-4 py-3 border-b-3 border-[#3b1d32] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-pink-100 rounded-full border border-[#3b1d32] flex items-center justify-center overflow-hidden">
                <GirlSprite size="sm" emotion="happy" />
              </div>
              <div>
                <h3 className="font-['Fredoka'] text-sm font-bold text-[#3b1d32]">
                  {settings.girlName || "Her"}
                </h3>
                <span className="text-[10px] text-green-700 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-ping inline-block" />
                  Active now
                </span>
              </div>
            </div>

            {/* Connection Meter */}
            <div className="w-36">
              <ConnectionMeter percentage={connectionPercent} label="WAVELENGTH" />
            </div>
          </div>

          {/* Chat Scene Banner */}
          <div className="bg-pink-100 px-3 py-1.5 border-b border-pink-200 text-center font-['Silkscreen'] text-[10px] text-pink-700 font-bold">
            THE RETRO TREND INCIDENT
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#fffbf7]">
            {chatMessages.length === 0 && (
              <div className="p-3 bg-pink-50 rounded-2xl border border-pink-200 text-center font-['Fredoka'] text-xs text-gray-600">
                💬 You are drafting your opening message... What will you break the ice with?
              </div>
            )}

            {chatMessages.map(msg => {
              if (msg.sender === 'luna') {
                return (
                  <div key={msg.id} className="p-2 bg-purple-100/80 rounded-xl border border-purple-300 text-center text-xs font-['Fredoka'] text-purple-900 italic">
                    {msg.text}
                  </div>
                );
              }
              if (msg.sender === 'pinkie') {
                return (
                  <div key={msg.id} className="p-2 bg-pink-100/80 rounded-xl border border-pink-300 text-center text-xs font-['Fredoka'] text-pink-900 italic">
                    {msg.text}
                  </div>
                );
              }

              const isBoy = msg.sender === 'boy';
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col ${isBoy ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[82%] p-3 rounded-2xl text-xs sm:text-sm font-['Fredoka'] border-2 ${
                      isBoy
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-[#3b1d32] rounded-br-none shadow-[2px_2px_0px_#3b1d32]'
                        : 'bg-white text-[#3b1d32] border-pink-300 rounded-bl-none shadow-[2px_2px_0px_#fbcfe8]'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-gray-400 mt-0.5 px-1">
                    {msg.time}
                  </span>
                </motion.div>
              );
            })}

            {/* Girl Typing Indicator */}
            {isGirlTyping && (
              <div className="flex items-center gap-2">
                <div className="p-2.5 bg-white rounded-2xl rounded-bl-none border border-pink-200 flex gap-1 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Interactive Player Choices */}
          <div className="p-3 bg-white border-t-2 border-pink-200 space-y-2">
            {chatStep === 0 && (
              <div className="space-y-2">
                <span className="font-['Silkscreen'] text-[10px] text-pink-600 font-bold block">
                  STEP 1: SEND FIRST MESSAGE
                </span>
                <button
                  onClick={() =>
                    sendPlayerChat(
                      "Okay, genuine question... Am I the only one who doesn't like this retro trend?",
                      1,
                      50
                    )
                  }
                  className="w-full text-left p-2.5 rounded-xl bg-pink-50 hover:bg-pink-100 border border-pink-300 text-xs font-['Fredoka'] text-[#3b1d32] font-semibold transition-colors cursor-pointer"
                >
                  “Okay, genuine question... Am I the only one who doesn't like this retro trend?”
                </button>
              </div>
            )}

            {chatStep === 1 && !isGirlTyping && (
              <div className="space-y-2">
                <span className="font-['Silkscreen'] text-[10px] text-purple-600 font-bold block">
                  STEP 2: CELEBRATE SHARED OPINION
                </span>
                <button
                  onClick={() =>
                    sendPlayerChat(
                      "FINALLY SOMEONE SAID IT. Historic moment.",
                      2,
                      85
                    )
                  }
                  className="w-full text-left p-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-300 text-xs font-['Fredoka'] text-[#3b1d32] font-semibold transition-colors cursor-pointer"
                >
                  “FINALLY SOMEONE SAID IT. Historic moment.” 🔥
                </button>
              </div>
            )}

            {chatStep === 2 && !isGirlTyping && (
              <div className="text-center pt-2">
                <PixelButton
                  variant="pink"
                  size="md"
                  onClick={() => setCurrentStage('mini-game')}
                  className="w-full"
                >
                  Mini-Game: Same Wavelength? ➔
                </PixelButton>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STAGE 4: MINI-GAME (SAME WAVELENGTH) */}
      {currentStage === 'mini-game' && (
        <div className="w-full max-w-xl">
          <SameWavelengthMiniGame
            onComplete={() => {
              setConnectionPercent(100);
              setShowAchievement(true);
            }}
          />
        </div>
      )}

      {/* STAGE 5: MILESTONE SUMMARY & PROCEED TO CHAPTER 2 */}
      {currentStage === 'milestone' && (
        <div className="w-full max-w-md bg-[#fffdf7] rounded-3xl border-4 border-[#3b1d32] shadow-[8px_8px_0px_#3b1d32] p-6 text-center space-y-4">
          <div className="w-14 h-14 mx-auto bg-pink-100 rounded-full border-2 border-pink-400 flex items-center justify-center text-pink-600">
            <Heart className="w-8 h-8 fill-pink-500" />
          </div>

          <h2 className="font-['Silkscreen'] text-base sm:text-lg font-bold text-[#3b1d32]">
            CHAPTER 1 COMPLETE ♡
          </h2>

          <p className="font-['Fredoka'] text-sm text-gray-700 leading-relaxed">
            What started as a mutual hatred for neon velvet retro fashion turned into an instant bond. But neither of them expected what was coming next...
          </p>

          <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 text-xs font-['Fredoka'] text-purple-900 font-medium">
            📺 <strong>Up Next:</strong> The Rohini Incident — When Tamil serial drama entered the chat!
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <PixelButton
              variant="cream"
              size="sm"
              onClick={onBackToLanding}
            >
              Back Home
            </PixelButton>

            {onProceedToChapter2 && (
              <PixelButton
                variant="pink"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={onProceedToChapter2}
              >
                Play Chapter 2 Now ➔
              </PixelButton>
            )}
          </div>
        </div>
      )}

      {/* Achievement Popup */}
      <AchievementPopup
        isOpen={showAchievement}
        title="SAME BRAIN CELL ♡"
        subtitle="You both officially roasted the retro trend and agreed on life's most vital aesthetic truths!"
        onDismiss={() => {
          setShowAchievement(false);
          setCurrentStage('milestone');
        }}
      />
    </div>
  );
};
