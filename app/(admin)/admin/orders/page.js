'use client';
import { useState } from 'react';
import { mockOrders, mockMerchants, STATUS_COLORS, STATUS_LABELS, timeAgo } from '@/lib/mockData';
import { Card, Badge, Button, SectionHeader, Select } from '@/components/ui';

// Enrich orders with merchant name for admin view
const ADMIN_ORDERS = mockOrders.map((o, i) => ({
  ...o,
  merchantName: i < 3 ? 'AmaniRenas' : 'Sudan Craft',
}));

export default function AdminOrdersPage() {
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = ADMIN_ORDERS.filter(o => statusFilter === 'all' || o.status === statusFilter);

  return (
    <div>
      <SectionHeader title="All Orders" description="Orders across all merchant stores." />

      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Total Orders', value: ADMIN_ORDERS.length },
          { label: 'New',          value: ADMIN_ORDERS.filter(o => o.status === 'new').length },
          { label: 'Paid',         value: ADMIN_ORDERS.filter(o => o.status === 'paid').length },
          { label: 'Completed',    value: ADMIN_ORDERS.filter(o => o.status === 'completed').length },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-4 text-center">
            <p className="text-2xl font-bold text-slate-800">{s.value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-1 mb-4 flex-wrap">
        {['all', 'new', 'awaiting_payment', 'proof_received', 'paid', 'completed', 'cancelled'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize whitespace-nowrap transition-all
              ${statusFilter === s ? 'bg-[#8B4513] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-[#8B4513]'}`}>
            {STATUS_LABELS[s] || 'All'}
          </button>
        ))}
      </div>

      <Card padding="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-slate-100">
              {['Merchant','Customer','Items','Status','Total','Source','When'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map(o => {
                const sc = STATUS_COLORS[o.status];
                return (
                  <tr key={o._id} className="hover:bg-slate-50 border-b border-slate-100 last:border-0 transition-colors">
                    <td className="px-4 py-3 text-xs font-medium text-slate-600">{o.merchantName}</td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-slate-800">{o.customerName || 'Unknown'}</p>
                      <p className="text-xs text-slate-400">{o.customerPhone}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600 max-w-[160px] truncate">{o.items.map(i => i.name).join(', ')}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${sc.bg} ${sc.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                        {STATUS_LABELS[o.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-slate-800">${o.total}</td>
                    <td className="px-4 py-3 text-xs capitalize text-slate-500">{o.source}</td>
                    <td className="px-4 py-3 text-xs text-slate-400">{timeAgo(o.createdAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
