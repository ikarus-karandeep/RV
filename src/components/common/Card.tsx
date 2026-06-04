import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  selected,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-[12px] bg-white transition-all box-border border-2
        ${onClick ? 'cursor-pointer' : ''}
        ${
          selected
            ? 'bg-[rgba(239,244,255,0.3)] border-[#111827]'
            : 'border-transparent shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.08)]'
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
};
