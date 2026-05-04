'use client';
import { useState } from 'react';
import { mockCustomers, timeAgo } from '@/lib/mockData';
import { Card, Badge, Button, SectionHeader } from '@/components/ui';

const TAG_COLORS = {
  vip:       'bg-amber-100 text-amber-800',
  repeat:    'bg-blue-100 text-blue-800',
  new:       'bg-green-100 text-green-800',
  'high-value': 'bg-purple-100 text-purple-800',
  diaspora:  'bg-indigo-100 text-indigo-800',
};

export default function CustomersPage() {
  const [search, setSearch] = useState('');

  const filtered = mockCustomers.filter(c =>
    (c.name || '').toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  return (
    <div>
      <SectionHeader
        title="Customers"
        description={`${mockCustomers.length} customers in your list`}
      />

      {/* Compliance note */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-3.5 mb-6 flex items-start gap-3">
        <span className="text-lg">🔒</span>
        <div>
          <p className="text-sm font-semibold text-blue-800">WhatsApp opt-in reminder</p>
          <p className="text-xs text-blue-600 mt-0.5">You can only send bulk messages to customers who have opted in. Respect their preference to avoid account restrictions.</p>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search customers…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-4 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#8B4513] w-full max-w-xs"
      />

      <Card padding="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                {['Customer', 'Source', 'Orders / Spent', 'Last Contact', 'Tags', 'Opt-in', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c._id} className="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#FDF6EC] border border-[#D2691E30] flex items-center justify-center text-[#8B4513] font-bold text-sm shrink-0">
                        {(c.name || c.phone)[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{c.name || '—'}</p>
                        <p className="text-xs text-slate-400">{c.phone}</p>
                        {c.city && <p className="text-xs text-slate-400">{c.city}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs capitalize text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">{c.source}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-sm font-medium text-slate-800">{c.totalOrders} orders</p>
                    <p className="text-xs text-[#8B4513] font-semibold">${c.totalSpent} spent</p>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-slate-400">{timeAgo(c.lastOrderAt)}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex flex-wrap gap-1">
                      {c.tags.map(tag => (
                        <span key={tag} className={`text-xs px-2 py-0.5 rounded-full font-medium ${TAG_COLORS[tag] || 'bg-slate-100 text-slate-600'}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs font-medium ${c.optIn ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {c.optIn ? '✓ Opted in' : '— No'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <a
                      href={`https://wa.me/${c.phone.replace(/\D/g,'')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs bg-[#25D366] text-white px-2.5 py-1 rounded-lg font-medium hover:bg-[#20b458] transition-colors"
                    >
                      WhatsApp
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="mt-4 text-xs text-slate-400 text-center">
        Campaigns and bulk messaging — Phase 2 · Only opted-in customers will be eligible
      </p>
    </div>
  );
}
