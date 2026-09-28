import { ScrapLot, Quote, Handover, User, Notification, LotPassportPublic } from '../types';

const API_BASE = '/api';

export class ApiClient {
  private getHeaders(): HeadersInit {
    const token = localStorage.getItem('scrapsaathi_token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
  }

  // Auth
  async login(email: string, password: string) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to login');
    if (data.token) {
      localStorage.setItem('scrapsaathi_token', data.token);
    }
    return data;
  }

  async register(payload: { email: string; password: string; role: string; name?: string; organizationName?: string; city?: string }) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    if (data.token) {
      localStorage.setItem('scrapsaathi_token', data.token);
    }
    return data;
  }

  async verifyOtp(email: string, otp: string) {
    const res = await fetch(`${API_BASE}/auth/verify-otp`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ email, otp })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'OTP verification failed');
    return data;
  }

  async getCurrentUser() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: this.getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Session expired');
    return data.user as User;
  }

  // Lots
  async getLots(params?: { collectorId?: string; status?: string; material?: string }) {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    const res = await fetch(`${API_BASE}/lots?${query}`, { headers: this.getHeaders() });
    return res.json() as Promise<{ lots: ScrapLot[]; count: number }>;
  }

  async getLotById(id: string) {
    const res = await fetch(`${API_BASE}/lots/${id}`, { headers: this.getHeaders() });
    return res.json() as Promise<{ lot: ScrapLot; quotes: Quote[]; events: any[] }>;
  }

  async createLot(payload: Partial<ScrapLot>) {
    const res = await fetch(`${API_BASE}/lots`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create scrap lot');
    return data.lot as ScrapLot;
  }

  // Quotes
  async getQuotes(params?: { lotId?: string; recyclerId?: string }) {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    const res = await fetch(`${API_BASE}/quotes?${query}`, { headers: this.getHeaders() });
    return res.json() as Promise<{ quotes: Quote[] }>;
  }

  async submitQuote(payload: { lotId: string; pricePerKg: number; pickupType?: string; notes?: string }) {
    const res = await fetch(`${API_BASE}/quotes`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to submit quote');
    return data.quote as Quote;
  }

  async acceptQuote(quoteId: string) {
    const res = await fetch(`${API_BASE}/quotes/${quoteId}/accept`, {
      method: 'POST',
      headers: this.getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to accept quote');
    return data as { message: string; handover: Handover };
  }

  // Handover confirmation
  async confirmHandover(handoverId: string) {
    const res = await fetch(`${API_BASE}/handovers/${handoverId}/confirm`, {
      method: 'POST',
      headers: this.getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Handover confirmation failed');
    return data as { message: string; handover: Handover };
  }

  // Lot Passport
  async getPublicPassport(lotNumber: string) {
    const res = await fetch(`${API_BASE}/passports/${lotNumber}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Passport not found');
    return data.passport as LotPassportPublic;
  }

  // AI Classification
  async classifyScrap(photoUrl: string, declaredCategory?: string) {
    const res = await fetch(`${API_BASE}/ai/classify`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ photoUrl, declaredCategory })
    });
    const data = await res.json();
    return data.result;
  }

  // Matching
  async getRecyclerMatches(lotId: string) {
    const res = await fetch(`${API_BASE}/recyclers/matches/${lotId}`, { headers: this.getHeaders() });
    return res.json() as Promise<{ matches: any[]; count: number }>;
  }

  // Notifications
  async getNotifications() {
    const res = await fetch(`${API_BASE}/notifications`, { headers: this.getHeaders() });
    return res.json() as Promise<{ notifications: Notification[] }>;
  }

  // Admin
  async getAdminOverview() {
    const res = await fetch(`${API_BASE}/admin/overview`, { headers: this.getHeaders() });
    return res.json();
  }
}

export const api = new ApiClient();
