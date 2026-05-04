'use client';
import { mockAnalytics, mockOrders, mockStore, STATUS_COLORS, STATUS_LABELS, timeAgo, formatCurrency, trialDaysLeft } from '@/lib/mockData';
import { StatCard, Card, Badge, Button, SectionHeader } from '@/components/ui';

const TIPS = [
  { icon: '📸', msg: 'You have 187 Instagram visits this week but only 12 orders. Try improving your product main images.' },
  { icon: '🛍️', msg: 'Your Bridal Ritual Set has only 8 orders — consider featuring it at the top of your catalog.' },
  { icon: '📣', msg: 'WhatsApp referrals have a 10.3% conversion rate — the highest of all sources. Share more on WhatsApp today.' },
];

function MiniBar({ value, max, color = 'bg-[#8B4513]' }) {
  return (
    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden w-full">
      <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${Math.min(100, (value / max) * 100)}%` }} />
    </div>
  );
}

function RevenueChart({ data }) {
  const max = Math.max(...data.map(d => d.revenue));
  return (
    <div className="flex items-end gap-2 h-24 mt-4">
      {data.map(d => (
        <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full bg-[#8B4513] rounded-t opacity-80 hover:opacity-100 transition-opacity"
            style={{ height: `${Math.max(8, (d.revenue / max) * 96)}px` }}
            title={`${d.day}: $${d.revenue}`}
          />
          <span className="text-xs text-slate-400">{d.day}</span>
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const daysLeft = trialDaysLeft(mockStore);
  const recentOrders = mockOrders.slice(0, 5);
  const { today, week, sourceBreakdown, topProducts, weeklyRevenue } = mockAnalytics;

  return (
    <div>
      <SectionHeader
        title="Good morning, Fatima 👋"
        description="Here's what's happening with AmaniRenas today."
        action={<Button href="/products" size="sm">+ Add Product</Button>}
      />

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Today's Messages" value={today.messages} icon="💬" trend="up" trendLabel="3 more" />
        <StatCard label="Today's Orders"   value={today.orders}   icon="🛒" trend="up" trendLabel="1 more" />
        <StatCard label="Today's Revenue"  value={`$${today.revenue}`} icon="💰" trend="up" trendLabel="$22" />
        <StatCard label="Conversion Rate"  value={`${today.conversionRate}%`} icon="📈" trend="down" trendLabel="0.3%" />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        {/* Revenue chart */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-semibold text-slate-800">Revenue This Week</h2>
            <span className="text-sm font-bold text-[#8B4513]">${week.revenue}</span>
          </div>
          <p className="text-xs text-slate-400 mb-2">{week.orders} orders · {week.messages} messages</p>
          <RevenueChart data={weeklyRevenue} />
        </Card>

        {/* Trial status */}
        <Card>
          <h2 className="font-semibold text-slate-800 mb-4">Trial Status</h2>
          <div className="text-center py-2">
            <div className="text-5xl font-bold text-[#8B4513]">{daysLeft}</div>
            <div className="text-sm text-slate-500 mt-1">days remaining</div>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden mt-4 mb-3">
            <div
              className="h-full bg-[#8B4513] rounded-full transition-all"
              style={{ width: `${Math.min(100, (daysLeft / 7) * 100)}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 text-center mb-4">Day {7 - daysLeft} of 7</p>
          <Button variant="primary" className="w-full" size="sm" href="/billing">
            Upgrade — Keep Your Store →
          </Button>
        </Card>
      </div>

      {/* Tips row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        {TIPS.map((tip, i) => (
          <div key={i} className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
            <span className="text-lg shrink-0">{tip.icon}</span>
            <p className="text-xs text-amber-800 leading-relaxed">{tip.msg}</p>
          </div>
        ))}
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent orders */}
        <Card padding="p-0">
          <div className="flex items-center justify-between p-5 pb-3">
            <h2 className="font-semibold text-slate-800">Recent Orders</h2>
            <Button variant="ghost" size="xs" href="/orders">View all →</Button>
          </div>
          <div className="divide-y divide-slate-50">
            {recentOrders.map(order => {
              const sc = STATUS_COLORS[order.status];
              return (
                <div key={order._id} className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{order.customerName || order.customerPhone}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{order.items.map(i => i.name).join(', ')}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={`${sc.bg} ${sc.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${sc.dot} inline-block`} />
                      {STATUS_LABELS[order.status]}
                    </Badge>
                    <p className="text-xs text-slate-400 mt-1">${order.total}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Source breakdown */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800">Orders by Source</h2>
            <Button variant="ghost" size="xs" href="/marketing">Marketing →</Button>
          </div>
          <div className="space-y-4">
            {sourceBreakdown.map(s => (
              <div key={s.source}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm capitalize font-medium text-slate-700">{s.source}</span>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>{s.orders} orders</span>
                    <span className="font-semibold text-[#8B4513]">{s.conversionRate}%</span>
                  </div>
                </div>
                <MiniBar value={s.orders} max={20} />
              </div>
            ))}
          </div>
          {/* Top products */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Top Products</h3>
            <div className="space-y-2">
              {topProducts.map((p, i) => (
                <div key={p.productId} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#FDF6EC] text-[#8B4513] text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    <span className="text-slate-700 truncate max-w-[160px]">{p.name}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs text-slate-500">{p.orders} orders</span>
                    <span className="text-xs font-medium text-[#8B4513] ml-2">${p.revenue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
