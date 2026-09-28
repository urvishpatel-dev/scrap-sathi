import React, { useEffect, useState } from 'react';
import { InventoryItem } from '../../types';
import { EditorialCard } from '../../components/ui/EditorialCard';
import { PillButton } from '../../components/ui/PillButton';
import { Layers, Package, TrendingUp, CheckCircle2, Plus } from 'lucide-react';

export const RecyclerInventoryPage: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  useEffect(() => {
    fetch('/api/inventory')
      .then(res => res.json())
      .then(data => setInventory(data.inventory || []))
      .catch(console.error);
  }, []);

  return (
    <div className="bg-[#f2ffe3] min-h-[calc(100vh-5rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-editorial mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-[#0d5b3b]">
              Internal Processing Stock
            </span>
            <h1 className="font-serif font-light text-4xl text-[#083a26]">
              Facility Material Inventory
            </h1>
            <p className="text-xs text-[#526061] mt-1">
              Track acquired scrap feeds from warehouse intake to recycling extraction
            </p>
          </div>

          <PillButton
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => alert('New batch intake record opened')}
          >
            Record Manual Intake
          </PillButton>
        </div>

        {/* Category Breakdown Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <EditorialCard>
            <span className="text-xs font-bold uppercase text-[#838676]">E-Waste Stock</span>
            <span className="font-serif text-3xl text-[#083a26] block mt-1">320 kg</span>
            <span className="text-[11px] text-[#0d5b3b]">In Smelting Pipeline</span>
          </EditorialCard>

          <EditorialCard>
            <span className="text-xs font-bold uppercase text-[#838676]">Plastics (PET/HDPE)</span>
            <span className="font-serif text-3xl text-[#083a26] block mt-1">840 kg</span>
            <span className="text-[11px] text-[#0d5b3b]">Flake Shredder Ready</span>
          </EditorialCard>

          <EditorialCard>
            <span className="text-xs font-bold uppercase text-[#838676]">Heavy Metals</span>
            <span className="font-serif text-3xl text-[#083a26] block mt-1">1,250 kg</span>
            <span className="text-[11px] text-[#0d5b3b]">Segregated Scrap</span>
          </EditorialCard>

          <EditorialCard>
            <span className="text-xs font-bold uppercase text-[#838676]">Pulp & Paper</span>
            <span className="font-serif text-3xl text-[#083a26] block mt-1">450 kg</span>
            <span className="text-[11px] text-[#0d5b3b]">Baled for Mill</span>
          </EditorialCard>
        </div>

        {/* Inventory Table */}
        <EditorialCard>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#cccccc]/40 text-[#838676] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 font-bold">Category</th>
                  <th className="py-3 px-4 font-bold">Quantity</th>
                  <th className="py-3 px-4 font-bold">Source Lot</th>
                  <th className="py-3 px-4 font-bold">Acquisition Date</th>
                  <th className="py-3 px-4 font-bold">Processing Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e5e5]">
                {inventory.map(item => (
                  <tr key={item.id} className="hover:bg-[#f2ffe3]/60">
                    <td className="py-3.5 px-4 font-serif text-base text-[#083a26] font-normal capitalize">
                      {item.category}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#2d3637]">
                      {item.quantityKg} kg
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#0d5b3b]">
                      {item.sourceLotNumber}
                    </td>
                    <td className="py-3.5 px-4 text-[#526061]">
                      {item.acquisitionDate}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#f2ffe3] text-[#0d5b3b] border border-[#cccccc]/40">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </EditorialCard>
      </div>
    </div>
  );
};
