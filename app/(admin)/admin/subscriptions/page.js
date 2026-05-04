'use client';
import { useState } from 'react';
import { mockMerchants, mockPlans } from '@/lib/mockData';
import { Card, Badge, Button, SectionHeader, Select } from '@/components/ui';

const PLAN_COLORS = {
  trial: 'bg-yellow-100 text-yellow-800', basic: 'bg-blue-100 text-blue-800',
  pro: 'bg-purple-100 text-purple-800', business: 'bg-emerald-100 text-emerald-800',
};

function daysLeft(m) {
  if (!m.trialEndsAt) return null;
  return Math.max(0, Math.ceil((new Date(m.trialEndsAt) - Date.now()) / 86400000));
}

export default function AdminSubscriptionsPage() {
  const [subs, setSubs] = useState(mockMerchants.map(m => ({ ...m, plan: m.plan })));

  const mrr = subs.reduce((acc, m) => {
    const plan = mockPlans.find(p => p.id === m.plan);
    return acc + (plan ? plan.price : 0);
  }, 0);

  return (
    <div>
      <SectionHeader title="Subscriptions" description="Manage merchant billing plans." />

      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-2xl font-bold text-slate-800">${mrr}</p><p className="text-xs text-slate-400">MRR (mock)</p></div>
        <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-2xl font-bold text-amber-600">{subs.filter(m => m.plan === 'trial').length}</p><p className="text-xs text-slate-400">On Trial</p></div>
        <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-2xl font-bold text-purple-600">{subs.filter(m => m.plan === 'pro').length}</p><p className="text-xs text-slate-400">Pro</p></div>
        <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-2xl font-bold text-blue-600">{subs.filter(m => m.plan === 'basic').length}</p><p className="text-xs text-slate-400">Basic</p></div>
      </div>

      <Card padding="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-slate-100">
              {['Merchant','Current Plan','Trial Status','Monthly Value','Change Plan'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {subs.map(m => {
                const dl = daysLeft(m);
                const planObj = mockPlans.find(p => p.id === m.plan);
                return (
                  <tr key={m._id} className="hover:bg-slate-50 border-b border-slate-100 last:border-0">
                    <td className="px-4 py-3.5">
                      <p className="text-sm font-medium text-slate-800">{m.name}</p>
                      <p className="text-xs text-slate-400">{m.storeName}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PLAN_COLORS[m.plan]}`}>{m.plan}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      {dl !== null
                        ? <span className={`text-xs font-medium ${dl <= 2 ? 'text-red-600' : 'text-amber-600'}`}>{dl} days left</span>
                        : <span className="text-xs text-slate-400">Active subscription</span>}
                    </td>
                    <td className="px-4 py-3.5 text-sm font-bold text-slate-800">
                      {planObj && planObj.price > 0 ? `$${planObj.price}/mo` : 'Free'}
                    </td>
                    <td className="px-4 py-3.5">
                      <select
                        value={m.plan}
                        onChange={e => setSubs(prev => prev.map(x => x._id === m._id ? {...x, plan: e.target.value} : x))}
                        className="text-xs border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:border-[#8B4513]"
                      >
                        {mockPlans.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
      <p className="mt-3 text-xs text-slate-400">Stripe payment processing — Phase 3. Manual plan changes are logged to audit trail.</p>
    </div>
  );
}
