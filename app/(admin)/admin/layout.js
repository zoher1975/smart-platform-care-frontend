'use client';
import { usePathname } from 'next/navigation';

const ADMIN_NAV = [
  { href: '/admin/overview',      icon: '▦',  label: 'Overview'       },
  { href: '/admin/merchants',     icon: '🏪', label: 'Merchants'      },
  { href: '/admin/orders',        icon: '🛒', label: 'Orders'         },
  { href: '/admin/subscriptions', icon: '💳', label: 'Subscriptions'  },
  { href: '/admin/plans',         icon: '📋', label: 'Plans & Pricing'},
  { href: '/admin/staff',         icon: '👥', label: 'Staff & Roles'  },
  { href: '/admin/services',      icon: '🔧', label: 'Services'       },
  { href: '/admin/support',       icon: '🎫', label: 'Support Tickets'},
  { href: '/admin/compliance',    icon: '🛡', label: 'Compliance'     },
  { href: '/admin/settings',      icon: '⚙️', label: 'Settings'       },
];

function AdminNav() {
  const pathname = usePathname();
  return (
    <aside className="w-56 shrink-0 bg-[#0A0E14] flex flex-col h-screen sticky top-0">
      <div className="px-5 py-5 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-red-600 flex items-center justify-center text-white text-xs font-bold">A</div>
          <div>
            <p className="text-white text-sm font-semibold">Admin Panel</p>
            <p className="text-slate-500 text-xs">Super Admin</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto scrollbar-hide">
        {ADMIN_NAV.map(item => (
          <a
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all
              ${pathname === item.href || pathname.startsWith(item.href + '/')
                ? 'bg-red-600 text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
          >
            <span className="text-base w-5 text-center">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="px-3 pb-4 border-t border-slate-800 pt-3 space-y-0.5">
        <a href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-xs text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all">
          ← Merchant Dashboard
        </a>
        <a href="/landing" className="flex items-center gap-3 px-3 py-2 text-xs text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all">
          ← Landing Page
        </a>
      </div>
    </aside>
  );
}

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminNav />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
