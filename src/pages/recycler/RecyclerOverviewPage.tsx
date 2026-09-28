import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../api/client';
import { ScrapLot } from '../../types';
import { PillButton } from '../../components/ui/PillButton';
import { EditorialCard } from '../../components/ui/EditorialCard';
import { 
  Building2, 
  Package, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  MapPin, 
  ShieldCheck, 
  Send, 
  ArrowRight,
  Filter
} from 'lucide-react';

export const RecyclerOverviewPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [availableLots, setAvailableLots] = useState<ScrapLot[]>([]);
  const [loading, setLoading] = useState(true);

  // Quote modal state
  const [activeModalLot, setActiveModalLot] = useState<ScrapLot | null>(null);
  const [bidPrice, setBidPrice] = useState<number>(78);
  const [pickupType, setPickupType] = useState<string>('Recycler Pickup');
  const [quoteNotes, setQuoteNotes] = useState<string>('Official bid from GreenCycle Naroda plant.');

  useEffect(() => {
    const fetchLots = async () => {
      try {
        const data = await api.getLots();
        setAvailableLots(data.lots);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLots();
  }, []);

  const handleOpenBidModal = (lot: ScrapLot) => {
    setActiveModalLot(lot);
    let defaultPrice = 78;
    if (lot.materialCategory === 'plastic') defaultPrice = 32;
    if (lot.materialCategory === 'metal') defaultPrice = 95;
    if (lot.materialCategory === 'paper') defaultPrice = 16;
    if (lot.materialCategory === 'glass') defaultPrice = 7;
    setBidPrice(defaultPrice);
  };

  const handleSendQuote = async () => {
    if (!activeModalLot) return;
    try {
      await api.submitQuote({
        lotId: activeModalLot.id,
        pricePerKg: bidPrice,
        pickupType,
        notes: quoteNotes
      });
      alert(`Quote of ₹${bidPrice}/kg submitted to collector!`);
      setActiveModalLot(null);
    } catch (err: any) {
      alert(err.message || 'Failed to submit quote');
    }
  };

  const profile = user?.recyclerProfile || {
    organizationName: 'GreenCycle Recycling Solutions',
    contactPerson: 'Sanjay Shah',
    city: 'Ahmedabad',
    gpcbLicenseNo: 'GPCB/HAZ/2024-9982',
    rating: 4.9,
    totalProcuredKg: 14850
  };

  return (
    <div className="bg-[#f2ffe3] min-h-[calc(100vh-5rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-editorial mx-auto space-y-8">
        {/* Recycler Header */}
        <EditorialCard>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#083a26] text-white flex items-center justify-center font-serif text-2xl font-light shrink-0 shadow-pill">
                GC
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-serif text-3xl font-light text-[#083a26]">
                    {profile.organizationName}
                  </h1>
                  <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    GPCB License: {profile.gpcbLicenseNo}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-[#838676] mt-1.5 flex-wrap">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    Naroda Industrial Estate, {profile.city}
                  </span>
                  <span>•</span>
                  <span>Authorized Waste Extraction & Smelting Hub</span>
                </div>
              </div>
            </div>

            <Link to="/app/recycler/discover">
              <PillButton variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                Discover Scrap Lots
              </PillButton>
            </Link>
          </div>
        </EditorialCard>

        {/* Procurement Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <EditorialCard>
            <div className="flex items-center justify-between text-[#838676] mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Available Lots</span>
              <Package className="w-4 h-4 text-[#0d5b3b]" />
            </div>
            <div className="font-serif text-4xl text-[#083a26]">12</div>
            <span className="text-[11px] text-[#0d5b3b] font-medium mt-1 inline-block">
              In Ahmedabad & Gandhinagar
            </span>
          </EditorialCard>

          <EditorialCard>
            <div className="flex items-center justify-between text-[#838676] mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Pending Quotes</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="font-serif text-4xl text-amber-600">4</div>
            <span className="text-[11px] text-amber-700 font-medium mt-1 inline-block">
              Awaiting collector decision
            </span>
          </EditorialCard>

          <EditorialCard>
            <div className="flex items-center justify-between text-[#838676] mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Accepted Lots</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-serif text-4xl text-[#0d5b3b]">8</div>
            <span className="text-[11px] text-emerald-800 font-medium mt-1 inline-block">
              Dispatched for collection
            </span>
          </EditorialCard>

          <EditorialCard>
            <div className="flex items-center justify-between text-[#838676] mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Total Procured</span>
              <TrendingUp className="w-4 h-4 text-[#0d5b3b]" />
            </div>
            <div className="font-serif text-4xl text-[#083a26]">
              {profile.totalProcuredKg.toLocaleString('en-IN')} kg
            </div>
            <span className="text-[11px] text-gray-500 font-medium mt-1 inline-block">
              Certified secondary feed
            </span>
          </EditorialCard>
        </div>

        {/* Recommended Scrap Lots */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-3xl text-[#083a26]">
                Published Scrap Lots
              </h2>
              <p className="text-xs text-[#526061]">
                Cataloged feeds within your 25 km service radius available for competitive quoting
              </p>
            </div>
            <Link to="/app/recycler/discover">
              <PillButton variant="tertiary" size="sm" icon={<Filter className="w-3.5 h-3.5" />}>
                Filter Feeds
              </PillButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {availableLots.map(lot => (
              <EditorialCard key={lot.id} className="flex flex-col justify-between">
                <div>
                  <div className="aspect-video rounded-[20px] overflow-hidden bg-gray-100 border border-[#cccccc] mb-4 relative">
                    <img src={lot.photos?.[0] || lot.photoUrl || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80'} alt={lot.materialDisplay} className="w-full h-full object-cover" />
                    <span className="absolute top-2.5 left-2.5 bg-[#083a26] text-white text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
                      {lot.lotNumber || lot.id}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-2xl text-[#083a26] font-normal">{lot.materialDisplay}</h3>
                    <span className="text-xs font-bold bg-[#f2ffe3] px-2.5 py-0.5 rounded-full border border-[#cccccc]/40">
                      {lot.weightKg} kg
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#838676] mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{lot.location}</span>
                  </div>

                  <p className="text-xs text-[#526061] mt-2 line-clamp-2">
                    Collector: <strong>{lot.collectorName}</strong> • {lot.notes}
                  </p>

                  <div className="mt-4 p-3 bg-[#f2ffe3] rounded-[16px] border border-[#cccccc]/30 flex items-center justify-between text-xs">
                    <span className="text-[#838676]">Estimated Total:</span>
                    <span className="font-serif text-lg text-[#0d5b3b] font-normal">
                      ₹{(lot.estimatedMinValue || lot.estimatedMinVal || 3000).toLocaleString('en-IN')} – ₹{(lot.estimatedMaxValue || lot.estimatedMaxVal || 3500).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#e5e5e5] flex gap-2">
                  <PillButton
                    variant="primary"
                    size="sm"
                    className="w-full justify-center"
                    icon={<Send className="w-3.5 h-3.5" />}
                    onClick={() => handleOpenBidModal(lot)}
                  >
                    Submit Quote
                  </PillButton>
                </div>
              </EditorialCard>
            ))}
          </div>
        </div>
      </div>

      {/* Quote Submission Modal */}
      {activeModalLot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="max-w-md w-full">
            <EditorialCard>
              <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-4 mb-4">
                <div>
                  <h3 className="font-serif text-2xl text-[#083a26]">Submit Official Bid</h3>
                  <span className="text-xs font-mono text-gray-500">{activeModalLot.lotNumber} ({activeModalLot.weightKg} kg)</span>
                </div>
                <button onClick={() => setActiveModalLot(null)} className="text-gray-400 hover:text-gray-800 text-lg">✕</button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Offered Unit Rate (₹ / kg)</label>
                  <input
                    type="number"
                    value={bidPrice}
                    onChange={(e) => setBidPrice(Number(e.target.value))}
                    className="w-full text-2xl font-serif text-[#0d5b3b] py-2 px-4 rounded-full border border-[#cccccc] bg-[#f2ffe3] focus:outline-none focus:ring-2 focus:ring-[#a3fda7]"
                  />
                </div>

                <div className="p-3 bg-[#f2ffe3] rounded-2xl border border-[#cccccc]/40 flex items-center justify-between text-xs">
                  <span className="text-[#838676]">Total Payout to Collector:</span>
                  <span className="font-serif text-2xl text-[#0d5b3b]">
                    ₹{(bidPrice * activeModalLot.weightKg).toLocaleString('en-IN')}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Fulfillment Mode</label>
                  <select
                    value={pickupType}
                    onChange={(e) => setPickupType(e.target.value)}
                    className="w-full py-2.5 px-4 rounded-full border border-[#cccccc] bg-white text-xs outline-none"
                  >
                    <option value="Recycler Pickup">Our Doorstep EV Van Pickup</option>
                    <option value="Self Drop-off">Facility Drop-off</option>
                  </select>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#e5e5e5]">
                  <button onClick={() => setActiveModalLot(null)} className="text-xs font-semibold text-gray-500">Cancel</button>
                  <PillButton variant="primary" size="sm" onClick={handleSendQuote}>
                    Submit Official Bid
                  </PillButton>
                </div>
              </div>
            </EditorialCard>
          </div>
        </div>
      )}
    </div>
  );
};
