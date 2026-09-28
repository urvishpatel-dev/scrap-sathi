import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  ShieldCheck, 
  MapPin, 
  Package, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Send, 
  ArrowRight, 
  Scale, 
  FileCheck, 
  X,
  Sparkles
} from 'lucide-react';

interface RecommendedLot {
  id: string;
  material: string;
  weightKg: number;
  location: string;
  suggestedRate: number;
  collectorName: string;
  imgUrl: string;
}

const RECOMMENDED_LOTS: RecommendedLot[] = [
  {
    id: 'LOT-2026-0928',
    material: 'Mixed E-Waste',
    weightKg: 42,
    location: 'Ahmedabad, Gujarat',
    suggestedRate: 78,
    collectorName: 'Ramesh Kumar',
    imgUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'LOT-2026-0929',
    material: 'Segregated PET & HDPE Plastics',
    weightKg: 85,
    location: 'Ahmedabad, Gujarat',
    suggestedRate: 32,
    collectorName: 'Suresh Parmar',
    imgUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'LOT-2026-0930',
    material: 'Non-Ferrous Heavy Metal Scrap',
    weightKg: 120,
    location: 'Sector 24, Gandhinagar',
    suggestedRate: 95,
    collectorName: 'Pravin Vaghela',
    imgUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80'
  }
];

export const RecyclerDashboard: React.FC = () => {
  const { navigateTo, sendRecyclerQuote } = useApp();

  // Quote modal state
  const [modalLot, setModalLot] = useState<RecommendedLot | null>(null);
  const [quotePrice, setQuotePrice] = useState<number>(78);
  const [pickupOption, setPickupOption] = useState<'Recycler Pickup' | 'Self Drop-off'>('Recycler Pickup');

  const handleOpenQuoteModal = (lot: RecommendedLot) => {
    setModalLot(lot);
    setQuotePrice(lot.suggestedRate);
  };

  const handleSendQuoteSubmit = () => {
    if (!modalLot) return;
    sendRecyclerQuote(modalLot.id, quotePrice, pickupOption);
    setModalLot(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* Recycler Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#D1E3D5] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#246B4B] text-white flex items-center justify-center font-bold text-xl sm:text-2xl shadow-sm shrink-0">
            GC
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#111827]">
                GreenCycle Recycling Solutions
              </h1>
              <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                GPCB Reg: HAZ/2024-9982
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#6B7280] mt-1.5 flex-wrap">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                Naroda Industrial Area, Ahmedabad
              </span>
              <span>•</span>
              <span className="text-[#246B4B] font-semibold">
                Authorized Waste Processing & Smelting Hub
              </span>
            </div>
          </div>
        </div>

        {/* Quick status pill */}
        <div className="bg-[#E8F1EA] px-4 py-2 rounded-2xl border border-[#246B4B]/20 text-xs text-[#174B36]">
          <span className="font-bold">EPR Compliance: </span>
          <span>100% Audit Verified</span>
        </div>
      </div>

      {/* Recycler Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <div className="bg-white p-5 rounded-2xl border border-[#D1E3D5] shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Available Lots
            </span>
            <Package className="w-4 h-4 text-[#246B4B]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
            12
          </div>
          <span className="text-[11px] text-[#246B4B] font-medium mt-1 inline-block">
            In Ahmedabad & Gandhinagar
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#D1E3D5] shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Pending Quotes
            </span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-600">
            4
          </div>
          <span className="text-[11px] text-amber-700 font-medium mt-1 inline-block">
            Awaiting collector confirmation
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#D1E3D5] shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Accepted Lots
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#174B36]">
            8
          </div>
          <span className="text-[11px] text-emerald-700 font-medium mt-1 inline-block">
            Dispatched for EV collection
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#D1E3D5] shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Completed
            </span>
            <TrendingUp className="w-4 h-4 text-gray-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            126
          </div>
          <span className="text-[11px] text-gray-500 font-medium mt-1 inline-block">
            Certified lots processed
          </span>
        </div>
      </div>

      {/* Recommended Scrap Lots Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#111827]">
              Recommended Scrap Lots
            </h2>
            <p className="text-xs text-[#6B7280]">
              Verified feedstocks ready for bidding in your authorized radius
            </p>
          </div>
          <span className="text-xs text-gray-500">
            Automated AI Quality Categorized
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {RECOMMENDED_LOTS.map(lot => (
            <div
              key={lot.id}
              className="bg-white rounded-2xl p-5 border border-[#D1E3D5] hover:border-[#174B36] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-100 mb-3 border border-gray-200">
                  <img
                    src={lot.imgUrl}
                    alt={lot.material}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="bg-[#174B36] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {lot.id}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-gray-900">
                    {lot.material}
                  </h3>
                  <span className="text-xs font-extrabold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
                    {lot.weightKg} kg
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>{lot.location}</span>
                </div>

                <div className="mt-2 text-xs text-gray-600">
                  Collector: <strong className="text-gray-800">{lot.collectorName}</strong>
                </div>

                <div className="mt-3 p-2.5 rounded-xl bg-[#F3F7F2] border border-[#E8F1EA] flex items-center justify-between">
                  <span className="text-xs text-gray-600">Suggested Quote:</span>
                  <span className="text-sm font-extrabold text-[#174B36]">
                    ₹{lot.suggestedRate}/kg (~₹{(lot.suggestedRate * lot.weightKg).toLocaleString('en-IN')})
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 mt-5 pt-3 border-t border-gray-100">
                <button
                  onClick={() => navigateTo('lot_details', { lotId: lot.id })}
                  className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 text-xs font-semibold py-2 px-3 rounded-xl transition-all"
                >
                  View Lot
                </button>
                <button
                  onClick={() => handleOpenQuoteModal(lot)}
                  className="bg-[#174B36] hover:bg-[#246B4B] text-white text-xs font-bold py-2 px-3 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1"
                >
                  <Send className="w-3 h-3" />
                  <span>Send Quote</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Send Quote Modal */}
      {modalLot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-[#D1E3D5] shadow-2xl relative">
            <button
              onClick={() => setModalLot(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#E8F1EA] text-[#174B36] flex items-center justify-center">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Send Recycler Quote
                </h3>
                <span className="text-xs text-gray-500 font-mono">
                  {modalLot.id} • {modalLot.material} ({modalLot.weightKg} kg)
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Your Bid Price per Kilogram (₹/kg)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={quotePrice}
                    onChange={(e) => setQuotePrice(Number(e.target.value))}
                    className="w-full text-xl font-bold text-[#174B36] bg-[#F3F7F2] border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#174B36] outline-none"
                  />
                  <span className="text-sm font-semibold text-gray-600 shrink-0">₹ / kg</span>
                </div>
              </div>

              <div className="bg-[#E8F1EA] p-3 rounded-xl border border-[#246B4B]/30 flex items-center justify-between text-xs">
                <span className="text-gray-600">Total Payout to Collector:</span>
                <span className="text-base font-extrabold text-[#174B36]">
                  ₹{(quotePrice * modalLot.weightKg).toLocaleString('en-IN')}
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Fulfillment Logistics
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPickupOption('Recycler Pickup')}
                    className={`py-2 px-3 rounded-xl border font-semibold ${
                      pickupOption === 'Recycler Pickup'
                        ? 'bg-[#174B36] text-white border-[#174B36]'
                        : 'bg-white text-gray-700 border-gray-200'
                    }`}
                  >
                    Our EV Van Pickup
                  </button>
                  <button
                    type="button"
                    onClick={() => setPickupOption('Self Drop-off')}
                    className={`py-2 px-3 rounded-xl border font-semibold ${
                      pickupOption === 'Self Drop-off'
                        ? 'bg-[#174B36] text-white border-[#174B36]'
                        : 'bg-white text-gray-700 border-gray-200'
                    }`}
                  >
                    Facility Drop-off
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                onClick={() => setModalLot(null)}
                className="text-xs font-semibold text-gray-600 hover:text-gray-800 px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSendQuoteSubmit}
                className="bg-[#174B36] hover:bg-[#246B4B] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Official Quote</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
