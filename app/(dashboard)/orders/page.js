'use client';
import { useState } from 'react';
import { mockOrders, STATUS_COLORS, STATUS_LABELS, timeAgo, formatCurrency } from '@/lib/mockData';
import { Card, Badge, Button, SectionHeader, Select } from '@/components/ui';

const ALL_STATUSES = ['all', 'new', 'awaiting_payment', 'proof_received', 'paid', 'shipped', 'completed', 'cancelled'];

function OrderRow({ order, onView }) {
  const sc = STATUS_COLORS[order.status];
  const waMsg = encodeURIComponent(`Hello ${order.customerName}, regarding your order of ${order.items.map(i => i.name).join(', ')}...`);

  return (
    <tr className="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
      <td className="px-4 py-3.5">
        <p className="text-sm font-medium text-slate-800">{order.customerName || '—'}</p>
        <p className="text-xs text-slate-400">{order.customerPhone}</p>
      </td>
      <td className="px-4 py-3.5">
        <p className="text-sm text-slate-700 max-w-[180px] truncate">{order.items.map(i => `${i.name} ×${i.qty}`).join(', ')}</p>
        <p className="text-xs text-slate-400 capitalize mt-0.5">via {order.source}</p>
      </td>
      <td className="px-4 py-3.5">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${sc.bg} ${sc.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
          {STATUS_LABELS[order.status]}
        </span>
      </td>
      <td className="px-4 py-3.5">
        <p className="text-sm font-bold text-slate-900">${order.total}</p>
        <p className="text-xs text-slate-400 capitalize">{order.paymentMethod || '—'}</p>
      </td>
      <td className="px-4 py-3.5 text-xs text-slate-400">{timeAgo(order.createdAt)}</td>
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-2">
          <a
            href={`https://wa.me/${order.customerPhone.replace(/\D/g,'')}?text=${waMsg}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-xs bg-[#25D366] hover:bg-[#20b458] text-white px-2.5 py-1 rounded-lg font-medium transition-colors"
          >
            WhatsApp
          </a>
          <Button variant="ghost" size="xs" onClick={() => onView(order)}>View</Button>
        </div>
      </td>
    </tr>
  );
}

function OrderDrawer({ order, onClose }) {
  const [status, setStatus] = useState(order.status);
  const sc = STATUS_COLORS[status];

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="w-full max-w-md bg-white h-full shadow-2xl overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h2 className="font-bold text-slate-900">Order Details</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl">×</button>
        </div>
        <div className="p-5 space-y-5">
          {/* Customer */}
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-2">Customer</p>
            <p className="font-semibold text-slate-800">{order.customerName || '—'}</p>
            <p className="text-sm text-slate-500">{order.customerPhone}</p>
            <a
              href={`https://wa.me/${order.customerPhone.replace(/\D/g,'')}`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-xs bg-[#25D366] text-white px-3 py-1.5 rounded-lg font-medium"
            >
              Open in WhatsApp
            </a>
          </div>

          {/* Items */}
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-2">Items</p>
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-slate-800">{item.name}</p>
                  <p className="text-xs text-slate-400">qty: {item.qty}</p>
                </div>
                <p className="text-sm font-bold text-slate-900">${item.price * item.qty}</p>
              </div>
            ))}
            <div className="flex justify-between pt-2 font-bold">
              <span className="text-slate-800">Total</span>
              <span className="text-[#8B4513]">${order.total}</span>
            </div>
          </div>

          {/* Payment */}
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-2">Payment</p>
            <p className="text-sm text-slate-700 capitalize">{order.paymentMethod || '—'}</p>
            {order.paymentInstructions && (
              <pre className="mt-1 text-xs text-slate-500 whitespace-pre-wrap bg-slate-50 rounded-lg p-3 font-sans">{order.paymentInstructions}</pre>
            )}
          </div>

          {/* Status update */}
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-2">Update Status</p>
            <Select value={status} onChange={e => setStatus(e.target.value)}>
              {Object.entries(STATUS_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </Select>
            <Button variant="primary" size="sm" className="mt-2 w-full">Save Status</Button>
          </div>

          <div className="text-xs text-slate-400">
            <p>Source: <span className="capitalize">{order.source}</span></p>
            <p>Created: {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [drawer, setDrawer] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = mockOrders.filter(o =>
    (statusFilter === 'all' || o.status === statusFilter) &&
    ((o.customerName || '').toLowerCase().includes(search.toLowerCase()) || o.customerPhone.includes(search))
  );

  const counts = ALL_STATUSES.reduce((acc, s) => {
    acc[s] = s === 'all' ? mockOrders.length : mockOrders.filter(o => o.status === s).length;
    return acc;
  }, {});

  return (
    <div>
      <SectionHeader
        title="Orders"
        description={`${mockOrders.length} total orders`}
      />

      {/* Status filter tabs */}
      <div className="flex gap-1 overflow-x-auto scrollbar-hide mb-5 pb-1">
        {['all', 'new', 'awaiting_payment', 'proof_received', 'paid', 'shipped', 'completed', 'cancelled'].map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap
              ${statusFilter === s ? 'bg-[#8B4513] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-[#8B4513]'}`}
          >
            {STATUS_LABELS[s] || 'All'}
            {counts[s] > 0 && (
              <span className={`px-1.5 py-0.5 rounded-full text-xs ${statusFilter === s ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                {counts[s]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or phone…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-4 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#8B4513] w-full max-w-xs"
      />

      {/* Table */}
      <Card padding="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                {['Customer', 'Products', 'Status', 'Total', 'When', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => <OrderRow key={o._id} order={o} onView={setDrawer} />)}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <p className="text-2xl mb-2">📭</p>
              <p className="text-sm">No orders found</p>
            </div>
          )}
        </div>
      </Card>

      {drawer && <OrderDrawer order={drawer} onClose={() => setDrawer(null)} />}
    </div>
  );
}
