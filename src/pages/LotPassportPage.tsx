import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  QrCode, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Printer, 
  Share2, 
  ArrowLeft, 
  Leaf, 
  Building2, 
  User, 
  Scale, 
  Clock, 
  Download, 
  ExternalLink,
  Award
} from 'lucide-react';

export const LotPassportPage: React.FC = () => {
  const { passportData, navigateTo, showToast } = useApp();

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Lot Passport link copied to clipboard!', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      {/* Top action bar */}
      <div className="flex items-center justify-between no-print">
        <button
          onClick={() => navigateTo('collector_dashboard')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-white px-3 py-1.5 rounded-lg border border-gray-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 text-xs font-semibold text-white bg-[#174B36] hover:bg-[#246B4B] px-3.5 py-1.5 rounded-lg shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Passport</span>
          </button>
        </div>
      </div>

      {/* Main Lot Passport Document */}
      <div className="bg-white rounded-3xl border-2 border-[#174B36] shadow-xl overflow-hidden relative">
        {/* Top Watermark Pattern & Header */}
        <div className="bg-[#174B36] text-white p-6 sm:p-8 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#246B4B] text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded tracking-widest border border-white/20">
                  Prototype Lot Passport
                </span>
                <span className="text-xs text-[#A9C7B1] font-mono">
                  {passportData.passportNumber}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                LOT PASSPORT
              </h1>
              <p className="text-xs text-white/80 mt-1 max-w-lg">
                Digital record for transparent scrap movement & verified chain-of-custody
              </p>
            </div>

            {/* QR Code Block */}
            <div className="bg-white p-3 rounded-2xl text-center shadow-lg border border-white/30 shrink-0 self-center sm:self-auto">
              {/* High fidelity SVG QR representation */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#F3F7F2] p-1.5 rounded-xl border border-gray-200 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div className="w-6 h-6 bg-[#174B36] rounded-xs flex items-center justify-center p-1">
                    <div className="w-2 h-2 bg-white" />
                  </div>
                  <div className="w-4 h-1 bg-[#174B36]" />
                  <div className="w-6 h-6 bg-[#174B36] rounded-xs flex items-center justify-center p-1">
                    <div className="w-2 h-2 bg-white" />
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1">
                  <div className="w-2 h-2 bg-[#246B4B]" />
                  <QrCode className="w-6 h-6 text-[#174B36]" />
                  <div className="w-2 h-2 bg-[#246B4B]" />
                </div>

                <div className="flex justify-between items-end">
                  <div className="w-6 h-6 bg-[#174B36] rounded-xs flex items-center justify-center p-1">
                    <div className="w-2 h-2 bg-white" />
                  </div>
                  <div className="w-3 h-1 bg-[#174B36]" />
                  <div className="w-2 h-2 bg-[#174B36]" />
                </div>
              </div>
              <span className="text-[9px] font-mono font-bold text-gray-700 block mt-1">
                SCAN TO VERIFY
              </span>
            </div>
          </div>
        </div>

        {/* Core Attributes Grid */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#F3F7F2] p-5 rounded-2xl border border-[#D1E3D5]">
            <div>
              <span className="text-[11px] text-gray-500 uppercase font-semibold block">
                Material
              </span>
              <span className="text-sm sm:text-base font-extrabold text-[#111827] mt-0.5 block">
                {passportData.material}
              </span>
            </div>

            <div>
              <span className="text-[11px] text-gray-500 uppercase font-semibold block">
                Weight
              </span>
              <span className="text-sm sm:text-base font-extrabold text-[#111827] mt-0.5 block">
                {passportData.weightKg} kg
              </span>
            </div>

            <div>
              <span className="text-[11px] text-gray-500 uppercase font-semibold block">
                Origin
              </span>
              <span className="text-sm sm:text-base font-extrabold text-[#111827] mt-0.5 block">
                {passportData.origin}
              </span>
            </div>

            <div>
              <span className="text-[11px] text-gray-500 uppercase font-semibold block">
                Handover Date
              </span>
              <span className="text-sm sm:text-base font-extrabold text-[#111827] mt-0.5 block">
                {passportData.handoverDate}
              </span>
            </div>

            <div>
              <span className="text-[11px] text-gray-500 uppercase font-semibold block">
                Collector
              </span>
              <span className="text-xs sm:text-sm font-bold text-gray-800 mt-0.5 block">
                {passportData.collectorName}
              </span>
            </div>

            <div>
              <span className="text-[11px] text-gray-500 uppercase font-semibold block">
                Authorized Recycler
              </span>
              <span className="text-xs sm:text-sm font-bold text-gray-800 mt-0.5 block">
                {passportData.recyclerName}
              </span>
            </div>

            <div>
              <span className="text-[11px] text-gray-500 uppercase font-semibold block">
                Recycler GPCB Reg.
              </span>
              <span className="text-xs font-mono text-gray-700 mt-0.5 block">
                {passportData.recyclerRegNo}
              </span>
            </div>

            <div>
              <span className="text-[11px] text-gray-500 uppercase font-semibold block">
                Settled Value
              </span>
              <span className="text-sm sm:text-base font-extrabold text-[#174B36] mt-0.5 block">
                ₹{passportData.finalAmount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Environmental Impact Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#E8F1EA] p-4 rounded-2xl border border-[#246B4B]/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#174B36] text-white flex items-center justify-center shrink-0">
                <Leaf className="w-5 h-5 text-[#A9C7B1]" />
              </div>
              <div>
                <span className="text-xs text-gray-600 block">Carbon Emission Avoided</span>
                <span className="text-lg font-extrabold text-[#174B36]">
                  ~{passportData.co2SavedKg} kg CO₂e
                </span>
              </div>
            </div>

            <div className="bg-[#E8F1EA] p-4 rounded-2xl border border-[#246B4B]/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#246B4B] text-white flex items-center justify-center shrink-0">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xs text-gray-600 block">Diverted from Landfill</span>
                <span className="text-lg font-extrabold text-[#174B36]">
                  100% ({passportData.landfillDivertedKg} kg Segregated)
                </span>
              </div>
            </div>
          </div>

          {/* Cryptographic Timeline & Audit Trail */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-800">
                Chain-of-Custody Timeline
              </h3>
              <span className="text-[11px] text-gray-500">
                Audited Digital Ledger
              </span>
            </div>

            <div className="space-y-3">
              {passportData.timeline.map((item, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${
                    item.completed
                      ? 'bg-white border-[#D1E3D5]'
                      : 'bg-gray-50/60 border-dashed border-gray-300 opacity-75'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        item.completed
                          ? 'bg-[#174B36] text-white'
                          : 'border-2 border-gray-300 text-gray-400'
                      }`}
                    >
                      {item.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-[#A9C7B1]" />
                      ) : (
                        <Clock className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 block">
                        {item.stage}
                        <span className="font-normal text-gray-500 ml-1.5">
                          ({item.stageHindi})
                        </span>
                      </span>
                      <span className="text-[11px] text-gray-500">
                        {item.actor} • {item.timestamp}
                      </span>
                    </div>
                  </div>

                  <div className="text-right self-end sm:self-center font-mono text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-200">
                    {item.hash}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legal / Prototype Disclaimer Box */}
          <div className="border-t border-gray-200 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-gray-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#246B4B] shrink-0" />
              <span>
                Demonstration digital record. Prototype Lot Passport designed for SIH 2026.
              </span>
            </div>
            <span className="font-mono text-gray-400">
              SHA-256: e8b9...f402
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
