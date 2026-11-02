import React from 'react';
import type { EmotionType } from '../../data/storyData';

interface GirlSpriteProps {
  emotion?: EmotionType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const GirlSprite: React.FC<GirlSpriteProps> = ({
  emotion = 'happy',
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
    <div className={`relative inline-block select-none pixel-art animate-idle-bob-delayed ${sizeMap[size]} ${className}`}>
      <svg
        viewBox="0 0 48 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_4px_6px_rgba(244,114,182,0.25)]"
        shapeRendering="crispEdges"
      >
        {/* Shadow on ground */}
        <ellipse cx="24" cy="70" rx="14" ry="2.5" fill="#be185d" fillOpacity="0.2" />

        {/* Back Hair - Long flowing wavy hair */}
        <rect x="12" y="10" width="24" height="28" fill="#4a2511" />
        <rect x="10" y="14" width="28" height="22" fill="#4a2511" />
        <rect x="9" y="18" width="30" height="24" fill="#381c0c" />
        <rect x="8" y="24" width="32" height="18" fill="#381c0c" />

        {/* Head / Skin base */}
        <rect x="16" y="14" width="16" height="16" fill="#fff0e6" />
        <rect x="14" y="16" width="20" height="12" fill="#fff0e6" />

        {/* Hair - Bangs & Side curls */}
        <rect x="13" y="8" width="22" height="6" fill="#5c2e17" />
        <rect x="15" y="6" width="18" height="4" fill="#6e391d" />
        {/* Cute hair highlight */}
        <rect x="17" y="8" width="5" height="2" fill="#9c542a" />
        <rect x="26" y="8" width="6" height="2" fill="#9c542a" />
        {/* Soft parted front fringe */}
        <rect x="14" y="12" width="5" height="6" fill="#5c2e17" />
        <rect x="29" y="12" width="5" height="6" fill="#5c2e17" />
        <rect x="19" y="12" width="4" height="4" fill="#5c2e17" />
        <rect x="25" y="12" width="4" height="4" fill="#5c2e17" />

        {/* Sweet Star/Flower Hairpin on left */}
        <rect x="12" y="12" width="4" height="4" fill="#f43f5e" />
        <rect x="13" y="11" width="2" height="6" fill="#fb7185" />
        <rect x="11" y="13" width="6" height="2" fill="#fb7185" />
        <rect x="13" y="13" width="2" height="2" fill="#fef08a" />

        {/* Eyes based on emotion */}
        {emotion === 'love' ? (
          /* Heart eyes */
          <>
            <path d="M18 20 C18 19, 19 18, 20 19 C21 18, 22 19, 22 20 C22 21, 20 22, 20 22 C20 22, 18 21, 18 20 Z" fill="#f43f5e" />
            <path d="M26 20 C26 19, 27 18, 28 19 C29 18, 30 19, 30 20 C30 21, 28 22, 28 22 C28 22, 26 21, 26 20 Z" fill="#f43f5e" />
          </>
        ) : emotion === 'laugh' ? (
          /* Winking cheerful eyes */
          <>
            {/* Winking left eye */}
            <path d="M17 21 Q19 19 21 21" stroke="#381c0c" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Open sparkling right eye */}
            <rect x="26" y="19" width="4" height="4" fill="#381c0c" />
            <rect x="27" y="19" width="1.5" height="2" fill="#ffffff" />
            <rect x="28" y="21" width="1" height="1" fill="#ffffff" />
          </>
        ) : (
          /* Large sparkling kawaii anime eyes with blink */
          <g className="animate-blink">
            {/* Left Eye */}
            <rect x="17" y="19" width="4" height="4" fill="#381c0c" />
            <rect x="17.5" y="19" width="1.5" height="2" fill="#ffffff" />
            <rect x="19.5" y="21" width="1" height="1" fill="#ffffff" />
            {/* Right Eye */}
            <rect x="27" y="19" width="4" height="4" fill="#381c0c" />
            <rect x="27.5" y="19" width="1.5" height="2" fill="#ffffff" />
            <rect x="29.5" y="21" width="1" height="1" fill="#ffffff" />
          </g>
        )}

        {/* Rosy glowing cheeks */}
        <rect x="15" y="23" width="4" height="2" fill="#f472b6" fillOpacity="0.8" />
        <rect x="29" y="23" width="4" height="2" fill="#f472b6" fillOpacity="0.8" />

        {/* Smile / Mouth */}
        {emotion === 'laugh' || emotion === 'happy' || emotion === 'love' ? (
          <path d="M21 25 Q24 28.5 27 25" stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round" fill="#fda4af" />
        ) : (
          <path d="M22 25 Q24 27 26 25" stroke="#e11d48" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        )}

        {/* Neck */}
        <rect x="22" y="28" width="4" height="3" fill="#ffe0cc" />

        {/* Ruffled White Inner Collar */}
        <rect x="20" y="31" width="8" height="3" fill="#ffffff" />
        <rect x="23" y="32" width="2" height="2" fill="#f43f5e" />

        {/* Stylish Pastel Pink Knit Cardigan */}
        <rect x="14" y="32" width="20" height="16" fill="#f472b6" />
        <rect x="13" y="34" width="22" height="12" fill="#f472b6" />
        {/* Cardigan buttons & cream trim */}
        <rect x="23" y="34" width="2" height="12" fill="#fdf2f8" />
        <circle cx="24" cy="37" r="0.75" fill="#f43f5e" />
        <circle cx="24" cy="41" r="0.75" fill="#f43f5e" />

        {/* Sleeves & Hands */}
        <rect x="11" y="33" width="4" height="12" fill="#f472b6" />
        <rect x="33" y="33" width="4" height="12" fill="#f472b6" />
        {/* Cuffs & Hands */}
        <rect x="11" y="45" width="4" height="1.5" fill="#fdf2f8" />
        <rect x="33" y="45" width="4" height="1.5" fill="#fdf2f8" />
        <rect x="11" y="46.5" width="4" height="2" fill="#fff0e6" />
        <rect x="33" y="46.5" width="4" height="2" fill="#fff0e6" />

        {/* Pleated Cream / Pastel Lavender Skirt */}
        <rect x="15" y="48" width="18" height="8" fill="#e9d5ff" />
        <rect x="14" y="52" width="20" height="4" fill="#d8b4fe" />
        {/* Pleat shadows */}
        <rect x="17" y="48" width="1.5" height="8" fill="#c084fc" />
        <rect x="21" y="48" width="1.5" height="8" fill="#c084fc" />
        <rect x="25.5" y="48" width="1.5" height="8" fill="#c084fc" />
        <rect x="29.5" y="48" width="1.5" height="8" fill="#c084fc" />

        {/* Legs with cute pastel knee socks */}
        <rect x="17" y="56" width="5" height="8" fill="#fff0e6" />
        <rect x="26" y="56" width="5" height="8" fill="#fff0e6" />
        {/* White ruffle socks */}
        <rect x="16.5" y="60" width="6" height="4" fill="#ffffff" />
        <rect x="25.5" y="60" width="6" height="4" fill="#ffffff" />

        {/* Cute Pastel Mary-Jane Shoes */}
        <rect x="15" y="64" width="7.5" height="4.5" fill="#fb7185" />
        <rect x="15" y="66.5" width="8" height="2" fill="#e11d48" />
        <rect x="25.5" y="64" width="7.5" height="4.5" fill="#fb7185" />
        <rect x="25" y="66.5" width="8" height="2" fill="#e11d48" />
      </svg>
    </div>
  );
};
