import React from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/StatusBadge';
import { DEMO_COLLECTOR } from '../data/mockData';
import { 
  Plus, 
  TrendingUp, 
  Package, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  Phone, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';

export const CollectorDashboard: React.FC = () => {
  const { lots, navigateTo, language } = useApp();

  const activeLots = lots.filter(l => l.status !== 'handover_completed' && l.status !== 'recycled');
  const completedLots = lots.filter(l => l.status === 'handover_completed' || l.status === 'recycled');

  const pendingQuotesCount = lots.reduce((acc, lot) => {
    return acc + (lot.quotes?.filter(q => q.status === 'pending').length || 0);
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* Collector Profile Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#D1E3D5] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#174B36] text-white flex items-center justify-center font-bold text-xl sm:text-2xl shadow-sm shrink-0">
            RK
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#111827]">
                {DEMO_COLLECTOR.name}
              </h1>
              <span className="text-xs bg-[#E8F1EA] text-[#174B36] font-bold px-2 py-0.5 rounded-full">
                {DEMO_COLLECTOR.nameHindi}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Verified Saathi
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs text-[#6B7280] mt-1.5 flex-wrap">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                {DEMO_COLLECTOR.location}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                {DEMO_COLLECTOR.phone}
              </span>
              <span className="text-gray-400">ID: {DEMO_COLLECTOR.id}</span>
            </div>
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          onClick={() => navigateTo('create_lot')}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#174B36] hover:bg-[#246B4B] text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-2xl shadow-md transition-all group shrink-0"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
          <span>+ Create Scrap Lot</span>
          <span className="text-xs font-normal opacity-80">(नया लॉट बनाएं)</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <div className="bg-white p-5 rounded-2xl border border-[#D1E3D5] shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Active Lots
            </span>
            <Package className="w-4 h-4 text-[#246B4B]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
            {activeLots.length}
          </div>
          <span className="text-[11px] text-[#246B4B] font-medium mt-1 inline-block">
            In negotiation & pickup
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#D1E3D5] shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Completed
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
            14
          </div>
          <span className="text-[11px] text-gray-500 font-medium mt-1 inline-block">
            Fully recycled batches
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#D1E3D5] shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Total Earnings
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#174B36]">
            ₹8,450
          </div>
          <span className="text-[11px] text-emerald-700 font-medium mt-1 inline-block">
            Direct UPI settlements
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
            {pendingQuotesCount || 2}
          </div>
          <span className="text-[11px] text-amber-700 font-medium mt-1 inline-block">
            Bids awaiting review
          </span>
        </div>
      </div>

      {/* Live Showcase / Active Banner */}
      <div className="bg-[#E8F1EA] border border-[#246B4B]/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#174B36] text-white flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#174B36]">
              Interactive SIH Showcase Lot: LOT-2026-0928
            </h2>
            <p className="text-xs text-gray-600 mt-0.5">
              42 kg Mixed E-Waste awaiting your recycler selection. Test the complete flow to Lot Passport.
            </p>
          </div>
        </div>
        <button
          onClick={() => navigateTo('lot_details', { lotId: 'LOT-2026-0928' })}
          className="bg-[#174B36] hover:bg-[#246B4B] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shrink-0"
        >
          View Showcase Journey →
        </button>
      </div>

      {/* Recent Scrap Lots Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#111827]">
              Recent Scrap Lots
            </h2>
            <p className="text-xs text-[#6B7280]">
              All registered batches, weight records, and recycler matches
            </p>
          </div>
          <span className="text-xs text-gray-500">
            Total {lots.length} records
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {lots.map(lot => {
            const hasAccepted = lot.status === 'quote_accepted' || lot.status === 'handover_scheduled';
            const isCompleted = lot.status === 'handover_completed' || lot.status === 'recycled';

            return (
              <div
                key={lot.id}
                onClick={() => navigateTo('lot_details', { lotId: lot.id })}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-[#D1E3D5] hover:border-[#174B36] hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-4">
                    {/* Thumbnail */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                      <img
                        src={lot.photoUrl}
                        alt={lot.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-[#174B36] bg-[#E8F1EA] px-2 py-0.5 rounded">
                          {lot.id}
                        </span>
                        <StatusBadge status={lot.status} size="sm" />
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mt-1">
                        {lot.materialDisplay}
                        <span className="text-xs font-normal text-gray-500 ml-2">
                          ({lot.materialDisplayHindi})
                        </span>
                      </h3>

                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-1 flex-wrap">
                        <span className="font-semibold text-gray-800 bg-gray-100 px-2 py-0.5 rounded">
                          {lot.weightKg} kg
                        </span>
                        <span>•</span>
                        <span>{lot.location}</span>
                        <span>•</span>
                        <span>{lot.createdAt}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Price & Action */}
                  <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                    <div className="text-left sm:text-right">
                      <span className="text-[11px] text-gray-500 block uppercase font-medium">
                        {isCompleted ? 'Final Value' : 'Estimated Value'}
                      </span>
                      <span className="text-base sm:text-lg font-extrabold text-[#174B36]">
                        {isCompleted 
                          ? `₹${lot.finalValue?.toLocaleString('en-IN') || '5,250'}` 
                          : `₹${(lot.estimatedMinVal || 3000).toLocaleString('en-IN')} – ₹${(lot.estimatedMaxVal || 3500).toLocaleString('en-IN')}`
                        }
                      </span>
                    </div>

                    <div className="mt-2 flex items-center gap-1 text-xs font-bold text-[#246B4B] group-hover:translate-x-0.5 transition-transform">
                      <span>{isCompleted ? 'View Passport' : 'View Details'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
