// Configuration for customizable characters and relationship details
export interface CharacterSettings {
  boyName: string;
  girlName: string;
  boyTitle: string;
  girlTitle: string;
  relationshipStartDate: string; // YYYY-MM-DD or empty
  favoriteSerial: string;
  serialCharacter: string;
  boyColor: string;
  girlColor: string;
}

import { defaultCoupleConfig } from '../config/coupleConfig';

export const defaultCharacterSettings: CharacterSettings = {
  boyName: defaultCoupleConfig.boyName,
  girlName: defaultCoupleConfig.girlName,
  boyTitle: defaultCoupleConfig.boyTitle,
  girlTitle: defaultCoupleConfig.girlTitle,
  relationshipStartDate: defaultCoupleConfig.relationshipStartDate,
  favoriteSerial: defaultCoupleConfig.favoriteSerial,
  serialCharacter: defaultCoupleConfig.serialCharacter,
  boyColor: defaultCoupleConfig.boyColor,
  girlColor: defaultCoupleConfig.girlColor,
};

// Local storage key for persistent custom names and dates
const STORAGE_KEY = "our_little_universe_settings_v1";

export function loadSavedCharacterSettings(): CharacterSettings {
  if (typeof window === "undefined") return defaultCharacterSettings;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...defaultCharacterSettings, ...parsed };
    }
  } catch (err) {
    console.warn("Could not read saved settings:", err);
  }
  return defaultCharacterSettings;
}

export function saveCharacterSettings(settings: CharacterSettings) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (err) {
    console.warn("Could not save settings:", err);
  }
}

// Helper to compute days together using local calendar dates (no timezone drift)
export function getDaysTogether(startDateStr: string): number | null {
  if (!startDateStr || !startDateStr.trim()) return null;
  const parts = startDateStr.split("-").map(p => parseInt(p, 10));
  let startYear: number, startMonth: number, startDay: number;

  if (parts.length === 3 && !parts.some(isNaN)) {
    [startYear, startMonth, startDay] = parts;
  } else {
    const fallback = new Date(startDateStr);
    if (isNaN(fallback.getTime())) return null;
    startYear = fallback.getFullYear();
    startMonth = fallback.getMonth() + 1;
    startDay = fallback.getDate();
  }

  const startMidnight = new Date(startYear, startMonth - 1, startDay, 0, 0, 0, 0);
  const now = new Date();
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

  const diffMs = todayMidnight.getTime() - startMidnight.getTime();
  if (diffMs < 0) return 0;
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

export interface MonthlyAnniversaryInfo {
  dateStr: string;
  daysUntil: number;
  monthsCount: number;
  isToday: boolean;
}

export interface YearlyAnniversaryInfo {
  dateStr: string;
  daysUntil: number;
  yearsCount: number;
  isToday: boolean;
}

export function getNextMonthlyAnniversary(startDateStr: string): MonthlyAnniversaryInfo | null {
  if (!startDateStr || !startDateStr.trim()) return null;
  const parts = startDateStr.split("-").map(p => parseInt(p, 10));
  let startYear: number, startMonth: number, startDay: number;
  if (parts.length === 3 && !parts.some(isNaN)) {
    [startYear, startMonth, startDay] = parts;
  } else {
    const fallback = new Date(startDateStr);
    if (isNaN(fallback.getTime())) return null;
    startYear = fallback.getFullYear();
    startMonth = fallback.getMonth() + 1;
    startDay = fallback.getDate();
  }

  const now = new Date();
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

  // Search forward from current month
  let candidateYear = now.getFullYear();
  let candidateMonth = now.getMonth(); // 0-indexed

  for (let i = 0; i < 24; i++) {
    const maxDaysInMonth = new Date(candidateYear, candidateMonth + 1, 0).getDate();
    const clampedDay = Math.min(startDay, maxDaysInMonth);
    const candidateDate = new Date(candidateYear, candidateMonth, clampedDay, 0, 0, 0, 0);

    if (candidateDate.getTime() >= todayMidnight.getTime()) {
      const diffMs = candidateDate.getTime() - todayMidnight.getTime();
      const daysUntil = Math.round(diffMs / (1000 * 60 * 60 * 24));
      // Calculate how many months have passed from start to this candidate
      const monthsCount = (candidateYear - startYear) * 12 + (candidateMonth - (startMonth - 1));
      
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const dateStr = `${monthNames[candidateMonth]} ${clampedDay}, ${candidateYear}`;

      return {
        dateStr,
        daysUntil,
        monthsCount: Math.max(0, monthsCount),
        isToday: daysUntil === 0,
      };
    }

    candidateMonth++;
    if (candidateMonth > 11) {
      candidateMonth = 0;
      candidateYear++;
    }
  }

  return null;
}

export function getNextYearlyAnniversary(startDateStr: string): YearlyAnniversaryInfo | null {
  if (!startDateStr || !startDateStr.trim()) return null;
  const parts = startDateStr.split("-").map(p => parseInt(p, 10));
  let startYear: number, startMonth: number, startDay: number;
  if (parts.length === 3 && !parts.some(isNaN)) {
    [startYear, startMonth, startDay] = parts;
  } else {
    const fallback = new Date(startDateStr);
    if (isNaN(fallback.getTime())) return null;
    startYear = fallback.getFullYear();
    startMonth = fallback.getMonth() + 1;
    startDay = fallback.getDate();
  }

  const now = new Date();
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

  let candidateYear = now.getFullYear();
  for (let i = 0; i < 10; i++) {
    const maxDaysInMonth = new Date(candidateYear, startMonth, 0).getDate();
    const clampedDay = Math.min(startDay, maxDaysInMonth);
    const candidateDate = new Date(candidateYear, startMonth - 1, clampedDay, 0, 0, 0, 0);

    if (candidateDate.getTime() >= todayMidnight.getTime()) {
      const diffMs = candidateDate.getTime() - todayMidnight.getTime();
      const daysUntil = Math.round(diffMs / (1000 * 60 * 60 * 24));
      const yearsCount = candidateYear - startYear;
      
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const dateStr = `${monthNames[startMonth - 1]} ${clampedDay}, ${candidateYear}`;

      return {
        dateStr,
        daysUntil,
        yearsCount: Math.max(1, yearsCount),
        isToday: daysUntil === 0,
      };
    }

    candidateYear++;
  }

  return null;
}
