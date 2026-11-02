import React, { useMemo } from 'react';

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  swayDistance: number;
}

export const FloatingPetals: React.FC<{ count?: number }> = ({ count = 24 }) => {
  const petals = useMemo<Petal[]>(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: (i * 37 + 13) % 100, // percentage
      size: 6 + ((i * 7) % 8), // pixels
      duration: 7 + ((i * 5) % 8), // seconds
      delay: (i * 0.7) % 8, // seconds
      swayDistance: 30 + ((i * 11) % 40)
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10">
      {petals.map(p => (
        <div
          key={p.id}
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 1.3}px`,
            animation: `petalFall ${p.duration}s linear infinite, petalSway ${p.duration * 0.4}s ease-in-out infinite alternate`,
            animationDelay: `${p.delay}s, ${p.delay * 0.5}s`,
            top: '-20px'
          }}
          className="absolute opacity-80 filter drop-shadow-[0_1px_2px_rgba(244,114,182,0.4)]"
        >
          <svg viewBox="0 0 12 16" className="w-full h-full" shapeRendering="geometricPrecision">
            <path
              d="M6 0 C10 4, 12 10, 6 16 C0 10, 2 4, 6 0 Z"
              fill="#fbcfe8"
              stroke="#f472b6"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      ))}
      <style>{`
        @keyframes petalFall {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(105vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
