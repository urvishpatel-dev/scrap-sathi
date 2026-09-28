import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Recycle, 
  User, 
  Building2, 
  RotateCcw, 
  Languages, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    screen, 
    navigateTo, 
    userRole, 
    setUserRole, 
    language, 
    toggleLanguage, 
    resetDemo 
  } = useApp();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E8F1EA] shadow-xs">
      {/* Top SIH Prototype Banner */}
      <div className="bg-[#174B36] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-[#246B4B] text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase text-white">
              SIH 2026 Prototype
            </span>
            <span className="hidden sm:inline text-white/90">
              Kabadiwala Connect — Informal into Formal Recycling Chain
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={resetDemo}
              title="Reset Demo State"
              className="flex items-center gap-1 text-[11px] text-white/80 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Data</span>
            </button>
            <span className="text-white/40">|</span>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-[11px] font-medium bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded transition-all text-white"
            >
              <Languages className="w-3 h-3" />
              <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => navigateTo('landing')}
          className="flex items-center gap-2.5 group text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-[#174B36] flex items-center justify-center text-white shadow-sm group-hover:bg-[#246B4B] transition-colors">
            <Recycle className="w-6 h-6 text-[#A9C7B1]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-[#174B36]">
                Scrap<span className="text-[#246B4B]">Saathi</span>
              </span>
              <span className="text-[10px] bg-[#E8F1EA] text-[#174B36] font-bold px-1.5 py-0.2 rounded-full">
                स्क्रैपसाथी
              </span>
            </div>
            <p className="text-[11px] text-[#6B7280] -mt-0.5 hidden sm:block">
              Fair Value • Verified Recyclers • Transparent Journey
            </p>
          </div>
        </button>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => navigateTo('landing')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              screen === 'landing' ? 'bg-[#E8F1EA] text-[#174B36]' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => {
              setUserRole('collector');
              navigateTo('collector_dashboard');
            }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              screen === 'collector_dashboard' || screen === 'create_lot' || screen === 'lot_details' || screen === 'recycler_matching' || screen === 'quote_details' || screen === 'handover_confirmation'
                ? 'bg-[#E8F1EA] text-[#174B36] font-semibold'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Collector Portal
          </button>
          <button
            onClick={() => {
              setUserRole('recycler');
              navigateTo('recycler_dashboard');
            }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              screen === 'recycler_dashboard'
                ? 'bg-[#E8F1EA] text-[#174B36] font-semibold'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Recycler Portal
          </button>
          <button
            onClick={() => navigateTo('lot_passport')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
              screen === 'lot_passport'
                ? 'bg-[#E8F1EA] text-[#174B36] font-semibold'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#246B4B]" />
            <span>Lot Passport</span>
          </button>
        </nav>

        {/* Right Action / Role Switcher */}
        <div className="flex items-center gap-2.5">
          {screen === 'landing' ? (
            <button
              onClick={() => navigateTo('role_select')}
              className="flex items-center gap-2 bg-[#174B36] hover:bg-[#246B4B] text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-sm shadow-[#174B36]/20"
            >
              <span>Launch Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (userRole === 'collector') {
                    setUserRole('recycler');
                    navigateTo('recycler_dashboard');
                  } else {
                    setUserRole('collector');
                    navigateTo('collector_dashboard');
                  }
                }}
                className="flex items-center gap-2 bg-[#F3F7F2] hover:bg-[#E8F1EA] border border-[#D1E3D5] text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors text-[#174B36]"
                title="Switch Demo Role"
              >
                {userRole === 'collector' ? (
                  <>
                    <Building2 className="w-3.5 h-3.5 text-[#246B4B]" />
                    <span className="hidden sm:inline">Switch to:</span> Recycler
                  </>
                ) : (
                  <>
                    <User className="w-3.5 h-3.5 text-[#246B4B]" />
                    <span className="hidden sm:inline">Switch to:</span> Collector
                  </>
                )}
              </button>

              <button
                onClick={() => navigateTo('role_select')}
                className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg text-xs"
                title="Switch Account"
              >
                <User className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
