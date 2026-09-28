import { MaterialCategory, PriceEstimate } from '../../src/types';

export class PriceEstimationService {
  estimatePrice(material: MaterialCategory, weightKg: number, location: string): PriceEstimate {
    let rateMin = 20;
    let rateMax = 35;

    switch (material) {
      case 'ewaste':
        rateMin = 70;
        rateMax = 85;
        break;
      case 'metal':
        rateMin = 55;
        rateMax = 120;
        break;
      case 'plastic':
        rateMin = 24;
        rateMax = 36;
        break;
      case 'paper':
        rateMin = 14;
        rateMax = 19;
        break;
      case 'glass':
        rateMin = 5;
        rateMax = 9;
        break;
      case 'mixed':
        rateMin = 18;
        rateMax = 32;
        break;
    }

    return {
      material,
      weightKg,
      location,
      estimatedMin: Math.round(weightKg * rateMin),
      estimatedMax: Math.round(weightKg * rateMax),
      currency: 'INR',
      source: 'ScrapSaathi Regional Pilot Benchmark (Ahmedabad GIDC)',
      timestamp: new Date().toISOString()
    };
  }
}

export const priceEstimationService = new PriceEstimationService();
