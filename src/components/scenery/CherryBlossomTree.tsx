import React from 'react';

export const CherryBlossomTree: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative pointer-events-none select-none pixel-art ${className}`}>
      <svg
        viewBox="0 0 240 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(244,114,182,0.3)]"
        shapeRendering="crispEdges"
      >
        {/* Soft shadow on ground */}
        <ellipse cx="120" cy="254" rx="70" ry="6" fill="#be185d" fillOpacity="0.15" />

        {/* Tree Trunk Base & Roots */}
        <rect x="108" y="210" width="24" height="42" fill="#582f1b" />
        <rect x="100" y="235" width="40" height="18" fill="#432212" />
        <rect x="92" y="246" width="56" height="8" fill="#31170b" />
        <rect x="88" y="250" width="64" height="4" fill="#31170b" />

        {/* Tree Trunk Highlights & Bark Texture */}
        <rect x="112" y="200" width="6" height="45" fill="#713f28" />
        <rect x="126" y="205" width="4" height="35" fill="#432212" />

        {/* Major Trunk Bifurcations */}
        {/* Main upper trunk */}
        <rect x="106" y="150" width="28" height="60" fill="#582f1b" />
        <rect x="110" y="152" width="6" height="48" fill="#713f28" />

        {/* Left main branch spreading outwards */}
        <rect x="74" y="132" width="36" height="24" fill="#582f1b" />
        <rect x="50" y="118" width="32" height="18" fill="#582f1b" />
        <rect x="34" y="106" width="22" height="14" fill="#432212" />
        <rect x="22" y="94" width="16" height="12" fill="#432212" />

        {/* Right main branch spreading outwards */}
        <rect x="130" y="132" width="40" height="24" fill="#582f1b" />
        <rect x="162" y="116" width="34" height="18" fill="#582f1b" />
        <rect x="188" y="104" width="26" height="14" fill="#432212" />
        <rect x="206" y="92" width="18" height="12" fill="#432212" />

        {/* Top central branches */}
        <rect x="112" y="110" width="16" height="42" fill="#582f1b" />
        <rect x="96" y="88" width="18" height="26" fill="#432212" />
        <rect x="126" y="88" width="18" height="26" fill="#432212" />

        {/* Layer 1: Deep Rose/Crimson Foliage Under-shadows */}
        <g fill="#e11d48" fillOpacity="0.85">
          {/* Left clusters */}
          <rect x="16" y="70" width="56" height="44" rx="4" />
          <rect x="10" y="85" width="64" height="36" rx="4" />
          {/* Center clusters */}
          <rect x="75" y="45" width="90" height="65" rx="4" />
          <rect x="65" y="65" width="110" height="50" rx="4" />
          {/* Right clusters */}
          <rect x="160" y="65" width="65" height="45" rx="4" />
          <rect x="175" y="80" width="55" height="35" rx="4" />
        </g>

        {/* Layer 2: Lush Pastel Pink Mid-Tones */}
        <g fill="#f472b6">
          {/* Left canopy */}
          <rect x="20" y="60" width="52" height="44" rx="4" />
          <rect x="14" y="75" width="60" height="35" rx="4" />
          <rect x="30" y="48" width="44" height="24" rx="4" />
          {/* Top Center canopy */}
          <rect x="80" y="32" width="80" height="60" rx="4" />
          <rect x="70" y="55" width="100" height="45" rx="4" />
          <rect x="95" y="20" width="50" height="30" rx="4" />
          {/* Right canopy */}
          <rect x="155" y="55" width="65" height="45" rx="4" />
          <rect x="165" y="70" width="60" height="35" rx="4" />
          <rect x="160" y="42" width="48" height="24" rx="4" />
        </g>

        {/* Layer 3: Soft Cream-Pink Highlights */}
        <g fill="#fbcfe8">
          <rect x="28" y="52" width="36" height="20" rx="2" />
          <rect x="88" y="24" width="64" height="26" rx="2" />
          <rect x="100" y="14" width="40" height="16" rx="2" />
          <rect x="166" y="46" width="38" height="20" rx="2" />
          <rect x="44" y="68" width="22" height="12" rx="2" />
          <rect x="135" y="50" width="28" height="14" rx="2" />
        </g>

        {/* Layer 4: Shimmering White Blossom Tops */}
        <g fill="#fff1f2">
          <rect x="98" y="16" width="20" height="8" rx="2" />
          <rect x="124" y="20" width="16" height="6" rx="2" />
          <rect x="36" y="52" width="16" height="6" rx="2" />
          <rect x="175" y="46" width="18" height="6" rx="2" />
        </g>

        {/* Cute Romantic Lantern 1 (Hanging from left branch) */}
        <g className="filter drop-shadow-[0_0_8px_#fde047]">
          {/* String */}
          <line x1="58" y1="126" x2="58" y2="138" stroke="#31170b" strokeWidth="1.5" />
          {/* Cap */}
          <rect x="54" y="138" width="8" height="2" fill="#be185d" />
          {/* Glowing lantern body */}
          <rect x="53" y="140" width="10" height="12" rx="2" fill="#fef08a" />
          <rect x="55" y="142" width="6" height="8" fill="#ffffff" />
          {/* Tassel */}
          <rect x="57" y="152" width="2" height="4" fill="#ec4899" />
        </g>

        {/* Cute Romantic Lantern 2 (Hanging from right branch) */}
        <g className="filter drop-shadow-[0_0_8px_#fde047]">
          {/* String */}
          <line x1="184" y1="124" x2="184" y2="136" stroke="#31170b" strokeWidth="1.5" />
          {/* Cap */}
          <rect x="180" y="136" width="8" height="2" fill="#be185d" />
          {/* Glowing lantern body */}
          <rect x="179" y="138" width="10" height="12" rx="2" fill="#fef08a" />
          <rect x="181" y="140" width="6" height="8" fill="#ffffff" />
          {/* Tassel */}
          <rect x="183" y="150" width="2" height="4" fill="#ec4899" />
        </g>
      </svg>
    </div>
  );
};
