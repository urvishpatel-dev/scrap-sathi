import React from 'react';
import { Link } from 'react-router-dom';
import { PillButton } from '../../components/ui/PillButton';
import { EditorialCard } from '../../components/ui/EditorialCard';
import { Building2, ShieldCheck, FileCheck2, BarChart3, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const RecyclersPage: React.FC = () => {
  const { loginAsDemo } = useAuth();

  return (
    <div className="bg-[#f2ffe3] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-editorial mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-[#0d5b3b]">
            Industrial Procurement
          </span>
          <h1 className="font-serif font-light text-5xl sm:text-6xl text-[#083a26]">
            Source Segregated Feedstock
          </h1>
          <p className="text-[#526061] text-base leading-relaxed">
            Direct procurement pipeline from micro-aggregators to your authorized processing plant with automated Lot Passports for EPR compliance.
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <Link to="/signup">
              <PillButton variant="primary">Register Facility</PillButton>
            </Link>
            <button
              onClick={() => loginAsDemo('RECYCLER')}
              className="text-xs font-bold text-[#0d5b3b] hover:underline flex items-center gap-1"
            >
              <span>Instant Recycler Demo (GreenCycle)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <EditorialCard>
            <div className="w-12 h-12 rounded-full bg-[#f2ffe3] border border-[#cccccc] flex items-center justify-center mb-4 text-[#0d5b3b]">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-[#083a26]">EPR & CPCB Compliance</h3>
            <p className="text-xs text-[#526061] mt-2 leading-relaxed">
              Every acquired scrap lot generates an immutable digital Lot Passport satisfying state pollution control board chain-of-custody audits.
            </p>
          </EditorialCard>

          <EditorialCard>
            <div className="w-12 h-12 rounded-full bg-[#f2ffe3] border border-[#cccccc] flex items-center justify-center mb-4 text-[#0d5b3b]">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-[#083a26]">Predictable Sourcing Radius</h3>
            <p className="text-xs text-[#526061] mt-2 leading-relaxed">
              Configure your service area (e.g. 25 km around Naroda GIDC) and receive alerts whenever matching scrap lots are published.
            </p>
          </EditorialCard>

          <EditorialCard>
            <div className="w-12 h-12 rounded-full bg-[#f2ffe3] border border-[#cccccc] flex items-center justify-center mb-4 text-[#0d5b3b]">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-[#083a26]">Inventory Management</h3>
            <p className="text-xs text-[#526061] mt-2 leading-relaxed">
              Track acquired material from warehouse intake to extraction, maintaining ESG reports on carbon reduction and recovery yields.
            </p>
          </EditorialCard>
        </div>
      </div>
    </div>
  );
};
