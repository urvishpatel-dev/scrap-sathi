import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  ShieldCheck, 
  MapPin, 
  Star, 
  Truck, 
  ArrowRight, 
  Info, 
  Building2, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';

export const RecyclerMatchingPage: React.FC = () => {
  const { selectedLot, navigateTo, setSelectedQuoteId } = useApp();

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

  const quotes = selectedLot.quotes || [];

  const handleSelectQuote = (quoteId: string) => {
    setSelectedQuoteId(quoteId);
    navigateTo('quote_details', { quoteId });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      {/* Back button */}
      <button
        onClick={() => navigateTo('lot_details', { lotId: selectedLot.id })}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-white px-3 py-1.5 rounded-lg border border-gray-200"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Lot #{selectedLot.id}</span>
      </button>

      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
            Authorized Recycler Matches
          </h1>
          <span className="text-xs bg-[#E8F1EA] text-[#174B36] font-bold px-2.5 py-1 rounded-full">
            {quotes.length} Verified Bids
          </span>
        </div>
        <p className="text-sm text-[#6B7280] mt-1">
          Showing licensed recycling partners matched for <strong className="text-gray-900">{selectedLot.weightKg} kg {selectedLot.materialDisplay}</strong> in {selectedLot.location}.
        </p>
      </div>

      {/* Demo Disclaimer Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Prototype Simulation:</strong>
          <span className="ml-1">
            Recycler profiles, authorization IDs, and quote rates shown below are realistic demo datasets modeled for Ahmedabad industrial zones.
          </span>
        </div>
      </div>

      {/* Recycler Cards List */}
      <div className="grid grid-cols-1 gap-4">
        {quotes.map((q, idx) => {
          const isTopMatch = idx === 0;
          return (
            <div
              key={q.id}
              className={`bg-white rounded-2xl p-5 sm:p-6 border transition-all ${
                isTopMatch
                  ? 'border-[#174B36] shadow-md ring-1 ring-[#174B36]/20'
                  : 'border-[#D1E3D5] hover:border-gray-400 hover:shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Left: Recycler Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-extrabold text-lg text-gray-900">
                      {q.recyclerName}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      Authorized Recycler
                    </span>
                    {isTopMatch && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#174B36] bg-[#E8F1EA] px-2 py-0.5 rounded-full">
                        <Sparkles className="w-3 h-3 text-[#246B4B]" />
                        Highest Bid
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      {q.recyclerLocation}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-gray-400" />
                      {q.pickupType}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-amber-600 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      4.9 Rating
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 bg-[#F3F7F2] px-3 py-1.5 rounded-lg border border-[#E8F1EA]">
                    {q.notes}
                  </p>
                </div>

                {/* Right: Quote Price & Action */}
                <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 shrink-0">
                  <div className="text-left sm:text-right">
                    <div className="flex items-baseline gap-1 sm:justify-end">
                      <span className="text-xl sm:text-2xl font-extrabold text-[#174B36]">
                        ₹{q.pricePerKg}
                      </span>
                      <span className="text-xs text-gray-500 font-semibold">/ kg</span>
                    </div>

                    <div className="text-xs text-gray-500 mt-0.5">
                      Est. Total: <strong className="text-gray-900 font-bold">₹{q.estimatedTotal.toLocaleString('en-IN')}</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectQuote(q.id)}
                    className="mt-3 bg-[#174B36] hover:bg-[#246B4B] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
                  >
                    <span>View Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
