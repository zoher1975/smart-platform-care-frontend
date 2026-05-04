'use client';
import { useState } from 'react';
import { mockStore } from '@/lib/mockData';
import { Card, Button, Input, Textarea, SectionHeader } from '@/components/ui';

export default function SettingsPage() {
  const [tab, setTab] = useState('store');
  const tabs = ['store', 'payment', 'security'];

  return (
    <div>
      <SectionHeader title="Settings" description="Manage your store configuration." />

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-200 mb-6">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium capitalize transition-all border-b-2 -mb-px
              ${tab === t ? 'border-[#8B4513] text-[#8B4513]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            {t === 'store' ? 'Store Info' : t === 'payment' ? 'Payment Methods' : 'Security'}
          </button>
        ))}
      </div>

      {tab === 'store' && (
        <div className="max-w-xl space-y-5">
          <Card>
            <h2 className="font-semibold text-slate-800 mb-4">Store Details</h2>
            <div className="space-y-4">
              <Input label="Store name" defaultValue={mockStore.name} />
              <Input label="WhatsApp number" defaultValue={mockStore.phone} type="tel" />
              <Input label="Store slogan" defaultValue={mockStore.branding.slogan} />
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Brand colour</label>
                <div className="flex items-center gap-3">
                  <input type="color" defaultValue={mockStore.branding.primaryColor} className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer" />
                  <Input defaultValue={mockStore.branding.primaryColor} className="flex-1" />
                </div>
              </div>
            </div>
            <Button variant="primary" size="sm" className="mt-5">Save Changes</Button>
          </Card>
        </div>
      )}

      {tab === 'payment' && (
        <div className="max-w-xl space-y-4">
          {[
            { key: 'bankTransfer', label: 'Bank Transfer', icon: '🏦' },
            { key: 'wallet', label: 'Mobile Wallet', icon: '📱' },
            { key: 'cashOnDelivery', label: 'Cash on Delivery', icon: '💵' },
          ].map(m => {
            const method = mockStore.paymentMethods[m.key];
            return (
              <Card key={m.key}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span>{m.icon}</span>
                    <h3 className="font-semibold text-slate-800">{m.label}</h3>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={method.enabled} className="sr-only peer" />
                    <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:bg-[#8B4513] transition-all after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                  </label>
                </div>
                <Textarea
                  label="Payment instructions"
                  defaultValue={method.instructions}
                  rows={3}
                  placeholder="Enter instructions customers will see after choosing this method…"
                />
              </Card>
            );
          })}
          <Button variant="primary" size="sm">Save Payment Settings</Button>
        </div>
      )}

      {tab === 'security' && (
        <div className="max-w-xl space-y-4">
          <Card>
            <h2 className="font-semibold text-slate-800 mb-4">Account Security</h2>
            <div className="space-y-4">
              <Input label="Email address" defaultValue="fatima@amanirenas.uk" type="email" />
              <Input label="Current password" type="password" placeholder="Enter current password" />
              <Input label="New password" type="password" placeholder="Enter new password" />
              <Input label="Confirm new password" type="password" placeholder="Confirm new password" />
            </div>
            <Button variant="primary" size="sm" className="mt-5">Update Password</Button>
          </Card>
          <Card>
            <h2 className="font-semibold text-slate-800 mb-2">Change WhatsApp Number</h2>
            <p className="text-xs text-slate-500 mb-3">Changing your WhatsApp number requires verification. Your automation will pause during the change.</p>
            <Button variant="outline" size="sm">Change WhatsApp Number</Button>
          </Card>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-amber-800">Phone OTP login — Phase 2</p>
            <p className="text-xs text-amber-700 mt-0.5">Login via phone number + OTP will be available in a future update.</p>
          </div>
        </div>
      )}
    </div>
  );
}
