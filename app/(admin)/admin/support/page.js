'use client';
import { useState } from 'react';
import { Card, Badge, Button, SectionHeader } from '@/components/ui';

const TICKETS = [
  { id: 't1', merchant: 'AmaniRenas', subject: 'WhatsApp webhook not receiving messages', priority: 'high', status: 'open', created: '2h ago', assignee: null },
  { id: 't2', merchant: 'Sudan Craft', subject: 'How do I add more products?', priority: 'low', status: 'resolved', created: '5h ago', assignee: 'Sara Hassan' },
  { id: 't3', merchant: 'Nubian Spice', subject: 'Account suspended by mistake', priority: 'urgent', status: 'in_progress', created: '1d ago', assignee: 'Sara Hassan' },
  { id: 't4', merchant: 'AmaniRenas', subject: 'Need help setting up bank transfer', priority: 'medium', status: 'open', created: '3h ago', assignee: null },
];

const PRIORITY_COLORS = {
  urgent: 'bg-red-100 text-red-800',
  high:   'bg-orange-100 text-orange-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low:    'bg-slate-100 text-slate-600',
};

const STATUS_COLORS = {
  open:        'bg-blue-100 text-blue-800',
  in_progress: 'bg-amber-100 text-amber-800',
  resolved:    'bg-emerald-100 text-emerald-800',
  closed:      'bg-slate-100 text-slate-500',
};

export default function SupportPage() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? TICKETS : TICKETS.filter(t => t.status === filter);

  return (
    <div>
      <SectionHeader title="Support Tickets" description="Manage merchant support requests." />

      <div className="flex gap-2 mb-5">
        {['all', 'open', 'in_progress', 'resolved', 'closed'].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all
              ${filter === s ? 'bg-[#8B4513] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-[#8B4513]'}`}
          >
            {s.replace('_', ' ')} ({s === 'all' ? TICKETS.length : TICKETS.filter(t => t.status === s).length})
          </button>
        ))}
      </div>

      <Card padding="p-0">
        <div className="divide-y divide-slate-100">
          {filtered.map(t => (
            <div key={t.id} className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_COLORS[t.priority]}`}>{t.priority}</span>
                  <span className="text-xs text-slate-400">{t.merchant}</span>
                </div>
                <p className="text-sm font-medium text-slate-800 truncate">{t.subject}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[t.status]}`}>
                    {t.status.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-slate-400">{t.created}</span>
                  {t.assignee && <span className="text-xs text-slate-400">· Assigned to {t.assignee}</span>}
                </div>
              </div>
              <div className="flex gap-2 shrink-0 ml-4">
                <Button variant="outline" size="xs">Assign</Button>
                <Button variant="outline" size="xs">View</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
