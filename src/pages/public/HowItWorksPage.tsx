import React from 'react';
import { Link } from 'react-router-dom';
import { PillButton } from '../../components/ui/PillButton';
import { EditorialCard } from '../../components/ui/EditorialCard';
import { 
  ArrowRight, 
  Package, 
  Cpu, 
  Search, 
  FileCheck2, 
  Truck, 
  QrCode, 
  ShieldCheck 
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Aggregate & Catalog Lot',
      hindi: 'कबाड़ लॉट तैयार करें',
      desc: 'Informal collectors collect secondary material (PCBs, plastics, alloys, paper) and declare estimated mass.',
      icon: <Package className="w-6 h-6 text-[#0d5b3b]" />
    },
    {
      num: '02',
      title: 'AI Material Vision Appraisal',
      hindi: 'एआई सामग्री पहचान',
      desc: 'Our computer vision engine scans uploaded photographs to detect polymer sub-types, metals, and market yield grades.',
      icon: <Cpu className="w-6 h-6 text-[#0d5b3b]" />
    },
    {
      num: '03',
      title: 'Smart Recycler Matching',
      hindi: 'अधिकृत पुनर्चक्रणकर्ता मिलान',
      desc: 'The matching algorithm connects the lot with authorized recycling facilities within the operating service radius.',
      icon: <Search className="w-6 h-6 text-[#0d5b3b]" />
    },
    {
      num: '04',
      title: 'Competitive Bids & Quote Acceptance',
      hindi: 'भाव प्रस्ताव एवं स्वीकृति',
      desc: 'Recyclers submit transparent per-kg offers with doorstep collection terms. Collectors choose the highest bid.',
      icon: <FileCheck2 className="w-6 h-6 text-[#0d5b3b]" />
    },
    {
      num: '05',
      title: 'Dual-Confirmed Handover',
      hindi: 'सुपुर्दगी एवं दोहरा सत्यापन',
      desc: 'Both parties confirm calibrated weight on-site. Instant digital settlement is processed via UPI.',
      icon: <Truck className="w-6 h-6 text-[#0d5b3b]" />
    },
    {
      num: '06',
      title: 'Digital Lot Passport Issued',
      hindi: 'डिजिटल लॉट पासपोर्ट',
      desc: 'An immutable chain-of-custody passport with QR verification is generated for state regulatory and EPR compliance.',
      icon: <QrCode className="w-6 h-6 text-[#0d5b3b]" />
    }
  ];

  return (
    <div className="bg-[#f2ffe3] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-editorial mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-[#0d5b3b]">
            End-To-End Architecture
          </span>
          <h1 className="font-serif font-light text-5xl sm:text-6xl text-[#083a26]">
            How ScrapSaathi Works
          </h1>
          <p className="text-[#526061] text-base leading-relaxed">
            Bridging informal waste pickers and authorized industrial recyclers into a single transparent, documented supply network.
          </p>
        </div>

        {/* 6 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map(step => (
            <EditorialCard key={step.num} className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#f2ffe3] border border-[#cccccc] flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="font-serif text-3xl font-light text-[#838676]">
                    {step.num}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-normal text-[#083a26]">
                  {step.title}
                </h3>
                <span className="text-xs text-[#0d5b3b] font-semibold block mt-0.5">
                  {step.hindi}
                </span>
                <p className="text-xs text-[#526061] mt-3 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </EditorialCard>
          ))}
        </div>

        {/* Call to action */}
        <div className="bg-white rounded-[24px] p-8 sm:p-12 border border-[#e5e5e5] text-center max-w-2xl mx-auto shadow-editorial space-y-4">
          <h2 className="font-serif text-3xl text-[#083a26]">
            Ready to test the live journey?
          </h2>
          <p className="text-xs text-[#526061]">
            Experience the flow as a Collector creating a lot or as an Authorized Recycler submitting competitive bids.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link to="/signup">
              <PillButton variant="primary">Get Started Now</PillButton>
            </Link>
            <Link to="/passport/LOT-2026-000184">
              <PillButton variant="secondary">View Sample Passport</PillButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
