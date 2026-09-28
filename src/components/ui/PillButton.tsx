import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'forest';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export const PillButton: React.FC<PillButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'right',
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 select-none disabled:opacity-50 disabled:cursor-not-allowed group';

  const sizeClasses = {
    sm: 'text-xs px-4 py-2 rounded-full gap-1.5',
    md: 'text-sm sm:text-base px-6 py-3 rounded-full gap-2',
    lg: 'text-base sm:text-lg px-8 py-3.5 rounded-full gap-2.5'
  };

  const variantClasses = {
    primary: 'bg-[#a3fda7] text-[#000000] hover:bg-[#82ff87] active:bg-[#a3fda7] font-semibold shadow-pill',
    secondary: 'bg-[#000000] text-[#ffffff] hover:bg-[#2d3637] active:bg-[#000000] font-semibold shadow-pill',
    tertiary: 'bg-white border border-[#cccccc] text-[#2d3637] hover:bg-[#e9e7e2] active:bg-white font-medium',
    forest: 'bg-[#0d5b3b] text-[#ffffff] hover:bg-[#083a26] active:bg-[#0d5b3b] font-semibold shadow-pill'
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="shrink-0 group-hover:translate-x-0.5 transition-transform">{icon}</span>
      )}
    </button>
  );
};
