import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MATERIAL_CONFIGS } from '../data/mockData';
import { MaterialCategory, AIAnalysis } from '../types';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Upload, 
  Camera, 
  Scale, 
  MapPin, 
  Cpu, 
  Package, 
  Wrench, 
  FileText, 
  Wine, 
  Layers,
  Info
} from 'lucide-react';

export const CreateLotPage: React.FC = () => {
  const { navigateTo, createNewLot } = useApp();

  const [step, setStep] = useState<number>(1);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialCategory>('ewaste');
  const [weightKg, setWeightKg] = useState<number>(42);
  const [location, setLocation] = useState<string>('Ahmedabad, Gujarat');
  const [notes, setNotes] = useState<string>('Assorted motherboards, power supplies, and internal copper wiring from repair center.');
  const [photoUrl, setPhotoUrl] = useState<string>(
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80'
  );

  // AI Feature state
  const [isAnalyzingAI, setIsAnalyzingAI] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<AIAnalysis | null>({
    detectedCategory: 'E-Waste',
    detectedMaterialHindi: 'इलेक्ट्रॉनिक अपशिष्ट',
    confidence: 94,
    subMaterials: ['Printed Circuit Boards (PCB)', 'Plastic Enclosures', 'Copper Coil Wire', 'Aluminium Heat Sinks'],
    suggestedGrade: 'Grade B (Commercial High-Yield)',
    estimatedRateRange: { min: 72, max: 82 },
    samplePhotoUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80'
  });

  const [createdLotId, setCreatedLotId] = useState<string | null>(null);

  const getMaterialIcon = (catId: string) => {
    switch (catId) {
      case 'ewaste': return <Cpu className="w-5 h-5 text-emerald-700" />;
      case 'plastic': return <Package className="w-5 h-5 text-blue-700" />;
      case 'metal': return <Wrench className="w-5 h-5 text-amber-700" />;
      case 'paper': return <FileText className="w-5 h-5 text-orange-700" />;
      case 'glass': return <Wine className="w-5 h-5 text-cyan-700" />;
      default: return <Layers className="w-5 h-5 text-slate-700" />;
    }
  };

  const currentMaterialConfig = MATERIAL_CONFIGS.find(m => m.id === selectedMaterial) || MATERIAL_CONFIGS[0];

  const handleSimulateAIAnalysis = () => {
    setIsAnalyzingAI(true);
    setTimeout(() => {
      setIsAnalyzingAI(false);
      if (selectedMaterial === 'plastic') {
        setAiResult({
          detectedCategory: 'Plastic Polymers',
          detectedMaterialHindi: 'पॉलीमर प्लास्टिक',
          confidence: 91,
          subMaterials: ['HDPE Containers (High Density)', 'PET Bottle Flakes', 'Polypropylene Caps'],
          suggestedGrade: 'Industrial Recyclable Grade A',
          estimatedRateRange: { min: 28, max: 34 },
          samplePhotoUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80'
        });
      } else if (selectedMaterial === 'metal') {
        setAiResult({
          detectedCategory: 'Ferrous & Non-Ferrous Metal',
          detectedMaterialHindi: 'धातु कबाड़',
          confidence: 96,
          subMaterials: ['Cast Iron Pipes', 'Aluminium Scrap Sheets', 'Red Copper Wires'],
          suggestedGrade: 'Class-1 Heavy Melt Scrap',
          estimatedRateRange: { min: 65, max: 110 },
          samplePhotoUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80'
        });
      } else {
        setAiResult({
          detectedCategory: 'E-Waste',
          detectedMaterialHindi: 'इलेक्ट्रॉनिक अपशिष्ट',
          confidence: 94,
          subMaterials: ['Printed Circuit Boards (PCB)', 'Plastic Enclosures', 'Copper Coil Wire'],
          suggestedGrade: 'Grade B (Commercial High-Yield)',
          estimatedRateRange: { min: 72, max: 82 },
          samplePhotoUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80'
        });
      }
    }, 1200);
  };

  const handleSelectMaterial = (cat: MaterialCategory) => {
    setSelectedMaterial(cat);
    const cfg = MATERIAL_CONFIGS.find(m => m.id === cat);
    if (cfg) {
      setPhotoUrl(cfg.defaultImg);
    }
  };

  const handleFinalSubmit = () => {
    const newId = createNewLot({
      materialCategory: selectedMaterial,
      materialDisplay: currentMaterialConfig.name,
      materialDisplayHindi: currentMaterialConfig.hindi,
      weightKg: weightKg,
      location: location,
      photoUrl: photoUrl,
      notes: notes,
      aiAnalysis: aiResult || undefined
    });

    setCreatedLotId(newId);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Back button */}
      <button
        onClick={() => navigateTo('collector_dashboard')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 mb-6 bg-white px-3 py-1.5 rounded-lg border border-gray-200"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Dashboard</span>
      </button>

      {/* Success State Modal / Card */}
      {createdLotId ? (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#246B4B]/30 shadow-xl text-center animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-[#E8F1EA] text-[#174B36] flex items-center justify-center mx-auto mb-4 border border-[#246B4B]/20">
            <CheckCircle2 className="w-9 h-9 text-[#246B4B]" />
          </div>

          <span className="text-xs uppercase font-extrabold tracking-wider text-[#246B4B] bg-[#E8F1EA] px-3 py-1 rounded-full">
            Lot created successfully
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-3">
            {createdLotId}
          </h2>

          <p className="text-sm text-gray-600 mt-2 max-w-md mx-auto">
            Your scrap batch of <strong className="text-gray-900">{weightKg} kg {currentMaterialConfig.name}</strong> has been cataloged and mapped with verified recyclers around {location}.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigateTo('recycler_matching', { lotId: createdLotId })}
              className="w-full sm:w-auto bg-[#174B36] hover:bg-[#246B4B] text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Find Recycler Matches</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo('lot_details', { lotId: createdLotId })}
              className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-semibold text-sm px-6 py-3.5 rounded-xl transition-all"
            >
              View Lot Details
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D1E3D5] shadow-md">
          {/* Form Header */}
          <div className="border-b border-[#E8F1EA] pb-5 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#111827]">
                  Create Scrap Lot
                </h1>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  लॉट तैयार करें — 5 simple steps for fair appraisal
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-[#174B36] bg-[#E8F1EA] px-3 py-1 rounded-full">
                <span>Step {step} of 5</span>
              </div>
            </div>

            {/* Stepper Dots */}
            <div className="grid grid-cols-5 gap-2 mt-4">
              {[1, 2, 3, 4, 5].map(s => (
                <div
                  key={s}
                  onClick={() => s <= step && setStep(s)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    s === step
                      ? 'bg-[#174B36]'
                      : s < step
                      ? 'bg-[#246B4B]'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* STEP 1: Select Material */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  Step 1: Select Material Type
                </h2>
                <p className="text-xs text-gray-500">
                  सामग्री चुनें — Choose the primary category of scrap
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {MATERIAL_CONFIGS.map(mat => {
                  const isSelected = selectedMaterial === mat.id;
                  return (
                    <div
                      key={mat.id}
                      onClick={() => handleSelectMaterial(mat.id as MaterialCategory)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                        isSelected
                          ? 'border-[#174B36] bg-[#E8F1EA]/70 shadow-sm ring-1 ring-[#174B36]'
                          : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                          {getMaterialIcon(mat.id)}
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="w-5 h-5 text-[#174B36]" />
                        )}
                      </div>
                      <h3 className="font-bold text-sm text-gray-900">{mat.name}</h3>
                      <p className="text-xs text-gray-500">{mat.hindi}</p>
                      <span className="text-[11px] font-semibold text-[#174B36] mt-2 block">
                        {mat.rateGuide}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 bg-[#174B36] hover:bg-[#246B4B] text-white font-bold text-sm px-6 py-3 rounded-xl transition-all"
                >
                  <span>Next: Enter Weight</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Weight */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  Step 2: Approximate Weight
                </h2>
                <p className="text-xs text-gray-500">
                  अनुमानित वजन (किलो) — Digital scale will calibrate final weight upon collection
                </p>
              </div>

              <div className="bg-[#F3F7F2] p-6 rounded-2xl border border-[#D1E3D5] text-center">
                <div className="inline-flex items-center justify-center gap-2 mb-3 text-[#174B36]">
                  <Scale className="w-6 h-6" />
                  <span className="font-bold text-sm uppercase">Total Lot Mass</span>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setWeightKg(Math.max(1, weightKg - 5))}
                    className="w-10 h-10 rounded-xl bg-white border border-gray-300 font-extrabold text-lg text-gray-800 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <div className="flex items-baseline gap-1">
                    <input
                      type="number"
                      value={weightKg}
                      onChange={(e) => setWeightKg(Math.max(1, Number(e.target.value)))}
                      className="w-24 text-center font-extrabold text-4xl text-[#111827] bg-white rounded-xl border border-gray-300 py-1.5 focus:ring-2 focus:ring-[#174B36] outline-none"
                    />
                    <span className="text-xl font-bold text-gray-600">kg</span>
                  </div>
                  <button
                    onClick={() => setWeightKg(weightKg + 5)}
                    className="w-10 h-10 rounded-xl bg-white border border-gray-300 font-extrabold text-lg text-gray-800 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                {/* Quick Add Chips */}
                <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                  {[10, 25, 42, 50, 100].map(val => (
                    <button
                      key={val}
                      onClick={() => setWeightKg(val)}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                        weightKg === val
                          ? 'bg-[#174B36] text-white border-[#174B36]'
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {val} kg
                    </button>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200 text-xs text-gray-600">
                  Estimated value based on {weightKg} kg {currentMaterialConfig.name}:
                  <strong className="text-[#174B36] block text-sm mt-0.5">
                    ₹{Math.round(weightKg * 70).toLocaleString('en-IN')} – ₹{Math.round(weightKg * 85).toLocaleString('en-IN')}
                  </strong>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs font-semibold text-gray-600 hover:text-gray-900"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex items-center gap-2 bg-[#174B36] hover:bg-[#246B4B] text-white font-bold text-sm px-6 py-3 rounded-xl transition-all"
                >
                  <span>Next: Photo & AI Analysis</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Photo & AI Feature */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold text-gray-900">
                    Step 3: Scrap Photo & AI Material Vision
                  </h2>
                  <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">
                    AI Feature
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  तस्वीर अपलोड करें — Take or choose a photo. Our vision assistant predicts composition and quality.
                </p>
              </div>

              {/* Upload Preview & Action */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative rounded-2xl overflow-hidden border border-gray-300 aspect-video bg-gray-100 group">
                  <img
                    src={photoUrl}
                    alt="Scrap Lot Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs font-semibold bg-black/60 px-3 py-1.5 rounded-lg">
                      Sample Inspection Photo
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-3">
                  <div className="space-y-2">
                    <button
                      onClick={handleSimulateAIAnalysis}
                      disabled={isAnalyzingAI}
                      className="w-full flex items-center justify-center gap-2 bg-[#246B4B] hover:bg-[#174B36] text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-xs transition-all disabled:opacity-50"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{isAnalyzingAI ? 'Scanning Material Vision...' : 'Run AI Material Identification'}</span>
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          setPhotoUrl('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80');
                          handleSimulateAIAnalysis();
                        }}
                        className="flex items-center justify-center gap-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs py-2 px-3 rounded-lg"
                      >
                        <Camera className="w-3.5 h-3.5 text-gray-500" />
                        <span>Sample E-Waste</span>
                      </button>

                      <button
                        onClick={() => {
                          setPhotoUrl('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80');
                          setSelectedMaterial('plastic');
                          handleSimulateAIAnalysis();
                        }}
                        className="flex items-center justify-center gap-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs py-2 px-3 rounded-lg"
                      >
                        <Upload className="w-3.5 h-3.5 text-gray-500" />
                        <span>Sample Plastic</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-400">
                    * Simulates on-device camera input or photo upload for low-literacy field usage.
                  </p>
                </div>
              </div>

              {/* AI Analysis Result Card */}
              {aiResult && (
                <div className="bg-[#E8F1EA] border border-[#246B4B]/30 rounded-2xl p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-[#174B36] text-white flex items-center justify-center">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-bold text-xs uppercase tracking-wider text-[#174B36]">
                        AI-assisted identification
                      </span>
                    </div>
                    <span className="text-[11px] font-extrabold text-[#246B4B] bg-white px-2.5 py-0.5 rounded-full border border-[#D1E3D5]">
                      Confidence: {aiResult.confidence}%
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                    <div>
                      <span className="text-[11px] text-gray-500 block">Detected:</span>
                      <span className="font-extrabold text-sm text-gray-900">
                        {aiResult.detectedCategory}
                      </span>
                      <span className="text-xs text-gray-600 ml-1.5 font-medium">
                        ({aiResult.detectedMaterialHindi})
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-gray-500 block">Estimated category:</span>
                      <span className="font-semibold text-xs text-gray-800">
                        {aiResult.suggestedGrade}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#D1E3D5]">
                    <span className="text-[11px] text-gray-500 block mb-1">
                      Possible sub-materials identified:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(aiResult.subMaterials || []).map((sub: string, i: number) => (
                        <span key={i} className="text-[11px] bg-white text-gray-700 px-2 py-0.5 rounded-md border border-gray-200">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 text-[10px] text-[#246B4B] font-semibold flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    <span>Prototype AI result — connects to computer vision pipeline in production.</span>
                  </div>
                </div>
              )}

              <div className="pt-3 flex items-center justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="text-xs font-semibold text-gray-600 hover:text-gray-900"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="flex items-center gap-2 bg-[#174B36] hover:bg-[#246B4B] text-white font-bold text-sm px-6 py-3 rounded-xl transition-all"
                >
                  <span>Next: Location</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Location & Notes */}
          {step === 4 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  Step 4: Collection Location & Notes
                </h2>
                <p className="text-xs text-gray-500">
                  स्थान एवं विवरण — Recyclers within 15 km will be matched automatically
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Pickup Location / Hub
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#174B36] outline-none"
                    />
                  </div>
                  <div className="flex gap-2 mt-2">
                    {['Ahmedabad, Gujarat', 'Gandhinagar, Gujarat', 'Sanand GIDC'].map(loc => (
                      <button
                        key={loc}
                        onClick={() => setLocation(loc)}
                        className="text-[11px] bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-md text-gray-700"
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Collector Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#174B36] outline-none"
                    placeholder="Mention packaging type, storage conditions, or immediate collection urgency..."
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="text-xs font-semibold text-gray-600 hover:text-gray-900"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(5)}
                  className="flex items-center gap-2 bg-[#174B36] hover:bg-[#246B4B] text-white font-bold text-sm px-6 py-3 rounded-xl transition-all"
                >
                  <span>Review & Create</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Final Review & Create */}
          {step === 5 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  Step 5: Review Lot Summary
                </h2>
                <p className="text-xs text-gray-500">
                  लॉट पुष्टि — Review the lot details before dispatching to matching recyclers
                </p>
              </div>

              <div className="bg-[#F3F7F2] p-5 rounded-2xl border border-[#D1E3D5] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                      {getMaterialIcon(selectedMaterial)}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-gray-900">
                        {currentMaterialConfig.name}
                      </h3>
                      <p className="text-xs text-gray-500">{currentMaterialConfig.hindi}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-xl text-[#174B36]">
                      {weightKg} kg
                    </span>
                    <span className="text-[11px] text-gray-500 block">Declared Mass</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-gray-500 block">Location:</span>
                    <span className="font-semibold text-gray-800">{location}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Estimated Revenue:</span>
                    <span className="font-extrabold text-[#174B36] text-sm">
                      ₹{Math.round(weightKg * 70).toLocaleString('en-IN')} – ₹{Math.round(weightKg * 85).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {aiResult && (
                  <div className="p-3 bg-white rounded-xl border border-gray-200 text-xs">
                    <span className="font-bold text-[#174B36] flex items-center gap-1 mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      AI Vision Prediction Attached:
                    </span>
                    <p className="text-gray-600">
                      {aiResult.detectedCategory} • {aiResult.suggestedGrade} ({aiResult.confidence}% confidence)
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-3 flex items-center justify-between">
                <button
                  onClick={() => setStep(4)}
                  className="text-xs font-semibold text-gray-600 hover:text-gray-900"
                >
                  ← Back
                </button>
                <button
                  onClick={handleFinalSubmit}
                  className="flex items-center gap-2 bg-[#174B36] hover:bg-[#246B4B] text-white font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-lg transition-all"
                >
                  <span>Create Scrap Lot</span>
                  <CheckCircle2 className="w-5 h-5 text-[#A9C7B1]" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
