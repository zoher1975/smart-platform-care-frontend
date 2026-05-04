'use client';
import { Card, Button, Badge, SectionHeader } from '@/components/ui';

const STAFF = [
  { id: 's1', name: 'Admin User',   email: 'admin@spc.com',   role: 'Admin',      status: 'active' },
  { id: 's2', name: 'Sara Hassan',  email: 'sara@spc.com',    role: 'Support',    status: 'active' },
  { id: 's3', name: 'Karim Ali',    email: 'karim@spc.com',   role: 'Technician', status: 'active' },
  { id: 's4', name: 'Layla Osman',  email: 'layla@spc.com',   role: 'Finance',    status: 'inactive' },
];

const ROLES = ['Owner', 'Admin', 'Support', 'Sales', 'Finance', 'Compliance', 'Technician', 'Developer'];

const PERMISSIONS = [
  { key: 'users.view',          label: 'View users' },
  { key: 'users.suspend',       label: 'Suspend users' },
  { key: 'stores.view',         label: 'View stores' },
  { key: 'subscriptions.edit',  label: 'Edit subscriptions' },
  { key: 'plans.edit',          label: 'Edit plans & pricing' },
  { key: 'orders.view',         label: 'View orders' },
  { key: 'staff.manage',        label: 'Manage staff' },
  { key: 'services.manage',     label: 'Manage services' },
  { key: 'support.manage',      label: 'Manage support' },
  { key: 'campaigns.approve',   label: 'Approve campaigns' },
];

const ROLE_PERMISSIONS = {
  Owner:      PERMISSIONS.map(p => p.key),
  Admin:      ['users.view', 'users.suspend', 'stores.view', 'subscriptions.edit', 'orders.view', 'staff.manage', 'services.manage', 'support.manage'],
  Support:    ['users.view', 'stores.view', 'orders.view', 'support.manage'],
  Finance:    ['users.view', 'subscriptions.edit', 'plans.edit'],
  Technician: ['stores.view', 'services.manage', 'orders.view'],
  Developer:  PERMISSIONS.map(p => p.key),
  Sales:      ['users.view', 'stores.view', 'orders.view'],
  Compliance: ['users.view', 'stores.view', 'campaigns.approve'],
};

const ROLE_COLORS = {
  Owner: 'bg-red-100 text-red-800', Admin: 'bg-purple-100 text-purple-800',
  Support: 'bg-blue-100 text-blue-800', Finance: 'bg-green-100 text-green-800',
  Technician: 'bg-amber-100 text-amber-800', Developer: 'bg-slate-100 text-slate-800',
  Sales: 'bg-indigo-100 text-indigo-800', Compliance: 'bg-teal-100 text-teal-800',
};

export default function StaffPage() {
  return (
    <div>
      <SectionHeader
        title="Staff & Roles"
        description="Manage team members and their permissions."
        action={<Button size="sm">+ Invite Staff</Button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        {/* Staff list */}
        <Card>
          <h2 className="font-semibold text-slate-800 mb-4">Team Members</h2>
          <div className="space-y-3">
            {STAFF.map(s => (
              <div key={s.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm">
                    {s.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{s.name}</p>
                    <p className="text-xs text-slate-400">{s.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ROLE_COLORS[s.role]}`}>{s.role}</span>
                  <Badge variant={s.status === 'active' ? 'success' : 'default'}>{s.status}</Badge>
                  <Button variant="ghost" size="xs">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Role picker */}
        <Card>
          <h2 className="font-semibold text-slate-800 mb-4">Available Roles</h2>
          <div className="flex flex-wrap gap-2">
            {ROLES.map(r => (
              <span key={r} className={`px-3 py-1 rounded-lg text-xs font-semibold ${ROLE_COLORS[r]}`}>{r}</span>
            ))}
          </div>
        </Card>
      </div>

      {/* Permission matrix */}
      <Card>
        <h2 className="font-semibold text-slate-800 mb-4">Permission Matrix</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-3 text-left font-semibold text-slate-500 pr-4">Permission</th>
                {['Admin', 'Support', 'Finance', 'Technician', 'Compliance'].map(r => (
                  <th key={r} className="pb-3 text-center font-semibold text-slate-500 px-2 whitespace-nowrap">{r}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {PERMISSIONS.map(p => (
                <tr key={p.key} className="hover:bg-slate-50">
                  <td className="py-2.5 pr-4 font-medium text-slate-700">{p.label}</td>
                  {['Admin', 'Support', 'Finance', 'Technician', 'Compliance'].map(r => {
                    const has = (ROLE_PERMISSIONS[r] || []).includes(p.key);
                    return (
                      <td key={r} className="py-2.5 text-center px-2">
                        <span className={has ? 'text-emerald-500 text-base' : 'text-slate-200 text-base'}>
                          {has ? '✓' : '–'}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-3">Owner and Developer roles have all permissions. Shown above are the configurable roles.</p>
      </Card>
    </div>
  );
}
