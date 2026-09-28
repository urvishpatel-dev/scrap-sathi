import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../api/client';
import { ScrapLot } from '../../types';
import { PillButton } from '../../components/ui/PillButton';
import { EditorialCard } from '../../components/ui/EditorialCard';
import { 
  Plus, 
  TrendingUp, 
  Package, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Truck, 
  Sparkles, 
  Phone, 
  ShieldCheck,
  QrCode
} from 'lucide-react';

export const CollectorDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [lots, setLots] = useState<ScrapLot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLots = async () => {
      try {
        const data = await api.getLots({ collectorId: user?.id });
        setLots(data.lots);
      } catch (err) {
        console.error('Error fetching collector lots:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLots();
  }, [user]);

  const activeLots = lots.filter(l => l.status !== 'HANDOVER_COMPLETED' && l.status !== 'RECYCLING_CONFIRMED');
  const completedLots = lots.filter(l => l.status === 'HANDOVER_COMPLETED' || l.status === 'RECYCLING_CONFIRMED');

  const profile = user?.collectorProfile || {
    name: 'Ramesh Kumar',
    nameHindi: 'रमेश कुमार',
    city: 'Ahmedabad',
    locality: 'Ashram Road',
    totalEarnings: 8450,
    completedLots: 14,
    activeLots: 2
  };

  return (
    <div className="bg-[#f2ffe3] min-h-[calc(100vh-5rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-editorial mx-auto space-y-8">
        {/* Collector Header Card */}
        <EditorialCard className="bg-white">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#0d5b3b] text-white flex items-center justify-center font-serif text-2xl font-light shrink-0 shadow-pill">
                RK
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-serif text-3xl font-light text-[#083a26]">
                    {profile.name}
                  </h1>
                  <span className="text-xs bg-[#f2ffe3] text-[#0d5b3b] font-bold px-2.5 py-0.5 rounded-full border border-[#cccccc]/40">
                    {profile.nameHindi || 'रमेश कुमार'}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Verified Saathi Collector
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-[#838676] mt-1.5 flex-wrap">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {profile.locality}, {profile.city}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    {user?.phone || '+91 98250 44912'}
                  </span>
                </div>
              </div>
            </div>

            {/* Primary Action Button */}
            <Link to="/app/collector/lots/new" className="w-full md:w-auto">
              <PillButton
                variant="primary"
                size="lg"
                icon={<Plus className="w-5 h-5" />}
                className="w-full md:w-auto"
              >
                + Create Scrap Lot (नया लॉट बनाएं)
              </PillButton>
            </Link>
          </div>
        </EditorialCard>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <EditorialCard>
            <div className="flex items-center justify-between text-[#838676] mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Active Lots</span>
              <Package className="w-4 h-4 text-[#0d5b3b]" />
            </div>
            <div className="font-serif text-4xl text-[#083a26]">
              {activeLots.length || 2}
            </div>
            <span className="text-[11px] text-[#0d5b3b] font-medium mt-1 inline-block">
              In bidding & pickup
            </span>
          </EditorialCard>

          <EditorialCard>
            <div className="flex items-center justify-between text-[#838676] mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Completed</span>
              <CheckCircle2 className="w-4 h-4 text-[#0d5b3b]" />
            </div>
            <div className="font-serif text-4xl text-[#083a26]">
              {profile.completedLots || 14}
            </div>
            <span className="text-[11px] text-gray-500 font-medium mt-1 inline-block">
              Fully recycled lots
            </span>
          </EditorialCard>

          <EditorialCard>
            <div className="flex items-center justify-between text-[#838676] mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Total Earnings</span>
              <TrendingUp className="w-4 h-4 text-[#0d5b3b]" />
            </div>
            <div className="font-serif text-4xl text-[#0d5b3b]">
              ₹{profile.totalEarnings.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-emerald-800 font-medium mt-1 inline-block">
              Direct UPI transfers
            </span>
          </EditorialCard>

          <EditorialCard>
            <div className="flex items-center justify-between text-[#838676] mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Pending Offers</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="font-serif text-4xl text-amber-600">
              3
            </div>
            <span className="text-[11px] text-amber-700 font-medium mt-1 inline-block">
              Bids ready to review
            </span>
          </EditorialCard>
        </div>

        {/* Recent Scrap Lots Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-3xl text-[#083a26]">
                My Scrap Lots
              </h2>
              <p className="text-xs text-[#526061]">
                Cataloged batches, active recycler quotes, and weighment receipts
              </p>
            </div>
            <Link to="/app/collector/lots">
              <PillButton variant="tertiary" size="sm">View All</PillButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {lots.map(lot => {
              const isCompleted = lot.status === 'HANDOVER_COMPLETED' || lot.status === 'RECYCLING_CONFIRMED';
              return (
                <div
                  key={lot.id}
                  onClick={() => navigate(`/app/collector/lots/${lot.id}`)}
                  className="bg-white rounded-[24px] p-5 sm:p-6 border border-[#e5e5e5] hover:border-[#a3fda7] hover:shadow-editorial transition-all cursor-pointer group"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center gap-4">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                        <img
                          src={lot.photos?.[0] || lot.photoUrl || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80'}
                          alt={lot.materialDisplay}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-bold text-[#0d5b3b] bg-[#f2ffe3] px-2.5 py-0.5 rounded-full border border-[#cccccc]/40">
                            {lot.lotNumber || lot.id}
                          </span>
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                            {lot.status.replace(/_/g, ' ')}
                          </span>
                        </div>

                        <h3 className="font-serif text-xl sm:text-2xl text-[#083a26] mt-1 font-normal">
                          {lot.materialDisplay}
                          <span className="text-xs font-sans text-gray-500 ml-2">
                            ({lot.materialDisplayHindi})
                          </span>
                        </h3>

                        <div className="flex items-center gap-3 text-xs text-[#838676] mt-1 flex-wrap">
                          <span className="font-bold text-[#2d3637] bg-gray-100 px-2 py-0.5 rounded-md">
                            {lot.weightKg} kg
                          </span>
                          <span>•</span>
                          <span>{lot.location}</span>
                          <span>•</span>
                          <span>{new Date(lot.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 shrink-0">
                      <div className="text-left sm:text-right">
                        <span className="text-[11px] text-[#838676] uppercase font-bold block">
                          Estimated Value
                        </span>
                        <span className="font-serif text-2xl text-[#0d5b3b] font-normal">
                          ₹{(lot.estimatedMinValue || lot.estimatedMinVal || 3000).toLocaleString('en-IN')} – ₹{(lot.estimatedMaxValue || lot.estimatedMaxVal || 3500).toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center gap-1 text-xs font-bold text-[#0d5b3b] group-hover:translate-x-1 transition-transform">
                        <span>{isCompleted ? 'View Passport' : 'View Bids & Status'}</span>
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
    </div>
  );
};
