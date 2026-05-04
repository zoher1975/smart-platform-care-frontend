'use client';
import { useState } from 'react';
import { mockStore, mockAnalytics } from '@/lib/mockData';
import { Card, Button, SectionHeader, StatCard } from '@/components/ui';

const SOURCES = [
  { key: 'instagram', label: 'Instagram', icon: '📸', color: 'bg-pink-50 border-pink-200 text-pink-700' },
  { key: 'facebook',  label: 'Facebook',  icon: '📘', color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { key: 'x',        label: 'X (Twitter)', icon: '𝕏', color: 'bg-slate-50 border-slate-200 text-slate-700' },
  { key: 'whatsapp', label: 'WhatsApp',  icon: '💬', color: 'bg-green-50 border-green-200 text-green-700' },
];

const BASE_URL = 'https://smartplatformcare.com/store/amanirenas';

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${copied ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  );
}

function SourceBar({ source, max }) {
  const pct = Math.round((source.orders / max) * 100);
  const colorMap = { instagram: 'bg-pink-500', facebook: 'bg-blue-500', whatsapp: 'bg-green-500', direct: 'bg-slate-400', x: 'bg-slate-700' };
  return (
    <div className="flex items-center gap-3">
      <div className="w-20 shrink-0 text-xs capitalize text-slate-600 font-medium">{source.source}</div>
      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${colorMap[source.source] || 'bg-[#8B4513]'} rounded-full`} style={{ width: `${pct}%` }} />
      </div>
      <div className="text-right shrink-0 w-28 text-xs text-slate-500">
        <span className="font-semibold text-slate-700">{source.orders} orders</span> · {source.conversionRate}%
      </div>
    </div>
  );
}

export default function MarketingPage() {
  const marketingMsg = `Hello 👋\nYou can view our product catalog here:\n${BASE_URL}\n\nTo order any product, click the WhatsApp button inside the store.`;
  const maxOrders = Math.max(...mockAnalytics.sourceBreakdown.map(s => s.orders));

  return (
    <div>
      <SectionHeader
        title="Marketing"
        description="Share your store and track where orders come from."
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Visits (Week)"  value={mockAnalytics.week.visits} icon="👁" />
        <StatCard label="Orders (Week)"        value={mockAnalytics.week.orders} icon="🛒" />
        <StatCard label="Revenue (Week)"       value={`$${mockAnalytics.week.revenue}`} icon="💰" />
        <StatCard label="Best Source"          value="WhatsApp" sub="10.3% conv." icon="🏆" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        {/* Store link */}
        <Card>
          <h2 className="font-semibold text-slate-800 mb-4">Your Store Link</h2>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 mb-3">
            <span className="text-xs text-slate-500 flex-1 truncate font-mono">{BASE_URL}</span>
            <CopyButton text={BASE_URL} />
          </div>
          <div className="space-y-3">
            {SOURCES.map(s => {
              const url = `${BASE_URL}?src=${s.key}`;
              return (
                <div key={s.key} className={`flex items-center gap-3 p-3 rounded-lg border ${s.color}`}>
                  <span className="text-lg">{s.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold">{s.label} link</p>
                    <p className="text-xs opacity-70 font-mono truncate">{url}</p>
                  </div>
                  <CopyButton text={url} />
                </div>
              );
            })}
          </div>
        </Card>

        {/* Ready message */}
        <Card>
          <h2 className="font-semibold text-slate-800 mb-1">Ready-to-Post Message</h2>
          <p className="text-xs text-slate-400 mb-3">Copy this and post it on your social media or WhatsApp Status.</p>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 relative">
            <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">{marketingMsg}</pre>
            <div className="mt-3 flex justify-end">
              <CopyButton text={marketingMsg} />
            </div>
          </div>
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-xs font-semibold text-amber-800 mb-1">💡 Tip</p>
            <p className="text-xs text-amber-700">Post a different link for each platform (Instagram, Facebook, WhatsApp). This way you'll see exactly where your orders come from.</p>
          </div>
        </Card>
      </div>

      {/* Analytics */}
      <Card>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-semibold text-slate-800">Orders by Source — This Week</h2>
            <p className="text-xs text-slate-400 mt-0.5">Conversion rate = orders ÷ visits × 100</p>
          </div>
        </div>
        <div className="space-y-4">
          {mockAnalytics.sourceBreakdown.map(s => (
            <SourceBar key={s.source} source={s} max={maxOrders} />
          ))}
        </div>

        <div className="mt-6 pt-5 border-t border-slate-100">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Source Summary</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-400 uppercase tracking-wide border-b border-slate-100">
                  {['Source', 'Visits', 'Orders', 'Revenue', 'Conv. Rate'].map(h => (
                    <th key={h} className="pb-2 text-left font-semibold pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {mockAnalytics.sourceBreakdown.map(s => (
                  <tr key={s.source} className="text-slate-700">
                    <td className="py-2.5 pr-4 capitalize font-medium">{s.source}</td>
                    <td className="py-2.5 pr-4">{s.visits}</td>
                    <td className="py-2.5 pr-4">{s.orders}</td>
                    <td className="py-2.5 pr-4 font-semibold text-[#8B4513]">${s.revenue}</td>
                    <td className={`py-2.5 font-bold ${s.conversionRate >= 8 ? 'text-emerald-600' : s.conversionRate >= 5 ? 'text-amber-600' : 'text-slate-500'}`}>
                      {s.conversionRate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-400">Meta API integration (paid ads reporting) — Phase 2</p>
      </Card>
    </div>
  );
}
