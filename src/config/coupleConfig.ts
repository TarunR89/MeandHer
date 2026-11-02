// Centralized Personalization Configuration for "Our Little Universe"
// Edit this file to customize personal details before gifting or deployment.

export interface CoupleConfig {
  // Names & Titles
  boyName: string;
  girlName: string;
  boyNickname?: string;
  girlNickname?: string;
  boyTitle: string;
  girlTitle: string;

  // Real Relationship Details
  relationshipStartDate: string; // "YYYY-MM-DD", e.g. "2024-05-18"
  favoriteSerial: string;
  serialCharacter: string;

  // Cinematic Text & Quotes (Preserving the exact real lines)
  openingGreeting: string;
  confessionOpening: string;
  confessionCoreLines: string[];
  confessionQuestion: string; // "Is it a yes?"
  girlfriendAnswer: string; // "of course ❤️"
  girlfriendComfortQuote: string; // "i'm glad you could feel home with me"

  // Love Letters & Messages
  secretPromiseText: string;
  finalLoveLetter: string;

  // Audio / Theme
  boyColor: string;
  girlColor: string;
  optionalMusicPath?: string; // Optional custom audio file path if available
}

export const defaultCoupleConfig: CoupleConfig = {
  // Primary Names
  boyName: "Him",
  girlName: "Her",
  boyNickname: "Nervous Romantic",
  girlNickname: "Sunshine & Chaos",
  boyTitle: "The Boy Behind the Screen",
  girlTitle: "The Emerging Creator with the Vibrant Spark",

  // Relationship Start Date (Set to your actual anniversary date e.g. "2024-05-18")
  relationshipStartDate: "",

  // The Serial They Bonded Over
  favoriteSerial: "Siragu Adika Asai",
  serialCharacter: "Rohini",

  // Authentic Quotations & Dialogue
  openingGreeting: "A little story about how you became my favorite person.",
  confessionOpening: "10:59 PM. Hearts pounding at 140 bpm. The hardest, truest message he ever typed.",
  confessionCoreLines: [
    "I am afraid but still taking this step.",
    "You make me feel seen heard and understood in ways I never knew I needed.",
    "When I told you about the things that hurt, it felt like coming home.",
  ],
  confessionQuestion: "Is it a yes?",
  girlfriendAnswer: "of course ❤️",
  girlfriendComfortQuote: "i'm glad you could feel home with me",

  // Secret Promise & Letters
  secretPromiseText:
    "I promise to always listen when you need to be heard, to laugh with you at every silly serial drama, to walk Pinkie and pet Luna, and to make sure you never have to wonder if you are deeply loved.",
  finalLoveLetter:
    "Thank you for saying of course. Thank you for making our little universe real.",

  // Palette
  boyColor: "#818cf8", // soft periwinkle / lavender
  girlColor: "#f472b6", // warm pastel pink
  optionalMusicPath: "",
};

// Release Readiness Checklist
export interface ReleaseChecklistItem {
  key: string;
  title: string;
  isReady: boolean;
  recommendation: string;
}

export function checkReleaseReadiness(config: CoupleConfig): ReleaseChecklistItem[] {
  return [
    {
      key: "boyName",
      title: "Boy's Real Name",
      isReady: Boolean(config.boyName && config.boyName !== "Him"),
      recommendation: config.boyName === "Him" ? "Update boyName from default 'Him' to his actual name." : "Ready!",
    },
    {
      key: "girlName",
      title: "Girl's Real Name",
      isReady: Boolean(config.girlName && config.girlName !== "Her"),
      recommendation: config.girlName === "Her" ? "Update girlName from default 'Her' to her actual name." : "Ready!",
    },
    {
      key: "relationshipStartDate",
      title: "Anniversary Date (YYYY-MM-DD)",
      isReady: Boolean(config.relationshipStartDate && /^\d{4}-\d{2}-\d{2}$/.test(config.relationshipStartDate)),
      recommendation: !config.relationshipStartDate ? "Set relationshipStartDate to enable the live anniversary counter!" : "Ready!",
    },
    {
      key: "confessionText",
      title: "Confession Accuracy",
      isReady: config.confessionQuestion === "Is it a yes?" && config.girlfriendAnswer.includes("of course"),
      recommendation: "Core historic dialogue accurately matches the real confession.",
    },
    {
      key: "serialDetails",
      title: "Serial Details",
      isReady: config.favoriteSerial === "Siragu Adika Asai" && config.serialCharacter === "Rohini",
      recommendation: "Siragu Adika Asai & Rohini correctly configured.",
    },
  ];
}
