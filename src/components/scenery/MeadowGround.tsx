import React from 'react';

export const MeadowGround: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none select-none overflow-hidden pixel-art z-0">
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-full"
        shapeRendering="crispEdges"
      >
        {/* Deep Soil / Root Layer */}
        <rect x="0" y="80" width="1200" height="40" fill="#4a2840" />
        <rect x="0" y="55" width="1200" height="25" fill="#365314" />

        {/* Foreground Meadow Grass Layers */}
        <rect x="0" y="30" width="1200" height="30" fill="#4d7c0f" />
        <rect x="0" y="15" width="1200" height="20" fill="#65a30d" />
        <rect x="0" y="5" width="1200" height="15" fill="#84cc16" />

        {/* Pixel Grass Tufts across the ground */}
        {Array.from({ length: 48 }).map((_, i) => {
          const x = i * 25 + 5;
          const y = (i % 3) * 6 + 4;
          return (
            <g key={i}>
              <rect x={x} y={y} width="3" height="8" fill="#a3e635" />
              <rect x={x + 3} y={y - 2} width="3" height="10" fill="#bef264" />
              <rect x={x + 6} y={y + 1} width="3" height="7" fill="#a3e635" />
            </g>
          );
        })}

        {/* Adorable Pixel Wild Flowers (Daisies, Pink Tulips, Lavender) */}
        {Array.from({ length: 22 }).map((_, i) => {
          const x = i * 55 + 15;
          const y = 8 + (i % 4) * 8;
          const isPink = i % 2 === 0;
          return (
            <g key={`flower-${i}`} className="filter drop-shadow-sm">
              {/* Stem */}
              <rect x={x + 3} y={y + 5} width="2" height="12" fill="#4d7c0f" />
              <rect x={x + 5} y={y + 9} width="3" height="2" fill="#65a30d" />

              {/* Petals */}
              {isPink ? (
                <>
                  <rect x={x} y={y + 1} width="8" height="4" fill="#f472b6" rx="1" />
                  <rect x={x + 2} y={y - 1} width="4" height="8" fill="#f472b6" rx="1" />
                  <circle cx={x + 4} cy={y + 3} r="1.5" fill="#fef08a" />
                </>
              ) : (
                <>
                  <rect x={x} y={y + 1} width="8" height="4" fill="#ffffff" rx="1" />
                  <rect x={x + 2} y={y - 1} width="4" height="8" fill="#ffffff" rx="1" />
                  <circle cx={x + 4} cy={y + 3} r="1.5" fill="#facc15" />
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
