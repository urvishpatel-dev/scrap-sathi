import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from './db';
import { aiService } from './services/aiService';
import { priceEstimationService } from './services/priceEstimationService';
import { matchingService } from './services/matchingService';
import { 
  User, 
  ScrapLot, 
  Quote, 
  Handover, 
  LotEvent, 
  Notification, 
  Dispute,
  LotPassportPublic 
} from '../src/types';

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'scrapsaathi_super_secure_jwt_secret_dev_2026';

// Structured logging & Request tracking
app.use((req: Request, res: Response, next: NextFunction) => {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const start = Date.now();
  req.headers['x-request-id'] = requestId;

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[API ${req.method}] ${req.originalUrl} | Status: ${res.statusCode} | Duration: ${duration}ms | ReqId: ${requestId}`);
  });
  next();
});

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'ScrapSaathi Master API', timestamp: new Date().toISOString() });
});

// In-Memory Rate Limiting for sensitive auth routes
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();
const authRateLimiter = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || '127.0.0.1';
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (entry && entry.expiresAt > now) {
    if (entry.count >= 15) {
      return res.status(429).json({ error: 'Too many requests. Please try again in 1 minute.' });
    }
    entry.count += 1;
  } else {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + 60000 });
  }
  next();
};

// ==========================================
// AUTHENTICATION MIDDLEWARE
// ==========================================
export interface AuthenticatedRequest extends Request {
  user?: User;
}

export const requireAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required. Missing Bearer token.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
    const user = db.users.get(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'Invalid session or user not found.' });
    }
    if (user.status === 'SUSPENDED') {
      return res.status(403).json({ error: 'Account suspended. Please contact platform administration.' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

export const requireRole = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: `Access restricted. This endpoint requires one of: ${roles.join(', ')}.` 
      });
    }
    next();
  };
};

// ==========================================
// 1. AUTHENTICATION ROUTES
// ==========================================
app.post('/api/auth/register', authRateLimiter, (req: Request, res: Response) => {
  const { email, password, phone, role, name, organizationName, city } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: 'Email, password, and role are required.' });
  }

  // Check existing
  const existing = Array.from(db.users.values()).find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(409).json({ error: 'An account with this email already exists.' });
  }

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);
  const newUserId = `usr_${role.toLowerCase()}_${Date.now()}`;
  const now = new Date().toISOString();

  const newUser: User = {
    id: newUserId,
    email: email.toLowerCase(),
    phone: phone || '+91 98000 00000',
    role,
    status: 'ACTIVE',
    isEmailVerified: false,
    isPhoneVerified: false,
    createdAt: now,
    updatedAt: now,
    collectorProfile: role === 'COLLECTOR' ? {
      name: name || 'Saathi Collector',
      city: city || 'Ahmedabad',
      locality: 'City Center',
      preferredLanguage: 'hi',
      preferredCategories: ['ewaste', 'plastic', 'metal'],
      totalEarnings: 0,
      completedLots: 0,
      activeLots: 0
    } : undefined,
    recyclerProfile: role === 'RECYCLER' ? {
      organizationName: organizationName || 'Recycling Partner',
      contactPerson: name || 'Authorized Agent',
      address: 'Industrial Area',
      city: city || 'Ahmedabad',
      serviceRadiusKm: 20,
      materialsHandled: ['ewaste', 'plastic', 'metal'],
      verificationStatus: 'PENDING',
      rating: 4.8,
      totalProcuredKg: 0
    } : undefined
  };

  db.users.set(newUserId, {
    ...newUser,
    passwordHash,
    otpCode: '123456', // Demo OTP
    otpExpiresAt: Date.now() + 10 * 60 * 1000,
    otpAttempts: 0
  });

  const token = jwt.sign({ userId: newUser.id, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });

  return res.status(201).json({
    message: 'Account registered successfully. Verification OTP dispatched.',
    user: newUser,
    token,
    demoOtp: '123456'
  });
});

app.post('/api/auth/login', authRateLimiter, (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const user = Array.from(db.users.values()).find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  const isValid = bcrypt.compareSync(password, user.passwordHash);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

  // Exclude password hash from response
  const { passwordHash, otpCode, otpExpiresAt, ...safeUser } = user;

  return res.json({
    message: 'Login successful.',
    user: safeUser,
    token
  });
});

app.post('/api/auth/verify-otp', authRateLimiter, (req: Request, res: Response) => {
  const { email, otp } = req.body;
  const user = Array.from(db.users.values()).find(u => u.email.toLowerCase() === email?.toLowerCase());

  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  if (user.otpExpiresAt && user.otpExpiresAt < Date.now()) {
    return res.status(400).json({ error: 'OTP has expired. Request a new code.' });
  }

  if (otp === '123456' || otp === user.otpCode) {
    user.isEmailVerified = true;
    user.isPhoneVerified = true;
    return res.json({ message: 'Account verified successfully.', isVerified: true });
  }

  return res.status(400).json({ error: 'Invalid verification code.' });
});

app.get('/api/auth/me', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  res.json({ user: req.user });
});

// ==========================================
// 2. SCRAP LOTS ROUTES
// ==========================================
app.get('/api/lots', (req: Request, res: Response) => {
  const { collectorId, status, material } = req.query;
  let lots = Array.from(db.lots.values());

  if (collectorId) {
    lots = lots.filter(l => l.collectorId === collectorId);
  }
  if (status) {
    lots = lots.filter(l => l.status === status);
  }
  if (material) {
    lots = lots.filter(l => l.materialCategory === material);
  }

  // Populate quotes count
  const enriched = lots.map(lot => ({
    ...lot,
    quotesCount: Array.from(db.quotes.values()).filter(q => q.lotId === lot.id).length
  }));

  res.json({ lots: enriched, count: enriched.length });
});

app.get('/api/lots/:id', (req: Request, res: Response) => {
  const lot = db.lots.get(req.params.id) || Array.from(db.lots.values()).find(l => l.lotNumber === req.params.id);
  if (!lot) {
    return res.status(404).json({ error: 'Scrap lot not found.' });
  }

  const quotes = Array.from(db.quotes.values()).filter(q => q.lotId === lot.id);
  const events = db.lotEvents.filter(e => e.lotId === lot.id);

  res.json({ lot, quotes, events });
});

app.post('/api/lots', requireAuth, requireRole(['COLLECTOR', 'ADMIN']), async (req: AuthenticatedRequest, res: Response) => {
  const { materialCategory, materialDisplay, materialDisplayHindi, weightKg, location, photos, notes, aiClassification } = req.body;

  if (!materialCategory || !weightKg) {
    return res.status(400).json({ error: 'Material category and weight are required.' });
  }

  const internalId = `lot_${Date.now()}`;
  const randomLotNum = Math.floor(100000 + Math.random() * 900000);
  const humanLotNumber = `LOT-2026-${randomLotNum}`;

  const priceEst = priceEstimationService.estimatePrice(materialCategory, weightKg, location || 'Ahmedabad, Gujarat');

  const newLot: ScrapLot = {
    id: internalId,
    lotNumber: humanLotNumber,
    collectorId: req.user!.id,
    collectorName: req.user!.collectorProfile?.name || 'Collector',
    collectorPhone: req.user!.phone,
    materialCategory,
    materialDisplay: materialDisplay || 'Scrap Material',
    materialDisplayHindi: materialDisplayHindi || 'कबाड़',
    weightKg: Number(weightKg),
    photos: photos || ['https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80'],
    location: location || 'Ahmedabad, Gujarat',
    aiClassification,
    aiConfidence: aiClassification?.confidence || 92,
    estimatedMinValue: priceEst.estimatedMin,
    estimatedMaxValue: priceEst.estimatedMax,
    status: 'MATCHING',
    notes,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.lots.set(internalId, newLot);

  // Append-only audit event
  db.lotEvents.push({
    id: `evt_${Date.now()}`,
    lotId: internalId,
    lotNumber: humanLotNumber,
    type: 'LOT_CREATED',
    actorId: req.user!.id,
    actorName: req.user!.collectorProfile?.name || 'Collector',
    actorRole: 'COLLECTOR',
    metadata: { weightKg, materialCategory },
    timestamp: new Date().toISOString(),
    hash: `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`
  });

  return res.status(201).json({
    message: 'Scrap lot published successfully. Matching recyclers notified.',
    lot: newLot
  });
});

// ==========================================
// 3. QUOTES ROUTES
// ==========================================
app.get('/api/quotes', (req: Request, res: Response) => {
  const { lotId, recyclerId } = req.query;
  let quotes = Array.from(db.quotes.values());

  if (lotId) quotes = quotes.filter(q => q.lotId === lotId);
  if (recyclerId) quotes = quotes.filter(q => q.recyclerId === recyclerId);

  res.json({ quotes });
});

app.post('/api/quotes', requireAuth, requireRole(['RECYCLER', 'ADMIN']), (req: AuthenticatedRequest, res: Response) => {
  const { lotId, pricePerKg, pickupType, notes } = req.body;
  const lot = db.lots.get(lotId);

  if (!lot) {
    return res.status(404).json({ error: 'Target scrap lot not found.' });
  }

  const quoteId = `quote_${Date.now()}`;
  const estTotal = Math.round(Number(pricePerKg) * lot.weightKg);

  const newQuote: Quote = {
    id: quoteId,
    lotId: lot.id,
    lotNumber: lot.lotNumber,
    recyclerId: req.user!.id,
    recyclerName: req.user!.recyclerProfile?.organizationName || 'Verified Recycler',
    recyclerLocation: req.user!.recyclerProfile?.city || 'Ahmedabad',
    pricePerKg: Number(pricePerKg),
    estimatedTotal: estTotal,
    pickupType: pickupType || 'Recycler Pickup',
    pickupDate: 'Today, within 4 hours',
    validUntil: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
    notes: notes || 'Calibrated weighment with instant UPI digital payout.',
    status: 'PENDING',
    createdAt: new Date().toISOString()
  };

  db.quotes.set(quoteId, newQuote);
  lot.status = 'QUOTED';

  // Append-only event
  db.lotEvents.push({
    id: `evt_${Date.now()}`,
    lotId: lot.id,
    lotNumber: lot.lotNumber,
    type: 'QUOTE_RECEIVED',
    actorId: req.user!.id,
    actorName: req.user!.recyclerProfile?.organizationName || 'Recycler',
    actorRole: 'RECYCLER',
    metadata: { pricePerKg, estimatedTotal: estTotal },
    timestamp: new Date().toISOString(),
    hash: `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`
  });

  // Notify Collector
  db.notifications.push({
    id: `notif_${Date.now()}`,
    userId: lot.collectorId,
    type: 'QUOTE_RECEIVED',
    title: `New Offer: ₹${pricePerKg}/kg on ${lot.lotNumber}`,
    message: `${req.user!.recyclerProfile?.organizationName} submitted an offer of ₹${estTotal.toLocaleString('en-IN')}.`,
    link: `/app/collector/offers`,
    isRead: false,
    createdAt: new Date().toISOString()
  });

  res.status(201).json({ message: 'Quote submitted successfully.', quote: newQuote });
});

app.post('/api/quotes/:id/accept', requireAuth, requireRole(['COLLECTOR', 'ADMIN']), (req: AuthenticatedRequest, res: Response) => {
  const quote = db.quotes.get(req.params.id);
  if (!quote) return res.status(404).json({ error: 'Quote not found.' });

  const lot = db.lots.get(quote.lotId);
  if (!lot) return res.status(404).json({ error: 'Associated lot not found.' });

  quote.status = 'ACCEPTED';
  lot.status = 'QUOTE_ACCEPTED';
  lot.acceptedQuoteId = quote.id;

  // Create Handover entity
  const handoverId = `hnd_${Date.now()}`;
  const handover: Handover = {
    id: handoverId,
    lotId: lot.id,
    lotNumber: lot.lotNumber,
    collectorId: lot.collectorId,
    collectorName: lot.collectorName,
    recyclerId: quote.recyclerId,
    recyclerName: quote.recyclerName,
    scheduledAt: 'Today, 04:00 PM',
    location: lot.location,
    status: 'SCHEDULED',
    collectorConfirmation: false,
    recyclerConfirmation: false,
    calibratedWeightKg: lot.weightKg,
    finalSettledAmount: quote.estimatedTotal,
    createdAt: new Date().toISOString()
  };

  db.handovers.set(handoverId, handover);
  lot.handoverId = handoverId;

  // Append-only event
  db.lotEvents.push({
    id: `evt_${Date.now()}`,
    lotId: lot.id,
    lotNumber: lot.lotNumber,
    type: 'QUOTE_ACCEPTED',
    actorId: req.user!.id,
    actorName: req.user!.collectorProfile?.name || 'Collector',
    actorRole: 'COLLECTOR',
    metadata: { quoteId: quote.id, amount: quote.estimatedTotal },
    timestamp: new Date().toISOString(),
    hash: `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`
  });

  res.json({ message: 'Quote accepted. Handover scheduled.', handover });
});

// ==========================================
// 4. HANDOVER & DOUBLE CONFIRMATION
// ==========================================
app.get('/api/handovers', (req: Request, res: Response) => {
  res.json({ handovers: Array.from(db.handovers.values()) });
});

app.post('/api/handovers/:id/confirm', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const handover = db.handovers.get(req.params.id);
  if (!handover) return res.status(404).json({ error: 'Handover record not found.' });

  const role = req.user!.role;
  if (role === 'COLLECTOR') {
    handover.collectorConfirmation = true;
  } else if (role === 'RECYCLER') {
    handover.recyclerConfirmation = true;
  } else if (role === 'ADMIN') {
    handover.collectorConfirmation = true;
    handover.recyclerConfirmation = true;
  }

  // Server-side validation: Handover only completes when BOTH confirmations are set!
  if (handover.collectorConfirmation && handover.recyclerConfirmation) {
    handover.status = 'COMPLETED';
    handover.completedAt = new Date().toISOString();

    const lot = db.lots.get(handover.lotId);
    if (lot) {
      lot.status = 'HANDOVER_COMPLETED';

      // Append-only event
      db.lotEvents.push({
        id: `evt_${Date.now()}`,
        lotId: lot.id,
        lotNumber: lot.lotNumber,
        type: 'HANDOVER_CONFIRMED',
        actorId: req.user!.id,
        actorName: req.user!.email,
        actorRole: req.user!.role,
        metadata: { finalAmount: handover.finalSettledAmount, calibratedWeight: handover.calibratedWeightKg },
        timestamp: new Date().toISOString(),
        hash: `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`
      });

      // Recycler inventory addition
      db.inventory.push({
        id: `inv_${Date.now()}`,
        recyclerId: handover.recyclerId,
        category: lot.materialCategory,
        quantityKg: lot.weightKg,
        sourceLotNumber: lot.lotNumber,
        acquisitionDate: new Date().toISOString().split('T')[0],
        status: 'IN_STOCK'
      });
    }
  } else {
    handover.status = 'IN_PROGRESS';
  }

  res.json({
    message: handover.status === 'COMPLETED' 
      ? 'Double-confirmation verified! Handover completed and Lot Passport updated.' 
      : 'Your confirmation is logged. Awaiting confirmation from counterparty.',
    handover
  });
});

// ==========================================
// 5. PUBLIC-SAFE LOT PASSPORT
// ==========================================
app.get('/api/passports/:lotNumber', (req: Request, res: Response) => {
  const lot = Array.from(db.lots.values()).find(
    l => l.lotNumber === req.params.lotNumber || l.id === req.params.lotNumber
  );

  if (!lot) return res.status(404).json({ error: 'Lot Passport not found.' });

  const events = db.lotEvents.filter(e => e.lotId === lot.id || e.lotNumber === lot.lotNumber);

  // SANITIZED: Never expose sensitive phone numbers or bank account credentials on public passport
  const publicPassport: LotPassportPublic = {
    passportNumber: `PASS-${lot.lotNumber.replace('LOT-', '')}-GJ`,
    lotNumber: lot.lotNumber,
    material: lot.materialDisplay,
    weightKg: lot.weightKg,
    originCity: lot.location.split(',')[0],
    collectorPublicId: `Saathi-ID #${lot.collectorId.slice(-4).toUpperCase()}`,
    recyclerPublicName: 'GreenCycle Recycling Solutions',
    handoverDate: '28 Sep 2026',
    finalStatus: lot.status,
    co2SavedKg: Math.round(lot.weightKg * 2.13),
    landfillDivertedKg: lot.weightKg,
    events: events.map(e => ({
      stage: e.type.replace(/_/g, ' '),
      stageHindi: 'पुनर्चक्रण चरण',
      timestamp: e.timestamp,
      actorRole: e.actorRole,
      hash: e.hash
    })),
    isPrototype: true,
    verifiedTimestamp: new Date().toISOString()
  };

  res.json({ passport: publicPassport });
});

// ==========================================
// 6. AI & SMART MATCHING SERVICES
// ==========================================
app.post('/api/ai/classify', async (req: Request, res: Response) => {
  const { photoUrl, declaredCategory } = req.body;
  const result = await aiService.identifyMaterial(photoUrl || '', declaredCategory);
  res.json({ result });
});

app.get('/api/recyclers/matches/:lotId', (req: Request, res: Response) => {
  const lot = db.lots.get(req.params.lotId) || Array.from(db.lots.values())[0];
  if (!lot) return res.status(404).json({ error: 'Lot not found.' });

  const matches = matchingService.findMatchesForLot(lot);
  res.json({ matches, count: matches.length });
});

// ==========================================
// 7. INVENTORY & NOTIFICATIONS & ADMIN
// ==========================================
app.get('/api/inventory', (req: Request, res: Response) => {
  res.json({ inventory: db.inventory });
});

app.get('/api/notifications', (req: Request, res: Response) => {
  res.json({ notifications: db.notifications });
});

app.get('/api/admin/overview', requireAuth, requireRole(['ADMIN']), (req: Request, res: Response) => {
  res.json({
    totalUsers: db.users.size,
    activeLots: Array.from(db.lots.values()).filter(l => l.status !== 'HANDOVER_COMPLETED').length,
    completedTransactions: Array.from(db.handovers.values()).filter(h => h.status === 'COMPLETED').length,
    openDisputes: db.disputes.filter(d => d.status === 'OPEN').length,
    auditLogsCount: db.auditLogs.length
  });
});

app.get('/api/admin/audit', requireAuth, requireRole(['ADMIN']), (req: Request, res: Response) => {
  res.json({ auditLogs: db.auditLogs });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`[ScrapSaathi Server] API running on http://localhost:${PORT}`);
  console.log(`[ScrapSaathi Server] Demo accounts ready: collector@demo.scrapsaathi.local, recycler@demo.scrapsaathi.local, admin@demo.scrapsaathi.local`);
});
