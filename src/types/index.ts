export type UserRole = 'COLLECTOR' | 'RECYCLER' | 'ADMIN';

export type AccountStatus = 'ACTIVE' | 'PENDING_VERIFICATION' | 'SUSPENDED';

export type RecyclerVerificationStatus = 'PENDING' | 'VERIFIED' | 'REJECTED' | 'SUSPENDED';

export type MaterialCategory = 'plastic' | 'metal' | 'paper' | 'glass' | 'ewaste' | 'mixed';

export type LotStatus =
  | 'DRAFT'
  | 'PUBLISHED'
  | 'MATCHING'
  | 'QUOTED'
  | 'QUOTE_ACCEPTED'
  | 'HANDOVER_SCHEDULED'
  | 'HANDOVER_COMPLETED'
  | 'RECYCLING_CONFIRMED'
  | 'CANCELLED'
  | 'DISPUTED'
  | 'created'
  | 'matching'
  | 'quote_received'
  | 'quote_accepted'
  | 'handover_scheduled'
  | 'handover_completed'
  | 'recycled';

export type QuoteStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'EXPIRED'
  | 'WITHDRAWN'
  | 'pending'
  | 'accepted'
  | 'completed';

export type HandoverStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'DISPUTED' | 'CANCELLED';

export type DisputeStatus = 'OPEN' | 'UNDER_REVIEW' | 'RESOLVED' | 'REJECTED';

export type NotificationType =
  | 'QUOTE_RECEIVED'
  | 'QUOTE_ACCEPTED'
  | 'HANDOVER_SCHEDULED'
  | 'HANDOVER_REMINDER'
  | 'HANDOVER_COMPLETED'
  | 'LOT_MATCHED'
  | 'PASSPORT_UPDATED'
  | 'ACCOUNT_VERIFIED'
  | 'SECURITY_ALERT';

export type LotEventType =
  | 'LOT_CREATED'
  | 'AI_CLASSIFIED'
  | 'LOT_PUBLISHED'
  | 'QUOTE_RECEIVED'
  | 'QUOTE_ACCEPTED'
  | 'HANDOVER_SCHEDULED'
  | 'HANDOVER_CONFIRMED'
  | 'RECYCLING_CONFIRMED'
  | 'DISPUTE_RAISED';

export interface User {
  id: string;
  email: string;
  phone: string;
  role: UserRole;
  status: AccountStatus;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
  collectorProfile?: CollectorProfile;
  recyclerProfile?: RecyclerProfile;
}

export interface CollectorProfile {
  name: string;
  nameHindi?: string;
  city: string;
  locality: string;
  preferredLanguage: 'en' | 'hi' | 'gu';
  preferredCategories: MaterialCategory[];
  totalEarnings: number;
  completedLots: number;
  activeLots: number;
  avatarUrl?: string;
}

export interface RecyclerProfile {
  organizationName: string;
  contactPerson: string;
  address: string;
  city: string;
  serviceRadiusKm: number;
  materialsHandled: MaterialCategory[];
  verificationStatus: RecyclerVerificationStatus;
  gpcbLicenseNo?: string;
  rating: number;
  totalProcuredKg: number;
  logoUrl?: string;
}

export interface AIClassificationResult {
  category?: MaterialCategory;
  categoryDisplay?: string;
  categoryHindi?: string;
  confidence: number;
  possibleMaterials?: string[];
  suggestedGrade?: string;
  estimatedRateRange?: { min: number; max: number };
  samplePhotoUrl?: string;
  isMockProvider?: boolean;
  notes?: string;
  // Compatibility
  detectedCategory?: string;
  detectedMaterialHindi?: string;
  subMaterials?: string[];
}

export type AIAnalysis = AIClassificationResult;

export interface PriceEstimate {
  material: MaterialCategory;
  weightKg: number;
  location: string;
  estimatedMin: number;
  estimatedMax: number;
  currency: string;
  source: string;
  timestamp: string;
}

export interface ScrapLot {
  id: string;
  lotNumber?: string;
  collectorId?: string;
  collectorName?: string;
  collectorPhone?: string;
  materialCategory: MaterialCategory;
  materialDisplay: string;
  materialDisplayHindi: string;
  weightKg: number;
  photos?: string[];
  location: string;
  aiClassification?: AIClassificationResult;
  aiConfidence?: number;
  estimatedMinValue?: number;
  estimatedMaxValue?: number;
  status: LotStatus;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
  quotes?: Quote[];
  acceptedQuoteId?: string;
  handoverId?: string;

  // Compatibility fields for prototype components
  title?: string;
  photoUrl?: string;
  finalValue?: number;
  estimatedMinVal?: number;
  estimatedMaxVal?: number;
  acceptedQuote?: Quote;
  aiAnalysis?: any;
}

export interface Quote {
  id: string;
  lotId: string;
  lotNumber?: string;
  recyclerId: string;
  recyclerName: string;
  recyclerLocation: string;
  pricePerKg: number;
  estimatedTotal: number;
  pickupType: 'Recycler Pickup' | 'Self Drop-off';
  pickupDate: string;
  validUntil?: string;
  notes: string;
  status: QuoteStatus;
  createdAt?: string;
}

export interface Handover {
  id: string;
  lotId: string;
  lotNumber: string;
  collectorId: string;
  collectorName: string;
  recyclerId: string;
  recyclerName: string;
  scheduledAt: string;
  location: string;
  status: HandoverStatus;
  collectorConfirmation: boolean;
  recyclerConfirmation: boolean;
  calibratedWeightKg?: number;
  finalSettledAmount?: number;
  evidencePhotoUrl?: string;
  createdAt: string;
  completedAt?: string;
}

export interface LotEvent {
  id: string;
  lotId: string;
  lotNumber: string;
  type: LotEventType;
  actorId: string;
  actorName: string;
  actorRole: UserRole | 'SYSTEM';
  metadata: Record<string, any>;
  timestamp: string;
  hash: string;
}

export interface LotPassportPublic {
  passportNumber: string;
  lotNumber: string;
  material: string;
  weightKg: number;
  originCity: string;
  collectorPublicId: string;
  recyclerPublicName: string;
  handoverDate: string;
  finalStatus: string;
  co2SavedKg: number;
  landfillDivertedKg: number;
  events: {
    stage: string;
    stageHindi: string;
    timestamp: string;
    actorRole: string;
    hash: string;
  }[];
  isPrototype: boolean;
  verifiedTimestamp: string;
}

export interface LotPassportData {
  passportNumber: string;
  lotId: string;
  material: string;
  weightKg: number;
  origin: string;
  collectorName: string;
  collectorId: string;
  recyclerName: string;
  recyclerRegNo: string;
  handoverDate: string;
  finalAmount: number;
  co2SavedKg: number;
  landfillDivertedKg: number;
  timeline: {
    stage: string;
    stageHindi: string;
    timestamp: string;
    completed: boolean;
    actor: string;
    hash: string;
  }[];
}

export interface Recycler {
  id: string;
  name: string;
  location: string;
  distanceKm: number;
  isAuthorized: boolean;
  authorizationId: string;
  materials: MaterialCategory[];
  currentQuotePerKg: number;
  rating: number;
  totalLotsProcessed: number;
  badge: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export interface InventoryItem {
  id: string;
  recyclerId: string;
  category: MaterialCategory;
  quantityKg: number;
  sourceLotNumber: string;
  acquisitionDate: string;
  status: 'IN_STOCK' | 'PROCESSING' | 'EXTRACTED_RECYCLED';
}

export interface Dispute {
  id: string;
  lotId: string;
  lotNumber: string;
  reportedByUserId: string;
  reportedByRole: UserRole;
  reason: 'INCORRECT_WEIGHT' | 'PAYMENT_ISSUE' | 'MATERIAL_MISMATCH' | 'HANDOVER_ISSUE' | 'OTHER';
  details: string;
  evidenceUrl?: string;
  status: DisputeStatus;
  adminNotes?: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface AuditLog {
  id: string;
  action: string;
  actorId: string;
  actorRole: string;
  targetEntity: string;
  targetId: string;
  ipAddress?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}
