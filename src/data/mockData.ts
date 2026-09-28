import { ScrapLot, Recycler, LotPassportData } from '../types';

export const INITIAL_RECYCLERS: Recycler[] = [
  {
    id: 'rec-1',
    name: 'GreenCycle Recycling Solutions',
    location: 'Naroda Industrial Area, Ahmedabad',
    distanceKm: 8.4,
    isAuthorized: true,
    authorizationId: 'GPCB/HAZ/2024-9982',
    materials: ['ewaste', 'metal', 'plastic'],
    currentQuotePerKg: 78,
    rating: 4.9,
    totalLotsProcessed: 432,
    badge: 'State Certified Recycler',
  },
  {
    id: 'rec-2',
    name: 'EcoLoop Sustainable Resources',
    location: 'Changodar GIDC, Ahmedabad',
    distanceKm: 11.2,
    isAuthorized: true,
    authorizationId: 'GPCB/E-W/2023-1104',
    materials: ['ewaste', 'plastic', 'mixed'],
    currentQuotePerKg: 74,
    rating: 4.8,
    totalLotsProcessed: 289,
    badge: 'Verified Facility',
  },
  {
    id: 'rec-3',
    name: 'Urban Recycle Hub Ltd.',
    location: 'Vatva Industrial Estate, Ahmedabad',
    distanceKm: 14.5,
    isAuthorized: true,
    authorizationId: 'GPCB/HAZ/2025-4412',
    materials: ['ewaste', 'metal', 'paper', 'mixed'],
    currentQuotePerKg: 71,
    rating: 4.7,
    totalLotsProcessed: 615,
    badge: 'Bulk Processing Partner',
  },
  {
    id: 'rec-4',
    name: 'Gujarat Reclaim Works',
    location: 'Sector 28, Gandhinagar',
    distanceKm: 19.0,
    isAuthorized: true,
    authorizationId: 'GPCB/PL/2024-0043',
    materials: ['metal', 'plastic', 'glass'],
    currentQuotePerKg: 76,
    rating: 4.6,
    totalLotsProcessed: 180,
    badge: 'Govt. Empanelled',
  }
];

export const INITIAL_LOTS: ScrapLot[] = [
  {
    id: 'LOT-2026-0928',
    title: 'Mixed Electronic Waste (PCB & Peripherals)',
    materialCategory: 'ewaste',
    materialDisplay: 'Mixed E-Waste',
    materialDisplayHindi: 'मिश्रित ई-कचरा',
    weightKg: 42,
    estimatedMinVal: 3000,
    estimatedMaxVal: 3500,
    location: 'Ahmedabad, Gujarat',
    createdAt: '28 Sep 2026, 09:15 AM',
    status: 'matching',
    photoUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
    notes: 'Desktops, server circuit boards, copper coil motors, and copper wiring from local repair shops.',
    quotes: [
      {
        id: 'q-101',
        lotId: 'LOT-2026-0928',
        recyclerId: 'rec-1',
        recyclerName: 'GreenCycle Recycling Solutions',
        recyclerLocation: 'Naroda, Ahmedabad (8.4 km away)',
        pricePerKg: 78,
        estimatedTotal: 3276,
        pickupType: 'Recycler Pickup',
        pickupDate: 'Today, by 4:00 PM',
        notes: 'Doorstep EV truck collection. Instant digital payment upon weighing with calibrated scale.',
        status: 'pending'
      },
      {
        id: 'q-102',
        lotId: 'LOT-2026-0928',
        recyclerId: 'rec-2',
        recyclerName: 'EcoLoop Sustainable Resources',
        recyclerLocation: 'Changodar, Ahmedabad (11.2 km away)',
        pricePerKg: 74,
        estimatedTotal: 3108,
        pickupType: 'Recycler Pickup',
        pickupDate: 'Tomorrow, morning slot',
        notes: 'Includes free bags and immediate UPI transfer.',
        status: 'pending'
      },
      {
        id: 'q-103',
        lotId: 'LOT-2026-0928',
        recyclerId: 'rec-3',
        recyclerName: 'Urban Recycle Hub Ltd.',
        recyclerLocation: 'Vatva, Ahmedabad (14.5 km away)',
        pricePerKg: 71,
        estimatedTotal: 2982,
        pickupType: 'Self Drop-off',
        pickupDate: 'Within 48 hours',
        notes: 'Drop-off bonus voucher included.',
        status: 'pending'
      }
    ],
    aiAnalysis: {
      detectedCategory: 'E-Waste',
      detectedMaterialHindi: 'इलेक्ट्रॉनिक अपशिष्ट',
      confidence: 94,
      subMaterials: ['Printed Circuit Boards (PCB)', 'Plastic Enclosures', 'Copper Coil Wire', 'Aluminium Heat Sinks'],
      suggestedGrade: 'Grade B (Commercial High-Yield)',
      estimatedRateRange: { min: 72, max: 82 },
      samplePhotoUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80'
    }
  },
  {
    id: 'LOT-2026-0925',
    title: 'Baled PET Bottles & Metal Scrap',
    materialCategory: 'plastic',
    materialDisplay: 'Plastic & Metal',
    materialDisplayHindi: 'प्लास्टिक और धातु',
    weightKg: 68,
    estimatedMinVal: 5000,
    estimatedMaxVal: 5500,
    finalValue: 5250,
    location: 'Gandhinagar, Gujarat',
    createdAt: '25 Sep 2026, 11:30 AM',
    status: 'handover_completed',
    photoUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80',
    quotes: [],
    acceptedQuote: {
      id: 'q-095',
      lotId: 'LOT-2026-0925',
      recyclerId: 'rec-4',
      recyclerName: 'Gujarat Reclaim Works',
      recyclerLocation: 'Gandhinagar',
      pricePerKg: 77.2,
      estimatedTotal: 5250,
      pickupType: 'Recycler Pickup',
      pickupDate: '25 Sep 2026',
      notes: 'Fully processed and recycled into post-consumer polymer pellets.',
      status: 'completed'
    }
  },
  {
    id: 'LOT-2026-0920',
    title: 'Corrugated Cardboard & Office Paper',
    materialCategory: 'paper',
    materialDisplay: 'Paper & Cardboard',
    materialDisplayHindi: 'कागज एवं गत्ता',
    weightKg: 110,
    estimatedMinVal: 1500,
    estimatedMaxVal: 1800,
    finalValue: 1650,
    location: 'Ahmedabad, Gujarat',
    createdAt: '20 Sep 2026, 02:00 PM',
    status: 'handover_completed',
    photoUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=600&q=80',
    quotes: [],
    acceptedQuote: {
      id: 'q-090',
      lotId: 'LOT-2026-0920',
      recyclerId: 'rec-3',
      recyclerName: 'Urban Recycle Hub Ltd.',
      recyclerLocation: 'Vatva, Ahmedabad',
      pricePerKg: 15,
      estimatedTotal: 1650,
      pickupType: 'Recycler Pickup',
      pickupDate: '20 Sep 2026',
      notes: 'Sent to pulp reprocessing plant.',
      status: 'completed'
    }
  }
];

export const MATERIAL_CONFIGS = [
  {
    id: 'ewaste',
    name: 'E-Waste',
    hindi: 'ई-कचरा',
    rateGuide: '₹65 - ₹85 / kg',
    icon: 'Cpu',
    description: 'PCBs, motors, phone boards, wires, consumer tech',
    bgLight: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    defaultImg: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'plastic',
    name: 'Plastic',
    hindi: 'प्लास्टिक',
    rateGuide: '₹22 - ₹36 / kg',
    icon: 'Package',
    description: 'PET bottles, HDPE cans, PP hard plastics, films',
    bgLight: 'bg-blue-50 text-blue-800 border-blue-200',
    defaultImg: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'metal',
    name: 'Metal',
    hindi: 'धातु (लोहा/तांबा)',
    rateGuide: '₹34 - ₹480 / kg',
    icon: 'Wrench',
    description: 'Iron, Aluminium, Copper scrap, brass fittings',
    bgLight: 'bg-amber-50 text-amber-800 border-amber-200',
    defaultImg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'paper',
    name: 'Paper',
    hindi: 'कागज व रद्दी',
    rateGuide: '₹14 - ₹19 / kg',
    icon: 'FileText',
    description: 'Cardboard boxes, white paper, newspapers, kraft',
    bgLight: 'bg-orange-50 text-orange-800 border-orange-200',
    defaultImg: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'glass',
    name: 'Glass',
    hindi: 'कांच',
    rateGuide: '₹4 - ₹8 / kg',
    icon: 'Wine',
    description: 'Cullet glass, intact beverage bottles, sheet glass',
    bgLight: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    defaultImg: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'mixed',
    name: 'Mixed Scrap',
    hindi: 'मिश्रित कबाड़',
    rateGuide: '₹18 - ₹45 / kg',
    icon: 'Layers',
    description: 'Unsorted dry recovery waste requiring segregation',
    bgLight: 'bg-slate-50 text-slate-800 border-slate-200',
    defaultImg: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80'
  }
];

export const DEMO_COLLECTOR = {
  name: 'Ramesh Kumar',
  nameHindi: 'रमेश कुमार',
  phone: '+91 98250 44912',
  location: 'Becharaji / Ashram Road Area, Ahmedabad',
  id: 'COL-GJ-0914',
  memberSince: 'Oct 2024',
  badge: 'Certified Saathi Collector',
  stats: {
    activeLots: 1,
    completedLots: 14,
    totalEarnings: 8450,
    pendingQuotes: 3
  }
};

export const DEMO_PASSPORT: LotPassportData = {
  passportNumber: 'PASS-2026-0928-GJ',
  lotId: 'LOT-2026-0928',
  material: 'Mixed E-Waste (High Yield)',
  weightKg: 42,
  origin: 'Ahmedabad, Gujarat, IN',
  collectorName: 'Ramesh Kumar (Saathi ID #0914)',
  collectorId: 'COL-GJ-0914',
  recyclerName: 'GreenCycle Recycling Solutions',
  recyclerRegNo: 'GPCB/HAZ/2024-9982',
  handoverDate: '28 Sep 2026',
  finalAmount: 3276,
  co2SavedKg: 89.4,
  landfillDivertedKg: 42,
  timeline: [
    {
      stage: 'Lot Created & Weighed',
      stageHindi: 'लॉट दर्ज किया गया',
      timestamp: '28 Sep 2026, 09:15 AM',
      completed: true,
      actor: 'Ramesh Kumar (Collector)',
      hash: '0x8f2a...c4b1'
    },
    {
      stage: 'AI Material Vision Categorization',
      stageHindi: 'एआई सामग्री पहचान',
      timestamp: '28 Sep 2026, 09:16 AM',
      completed: true,
      actor: 'ScrapSaathi Vision Engine v2.4 (94% confidence)',
      hash: '0x3c99...e21a'
    },
    {
      stage: 'Verified Recycler Matched',
      stageHindi: 'अधिकृत पुनर्चक्रणकर्ता मिला',
      timestamp: '28 Sep 2026, 09:22 AM',
      completed: true,
      actor: 'GreenCycle Recycling (Authorized GPCB)',
      hash: '0x71ba...93fd'
    },
    {
      stage: 'Digital Quote Accepted (₹78/kg)',
      stageHindi: 'भाव स्वीकृत (₹3,276 कुल)',
      timestamp: '28 Sep 2026, 09:30 AM',
      completed: true,
      actor: 'Both Parties (Digital Signature)',
      hash: '0x49e0...b85c'
    },
    {
      stage: 'Physical Handover & Quality Verification',
      stageHindi: 'कबाड़ सुपुर्दगी एवं सत्यापन',
      timestamp: '28 Sep 2026, 09:50 AM',
      completed: true,
      actor: 'Collection Agent: Vikram Patel (EV Van #GJ-01-ET-4819)',
      hash: '0x12ae...ff88'
    },
    {
      stage: 'Formal Chain-of-Custody Recycling Confirmation',
      stageHindi: 'पुनर्चक्रण प्रमाणपत्र तैयार',
      timestamp: 'Scheduled: 29 Sep 2026',
      completed: false,
      actor: 'GreenCycle Smelting & Extraction Hub',
      hash: 'Pending Batch Processing'
    }
  ]
};
