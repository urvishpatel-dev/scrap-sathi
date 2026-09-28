import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { notifications } = useApp();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {notifications.map(n => (
        <div
          key={n.id}
          className="pointer-events-auto flex items-center gap-3 bg-white border border-[#D1E3D5] text-[#111827] px-4 py-3 rounded-xl shadow-lg animate-in slide-in-from-top duration-200"
        >
          {n.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#246B4B] shrink-0" />}
          {n.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />}
          {n.type === 'info' && <Info className="w-5 h-5 text-blue-500 shrink-0" />}
          <p className="text-xs sm:text-sm font-medium leading-snug">{n.message}</p>
        </div>
      ))}
    </div>
  );
};
