import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { Quote } from '../../types';
import { PillButton } from '../../components/ui/PillButton';
import { EditorialCard } from '../../components/ui/EditorialCard';
import { FileCheck2, ArrowRight, ShieldCheck, Truck, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const OffersPage: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchQuotes = async () => {
    try {
      const res = await api.getQuotes();
      setQuotes(res.quotes || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleAccept = async (quoteId: string) => {
    try {
      await api.acceptQuote(quoteId);
      alert('Quote accepted! Handover scheduled.');
      navigate('/app/collector/transactions');
    } catch (err: any) {
      alert(err.message || 'Failed to accept quote');
    }
  };

  return (
    <div className="bg-[#f2ffe3] min-h-[calc(100vh-5rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-[#0d5b3b]">
            Direct Competitive Bids
          </span>
          <h1 className="font-serif font-light text-4xl text-[#083a26]">
            Incoming Recycler Offers
          </h1>
          <p className="text-xs text-[#526061] mt-1">
            Compare offered unit rates per kg and accept doorstep collection terms
          </p>
        </div>

        {quotes.length === 0 ? (
          <EditorialCard className="text-center py-12">
            <FileCheck2 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-xs text-[#838676]">No active bids currently pending review.</p>
          </EditorialCard>
        ) : (
          <div className="space-y-4">
            {quotes.map(q => (
              <EditorialCard key={q.id}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#0d5b3b] bg-[#f2ffe3] px-2.5 py-0.5 rounded-full border border-[#cccccc]/40">
                        Lot {q.lotNumber}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {q.status}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl text-[#083a26] font-normal">
                      {q.recyclerName}
                    </h3>

                    <div className="flex items-center gap-3 text-xs text-[#838676]">
                      <span>{q.recyclerLocation}</span>
                      <span>•</span>
                      <span>{q.pickupType}</span>
                      <span>•</span>
                      <span>Valid until: {new Date(q.validUntil || Date.now()).toLocaleDateString()}</span>
                    </div>

                    <p className="text-xs text-[#526061] bg-[#f2ffe3] p-2.5 rounded-xl border border-[#cccccc]/30">
                      {q.notes}
                    </p>
                  </div>

                  <div className="text-right w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0">
                    <div>
                      <span className="font-serif text-3xl text-[#0d5b3b]">₹{q.pricePerKg}</span>
                      <span className="text-xs text-gray-500"> / kg</span>
                      <span className="block text-xs font-bold text-[#083a26]">
                        Estimated Total: ₹{q.estimatedTotal.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="mt-3">
                      {q.status === 'PENDING' ? (
                        <PillButton
                          variant="primary"
                          size="sm"
                          onClick={() => handleAccept(q.id)}
                          icon={<CheckCircle2 className="w-4 h-4" />}
                        >
                          Accept Offer
                        </PillButton>
                      ) : (
                        <span className="text-xs font-bold text-[#0d5b3b] bg-[#f2ffe3] px-3 py-1 rounded-full border border-[#cccccc]/40">
                          {q.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </EditorialCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
