'use client';
import { mockMerchants } from '@/lib/mockData';
import { Card, Badge, Button, SectionHeader } from '@/components/ui';

const FLAGS = [
  { merchant: 'AmaniRenas', type: 'high_volume', msg: 'Sent 1,243 messages this month (limit: 2,000). Monitor for unusual spikes.', level: 'info', time: '2h ago' },
  { merchant: 'Sudan Craft', type: 'trial_expiring', msg: 'Trial expires in 3 days. No payment method on file.', level: 'warning', time: '5h ago' },
  { merchant: 'Nubian Spice', type: 'suspended', msg: 'Account suspended. Verify reason before reactivating.', level: 'error', time: '2d ago' },
];

const FLAG_STYLES = {
  info:    { bar: 'bg-blue-500',   bg: 'bg-blue-50 border-blue-200',   text: 'text-blue-800'   },
  warning: { bar: 'bg-amber-500',  bg: 'bg-amber-50 border-amber-200', text: 'text-amber-800'  },
  error:   { bar: 'bg-red-500',    bg: 'bg-red-50 border-red-200',     text: 'text-red-800'    },
};

const POLICY_ITEMS = [
  { title: 'Opt-in required for bulk messages', status: 'enforced', desc: 'Customers must have opted in. Checked before any broadcast is approved.' },
  { title: 'Approved templates for campaigns', status: 'phase2', desc: 'Meta-approved message templates required. Planned for Phase 2.' },
  { title: 'No spam — message rate limits', status: 'enforced', desc: 'Soft limits per plan. Hard rate limits enforced at API level.' },
  { title: 'Merchant policy acceptance', status: 'enforced', desc: 'Merchants accept WhatsApp/Meta policies during onboarding.' },
];

export default function AdminCompliancePage() {
  return (
    <div>
      <SectionHeader title="Compliance" description="WhatsApp policy adherence and platform safety." />

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">1</p>
          <p className="text-xs text-slate-400 mt-0.5">Info flags</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">1</p>
          <p className="text-xs text-slate-400 mt-0.5">Warnings</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <p className="text-2xl font-bold text-red-600">1</p>
          <p className="text-xs text-slate-400 mt-0.5">Critical</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        <Card>
          <h2 className="font-semibold text-slate-800 mb-4">Active Flags</h2>
          <div className="space-y-3">
            {FLAGS.map((f, i) => {
              const s = FLAG_STYLES[f.level];
              return (
                <div key={i} className={`flex gap-3 p-3 rounded-lg border ${s.bg}`}>
                  <div className={`w-1 rounded-full shrink-0 ${s.bar}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-xs font-semibold ${s.text}`}>{f.merchant}</p>
                      <span className="text-xs text-slate-400 shrink-0">{f.time}</span>
                    </div>
                    <p className={`text-xs mt-0.5 ${s.text} opacity-80 leading-relaxed`}>{f.msg}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <h2 className="font-semibold text-slate-800 mb-4">Message Usage by Merchant</h2>
          <div className="space-y-4">
            {mockMerchants.map(m => {
              const limit = m.plan === 'pro' ? 2000 : m.plan === 'basic' ? 500 : 50;
              const pct = Math.min(100, Math.round((m.messagesThisMonth / limit) * 100));
              return (
                <div key={m._id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-slate-700">{m.storeName}</span>
                    <span className="text-xs text-slate-500">{m.messagesThisMonth}/{limit} ({pct}%)</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, backgroundColor: pct >= 90 ? '#EF4444' : pct >= 70 ? '#F59E0B' : '#8B4513' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="font-semibold text-slate-800 mb-4">WhatsApp Policy Status</h2>
        <div className="space-y-3">
          {POLICY_ITEMS.map(item => (
            <div key={item.title} className="flex items-start gap-4 py-3 border-b border-slate-100 last:border-0">
              <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${item.status === 'enforced' ? 'bg-emerald-500' : 'bg-amber-400'}`} />
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-medium text-slate-800">{item.title}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.status === 'enforced' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                    {item.status === 'enforced' ? 'Enforced' : 'Phase 2'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
