'use client';
import { usePathname } from 'next/navigation';
import { mockStore, trialDaysLeft } from '@/lib/mockData';
import { TrialBanner } from '@/components/ui';

const NAV_ITEMS = [
  { href: '/dashboard', icon: '▦',  label: 'Overview'   },
  { href: '/products',  icon: '📦', label: 'Products'   },
  { href: '/orders',    icon: '🛒', label: 'Orders'     },
  { href: '/customers', icon: '👥', label: 'Customers'  },
  { href: '/marketing', icon: '📣', label: 'Marketing'  },
  { href: '/billing',   icon: '💳', label: 'Billing'    },
  { href: '/settings',  icon: '⚙️', label: 'Settings'   },
];

function NavLink({ item, active }) {
  return (
    <a
      href={item.href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all
        ${active
          ? 'bg-[#8B4513] text-white shadow-sm'
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
        }`}
    >
      <span className="text-base w-5 text-center">{item.icon}</span>
      <span className="font-medium">{item.label}</span>
    </a>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 bg-[#0F1520] flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-800">
        <a href="/landing" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#8B4513] flex items-center justify-center text-white text-sm font-bold">
            S
          </div>
          <div>
            <p className="text-white text-sm font-semibold leading-tight">Smart Platform</p>
            <p className="text-slate-500 text-xs">Care</p>
          </div>
        </a>
      </div>

      {/* Store badge */}
      <div className="px-4 py-3 mx-3 mt-3 bg-slate-800 rounded-lg">
        <div className="flex items-center gap-2">
          <img
            src={mockStore.branding.logoUrl}
            alt="logo"
            className="w-7 h-7 rounded-md object-cover"
            onError={e => { e.target.src = 'https://placehold.co/28x28/8B4513/FDF6EC?text=AR'; }}
          />
          <div className="min-w-0">
            <p className="text-white text-xs font-semibold truncate">{mockStore.name}</p>
            <p className="text-slate-500 text-xs truncate">/{mockStore.slug}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto scrollbar-hide">
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.href}
            item={item}
            active={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
          />
        ))}
      </nav>

      {/* Bottom links */}
      <div className="px-3 pb-4 border-t border-slate-800 pt-3 space-y-0.5">
        <a
          href={`/store/${mockStore.slug}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <span>🔗</span> View Storefront
        </a>
        <a
          href="/admin/overview"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <span>🛡</span> Admin Panel
        </a>
        <a
          href="/onboarding"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <span>🧭</span> Setup Wizard
        </a>
        {/* User row */}
        <div className="flex items-center gap-3 px-3 py-2 mt-1">
          <div className="w-7 h-7 rounded-full bg-[#8B4513] flex items-center justify-center text-white text-xs font-bold">
            F
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-medium truncate">Fatima</p>
            <p className="text-slate-500 text-xs truncate">Owner</p>
          </div>
          <a href="/settings" className="ml-auto text-slate-500 hover:text-white text-xs transition-colors">⚙</a>
        </div>
      </div>
    </aside>
  );
}

export function DashboardLayout({ children }) {
  const daysLeft = trialDaysLeft(mockStore);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {mockStore.plan === 'trial' && <TrialBanner daysLeft={daysLeft} />}
        <main className="flex-1 p-6 max-w-7xl w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
