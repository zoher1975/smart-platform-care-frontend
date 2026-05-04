'use client';
import { mockMerchants } from '@/lib/mockData';
import { Card, StatCard, Badge, Button, SectionHeader } from '@/components/ui';

export default function AdminOverview() {
  const active = mockMerchants.filter(m => m.status === 'active').length;
  const trial  = mockMerchants.filter(m => m.plan === 'trial').length;

  return (
    <div>
      <SectionHeader title="Platform Overview" description="Smart Platform Care — Admin Dashboard" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Merchants" value={mockMerchants.length} icon="🏪" />
        <StatCard label="Active"          value={active}              icon="✅" />
        <StatCard label="On Trial"        value={trial}               icon="⏳" />
        <StatCard label="MRR (mock)"      value="$2,340"              icon="💰" />
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-800">All Merchants</h2>
          <Button variant="outline" size="sm" href="/admin/merchants">View all</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                {['Merchant', 'Store', 'Plan', 'Messages', 'Status', 'Actions'].map(h => (
                  <th key={h} className="pb-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {mockMerchants.map(m => (
                <tr key={m._id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 pr-4">
                    <p className="font-medium text-slate-800">{m.name}</p>
                    <p className="text-xs text-slate-400">{m.email}</p>
                  </td>
                  <td className="py-3.5 pr-4 text-slate-600">{m.storeName}</td>
                  <td className="py-3.5 pr-4">
                    <Badge variant={m.plan === 'pro' ? 'brand' : m.plan === 'trial' ? 'warning' : 'default'}>
                      {m.plan}
                    </Badge>
                  </td>
                  <td className="py-3.5 pr-4 text-slate-600">{m.messagesThisMonth.toLocaleString()}</td>
                  <td className="py-3.5 pr-4">
                    <Badge variant={m.status === 'active' ? 'success' : 'error'}>{m.status}</Badge>
                  </td>
                  <td className="py-3.5">
                    <div className="flex gap-2">
                      <Button variant="outline" size="xs">View</Button>
                      <Button variant={m.status === 'active' ? 'danger' : 'success'} size="xs">
                        {m.status === 'active' ? 'Suspend' : 'Activate'}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-4 p-4 bg-slate-100 rounded-xl border border-slate-200">
        <p className="text-xs font-semibold text-slate-600 mb-1">Admin capabilities available</p>
        <p className="text-xs text-slate-500">
          Activate/suspend merchants · Extend trial · Change plan · Edit pricing · View all stores ·
          Manage staff · Assign roles · View audit logs · Service orders · Support tickets
        </p>
        <p className="text-xs text-slate-400 mt-1.5">Full admin CRUD pages — Phase 2 implementation. Structure is in place.</p>
      </div>
    </div>
  );
}
