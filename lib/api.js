// lib/api.js
// API client for the Node.js/Express backend.
// All functions return the parsed JSON response or throw on error.
// Replace BASE_URL with your backend URL in .env.local
//
// Usage:
//   import { api } from '@/lib/api';
//   const products = await api.products.list(storeId);

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// ─── Core fetch wrapper ────────────────────────────────────────────────────
async function request(method, path, body) {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(`${BASE_URL}${path}`, opts);
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(data.error || `HTTP ${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

const get  = (path)        => request('GET',    path);
const post = (path, body)  => request('POST',   path, body);
const put  = (path, body)  => request('PUT',    path, body);
const patch= (path, body)  => request('PATCH',  path, body);
const del  = (path)        => request('DELETE', path);

// ─── Stores ───────────────────────────────────────────────────────────────
const stores = {
  list:   ()         => get('/api/stores'),
  get:    (id)       => get(`/api/stores/${id}`),
  create: (body)     => post('/api/stores', body),
  update: (id, body) => put(`/api/stores/${id}`, body),
};

// ─── Products ─────────────────────────────────────────────────────────────
const products = {
  list:   (storeId)  => get(`/api/products?storeId=${storeId}`),
  create: (body)     => post('/api/products', body),
  update: (id, body) => put(`/api/products/${id}`, body),
  remove: (id)       => del(`/api/products/${id}`),
};

// ─── Orders ───────────────────────────────────────────────────────────────
const orders = {
  list:         (storeId) => get(`/api/orders?storeId=${storeId}`),
  updateStatus: (id, status) => patch(`/api/orders/${id}/status`, { status }),
};

// ─── Dashboard (Phase 2 — not active yet) ─────────────────────────────────
// These will 501 until modules/dashboard/routes/dashboard.js is implemented.
const dashboard = {
  summary:   (storeId) => get(`/api/dashboard/summary?storeId=${storeId}`),
  orders:    (storeId) => get(`/api/dashboard/orders?storeId=${storeId}`),
  customers: (storeId) => get(`/api/dashboard/customers?storeId=${storeId}`),
  messages:  (storeId) => get(`/api/dashboard/messages?storeId=${storeId}`),
  settings:  (storeId) => get(`/api/dashboard/settings?storeId=${storeId}`),
};

export const api = { stores, products, orders, dashboard };

// ─── Convenience hook-style data fetchers ─────────────────────────────────
// Usage in a page: const data = await fetchProducts(storeId); (server components)
// Or: import { fetchWithFallback } from '@/lib/api'; (client components with mock)

/**
 * Fetch from backend, fall back to mock data on error or when API is unreachable.
 * @param {Function} apiFn  - async function that calls the API
 * @param {*} mockData       - fallback mock data
 */
export async function fetchWithFallback(apiFn, mockData) {
  try {
    return await apiFn();
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[API] Using mock data — backend not available:', err.message);
    }
    return mockData;
  }
}
