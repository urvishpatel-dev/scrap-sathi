import React, { ReactNode } from 'react';

interface EditorialCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const EditorialCard: React.FC<EditorialCardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-[24px] p-6 sm:p-[30px] border border-[#e5e5e5] shadow-editorial transition-all duration-300 ${
        hoverable ? 'hover:shadow-editorial-hover hover:border-[#a3fda7] cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
