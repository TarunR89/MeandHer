import React from 'react';

export const PixelSky: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* Warm Sunset / Dusk Pink & Lavender Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#ffd3e2] via-[#fed7aa] to-[#fbcfe8] opacity-90" />

      {/* Retro Pixel Clouds Layer 1 (Slow drifting high clouds) */}
      <div className="absolute top-6 left-0 w-[200%] h-24 flex gap-32 animate-[marquee_45s_linear_infinite] opacity-75 pixel-art">
        <CloudSVG variant="large" />
        <CloudSVG variant="small" />
        <CloudSVG variant="medium" />
        <CloudSVG variant="large" />
        <CloudSVG variant="small" />
      </div>

      {/* Retro Pixel Clouds Layer 2 (Faster lower clouds) */}
      <div className="absolute top-20 left-0 w-[200%] h-20 flex gap-40 animate-[marquee_30s_linear_infinite] opacity-60 pixel-art">
        <CloudSVG variant="medium" />
        <CloudSVG variant="large" />
        <CloudSVG variant="small" />
        <CloudSVG variant="medium" />
      </div>

      {/* Twinkling Pixel Stars */}
      <div className="absolute inset-0">
        {[
          { x: '12%', y: '10%', delay: '0s', size: 6 },
          { x: '28%', y: '16%', delay: '1.2s', size: 4 },
          { x: '45%', y: '8%', delay: '0.5s', size: 8 },
          { x: '68%', y: '14%', delay: '1.8s', size: 5 },
          { x: '82%', y: '9%', delay: '0.8s', size: 6 },
          { x: '92%', y: '22%', delay: '1.5s', size: 4 },
          { x: '35%', y: '24%', delay: '2.1s', size: 5 },
          { x: '55%', y: '20%', delay: '0.3s', size: 6 },
          { x: '75%', y: '28%', delay: '1.0s', size: 4 },
        ].map((star, i) => (
          <div
            key={i}
            style={{
              left: star.x,
              top: star.y,
              animationDelay: star.delay,
              width: `${star.size}px`,
              height: `${star.size}px`
            }}
            className="absolute animate-pulse pixel-art"
          >
            <svg viewBox="0 0 8 8" className="w-full h-full" shapeRendering="crispEdges">
              <rect x="3" y="1" width="2" height="6" fill="#fffef0" />
              <rect x="1" y="3" width="6" height="2" fill="#fffef0" />
              <rect x="3" y="3" width="2" height="2" fill="#ffffff" />
            </svg>
          </div>
        ))}
      </div>

      {/* Distant Layered Lavender Hills */}
      <div className="absolute bottom-24 left-0 right-0 h-48 opacity-40 pixel-art">
        <svg viewBox="0 0 1200 240" preserveAspectRatio="none" className="w-full h-full" shapeRendering="crispEdges">
          {/* Back distant mountain range */}
          <path
            d="M0 160 Q180 80 350 140 T700 110 T1050 150 Q1150 130 1200 145 L1200 240 L0 240 Z"
            fill="#c084fc"
          />
        </svg>
      </div>

      {/* Midground Lavender & Peach Hills */}
      <div className="absolute bottom-16 left-0 right-0 h-40 opacity-55 pixel-art">
        <svg viewBox="0 0 1200 200" preserveAspectRatio="none" className="w-full h-full" shapeRendering="crispEdges">
          <path
            d="M0 130 Q150 70 320 110 T680 80 T1020 120 Q1120 100 1200 115 L1200 200 L0 200 Z"
            fill="#d8b4fe"
          />
        </svg>
      </div>
    </div>
  );
};

// Helper SVG for cute pixel clouds
const CloudSVG: React.FC<{ variant: 'small' | 'medium' | 'large' }> = ({ variant }) => {
  if (variant === 'small') {
    return (
      <svg width="64" height="28" viewBox="0 0 32 14" fill="none" shapeRendering="crispEdges">
        <rect x="8" y="2" width="16" height="10" fill="#ffffff" fillOpacity="0.85" />
        <rect x="4" y="5" width="24" height="7" fill="#ffffff" fillOpacity="0.85" />
        <rect x="2" y="7" width="28" height="5" fill="#ffffff" fillOpacity="0.85" />
        <rect x="10" y="0" width="10" height="4" fill="#ffffff" fillOpacity="0.9" />
      </svg>
    );
  }
  if (variant === 'medium') {
    return (
      <svg width="96" height="36" viewBox="0 0 48 18" fill="none" shapeRendering="crispEdges">
        <rect x="12" y="4" width="24" height="12" fill="#ffffff" fillOpacity="0.85" />
        <rect x="6" y="7" width="36" height="9" fill="#ffffff" fillOpacity="0.85" />
        <rect x="2" y="10" width="44" height="6" fill="#ffffff" fillOpacity="0.85" />
        <rect x="16" y="2" width="14" height="5" fill="#ffffff" fillOpacity="0.95" />
      </svg>
    );
  }
  return (
    <svg width="130" height="46" viewBox="0 0 65 23" fill="none" shapeRendering="crispEdges">
      <rect x="15" y="5" width="35" height="15" fill="#ffffff" fillOpacity="0.9" />
      <rect x="8" y="9" width="48" height="11" fill="#ffffff" fillOpacity="0.9" />
      <rect x="2" y="13" width="60" height="7" fill="#ffffff" fillOpacity="0.9" />
      <rect x="20" y="2" width="20" height="6" fill="#ffffff" fillOpacity="0.95" />
      <rect x="36" y="4" width="14" height="6" fill="#ffffff" fillOpacity="0.95" />
    </svg>
  );
};
