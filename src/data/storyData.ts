// Story Data and Dialogue Engine Script for "Our Little Universe ♡"

export type EmotionType = "neutral" | "happy" | "shy" | "laugh" | "shocked" | "love" | "thinking";

export interface DialogueChoice {
  text: string;
  nextId: string;
  reaction?: string;
}

export interface DialogueNode {
  id: string;
  speaker: "boy" | "girl" | "narrator" | "system";
  text: string;
  tamilText?: string;
  emotion?: EmotionType;
  choices?: DialogueChoice[];
  nextId?: string;
  bgAtmosphere?: "night" | "sunset" | "room" | "stars";
  soundEffect?: "blip" | "bop" | "heart" | "bark" | "meow" | "fanfare";
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  timeframe: string;
  badge: string;
  status: "playable" | "preview";
  summary: string;
  previewQuote: string;
  teaserParagraphs: string[];
  initialNodeId: string;
  dialogues: Record<string, DialogueNode>;
}

export const CHAPTERS: Chapter[] = [
  {
    id: "chapter-1",
    number: 1,
    title: "The First DM",
    subtitle: "A retro trend we both despised & an unexpected spark",
    timeframe: "The Beginning",
    badge: "✨ Chapter 1: Playable",
    status: "playable",
    summary: "He noticed her rising influencer profile, adored her genuine charm, and gathered the courage to initiate a chat about a silly retro trend they both hated.",
    previewQuote: "“I honestly thought you'd ignore me or block me right away... but you replied with the funniest roast ever.”",
    teaserParagraphs: [
      "Scrolling through his feed, her content stood out immediately. It wasn't just aesthetic—she had this rare, vibrant energy and fearless humor.",
      "Spotting a viral retro trend everyone was obsessing over, he noticed her witty reaction roasting it. That was his cue.",
      "One nervous DM later, talking about that cringey trend quickly spiraled into heated, hilarious debates about Siragu Adika Asai and Rohini's unbelievable serial drama!"
    ],
    initialNodeId: "dm-1",
    dialogues: {
      "dm-1": {
        id: "dm-1",
        speaker: "narrator",
        text: "It all started on Instagram... A boy noticed an emerging creator whose posts had an infectious spark of humor and style.",
        emotion: "neutral",
        nextId: "dm-2"
      },
      "dm-2": {
        id: "dm-2",
        speaker: "boy",
        text: "I was just a quiet guy scrolling... and then your reel popped up. You were totally making fun of that terrible retro fashion trend everyone was hyping up!",
        emotion: "shy",
        nextId: "dm-3"
      },
      "dm-3": {
        id: "dm-3",
        speaker: "boy",
        text: "My fingers were hovering over the message box for ten solid minutes. What if I come off weird? What should I open with?",
        emotion: "thinking",
        choices: [
          {
            text: "“Please tell me I'm not the only one traumatized by that retro trend! 😂”",
            nextId: "dm-reply-trend",
            reaction: "Shared roasting!"
          },
          {
            text: "“Wait, did you watch the latest Siragu Adika Asai episode?! Rohini has gone too far!”",
            nextId: "dm-reply-serial",
            reaction: "Instant serial bonding!"
          }
        ]
      },
      "dm-reply-trend": {
        id: "dm-reply-trend",
        speaker: "girl",
        text: "OMG YES!! Finally someone with actual taste! 😭 Why is everyone pretending that neon velvet trend looks good?!",
        emotion: "laugh",
        soundEffect: "heart",
        nextId: "dm-4"
      },
      "dm-reply-serial": {
        id: "dm-reply-serial",
        speaker: "girl",
        text: "NO WAY! You watch Siragu Adika Asai too?! 😱 Rohini literally stressed me out so much today, I need a whole support group!",
        emotion: "shocked",
        soundEffect: "heart",
        nextId: "dm-4"
      },
      "dm-4": {
        id: "dm-4",
        speaker: "narrator",
        text: "What was supposed to be a brief exchange turned into hours of banter, Tamil meme sharing, and uncontrollable laughter.",
        emotion: "happy",
        nextId: "dm-5"
      },
      "dm-5": {
        id: "dm-5",
        speaker: "girl",
        text: "You know, most people who DM me just send boring one-word compliments. You actually made me laugh out loud with those unhinged memes!",
        emotion: "happy",
        nextId: "dm-6"
      },
      "dm-6": {
        id: "dm-6",
        speaker: "boy",
        text: "I was sitting there smiling at my phone screen like an absolute goofball until 2 AM. That was the moment I knew you were special.",
        emotion: "love",
        soundEffect: "fanfare",
        nextId: "dm-end"
      },
      "dm-end": {
        id: "dm-end",
        speaker: "system",
        text: "🎉 Milestone Unlocked: The First DM was sent! Two completely different worlds just collided in the best possible way.",
        emotion: "happy",
        soundEffect: "fanfare"
      }
    }
  },
  {
    id: "chapter-2",
    number: 2,
    title: "The Rohini Incident",
    subtitle: "Somehow, Rohini entered the conversation & 2 AM giggles",
    timeframe: "The Banter Days",
    badge: "✨ Chapter 2: Playable",
    status: "playable",
    summary: "DMs turned into daily routines. Swapping savage Tamil memes, unhinged roasts, and realizing her sense of dark humour was the perfect match for his world.",
    previewQuote: "“Her humor isn't just cute—she has this delightfully sarcastic, dark streak that catches you off guard in the best way.”",
    teaserParagraphs: [
      "No awkward small talk was allowed in this chat. Soon, their messages were a barrage of vadivelu reaction stickers, screenshots of ridiculous comments, and silly voice clips.",
      "She showed him her goofy, unfiltered self—cracking silly puns and dropping dark comedic one-liners when he least expected it.",
      "He found himself checking his phone before his morning coffee, wondering what chaotic meme she had sent him overnight."
    ],
    initialNodeId: "ch2-1",
    dialogues: {
      "ch2-1": {
        id: "ch2-1",
        speaker: "narrator",
        text: "Their conversations evolved from cautious pleasantries into pure, unadulterated chaotic bliss.",
        emotion: "happy"
      }
    }
  },
  {
    id: "chapter-3",
    number: 3,
    title: "You Felt Like Home",
    subtitle: "Somewhere along the way... the conversations started feeling different",
    timeframe: "Deep Waters",
    badge: "✨ Chapter 3: Playable",
    status: "playable",
    summary: "Beyond the comedy and memes lay honest hearts. Sharing tough moments from their pasts, her patience, empathy, and gentle understanding made him feel deeply safe.",
    previewQuote: "“For the first time in my life, I didn't feel the need to pretend to have it all together. With her, I was just me.”",
    teaserParagraphs: [
      "One rainy evening, the jokes paused, and the conversation drifted into the things people usually keep guarded.",
      "They talked about heartaches, past hardships, family expectations, and the quiet fears nobody else gets to see.",
      "Instead of superficial advice or pity, she offered something much rarer: genuine presence. She listened, she validated, and in doing so, healed parts of him she didn't even break."
    ],
    initialNodeId: "ch3-1",
    dialogues: {
      "ch3-1": {
        id: "ch3-1",
        speaker: "narrator",
        text: "In a world of noise, her voice became the quiet sanctuary he had always looked for.",
        emotion: "love"
      }
    }
  },
  {
    id: "chapter-4",
    number: 4,
    title: "All The Little Things",
    subtitle: "I tried not to fall. That didn't work.",
    timeframe: "The Realization",
    badge: "✨ Chapter 4: Playable",
    status: "playable",
    summary: "It was impossible not to fall. Her expressive eyes, that warm laugh that crinkled her cheeks, and the bold, unapologetic confidence she carried.",
    previewQuote: "“I caught myself replaying her voice notes just to hear her laugh again. That was when I knew I was in deep trouble.”",
    teaserParagraphs: [
      "He noticed every small detail: the way her eyes lit up when she talked passionately about her creations, the soft flush on her cheeks, and her radiant, disarming smile.",
      "She had this fierce confidence that inspired him, paired with the sweetest gentleness that melted every guard he had.",
      "Every song he listened to started feeling like it was written about her."
    ],
    initialNodeId: "ch4-1",
    dialogues: {
      "ch4-1": {
        id: "ch4-1",
        speaker: "narrator",
        text: "Falling in love with her didn't happen all at once—it was like watching sunrise turn the whole sky pink.",
        emotion: "love"
      }
    }
  },
  {
    id: "chapter-5",
    number: 5,
    title: "The Message I Almost Didn't Send",
    subtitle: "Some feelings are too important to leave unsaid.",
    timeframe: "11:00 PM",
    badge: "✨ Chapter 5: Playable",
    status: "playable",
    summary: "At 11:00 PM, his heart racing and hands trembling, he took the bravest step of his life—confessing everything he felt, terrified of getting blocked, but unwilling to let her slip away.",
    previewQuote: "“I am afraid but still taking this step... You make me feel seen heard and understood in ways I never knew I needed.”",
    teaserParagraphs: [
      "The clock ticked closer to 11:00 PM. He sat on the edge of his bed, typing and backspacing a dozen different paragraphs.",
      "He wrote about how she made him feel seen, how she heard him when everyone else only listened to respond, and how she understood him like nobody ever had.",
      "Taking a deep breath, he prepared to hit send with his heart in his throat."
    ],
    initialNodeId: "ch5-1",
    dialogues: {
      "ch5-1": {
        id: "ch5-1",
        speaker: "narrator",
        text: "11:00 PM. A single message sent into the universe that would change both of their lives forever.",
        emotion: "shy"
      }
    }
  },
  {
    id: "chapter-6",
    number: 6,
    title: "The Word That Changed Everything",
    subtitle: "Two words. One unforgettable moment.",
    timeframe: "Forever",
    badge: "✨ Chapter 6: Playable",
    status: "playable",
    summary: "Her response painted their entire world with warmth: 'of course ❤️'. The moment their little universe truly began.",
    previewQuote: "“‘of course’ ❤️ — the two words that turned two separate paths into one beautiful little universe.”",
    teaserParagraphs: [
      "The message status flipped to 'Read'. A second later, the typing bubbles danced on the screen.",
      "Her response appeared: 'of course ❤️'. No hesitation, no games, just wholehearted tenderness.",
      "This site is a joyful monument to the day she said yes, celebrating the laughter, the love, and the little universe they built together."
    ],
    initialNodeId: "ch6-1",
    dialogues: {
      "ch6-1": {
        id: "ch6-1",
        speaker: "narrator",
        text: "And so, our little universe began... and it only grows brighter with every passing day.",
        emotion: "love"
      }
    }
  }
];

// Structured Confession Data with clear demarcation between verbatim fragments and context
export interface ConfessionData {
  timeStr: string;
  confirmedFragments: {
    takingStep: string;
    seenHeardUnderstood: string;
  };
  customFullConfession: string;
  girlResponse: {
    confirmedHome: string;
    contextParaphrase: string;
    customFullResponse: string;
  };
  boyQuestion: string;
  girlAnswer: string;
  girlAnswerEmoji: string;
}

export const CONFESSION_DATA: ConfessionData = {
  timeStr: "11:00 PM",
  confirmedFragments: {
    takingStep: "I am afraid but still taking this step",
    seenHeardUnderstood: "You make me feel seen heard and understood in ways I never knew I needed"
  },
  // If a full screenshot/original text is added later, it will be placed here.
  // Otherwise, the UI presents the confirmed fragments with transparent narration.
  customFullConfession: "",
  girlResponse: {
    confirmedHome: "i'm glad you could feel home with me",
    contextParaphrase: "She expressed that she had also developed a meaningful connection and shared personal things she had not previously told others.",
    customFullResponse: ""
  },
  boyQuestion: "Is it a yes?",
  girlAnswer: "of course",
  girlAnswerEmoji: "❤️"
};

// Secret Promise Letter unlocked behind the Cherry Blossom Tree
export interface SecretPromiseData {
  title: string;
  salutation: string;
  bodyParagraphs: string[];
  signoff: string;
}

export const SECRET_PROMISE_DATA: SecretPromiseData = {
  title: "A Little Promise ♡",
  salutation: "Hey pretty girl,",
  bodyParagraphs: [
    "I know our story has only just begun.",
    "But I wanted to make something that reminds you of how special you already are to me.",
    "I love the way you smile. I love your beautiful eyes. I love those adorable cheeks. I love your confidence and the way you carry yourself.",
    "But most of all, I love how you make me feel understood.",
    "I can't promise that every day will be perfect. But I can promise to keep trying, keep listening, keep learning, and keep choosing you.",
    "I'm really glad I found you. And I'm even happier that you chose me too.",
    "Here's to us, to Pinkie and Luna, and to all the memories we haven't made yet."
  ],
  signoff: "♡"
};

// Memory Book Pages (Scrapbook of all 6 chapters)
export interface MemoryBookPage {
  chapterId: string;
  pageNumber: number;
  title: string;
  dateOrPhase: string;
  sticker: string;
  summary: string;
  highlightQuote: string;
  petNote: string;
}

export const MEMORY_BOOK_PAGES: MemoryBookPage[] = [
  {
    chapterId: "chapter-1",
    pageNumber: 1,
    title: "The First DM",
    dateOrPhase: "Day 1 • Instagram",
    sticker: "💌",
    summary: "A nervous boy scrolling through his feed noticed her vibrant reels. Bonding over a viral retro trend neither of them could stand.",
    highlightQuote: "“Please tell me I'm not the only one traumatized by that retro trend! 😂”",
    petNote: "Luna: 'I saw his hands shaking when he clicked Send.' 🐾"
  },
  {
    chapterId: "chapter-2",
    pageNumber: 2,
    title: "The Rohini Incident",
    dateOrPhase: "The Banter Days",
    sticker: "📺",
    summary: "Late-night serial drama discussions about Siragu Adika Asai and Rohini's unbelievable lies turned into 2 AM giggles and unfiltered memes.",
    highlightQuote: "“Okay but can we talk about Rohini? PLEASE. I HAVE SO MUCH TO SAY. 😭”",
    petNote: "Pinkie: 'I was snoring right through the television drama!' 🐶"
  },
  {
    chapterId: "chapter-3",
    pageNumber: 3,
    title: "You Felt Like Home",
    dateOrPhase: "Late Night Talks",
    sticker: "🏡",
    summary: "Beyond the banter lay quiet vulnerability. Opening up about past scars without fear of judgement. Her presence felt like peaceful sanctuary.",
    highlightQuote: "“And when I told you about the things that hurt... you made me feel safe. It felt like coming home.”",
    petNote: "Luna: 'He stopped staring at the wall and started smiling at the stars.' 🌙"
  },
  {
    chapterId: "chapter-4",
    pageNumber: 4,
    title: "All The Little Things",
    dateOrPhase: "The Realization",
    sticker: "🌸",
    summary: "Falling for her eyes, her smile that crinkles her cheeks, her fierce confidence, and her tender heart. Realizing he was completely smitten.",
    highlightQuote: "“I caught myself replaying her voice notes just to hear her laugh again.”",
    petNote: "Pinkie: 'I knew he was a keeper when he learned all her favorite jokes!' 🎀"
  },
  {
    chapterId: "chapter-5",
    pageNumber: 5,
    title: "The 11 PM Confession",
    dateOrPhase: "11:00 PM • The Leap",
    sticker: "⏳",
    summary: "10:59 PM ticked to 11:00 PM. Terrified of losing her friendship or getting blocked, he gathered all his courage and sent the message.",
    highlightQuote: "“I am afraid but still taking this step. You make me feel seen heard and understood in ways I never knew I needed.”",
    petNote: "Luna: 'Pacing like Romeo before an exam.' 😼"
  },
  {
    chapterId: "chapter-6",
    pageNumber: 6,
    title: "The Word That Changed Everything",
    dateOrPhase: "The Beginning of Forever",
    sticker: "❤️",
    summary: "After asking 'Is it a yes?', she replied with the warmest two words in the universe: 'of course ❤️'. And our little universe began.",
    highlightQuote: "“‘of course’ ❤️ — the moment two separate paths became our little universe.”",
    petNote: "Pinkie & Luna: 'And that's how we officially became a family!' 🐾"
  }
];

// Phase 5: The Love Letter Mailbox Content
export interface LoveLetterItem {
  id: string;
  envelopeTitle: string;
  subtitle: string;
  icon: string;
  themeColor: string;
  salutation: string;
  paragraphs: string[];
  signoff: string;
}

export const LOVE_LETTERS: LoveLetterItem[] = [
  {
    id: "miss-me",
    envelopeTitle: "OPEN WHEN YOU MISS ME",
    subtitle: "A reminder across any distance",
    icon: "💌",
    themeColor: "from-pink-300 via-rose-300 to-pink-200 border-pink-400 text-pink-950",
    salutation: "Hey pretty girl,",
    paragraphs: [
      "If you're reading this because you miss me, I hope you know that somewhere out there I'm probably thinking about you too.",
      "I wish I could be right there beside you.",
      "Until then, imagine me holding your hand, looking at you with the biggest smile, and reminding you how much you mean to me.",
      "Distance doesn't change how happy I am that I found you."
    ],
    signoff: "♡"
  },
  {
    id: "need-a-smile",
    envelopeTitle: "OPEN WHEN YOU NEED A SMILE",
    subtitle: "For an immediate boost of cute",
    icon: "✨",
    themeColor: "from-amber-200 via-pink-200 to-rose-200 border-amber-400 text-amber-950",
    salutation: "Okay, first of all...",
    paragraphs: [
      "You're ridiculously cute. Like genuinely unfair levels of cute.",
      "Your smile? Dangerous.",
      "Your cheeks? Criminally adorable.",
      "Your eyes? Absolutely no chance of survival.",
      "And before you say I'm exaggerating...",
      "Yes. But also no. Now smile for me, pretty girl."
    ],
    signoff: "♡"
  },
  {
    id: "hard-day",
    envelopeTitle: "OPEN WHEN YOU'VE HAD A HARD DAY",
    subtitle: "A safe and gentle sanctuary",
    icon: "🌿",
    themeColor: "from-purple-200 via-pink-200 to-indigo-100 border-purple-400 text-purple-950",
    salutation: "Hey love,",
    paragraphs: [
      "I don't know what kind of day you've had, but I hope you know you don't have to pretend everything is okay around me.",
      "You can talk about it, sit quietly, laugh at something silly, or just take your time.",
      "I'm proud of you for getting through the difficult days, even the ones nobody else sees.",
      "You deserve kindness and rest.",
      "And I hope I can keep being someone who makes your days a little lighter."
    ],
    signoff: "♡"
  }
];

// Stargazing Wish Romantic Lines
export const STARGAZING_WISH_LINES = [
  "I don't know what tomorrow has planned for us.",
  "But I hope it gives us more laughter.",
  "More conversations.",
  "More memories.",
  "And more reasons to choose each other.",
  "One little day at a time. ♡"
];

// Easter Eggs Dialogues & Content
export const EASTER_EGGS_DATA = {
  retroTv: {
    title: "THE RETRO TV 📺",
    quote1: "Remember how this all started?",
    quote2: "Two people disagreeing with the same trend. 😂"
  },
  rohiniNote: {
    title: "THE ROHINI NOTE 📝",
    text: "Rohini really had no idea she was helping start a love story. 📺✨"
  },
  elevenClock: {
    title: "THE 11:00 PM CLOCK ⏰",
    text: "Some nights change everything. ❤️"
  },
  petTogether: {
    title: "PET HARMONY 🐾",
    text: "Her dog. His cat. Their little universe. 🐶🐱♡"
  },
  secretHeart: {
    title: "HIDDEN GARDEN HEART ♡",
    text: "If I had to find you all over again, I'd still start that conversation."
  }
};

// Memory Garden Milestone Flowers
export interface MemoryGardenFlower {
  id: number;
  chapterId: string;
  name: string;
  subtitle: string;
  summary: string;
  quote: string;
  icon: string;
  petalColor: string;
}

export const MEMORY_GARDEN_FLOWERS: MemoryGardenFlower[] = [
  {
    id: 1,
    chapterId: "chapter-1",
    name: "Where It All Began",
    subtitle: "Instagram DM",
    summary: "A boy noticed an emerging creator whose posts had a rare, vibrant spark. One message about a viral retro trend sparked our journey.",
    quote: "“Please tell me I'm not the only one traumatized by that retro trend! 😂”",
    icon: "🌸",
    petalColor: "#f472b6"
  },
  {
    id: 2,
    chapterId: "chapter-1",
    name: "The Retro Trend",
    subtitle: "Shared Taste & Humor",
    summary: "Discovering we both despised the same cringe viral trends and could roast them without holding back.",
    quote: "“Finally someone with actual taste! Why is everyone pretending that trend looks good?!”",
    icon: "✨",
    petalColor: "#fbbf24"
  },
  {
    id: 3,
    chapterId: "chapter-2",
    name: "The Rohini Discussions",
    subtitle: "Siragu Adika Asai Drama",
    summary: "Bonding over heated, hilarious serial debates and realizing her quick wit was the perfect counterpart to his world.",
    quote: "“Okay but can we talk about Rohini? PLEASE. I HAVE SO MUCH TO SAY. 😭”",
    icon: "📺",
    petalColor: "#a855f7"
  },
  {
    id: 4,
    chapterId: "chapter-3",
    name: "You Felt Like Home",
    subtitle: "Safe Sanctuary",
    summary: "Late-night vulnerability, sharing past hardships, and finding safe emotional sanctuary in her kindness.",
    quote: "“And when I told you about the things that hurt... it felt like coming home.”",
    icon: "🏡",
    petalColor: "#60a5fa"
  },
  {
    id: 5,
    chapterId: "chapter-5",
    name: "The 11 PM Confession",
    subtitle: "The Leap of Faith",
    summary: "Pacing nervously until 11:00 PM, afraid of losing the connection or being blocked, but choosing to confess honest feelings.",
    quote: "“I am afraid but still taking this step. You make me feel seen heard and understood in ways I never knew I needed.”",
    icon: "💌",
    petalColor: "#ec4899"
  },
  {
    id: 6,
    chapterId: "chapter-6",
    name: "Of Course",
    subtitle: "Our Little Universe Began",
    summary: "The definitive question asked with pounding heart, answered with the warmest two words: 'of course ❤️'.",
    quote: "“‘of course’ ❤️ — the moment our little universe officially began.”",
    icon: "❤️",
    petalColor: "#f43f5e"
  }
];

// Custom User Memory Model for Memory Garden CRUD
export interface CustomMemory {
  id: string;
  title: string;
  date: string;
  description: string;
  color?: string;
  icon?: string;
  createdAt?: number;
}

export type LoveLetter = LoveLetterItem;
