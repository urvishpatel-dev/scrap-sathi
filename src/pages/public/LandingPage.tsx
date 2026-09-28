import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PillButton } from '../../components/ui/PillButton';
import { EditorialCard } from '../../components/ui/EditorialCard';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Scale, 
  QrCode, 
  Coins, 
  Cpu, 
  FileCheck2, 
  Truck, 
  CheckCircle2, 
  Building2, 
  User, 
  Layers 
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginAsDemo } = useAuth();

  return (
    <div className="bg-[#f2ffe3] text-[#2d3637] min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="pt-16 pb-24 md:pt-28 md:pb-36 px-4 sm:px-6 lg:px-8 max-w-editorial mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/80 border border-[#cccccc] px-4 py-1.5 rounded-full mb-8 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#0d5b3b] animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-[#0d5b3b] uppercase">
              SCRAPSAATHI • KABADIWALA CONNECT
            </span>
          </div>

          {/* Thin Editorial Serif Headline */}
          <h1 className="font-serif font-light text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#083a26] tracking-tight leading-[0.95] mb-6">
            Turn Scrap <br className="hidden sm:inline" />
            <span className="font-normal italic">Into Value.</span>
          </h1>

          {/* Oversized Gradient Statement Moment */}
          <div className="my-6">
            <span className="font-serif italic font-light text-2xl sm:text-3xl md:text-4xl editorial-gradient-text block">
              "From informal street collection to verified circular supply."
            </span>
          </div>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-[#526061] max-w-2xl mx-auto font-normal leading-relaxed">
            ScrapSaathi connects informal scrap collectors with authorized recycling partners, making every scrap lot easier to sell, track, and recycle.
          </p>

          {/* Pill CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <PillButton variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                Get Started
              </PillButton>
            </Link>
            <Link to="/how-it-works">
              <PillButton variant="secondary" size="lg">
                Explore the Platform
              </PillButton>
            </Link>
          </div>

          {/* Quick Demo Entrance */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-[#838676]">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#0d5b3b]" />
              GPCB Authorized Recyclers
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Scale className="w-4 h-4 text-[#0d5b3b]" />
              Calibrated Electronic Weighing
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <FileCheck2 className="w-4 h-4 text-[#0d5b3b]" />
              Immutable Lot Passport
            </span>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM SECTION */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-editorial mx-auto border-t border-[#cccccc]/40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-[#0d5b3b]">
              The Core Challenge
            </span>
            <h2 className="font-serif font-light text-4xl sm:text-5xl text-[#083a26] leading-tight">
              One platform. <br />
              <span className="italic font-normal">A cleaner circular chain.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#526061] leading-relaxed">
              Over 80% of India's dry waste passes through millions of informal scrap collectors (kabadiwalas). Yet, they face unpredictable pricing, predatory middleman deductions, and zero digital records.
            </p>
            <p className="text-sm sm:text-base text-[#526061] leading-relaxed">
              Meanwhile, authorized recyclers struggle with unpredictable feedstocks and stringent regulatory mandates for Extended Producer Responsibility (EPR).
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <EditorialCard>
              <div className="w-12 h-12 rounded-full bg-[#f2ffe3] border border-[#cccccc] flex items-center justify-center mb-4 text-[#0d5b3b]">
                <Coins className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-normal text-[#083a26]">Price Transparency</h3>
              <p className="text-xs text-[#526061] mt-2 leading-relaxed">
                Replaces informal guessing with competitive bids from certified processors, ensuring collectors receive fair market compensation.
              </p>
            </EditorialCard>

            <EditorialCard>
              <div className="w-12 h-12 rounded-full bg-[#f2ffe3] border border-[#cccccc] flex items-center justify-center mb-4 text-[#0d5b3b]">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-normal text-[#083a26]">AI Vision Assistance</h3>
              <p className="text-xs text-[#526061] mt-2 leading-relaxed">
                Assists low-literacy collectors in identifying complex electronic sub-components, polymers, and alloy grades right from their phone camera.
              </p>
            </EditorialCard>

            <EditorialCard>
              <div className="w-12 h-12 rounded-full bg-[#f2ffe3] border border-[#cccccc] flex items-center justify-center mb-4 text-[#0d5b3b]">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-normal text-[#083a26]">Verified Handovers</h3>
              <p className="text-xs text-[#526061] mt-2 leading-relaxed">
                Doorstep collection logistics with dual-confirmation electronic weighment receipts and instant digital settlements.
              </p>
            </EditorialCard>

            <EditorialCard>
              <div className="w-12 h-12 rounded-full bg-[#f2ffe3] border border-[#cccccc] flex items-center justify-center mb-4 text-[#0d5b3b]">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-normal text-[#083a26]">Public Lot Passport</h3>
              <p className="text-xs text-[#526061] mt-2 leading-relaxed">
                A QR-enabled digital identity per lot logging chain-of-custody, verified actors, and measurable carbon offsets for EPR audit compliance.
              </p>
            </EditorialCard>
          </div>
        </div>
      </section>

      {/* 3. DUAL PERSONA: COLLECTORS VS RECYCLERS */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-editorial mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-bold text-[#0d5b3b]">
            Two Dedicated Workflows
          </span>
          <h2 className="font-serif font-light text-4xl sm:text-5xl text-[#083a26] mt-2">
            Tailored for both sides of the chain
          </h2>
          <p className="text-sm text-[#526061] mt-3">
            Not just different skins — genuinely distinct interfaces engineered for field collectors and industrial procurement managers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Built for Collectors */}
          <EditorialCard className="bg-white relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0d5b3b] bg-[#f2ffe3] px-3 py-1 rounded-full border border-[#cccccc]/50">
                  Built for Collectors
                </span>
                <span className="text-xs text-gray-400 font-medium">Mobile-First UI</span>
              </div>

              <h3 className="font-serif text-3xl font-normal text-[#083a26]">
                Empowering the street-level aggregator
              </h3>

              <ul className="space-y-3 text-sm text-[#526061] pt-2">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0d5b3b] shrink-0 mt-0.5" />
                  <span>Large touch targets, Hindi bilingual microcopy, and voice-assisted prompts</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0d5b3b] shrink-0 mt-0.5" />
                  <span>Catalog scrap lots in under 60 seconds with camera photo upload</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0d5b3b] shrink-0 mt-0.5" />
                  <span>Receive and compare bids from licensed recycling facilities</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-[#e5e5e5] flex items-center justify-between">
              <button
                onClick={async () => {
                  await loginAsDemo('COLLECTOR');
                  navigate('/app/collector');
                }}
                className="text-xs font-bold text-[#0d5b3b] hover:underline flex items-center gap-1.5"
              >
                <span>Launch Collector Demo (रमेश कुमार)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <Link to="/collectors">
                <PillButton variant="tertiary" size="sm">Learn More</PillButton>
              </Link>
            </div>
          </EditorialCard>

          {/* Built for Recyclers */}
          <EditorialCard className="bg-white relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#083a26] bg-[#f2ffe3] px-3 py-1 rounded-full border border-[#cccccc]/50">
                  Built for Recyclers
                </span>
                <span className="text-xs text-gray-400 font-medium">Enterprise Desktop UI</span>
              </div>

              <h3 className="font-serif text-3xl font-normal text-[#083a26]">
                Industrial procurement & traceability
              </h3>

              <ul className="space-y-3 text-sm text-[#526061] pt-2">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0d5b3b] shrink-0 mt-0.5" />
                  <span>Filter by material, geographic radius, lot volume, and declared grade</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0d5b3b] shrink-0 mt-0.5" />
                  <span>Direct quote submission with doorstep EV pickup logistics</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0d5b3b] shrink-0 mt-0.5" />
                  <span>Automated Lot Passports meeting state pollution control board (GPCB) audits</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-[#e5e5e5] flex items-center justify-between">
              <button
                onClick={async () => {
                  await loginAsDemo('RECYCLER');
                  navigate('/app/recycler');
                }}
                className="text-xs font-bold text-[#0d5b3b] hover:underline flex items-center gap-1.5"
              >
                <span>Launch Recycler Demo (GreenCycle)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <Link to="/recyclers">
                <PillButton variant="tertiary" size="sm">Learn More</PillButton>
              </Link>
            </div>
          </EditorialCard>
        </div>
      </section>

      {/* 4. LOT PASSPORT HIGHLIGHT BANNER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-editorial mx-auto">
        <div className="bg-[#083a26] text-white rounded-[24px] p-8 sm:p-14 shadow-editorial relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#a3fda7] bg-[#0d5b3b] px-3.5 py-1 rounded-full border border-[#a3fda7]/30">
              Signature Innovation
            </span>

            <h2 className="font-serif font-light text-4xl sm:text-6xl text-white leading-tight">
              Every scrap lot <br />
              <span className="italic font-normal">gets a documented story.</span>
            </h2>

            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              The ScrapSaathi Lot Passport is an append-only digital record verifying origin, collector identity, recycler licensing, weight calibration, and carbon offset calculations.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link to="/passport/LOT-2026-000184">
                <PillButton variant="primary" size="md" icon={<QrCode className="w-4 h-4" />}>
                  View Sample Lot Passport
                </PillButton>
              </Link>
              <Link to="/signup">
                <PillButton variant="secondary" size="md">
                  Join the Network
                </PillButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CLOSING CTA & FOOTER */}
      <footer className="bg-white border-t border-[#cccccc]/40 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-editorial mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-2xl text-[#083a26]">ScrapSaathi</span>
              <span className="text-[10px] bg-[#f2ffe3] text-[#0d5b3b] font-bold px-2 py-0.5 rounded-full border border-[#cccccc]">
                SIH 2026
              </span>
            </div>
            <p className="text-xs text-[#838676] mt-1 max-w-sm">
              Connecting informal scrap collectors with authorized recycling partners for a transparent circular economy.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#526061]">
            <Link to="/how-it-works" className="hover:text-[#0d5b3b]">How It Works</Link>
            <Link to="/collectors" className="hover:text-[#0d5b3b]">Collectors</Link>
            <Link to="/recyclers" className="hover:text-[#0d5b3b]">Recyclers</Link>
            <Link to="/passport/LOT-2026-000184" className="hover:text-[#0d5b3b]">Public Passport</Link>
            <Link to="/about" className="hover:text-[#0d5b3b]">About</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
