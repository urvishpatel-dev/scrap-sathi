import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { ScrapLot } from '../../types';
import { PillButton } from '../../components/ui/PillButton';
import { EditorialCard } from '../../components/ui/EditorialCard';
import { MapPin, Search, Filter, Send, ArrowRight } from 'lucide-react';

export const DiscoverLotsPage: React.FC = () => {
  const [lots, setLots] = useState<ScrapLot[]>([]);
  const [materialFilter, setMaterialFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLots = async () => {
      try {
        const data = await api.getLots();
        setLots(data.lots);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLots();
  }, []);

  const filteredLots = lots.filter(lot => {
    const matchesMat = materialFilter === 'all' || lot.materialCategory === materialFilter;
    const matchesSearch = lot.materialDisplay.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lot.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (lot.lotNumber || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMat && matchesSearch;
  });

  return (
    <div className="bg-[#f2ffe3] min-h-[calc(100vh-5rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-editorial mx-auto space-y-6">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-[#0d5b3b]">
            Material Sourcing Pipeline
          </span>
          <h1 className="font-serif font-light text-4xl text-[#083a26]">
            Discover Scrap Lots
          </h1>
          <p className="text-xs text-[#526061] mt-1">
            Filter certified feeds by polymer grade, electronic waste, or industrial metals
          </p>
        </div>

        {/* Filter Bar */}
        <EditorialCard className="p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Search by lot number, city, or material..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#f2ffe3] border border-[#cccccc] rounded-full pl-11 pr-5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#a3fda7]"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              {['all', 'ewaste', 'plastic', 'metal', 'paper', 'glass'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setMaterialFilter(cat)}
                  className={`text-xs px-3.5 py-2 rounded-full font-semibold border transition-all ${
                    materialFilter === cat
                      ? 'bg-[#0d5b3b] text-white border-[#0d5b3b]'
                      : 'bg-white border-[#cccccc] text-[#2d3637] hover:bg-[#f2ffe3]'
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </EditorialCard>

        {/* Lots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredLots.map(lot => (
            <EditorialCard key={lot.id} className="flex flex-col justify-between">
              <div>
                <div className="aspect-video rounded-[20px] overflow-hidden bg-gray-100 border border-[#cccccc] mb-4 relative">
                  <img src={lot.photos?.[0] || lot.photoUrl || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80'} alt={lot.materialDisplay} className="w-full h-full object-cover" />
                  <span className="absolute top-2.5 left-2.5 bg-[#083a26] text-white text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
                    {lot.lotNumber || lot.id}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl text-[#083a26] font-normal">{lot.materialDisplay}</h3>
                  <span className="text-xs font-bold bg-[#f2ffe3] px-2.5 py-0.5 rounded-full border border-[#cccccc]/40">
                    {lot.weightKg} kg
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#838676] mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{lot.location}</span>
                </div>

                <div className="mt-3 p-3 bg-[#f2ffe3] rounded-[16px] border border-[#cccccc]/30 flex items-center justify-between text-xs">
                  <span className="text-[#838676]">Declared Weight:</span>
                  <span className="font-serif text-lg text-[#0d5b3b] font-normal">
                    {lot.weightKg} kg (~₹{(lot.estimatedMinValue || lot.estimatedMinVal || 3000).toLocaleString('en-IN')})
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#e5e5e5]">
                <PillButton
                  variant="primary"
                  size="sm"
                  className="w-full justify-center"
                  onClick={() => alert(`Opening bid sheet for ${lot.lotNumber}. Use Overview to send quote.`)}
                >
                  View Details & Quote
                </PillButton>
              </div>
            </EditorialCard>
          ))}
        </div>
      </div>
    </div>
  );
};
