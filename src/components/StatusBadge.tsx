import React from 'react';
import { LotStatus } from '../types';
import { CheckCircle2, Clock, Search, Truck, FileCheck2, Recycle } from 'lucide-react';

interface StatusBadgeProps {
  status: LotStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-semibold'
  };

  switch (status) {
    case 'created':
      return (
        <span className={`inline-flex items-center rounded-full bg-slate-100 text-slate-800 border border-slate-200 ${sizeClasses[size]}`}>
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          <span>Lot Registered</span>
        </span>
      );
    case 'matching':
      return (
        <span className={`inline-flex items-center rounded-full bg-amber-50 text-amber-800 border border-amber-200 ${sizeClasses[size]}`}>
          <Search className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
          <span>Awaiting Recycler</span>
        </span>
      );
    case 'quote_received':
      return (
        <span className={`inline-flex items-center rounded-full bg-blue-50 text-blue-800 border border-blue-200 ${sizeClasses[size]}`}>
          <Clock className="w-3.5 h-3.5 text-blue-600" />
          <span>Quotes Available</span>
        </span>
      );
    case 'quote_accepted':
    case 'handover_scheduled':
      return (
        <span className={`inline-flex items-center rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 ${sizeClasses[size]}`}>
          <Truck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Handover Scheduled</span>
        </span>
      );
    case 'handover_completed':
      return (
        <span className={`inline-flex items-center rounded-full bg-[#E8F1EA] text-[#174B36] border border-[#246B4B]/30 ${sizeClasses[size]}`}>
          <CheckCircle2 className="w-3.5 h-3.5 text-[#246B4B]" />
          <span>Completed</span>
        </span>
      );
    case 'recycled':
      return (
        <span className={`inline-flex items-center rounded-full bg-teal-50 text-teal-800 border border-teal-200 ${sizeClasses[size]}`}>
          <Recycle className="w-3.5 h-3.5 text-teal-600" />
          <span>Recycled & Verified</span>
        </span>
      );
    default:
      return (
        <span className={`inline-flex items-center rounded-full bg-gray-100 text-gray-700 ${sizeClasses[size]}`}>
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>{status}</span>
        </span>
      );
  }
};
