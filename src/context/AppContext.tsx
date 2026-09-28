import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ScrapLot, Recycler, Quote, LotPassportData, MaterialCategory, AIAnalysis } from '../types';
import { INITIAL_LOTS, INITIAL_RECYCLERS, DEMO_COLLECTOR, DEMO_PASSPORT } from '../data/mockData';

export type ScreenName = 
  | 'landing' 
  | 'role_select' 
  | 'collector_dashboard' 
  | 'create_lot' 
  | 'lot_details' 
  | 'recycler_matching' 
  | 'quote_details' 
  | 'handover_confirmation' 
  | 'lot_passport' 
  | 'recycler_dashboard';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface AppContextType {
  screen: ScreenName;
  setScreen: (screen: ScreenName) => void;
  userRole: 'collector' | 'recycler';
  setUserRole: (role: 'collector' | 'recycler') => void;
  lots: ScrapLot[];
  selectedLotId: string;
  setSelectedLotId: (id: string) => void;
  selectedLot: ScrapLot | undefined;
  selectedQuoteId: string | null;
  setSelectedQuoteId: (id: string | null) => void;
  selectedQuote: Quote | undefined;
  recyclers: Recycler[];
  passportData: LotPassportData;
  notifications: Notification[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  language: 'en' | 'hi';
  toggleLanguage: () => void;
  navigateTo: (targetScreen: ScreenName, params?: { lotId?: string; quoteId?: string }) => void;
  createNewLot: (lot: {
    materialCategory: MaterialCategory;
    materialDisplay: string;
    materialDisplayHindi: string;
    weightKg: number;
    location: string;
    photoUrl: string;
    notes?: string;
    aiAnalysis?: AIAnalysis;
  }) => string;
  acceptQuote: (quoteId: string) => void;
  completeHandover: (lotId: string) => void;
  sendRecyclerQuote: (lotId: string, pricePerKg: number, pickupType: 'Recycler Pickup' | 'Self Drop-off') => void;
  resetDemo: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [screen, setScreen] = useState<ScreenName>('landing');
  const [userRole, setUserRole] = useState<'collector' | 'recycler'>('collector');
  const [lots, setLots] = useState<ScrapLot[]>(INITIAL_LOTS);
  const [selectedLotId, setSelectedLotId] = useState<string>('LOT-2026-0928');
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>('q-101');
  const [recyclers] = useState<Recycler[]>(INITIAL_RECYCLERS);
  const [passportData, setPassportData] = useState<LotPassportData>(DEMO_PASSPORT);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const selectedLot = lots.find(l => l.id === selectedLotId) || lots[0];
  const selectedQuote = selectedLot?.quotes?.find(q => q.id === selectedQuoteId) || selectedLot?.quotes?.[0];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3800);
  };

  const navigateTo = (targetScreen: ScreenName, params?: { lotId?: string; quoteId?: string }) => {
    if (params?.lotId) {
      setSelectedLotId(params.lotId);
    }
    if (params?.quoteId) {
      setSelectedQuoteId(params.quoteId);
    }
    setScreen(targetScreen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const createNewLot = (data: {
    materialCategory: MaterialCategory;
    materialDisplay: string;
    materialDisplayHindi: string;
    weightKg: number;
    location: string;
    photoUrl: string;
    notes?: string;
    aiAnalysis?: AIAnalysis;
  }): string => {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0].replace(/-/g, '');
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const newLotId = `LOT-${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}${randomSuffix.toString().slice(-2)}`;
    
    // Auto calculate baseline rates
    let minRate = 20;
    let maxRate = 35;
    if (data.materialCategory === 'ewaste') { minRate = 70; maxRate = 85; }
    else if (data.materialCategory === 'metal') { minRate = 45; maxRate = 120; }
    else if (data.materialCategory === 'plastic') { minRate = 25; maxRate = 38; }
    else if (data.materialCategory === 'paper') { minRate = 14; maxRate = 18; }
    else if (data.materialCategory === 'glass') { minRate = 5; maxRate = 9; }

    const estMin = Math.round(data.weightKg * minRate);
    const estMax = Math.round(data.weightKg * maxRate);

    // Generate matched quotes automatically for this new lot from our recyclers
    const generatedQuotes: Quote[] = recyclers.map((rec, idx) => {
      const pPerKg = Math.round(minRate + (maxRate - minRate) * (0.8 - idx * 0.08));
      return {
        id: `q-auto-${Date.now()}-${idx}`,
        lotId: newLotId,
        recyclerId: rec.id,
        recyclerName: rec.name,
        recyclerLocation: `${rec.location} (${rec.distanceKm} km away)`,
        pricePerKg: pPerKg,
        estimatedTotal: pPerKg * data.weightKg,
        pickupType: idx % 2 === 0 ? 'Recycler Pickup' : 'Self Drop-off',
        pickupDate: 'Today, within 3 hours',
        notes: 'Doorstep weighing with digital scale, instant UPI payout.',
        status: 'pending'
      };
    });

    const newLot: ScrapLot = {
      id: newLotId,
      title: `${data.materialDisplay} Scrap Batch`,
      materialCategory: data.materialCategory,
      materialDisplay: data.materialDisplay,
      materialDisplayHindi: data.materialDisplayHindi,
      weightKg: data.weightKg,
      estimatedMinVal: estMin,
      estimatedMaxVal: estMax,
      location: data.location || 'Ahmedabad, Gujarat',
      createdAt: 'Just now',
      status: 'matching',
      photoUrl: data.photoUrl,
      notes: data.notes,
      quotes: generatedQuotes,
      aiAnalysis: data.aiAnalysis
    };

    setLots(prev => [newLot, ...prev]);
    setSelectedLotId(newLotId);
    showToast(`Lot ${newLotId} created with ${generatedQuotes.length} recycler matches!`, 'success');
    return newLotId;
  };

  const acceptQuote = (quoteId: string) => {
    setLots(prev => prev.map(lot => {
      if (lot.id === selectedLotId) {
        const foundQuote = lot.quotes?.find(q => q.id === quoteId);
        if (foundQuote) {
          const updatedQuote: Quote = { ...foundQuote, status: 'accepted' };
          return {
            ...lot,
            status: 'quote_accepted',
            acceptedQuote: updatedQuote,
            finalValue: updatedQuote.estimatedTotal
          };
        }
      }
      return lot;
    }));
    setSelectedQuoteId(quoteId);
    showToast('Quote accepted! Handover is now scheduled.', 'success');
  };

  const completeHandover = (lotId: string) => {
    const lot = lots.find(l => l.id === lotId) || selectedLot;
    const acceptedQ = lot?.acceptedQuote || lot?.quotes?.[0];
    const finalAmount = acceptedQ?.estimatedTotal || 3276;
    const recyclerName = acceptedQ?.recyclerName || 'GreenCycle Recycling Solutions';

    setLots(prev => prev.map(l => {
      if (l.id === lotId) {
        return {
          ...l,
          status: 'handover_completed',
          finalValue: finalAmount
        };
      }
      return l;
    }));

    // Update passport
    const newPassport: LotPassportData = {
      passportNumber: `PASS-2026-${lotId.replace('LOT-', '')}-GJ`,
      lotId: lotId,
      material: lot?.materialDisplay || 'Mixed E-Waste',
      weightKg: lot?.weightKg || 42,
      origin: lot?.location || 'Ahmedabad, Gujarat, IN',
      collectorName: `${DEMO_COLLECTOR.name} (Saathi ID #${DEMO_COLLECTOR.id})`,
      collectorId: DEMO_COLLECTOR.id,
      recyclerName: recyclerName,
      recyclerRegNo: 'GPCB/HAZ/2024-9982',
      handoverDate: '28 Sep 2026',
      finalAmount: finalAmount,
      co2SavedKg: Math.round((lot?.weightKg || 42) * 2.13),
      landfillDivertedKg: lot?.weightKg || 42,
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
          actor: `${recyclerName} (Authorized)`,
          hash: '0x71ba...93fd'
        },
        {
          stage: `Digital Quote Accepted (₹${acceptedQ?.pricePerKg || 78}/kg)`,
          stageHindi: 'भाव स्वीकृत',
          timestamp: '28 Sep 2026, 09:30 AM',
          completed: true,
          actor: 'Both Parties (Digital Signature)',
          hash: '0x49e0...b85c'
        },
        {
          stage: 'Physical Handover & Verification',
          stageHindi: 'कबाड़ सुपुर्दगी एवं सत्यापन संपन्न',
          timestamp: '28 Sep 2026, 10:00 AM',
          completed: true,
          actor: 'Authorized Collection Van (#GJ-01-ET-4819)',
          hash: '0x12ae...ff88'
        },
        {
          stage: 'Formal Chain-of-Custody Recycling Confirmation',
          stageHindi: 'पुनर्चक्रण प्रमाणपत्र तैयार',
          timestamp: 'Processing Batch Scheduled',
          completed: false,
          actor: 'Certified Smelting & Extraction Hub',
          hash: 'Pending Batch Processing'
        }
      ]
    };

    setPassportData(newPassport);
    showToast('Handover completed! Lot Passport generated.', 'success');
  };

  const sendRecyclerQuote = (lotId: string, pricePerKg: number, pickupType: 'Recycler Pickup' | 'Self Drop-off') => {
    setLots(prev => prev.map(lot => {
      if (lot.id === lotId) {
        const newQuote: Quote = {
          id: `q-rec-${Date.now()}`,
          lotId,
          lotNumber: lot.lotNumber || lot.id,
          recyclerId: 'rec-1',
          recyclerName: 'GreenCycle Recycling Solutions',
          recyclerLocation: 'Naroda Industrial Area, Ahmedabad',
          pricePerKg,
          estimatedTotal: Math.round(pricePerKg * lot.weightKg),
          pickupType,
          pickupDate: 'Today by 5:00 PM',
          validUntil: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
          notes: 'Official quote sent by GreenCycle facility manager.',
          status: 'pending',
          createdAt: new Date().toISOString()
        };
        return {
          ...lot,
          quotes: [newQuote, ...(lot.quotes || [])]
        };
      }
      return lot;
    }));
    showToast(`Quote of ₹${pricePerKg}/kg submitted to collector!`, 'success');
  };

  const resetDemo = () => {
    setLots(INITIAL_LOTS);
    setSelectedLotId('LOT-2026-0928');
    setSelectedQuoteId('q-101');
    setPassportData(DEMO_PASSPORT);
    showToast('Demo data reset to default state.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        screen,
        setScreen,
        userRole,
        setUserRole,
        lots,
        selectedLotId,
        setSelectedLotId,
        selectedLot,
        selectedQuoteId,
        setSelectedQuoteId,
        selectedQuote,
        recyclers,
        passportData,
        notifications,
        showToast,
        language,
        toggleLanguage,
        navigateTo,
        createNewLot,
        acceptQuote,
        completeHandover,
        sendRecyclerQuote,
        resetDemo
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
