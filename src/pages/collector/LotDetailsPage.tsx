import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../../api/client';
import { ScrapLot, Quote } from '../../types';
import { PillButton } from '../../components/ui/PillButton';
import { EditorialCard } from '../../components/ui/EditorialCard';
import { 
  ArrowLeft, 
  MapPin, 
  Scale, 
  Calendar, 
  Truck, 
  CheckCircle2, 
  QrCode, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const LotDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [lot, setLot] = useState<ScrapLot | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLot = async () => {
      try {
        const lotId = id || 'lot-internal-001';
        const data = await api.getLotById(lotId);
        setLot(data.lot);
        setQuotes(data.quotes || []);
        setEvents(data.events || []);
      } catch (err) {
        console.error('Failed to load lot', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLot();
  }, [id]);

  const handleAcceptQuote = async (quoteId: string) => {
    try {
      await api.acceptQuote(quoteId);
      alert('Quote accepted! Handover is now scheduled.');
      navigate('/app/collector/transactions');
    } catch (err: any) {
      alert(err.message || 'Failed to accept quote');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-5rem)] bg-[#f2ffe3] flex items-center justify-center p-6">
        <p className="font-serif text-lg text-[#083a26]">Loading Scrap Lot details...</p>
      </div>
    );
  }

  if (!lot) {
    return (
      <div className="min-h-[calc(100vh-5rem)] bg-[#f2ffe3] flex items-center justify-center p-6">
        <EditorialCard className="text-center max-w-md">
          <h2 className="font-serif text-2xl text-[#083a26]">Lot Not Found</h2>
          <div className="mt-4">
            <Link to="/app/collector">
              <PillButton variant="primary" size="sm">Back to Dashboard</PillButton>
            </Link>
          </div>
        </EditorialCard>
      </div>
    );
  }

  const isCompleted = lot.status === 'HANDOVER_COMPLETED' || lot.status === 'RECYCLING_CONFIRMED';

  return (
    <div className="bg-[#f2ffe3] min-h-[calc(100vh-5rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link to="/app/collector" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#526061] hover:text-[#083a26]">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </Link>

        {/* Master Lot Card */}
        <EditorialCard>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-56 h-56 rounded-[20px] overflow-hidden bg-gray-100 border border-[#cccccc] shrink-0">
              <img src={lot.photos?.[0] || lot.photoUrl || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80'} alt={lot.materialDisplay} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#0d5b3b] bg-[#f2ffe3] px-2.5 py-0.5 rounded-full border border-[#cccccc]/40">
                    {lot.lotNumber || lot.id}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {lot.status.replace(/_/g, ' ')}
                  </span>
                </div>
                <span className="text-xs text-[#838676] flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(lot.createdAt).toLocaleDateString()}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#083a26]">
                {lot.materialDisplay}
              </h1>

              <div className="flex items-center gap-3 text-xs text-[#526061] flex-wrap">
                <span className="font-bold text-[#2d3637] bg-gray-100 px-2.5 py-1 rounded-full">
                  {lot.weightKg} kg Declared
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#0d5b3b]" />
                  {lot.location}
                </span>
              </div>

              {lot.notes && (
                <p className="text-xs text-[#526061] italic bg-[#f2ffe3] p-3 rounded-[16px] border border-[#cccccc]/30">
                  "{lot.notes}"
                </p>
              )}

              <div className="pt-2 border-t border-[#e5e5e5] flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] text-[#838676] uppercase font-bold block">
                    Estimated Valuation
                  </span>
                  <span className="font-serif text-2xl text-[#0d5b3b]">
                    ₹{(lot.estimatedMinValue || lot.estimatedMinVal || 3000).toLocaleString('en-IN')} – ₹{(lot.estimatedMaxValue || lot.estimatedMaxVal || 3500).toLocaleString('en-IN')}
                  </span>
                </div>

                {isCompleted ? (
                  <Link to={`/passport/${lot.lotNumber}`}>
                    <PillButton variant="primary" size="sm" icon={<QrCode className="w-4 h-4" />}>
                      View Lot Passport
                    </PillButton>
                  </Link>
                ) : (
                  <Link to="/app/collector/offers">
                    <PillButton variant="primary" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                      View Offers ({quotes.length})
                    </PillButton>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </EditorialCard>

        {/* Incoming Recycler Offers */}
        <div className="space-y-4">
          <h2 className="font-serif text-2xl text-[#083a26]">
            Received Recycler Bids ({quotes.length})
          </h2>

          {quotes.length === 0 ? (
            <EditorialCard className="text-center py-8">
              <p className="text-xs text-[#838676]">Awaiting initial quotes from matched facilities in your area...</p>
            </EditorialCard>
          ) : (
            <div className="space-y-3">
              {quotes.map(q => (
                <EditorialCard key={q.id}>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif text-2xl text-[#083a26] font-normal">{q.recyclerName}</h3>
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Verified GPCB
                        </span>
                      </div>
                      <p className="text-xs text-[#838676] mt-0.5">{q.recyclerLocation} • {q.pickupType}</p>
                      <p className="text-xs text-[#526061] mt-2 bg-[#f2ffe3] p-2.5 rounded-xl border border-[#cccccc]/30">
                        {q.notes}
                      </p>
                    </div>

                    <div className="text-right w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0">
                      <div>
                        <span className="font-serif text-3xl text-[#0d5b3b]">₹{q.pricePerKg}</span>
                        <span className="text-xs text-gray-500"> / kg</span>
                        <span className="block text-xs font-bold text-[#083a26]">
                          Total: ₹{q.estimatedTotal.toLocaleString('en-IN')}
                        </span>
                      </div>

                      {q.status === 'PENDING' ? (
                        <div className="mt-3">
                          <PillButton
                            variant="primary"
                            size="sm"
                            onClick={() => handleAcceptQuote(q.id)}
                          >
                            Accept Offer (भाव स्वीकारें)
                          </PillButton>
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-[#0d5b3b] bg-[#f2ffe3] px-3 py-1 rounded-full border border-[#cccccc]/40 mt-3 inline-block">
                          {q.status}
                        </span>
                      )}
                    </div>
                  </div>
                </EditorialCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
