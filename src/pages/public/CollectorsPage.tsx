import React from 'react';
import { Link } from 'react-router-dom';
import { PillButton } from '../../components/ui/PillButton';
import { EditorialCard } from '../../components/ui/EditorialCard';
import { CheckCircle2, ShieldCheck, Scale, Coins, Phone, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const CollectorsPage: React.FC = () => {
  const { loginAsDemo } = useAuth();

  return (
    <div className="bg-[#f2ffe3] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-editorial mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-[#0d5b3b]">
            Informal Sector Empowerment
          </span>
          <h1 className="font-serif font-light text-5xl sm:text-6xl text-[#083a26]">
            Built for India's Kabadiwalas
          </h1>
          <p className="text-[#526061] text-base leading-relaxed">
            Eliminating unfair deductions and arbitrary rate cuts. Get competitive bids, calibrated doorstep weighing, and prompt digital UPI payouts.
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <Link to="/signup">
              <PillButton variant="primary">Register as Collector</PillButton>
            </Link>
            <button
              onClick={() => loginAsDemo('COLLECTOR')}
              className="text-xs font-bold text-[#0d5b3b] hover:underline flex items-center gap-1"
            >
              <span>Instant Collector Demo (रमेश कुमार)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <EditorialCard>
            <div className="w-12 h-12 rounded-full bg-[#f2ffe3] border border-[#cccccc] flex items-center justify-center mb-4 text-[#0d5b3b]">
              <Coins className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-[#083a26]">Earn 25–35% More</h3>
            <p className="text-xs text-[#526061] mt-2 leading-relaxed">
              Sell directly to authorized recycling hubs rather than multi-tiered middlemen taking excessive commissions.
            </p>
          </EditorialCard>

          <EditorialCard>
            <div className="w-12 h-12 rounded-full bg-[#f2ffe3] border border-[#cccccc] flex items-center justify-center mb-4 text-[#0d5b3b]">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-[#083a26]">Doorstep EV Pickup</h3>
            <p className="text-xs text-[#526061] mt-2 leading-relaxed">
              Recyclers dispatch collection vehicles equipped with certified electronic scales so you save transportation fuel.
            </p>
          </EditorialCard>

          <EditorialCard>
            <div className="w-12 h-12 rounded-full bg-[#f2ffe3] border border-[#cccccc] flex items-center justify-center mb-4 text-[#0d5b3b]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-[#083a26]">Verified Digital Identity</h3>
            <p className="text-xs text-[#526061] mt-2 leading-relaxed">
              Build a verified track record as a recognized green warrior with an official Saathi ID card and transaction ledger.
            </p>
          </EditorialCard>
        </div>
      </div>
    </div>
  );
};
