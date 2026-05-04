'use client';
import { useState } from 'react';
import { Card, Button, Input, SectionHeader } from '@/components/ui';

export default function AdminSettingsPage() {
  const [tab, setTab] = useState('general');

  return (
    <div>
      <SectionHeader title="Platform Settings" description="Global configuration for Smart Platform Care." />

      <div className="flex gap-1 border-b border-slate-200 mb-6">
        {['general','limits','notifications','security'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium capitalize border-b-2 -mb-px transition-all
              ${tab === t ? 'border-red-500 text-red-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'general' && (
        <div className="max-w-xl space-y-4">
          <Card>
            <h2 className="font-semibold text-slate-800 mb-4">Platform Identity</h2>
            <div className="space-y-3">
              <Input label="Platform name" defaultValue="Smart Platform Care" />
              <Input label="Support email" defaultValue="support@smartplatformcare.com" type="email" />
              <Input label="Support WhatsApp" defaultValue="+44 20 0000 0000" />
              <Input label="Default trial duration (days)" type="number" defaultValue="7" />
            </div>
            <Button variant="primary" size="sm" className="mt-4">Save</Button>
          </Card>
        </div>
      )}

      {tab === 'limits' && (
        <div className="max-w-xl space-y-4">
          <Card>
            <h2 className="font-semibold text-slate-800 mb-1">Default Soft Limits</h2>
            <p className="text-xs text-slate-400 mb-4">These are overridden by plan-specific limits. Changes here apply to plans with no explicit limit set.</p>
            <div className="space-y-3">
              <Input label="Max products per store (soft)" type="number" defaultValue="10" />
              <Input label="Max messages per month (soft)" type="number" defaultValue="50" />
              <Input label="Max images per product" type="number" defaultValue="5" />
            </div>
            <Button variant="primary" size="sm" className="mt-4">Save Limits</Button>
          </Card>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-amber-800">Soft limits only in MVP</p>
            <p className="text-xs text-amber-700 mt-0.5">Hard blocking is not enforced in this phase. Merchants exceeding limits see a warning to upgrade, but are not blocked.</p>
          </div>
        </div>
      )}

      {tab === 'notifications' && (
        <div className="max-w-xl">
          <Card>
            <h2 className="font-semibold text-slate-800 mb-4">Admin Notifications</h2>
            <div className="space-y-3">
              {[
                'New merchant signup', 'Trial about to expire (2 days before)',
                'Merchant suspended', 'High message volume (>80% of limit)',
                'New support ticket', 'Service request received',
              ].map(item => (
                <label key={item} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 accent-red-600 w-4 h-4" />
                  <span className="text-sm text-slate-700">{item}</span>
                </label>
              ))}
            </div>
            <Button variant="primary" size="sm" className="mt-4">Save Preferences</Button>
          </Card>
        </div>
      )}

      {tab === 'security' && (
        <div className="max-w-xl space-y-4">
          <Card>
            <h2 className="font-semibold text-slate-800 mb-4">Admin Account Security</h2>
            <div className="space-y-3">
              <Input label="Admin email" defaultValue="admin@smartplatformcare.com" type="email" />
              <Input label="Current password" type="password" placeholder="Enter current password" />
              <Input label="New password" type="password" placeholder="New password" />
            </div>
            <Button variant="primary" size="sm" className="mt-4">Update Password</Button>
          </Card>
          <Card>
            <h2 className="font-semibold text-slate-800 mb-2">Audit Log</h2>
            <p className="text-xs text-slate-400 mb-3">All admin actions are logged. Full audit log viewer — Phase 2.</p>
            <div className="space-y-2 text-xs text-slate-600">
              {['Merchant suspended: Nubian Spice · 2d ago · admin@spc.com',
                'Plan changed: Sudan Craft → Pro · 3d ago · admin@spc.com',
                'Trial extended: AmaniRenas +7 days · 5d ago · admin@spc.com'].map(l => (
                <div key={l} className="bg-slate-50 rounded px-3 py-2 font-mono text-slate-500">{l}</div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
