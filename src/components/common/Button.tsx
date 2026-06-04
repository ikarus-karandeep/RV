import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors rounded-[12px] uppercase tracking-[1.2px]';
  
  const variants = {
    primary: 'bg-[#1a1c1c] text-white hover:bg-black',
    secondary: 'bg-white text-black border border-[#e2e8f0] hover:bg-gray-50',
    outline: 'bg-transparent border border-[#111] text-[#111] hover:bg-gray-100',
    ghost: 'bg-transparent text-[#6b7280] hover:bg-gray-100',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-[25px] py-[15px] text-[14px]',
    lg: 'px-[25px] py-[30px] text-[14px] h-[87px]',
    xl: 'px-8 py-6 text-lg',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
