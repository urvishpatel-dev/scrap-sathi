import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { Handover } from '../../types';
import { PillButton } from '../../components/ui/PillButton';
import { EditorialCard } from '../../components/ui/EditorialCard';
import { 
  Truck, 
  CheckCircle2, 
  Clock, 
  Building2, 
  QrCode, 
  ShieldCheck, 
  ArrowRight,
  MapPin 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const TransactionsPage: React.FC = () => {
  const [handovers, setHandovers] = useState<Handover[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHandovers = async () => {
    try {
      const res = await fetch('/api/handovers');
      const data = await res.json();
      setHandovers(data.handovers || []);
    } catch (err) {
      console.error('Failed to fetch handovers', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHandovers();
  }, []);

  const handleConfirm = async (handoverId: string) => {
    try {
      const res = await api.confirmHandover(handoverId);
      alert(res.message);
      fetchHandovers();
    } catch (err: any) {
      alert(err.message || 'Confirmation failed');
    }
  };

  return (
    <div className="bg-[#f2ffe3] min-h-[calc(100vh-5rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-[#0d5b3b]">
            Custody Transfer Receipts
          </span>
          <h1 className="font-serif font-light text-4xl text-[#083a26]">
            Handovers & Payout Receipts
          </h1>
          <p className="text-xs text-[#526061] mt-1">
            Server-verified dual confirmation between collector and authorized recycler
          </p>
        </div>

        {handovers.length === 0 ? (
          <EditorialCard className="text-center py-12">
            <Truck className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-xs text-[#838676]">No active handovers scheduled yet.</p>
          </EditorialCard>
        ) : (
          <div className="space-y-4">
            {handovers.map(h => {
              const isCompleted = h.status === 'COMPLETED';
              return (
                <EditorialCard key={h.id}>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#0d5b3b] bg-[#f2ffe3] px-2.5 py-0.5 rounded-full border border-[#cccccc]/40">
                          {h.lotNumber}
                        </span>
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          isCompleted ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}>
                          {isCompleted ? '✓ Handover Completed' : 'Awaiting Dual Confirmation'}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl text-[#083a26] font-normal">
                        Recycler: {h.recyclerName}
                      </h3>

                      <div className="flex items-center gap-4 text-xs text-[#526061]">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#0d5b3b]" />
                          {h.location}
                        </span>
                        <span>•</span>
                        <span>Scheduled: {h.scheduledAt}</span>
                      </div>

                      {/* Dual Confirmation Badges */}
                      <div className="flex items-center gap-3 pt-2 text-xs">
                        <span className={`flex items-center gap-1 font-semibold ${h.collectorConfirmation ? 'text-[#0d5b3b]' : 'text-gray-400'}`}>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Collector Confirmed: {h.collectorConfirmation ? 'Yes' : 'Pending'}
                        </span>
                        <span>•</span>
                        <span className={`flex items-center gap-1 font-semibold ${h.recyclerConfirmation ? 'text-[#0d5b3b]' : 'text-gray-400'}`}>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Recycler Confirmed: {h.recyclerConfirmation ? 'Yes' : 'Pending'}
                        </span>
                      </div>
                    </div>

                    <div className="text-right w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0">
                      <div>
                        <span className="text-[11px] text-[#838676] uppercase font-bold block">
                          Settled Amount
                        </span>
                        <span className="font-serif text-3xl text-[#0d5b3b]">
                          ₹{h.finalSettledAmount?.toLocaleString('en-IN') || '3,276'}
                        </span>
                        <span className="block text-[11px] text-emerald-800 font-semibold">
                          Direct UPI Transfer
                        </span>
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        {!h.collectorConfirmation && (
                          <PillButton
                            variant="primary"
                            size="sm"
                            onClick={() => handleConfirm(h.id)}
                          >
                            Confirm Handover (सुपुर्दगी पुष्टि)
                          </PillButton>
                        )}

                        {isCompleted && (
                          <Link to={`/passport/${h.lotNumber}`}>
                            <PillButton
                              variant="forest"
                              size="sm"
                              icon={<QrCode className="w-3.5 h-3.5" />}
                            >
                              Lot Passport
                            </PillButton>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </EditorialCard>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
