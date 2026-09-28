import React from 'react';
import { Link } from 'react-router-dom';
import { PillButton } from '../../components/ui/PillButton';
import { EditorialCard } from '../../components/ui/EditorialCard';
import { Recycle, Sparkles, ShieldCheck } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#f2ffe3] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/80 border border-[#cccccc] px-4 py-1.5 rounded-full shadow-xs">
            <Sparkles className="w-4 h-4 text-[#0d5b3b]" />
            <span className="text-xs font-bold tracking-widest text-[#0d5b3b] uppercase">
              SMART INDIA HACKATHON 2026
            </span>
          </div>
          <h1 className="font-serif font-light text-5xl sm:text-6xl text-[#083a26]">
            The ScrapSaathi Mission
          </h1>
          <p className="text-sm sm:text-base text-[#526061] leading-relaxed">
            "Kabadiwala Connect: Bringing the Informal Collector into the Formal Circular Economy."
          </p>
        </div>

        <EditorialCard className="space-y-6">
          <div className="space-y-4 text-sm text-[#526061] leading-relaxed">
            <h2 className="font-serif text-3xl text-[#083a26]">
              Why this problem matters
            </h2>
            <p>
              In India, an estimated 1.5 to 4 million informal waste pickers and scrap collectors operate as the unsung backbone of urban recycling. Despite recovering millions of tonnes of plastics, electronic waste, and metals annually, they remain economically vulnerable, exposed to occupational risks, and excluded from formal compliance chains.
            </p>
            <p>
              At the same time, Indian environmental regulations (such as CPCB guidelines and the E-Waste Management Rules) require manufacturers and recyclers to maintain verifiable proof of recycling. Because informal collection happens in cash without digital trails, immense quantities of recyclable material fail to qualify for formal credits.
            </p>
            <p>
              <strong>ScrapSaathi</strong> bridges this gap. By giving collectors an accessible, photo-driven mobile workflow and recyclers a traceable procurement platform, we transform informal transactions into formal, authenticated economic value.
            </p>
          </div>

          <div className="pt-4 border-t border-[#e5e5e5] flex items-center justify-between">
            <span className="text-xs text-[#838676]">Pilot Prototype — Ahmedabad & Gandhinagar</span>
            <Link to="/signup">
              <PillButton variant="primary" size="sm">Get Involved</PillButton>
            </Link>
          </div>
        </EditorialCard>
      </div>
    </div>
  );
};
