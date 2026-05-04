'use client';
import { useState } from 'react';
import { mockMerchants, mockPlans } from '@/lib/mockData';
import { Card, Badge, Button, SectionHeader, Select, Input } from '@/components/ui';

function trialDaysLeft(merchant) {
  if (!merchant.trialEndsAt) return null;
  return Math.max(0, Math.ceil((new Date(merchant.trialEndsAt) - Date.now()) / 86400000));
}

const PLAN_COLORS = {
  trial: 'bg-yellow-100 text-yellow-800', basic: 'bg-blue-100 text-blue-800',
  pro: 'bg-purple-100 text-purple-800', business: 'bg-emerald-100 text-emerald-800',
};

function MerchantDrawer({ merchant, onClose }) {
  const [status, setStatus] = useState(merchant.status);
  const [plan, setPlan] = useState(merchant.plan);
  const [extraDays, setExtraDays] = useState('');
  const daysLeft = trialDaysLeft(merchant);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end" onClick={onClose}>
      <div className="w-full max-w-md bg-white h-full shadow-2xl overflow-y-auto flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h2 className="font-bold text-slate-900">Merchant Details</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">x</button>
        </div>
        <div className="flex-1 p-5 space-y-6 overflow-y-auto">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-2">Identity</p>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#8B4513] flex items-center justify-center text-white font-bold">{merchant.name[0]}</div>
              <div>
                <p className="font-semibold text-slate-800">{merchant.name}</p>
                <p className="text-xs text-slate-500">{merchant.email}</p>
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-600 space-y-1">
              <p><span className="text-slate-400">Store:</span> {merchant.storeName}</p>
              <p><span className="text-slate-400">Joined:</span> {new Date(merchant.createdAt).toLocaleDateString()}</p>
              <p><span className="text-slate-400">Messages this month:</span> {merchant.messagesThisMonth.toLocaleString()}</p>
              {daysLeft !== null && (<p><span className="text-slate-400">Trial days left:</span> <strong className={daysLeft <= 2 ? 'text-red-600' : 'text-amber-600'}>{daysLeft}</strong></p>)}
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-2">Account Status</p>
            <Select value={status} onChange={e => setStatus(e.target.value)}>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
            </Select>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-2">Subscription Plan</p>
            <Select value={plan} onChange={e => setPlan(e.target.value)}>
              {mockPlans.map(p => <option key={p.id} value={p.id}>{p.name} - ${p.price}{p.price > 0 ? '/mo' : ''}</option>)}
            </Select>
          </div>
          {merchant.plan === 'trial' && (
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-2">Extend Trial</p>
              <div className="flex gap-2">
                <Input type="number" placeholder="Days to add (e.g. 7)" value={extraDays} onChange={e => setExtraDays(e.target.value)} className="flex-1" />
                <Button variant="outline" size="sm" disabled={!extraDays}>+ Add Days</Button>
              </div>
              <p className="text-xs text-slate-400 mt-1">Trial ends: {merchant.trialEndsAt ? new Date(merchant.trialEndsAt).toLocaleDateString() : 'N/A'}</p>
            </div>
          )}
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-2">Admin Note (logged)</p>
            <textarea className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#8B4513] resize-none" rows={3} placeholder="Internal note..." />
          </div>
        </div>
        <div className="p-5 border-t border-slate-100 flex gap-3">
          <Button variant="primary" className="flex-1" onClick={onClose}>Save Changes</Button>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}

export default function AdminMerchantsPage() {
  const [merchants, setMerchants] = useState(mockMerchants);
  const [drawer, setDrawer] = useState(null);
  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState('all');

  const filtered = merchants.filter(m =>
    (planFilter === 'all' || m.plan === planFilter) &&
    (m.name.toLowerCase().includes(search.toLowerCase()) || m.storeName.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <SectionHeader title="Merchants" description={`${merchants.length} merchants on the platform`} action={<Button size="sm">+ Invite Merchant</Button>} />
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Total', value: merchants.length, color: 'text-slate-800' },
          { label: 'Active', value: merchants.filter(m => m.status === 'active').length, color: 'text-emerald-600' },
          { label: 'On Trial', value: merchants.filter(m => m.plan === 'trial').length, color: 'text-amber-600' },
          { label: 'Suspended', value: merchants.filter(m => m.status === 'suspended').length, color: 'text-red-500' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <input type="text" placeholder="Search merchants..." value={search} onChange={e => setSearch(e.target.value)}
          className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#8B4513] w-52" />
        <div className="flex gap-1">
          {['all','trial','basic','pro','business'].map(p => (
            <button key={p} onClick={() => setPlanFilter(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${planFilter === p ? 'bg-[#8B4513] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-[#8B4513]'}`}>{p}</button>
          ))}
        </div>
      </div>
      <Card padding="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-slate-100">
              {['Merchant','Store','Plan','Messages','Trial','Status','Actions'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map(m => {
                const dl = trialDaysLeft(m);
                return (
                  <tr key={m._id} className="hover:bg-slate-50 border-b border-slate-100 last:border-0 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#FDF6EC] flex items-center justify-center text-[#8B4513] font-bold text-sm shrink-0">{m.name[0]}</div>
                        <div><p className="text-sm font-medium text-slate-800">{m.name}</p><p className="text-xs text-slate-400">{m.email}</p></div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-slate-600">{m.storeName}</td>
                    <td className="px-4 py-3.5"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PLAN_COLORS[m.plan] || 'bg-slate-100 text-slate-600'}`}>{m.plan}</span></td>
                    <td className="px-4 py-3.5 text-sm text-slate-600">{m.messagesThisMonth.toLocaleString()}</td>
                    <td className="px-4 py-3.5">{dl !== null ? <span className={`text-xs font-medium ${dl <= 2 ? 'text-red-600' : 'text-amber-600'}`}>{dl}d left</span> : <span className="text-slate-300 text-xs">-</span>}</td>
                    <td className="px-4 py-3.5"><Badge variant={m.status === 'active' ? 'success' : 'error'}>{m.status}</Badge></td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="xs" onClick={() => setDrawer(m)}>Manage</Button>
                        <Button variant={m.status === 'active' ? 'danger' : 'success'} size="xs"
                          onClick={() => setMerchants(prev => prev.map(x => x._id === m._id ? {...x, status: x.status === 'active' ? 'suspended' : 'active'} : x))}>
                          {m.status === 'active' ? 'Suspend' : 'Activate'}
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
      {drawer && <MerchantDrawer merchant={drawer} onClose={() => setDrawer(null)} />}
    </div>
  );
}
