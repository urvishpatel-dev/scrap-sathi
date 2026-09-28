import { AIClassificationResult, MaterialCategory } from '../../src/types';

export interface MaterialIdentificationProvider {
  classifyMaterial(photoUrlOrBuffer: string, declaredCategory?: MaterialCategory): Promise<AIClassificationResult>;
}

export class MockMaterialIdentificationProvider implements MaterialIdentificationProvider {
  async classifyMaterial(photoUrlOrBuffer: string, declaredCategory?: MaterialCategory): Promise<AIClassificationResult> {
    // Simulate lightweight vision processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const cat = declaredCategory || 'ewaste';

    switch (cat) {
      case 'plastic':
        return {
          category: 'plastic',
          categoryDisplay: 'Industrial Polymers & PET',
          categoryHindi: 'पॉलीमर और प्लास्टिक',
          confidence: 91,
          possibleMaterials: ['High-Density Polyethylene (HDPE)', 'PET Bottle Flakes', 'Polypropylene Caps'],
          suggestedGrade: 'Grade A Segregated',
          estimatedRateRange: { min: 26, max: 36 },
          samplePhotoUrl: photoUrlOrBuffer,
          isMockProvider: true,
          notes: 'Prototype AI result: Polymer reflectivity indicates clean post-consumer plastic stream.'
        };
      case 'metal':
        return {
          category: 'metal',
          categoryDisplay: 'Ferrous & Non-Ferrous Alloys',
          categoryHindi: 'धातु एवं मिश्र धातु',
          confidence: 96,
          possibleMaterials: ['Cast Iron Structural', 'Aluminium Extrusions', 'Insulated Copper Wire'],
          suggestedGrade: 'Class 1 Heavy Melt Scrap',
          estimatedRateRange: { min: 65, max: 120 },
          samplePhotoUrl: photoUrlOrBuffer,
          isMockProvider: true,
          notes: 'Prototype AI result: High metal density and metallic luster detected.'
        };
      case 'paper':
        return {
          category: 'paper',
          categoryDisplay: 'Cardboard & Kraft Pulp',
          categoryHindi: 'गत्ता एवं रद्दी कागज',
          confidence: 93,
          possibleMaterials: ['Corrugated Cardboard', 'Office Stationary', 'Old Newspaper Kraft'],
          suggestedGrade: 'Commercial Mill Grade',
          estimatedRateRange: { min: 14, max: 19 },
          samplePhotoUrl: photoUrlOrBuffer,
          isMockProvider: true,
          notes: 'Prototype AI result: Dry fiber consistency with minimal moisture contamination.'
        };
      case 'glass':
        return {
          category: 'glass',
          categoryDisplay: 'Cullet Glass Scrap',
          categoryHindi: 'कांच कबाड़',
          confidence: 89,
          possibleMaterials: ['Flint White Glass', 'Amber Bottle Glass', 'Flat Pane Window Cullet'],
          suggestedGrade: 'Sorted Bottle Cullet',
          estimatedRateRange: { min: 5, max: 9 },
          samplePhotoUrl: photoUrlOrBuffer,
          isMockProvider: true,
          notes: 'Prototype AI result: Transparency and fracture facets consistent with container cullet.'
        };
      default:
        return {
          category: 'ewaste',
          categoryDisplay: 'Mixed Electronic Waste',
          categoryHindi: 'मिश्रित ई-कचरा',
          confidence: 94,
          possibleMaterials: ['Printed Circuit Boards (PCB)', 'Aluminium Heat Sinks', 'Copper Coil Motors', 'Plastic Chassis'],
          suggestedGrade: 'Grade B (Commercial High-Yield)',
          estimatedRateRange: { min: 72, max: 82 },
          samplePhotoUrl: photoUrlOrBuffer,
          isMockProvider: true,
          notes: 'Prototype AI result: Electronic solder tracks and copper winding identified in input frame.'
        };
    }
  }
}

// Service Factory allowing modular plugging of real FastAPI / PyTorch model
export class AIService {
  private provider: MaterialIdentificationProvider;

  constructor() {
    // If AI_SERVICE_URL is configured and USE_MOCK_AI_PROVIDER is false, swap to ML provider
    this.provider = new MockMaterialIdentificationProvider();
  }

  async identifyMaterial(photoUrl: string, declaredCategory?: MaterialCategory): Promise<AIClassificationResult> {
    return this.provider.classifyMaterial(photoUrl, declaredCategory);
  }
}

export const aiService = new AIService();
