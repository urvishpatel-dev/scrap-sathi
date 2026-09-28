import React, { InputHTMLAttributes, forwardRef, ReactNode } from 'react';

interface PillInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

export const PillInput = forwardRef<HTMLInputElement, PillInputProps>(({
  label,
  error,
  icon,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-xs font-semibold text-[#2d3637] uppercase tracking-wider pl-4">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-4 text-[#838676] pointer-events-none">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`w-full bg-white border border-[#cccccc] text-[#2d3637] placeholder-[#838676] rounded-full text-sm sm:text-base py-3 focus:outline-none focus:ring-2 focus:ring-[#a3fda7] focus:border-[#0d5b3b] transition-all shadow-xs ${
            icon ? 'pl-11 pr-5' : 'px-5'
          } ${error ? 'border-red-400 focus:ring-red-200' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-600 pl-4">{error}</p>}
    </div>
  );
});

PillInput.displayName = 'PillInput';
