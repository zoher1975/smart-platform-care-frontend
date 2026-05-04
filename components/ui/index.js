'use client';

// ─── Badge ─────────────────────────────────────────────────────────────────
export function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default:  'bg-slate-100 text-slate-700',
    brand:    'bg-amber-100 text-amber-800',
    success:  'bg-emerald-100 text-emerald-800',
    warning:  'bg-yellow-100 text-yellow-800',
    error:    'bg-red-100 text-red-800',
    info:     'bg-blue-100 text-blue-800',
    purple:   'bg-purple-100 text-purple-800',
    indigo:   'bg-indigo-100 text-indigo-800',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
}

// ─── Button ───────────────────────────────────────────────────────────────
export function Button({ children, variant = 'primary', size = 'md', className = '', onClick, disabled, type = 'button', href }) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary:  'bg-[#8B4513] hover:bg-[#7A3B1A] text-white focus:ring-[#8B4513]',
    secondary:'bg-[#FDF6EC] hover:bg-[#F4D5B0] text-[#8B4513] border border-[#D2691E] focus:ring-[#8B4513]',
    ghost:    'bg-transparent hover:bg-slate-100 text-slate-700 focus:ring-slate-300',
    danger:   'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    success:  'bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500',
    outline:  'bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50',
  };
  const sizes = {
    xs: 'px-2.5 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (href) return <a href={href} className={cls}>{children}</a>;
  return <button type={type} onClick={onClick} disabled={disabled} className={cls}>{children}</button>;
}

// ─── Card ─────────────────────────────────────────────────────────────────
export function Card({ children, className = '', padding = 'p-6' }) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm ${padding} ${className}`}>
      {children}
    </div>
  );
}

// ─── StatCard ─────────────────────────────────────────────────────────────
export function StatCard({ label, value, sub, icon, trend, trendLabel }) {
  const isUp = trend === 'up';
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
          {sub && <p className="mt-0.5 text-xs text-slate-500">{sub}</p>}
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-[#FDF6EC] flex items-center justify-center text-lg">
            {icon}
          </div>
        )}
      </div>
      {trendLabel && (
        <div className="mt-3 flex items-center gap-1">
          <span className={`text-xs font-medium ${isUp ? 'text-emerald-600' : 'text-red-500'}`}>
            {isUp ? '↑' : '↓'} {trendLabel}
          </span>
          <span className="text-xs text-slate-400">vs yesterday</span>
        </div>
      )}
    </div>
  );
}

// ─── EmptyState ───────────────────────────────────────────────────────────
export function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-base font-semibold text-slate-800">{title}</h3>
      {description && <p className="mt-1 text-sm text-slate-500 max-w-xs">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────
export function Input({ label, error, className = '', ...props }) {
  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>}
      <input
        className={`w-full px-3 py-2 rounded-lg border text-sm bg-white transition-colors
          ${error ? 'border-red-400 focus:ring-red-400' : 'border-slate-200 focus:border-[#8B4513] focus:ring-[#8B4513]'}
          focus:outline-none focus:ring-1 placeholder:text-slate-400`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ─── Select ───────────────────────────────────────────────────────────────
export function Select({ label, error, children, className = '', ...props }) {
  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>}
      <select
        className={`w-full px-3 py-2 rounded-lg border text-sm bg-white transition-colors
          ${error ? 'border-red-400' : 'border-slate-200 focus:border-[#8B4513]'}
          focus:outline-none focus:ring-1 focus:ring-[#8B4513]`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ─── Textarea ─────────────────────────────────────────────────────────────
export function Textarea({ label, error, className = '', rows = 3, ...props }) {
  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>}
      <textarea
        rows={rows}
        className={`w-full px-3 py-2 rounded-lg border text-sm bg-white transition-colors resize-none
          ${error ? 'border-red-400' : 'border-slate-200 focus:border-[#8B4513]'}
          focus:outline-none focus:ring-1 focus:ring-[#8B4513] placeholder:text-slate-400`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ─── SectionHeader ─────────────────────────────────────────────────────────
export function SectionHeader({ title, description, action }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">{title}</h1>
        {description && <p className="mt-0.5 text-sm text-slate-500">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

// ─── TrialBanner ───────────────────────────────────────────────────────────
export function TrialBanner({ daysLeft }) {
  if (daysLeft === null || daysLeft === undefined) return null;
  const urgent = daysLeft <= 2;
  return (
    <div className={`flex items-center justify-between gap-4 px-4 py-2.5 text-sm ${urgent ? 'bg-red-50 border-b border-red-200' : 'bg-amber-50 border-b border-amber-200'}`}>
      <div className="flex items-center gap-2">
        <span>{urgent ? '🚨' : '⏳'}</span>
        <span className={urgent ? 'text-red-800 font-medium' : 'text-amber-800'}>
          {daysLeft === 0 ? 'Your free trial has ended.' : `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left in your free trial.`}
          {' '}{urgent ? 'Upgrade now to keep your store running.' : 'Upgrade to continue after trial.'}
        </span>
      </div>
      <Button variant="primary" size="sm" href="/billing">Upgrade Now →</Button>
    </div>
  );
}

// ─── WhatsApp Preview ──────────────────────────────────────────────────────
export function WhatsAppPreview({ product }) {
  return (
    <div className="bg-[#ECE5DD] rounded-2xl p-4 max-w-xs">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center">
          <span className="text-white text-xs">✓</span>
        </div>
        <span className="text-xs text-gray-500 font-medium">AmaniRenas</span>
      </div>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-32 object-cover"
            onError={e => { e.target.src = `https://placehold.co/400x200/8B4513/FDF6EC?text=${encodeURIComponent(product.name)}`; }}
          />
        )}
        <div className="p-3">
          <p className="font-semibold text-sm text-gray-800">{product.name}</p>
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{product.description}</p>
          <p className="text-[#8B4513] font-bold mt-2">{product.currency} {product.price}</p>
          <a
            href={`https://wa.me/249912345678?text=${encodeURIComponent(`Hello, I want to order: ${product.name}`)}`}
            target="_blank"
            rel="noreferrer"
            className="mt-2 w-full flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20b458] text-white text-xs font-semibold py-2 rounded-lg transition-colors"
          >
            🛒 Order on WhatsApp
          </a>
        </div>
      </div>
      <p className="text-right text-xs text-gray-400 mt-1">9:41 AM ✓✓</p>
    </div>
  );
}
