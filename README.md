# Smart Platform Care — Frontend

Next.js 14 (App Router) merchant SaaS frontend.

---

## Quick start

```bash
cd smart-platform-care-frontend
npm install
cp .env.local.example .env.local   # set NEXT_PUBLIC_API_URL
npm run dev                         # http://localhost:3000
```

Runs against the backend at `http://localhost:4000` by default.
All pages work on mock data if the backend is unavailable.

---

## Page map

### Public

| Route | File | Description |
|---|---|---|
| `/landing` | `app/(public)/landing/page.js` | Marketing landing page — hero, how-it-works, features, pricing, FAQ |
| `/store/[slug]` | `app/store/[slug]/page.js` | Public storefront — product grid, product detail modal, WhatsApp order button |
| `/onboarding` | `app/(dashboard)/onboarding/page.js` | 5-step merchant setup wizard (no auth guard in MVP) |

### Merchant dashboard

| Route | File | Description |
|---|---|---|
| `/dashboard` | `app/(dashboard)/dashboard/page.js` | Overview: stats, trial status, tips, revenue chart, source breakdown |
| `/products` | `app/(dashboard)/products/page.js` | Product grid + add/edit modal with WhatsApp preview |
| `/orders` | `app/(dashboard)/orders/page.js` | Order table with status filter, WhatsApp action, detail drawer |
| `/customers` | `app/(dashboard)/customers/page.js` | Customer list with tags, opt-in status, WhatsApp link |
| `/marketing` | `app/(dashboard)/marketing/page.js` | Tracking links, ready-to-post message, source analytics |
| `/billing` | `app/(dashboard)/billing/page.js` | Trial countdown, message usage, plan comparison |
| `/settings` | `app/(dashboard)/settings/page.js` | Store info, payment methods, security |

### Admin panel

| Route | File | Description |
|---|---|---|
| `/admin/overview` | `app/(admin)/admin/overview/page.js` | Platform stats, merchant summary table |
| `/admin/merchants` | `app/(admin)/admin/merchants/page.js` | Full merchant management: activate/suspend/extend trial/change plan |
| `/admin/orders` | `app/(admin)/admin/orders/page.js` | Cross-merchant orders view |
| `/admin/subscriptions` | `app/(admin)/admin/subscriptions/page.js` | Subscription management with inline plan change |
| `/admin/plans` | `app/(admin)/admin/plans/page.js` | Plans & pricing editor |
| `/admin/staff` | `app/(admin)/admin/staff/page.js` | Staff list + permission matrix |
| `/admin/services` | `app/(admin)/admin/services/page.js` | Paid services catalog + service request tracker |
| `/admin/support` | `app/(admin)/admin/support/page.js` | Support tickets with assignment |
| `/admin/compliance` | `app/(admin)/admin/compliance/page.js` | Message volume flags, policy status, opt-in compliance |
| `/admin/settings` | `app/(admin)/admin/settings/page.js` | Platform-wide settings, limits, audit log |

---

## Component library

All reusable UI components live in `components/ui/index.js`:

| Component | Props | Use |
|---|---|---|
| `Badge` | `variant, className` | Status labels, tags |
| `Button` | `variant, size, href, onClick` | All clickable actions |
| `Card` | `padding, className` | Content containers |
| `StatCard` | `label, value, icon, trend, trendLabel` | Dashboard metric tiles |
| `EmptyState` | `icon, title, description, action` | Empty list states |
| `Input` | `label, error, ...props` | Form text inputs |
| `Select` | `label, error, children, ...props` | Form dropdowns |
| `Textarea` | `label, error, rows, ...props` | Form textareas |
| `SectionHeader` | `title, description, action` | Page titles |
| `TrialBanner` | `daysLeft` | Top-of-dashboard trial countdown |
| `WhatsAppPreview` | `product` | Live WhatsApp message preview |

Layouts:
- `DashboardLayout` — dark sidebar + main content area, auto-highlights active nav using `usePathname()`
- Admin layout in `app/(admin)/admin/layout.js` — same pattern with red accent

---

## Data layer

### Mock data (`lib/mockData.js`)
Single source of truth for all demo data. Shapes match backend Mongoose models exactly.
Replace individual fetches with real API calls when ready.

### API client (`lib/api.js`)
Fetch wrappers for all backend endpoints:
```js
import { api, fetchWithFallback } from '@/lib/api';
import { mockProducts } from '@/lib/mockData';

// In a server component or useEffect:
const products = await fetchWithFallback(
  () => api.products.list(storeId),
  mockProducts  // used if backend unreachable
);
```

---

## Connecting the real backend

The Node.js/Express backend is at `smart-platform-care/`.

1. Start the backend: `cd smart-platform-care && npm run dev`
2. Set `NEXT_PUBLIC_API_URL=http://localhost:4000` in `.env.local`
3. Replace mock data calls with `api.*` calls using `fetchWithFallback`

Current active backend endpoints:
- `GET/POST /api/stores`
- `PUT /api/stores/:id`
- `GET/POST /api/products`
- `PUT/DELETE /api/products/:id`
- `GET /api/orders`
- `PATCH /api/orders/:id/status`
- `POST/GET /webhook` (WhatsApp)

Dashboard-specific endpoints (`/api/dashboard/*`) return 501 until Phase 2.

---

## Design system

**Palette** (matches AmaniRenas demo brand):
- Primary: `#8B4513` (saddle brown)
- Secondary: `#D2691E` (chocolate)
- Accent: `#F4A460` (sandy brown)
- Background: `#FDF6EC` (warm cream)
- Dark: `#2C1810` (espresso)
- Sidebar: `#0F1520` (deep slate)

**Fonts** (Google Fonts, loaded in root layout):
- Display: DM Serif Display (headings)
- Body: DM Sans (UI text)
- Mono: JetBrains Mono (code, IDs)

**CSS**: Tailwind v4 with `@theme` variables in `app/globals.css`.

---

## Phase 2 — not yet built

The following are designed and documented but not implemented:
- Login / auth (email+password, then phone+OTP)
- Real-time message feed (WebSocket or polling)
- AI chat replies (`modules/ai/` on backend — stub ready)
- Bulk WhatsApp campaigns (opt-in only)
- Meta Ads / paid source reporting
- Multi-store per account
- Stripe billing
