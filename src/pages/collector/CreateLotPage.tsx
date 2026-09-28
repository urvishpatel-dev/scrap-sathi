import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../api/client';
import { MaterialCategory, AIClassificationResult } from '../../types';
import { PillButton } from '../../components/ui/PillButton';
import { PillInput } from '../../components/ui/PillInput';
import { EditorialCard } from '../../components/ui/EditorialCard';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Upload, 
  Scale, 
  MapPin, 
  Cpu, 
  Package, 
  Wrench, 
  FileText, 
  Wine, 
  Layers, 
  Camera,
  Info
} from 'lucide-react';

const MATERIAL_OPTIONS = [
  { id: 'ewaste', name: 'E-Waste', hindi: 'ई-कचरा', guide: '₹65–₹85 / kg', icon: <Cpu className="w-6 h-6 text-[#0d5b3b]" />, img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80' },
  { id: 'plastic', name: 'Plastic', hindi: 'प्लास्टिक', guide: '₹22–₹36 / kg', icon: <Package className="w-6 h-6 text-[#0d5b3b]" />, img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80' },
  { id: 'metal', name: 'Metal', hindi: 'धातु (लोहा/तांबा)', guide: '₹45–₹120 / kg', icon: <Wrench className="w-6 h-6 text-[#0d5b3b]" />, img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80' },
  { id: 'paper', name: 'Paper', hindi: 'कागज व गत्ता', guide: '₹14–₹19 / kg', icon: <FileText className="w-6 h-6 text-[#0d5b3b]" />, img: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=600&q=80' },
  { id: 'glass', name: 'Glass', hindi: 'कांच', guide: '₹5–₹9 / kg', icon: <Wine className="w-6 h-6 text-[#0d5b3b]" />, img: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=600&q=80' },
  { id: 'mixed', name: 'Mixed Scrap', hindi: 'मिश्रित कबाड़', guide: '₹18–₹35 / kg', icon: <Layers className="w-6 h-6 text-[#0d5b3b]" />, img: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80' }
];

export const CreateLotPage: React.FC = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(1);
  const [material, setMaterial] = useState<MaterialCategory>('ewaste');
  const [weightKg, setWeightKg] = useState<number>(42);
  const [photoUrl, setPhotoUrl] = useState<string>('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80');
  const [location, setLocation] = useState<string>('Ahmedabad, Gujarat');
  const [notes, setNotes] = useState<string>('Desktops, motherboard circuits, copper wiring, and power supply units.');

  // AI state
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [aiClassification, setAiClassification] = useState<AIClassificationResult | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const currentOption = MATERIAL_OPTIONS.find(m => m.id === material) || MATERIAL_OPTIONS[0];

  const handleRunAI = async () => {
    setIsAnalyzing(true);
    try {
      const result = await api.classifyScrap(photoUrl, material);
      setAiClassification(result);
    } catch (err) {
      console.error('AI classification failed', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePublishLot = async () => {
    setSubmitting(true);
    try {
      const created = await api.createLot({
        materialCategory: material,
        materialDisplay: currentOption.name,
        materialDisplayHindi: currentOption.hindi,
        weightKg,
        location,
        photos: [photoUrl],
        notes,
        aiClassification: aiClassification || undefined
      });

      navigate(`/app/collector/lots/${created.id}`);
    } catch (err: any) {
      alert(err.message || 'Failed to publish lot');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f2ffe3] min-h-[calc(100vh-5rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Link to="/app/collector" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#526061] hover:text-[#083a26]">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Collector Dashboard</span>
        </Link>

        <EditorialCard>
          {/* Header */}
          <div className="border-b border-[#e5e5e5] pb-5 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-[#0d5b3b]">
                  Guided Lot Wizard
                </span>
                <h1 className="font-serif font-light text-3xl sm:text-4xl text-[#083a26]">
                  Create Scrap Lot
                </h1>
              </div>
              <span className="text-xs font-bold text-[#0d5b3b] bg-[#f2ffe3] px-3 py-1 rounded-full border border-[#cccccc]/40">
                Step {step} of 6
              </span>
            </div>

            {/* Stepper Progress Bar */}
            <div className="grid grid-cols-6 gap-2 mt-4">
              {[1, 2, 3, 4, 5, 6].map(s => (
                <div
                  key={s}
                  onClick={() => s <= step && setStep(s)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    s === step ? 'bg-[#0d5b3b]' : s < step ? 'bg-[#a3fda7]' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* STEP 1: Select Material */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl text-[#083a26]">Select Material Category</h2>
                <p className="text-xs text-[#526061]">Choose the primary secondary stream you wish to sell</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {MATERIAL_OPTIONS.map(opt => {
                  const isSelected = material === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => {
                        setMaterial(opt.id as MaterialCategory);
                        setPhotoUrl(opt.img);
                      }}
                      className={`p-4 rounded-[20px] border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#0d5b3b] bg-[#f2ffe3] shadow-xs'
                          : 'border-[#cccccc] bg-white hover:border-[#0d5b3b]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-10 h-10 rounded-full bg-white border border-[#cccccc] flex items-center justify-center">
                          {opt.icon}
                        </div>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-[#0d5b3b]" />}
                      </div>
                      <h3 className="font-serif text-lg font-normal text-[#083a26]">{opt.name}</h3>
                      <p className="text-[11px] text-gray-500">{opt.hindi}</p>
                      <span className="text-[10px] font-bold text-[#0d5b3b] mt-2 block">{opt.guide}</span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <PillButton variant="primary" onClick={() => setStep(2)}>
                  Next: Upload Photo
                </PillButton>
              </div>
            </div>
          )}

          {/* STEP 2: Photos */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl text-[#083a26]">Upload Scrap Photo</h2>
                <p className="text-xs text-[#526061]">Photos assist in automated AI grading and verified recycler bidding</p>
              </div>

              <div className="aspect-video rounded-[24px] overflow-hidden border border-[#cccccc] bg-gray-50 relative group">
                <img src={photoUrl} alt="Scrap Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs bg-black/60 px-3 py-1.5 rounded-full">
                    Sample Inspection Photo
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPhotoUrl('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80')}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-[#cccccc] hover:bg-[#f2ffe3]"
                >
                  Use Sample E-Waste
                </button>
                <button
                  type="button"
                  onClick={() => setPhotoUrl('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80')}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-[#cccccc] hover:bg-[#f2ffe3]"
                >
                  Use Sample Plastics
                </button>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button onClick={() => setStep(1)} className="text-xs font-semibold text-[#526061] hover:text-[#083a26]">
                  ← Back
                </button>
                <PillButton variant="primary" onClick={() => setStep(3)}>
                  Next: Enter Weight
                </PillButton>
              </div>
            </div>
          )}

          {/* STEP 3: Weight */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl text-[#083a26]">Approximate Mass (वजन)</h2>
                <p className="text-xs text-[#526061]">Doorstep EV vehicle will perform calibrated final weighing</p>
              </div>

              <div className="bg-[#f2ffe3] p-8 rounded-[24px] border border-[#cccccc]/40 text-center space-y-4">
                <div className="inline-flex items-center gap-2 text-[#0d5b3b]">
                  <Scale className="w-5 h-5" />
                  <span className="font-bold text-xs uppercase tracking-wider">Lot Weight in Kilograms</span>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setWeightKg(Math.max(1, weightKg - 5))}
                    className="w-12 h-12 rounded-full bg-white border border-[#cccccc] text-2xl font-bold hover:bg-[#e9e7e2]"
                  >
                    -
                  </button>
                  <div className="flex items-baseline gap-1">
                    <input
                      type="number"
                      value={weightKg}
                      onChange={(e) => setWeightKg(Math.max(1, Number(e.target.value)))}
                      className="w-28 text-center font-serif text-5xl text-[#083a26] bg-white border border-[#cccccc] rounded-2xl py-1 focus:outline-none focus:ring-2 focus:ring-[#a3fda7]"
                    />
                    <span className="font-serif text-2xl text-[#526061]">kg</span>
                  </div>
                  <button
                    onClick={() => setWeightKg(weightKg + 5)}
                    className="w-12 h-12 rounded-full bg-white border border-[#cccccc] text-2xl font-bold hover:bg-[#e9e7e2]"
                  >
                    +
                  </button>
                </div>

                {/* Quick Add Presets */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  {[15, 25, 42, 60, 100].map(val => (
                    <button
                      key={val}
                      onClick={() => setWeightKg(val)}
                      className={`text-xs px-3.5 py-1 rounded-full border font-semibold ${
                        weightKg === val ? 'bg-[#0d5b3b] text-white border-[#0d5b3b]' : 'bg-white border-[#cccccc] text-[#2d3637]'
                      }`}
                    >
                      {val} kg
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button onClick={() => setStep(2)} className="text-xs font-semibold text-[#526061] hover:text-[#083a26]">
                  ← Back
                </button>
                <PillButton variant="primary" onClick={() => setStep(4)}>
                  Next: Location
                </PillButton>
              </div>
            </div>
          )}

          {/* STEP 4: Location */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl text-[#083a26]">Pickup Location & Notes</h2>
                <p className="text-xs text-[#526061]">Recyclers within your municipality radius will be matched</p>
              </div>

              <div className="space-y-4">
                <PillInput
                  label="City & Hub Location"
                  placeholder="Ahmedabad, Gujarat"
                  icon={<MapPin className="w-4 h-4" />}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#2d3637] uppercase tracking-wider pl-4">
                    Collector Batch Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-white border border-[#cccccc] rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#a3fda7]"
                    placeholder="Mention sorting status, bag count, or urgent pickup availability..."
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button onClick={() => setStep(3)} className="text-xs font-semibold text-[#526061] hover:text-[#083a26]">
                  ← Back
                </button>
                <PillButton
                  variant="primary"
                  onClick={() => {
                    setStep(5);
                    handleRunAI();
                  }}
                >
                  Next: AI Appraisal
                </PillButton>
              </div>
            </div>
          )}

          {/* STEP 5: AI-Assisted Identification */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl text-[#083a26]">AI Material Classification</h2>
                  <p className="text-xs text-[#526061]">Vision assistant analysis of uploaded photograph</p>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0d5b3b] bg-[#f2ffe3] px-2.5 py-0.5 rounded-full border border-[#cccccc]/40">
                  AI-assisted result
                </span>
              </div>

              {isAnalyzing ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-8 h-8 border-2 border-[#0d5b3b] border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs font-semibold text-[#526061]">Scanning material composition and yield markers...</p>
                </div>
              ) : aiClassification ? (
                <div className="bg-[#f2ffe3] rounded-[24px] p-6 border border-[#0d5b3b]/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs uppercase tracking-wider text-[#0d5b3b] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      Vision Prediction
                    </span>
                    <span className="text-xs font-extrabold bg-white px-2.5 py-0.5 rounded-full border border-[#cccccc]/50">
                      {aiClassification.confidence}% Confidence
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[#838676] block">Identified Category:</span>
                      <span className="font-bold text-[#083a26] text-sm block mt-0.5">
                        {aiClassification.categoryDisplay}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#838676] block">Suggested Yield Grade:</span>
                      <span className="font-bold text-[#083a26] text-sm block mt-0.5">
                        {aiClassification.suggestedGrade}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#cccccc]/30 text-xs">
                    <span className="text-[#838676] block mb-1">Detected Sub-Components:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {(aiClassification.possibleMaterials || aiClassification.subMaterials || []).map((mat, i) => (
                        <span key={i} className="bg-white text-[#2d3637] px-2 py-0.5 rounded-md border border-[#cccccc]/40 text-[11px]">
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-[#526061]">
                    <Info className="w-3.5 h-3.5 text-[#0d5b3b]" />
                    <span>Prototype AI result. You can adjust the classification in the final review.</span>
                  </div>
                </div>
              ) : null}

              <div className="pt-4 flex items-center justify-between">
                <button onClick={() => setStep(4)} className="text-xs font-semibold text-[#526061] hover:text-[#083a26]">
                  ← Back
                </button>
                <PillButton variant="primary" onClick={() => setStep(6)}>
                  Next: Final Review
                </PillButton>
              </div>
            </div>
          )}

          {/* STEP 6: Review & Publish */}
          {step === 6 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl text-[#083a26]">Review Lot Details</h2>
                <p className="text-xs text-[#526061]">Confirm your declared scrap parameters before publishing to matching recyclers</p>
              </div>

              <div className="bg-[#f2ffe3] rounded-[24px] p-6 border border-[#cccccc]/40 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#cccccc]/30">
                  <div>
                    <h3 className="font-serif text-2xl text-[#083a26]">{currentOption.name}</h3>
                    <p className="text-xs text-gray-500">{currentOption.hindi}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-3xl text-[#083a26]">{weightKg} kg</span>
                    <span className="text-[11px] text-[#838676] block">Declared Mass</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[#838676] block">Collection City:</span>
                    <span className="font-bold text-[#2d3637]">{location}</span>
                  </div>
                  <div>
                    <span className="text-[#838676] block">Estimated Valuation:</span>
                    <span className="font-serif text-lg text-[#0d5b3b] font-normal block">
                      ₹{Math.round(weightKg * 70).toLocaleString('en-IN')} – ₹{Math.round(weightKg * 85).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button onClick={() => setStep(5)} className="text-xs font-semibold text-[#526061] hover:text-[#083a26]">
                  ← Back
                </button>
                <PillButton
                  variant="primary"
                  onClick={handlePublishLot}
                  disabled={submitting}
                  icon={<CheckCircle2 className="w-4 h-4" />}
                >
                  {submitting ? 'Publishing Lot...' : 'Publish Scrap Lot'}
                </PillButton>
              </div>
            </div>
          )}
        </EditorialCard>
      </div>
    </div>
  );
};
