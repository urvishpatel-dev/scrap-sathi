import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DEMO_COLLECTOR } from '../data/mockData';
import { 
  CheckCircle2, 
  Sparkles, 
  QrCode, 
  ArrowLeft, 
  Scale, 
  Truck, 
  ShieldCheck, 
  FileCheck2, 
  User, 
  Building2 
} from 'lucide-react';

export const HandoverConfirmationPage: React.FC = () => {
  const { selectedLot, selectedQuote, completeHandover, navigateTo } = useApp();

  const isAlreadyCompleted = selectedLot?.status === 'handover_completed' || selectedLot?.status === 'recycled';
  const [completed, setCompleted] = useState<boolean>(isAlreadyCompleted);

  if (!selectedLot) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">No lot selected.</p>
        <button
          onClick={() => navigateTo('collector_dashboard')}
          className="mt-4 text-sm font-bold text-[#174B36]"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const quote = selectedLot.acceptedQuote || selectedQuote || selectedLot.quotes?.[0];
  const finalAmount = quote?.estimatedTotal || 3276;
  const recyclerName = quote?.recyclerName || 'GreenCycle Recycling Solutions';

  const handleCompleteHandover = () => {
    completeHandover(selectedLot.id);
    setCompleted(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      {/* Top back button */}
      <button
        onClick={() => navigateTo('lot_details', { lotId: selectedLot.id })}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-white px-3 py-1.5 rounded-lg border border-gray-200"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Lot Details</span>
      </button>

      {/* Main Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D1E3D5] shadow-lg text-center space-y-6">
        {/* Status icon & indicator */}
        <div>
          <div className="w-16 h-16 rounded-full bg-[#E8F1EA] text-[#174B36] flex items-center justify-center mx-auto mb-3 border border-[#246B4B]/20">
            <CheckCircle2 className="w-9 h-9 text-[#246B4B]" />
          </div>

          <div className="inline-flex items-center gap-1.5 bg-[#E8F1EA] text-[#174B36] px-3.5 py-1 rounded-full text-xs font-bold mb-2">
            <ShieldCheck className="w-4 h-4 text-[#246B4B]" />
            <span>
              {completed ? '✓ Handover Completed' : 'Handover Verification in Progress'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
            {completed ? 'Physical Handover Confirmed' : 'Confirm Handover & Payment'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Official digital receipt for custody transfer between collector & authorized recycler
          </p>
        </div>

        {/* Structured Lot Receipt */}
        <div className="bg-[#F3F7F2] rounded-2xl p-5 border border-[#D1E3D5] text-left space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-200">
            <span className="text-xs font-mono font-bold text-[#174B36]">
              {selectedLot.id}
            </span>
            <span className="text-xs text-gray-500">28 Sep 2026, 10:00 AM</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-gray-500 block">Collector:</span>
              <span className="font-bold text-gray-900 flex items-center gap-1 mt-0.5">
                <User className="w-3.5 h-3.5 text-gray-400" />
                {DEMO_COLLECTOR.name}
              </span>
            </div>

            <div>
              <span className="text-gray-500 block">Recycler:</span>
              <span className="font-bold text-gray-900 flex items-center gap-1 mt-0.5 truncate">
                <Building2 className="w-3.5 h-3.5 text-gray-400" />
                {recyclerName}
              </span>
            </div>

            <div>
              <span className="text-gray-500 block">Material:</span>
              <span className="font-bold text-gray-900 mt-0.5">
                {selectedLot.materialDisplay}
              </span>
            </div>

            <div>
              <span className="text-gray-500 block">Verified Weight:</span>
              <span className="font-bold text-gray-900 mt-0.5">
                {selectedLot.weightKg} kg (Calibrated Scale)
              </span>
            </div>
          </div>

          {/* Amount Paid highlight */}
          <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-700 block uppercase tracking-wider">
                Settled Amount
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold">
                ✓ Transferred via Instant UPI
              </span>
            </div>
            <span className="text-2xl font-extrabold text-[#174B36]">
              ₹{finalAmount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Call to action depending on state */}
        <div className="pt-2">
          {!completed ? (
            <div className="space-y-3">
              <button
                onClick={handleCompleteHandover}
                className="w-full bg-[#174B36] hover:bg-[#246B4B] text-white font-extrabold text-sm sm:text-base py-3.5 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5 text-[#A9C7B1]" />
                <span>Confirm Physical Handover (कबाड़ सुपुर्दगी पुष्टि)</span>
              </button>
              <p className="text-[11px] text-gray-400">
                Click to simulate doorstep van weighment and instant electronic receipt generation.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <button
                onClick={() => navigateTo('lot_passport')}
                className="w-full bg-[#174B36] hover:bg-[#246B4B] text-white font-extrabold text-sm sm:text-base py-4 px-6 rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                <QrCode className="w-5 h-5 text-[#A9C7B1]" />
                <span>Generate Lot Passport</span>
                <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
              </button>
              <p className="text-[11px] text-gray-500">
                Creates the verifiable digital chain-of-custody passport for EPR compliance.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
