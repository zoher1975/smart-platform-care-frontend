'use client';
import { useState } from 'react';
import { mockStore, mockProducts } from '@/lib/mockData';

// In production this would fetch: GET /api/stores?slug=<slug>
// and GET /api/products?storeId=<storeId>
function getStoreData(slug) {
  if (slug === mockStore.slug || !slug) return { store: mockStore, products: mockProducts };
  return { store: { ...mockStore, name: slug, slug }, products: mockProducts };
}

const CATEGORIES = ['All', 'Body Care', 'Hair Care', 'Fragrance', 'Wellness'];

function ProductModal({ product, store, onClose }) {
  const [mainImg, setMainImg] = useState(0);
  const waNumber = (store.whatsappNumber || store.phone || '').replace(/\D/g, '');
  const waMsg    = encodeURIComponent(`Hello, I want to order: ${product.name}`);
  const waUrl    = `https://wa.me/${waNumber}?text=${waMsg}`;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <span className="text-xs text-slate-400 uppercase tracking-wide font-medium">{product.category}</span>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">x</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-4">
            <img src={product.images[mainImg]} alt={product.name} className="w-full aspect-square object-cover rounded-xl"
              onError={e => { e.target.src = `https://placehold.co/600x600/8B4513/FDF6EC?text=${encodeURIComponent(product.name)}`; }} />
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-3">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setMainImg(i)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${mainImg === i ? 'border-[#8B4513]' : 'border-slate-200 hover:border-slate-300'}`}>
                    <img src={img} alt={i + 1} className="w-full h-full object-cover"
                      onError={e => { e.target.src = `https://placehold.co/56x56/8B4513/FDF6EC?text=${i+1}`; }} />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="p-6 flex flex-col">
            <h2 className="text-xl font-bold text-[#2C1810]" style={{ fontFamily: "'DM Serif Display', serif" }}>{product.name}</h2>
            {product.nameAr && <p className="text-sm text-slate-400 mt-0.5 text-right" dir="rtl">{product.nameAr}</p>}
            <p className="text-2xl font-bold text-[#8B4513] mt-3">{product.currency} {product.price}</p>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed flex-1">{product.description}</p>
            <div className="mt-6 space-y-2.5">
              <a href={waUrl} target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-2.5 w-full bg-[#25D366] hover:bg-[#20b458] text-white font-bold py-3.5 rounded-xl transition-colors text-sm">
                <span className="text-lg">💬</span> Order on WhatsApp
              </a>
              <p className="text-xs text-slate-400 text-center">Your WhatsApp will open with the order message ready to send.</p>
              <p className="text-xs text-slate-400 text-center">💡 You can attach an image in WhatsApp to describe a custom request.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StorePage({ params }) {
  const { slug } = params;
  const { store, products } = getStoreData(slug);
  const activeProducts = products.filter(p => p.active);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cat, setCat] = useState('All');

  const filtered = cat === 'All' ? activeProducts : activeProducts.filter(p => p.category === cat);
  const primaryColor = store.branding?.primaryColor || '#8B4513';

  return (
    <div className="min-h-screen bg-[#FDF6EC]">
      {/* Banner */}
      <div className="relative h-52 md:h-64 flex items-end"
        style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, ${store.branding?.secondaryColor || '#D2691E'} 100%)` }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.4) 0%, transparent 50%)' }} />
        <div className="relative max-w-4xl mx-auto px-6 pb-8 w-full flex items-end gap-5">
          <img src={store.branding?.logoUrl} alt={store.name}
            className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg object-cover"
            onError={e => { e.target.src = `https://placehold.co/80x80/${primaryColor.replace('#','')}/FDF6EC?text=${store.name[0]}`; }} />
          <div className="pb-1">
            <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "'DM Serif Display', serif" }}>{store.name}</h1>
            <p className="text-white/80 text-sm mt-0.5">{store.branding?.slogan}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-6 pb-1">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all
                ${cat === c ? 'text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-[#8B4513] hover:text-[#8B4513]'}`}
              style={cat === c ? { backgroundColor: primaryColor } : {}}>
              {c}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(p => (
            <button key={p._id} onClick={() => setSelectedProduct(p)}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden text-left hover:shadow-md hover:border-[#D2691E] transition-all group">
              <div className="aspect-square overflow-hidden bg-slate-50">
                <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={e => { e.target.src = `https://placehold.co/400x400/8B4513/FDF6EC?text=${encodeURIComponent(p.name)}`; }} />
              </div>
              <div className="p-3">
                <p className="text-xs text-slate-400 mb-0.5">{p.category}</p>
                <p className="text-sm font-semibold text-[#2C1810] leading-tight line-clamp-2">{p.name}</p>
                <p className="font-bold mt-1.5 text-sm" style={{ color: primaryColor }}>{p.currency} {p.price}</p>
                <div className="mt-2.5 w-full text-center text-xs font-semibold py-2 rounded-lg text-white"
                  style={{ backgroundColor: primaryColor }}>
                  Order via WhatsApp
                </div>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <p className="text-3xl mb-3">📦</p>
            <p className="text-sm">No products in this category yet.</p>
          </div>
        )}

        <div className="mt-12 text-center text-xs text-slate-400 border-t border-slate-200 pt-6">
          <p>Powered by <span className="font-semibold" style={{ color: primaryColor }}>Smart Platform Care</span></p>
          <p className="mt-0.5">All orders are placed through WhatsApp. Tap any product to order.</p>
        </div>
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} store={store} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}
