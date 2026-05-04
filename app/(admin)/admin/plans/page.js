'use client';
import { useState } from 'react';
import { mockPlans } from '@/lib/mockData';
import { Card, Button, Badge, SectionHeader, Input } from '@/components/ui';

export default function AdminPlansPage() {
  const [plans, setPlans] = useState(mockPlans);
  const [editing, setEditing] = useState(null);

  return (
    <div>
      <SectionHeader
        title="Plans & Pricing"
        description="Control pricing and feature limits from here. Changes apply to all new subscriptions."
        action={<Button size="sm">+ Add Plan</Button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {plans.map(plan => (
          <Card key={plan.id}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-slate-800">{plan.name}</span>
              {plan.highlight && <Badge variant="brand">Popular</Badge>}
            </div>
            <p className="text-3xl font-bold text-[#8B4513]">{plan.price === 0 ? 'Free' : `$${plan.price}`}</p>
            <p className="text-xs text-slate-400 mt-0.5">{plan.period}</p>
            <ul className="mt-3 space-y-1">
              {plan.features.slice(0, 3).map(f => (
                <li key={f} className="text-xs text-slate-600 flex items-start gap-1"><span className="text-emerald-500">✓</span>{f}</li>
              ))}
              {plan.features.length > 3 && <li className="text-xs text-slate-400">+{plan.features.length - 3} more…</li>}
            </ul>
            <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
              <Button variant="outline" size="xs" className="flex-1" onClick={() => setEditing(plan)}>Edit</Button>
              <Button variant="ghost" size="xs">{plan.highlight ? 'Unfeature' : 'Feature'}</Button>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <h2 className="font-semibold text-slate-800 mb-4">Pricing Notes</h2>
        <ul className="text-sm text-slate-600 space-y-2">
          <li className="flex gap-2"><span className="text-[#8B4513]">•</span>Plans are editable from this admin page — no database editing required.</li>
          <li className="flex gap-2"><span className="text-[#8B4513]">•</span>Message limits are soft limits in MVP — no hard blocks in current phase.</li>
          <li className="flex gap-2"><span className="text-[#8B4513]">•</span>Pricing changes apply to new subscriptions only. Existing subscribers keep their current rate.</li>
          <li className="flex gap-2"><span className="text-[#8B4513]">•</span>Stripe integration — Phase 3.</li>
        </ul>
      </Card>

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <h2 className="font-bold text-slate-900 mb-4">Edit Plan: {editing.name}</h2>
            <div className="space-y-3">
              <Input label="Plan name" defaultValue={editing.name} />
              <Input label="Price (USD)" type="number" defaultValue={editing.price} />
              <Input label="Message limit (-1 = unlimited)" type="number" defaultValue={editing.limits.messages} />
              <Input label="Product limit (-1 = unlimited)" type="number" defaultValue={editing.limits.products} />
            </div>
            <div className="flex gap-3 mt-5">
              <Button variant="primary" className="flex-1" onClick={() => setEditing(null)}>Save Changes</Button>
              <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
