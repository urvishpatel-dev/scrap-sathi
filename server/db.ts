import bcrypt from 'bcryptjs';
import { 
  User, 
  ScrapLot, 
  Quote, 
  Handover, 
  LotEvent, 
  Notification, 
  InventoryItem, 
  Dispute, 
  AuditLog, 
  RecyclerProfile 
} from '../src/types';

// In-Memory Database store with production schema structures
export class DatabaseStore {
  users: Map<string, User & { passwordHash: string; otpCode?: string; otpExpiresAt?: number; otpAttempts?: number }> = new Map();
  lots: Map<string, ScrapLot> = new Map();
  quotes: Map<string, Quote> = new Map();
  handovers: Map<string, Handover> = new Map();
  lotEvents: LotEvent[] = []; // Append-only immutable log
  notifications: Notification[] = [];
  inventory: InventoryItem[] = [];
  disputes: Dispute[] = [];
  auditLogs: AuditLog[] = [];

  constructor() {
    this.seedInitialData();
  }

  private seedInitialData() {
    const salt = bcrypt.genSaltSync(10);

    // 1. Demo Collector: Ramesh Kumar
    const collectorId = 'usr-col-001';
    this.users.set(collectorId, {
      id: collectorId,
      email: 'collector@demo.scrapsaathi.local',
      phone: '+91 98250 44912',
      role: 'COLLECTOR',
      status: 'ACTIVE',
      isEmailVerified: true,
      isPhoneVerified: true,
      createdAt: '2026-08-15T09:00:00Z',
      updatedAt: '2026-09-28T09:00:00Z',
      passwordHash: bcrypt.hashSync('Saathi@2026', salt),
      collectorProfile: {
        name: 'Ramesh Kumar',
        nameHindi: 'रमेश कुमार',
        city: 'Ahmedabad',
        locality: 'Ashram Road / Vadaj Area',
        preferredLanguage: 'hi',
        preferredCategories: ['ewaste', 'metal', 'plastic'],
        totalEarnings: 8450,
        completedLots: 14,
        activeLots: 2,
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
      }
    });

    // 2. Demo Recycler: GreenCycle Recycling Solutions
    const recyclerId = 'usr-rec-001';
    this.users.set(recyclerId, {
      id: recyclerId,
      email: 'recycler@demo.scrapsaathi.local',
      phone: '+91 79 2280 4411',
      role: 'RECYCLER',
      status: 'ACTIVE',
      isEmailVerified: true,
      isPhoneVerified: true,
      createdAt: '2026-07-10T10:00:00Z',
      updatedAt: '2026-09-28T10:00:00Z',
      passwordHash: bcrypt.hashSync('Recycle@2026', salt),
      recyclerProfile: {
        organizationName: 'GreenCycle Recycling Solutions',
        contactPerson: 'Sanjay Shah (Facility Lead)',
        address: 'Plot 48, Phase II, Naroda GIDC',
        city: 'Ahmedabad',
        serviceRadiusKm: 25,
        materialsHandled: ['ewaste', 'metal', 'plastic'],
        verificationStatus: 'VERIFIED',
        gpcbLicenseNo: 'GPCB/HAZ/2024-9982',
        rating: 4.9,
        totalProcuredKg: 14850,
        logoUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=200&q=80'
      }
    });

    // 3. Demo Admin: Compliance & Operations Officer
    const adminId = 'usr-adm-001';
    this.users.set(adminId, {
      id: adminId,
      email: 'admin@demo.scrapsaathi.local',
      phone: '+91 99090 12345',
      role: 'ADMIN',
      status: 'ACTIVE',
      isEmailVerified: true,
      isPhoneVerified: true,
      createdAt: '2026-06-01T08:00:00Z',
      updatedAt: '2026-09-28T08:00:00Z',
      passwordHash: bcrypt.hashSync('Admin@2026', salt)
    });

    // Seed Lots
    const lot1Id = 'lot-internal-001';
    this.lots.set(lot1Id, {
      id: lot1Id,
      lotNumber: 'LOT-2026-000184',
      collectorId: collectorId,
      collectorName: 'Ramesh Kumar',
      collectorPhone: '+91 98250 44912',
      materialCategory: 'ewaste',
      materialDisplay: 'Mixed Electronic Waste',
      materialDisplayHindi: 'मिश्रित ई-कचरा',
      weightKg: 42,
      photos: ['https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80'],
      location: 'Ahmedabad, Gujarat',
      aiClassification: {
        category: 'ewaste',
        categoryDisplay: 'E-Waste',
        categoryHindi: 'इलेक्ट्रॉनिक अपशिष्ट',
        confidence: 94,
        possibleMaterials: ['Printed Circuit Boards (PCB)', 'Plastic Enclosures', 'Copper Coil Wire'],
        suggestedGrade: 'Commercial High-Yield B',
        estimatedRateRange: { min: 72, max: 82 },
        samplePhotoUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
        isMockProvider: true,
        notes: 'AI-assisted classification: High precious metal trace indicators on circuit boards.'
      },
      aiConfidence: 94,
      estimatedMinValue: 3000,
      estimatedMaxValue: 3500,
      status: 'QUOTED',
      notes: 'Server motherboards, power supplies, desktop cabling from local repair shops.',
      createdAt: '2026-09-28T09:15:00Z',
      updatedAt: '2026-09-28T09:30:00Z'
    });

    // Append-only lot event history
    this.lotEvents.push(
      {
        id: 'evt-001',
        lotId: lot1Id,
        lotNumber: 'LOT-2026-000184',
        type: 'LOT_CREATED',
        actorId: collectorId,
        actorName: 'Ramesh Kumar',
        actorRole: 'COLLECTOR',
        metadata: { weightKg: 42, material: 'ewaste' },
        timestamp: '2026-09-28T09:15:00Z',
        hash: '0x8f2a6b7c9e1d44a2'
      },
      {
        id: 'evt-002',
        lotId: lot1Id,
        lotNumber: 'LOT-2026-000184',
        type: 'AI_CLASSIFIED',
        actorId: 'system-ai',
        actorName: 'ScrapSaathi Vision Engine v2.4',
        actorRole: 'SYSTEM',
        metadata: { confidence: 94, grade: 'Grade B' },
        timestamp: '2026-09-28T09:16:00Z',
        hash: '0x3c99e21ab74510aa'
      },
      {
        id: 'evt-003',
        lotId: lot1Id,
        lotNumber: 'LOT-2026-000184',
        type: 'LOT_PUBLISHED',
        actorId: collectorId,
        actorName: 'Ramesh Kumar',
        actorRole: 'COLLECTOR',
        metadata: { status: 'MATCHING' },
        timestamp: '2026-09-28T09:17:00Z',
        hash: '0x71ba93fd225e68bc'
      }
    );

    // Seed Quotes
    const quote1Id = 'quote-001';
    this.quotes.set(quote1Id, {
      id: quote1Id,
      lotId: lot1Id,
      lotNumber: 'LOT-2026-000184',
      recyclerId: recyclerId,
      recyclerName: 'GreenCycle Recycling Solutions',
      recyclerLocation: 'Naroda GIDC, Ahmedabad (8.4 km away)',
      pricePerKg: 78,
      estimatedTotal: 3276,
      pickupType: 'Recycler Pickup',
      pickupDate: 'Today, by 4:00 PM',
      validUntil: '2026-09-29T18:00:00Z',
      notes: 'Calibrated scale on doorstep EV vehicle. Instant UPI transfer upon weighment.',
      status: 'PENDING',
      createdAt: '2026-09-28T09:25:00Z'
    });

    // Seed Recycler Inventory
    this.inventory.push({
      id: 'inv-001',
      recyclerId: recyclerId,
      category: 'ewaste',
      quantityKg: 320,
      sourceLotNumber: 'LOT-2026-000140',
      acquisitionDate: '2026-09-24',
      status: 'PROCESSING'
    });

    // Seed Notifications
    this.notifications.push(
      {
        id: 'notif-001',
        userId: collectorId,
        type: 'QUOTE_RECEIVED',
        title: 'New Recycler Bid: ₹78/kg',
        message: 'GreenCycle Recycling has submitted an official quote for your 42 kg E-Waste lot.',
        link: '/app/collector/offers',
        isRead: false,
        createdAt: '2026-09-28T09:26:00Z'
      }
    );

    // Seed Audit Log
    this.auditLogs.push({
      id: 'audit-001',
      action: 'SYSTEM_INITIALIZATION',
      actorId: 'system',
      actorRole: 'SYSTEM',
      targetEntity: 'PLATFORM',
      targetId: 'root',
      timestamp: '2026-09-28T00:00:00Z',
      metadata: { environment: 'production-prototype' }
    });
  }
}

export const db = new DatabaseStore();
