import React from 'react';
import type { EmotionType } from '../../data/storyData';

interface BoySpriteProps {
  emotion?: EmotionType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  isBlinking?: boolean;
}

export const BoySprite: React.FC<BoySpriteProps> = ({
  emotion = 'neutral',
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-16 h-24',
    md: 'w-24 h-36',
    lg: 'w-36 h-52',
    xl: 'w-48 h-72'
  };

  return (
    <div className={`relative inline-block select-none pixel-art animate-idle-bob ${sizeMap[size]} ${className}`}>
      <svg
        viewBox="0 0 48 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_4px_6px_rgba(74,40,64,0.15)]"
        shapeRendering="crispEdges"
      >
        {/* Shadow on ground */}
        <ellipse cx="24" cy="70" rx="14" ry="2.5" fill="#4a2840" fillOpacity="0.2" />

        {/* Hair - Back layer */}
        <rect x="15" y="10" width="18" height="14" fill="#2d1e2f" />
        <rect x="13" y="12" width="22" height="10" fill="#2d1e2f" />
        <rect x="11" y="14" width="26" height="8" fill="#2d1e2f" />

        {/* Head / Skin base */}
        <rect x="16" y="14" width="16" height="16" fill="#ffe4d6" />
        <rect x="14" y="16" width="20" height="12" fill="#ffe4d6" />

        {/* Hair - Front bangs & messy tufts */}
        <rect x="14" y="8" width="20" height="6" fill="#3d283e" />
        <rect x="16" y="6" width="14" height="4" fill="#4d324e" />
        {/* Hair highlight */}
        <rect x="18" y="8" width="4" height="2" fill="#6d486f" />
        <rect x="26" y="8" width="5" height="2" fill="#6d486f" />
        {/* Bangs falling over forehead */}
        <rect x="14" y="12" width="4" height="6" fill="#3d283e" />
        <rect x="19" y="12" width="3" height="7" fill="#3d283e" />
        <rect x="23" y="12" width="4" height="5" fill="#3d283e" />
        <rect x="28" y="12" width="3" height="6" fill="#3d283e" />
        <rect x="31" y="13" width="3" height="5" fill="#3d283e" />

        {/* Eyes & Eyebrows based on emotion */}
        {emotion === 'love' ? (
          /* Heart eyes */
          <>
            <path d="M18 20 C18 19, 19 18, 20 19 C21 18, 22 19, 22 20 C22 21, 20 22, 20 22 C20 22, 18 21, 18 20 Z" fill="#ec4899" />
            <path d="M26 20 C26 19, 27 18, 28 19 C29 18, 30 19, 30 20 C30 21, 28 22, 28 22 C28 22, 26 21, 26 20 Z" fill="#ec4899" />
          </>
        ) : emotion === 'shy' || emotion === 'thinking' ? (
          /* Shy looking slightly aside */
          <>
            <rect x="19" y="19" width="3" height="4" fill="#2d1e2f" />
            <rect x="20" y="19" width="1" height="2" fill="#ffffff" />
            <rect x="27" y="19" width="3" height="4" fill="#2d1e2f" />
            <rect x="28" y="19" width="1" height="2" fill="#ffffff" />
          </>
        ) : emotion === 'laugh' ? (
          /* Giggling curved eyes ^ ^ */
          <>
            <rect x="18" y="19" width="4" height="1" fill="#2d1e2f" />
            <rect x="17" y="20" width="2" height="1" fill="#2d1e2f" />
            <rect x="21" y="20" width="2" height="1" fill="#2d1e2f" />

            <rect x="26" y="19" width="4" height="1" fill="#2d1e2f" />
            <rect x="25" y="20" width="2" height="1" fill="#2d1e2f" />
            <rect x="29" y="20" width="2" height="1" fill="#2d1e2f" />
          </>
        ) : (
          /* Normal cute animated blinking eyes */
          <g className="animate-blink">
            <rect x="18" y="19" width="3" height="4" fill="#2d1e2f" />
            <rect x="19" y="19" width="1" height="2" fill="#ffffff" />
            <rect x="27" y="19" width="3" height="4" fill="#2d1e2f" />
            <rect x="28" y="19" width="1" height="2" fill="#ffffff" />
          </g>
        )}

        {/* Cute rosy blush marks on cheeks */}
        <rect x="15" y="23" width="4" height="2" fill="#fb7185" fillOpacity="0.75" />
        <rect x="29" y="23" width="4" height="2" fill="#fb7185" fillOpacity="0.75" />

        {/* Mouth */}
        {emotion === 'laugh' || emotion === 'happy' || emotion === 'love' ? (
          <path d="M22 25 Q24 28 26 25" stroke="#be185d" strokeWidth="1.5" strokeLinecap="round" fill="#fda4af" />
        ) : emotion === 'shy' ? (
          <rect x="23" y="25" width="2" height="1" fill="#4a2840" />
        ) : (
          <path d="M22 25 Q24 26.5 26 25" stroke="#4a2840" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        )}

        {/* Nervous sweatdrop for shy/confession states */}
        {(emotion === 'shy' || emotion === 'shocked') && (
          <path d="M33 14 C33 14, 35 16, 35 17 C35 18, 34 19, 33 19 C32 19, 31 18, 31 17 C31 16, 33 14, 33 14 Z" fill="#38bdf8" />
        )}

        {/* Neck */}
        <rect x="22" y="28" width="4" height="3" fill="#ffd1bc" />

        {/* Cozy Lavender/Sky Hoodie */}
        <rect x="15" y="31" width="18" height="18" fill="#a5b4fc" />
        <rect x="13" y="33" width="22" height="14" fill="#a5b4fc" />
        {/* Hoodie collar & drawstrings */}
        <rect x="20" y="31" width="8" height="3" fill="#c7d2fe" />
        <rect x="21" y="34" width="1.5" height="5" fill="#ffffff" />
        <rect x="25.5" y="34" width="1.5" height="5" fill="#ffffff" />
        {/* Kangaroo pocket */}
        <rect x="18" y="40" width="12" height="6" fill="#818cf8" />
        <rect x="17" y="41" width="14" height="4" fill="#818cf8" />

        {/* Arms */}
        <rect x="11" y="33" width="4" height="12" fill="#818cf8" />
        <rect x="33" y="33" width="4" height="12" fill="#818cf8" />
        {/* Hands */}
        <rect x="11" y="45" width="4" height="3" fill="#ffe4d6" />
        <rect x="33" y="45" width="4" height="3" fill="#ffe4d6" />

        {/* Cozy Charcoal Pants */}
        <rect x="16" y="49" width="6.5" height="14" fill="#374151" />
        <rect x="25.5" y="49" width="6.5" height="14" fill="#374151" />
        <rect x="17" y="48" width="14" height="2" fill="#1f2937" />

        {/* Pastel Retro Sneakers */}
        <rect x="14" y="63" width="8.5" height="5" fill="#ffffff" />
        <rect x="14" y="66" width="9" height="2" fill="#ec4899" />
        <rect x="25.5" y="63" width="8.5" height="5" fill="#ffffff" />
        <rect x="25" y="66" width="9" height="2" fill="#ec4899" />
      </svg>
    </div>
  );
};
