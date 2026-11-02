import { useState, useEffect } from 'react';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { LandingScene } from './scenes/LandingScene';
import { Chapter1Scene } from './scenes/Chapter1Scene';
import { Chapter2Scene } from './scenes/Chapter2Scene';
import { Chapter3Scene } from './scenes/Chapter3Scene';
import { Chapter4Scene } from './scenes/Chapter4Scene';
import { Chapter5Scene } from './scenes/Chapter5Scene';
import { Chapter6Scene } from './scenes/Chapter6Scene';
import { OurWorldScene } from './scenes/OurWorldScene';
import { StoryPlayerScene } from './scenes/StoryPlayerScene';
import { ChapterNavModal } from './components/ui/ChapterNavModal';
import { SettingsModal } from './components/ui/SettingsModal';
import { MemoryBookModal } from './components/story/MemoryBookModal';
import { SecretPromiseModal } from './components/story/SecretPromiseModal';
import {
  type CharacterSettings,
  loadSavedCharacterSettings
} from './data/characterConfig';

type AppScene =
  | 'landing'
  | 'chapter-1'
  | 'chapter-2'
  | 'chapter-3'
  | 'chapter-4'
  | 'chapter-5'
  | 'chapter-6'
  | 'story-player'
  | 'our-world';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentScene, setCurrentScene] = useState<AppScene>('landing');
  const [activeChapterId, setActiveChapterId] = useState<string>('chapter-1');
  const [isChapterNavOpen, setIsChapterNavOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMemoryBookOpen, setIsMemoryBookOpen] = useState(false);
  const [isSecretPromiseOpen, setIsSecretPromiseOpen] = useState(false);

  const [settings, setSettings] = useState<CharacterSettings>(() => {
    return loadSavedCharacterSettings();
  });

  // Keyboard shortcut to close modals with Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsChapterNavOpen(false);
        setIsSettingsOpen(false);
        setIsMemoryBookOpen(false);
        setIsSecretPromiseOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleStartStory = () => {
    setActiveChapterId('chapter-1');
    setCurrentScene('chapter-1');
  };

  const handleSelectChapter = (chapterId: string) => {
    setActiveChapterId(chapterId);
    if (chapterId === 'chapter-1') {
      setCurrentScene('chapter-1');
    } else if (chapterId === 'chapter-2') {
      setCurrentScene('chapter-2');
    } else if (chapterId === 'chapter-3') {
      setCurrentScene('chapter-3');
    } else if (chapterId === 'chapter-4') {
      setCurrentScene('chapter-4');
    } else if (chapterId === 'chapter-5') {
      setCurrentScene('chapter-5');
    } else if (chapterId === 'chapter-6') {
      setCurrentScene('chapter-6');
    } else if (chapterId === 'our-world') {
      setCurrentScene('our-world');
    } else {
      setCurrentScene('story-player');
    }
  };

  return (
    <div className="relative min-h-screen bg-[#fdf2f8] text-[#4a2840] overflow-x-hidden scanlines">
      {/* Loading Screen */}
      {isLoading && (
        <LoadingScreen onLoaded={() => setIsLoading(false)} />
      )}

      {/* Main Active Scene */}
      {!isLoading && (
        <>
          {currentScene === 'landing' && (
            <LandingScene
              settings={settings}
              onStartStory={handleStartStory}
              onOpenChapterNav={() => setIsChapterNavOpen(true)}
              onOpenSettings={() => setIsSettingsOpen(true)}
              onOpenMemoryBook={() => setIsMemoryBookOpen(true)}
              onOpenSecretPromise={() => setIsSecretPromiseOpen(true)}
              onOpenWorld={() => setCurrentScene('our-world')}
            />
          )}

          {currentScene === 'chapter-1' && (
            <Chapter1Scene
              settings={settings}
              onBackToLanding={() => setCurrentScene('landing')}
              onOpenChapterNav={() => setIsChapterNavOpen(true)}
              onProceedToChapter2={() => {
                setActiveChapterId('chapter-2');
                setCurrentScene('chapter-2');
              }}
            />
          )}

          {currentScene === 'chapter-2' && (
            <Chapter2Scene
              settings={settings}
              onBackToLanding={() => setCurrentScene('landing')}
              onOpenChapterNav={() => setIsChapterNavOpen(true)}
              onPreviewChapter3={() => {
                setActiveChapterId('chapter-3');
                setCurrentScene('chapter-3');
              }}
            />
          )}

          {currentScene === 'chapter-3' && (
            <Chapter3Scene
              settings={settings}
              onBackToLanding={() => setCurrentScene('landing')}
              onOpenChapterNav={() => setIsChapterNavOpen(true)}
              onProceedToChapter4={() => {
                setActiveChapterId('chapter-4');
                setCurrentScene('chapter-4');
              }}
            />
          )}

          {currentScene === 'chapter-4' && (
            <Chapter4Scene
              settings={settings}
              onBackToLanding={() => setCurrentScene('landing')}
              onOpenChapterNav={() => setIsChapterNavOpen(true)}
              onProceedToChapter5={() => {
                setActiveChapterId('chapter-5');
                setCurrentScene('chapter-5');
              }}
            />
          )}

          {currentScene === 'chapter-5' && (
            <Chapter5Scene
              settings={settings}
              onBackToLanding={() => setCurrentScene('landing')}
              onOpenChapterNav={() => setIsChapterNavOpen(true)}
              onProceedToChapter6={() => {
                setActiveChapterId('chapter-6');
                setCurrentScene('chapter-6');
              }}
            />
          )}

          {currentScene === 'chapter-6' && (
            <Chapter6Scene
              settings={settings}
              onBackToLanding={() => setCurrentScene('landing')}
              onOpenChapterNav={() => setIsChapterNavOpen(true)}
              onSelectChapter={handleSelectChapter}
              onOpenWorld={() => setCurrentScene('our-world')}
            />
          )}

          {currentScene === 'our-world' && (
            <OurWorldScene
              settings={settings}
              onUpdateSettings={(newSettings) => setSettings(newSettings)}
              onBackToLanding={() => setCurrentScene('landing')}
              onSelectChapter={handleSelectChapter}
            />
          )}

          {currentScene === 'story-player' && (
            <StoryPlayerScene
              chapterId={activeChapterId}
              settings={settings}
              onBackToLanding={() => setCurrentScene('landing')}
              onOpenChapterNav={() => setIsChapterNavOpen(true)}
            />
          )}

          {/* Chapter Navigation Modal */}
          <ChapterNavModal
            isOpen={isChapterNavOpen}
            onClose={() => setIsChapterNavOpen(false)}
            onSelectChapter={handleSelectChapter}
          />

          {/* Settings / Customize Modal */}
          <SettingsModal
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            settings={settings}
            onSave={(newSettings) => setSettings(newSettings)}
          />

          {/* Interactive Memory Book Modal */}
          <MemoryBookModal
            isOpen={isMemoryBookOpen}
            onClose={() => setIsMemoryBookOpen(false)}
            onSelectChapter={handleSelectChapter}
          />

          {/* Secret Promise Letter Modal */}
          <SecretPromiseModal
            isOpen={isSecretPromiseOpen}
            onClose={() => setIsSecretPromiseOpen(false)}
          />
        </>
      )}
    </div>
  );
}
