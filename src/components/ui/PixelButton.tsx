import React from 'react';
import { soundManager } from '../audio/SoundManager';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'pink' | 'purple' | 'cream' | 'mint' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const PixelButton: React.FC<PixelButtonProps> = ({
  variant = 'pink',
  size = 'md',
  children,
  icon,
  className = '',
  onClick,
  ...props
}) => {
  const variantStyles = {
    pink: 'bg-[#f472b6] text-white hover:bg-[#ec4899] active:bg-[#db2777]',
    purple: 'bg-[#a855f7] text-white hover:bg-[#9333ea] active:bg-[#7e22ce]',
    cream: 'bg-[#fffbeb] text-[#4a2840] hover:bg-[#fef3c7] active:bg-[#fde68a]',
    mint: 'bg-[#34d399] text-white hover:bg-[#10b981] active:bg-[#059669]',
    outline: 'bg-white/90 text-[#4a2840] hover:bg-white active:bg-pink-50'
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs font-semibold',
    md: 'px-5 py-2.5 text-sm font-bold',
    lg: 'px-7 py-3.5 text-base font-bold'
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundManager.playClick();
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        inline-flex items-center justify-center gap-2
        pixel-art pixel-btn-action cursor-pointer select-none rounded-xl
        focus:outline-none focus:ring-4 focus:ring-pink-400/50
        transition-all duration-75
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
