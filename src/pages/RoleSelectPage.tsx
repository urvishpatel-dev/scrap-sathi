import React from 'react';
import { useApp } from '../context/AppContext';
import { User, Building2, ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { DEMO_COLLECTOR } from '../data/mockData';

export const RoleSelectPage: React.FC = () => {
  const { navigateTo, setUserRole, userRole } = useApp();

  const handleSelectRole = (role: 'collector' | 'recycler') => {
    setUserRole(role);
    if (role === 'collector') {
      navigateTo('collector_dashboard');
    } else {
      navigateTo('recycler_dashboard');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 bg-[#F3F7F2]">
      <div className="max-w-2xl w-full bg-white rounded-3xl border border-[#D1E3D5] shadow-xl p-6 sm:p-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 bg-[#E8F1EA] text-[#174B36] px-3 py-1 rounded-full text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#246B4B]" />
            <span>Interactive SIH Demo Simulation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
            Welcome to ScrapSaathi
          </h1>
          <p className="text-sm text-[#6B7280] mt-1.5">
            Select your persona to enter the live prototype demonstration
          </p>
        </div>

        {/* Two large options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
          {/* Collector Card */}
          <div
            onClick={() => handleSelectRole('collector')}
            className={`group relative p-6 rounded-2xl border-2 transition-all cursor-pointer text-left flex flex-col justify-between ${
              userRole === 'collector'
                ? 'border-[#174B36] bg-[#E8F1EA]/60 shadow-md ring-2 ring-[#246B4B]/20'
                : 'border-gray-200 hover:border-[#174B36] bg-white hover:bg-[#F3F7F2]'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#174B36] text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <User className="w-6 h-6 text-[#A9C7B1]" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-[#111827]">COLLECTOR</span>
                <span className="text-[11px] bg-white px-2 py-0.5 rounded-full border border-gray-200 text-gray-700 font-semibold">
                  कबाड़ीवाला
                </span>
              </div>
              <p className="text-xs text-[#246B4B] font-medium mt-0.5">
                Demo User: {DEMO_COLLECTOR.name} ({DEMO_COLLECTOR.nameHindi})
              </p>
              <p className="text-sm text-[#6B7280] mt-3 leading-relaxed">
                Sell and manage scrap lots, get AI material grade estimates, and receive high-value bids directly from authorized recyclers.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#174B36]">
              <span>Enter Collector Hub</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Recycler Card */}
          <div
            onClick={() => handleSelectRole('recycler')}
            className={`group relative p-6 rounded-2xl border-2 transition-all cursor-pointer text-left flex flex-col justify-between ${
              userRole === 'recycler'
                ? 'border-[#174B36] bg-[#E8F1EA]/60 shadow-md ring-2 ring-[#246B4B]/20'
                : 'border-gray-200 hover:border-[#174B36] bg-white hover:bg-[#F3F7F2]'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#246B4B] text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-[#111827]">RECYCLER</span>
                <span className="text-[11px] bg-white px-2 py-0.5 rounded-full border border-gray-200 text-gray-700 font-semibold">
                  पुनर्चक्रणकर्ता
                </span>
              </div>
              <p className="text-xs text-[#246B4B] font-medium mt-0.5">
                Demo Facility: GreenCycle Solutions
              </p>
              <p className="text-sm text-[#6B7280] mt-3 leading-relaxed">
                Discover and source recyclable material, send competitive bids to local micro-collectors, and download digital Lot Passports for compliance.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#174B36]">
              <span>Enter Recycler Hub</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="bg-[#F3F7F2] p-4 rounded-xl border border-[#D1E3D5] flex items-center justify-between text-xs text-[#6B7280]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#246B4B] shrink-0" />
            <span>Pre-authenticated demo mode. No mobile OTP or password required for evaluation.</span>
          </div>
          <button
            onClick={() => handleSelectRole('collector')}
            className="text-[#174B36] font-bold hover:underline shrink-0 ml-2"
          >
            Continue as Collector →
          </button>
        </div>
      </div>
    </div>
  );
};
