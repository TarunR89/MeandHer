import type { CustomMemory } from './storyData';

// Persistent local progress storage for completed chapters, collected hearts, and secrets
export interface StoryProgress {
  completedChapters: string[];
  collectedHearts: number[];
  hasDiscoveredLetter: boolean;
  hasUnlockedSecretPromise: boolean;
  hasCompletedStory: boolean;
  hasUnlockedWorld: boolean;
  lastPlantWateredDate: string | null;
  pinkieAffection: number;
  isLunaApproved: boolean;
  dayNightPreference: 'auto' | 'day' | 'night';
  customMemories: CustomMemory[];
  masterVolume: number;
  sfxVolume: number;
  bgmVolume: number;
  isMusicMuted: boolean;
  isSfxMuted: boolean;
  isMuted?: boolean;
  feelingsCaughtCount: number;
  unlockedAchievements: string[];
}

export type DayNightMode = 'auto' | 'day' | 'night';

export type UserProgress = StoryProgress;

const PROGRESS_STORAGE_KEY = "our_little_universe_progress_v3";

export const defaultProgress: StoryProgress = {
  completedChapters: ['chapter-1', 'chapter-2'],
  collectedHearts: [],
  hasDiscoveredLetter: false,
  hasUnlockedSecretPromise: false,
  hasCompletedStory: false,
  hasUnlockedWorld: false,
  lastPlantWateredDate: null,
  pinkieAffection: 0,
  isLunaApproved: false,
  dayNightPreference: 'auto',
  customMemories: [],
  masterVolume: 0.8,
  sfxVolume: 0.8,
  bgmVolume: 0.8,
  isMusicMuted: false,
  isSfxMuted: false,
  isMuted: true,
  feelingsCaughtCount: 0,
  unlockedAchievements: ['SAME BRAIN CELL ♡', 'SERIAL DETECTIVES 📺']
};

export function loadStoryProgress(): StoryProgress {
  if (typeof window === "undefined") return defaultProgress;
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...defaultProgress,
        ...parsed,
        completedChapters: Array.from(new Set([...defaultProgress.completedChapters, ...(parsed.completedChapters || [])])),
        unlockedAchievements: Array.from(new Set([...defaultProgress.unlockedAchievements, ...(parsed.unlockedAchievements || [])]))
      };
    }
  } catch (err) {
    console.warn("Could not read story progress:", err);
  }
  return defaultProgress;
}

export function saveStoryProgress(progress: StoryProgress) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.warn("Could not save story progress:", err);
  }
}

export const loadUserProgress = loadStoryProgress;
export const saveUserProgress = saveStoryProgress;

export function markChapterCompleted(chapterId: string): StoryProgress {
  const current = loadStoryProgress();
  if (!current.completedChapters.includes(chapterId)) {
    const updated: StoryProgress = {
      ...current,
      completedChapters: [...current.completedChapters, chapterId]
    };
    saveStoryProgress(updated);
    return updated;
  }
  return current;
}

export function unlockHeartId(heartId: number): StoryProgress {
  const current = loadStoryProgress();
  if (!current.collectedHearts.includes(heartId)) {
    const updated: StoryProgress = {
      ...current,
      collectedHearts: [...current.collectedHearts, heartId]
    };
    saveStoryProgress(updated);
    return updated;
  }
  return current;
}

export function markLetterDiscovered(): StoryProgress {
  const current = loadStoryProgress();
  if (!current.hasDiscoveredLetter) {
    const updated: StoryProgress = {
      ...current,
      hasDiscoveredLetter: true
    };
    saveStoryProgress(updated);
    return updated;
  }
  return current;
}

export function markStoryCompleted(): StoryProgress {
  const current = loadStoryProgress();
  const updated: StoryProgress = {
    ...current,
    hasCompletedStory: true,
    completedChapters: Array.from(new Set([...current.completedChapters, 'chapter-5', 'chapter-6'])),
    unlockedAchievements: Array.from(new Set([...current.unlockedAchievements, 'OUR LITTLE UNIVERSE BEGAN ♡']))
  };
  saveStoryProgress(updated);
  return updated;
}

export function unlockSecretPromise(): StoryProgress {
  const current = loadStoryProgress();
  if (!current.hasUnlockedSecretPromise) {
    const updated: StoryProgress = {
      ...current,
      hasUnlockedSecretPromise: true
    };
    saveStoryProgress(updated);
    return updated;
  }
  return current;
}

export function unlockOurWorld(): StoryProgress {
  const current = loadStoryProgress();
  const updated: StoryProgress = {
    ...current,
    hasUnlockedWorld: true,
    unlockedAchievements: Array.from(new Set([...current.unlockedAchievements, 'WORLD EXPLORER ♡']))
  };
  saveStoryProgress(updated);
  return updated;
}

// Plant watering: records local date (YYYY-MM-DD)
export function waterCottagePlant(): { progress: StoryProgress; alreadyWateredToday: boolean } {
  const current = loadStoryProgress();
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  if (current.lastPlantWateredDate === todayStr) {
    return { progress: current, alreadyWateredToday: true };
  }

  const updated: StoryProgress = {
    ...current,
    lastPlantWateredDate: todayStr,
    unlockedAchievements: Array.from(new Set([...current.unlockedAchievements, 'GREEN THUMB ♡']))
  };
  saveStoryProgress(updated);
  return { progress: updated, alreadyWateredToday: false };
}

export function addPinkieAffection(amount: number = 1): StoryProgress {
  const current = loadStoryProgress();
  const nextAffection = (current.pinkieAffection || 0) + amount;
  const achievements = [...current.unlockedAchievements];
  if (nextAffection >= 5 && !achievements.includes('BEST DOG MOM ♡')) {
    achievements.push('BEST DOG MOM ♡');
  }
  const updated: StoryProgress = {
    ...current,
    pinkieAffection: nextAffection,
    unlockedAchievements: achievements
  };
  saveStoryProgress(updated);
  return updated;
}

export function unlockLunaApproved(): StoryProgress {
  const current = loadStoryProgress();
  const updated: StoryProgress = {
    ...current,
    isLunaApproved: true,
    unlockedAchievements: Array.from(new Set([...current.unlockedAchievements, 'OFFICIALLY LUNA APPROVED ♡']))
  };
  saveStoryProgress(updated);
  return updated;
}

export function saveCustomMemory(memory: CustomMemory): StoryProgress {
  const current = loadStoryProgress();
  const existingIndex = current.customMemories.findIndex(m => m.id === memory.id);
  let updatedList: CustomMemory[];
  if (existingIndex >= 0) {
    updatedList = [...current.customMemories];
    updatedList[existingIndex] = memory;
  } else {
    updatedList = [memory, ...current.customMemories];
  }
  const updated: StoryProgress = {
    ...current,
    customMemories: updatedList
  };
  saveStoryProgress(updated);
  return updated;
}

export function deleteCustomMemory(id: string): StoryProgress {
  const current = loadStoryProgress();
  const updated: StoryProgress = {
    ...current,
    customMemories: current.customMemories.filter(m => m.id !== id)
  };
  saveStoryProgress(updated);
  return updated;
}

export function updateDayNightPreference(pref: 'auto' | 'day' | 'night'): StoryProgress {
  const current = loadStoryProgress();
  const updated: StoryProgress = {
    ...current,
    dayNightPreference: pref
  };
  saveStoryProgress(updated);
  return updated;
}

export function resetAllProgress(): StoryProgress {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(PROGRESS_STORAGE_KEY);
    } catch {
      // ignore
    }
  }
  return defaultProgress;
}
