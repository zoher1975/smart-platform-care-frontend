'use client';
import { useState } from 'react';
import { mockProducts } from '@/lib/mockData';
import { Card, Button, Badge, SectionHeader, Input, Select, Textarea, WhatsAppPreview } from '@/components/ui';

const CATEGORIES = ['All', 'Body Care', 'Hair Care', 'Fragrance', 'Wellness'];

function ProductCard({ product, onEdit }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-all group">
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={e => { e.target.src = `https://placehold.co/400x400/8B4513/FDF6EC?text=${encodeURIComponent(product.name)}`; }}
        />
        <div className="absolute top-2 right-2 flex gap-1">
          <Badge variant={product.active ? 'success' : 'default'}>{product.active ? 'Active' : 'Hidden'}</Badge>
        </div>
        {product.images && product.images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded">
            +{product.images.length - 1}
          </div>
        )}
      </div>
      <div className="p-4">
        <Badge variant="default" className="mb-2">{product.category}</Badge>
        <h3 className="font-semibold text-slate-800 text-sm leading-tight">{product.name}</h3>
        <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-[#8B4513] font-bold">{product.currency} {product.price}</span>
          <span className="text-xs text-slate-400">{product.orders} orders</span>
        </div>
        <div className="mt-3 flex gap-2">
          <Button variant="outline" size="xs" className="flex-1" onClick={() => onEdit(product)}>Edit</Button>
          <Button variant="ghost" size="xs">⋮</Button>
        </div>
      </div>
    </div>
  );
}

function ProductModal({ product, onClose }) {
  const isNew = !product._id;
  const [form, setForm] = useState(product || {
    name: '', price: '', category: 'Body Care', description: '', currency: 'USD', active: true,
    images: [],
  });
  const [previewImg, setPreviewImg] = useState(0);

  const handleField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const MOCK_IMAGES = [
    'https://placehold.co/800x800/8B4513/FDF6EC?text=Image+1',
    'https://placehold.co/800x800/D2691E/FDF6EC?text=Image+2',
    'https://placehold.co/800x800/F4A460/3D1F0A?text=Image+3',
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="font-bold text-slate-900">{isNew ? 'Add Product' : 'Edit Product'}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl">×</button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: form */}
          <div className="space-y-4">
            <Input label="Product name" value={form.name} onChange={e => handleField('name', e.target.value)} placeholder="e.g. Karkar Oil 100ml" />

            <div className="grid grid-cols-2 gap-3">
              <Input label="Price" type="number" value={form.price} onChange={e => handleField('price', e.target.value)} />
              <Select label="Currency" value={form.currency} onChange={e => handleField('currency', e.target.value)}>
                <option>USD</option><option>GBP</option><option>SAR</option><option>SDG</option>
              </Select>
            </div>

            <Select label="Category" value={form.category} onChange={e => handleField('category', e.target.value)}>
              {['Body Care', 'Hair Care', 'Fragrance', 'Wellness', 'Other'].map(c => <option key={c}>{c}</option>)}
            </Select>

            <Textarea label="Description" rows={3} value={form.description} onChange={e => handleField('description', e.target.value)} placeholder="Describe the product..." />

            {/* Image upload section */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Product Images (up to 5)</label>
              <div className="bg-[#FDF6EC] border border-[#D2691E40] rounded-lg p-3 mb-3">
                <p className="text-xs font-semibold text-[#8B4513]">📌 Main Image — used in WhatsApp and store previews</p>
                <p className="text-xs text-[#8B4513]/70 mt-0.5">Choose a clear, well-lit first image. It's the first thing customers see in WhatsApp.</p>
              </div>

              {/* Image slots */}
              <div className="flex gap-2 flex-wrap">
                {MOCK_IMAGES.map((img, i) => (
                  <div
                    key={i}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${previewImg === i ? 'border-[#8B4513]' : 'border-slate-200 hover:border-[#D2691E]'}`}
                    onClick={() => setPreviewImg(i)}
                  >
                    <img src={img} alt={`Image ${i+1}`} className="w-full h-full object-cover" />
                    {i === 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-[#8B4513] text-white text-center" style={{ fontSize: '8px', padding: '1px' }}>MAIN</div>
                    )}
                  </div>
                ))}
                {MOCK_IMAGES.length < 5 && (
                  <button className="w-16 h-16 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:border-[#8B4513] hover:text-[#8B4513] transition-colors text-xl">
                    +
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1.5">{MOCK_IMAGES.length}/5 images</p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="active"
                checked={form.active}
                onChange={e => handleField('active', e.target.checked)}
                className="rounded border-slate-300 text-[#8B4513] accent-[#8B4513]"
              />
              <label htmlFor="active" className="text-sm text-slate-700">Product is active (visible in catalog)</label>
            </div>
          </div>

          {/* Right: WhatsApp preview */}
          <div>
            <p className="text-sm font-medium text-slate-700 mb-3">WhatsApp Preview</p>
            <WhatsAppPreview product={{
              name: form.name || 'Product Name',
              price: form.price || '0',
              currency: form.currency || 'USD',
              description: form.description || 'Product description will appear here.',
              imageUrl: MOCK_IMAGES[previewImg] || form.imageUrl,
            }} />
            <div className="mt-4 bg-slate-50 rounded-lg p-3">
              <p className="text-xs font-medium text-slate-600 mb-1">Order message sent to WhatsApp:</p>
              <code className="text-xs text-slate-500 block bg-white border border-slate-200 rounded px-2 py-1.5">
                Hello, I want to order: {form.name || '[product name]'}
              </code>
            </div>
          </div>
        </div>

        <div className="flex gap-3 p-6 pt-0 border-t border-slate-100">
          <Button variant="primary" className="flex-1">
            {isNew ? 'Add Product' : 'Save Changes'}
          </Button>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [cat, setCat] = useState('All');
  const [modal, setModal] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = mockProducts.filter(p =>
    (cat === 'All' || p.category === cat) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <SectionHeader
        title="Products"
        description={`${mockProducts.length} products in your catalog`}
        action={<Button onClick={() => setModal({})}>+ Add Product</Button>}
      />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Search products…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#8B4513] w-48"
        />
        <div className="flex gap-1">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${cat === c ? 'bg-[#8B4513] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-[#8B4513]'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Image guidance callout */}
      <div className="bg-[#FDF6EC] border border-[#D2691E40] rounded-xl px-5 py-3.5 mb-6 flex items-start gap-3">
        <span className="text-lg">📷</span>
        <div>
          <p className="text-sm font-semibold text-[#8B4513]">Image tip: your first product image is what customers see in WhatsApp</p>
          <p className="text-xs text-[#8B4513]/70 mt-0.5">Use clear, well-lit photos with a plain or light background. This directly affects how many customers click to order.</p>
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(p => (
          <ProductCard key={p._id} product={p} onEdit={setModal} />
        ))}
        {/* Add new card */}
        <button
          onClick={() => setModal({})}
          className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-2 py-10 text-slate-400 hover:border-[#8B4513] hover:text-[#8B4513] transition-colors aspect-square"
        >
          <span className="text-3xl">+</span>
          <span className="text-xs font-medium">Add Product</span>
        </button>
      </div>

      {modal !== null && <ProductModal product={modal} onClose={() => setModal(null)} />}
    </div>
  );
}
