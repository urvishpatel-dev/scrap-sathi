import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  ShieldCheck, 
  Scale, 
  Sparkles, 
  Cpu, 
  Truck, 
  FileCheck, 
  CheckCircle2, 
  QrCode, 
  Coins, 
  MapPin, 
  Users, 
  Building2 
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { navigateTo, setUserRole } = useApp();

  return (
    <div className="min-h-screen bg-[#F3F7F2] text-[#111827]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-[#E8F1EA]">
        {/* Subtle decorative background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#E8F1EA] rounded-full blur-3xl opacity-70 -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#E8F1EA] border border-[#246B4B]/20 text-[#174B36] px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-6 shadow-xs">
              <Sparkles className="w-4 h-4 text-[#246B4B]" />
              <span>Smart India Hackathon 2026 Initiative</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#111827] tracking-tight leading-tight sm:leading-none">
              Turn Scrap <br className="hidden sm:inline" />
              <span className="text-[#174B36]">Into Value.</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg md:text-xl text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
              ScrapSaathi connects informal scrap collectors with authorized recycling partners, making every scrap lot easier to sell, track and recycle.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
              <button
                onClick={() => {
                  setUserRole('collector');
                  navigateTo('collector_dashboard');
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#174B36] hover:bg-[#246B4B] text-white font-bold text-base px-7 py-3.5 rounded-xl shadow-md transition-all group"
              >
                <span>Start as Collector</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setUserRole('recycler');
                  navigateTo('recycler_dashboard');
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-[#E8F1EA] text-[#174B36] border border-[#D1E3D5] font-bold text-base px-7 py-3.5 rounded-xl transition-all shadow-xs"
              >
                <Building2 className="w-4 h-4 text-[#246B4B]" />
                <span>Explore as Recycler</span>
              </button>
            </div>

            {/* Micro proof badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#6B7280]">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#246B4B]" />
                100% Verified Recyclers
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Scale className="w-4 h-4 text-[#246B4B]" />
                Calibrated Digital Weighing
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <FileCheck className="w-4 h-4 text-[#246B4B]" />
                Lot Passport Proof
              </span>
            </div>
          </div>

          {/* Interactive Ecosystem / Product Preview */}
          <div className="mt-14 max-w-5xl mx-auto bg-white rounded-2xl border border-[#D1E3D5] shadow-lg p-5 sm:p-8">
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-widest font-bold text-[#246B4B] bg-[#E8F1EA] px-3 py-1 rounded-full">
                Interactive Recycling Ecosystem
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-2">
                From Informal Street Collection to Formal Circular Supply
              </h2>
            </div>

            {/* Stepper Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
              {/* Step 1 */}
              <div 
                onClick={() => { setUserRole('collector'); navigateTo('collector_dashboard'); }}
                className="p-4 rounded-xl border border-gray-100 bg-[#F3F7F2]/60 hover:bg-[#E8F1EA] transition-all cursor-pointer text-center group"
              >
                <div className="w-10 h-10 rounded-full bg-[#174B36] text-white flex items-center justify-center mx-auto mb-3 font-bold group-hover:scale-105 transition-transform">
                  1
                </div>
                <h3 className="font-bold text-sm text-gray-900">Collector</h3>
                <p className="text-xs text-gray-500 mt-1">Aggregates loose scrap & records batch</p>
                <span className="text-[11px] text-[#246B4B] font-semibold mt-2 inline-block">Ramesh Kumar</span>
              </div>

              {/* Step 2 */}
              <div 
                onClick={() => { setUserRole('collector'); navigateTo('create_lot'); }}
                className="p-4 rounded-xl border border-gray-100 bg-[#F3F7F2]/60 hover:bg-[#E8F1EA] transition-all cursor-pointer text-center group"
              >
                <div className="w-10 h-10 rounded-full bg-[#246B4B] text-white flex items-center justify-center mx-auto mb-3 font-bold group-hover:scale-105 transition-transform">
                  2
                </div>
                <h3 className="font-bold text-sm text-gray-900">Scrap Lot</h3>
                <p className="text-xs text-gray-500 mt-1">AI vision categorizes weight & quality</p>
                <span className="text-[11px] text-[#246B4B] font-semibold mt-2 inline-block">42 kg E-Waste</span>
              </div>

              {/* Step 3 */}
              <div 
                onClick={() => { navigateTo('recycler_matching', { lotId: 'LOT-2026-0928' }); }}
                className="p-4 rounded-xl border border-gray-100 bg-[#F3F7F2]/60 hover:bg-[#E8F1EA] transition-all cursor-pointer text-center group"
              >
                <div className="w-10 h-10 rounded-full bg-[#174B36] text-white flex items-center justify-center mx-auto mb-3 font-bold group-hover:scale-105 transition-transform">
                  3
                </div>
                <h3 className="font-bold text-sm text-gray-900">Recycler</h3>
                <p className="text-xs text-gray-500 mt-1">Bids fair market rate with verified license</p>
                <span className="text-[11px] text-[#246B4B] font-semibold mt-2 inline-block">₹78/kg Best Quote</span>
              </div>

              {/* Step 4 */}
              <div 
                onClick={() => { navigateTo('handover_confirmation', { lotId: 'LOT-2026-0928' }); }}
                className="p-4 rounded-xl border border-gray-100 bg-[#F3F7F2]/60 hover:bg-[#E8F1EA] transition-all cursor-pointer text-center group"
              >
                <div className="w-10 h-10 rounded-full bg-[#246B4B] text-white flex items-center justify-center mx-auto mb-3 font-bold group-hover:scale-105 transition-transform">
                  4
                </div>
                <h3 className="font-bold text-sm text-gray-900">Handover</h3>
                <p className="text-xs text-gray-500 mt-1">Calibrated weighing & instant digital pay</p>
                <span className="text-[11px] text-[#246B4B] font-semibold mt-2 inline-block">₹3,276 Paid</span>
              </div>

              {/* Step 5 */}
              <div 
                onClick={() => { navigateTo('lot_passport'); }}
                className="p-4 rounded-xl border-2 border-[#246B4B]/30 bg-[#E8F1EA] hover:bg-[#dce9de] transition-all cursor-pointer text-center group"
              >
                <div className="w-10 h-10 rounded-full bg-[#174B36] text-white flex items-center justify-center mx-auto mb-3 font-bold group-hover:scale-105 transition-transform">
                  5
                </div>
                <h3 className="font-bold text-sm text-[#174B36]">Lot Passport</h3>
                <p className="text-xs text-gray-600 mt-1">Tamper-proof traceability certificate</p>
                <span className="text-[11px] text-[#174B36] font-bold mt-2 inline-flex items-center gap-1">
                  <QrCode className="w-3 h-3" /> View Pass
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button 
                onClick={() => navigateTo('role_select')}
                className="text-xs text-gray-500 hover:text-[#174B36] underline"
              >
                Click any stage above to test the interactive journey directly
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why ScrapSaathi Section */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
            Bridging the Informal-Formal Divide
          </h2>
          <p className="mt-3 text-[#6B7280] text-sm sm:text-base">
            Over 80% of India's recyclables pass through informal waste pickers and kabadiwalas. ScrapSaathi brings transparency, dignity, and industrial efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#D1E3D5] shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#E8F1EA] text-[#174B36] flex items-center justify-center mb-4">
              <Coins className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#111827]">Fair & Transparent Pricing</h3>
            <p className="text-sm text-[#6B7280] mt-2 leading-relaxed">
              Middlemen often cut rates arbitrarily. ScrapSaathi brings competitive bids from authorized recyclers so collectors earn up to 35% more.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#D1E3D5] shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#E8F1EA] text-[#174B36] flex items-center justify-center mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#111827]">AI Material Identification</h3>
            <p className="text-sm text-[#6B7280] mt-2 leading-relaxed">
              Low-literacy collectors can take a picture of circuit boards or plastics. The system automatically tags grade, confidence, and estimated market value.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#D1E3D5] shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#E8F1EA] text-[#174B36] flex items-center justify-center mb-4">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#111827]">Digital Lot Passport</h3>
            <p className="text-sm text-[#6B7280] mt-2 leading-relaxed">
              Provides verifiable chain-of-custody documentation required by EPR (Extended Producer Responsibility) norms and state pollution control boards.
            </p>
          </div>
        </div>
      </section>

      {/* For Collectors vs For Recyclers Dual Section */}
      <section className="py-14 bg-white border-y border-[#E8F1EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* For Collectors */}
            <div className="bg-[#F3F7F2] p-8 rounded-2xl border border-[#D1E3D5]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#174B36] text-white flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-[#246B4B]">For Informal Kabadiwalas</span>
                  <h3 className="text-xl font-bold text-[#111827]">Grow Your Daily Income</h3>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-gray-700 mb-6">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#246B4B] shrink-0 mt-0.5" />
                  <span>Simple mobile interface with Hindi audio & photo-first input</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#246B4B] shrink-0 mt-0.5" />
                  <span>Doorstep pickup requests so you don't waste fuel carting heavy scrap</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#246B4B] shrink-0 mt-0.5" />
                  <span>Instant payment via UPI or verified cash slip upon weighing</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#246B4B] shrink-0 mt-0.5" />
                  <span>Digital identity badge proving legitimate collector status</span>
                </li>
              </ul>
              <button
                onClick={() => {
                  setUserRole('collector');
                  navigateTo('collector_dashboard');
                }}
                className="w-full bg-[#174B36] hover:bg-[#246B4B] text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
              >
                Go to Collector Portal (रमेश कुमार)
              </button>
            </div>

            {/* For Recyclers */}
            <div className="bg-[#F3F7F2] p-8 rounded-2xl border border-[#D1E3D5]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#246B4B] text-white flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-[#246B4B]">For Authorized Recyclers</span>
                  <h3 className="text-xl font-bold text-[#111827]">Secure Predictable Feedstock</h3>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-gray-700 mb-6">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#246B4B] shrink-0 mt-0.5" />
                  <span>Verified scrap lots segregated by material category and origin</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#246B4B] shrink-0 mt-0.5" />
                  <span>Direct quote submission to nearby micro-collectors</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#246B4B] shrink-0 mt-0.5" />
                  <span>Automated Lot Passports meeting CPCB / GPCB regulatory compliance</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#246B4B] shrink-0 mt-0.5" />
                  <span>Traceable ESG carbon offset and landfill diversion metrics</span>
                </li>
              </ul>
              <button
                onClick={() => {
                  setUserRole('recycler');
                  navigateTo('recycler_dashboard');
                }}
                className="w-full bg-white hover:bg-[#E8F1EA] text-[#174B36] border border-[#D1E3D5] font-semibold py-2.5 rounded-xl text-sm transition-colors"
              >
                Go to Recycler Dashboard (GreenCycle)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lot Passport Showcase Banner */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#174B36] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block bg-[#246B4B] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
              Traceability Innovation
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              The Digital "Lot Passport"
            </h2>
            <p className="mt-4 text-white/80 text-sm sm:text-base leading-relaxed">
              Every scrap lot receives a verified digital identity record — logging the exact origin, collector identity, recycler registration, weighment certificate, and environmental offset score.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => navigateTo('lot_passport')}
                className="bg-white text-[#174B36] hover:bg-[#E8F1EA] font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <QrCode className="w-4 h-4 text-[#174B36]" />
                <span>View Sample Lot Passport</span>
              </button>
              <button
                onClick={() => navigateTo('role_select')}
                className="bg-white/10 hover:bg-white/20 text-white font-medium text-sm px-6 py-3 rounded-xl transition-all"
              >
                Launch Role Selection
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E8F1EA] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
          <div>
            <span className="font-bold text-[#174B36]">ScrapSaathi</span> — Built for Smart India Hackathon (SIH 2026).
            <p className="mt-0.5">Kabadiwala Connect: Bringing Informal Collectors into the Formal Circular Economy.</p>
          </div>
          <div className="flex items-center gap-4">
            <span>Prototype Demonstration Mode</span>
            <span>•</span>
            <span>Ahmedabad & Gandhinagar Pilot</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
