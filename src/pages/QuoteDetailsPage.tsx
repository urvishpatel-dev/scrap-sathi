import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  Truck, 
  Calendar, 
  Scale, 
  Coins, 
  ArrowRight, 
  Building2, 
  Info, 
  FileCheck2 
} from 'lucide-react';

export const QuoteDetailsPage: React.FC = () => {
  const { selectedLot, selectedQuote, acceptQuote, navigateTo } = useApp();
  const [accepted, setAccepted] = useState(
    selectedLot?.status === 'quote_accepted' || selectedLot?.status === 'handover_scheduled'
  );

  if (!selectedLot || !selectedQuote) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">No quote selected.</p>
        <button
          onClick={() => navigateTo('collector_dashboard')}
          className="mt-4 text-sm font-bold text-[#174B36]"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const handleAccept = () => {
    acceptQuote(selectedQuote.id);
    setAccepted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      {/* Back button */}
      <button
        onClick={() => navigateTo('recycler_matching', { lotId: selectedLot.id })}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-white px-3 py-1.5 rounded-lg border border-gray-200"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Recycler Matches</span>
      </button>

      {/* Quote Accepted Banner if already accepted */}
      {accepted && (
        <div className="bg-[#E8F1EA] border border-[#246B4B]/30 rounded-2xl p-5 text-center space-y-3 animate-in zoom-in-95 duration-200">
          <div className="w-12 h-12 rounded-full bg-[#174B36] text-white flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7 text-[#A9C7B1]" />
          </div>
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#246B4B]">
              Quote Accepted
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#111827] mt-1">
              Handover Scheduled
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              {selectedQuote.recyclerName}'s collection vehicle is scheduled for weighment.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigateTo('handover_confirmation', { lotId: selectedLot.id })}
              className="bg-[#174B36] hover:bg-[#246B4B] text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Proceed to Handover Confirmation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Quote Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D1E3D5] shadow-md space-y-6">
        <div className="flex items-start justify-between gap-4 border-b border-[#E8F1EA] pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-[#174B36] bg-[#E8F1EA] px-2 py-0.5 rounded">
                Official Digital Quote #{selectedQuote.id}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Verified
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#111827]">
              {selectedQuote.recyclerName}
            </h1>
            <p className="text-xs text-[#6B7280] mt-0.5">
              {selectedQuote.recyclerLocation}
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-gray-500 uppercase font-semibold block">
              Offered Rate
            </span>
            <span className="text-3xl font-extrabold text-[#174B36]">
              ₹{selectedQuote.pricePerKg}
            </span>
            <span className="text-xs text-gray-500 font-medium">/ kg</span>
          </div>
        </div>

        {/* Calculation breakdown */}
        <div className="bg-[#F3F7F2] p-5 rounded-2xl border border-[#D1E3D5] space-y-3">
          <div className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Valuation Breakdown (भाव विवरण)
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Material Category:</span>
            <span className="font-bold text-gray-900">{selectedLot.materialDisplay} ({selectedLot.materialDisplayHindi})</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Declared Weight:</span>
            <span className="font-bold text-gray-900">{selectedLot.weightKg} kg</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Offered Unit Rate:</span>
            <span className="font-bold text-gray-900">₹{selectedQuote.pricePerKg} per kg</span>
          </div>

          <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#174B36] uppercase tracking-wider block">
                Estimated Total (कुल अनुमानित राशि)
              </span>
              <span className="text-xs text-gray-500">
                {selectedLot.weightKg} kg × ₹{selectedQuote.pricePerKg}/kg
              </span>
            </div>
            <span className="text-2xl font-extrabold text-[#174B36]">
              ₹{selectedQuote.estimatedTotal.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Logistics & Handover terms */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
            <div className="flex items-center gap-2 font-bold text-gray-800 mb-1">
              <Truck className="w-4 h-4 text-[#246B4B]" />
              <span>Logistics Mode</span>
            </div>
            <p className="text-gray-600">{selectedQuote.pickupType} (Free doorstep collection)</p>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
            <div className="flex items-center gap-2 font-bold text-gray-800 mb-1">
              <Calendar className="w-4 h-4 text-[#246B4B]" />
              <span>Expected Handover</span>
            </div>
            <p className="text-gray-600">{selectedQuote.pickupDate}</p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 flex items-center gap-2.5 text-xs text-emerald-900">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Payment is protected via digital escrow or instant on-spot UPI upon calibrated electronic weighment.</span>
        </div>

        {/* Action Buttons */}
        {!accepted ? (
          <div className="pt-2 flex items-center justify-between gap-4">
            <button
              onClick={() => navigateTo('recycler_matching', { lotId: selectedLot.id })}
              className="text-xs font-semibold text-gray-600 hover:text-gray-900 px-4 py-3 rounded-xl border border-gray-200"
            >
              Back to Other Matches
            </button>

            <button
              onClick={handleAccept}
              className="flex-1 bg-[#174B36] hover:bg-[#246B4B] text-white font-extrabold text-sm sm:text-base py-3.5 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Accept Quote (भाव स्वीकार करें)</span>
              <CheckCircle2 className="w-5 h-5 text-[#A9C7B1]" />
            </button>
          </div>
        ) : (
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => navigateTo('handover_confirmation', { lotId: selectedLot.id })}
              className="bg-[#174B36] hover:bg-[#246B4B] text-white font-bold text-sm px-6 py-3 rounded-xl transition-all flex items-center gap-2"
            >
              <span>View Handover Confirmation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
