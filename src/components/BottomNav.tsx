import React from 'react';
import { useApp } from '../context/AppContext';
import { LayoutDashboard, PlusCircle, Package, Award, Building2 } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { screen, navigateTo, setUserRole } = useApp();

  // Only show bottom nav if we are not on landing page or role select
  if (screen === 'landing' || screen === 'role_select') {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#E8F1EA] px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around">
        <button
          onClick={() => {
            setUserRole('collector');
            navigateTo('collector_dashboard');
          }}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
            screen === 'collector_dashboard' ? 'text-[#174B36] font-bold' : 'text-gray-500'
          }`}
        >
          <LayoutDashboard className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => {
            setUserRole('collector');
            navigateTo('lot_details');
          }}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
            screen === 'lot_details' || screen === 'recycler_matching' || screen === 'quote_details'
              ? 'text-[#174B36] font-bold'
              : 'text-gray-500'
          }`}
        >
          <Package className="w-5 h-5 mb-0.5" />
          <span>Active Lot</span>
        </button>

        {/* Central Prominent Create Button */}
        <button
          onClick={() => {
            setUserRole('collector');
            navigateTo('create_lot');
          }}
          className="flex flex-col items-center -mt-5"
        >
          <div className="w-12 h-12 rounded-full bg-[#174B36] hover:bg-[#246B4B] text-white flex items-center justify-center shadow-md border-2 border-white">
            <PlusCircle className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold text-[#174B36] mt-0.5">+ New Lot</span>
        </button>

        <button
          onClick={() => navigateTo('lot_passport')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
            screen === 'lot_passport' || screen === 'handover_confirmation'
              ? 'text-[#174B36] font-bold'
              : 'text-gray-500'
          }`}
        >
          <Award className="w-5 h-5 mb-0.5" />
          <span>Passport</span>
        </button>

        <button
          onClick={() => {
            setUserRole('recycler');
            navigateTo('recycler_dashboard');
          }}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
            screen === 'recycler_dashboard' ? 'text-[#174B36] font-bold' : 'text-gray-500'
          }`}
        >
          <Building2 className="w-5 h-5 mb-0.5" />
          <span>Recycler</span>
        </button>
      </div>
    </div>
  );
};
