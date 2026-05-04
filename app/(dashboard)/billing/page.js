'use client';
import { mockStore, mockPlans, trialDaysLeft } from '@/lib/mockData';
import { Card, Button, Badge, SectionHeader } from '@/components/ui';

export default function BillingPage() {
  const daysLeft = trialDaysLeft(mockStore);
  const usedMessages = 38;
  const messageLimit = 50;
  const usedPct = Math.round((usedMessages / messageLimit) * 100);

  return (
    <div>
      <SectionHeader title="Billing & Subscription" description="Manage your plan and usage." />

      {/* Current status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        <Card className="lg:col-span-1">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-semibold text-slate-800">Current Plan</h2>
            <Badge variant="warning">Trial</Badge>
          </div>
          <p className="text-3xl font-bold text-[#8B4513] mt-3">{daysLeft}</p>
          <p className="text-sm text-slate-500">days remaining</p>

          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Trial period</span>
              <span>Day {7 - daysLeft} of 7</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${Math.min(100, ((7 - daysLeft) / 7) * 100)}%`,
                  background: daysLeft <= 2 ? '#EF4444' : '#8B4513',
                }}
              />
            </div>
          </div>

          {daysLeft <= 3 && (
            <div className={`mt-4 rounded-lg p-3 ${daysLeft <= 1 ? 'bg-red-50 border border-red-200' : 'bg-amber-50 border border-amber-200'}`}>
              <p className={`text-xs font-semibold ${daysLeft <= 1 ? 'text-red-800' : 'text-amber-800'}`}>
                {daysLeft === 0 ? '⚠️ Trial ended. Your store is paused.' : `⏳ ${daysLeft} day${daysLeft !== 1 ? 's' : ''} left — upgrade to keep your store active.`}
              </p>
            </div>
          )}
        </Card>

        <Card className="lg:col-span-1">
          <h2 className="font-semibold text-slate-800 mb-4">Message Usage</h2>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-3xl font-bold text-slate-900">{usedMessages}</span>
            <span className="text-slate-400 text-sm">/ {messageLimit}</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${usedPct}%`,
                background: usedPct >= 90 ? '#EF4444' : usedPct >= 70 ? '#F59E0B' : '#8B4513',
              }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">{messageLimit - usedMessages} messages remaining this month</p>
          <p className="text-xs text-slate-400 mt-1">Resets on June 1, 2024</p>
        </Card>

        <Card className="lg:col-span-1">
          <h2 className="font-semibold text-slate-800 mb-4">Included in Trial</h2>
          <ul className="space-y-2">
            {['Up to 50 messages/month', '10 products', 'WhatsApp automation', 'Basic analytics', 'Public storefront'].map(f => (
              <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                <span className="text-emerald-500">✓</span> {f}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Plans */}
      <h2 className="text-xl font-bold text-slate-900 mb-4">Choose Your Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {mockPlans.map(plan => (
          <div
            key={plan.id}
            className={`relative rounded-xl border p-5 flex flex-col transition-all
              ${plan.highlight
                ? 'border-[#8B4513] bg-[#FDF6EC] shadow-md'
                : 'border-slate-200 bg-white hover:border-[#D2691E]'
              }`}
          >
            {plan.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#8B4513] text-white text-xs font-bold px-3 py-1 rounded-full">
                RECOMMENDED
              </div>
            )}
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{plan.name}</p>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-bold text-slate-900">{plan.price === 0 ? 'Free' : `$${plan.price}`}</span>
              {plan.price > 0 && <span className="text-xs text-slate-400">{plan.period}</span>}
            </div>
            <ul className="mt-4 space-y-1.5 flex-1">
              {plan.features.map(f => (
                <li key={f} className="flex items-start gap-1.5 text-xs text-slate-600">
                  <span className="text-[#8B4513] mt-0.5">✓</span> {f}
                </li>
              ))}
            </ul>
            <Button
              variant={plan.highlight ? 'primary' : 'outline'}
              size="sm"
              className="mt-4 w-full"
              disabled={plan.id === 'trial'}
            >
              {plan.id === 'trial' ? 'Current Plan' : `Upgrade to ${plan.name}`}
            </Button>
          </div>
        ))}
      </div>

      {/* Note */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
        <p className="text-sm font-semibold text-slate-800 mb-1">💡 About plan pricing</p>
        <p className="text-xs text-slate-500 leading-relaxed">
          Prices and plan features are managed by the platform admin and may be adjusted. All upgrades are month-to-month with no long-term commitment. Need a custom plan? Contact support.
        </p>
      </div>
    </div>
  );
}
