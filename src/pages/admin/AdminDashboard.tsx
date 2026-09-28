import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { AuditLog, Dispute } from '../../types';
import { EditorialCard } from '../../components/ui/EditorialCard';
import { PillButton } from '../../components/ui/PillButton';
import { 
  ShieldAlert, 
  Users, 
  Package, 
  FileCheck2, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Search 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [overview, setOverview] = useState<any>({
    totalUsers: 3,
    activeLots: 2,
    completedTransactions: 1,
    openDisputes: 0,
    auditLogsCount: 1
  });
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    api.getAdminOverview()
      .then(data => setOverview(data))
      .catch(console.error);

    fetch('/api/admin/audit', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('scrapsaathi_token') || ''}`
      }
    })
      .then(res => res.json())
      .then(data => setAuditLogs(data.auditLogs || []))
      .catch(console.error);
  }, []);

  return (
    <div className="bg-[#f2ffe3] min-h-[calc(100vh-5rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-editorial mx-auto space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-red-100 text-red-800 text-[10px] font-bold px-3 py-1 rounded-full mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Platform Governance & Compliance Portal</span>
          </div>
          <h1 className="font-serif font-light text-4xl text-[#083a26]">
            Platform Administration Hub
          </h1>
          <p className="text-xs text-[#526061] mt-1">
            System overview, recycler facility verifications, dispute resolutions, and immutable audit logs
          </p>
        </div>

        {/* Admin KPI Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <EditorialCard>
            <div className="flex items-center justify-between text-[#838676] mb-2">
              <span className="text-xs font-bold uppercase">Total Users</span>
              <Users className="w-4 h-4 text-[#0d5b3b]" />
            </div>
            <div className="font-serif text-4xl text-[#083a26]">
              {overview.totalUsers || 3}
            </div>
            <span className="text-[11px] text-[#0d5b3b]">Collectors & Facilities</span>
          </EditorialCard>

          <EditorialCard>
            <div className="flex items-center justify-between text-[#838676] mb-2">
              <span className="text-xs font-bold uppercase">Active Lots</span>
              <Package className="w-4 h-4 text-[#0d5b3b]" />
            </div>
            <div className="font-serif text-4xl text-[#083a26]">
              {overview.activeLots || 2}
            </div>
            <span className="text-[11px] text-[#0d5b3b]">In Open Bidding</span>
          </EditorialCard>

          <EditorialCard>
            <div className="flex items-center justify-between text-[#838676] mb-2">
              <span className="text-xs font-bold uppercase">Settled Transactions</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-serif text-4xl text-[#0d5b3b]">
              {overview.completedTransactions || 1}
            </div>
            <span className="text-[11px] text-emerald-800">Dual Confirmed</span>
          </EditorialCard>

          <EditorialCard>
            <div className="flex items-center justify-between text-[#838676] mb-2">
              <span className="text-xs font-bold uppercase">Open Disputes</span>
              <AlertTriangle className="w-4 h-4 text-amber-500" />
            </div>
            <div className="font-serif text-4xl text-amber-600">
              {overview.openDisputes || 0}
            </div>
            <span className="text-[11px] text-amber-700">Arbitration Queue</span>
          </EditorialCard>
        </div>

        {/* Immutable Audit Log Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-3xl text-[#083a26]">
              Immutable System Audit Log
            </h2>
            <span className="text-[10px] font-mono text-[#838676] bg-white px-2.5 py-1 rounded-full border border-[#cccccc]/40">
              APPEND-ONLY SECURITY TRAIL
            </span>
          </div>

          <EditorialCard>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[#cccccc]/40 text-[#838676] uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4 font-bold">Action</th>
                    <th className="py-3 px-4 font-bold">Actor</th>
                    <th className="py-3 px-4 font-bold">Target Entity</th>
                    <th className="py-3 px-4 font-bold">Timestamp</th>
                    <th className="py-3 px-4 font-bold">Audit Ref</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5e5e5]">
                  {auditLogs.map(log => (
                    <tr key={log.id} className="hover:bg-[#f2ffe3]/60">
                      <td className="py-3 px-4 font-bold text-[#083a26]">
                        {log.action}
                      </td>
                      <td className="py-3 px-4 text-[#526061]">
                        {log.actorRole} ({log.actorId})
                      </td>
                      <td className="py-3 px-4 font-mono text-[#0d5b3b]">
                        {log.targetEntity} #{log.targetId}
                      </td>
                      <td className="py-3 px-4 text-[#838676]">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 font-mono text-[10px] text-gray-400">
                        {log.id}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </EditorialCard>
        </div>
      </div>
    </div>
  );
};
