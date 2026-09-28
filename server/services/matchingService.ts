import { ScrapLot, User } from '../../src/types';
import { db } from '../db';

export interface RecyclerMatch {
  recyclerId: string;
  recyclerName: string;
  location: string;
  rating: number;
  distanceKm: number;
  matchScore: number;
  reasons: string[];
  suggestedQuotePerKg: number;
  isAuthorized: boolean;
  gpcbLicenseNo?: string;
}

export class MatchingService {
  findMatchesForLot(lot: ScrapLot): RecyclerMatch[] {
    const recyclers = Array.from(db.users.values()).filter(
      (u) => u.role === 'RECYCLER' && u.recyclerProfile
    );

    const matches: RecyclerMatch[] = recyclers.map((rec, index) => {
      const profile = rec.recyclerProfile!;
      const handlesMaterial = profile.materialsHandled.includes(lot.materialCategory);
      
      const reasons: string[] = [];
      let score = 70;

      if (handlesMaterial) {
        score += 20;
        reasons.push(`Authorized for ${lot.materialDisplay}`);
      } else {
        reasons.push('Secondary material processor');
      }

      const distance = 8.4 + index * 4.2;
      if (distance <= profile.serviceRadiusKm) {
        score += 10;
        reasons.push(`Within ${profile.serviceRadiusKm} km collection service area`);
      }

      if (profile.verificationStatus === 'VERIFIED') {
        reasons.push('GPCB compliance verified');
      }

      let baselineRate = 78;
      if (lot.materialCategory === 'plastic') baselineRate = 32;
      if (lot.materialCategory === 'metal') baselineRate = 95;
      if (lot.materialCategory === 'paper') baselineRate = 16;
      if (lot.materialCategory === 'glass') baselineRate = 7;

      const ratePerKg = baselineRate - index * 3;

      return {
        recyclerId: rec.id,
        recyclerName: profile.organizationName,
        location: `${profile.address}, ${profile.city}`,
        rating: profile.rating,
        distanceKm: distance,
        matchScore: score,
        reasons,
        suggestedQuotePerKg: ratePerKg,
        isAuthorized: profile.verificationStatus === 'VERIFIED',
        gpcbLicenseNo: profile.gpcbLicenseNo
      };
    });

    return matches.sort((a, b) => b.matchScore - a.matchScore);
  }
}

export const matchingService = new MatchingService();
