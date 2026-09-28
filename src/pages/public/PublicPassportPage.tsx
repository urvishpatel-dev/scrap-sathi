import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../api/client';
import { LotPassportPublic } from '../../types';
import { PillButton } from '../../components/ui/PillButton';
import { EditorialCard } from '../../components/ui/EditorialCard';
import { 
  QrCode, 
  ShieldCheck, 
  CheckCircle2, 
  Leaf, 
  Scale, 
  Printer, 
  Share2, 
  ArrowLeft, 
  Building2, 
  User, 
  Clock 
} from 'lucide-react';

export const PublicPassportPage: React.FC = () => {
  const { lotNumber } = useParams<{ lotNumber: string }>();
  const [passport, setPassport] = useState<LotPassportPublic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPassport = async () => {
      try {
        const idToFetch = lotNumber || 'LOT-2026-000184';
        const data = await api.getPublicPassport(idToFetch);
        setPassport(data);
      } catch (err: any) {
        setError(err.message || 'Passport not found');
      } finally {
        setLoading(false);
      }
    };

    fetchPassport();
  }, [lotNumber]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f2ffe3] flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-[#0d5b3b] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-serif text-lg text-[#083a26]">Resolving Digital Lot Passport...</p>
        </div>
      </div>
    );
  }

  if (error || !passport) {
    return (
      <div className="min-h-screen bg-[#f2ffe3] flex items-center justify-center p-6 text-center">
        <EditorialCard className="max-w-md">
          <h2 className="font-serif text-2xl text-[#083a26]">Passport Record Not Found</h2>
          <p className="text-xs text-[#526061] mt-2">
            The requested lot identity could not be verified in the public registry.
          </p>
          <div className="mt-6">
            <Link to="/">
              <PillButton variant="primary" size="sm">Return to ScrapSaathi Home</PillButton>
            </Link>
          </div>
        </EditorialCard>
      </div>
    );
  }

  return (
    <div className="bg-[#f2ffe3] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation / Actions */}
        <div className="flex items-center justify-between no-print">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#526061] hover:text-[#083a26]">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to ScrapSaathi</span>
          </Link>

          <div className="flex items-center gap-2">
            <PillButton
              variant="tertiary"
              size="sm"
              icon={<Share2 className="w-3.5 h-3.5" />}
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert('Public passport link copied to clipboard!');
              }}
            >
              Share
            </PillButton>
            <PillButton
              variant="forest"
              size="sm"
              icon={<Printer className="w-3.5 h-3.5" />}
              onClick={() => window.print()}
            >
              Print Certificate
            </PillButton>
          </div>
        </div>

        {/* The Master Visual Lot Passport */}
        <div className="bg-white rounded-[24px] border-2 border-[#0d5b3b] shadow-editorial overflow-hidden">
          {/* Header Banner */}
          <div className="bg-[#083a26] text-white p-6 sm:p-10 relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#a3fda7] text-[#000000] text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                    Verified Digital Lot Passport
                  </span>
                  <span className="text-xs text-[#82ff87] font-mono">
                    {passport.passportNumber}
                  </span>
                </div>
                <h1 className="font-serif font-light text-4xl sm:text-5xl tracking-tight text-white">
                  LOT PASSPORT
                </h1>
                <p className="text-xs text-white/80 mt-1 max-w-lg">
                  Public digital certificate for transparent scrap movement and verified chain-of-custody.
                </p>
              </div>

              {/* QR Code representation */}
              <div className="bg-white p-3 rounded-2xl text-center shadow-lg border border-white/20 shrink-0 self-center sm:self-auto">
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#f2ffe3] p-1.5 rounded-xl border border-gray-200 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div className="w-6 h-6 bg-[#083a26] rounded-xs flex items-center justify-center p-1">
                      <div className="w-2 h-2 bg-white" />
                    </div>
                    <div className="w-4 h-1 bg-[#083a26]" />
                    <div className="w-6 h-6 bg-[#083a26] rounded-xs flex items-center justify-center p-1">
                      <div className="w-2 h-2 bg-white" />
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <div className="w-2 h-2 bg-[#a3fda7]" />
                    <QrCode className="w-6 h-6 text-[#0d5b3b]" />
                    <div className="w-2 h-2 bg-[#a3fda7]" />
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="w-6 h-6 bg-[#083a26] rounded-xs flex items-center justify-center p-1">
                      <div className="w-2 h-2 bg-white" />
                    </div>
                    <div className="w-3 h-1 bg-[#083a26]" />
                    <div className="w-2 h-2 bg-[#083a26]" />
                  </div>
                </div>
                <span className="text-[9px] font-mono font-bold text-gray-700 block mt-1">
                  OFFICIAL VERIFICATION
                </span>
              </div>
            </div>
          </div>

          {/* Core Lot Data Grid */}
          <div className="p-6 sm:p-10 space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#f2ffe3] p-5 rounded-[20px] border border-[#cccccc]/40">
              <div>
                <span className="text-[11px] text-[#838676] uppercase font-bold block">
                  Material Stream
                </span>
                <span className="font-serif text-lg text-[#083a26] font-normal block mt-0.5">
                  {passport.material}
                </span>
              </div>

              <div>
                <span className="text-[11px] text-[#838676] uppercase font-bold block">
                  Calibrated Mass
                </span>
                <span className="font-serif text-lg text-[#083a26] font-normal block mt-0.5">
                  {passport.weightKg} kg
                </span>
              </div>

              <div>
                <span className="text-[11px] text-[#838676] uppercase font-bold block">
                  Origin City
                </span>
                <span className="font-serif text-lg text-[#083a26] font-normal block mt-0.5">
                  {passport.originCity}
                </span>
              </div>

              <div>
                <span className="text-[11px] text-[#838676] uppercase font-bold block">
                  Handover Status
                </span>
                <span className="text-xs font-bold text-[#0d5b3b] bg-white px-2.5 py-1 rounded-full border border-[#cccccc]/50 block mt-0.5 w-fit">
                  {passport.finalStatus}
                </span>
              </div>

              <div>
                <span className="text-[11px] text-[#838676] uppercase font-bold block">
                  Collector Identity
                </span>
                <span className="text-xs font-bold text-[#2d3637] block mt-0.5">
                  {passport.collectorPublicId}
                </span>
              </div>

              <div className="sm:col-span-2">
                <span className="text-[11px] text-[#838676] uppercase font-bold block">
                  Authorized Recycling Facility
                </span>
                <span className="text-xs font-bold text-[#2d3637] block mt-0.5">
                  {passport.recyclerPublicName} (GPCB Empanelled)
                </span>
              </div>

              <div>
                <span className="text-[11px] text-[#838676] uppercase font-bold block">
                  Handover Date
                </span>
                <span className="text-xs font-semibold text-[#2d3637] block mt-0.5">
                  {passport.handoverDate}
                </span>
              </div>
            </div>

            {/* Environmental Impact Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#f2ffe3] p-5 rounded-[20px] border border-[#0d5b3b]/30 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0d5b3b] text-white flex items-center justify-center shrink-0">
                  <Leaf className="w-6 h-6 text-[#a3fda7]" />
                </div>
                <div>
                  <span className="text-xs text-[#526061] block font-medium">Estimated Carbon Avoidance</span>
                  <span className="font-serif text-2xl font-normal text-[#083a26]">
                    ~{passport.co2SavedKg} kg CO₂e
                  </span>
                </div>
              </div>

              <div className="bg-[#f2ffe3] p-5 rounded-[20px] border border-[#0d5b3b]/30 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#083a26] text-white flex items-center justify-center shrink-0">
                  <Scale className="w-6 h-6 text-[#a3fda7]" />
                </div>
                <div>
                  <span className="text-xs text-[#526061] block font-medium">Landfill Diversion Rate</span>
                  <span className="font-serif text-2xl font-normal text-[#083a26]">
                    100% ({passport.landfillDivertedKg} kg Diverted)
                  </span>
                </div>
              </div>
            </div>

            {/* Immutable Chain-of-Custody Events */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl text-[#083a26]">
                  Chain-of-Custody Ledger
                </h3>
                <span className="text-[11px] font-mono text-[#838676]">
                  APPEND-ONLY AUDIT LOG
                </span>
              </div>

              <div className="space-y-3">
                {passport.events.map((evt, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-[#e5e5e5] bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#0d5b3b] text-white flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-[#a3fda7]" />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 block text-sm">
                          {evt.stage}
                        </span>
                        <span className="text-[11px] text-gray-500">
                          Actor: {evt.actorRole} • Recorded: {evt.timestamp}
                        </span>
                      </div>
                    </div>

                    <div className="font-mono text-[10px] text-gray-500 bg-[#f2ffe3] px-2.5 py-1 rounded-md border border-[#cccccc]/40 self-end sm:self-center">
                      HASH: {evt.hash}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Public Trust Notice */}
            <div className="border-t border-[#e5e5e5] pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-[#838676]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0d5b3b] shrink-0" />
                <span>
                  Prototype Lot Passport. Designed for Smart India Hackathon (SIH 2026).
                </span>
              </div>
              <span className="font-mono text-gray-400">
                Verified: {new Date(passport.verifiedTimestamp).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
