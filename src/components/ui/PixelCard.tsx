import React from 'react';

interface PixelCardProps {
  children: React.ReactNode;
  variant?: 'kawaii' | 'pixel' | 'dialogue';
  className?: string;
  glow?: boolean;
}

export const PixelCard: React.FC<PixelCardProps> = ({
  children,
  variant = 'kawaii',
  className = '',
  glow = false
}) => {
  if (variant === 'pixel') {
    return (
      <div
        className={`pixel-art pixel-box bg-white/95 rounded-2xl p-5 ${
          glow ? 'shadow-[0_0_20px_rgba(244,114,182,0.4)]' : ''
        } ${className}`}
      >
        {children}
      </div>
    );
  }

  if (variant === 'dialogue') {
    return (
      <div
        className={`relative pixel-box bg-[#fffdfa] rounded-3xl p-6 border-4 border-[#3b1d32] shadow-[6px_6px_0px_#3b1d32] ${
          glow ? 'shadow-[0_0_25px_rgba(236,72,153,0.35)]' : ''
        } ${className}`}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={`kawaii-card p-6 border border-pink-200/60 ${
        glow ? 'shadow-[0_12px_32px_rgba(244,114,182,0.35)]' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
