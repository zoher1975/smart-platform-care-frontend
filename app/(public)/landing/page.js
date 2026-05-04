'use client';
import { useState } from 'react';
import { mockPlans } from '@/lib/mockData';

const FEATURES = [
  { icon: '💬', title: 'WhatsApp Order Flow', desc: 'Customers browse your catalog and order — all inside WhatsApp. No app needed.' },
  { icon: '🤖', title: 'Automated Replies', desc: 'Reply to catalog requests, product questions, and payment instructions automatically.' },
  { icon: '📊', title: 'Order Dashboard', desc: 'Track every order, customer, and payment from a clean merchant dashboard.' },
  { icon: '📣', title: 'Marketing Links', desc: 'Share tracked links on Instagram, Facebook, and WhatsApp. See exactly where your orders come from.' },
  { icon: '🏪', title: 'Public Storefront', desc: 'A beautiful product catalog page your customers can browse before messaging you.' },
  { icon: '🌍', title: 'Arabic & English', desc: 'The platform and customer experience work in both languages, automatically.' },
];

const STEPS = [
  { num: '01', title: 'Create your store', desc: 'Set up in minutes. Add your logo, brand colours, and store details.' },
  { num: '02', title: 'Add your products', desc: 'Upload products with images, prices, and descriptions in Arabic and English.' },
  { num: '03', title: 'Share your link', desc: 'Post your store link on Instagram, Facebook, WhatsApp, or anywhere.' },
  { num: '04', title: 'Receive orders via WhatsApp', desc: 'Customers browse and order directly inside WhatsApp. You see every order in your dashboard.' },
  { num: '05', title: 'Track your results', desc: 'See which source drives the most orders and revenue, every day.' },
];

const FAQS = [
  { q: 'Do my customers need to download an app?', a: 'No. Your customers use WhatsApp, which they already have. There is nothing to install.' },
  { q: 'Can I use my existing WhatsApp number?', a: 'Yes. You connect your WhatsApp Business number and the platform works with it.' },
  { q: 'How many products can I add?', a: 'On the Basic plan you can add up to 50 products. Pro and Business plans are unlimited.' },
  { q: 'Is the 7-day trial really free?', a: 'Yes — no credit card required. You get full access for 7 days.' },
  { q: 'Can I use it in Arabic?', a: 'Yes. The system detects whether your customer writes in Arabic or English and replies accordingly.' },
  { q: 'What payment methods can I offer customers?', a: 'Bank transfer, mobile wallet, and cash on delivery. You configure the instructions in your store settings.' },
];

function PricingCard({ plan, highlighted }) {
  return (
    <div className={`relative flex flex-col rounded-2xl border p-7 transition-all
      ${highlighted
        ? 'border-[#8B4513] bg-[#8B4513] text-white shadow-2xl scale-105'
        : 'border-slate-200 bg-white text-slate-900 hover:border-[#D2691E]'
      }`}
    >
      {highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#F4A460] text-[#3D1F0A] text-xs font-bold px-3 py-1 rounded-full">
          MOST POPULAR
        </div>
      )}
      <div>
        <p className={`text-sm font-semibold uppercase tracking-wide ${highlighted ? 'text-amber-200' : 'text-slate-500'}`}>{plan.name}</p>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-4xl font-bold">{plan.price === 0 ? 'Free' : `$${plan.price}`}</span>
          {plan.price > 0 && <span className={`text-sm ${highlighted ? 'text-amber-200' : 'text-slate-400'}`}>{plan.period}</span>}
        </div>
        {plan.id === 'trial' && <p className={`text-xs mt-1 ${highlighted ? 'text-amber-200' : 'text-slate-400'}`}>7 days, no card required</p>}
      </div>
      <ul className="mt-6 space-y-2.5 flex-1">
        {plan.features.map(f => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <span className={`mt-0.5 ${highlighted ? 'text-amber-300' : 'text-[#8B4513]'}`}>✓</span>
            <span className={highlighted ? 'text-amber-50' : 'text-slate-600'}>{f}</span>
          </li>
        ))}
      </ul>
      <a
        href="/onboarding"
        className={`mt-7 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all
          ${highlighted
            ? 'bg-white text-[#8B4513] hover:bg-amber-50'
            : 'bg-[#8B4513] text-white hover:bg-[#7A3B1A]'
          }`}
      >
        {plan.id === 'trial' ? 'Start Free Trial' : 'Get Started'} →
      </a>
    </div>
  );
}

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        className="w-full flex items-center justify-between py-5 text-left text-slate-800 font-medium hover:text-[#8B4513] transition-colors"
        onClick={() => setOpen(!open)}
      >
        {faq.q}
        <span className={`text-slate-400 transition-transform ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && <p className="pb-5 text-sm text-slate-600 leading-relaxed">{faq.a}</p>}
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#8B4513] flex items-center justify-center text-white text-sm font-bold">S</div>
            <span className="font-semibold text-slate-900">Smart Platform Care</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <a href="#how" className="hover:text-[#8B4513] transition-colors">How it works</a>
            <a href="#features" className="hover:text-[#8B4513] transition-colors">Features</a>
            <a href="#pricing" className="hover:text-[#8B4513] transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-[#8B4513] transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="/dashboard" className="text-sm text-slate-600 hover:text-slate-900">Sign in</a>
            <a href="/onboarding"
               className="bg-[#8B4513] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#7A3B1A] transition-colors">
              Start Free →
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-[#FDF6EC] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
             style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #8B4513 0%, transparent 50%), radial-gradient(circle at 70% 80%, #D2691E 0%, transparent 50%)' }} />
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-20 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white border border-[#D2691E] text-[#8B4513] text-xs font-semibold px-3 py-1.5 rounded-full mb-8">
              🚀 7-day free trial — no credit card required
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-[#2C1810] leading-[1.05] tracking-tight">
              Turn WhatsApp<br />
              <span className="italic text-[#8B4513]">messages</span> into<br />
              orders and sales.
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-xl leading-relaxed">
              Create your store, add products, share your link on social media.
              Customers order through WhatsApp. You track everything from your dashboard.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="/onboarding"
                 className="inline-flex items-center gap-2 bg-[#8B4513] text-white font-bold px-7 py-4 rounded-xl hover:bg-[#7A3B1A] transition-all shadow-lg shadow-[#8B451330]">
                Start Free for 7 Days →
              </a>
              <a href="/store/amanirenas"
                 className="inline-flex items-center gap-2 text-[#8B4513] font-semibold hover:gap-3 transition-all">
                View demo store ↗
              </a>
            </div>
            <p className="mt-4 text-xs text-slate-400">No app download for customers. Works with any WhatsApp number.</p>
          </div>
        </div>

        {/* Floating preview card */}
        <div className="max-w-6xl mx-auto px-6 pb-16 relative">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 bg-slate-100 rounded px-3 py-1 text-xs text-slate-400 ml-2">
                wa.me/249912345678
              </div>
            </div>
            <div className="bg-[#ECE5DD] rounded-xl p-4 space-y-2">
              <div className="flex justify-end">
                <div className="bg-[#DCF8C6] rounded-xl rounded-tr-sm px-3 py-2 text-sm max-w-xs">
                  منتجات <span className="text-xs text-gray-400 ml-2">✓✓</span>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2 text-sm max-w-xs shadow-sm">
                  🛍️ المنتجات المتاحة:<br/>
                  <br/>
                  1. Karkar Oil 100ml — $18<br/>
                  2. Signature Bukhoor 50g — $28<br/>
                  3. Bridal Ritual Set — $58<br/>
                  <br/>
                  أرسل رقم المنتج لاختياره.
                  <span className="text-xs text-gray-400 ml-2">9:41</span>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-[#DCF8C6] rounded-xl rounded-tr-sm px-3 py-2 text-sm max-w-xs">
                  1 <span className="text-xs text-gray-400 ml-2">✓✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos / Trust */}
      <section className="border-b border-slate-100 py-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 text-slate-400 text-sm">
            <span className="font-semibold">Works with:</span>
            {['WhatsApp Business', 'Instagram', 'Facebook', 'Arabic & English'].map(t => (
              <span key={t} className="text-slate-500">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[#8B4513] text-sm font-semibold uppercase tracking-widest mb-3">How it works</p>
          <h2 className="text-4xl font-display font-bold text-slate-900">From zero to first order<br/>in under 30 minutes.</h2>
        </div>
        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute left-[19px] top-10 bottom-10 w-px bg-gradient-to-b from-[#8B4513] to-[#F4A460]" />
          <div className="space-y-10">
            {STEPS.map((step, i) => (
              <div key={step.num} className="flex gap-6 items-start">
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full bg-[#8B4513] flex items-center justify-center text-white text-sm font-bold">
                    {i + 1}
                  </div>
                </div>
                <div className="pt-2">
                  <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-1 text-slate-500 text-sm leading-relaxed max-w-lg">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#F4A460] text-sm font-semibold uppercase tracking-widest mb-3">Features</p>
            <h2 className="text-4xl font-display font-bold text-white">Everything you need to sell on WhatsApp.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(f => (
              <div key={f.title} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-[#8B4513] transition-colors">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-white mb-1.5">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo store callout */}
      <section className="py-16 bg-[#FDF6EC] border-y border-[#D2691E30]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1">
            <p className="text-[#8B4513] text-sm font-semibold uppercase tracking-widest mb-3">Live Demo</p>
            <h2 className="text-3xl font-display font-bold text-[#2C1810]">See the AmaniRenas demo store in action.</h2>
            <p className="mt-3 text-slate-600 text-sm leading-relaxed max-w-md">
              A real store built on Smart Platform Care. Browse products, click WhatsApp order button, and experience the full flow your customers will see.
            </p>
            <a href="/store/amanirenas"
               className="mt-6 inline-flex items-center gap-2 bg-[#8B4513] text-white font-semibold px-5 py-3 rounded-xl hover:bg-[#7A3B1A] transition-colors">
              View Demo Store →
            </a>
          </div>
          <div className="w-full max-w-xs lg:max-w-sm bg-white rounded-2xl overflow-hidden shadow-xl border border-[#D2691E30]">
            <img
              src="https://placehold.co/600x280/8B4513/FDF6EC?text=AmaniRenas+Store"
              alt="Demo store"
              className="w-full h-36 object-cover"
            />
            <div className="p-5">
              <p className="font-display font-bold text-[#2C1810] text-lg">AmaniRenas</p>
              <p className="text-slate-500 text-xs mt-0.5">Rooted in Heritage. Made for You.</p>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {['Karkar Oil', 'Dalka', 'Bukhoor', 'Oud Oil'].map(p => (
                  <div key={p} className="bg-[#FDF6EC] rounded-lg p-2 text-center text-xs text-[#8B4513] font-medium">{p}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[#8B4513] text-sm font-semibold uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-4xl font-display font-bold text-slate-900">Start free. Grow without limits.</h2>
          <p className="mt-3 text-slate-500 max-w-lg mx-auto">All plans include the full WhatsApp order flow. No hidden fees.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
          {mockPlans.map(plan => (
            <PricingCard key={plan.id} plan={plan} highlighted={plan.highlight} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#8B4513] text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-3xl font-display font-bold text-slate-900">Common questions.</h2>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 px-6">
            {FAQS.map(faq => <FAQItem key={faq.q} faq={faq} />)}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-[#2C1810]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-display font-bold text-white">Ready to turn messages into orders?</h2>
          <p className="mt-3 text-slate-400 text-sm">7 days free. No credit card. Your first WhatsApp order is one step away.</p>
          <a href="/onboarding"
             className="mt-8 inline-flex items-center gap-2 bg-[#F4A460] text-[#2C1810] font-bold px-8 py-4 rounded-xl hover:bg-[#E8913F] transition-colors text-lg">
            Start Free for 7 Days →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#8B4513] flex items-center justify-center text-white text-xs font-bold">S</div>
            <span>Smart Platform Care</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
          <span>© 2024 Smart Platform Care. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
