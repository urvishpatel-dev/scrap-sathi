import React from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/StatusBadge';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Scale, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  FileText, 
  QrCode 
} from 'lucide-react';

export const LotDetailsPage: React.FC = () => {
  const { selectedLot, navigateTo, lots, setSelectedLotId } = useApp();

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

  // Stepper timeline definition
  const timelineStages = [
    { id: 'created', label: 'Lot Created', sub: 'Weighed & Cataloged' },
    { id: 'identified', label: 'Material Identified', sub: 'AI Vision Assessed' },
    { id: 'matching', label: 'Recycler Matched', sub: 'Authorized Partners' },
    { id: 'quote', label: 'Quote Received', sub: 'Competitive Bids' },
    { id: 'handover', label: 'Handover', sub: 'Weighed & Paid' },
    { id: 'recycled', label: 'Recycled', sub: 'Circular Feedstock' }
  ];

  // Helper to determine stage active/completed
  const getStageStatus = (stageId: string) => {
    const s = selectedLot.status;
    if (s === 'handover_completed' || s === 'recycled') return 'completed';
    if (s === 'quote_accepted' || s === 'handover_scheduled') {
      if (['created', 'identified', 'matching', 'quote'].includes(stageId)) return 'completed';
      if (stageId === 'handover') return 'active';
      return 'pending';
    }
    if (s === 'quote_received' || s === 'matching') {
      if (['created', 'identified'].includes(stageId)) return 'completed';
      if (['matching', 'quote'].includes(stageId)) return 'active';
      return 'pending';
    }
    return stageId === 'created' ? 'active' : 'pending';
  };

  const isCompleted = selectedLot.status === 'handover_completed' || selectedLot.status === 'recycled';
  const hasAcceptedQuote = selectedLot.status === 'quote_accepted' || selectedLot.status === 'handover_scheduled';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('collector_dashboard')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-white px-3 py-1.5 rounded-lg border border-gray-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>

        {/* Quick Lot Selector dropdown */}
        <select
          value={selectedLot.id}
          onChange={(e) => setSelectedLotId(e.target.value)}
          className="text-xs bg-white border border-gray-200 rounded-lg px-2.5 py-1 text-gray-700 outline-none font-medium"
        >
          {lots.map(l => (
            <option key={l.id} value={l.id}>
              {l.id} - {l.materialDisplay} ({l.weightKg} kg)
            </option>
          ))}
        </select>
      </div>

      {/* Main Lot Summary Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D1E3D5] shadow-sm">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Photo Showcase */}
          <div className="w-full md:w-56 h-56 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0 relative group">
            <img
              src={selectedLot.photoUrl}
              alt={selectedLot.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2">
              <span className="bg-[#174B36]/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                Verified Batch
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-extrabold text-[#174B36] bg-[#E8F1EA] px-2.5 py-1 rounded-md">
                  {selectedLot.id}
                </span>
                <StatusBadge status={selectedLot.status} />
              </div>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {selectedLot.createdAt}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
              {selectedLot.materialDisplay}
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({selectedLot.materialDisplayHindi})
              </span>
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 py-1">
              <span className="flex items-center gap-1 font-semibold text-gray-900 bg-gray-100 px-2.5 py-1 rounded-md">
                <Scale className="w-3.5 h-3.5 text-gray-500" />
                {selectedLot.weightKg} kg Declared Weight
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                {selectedLot.location}
              </span>
            </div>

            {selectedLot.notes && (
              <p className="text-xs text-gray-600 italic bg-[#F3F7F2] p-2.5 rounded-xl border border-[#E8F1EA]">
                "{selectedLot.notes}"
              </p>
            )}

            {/* Estimated / Final Valuation Box */}
            <div className="pt-2 flex items-baseline justify-between border-t border-gray-100">
              <div>
                <span className="text-xs text-gray-500 uppercase font-semibold block">
                  {isCompleted ? 'Final Settlement Paid' : 'Estimated Value Range'}
                </span>
                <span className="text-2xl font-extrabold text-[#174B36]">
                  {isCompleted 
                    ? `₹${selectedLot.finalValue?.toLocaleString('en-IN') || '3,276'}`
                    : `₹${(selectedLot.estimatedMinVal || 3000).toLocaleString('en-IN')} – ₹${(selectedLot.estimatedMaxVal || 3500).toLocaleString('en-IN')}`
                  }
                </span>
              </div>

              {/* Action button conditional on status */}
              {isCompleted ? (
                <button
                  onClick={() => navigateTo('lot_passport')}
                  className="flex items-center gap-2 bg-[#174B36] hover:bg-[#246B4B] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm"
                >
                  <QrCode className="w-4 h-4" />
                  <span>View Lot Passport</span>
                </button>
              ) : hasAcceptedQuote ? (
                <button
                  onClick={() => navigateTo('handover_confirmation', { lotId: selectedLot.id })}
                  className="flex items-center gap-2 bg-[#174B36] hover:bg-[#246B4B] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm"
                >
                  <Truck className="w-4 h-4" />
                  <span>View Handover Details</span>
                </button>
              ) : (
                <button
                  onClick={() => navigateTo('recycler_matching', { lotId: selectedLot.id })}
                  className="flex items-center gap-2 bg-[#174B36] hover:bg-[#246B4B] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm"
                >
                  <span>View Recycler Matches ({selectedLot.quotes?.length || 0})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* AI Material Identification Insights Card */}
      {selectedLot.aiAnalysis && (
        <div className="bg-[#E8F1EA] rounded-2xl p-5 border border-[#246B4B]/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#246B4B]" />
              <h2 className="font-bold text-sm text-[#174B36]">
                AI Material Verification Report
              </h2>
            </div>
            <span className="text-[11px] font-bold bg-white text-[#174B36] px-2.5 py-0.5 rounded-full border border-[#D1E3D5]">
              Confidence Score: {selectedLot.aiAnalysis.confidence}%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-white/80 p-3 rounded-xl border border-[#D1E3D5]/50">
              <span className="text-gray-500 block">Classified Category:</span>
              <span className="font-bold text-gray-900 mt-0.5 block">
                {selectedLot.aiAnalysis.detectedCategory}
              </span>
            </div>

            <div className="bg-white/80 p-3 rounded-xl border border-[#D1E3D5]/50">
              <span className="text-gray-500 block">Industrial Grade:</span>
              <span className="font-bold text-gray-900 mt-0.5 block">
                {selectedLot.aiAnalysis.suggestedGrade}
              </span>
            </div>

            <div className="bg-white/80 p-3 rounded-xl border border-[#D1E3D5]/50">
              <span className="text-gray-500 block">Identified Elements:</span>
              <span className="font-semibold text-gray-800 mt-0.5 block truncate">
                {selectedLot.aiAnalysis.subMaterials.join(', ')}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Visual Journey Timeline */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D1E3D5] shadow-xs">
        <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-6">
          Lot Recycling Journey (प्रक्रिया चरण)
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 relative">
          {timelineStages.map((stage, idx) => {
            const st = getStageStatus(stage.id);
            return (
              <div key={stage.id} className="text-center group">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 text-xs font-bold transition-all ${
                    st === 'completed'
                      ? 'bg-[#174B36] text-white shadow-xs'
                      : st === 'active'
                      ? 'bg-[#246B4B] text-white ring-4 ring-[#E8F1EA]'
                      : 'bg-gray-100 text-gray-400 border border-gray-200'
                  }`}
                >
                  {st === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5 text-[#A9C7B1]" />
                  ) : (
                    idx + 1
                  )}
                </div>
                <h4 className="text-xs font-bold text-gray-900 leading-snug">
                  {stage.label}
                </h4>
                <p className="text-[10px] text-gray-500 mt-0.5">{stage.sub}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
