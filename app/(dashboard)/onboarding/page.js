'use client';
import { useState } from 'react';
import { mockProducts } from '@/lib/mockData';
import { Button, Input, Select, Card, WhatsAppPreview } from '@/components/ui';

const STEPS = [
  { id: 1, label: 'Store Info' },
  { id: 2, label: 'Branding' },
  { id: 3, label: 'Products' },
  { id: 4, label: 'WhatsApp' },
  { id: 5, label: 'Publish' },
];

const CATEGORIES = ['Beauty & Skincare', 'Fashion', 'Food & Grocery', 'Electronics', 'Handmade', 'Other'];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((s, i) => (
        <div key={s.id} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
              ${s.id < current ? 'bg-emerald-500 text-white' : s.id === current ? 'bg-[#8B4513] text-white' : 'bg-slate-200 text-slate-400'}`}>
              {s.id < current ? '✓' : s.id}
            </div>
            <span className={`text-xs whitespace-nowrap hidden sm:block ${s.id === current ? 'text-[#8B4513] font-medium' : 'text-slate-400'}`}>{s.label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`h-px w-8 sm:w-16 mx-1 transition-all ${s.id < current ? 'bg-emerald-400' : 'bg-slate-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// Step 1
function Step1({ data, onChange }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900">Tell us about your store</h2>
      <p className="text-sm text-slate-500">This takes about 2 minutes. You can always change it later.</p>
      <Input label="Store name *" value={data.name} onChange={e => onChange('name', e.target.value)} placeholder="e.g. AmaniRenas" />
      <Select label="Category *" value={data.category} onChange={e => onChange('category', e.target.value)}>
        <option value="">Select a category…</option>
        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
      </Select>
      <div className="grid grid-cols-2 gap-3">
        <Select label="Currency" value={data.currency} onChange={e => onChange('currency', e.target.value)}>
          <option value="USD">USD — $</option>
          <option value="GBP">GBP — £</option>
          <option value="SAR">SAR — ﷼</option>
          <option value="SDG">SDG — ج.س</option>
          <option value="AED">AED — د.إ</option>
        </Select>
        <Input label="WhatsApp number *" value={data.whatsapp} onChange={e => onChange('whatsapp', e.target.value)} placeholder="+249912345678" type="tel" />
      </div>
    </div>
  );
}

// Step 2
function Step2({ data, onChange }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900">Brand your store</h2>
      <p className="text-sm text-slate-500">Your logo and colours appear in your storefront and will be used in the future dashboard.</p>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Logo (square, min 400×400px)</label>
        <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 hover:border-[#8B4513] transition-colors cursor-pointer">
          <span className="text-3xl mb-2">🖼</span>
          <p className="text-sm font-medium">Click to upload logo</p>
          <p className="text-xs mt-1">PNG, JPG, SVG — max 2MB</p>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Banner image (min 1200×400px)</label>
        <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-[#8B4513] transition-colors cursor-pointer">
          <span className="text-2xl mb-1">🖼</span>
          <p className="text-xs">Upload banner image</p>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Main brand colour</label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={data.primaryColor || '#8B4513'}
            onChange={e => onChange('primaryColor', e.target.value)}
            className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer"
          />
          <Input
            value={data.primaryColor || '#8B4513'}
            onChange={e => onChange('primaryColor', e.target.value)}
            placeholder="#8B4513"
            className="flex-1"
          />
        </div>
      </div>
      <Input label="Store slogan (optional)" value={data.slogan} onChange={e => onChange('slogan', e.target.value)} placeholder="Rooted in Heritage. Made for You." />
    </div>
  );
}

// Step 3
function Step3() {
  const [useMock, setUseMock] = useState(true);
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900">Add your first products</h2>
      <p className="text-sm text-slate-500">Add at least 3 products to increase conversion. You can always add more later.</p>

      <div className="flex gap-3">
        <button
          onClick={() => setUseMock(true)}
          className={`flex-1 border-2 rounded-xl p-4 text-sm font-medium transition-all ${useMock ? 'border-[#8B4513] bg-[#FDF6EC] text-[#8B4513]' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
        >
          Use demo products
          <span className="block text-xs font-normal mt-0.5 opacity-70">Start with example products to explore the flow</span>
        </button>
        <button
          onClick={() => setUseMock(false)}
          className={`flex-1 border-2 rounded-xl p-4 text-sm font-medium transition-all ${!useMock ? 'border-[#8B4513] bg-[#FDF6EC] text-[#8B4513]' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
        >
          Add my own products
          <span className="block text-xs font-normal mt-0.5 opacity-70">Enter your real product names and prices</span>
        </button>
      </div>

      {useMock ? (
        <div className="grid grid-cols-2 gap-3">
          {mockProducts.slice(0, 4).map(p => (
            <div key={p._id} className="border border-slate-200 rounded-xl p-3 flex items-center gap-3 bg-slate-50">
              <img src={p.imageUrl} alt={p.name} className="w-10 h-10 rounded-lg object-cover" onError={e => { e.target.src = `https://placehold.co/40x40/8B4513/FDF6EC?text=P`; }} />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-800 truncate">{p.name}</p>
                <p className="text-xs text-[#8B4513]">{p.currency} {p.price}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center text-slate-400">
          <p className="text-2xl mb-2">+</p>
          <p className="text-sm font-medium">Add your first product</p>
          <p className="text-xs mt-1">You can add up to 5 images per product. The first image is shown in WhatsApp.</p>
          <Button variant="primary" size="sm" className="mt-4">+ Add Product</Button>
        </div>
      )}
    </div>
  );
}

// Step 4
function Step4({ data, onChange }) {
  const previewMsg = `Hello, I want to order: Karkar Oil 100ml`;
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900">WhatsApp order setup</h2>
      <p className="text-sm text-slate-500">When a customer taps "Order on WhatsApp", this message is sent automatically.</p>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Order message template</label>
        <textarea
          value={data.orderMessage || 'Hello, I want to order: {{product_name}}'}
          onChange={e => onChange('orderMessage', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#8B4513] font-mono"
        />
        <p className="text-xs text-slate-400 mt-1">Use {'{{product_name}}'} as a placeholder — it's replaced automatically.</p>
      </div>

      <div>
        <p className="text-sm font-medium text-slate-700 mb-2">Preview</p>
        <div className="bg-[#ECE5DD] rounded-xl p-4">
          <div className="flex justify-end">
            <div className="bg-[#DCF8C6] rounded-xl rounded-tr-sm px-3 py-2 text-sm max-w-xs">
              {previewMsg}
              <span className="text-xs text-gray-400 ml-2">✓✓</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-1.5">This is what the customer's WhatsApp will look like when they tap the order button.</p>
      </div>

      <div className="bg-[#FDF6EC] border border-[#D2691E40] rounded-xl p-4">
        <p className="text-xs font-semibold text-[#8B4513]">💡 Tip: you can also attach images</p>
        <p className="text-xs text-[#8B4513]/70 mt-0.5">Customers can attach their own images in WhatsApp (e.g. to explain a custom order). You'll see this in your Orders page.</p>
      </div>
    </div>
  );
}

// Step 5
function Step5({ storeData }) {
  const [copied, setCopied] = useState(false);
  const slug = (storeData.name || 'my-store').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const storeUrl = `https://smartplatformcare.com/store/${slug}`;

  const copy = () => {
    navigator.clipboard.writeText(storeUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="text-center space-y-6">
      <div className="text-5xl">🎉</div>
      <h2 className="text-2xl font-bold text-slate-900">Your store is ready!</h2>
      <p className="text-slate-500 text-sm max-w-sm mx-auto">Share your link on Instagram, Facebook, or WhatsApp. Every customer who clicks can order through WhatsApp in seconds.</p>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center gap-2 max-w-md mx-auto">
        <span className="text-xs text-slate-600 flex-1 truncate font-mono">{storeUrl}</span>
        <button
          onClick={copy}
          className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${copied ? 'bg-emerald-100 text-emerald-700' : 'bg-[#8B4513] text-white hover:bg-[#7A3B1A]'}`}
        >
          {copied ? '✓ Copied!' : 'Copy Link'}
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-3 text-sm">
        {[
          { label: '📸 Share on Instagram', url: storeUrl },
          { label: '📘 Share on Facebook',  url: storeUrl },
          { label: '💬 Share on WhatsApp',  url: `https://wa.me/?text=Check out my store: ${storeUrl}` },
        ].map(s => (
          <a key={s.label} href={s.url} target="_blank" rel="noreferrer"
             className="px-4 py-2 border border-slate-200 rounded-lg bg-white hover:border-[#8B4513] hover:text-[#8B4513] transition-all">
            {s.label}
          </a>
        ))}
      </div>

      <div className="pt-4">
        <Button variant="primary" size="lg" href="/dashboard">Go to Dashboard →</Button>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    name: '', category: '', currency: 'USD', whatsapp: '',
    primaryColor: '#8B4513', slogan: '',
    orderMessage: 'Hello, I want to order: {{product_name}}',
  });

  const handleField = (k, v) => setData(d => ({ ...d, [k]: v }));
  const canProceed = step === 1 ? (data.name && data.category && data.whatsapp) : true;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-[#8B4513] flex items-center justify-center text-white text-sm font-bold">S</div>
          <span className="font-semibold text-slate-800">Smart Platform Care</span>
        </div>
        <a href="/dashboard" className="text-xs text-slate-400 hover:text-slate-600">Skip for now</a>
      </div>

      <div className="flex-1 flex flex-col items-center py-10 px-4">
        {/* Step indicator */}
        <div className="mb-8">
          <StepIndicator current={step} />
        </div>

        {/* Step card */}
        <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          {step === 1 && <Step1 data={data} onChange={handleField} />}
          {step === 2 && <Step2 data={data} onChange={handleField} />}
          {step === 3 && <Step3 />}
          {step === 4 && <Step4 data={data} onChange={handleField} />}
          {step === 5 && <Step5 storeData={data} />}

          {step < 5 && (
            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(s => s - 1)} className="flex-1">← Back</Button>
              )}
              <Button
                variant="primary"
                onClick={() => setStep(s => s + 1)}
                disabled={!canProceed}
                className="flex-1"
              >
                {step === 4 ? 'Publish Store →' : 'Continue →'}
              </Button>
            </div>
          )}
        </div>

        {/* Progress */}
        <p className="mt-4 text-xs text-slate-400">Step {step} of {STEPS.length}</p>
      </div>
    </div>
  );
}
