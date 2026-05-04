// lib/mockData.js
// Single source of truth for all demo/mock data.
// Shapes match backend Mongoose models exactly.
// Replace with real API calls when backend is ready.

// ─── Store ────────────────────────────────────────────────────────────────────
export const mockStore = {
  _id: 'store_001',
  name: 'AmaniRenas',
  slug: 'amanirenas',
  phone: '+249912345678',
  branding: {
    slogan: 'Rooted in Heritage. Made for You.',
    sloganAr: 'من عمق التراث السوداني الأفريقي — إليكِ',
    tagline: 'Authentic Sudanese beauty rituals for the modern woman.',
    taglineAr: 'طقوس جمال سودانية أصيلة للمرأة العصرية.',
    logoUrl: 'https://placehold.co/120x120/8B4513/FDF6EC?text=AR',
    bannerUrl: 'https://placehold.co/1200x400/8B4513/FDF6EC?text=AmaniRenas',
    primaryColor: '#8B4513',
    secondaryColor: '#D2691E',
    accentColor: '#F4A460',
    font: 'DM Serif Display',
  },
  paymentMethods: {
    bankTransfer: { enabled: true, instructions: 'Faisal Islamic Bank\nAccount: 1234567890\nName: AmaniRenas Ltd' },
    wallet: { enabled: true, instructions: 'Zain Cash: +249 91 234 5678' },
    cashOnDelivery: { enabled: true, instructions: 'Available within Khartoum.' },
  },
  active: true,
  trialEndsAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days left
  plan: 'trial',
  whatsappNumber: '+249912345678',
};

// ─── Products ─────────────────────────────────────────────────────────────────
export const mockProducts = [
  {
    _id: 'prod_001',
    storeId: 'store_001',
    name: 'Karkar Oil 100ml',
    nameAr: 'زيت الكركار الأصلي 100ml',
    price: 18,
    currency: 'USD',
    category: 'Body Care',
    description: 'Pure cold-pressed karkar oil sourced from Nile Valley sesame. Used for generations in Sudanese bridal skin rituals. Deeply nourishing, leaves skin with a warm golden glow.',
    images: [
      'https://placehold.co/800x800/8B4513/FDF6EC?text=Karkar+Oil',
      'https://placehold.co/800x800/D2691E/FDF6EC?text=Karkar+Detail',
      'https://placehold.co/800x800/F4A460/3D1F0A?text=Karkar+Use',
    ],
    imageUrl: 'https://placehold.co/800x800/8B4513/FDF6EC?text=Karkar+Oil',
    active: true,
    orders: 24,
  },
  {
    _id: 'prod_002',
    storeId: 'store_001',
    name: 'Karkar Oil 250ml',
    nameAr: 'زيت الكركار الأصلي 250ml',
    price: 32,
    currency: 'USD',
    category: 'Body Care',
    description: 'Family-size Karkar Oil. Same pure cold-pressed formula in a generous 250ml bottle — ideal for full-body use and longer daily rituals.',
    images: [
      'https://placehold.co/800x800/8B4513/FDF6EC?text=Karkar+250ml',
      'https://placehold.co/800x800/D2691E/FDF6EC?text=Karkar+250+Detail',
    ],
    imageUrl: 'https://placehold.co/800x800/8B4513/FDF6EC?text=Karkar+250ml',
    active: true,
    orders: 11,
  },
  {
    _id: 'prod_003',
    storeId: 'store_001',
    name: 'Sudanese Clay Dalka',
    nameAr: 'دلكة الطين السوداني',
    price: 22,
    currency: 'USD',
    category: 'Body Care',
    description: 'Traditional exfoliating body paste blended with sandalwood, cloves, and fragrant oils. Applied weekly for smooth, luminous skin.',
    images: [
      'https://placehold.co/800x800/A0522D/FDF6EC?text=Dalka',
    ],
    imageUrl: 'https://placehold.co/800x800/A0522D/FDF6EC?text=Dalka',
    active: true,
    orders: 17,
  },
  {
    _id: 'prod_004',
    storeId: 'store_001',
    name: 'Raw Sesame Oil 250ml',
    nameAr: 'زيت السمسم الخام 250ml',
    price: 20,
    currency: 'USD',
    category: 'Hair Care',
    description: 'Unrefined Nile sesame oil, traditionally used as a hair sealant after washing. Rich in vitamins E and B, reduces breakage and adds deep shine.',
    images: [
      'https://placehold.co/800x800/7A3B1A/FDF6EC?text=Sesame+Oil',
    ],
    imageUrl: 'https://placehold.co/800x800/7A3B1A/FDF6EC?text=Sesame+Oil',
    active: true,
    orders: 9,
  },
  {
    _id: 'prod_005',
    storeId: 'store_001',
    name: 'Natural Sudanese Henna 200g',
    nameAr: 'حناء طبيعية سودانية 200g',
    price: 14,
    currency: 'USD',
    category: 'Hair Care',
    description: '100% natural henna powder from the Dongola region. Used for body art and as a deep conditioning hair treatment.',
    images: [
      'https://placehold.co/800x800/5C2D12/FDF6EC?text=Henna',
    ],
    imageUrl: 'https://placehold.co/800x800/5C2D12/FDF6EC?text=Henna',
    active: true,
    orders: 31,
  },
  {
    _id: 'prod_006',
    storeId: 'store_001',
    name: 'Signature Sudanese Bukhoor 50g',
    nameAr: 'بخور السودان المميز 50g',
    price: 28,
    currency: 'USD',
    category: 'Fragrance',
    description: 'Hand-blended bukhoor using oud, sandalwood, rose, and amber resin. Burned on charcoal to perfume clothing, hair, and living spaces.',
    images: [
      'https://placehold.co/800x800/3D1F0A/F4A460?text=Bukhoor',
      'https://placehold.co/800x800/2C1810/F4A460?text=Bukhoor+Detail',
    ],
    imageUrl: 'https://placehold.co/800x800/3D1F0A/F4A460?text=Bukhoor',
    active: true,
    orders: 43,
  },
  {
    _id: 'prod_007',
    storeId: 'store_001',
    name: 'Sudanese Oud Oil 6ml',
    nameAr: 'دهن العود السوداني 6ml',
    price: 45,
    currency: 'USD',
    category: 'Fragrance',
    description: 'Pure Sudanese oud oil, aged and distilled using traditional methods. Deep, smoky, and long-lasting.',
    images: [
      'https://placehold.co/800x800/2C1810/F4A460?text=Oud+Oil',
    ],
    imageUrl: 'https://placehold.co/800x800/2C1810/F4A460?text=Oud+Oil',
    active: true,
    orders: 19,
  },
  {
    _id: 'prod_008',
    storeId: 'store_001',
    name: 'Bridal Beauty Ritual Set',
    nameAr: 'مجموعة العناية بالعروس',
    price: 58,
    currency: 'USD',
    category: 'Wellness',
    description: 'A curated gift set containing Karkar Oil 100ml, Dalka Clay Paste, and Khumra Body Blend — everything for the traditional Sudanese pre-wedding beauty ritual.',
    images: [
      'https://placehold.co/800x800/8B4513/FDF6EC?text=Bridal+Set',
      'https://placehold.co/800x800/D2691E/FDF6EC?text=Bridal+Contents',
      'https://placehold.co/800x800/F4A460/3D1F0A?text=Bridal+Gift',
    ],
    imageUrl: 'https://placehold.co/800x800/8B4513/FDF6EC?text=Bridal+Set',
    active: true,
    orders: 8,
  },
];

// ─── Orders ───────────────────────────────────────────────────────────────────
export const mockOrders = [
  {
    _id: 'ord_001',
    storeId: 'store_001',
    customerPhone: '+249911000001',
    customerName: 'Fatima Al-Rashid',
    items: [{ productId: 'prod_006', name: 'Signature Sudanese Bukhoor 50g', qty: 2, price: 28 }],
    total: 56,
    status: 'paid',
    paymentMethod: 'bankTransfer',
    source: 'instagram',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'ord_002',
    storeId: 'store_001',
    customerPhone: '+249911000002',
    customerName: 'Nour Hassan',
    items: [{ productId: 'prod_001', name: 'Karkar Oil 100ml', qty: 1, price: 18 }],
    total: 18,
    status: 'proof_received',
    paymentMethod: 'wallet',
    source: 'whatsapp',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'ord_003',
    storeId: 'store_001',
    customerPhone: '+249911000003',
    customerName: 'Amira Osman',
    items: [
      { productId: 'prod_008', name: 'Bridal Beauty Ritual Set', qty: 1, price: 58 },
      { productId: 'prod_007', name: 'Sudanese Oud Oil 6ml', qty: 1, price: 45 },
    ],
    total: 103,
    status: 'awaiting_payment',
    paymentMethod: 'bankTransfer',
    source: 'facebook',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'ord_004',
    storeId: 'store_001',
    customerPhone: '+249911000004',
    customerName: 'Mariam Ibrahim',
    items: [{ productId: 'prod_005', name: 'Natural Sudanese Henna 200g', qty: 3, price: 14 }],
    total: 42,
    status: 'shipped',
    paymentMethod: 'cashOnDelivery',
    source: 'instagram',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'ord_005',
    storeId: 'store_001',
    customerPhone: '+249911000005',
    customerName: 'Salma Yusuf',
    items: [{ productId: 'prod_003', name: 'Sudanese Clay Dalka', qty: 1, price: 22 }],
    total: 22,
    status: 'new',
    paymentMethod: '',
    source: 'direct',
    createdAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
  },
  {
    _id: 'ord_006',
    storeId: 'store_001',
    customerPhone: '+249911000006',
    customerName: 'Hana Khalid',
    items: [{ productId: 'prod_002', name: 'Karkar Oil 250ml', qty: 2, price: 32 }],
    total: 64,
    status: 'completed',
    paymentMethod: 'wallet',
    source: 'whatsapp',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// ─── Customers ────────────────────────────────────────────────────────────────
export const mockCustomers = [
  {
    _id: 'cust_001',
    storeId: 'store_001',
    phone: '+249911000001',
    name: 'Fatima Al-Rashid',
    city: 'Khartoum',
    language: 'ar',
    tags: ['vip', 'repeat'],
    source: 'instagram',
    totalOrders: 5,
    totalSpent: 246,
    lastOrderAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    firstContactAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    optIn: true,
  },
  {
    _id: 'cust_002',
    storeId: 'store_001',
    phone: '+249911000002',
    name: 'Nour Hassan',
    city: 'Omdurman',
    language: 'ar',
    tags: ['new'],
    source: 'whatsapp',
    totalOrders: 1,
    totalSpent: 18,
    lastOrderAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    firstContactAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    optIn: true,
  },
  {
    _id: 'cust_003',
    storeId: 'store_001',
    phone: '+249911000003',
    name: 'Amira Osman',
    city: 'Khartoum',
    language: 'ar',
    tags: ['high-value'],
    source: 'facebook',
    totalOrders: 2,
    totalSpent: 178,
    lastOrderAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    firstContactAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    optIn: true,
  },
  {
    _id: 'cust_004',
    storeId: 'store_001',
    phone: '+249911000004',
    name: 'Mariam Ibrahim',
    city: 'Khartoum North',
    language: 'ar',
    tags: ['repeat'],
    source: 'instagram',
    totalOrders: 3,
    totalSpent: 89,
    lastOrderAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    firstContactAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    optIn: false,
  },
  {
    _id: 'cust_005',
    storeId: 'store_001',
    phone: '+249911000005',
    name: 'Salma Yusuf',
    city: 'London',
    language: 'en',
    tags: ['diaspora'],
    source: 'direct',
    totalOrders: 1,
    totalSpent: 22,
    lastOrderAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
    firstContactAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    optIn: true,
  },
];

// ─── Analytics ────────────────────────────────────────────────────────────────
export const mockAnalytics = {
  today: {
    messages: 14,
    orders: 3,
    revenue: 141,
    visits: 67,
    conversionRate: 4.5,
  },
  week: {
    messages: 89,
    orders: 21,
    revenue: 874,
    visits: 412,
    conversionRate: 5.1,
  },
  sourceBreakdown: [
    { source: 'instagram', visits: 187, orders: 12, revenue: 412, conversionRate: 6.4 },
    { source: 'facebook',  visits: 103, orders: 5,  revenue: 198, conversionRate: 4.9 },
    { source: 'whatsapp',  visits: 78,  orders: 8,  revenue: 218, conversionRate: 10.3 },
    { source: 'direct',    visits: 44,  orders: 2,  revenue: 46,  conversionRate: 4.5 },
  ],
  topProducts: [
    { productId: 'prod_006', name: 'Signature Bukhoor 50g', orders: 43, revenue: 1204 },
    { productId: 'prod_005', name: 'Natural Henna 200g',    orders: 31, revenue: 434 },
    { productId: 'prod_001', name: 'Karkar Oil 100ml',      orders: 24, revenue: 432 },
  ],
  weeklyRevenue: [
    { day: 'Mon', revenue: 98 },
    { day: 'Tue', revenue: 142 },
    { day: 'Wed', revenue: 87 },
    { day: 'Thu', revenue: 203 },
    { day: 'Fri', revenue: 178 },
    { day: 'Sat', revenue: 124 },
    { day: 'Sun', revenue: 141 },
  ],
};

// ─── Plans ────────────────────────────────────────────────────────────────────
export const mockPlans = [
  {
    id: 'trial',
    name: 'Free Trial',
    price: 0,
    period: '7 days',
    features: ['Up to 50 messages/month', '10 products', 'WhatsApp automation', 'Basic analytics'],
    limits: { messages: 50, products: 10 },
    highlight: false,
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 29,
    period: '/month',
    features: ['500 messages/month', '50 products', 'WhatsApp automation', 'Analytics', 'Email support'],
    limits: { messages: 500, products: 50 },
    highlight: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 79,
    period: '/month',
    features: ['2,000 messages/month', 'Unlimited products', 'AI replies (Phase 2)', 'Advanced analytics', 'Marketing tools', 'Priority support'],
    limits: { messages: 2000, products: -1 },
    highlight: true,
  },
  {
    id: 'business',
    name: 'Business',
    price: 199,
    period: '/month',
    features: ['Unlimited messages', 'Unlimited products', 'AI + Automation', 'Campaign tools', 'Dedicated support', 'Multi-store (Phase 2)'],
    limits: { messages: -1, products: -1 },
    highlight: false,
  },
];

// ─── Admin merchants ──────────────────────────────────────────────────────────
export const mockMerchants = [
  {
    _id: 'merch_001',
    name: 'Fatima Al-Rashid',
    email: 'fatima@amanirenas.uk',
    storeName: 'AmaniRenas',
    plan: 'pro',
    status: 'active',
    messagesThisMonth: 1243,
    trialEndsAt: null,
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'merch_002',
    name: 'Ahmed Hassan',
    email: 'ahmed@sudancraft.com',
    storeName: 'Sudan Craft',
    plan: 'trial',
    status: 'active',
    messagesThisMonth: 38,
    trialEndsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'merch_003',
    name: 'Layla Osman',
    email: 'layla@nubianspice.com',
    storeName: 'Nubian Spice',
    plan: 'basic',
    status: 'suspended',
    messagesThisMonth: 0,
    trialEndsAt: null,
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// ─── Services ─────────────────────────────────────────────────────────────────
export const mockServices = [
  { _id: 'svc_001', name: 'Full Store Setup', description: 'We set up your entire store: branding, products, WhatsApp.', price: 149, duration: '2-3 days', status: 'active' },
  { _id: 'svc_002', name: 'Product Image Optimization', description: 'Professional editing of up to 20 product images.', price: 49, duration: '1-2 days', status: 'active' },
  { _id: 'svc_003', name: 'WhatsApp Business Setup', description: 'Full Meta WhatsApp Business API configuration.', price: 99, duration: '1 day', status: 'active' },
  { _id: 'svc_004', name: 'Marketing Campaign Setup', description: 'Social media tracking links, bio links, and post templates.', price: 79, duration: '1-2 days', status: 'active' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
export const STATUS_COLORS = {
  new:              { bg: 'bg-blue-100',   text: 'text-blue-800',   dot: 'bg-blue-500'   },
  awaiting_payment: { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500' },
  proof_received:   { bg: 'bg-purple-100', text: 'text-purple-800', dot: 'bg-purple-500' },
  paid:             { bg: 'bg-green-100',  text: 'text-green-800',  dot: 'bg-green-500'  },
  shipped:          { bg: 'bg-indigo-100', text: 'text-indigo-800', dot: 'bg-indigo-500' },
  completed:        { bg: 'bg-emerald-100',text: 'text-emerald-800',dot: 'bg-emerald-500'},
  cancelled:        { bg: 'bg-red-100',    text: 'text-red-800',    dot: 'bg-red-500'    },
};

export const STATUS_LABELS = {
  new: 'New', awaiting_payment: 'Awaiting Payment', proof_received: 'Proof Received',
  paid: 'Paid', shipped: 'Shipped', completed: 'Completed', cancelled: 'Cancelled',
};

export function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1)  return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export function formatCurrency(amount, currency = 'USD') {
  return `${currency} ${Number(amount).toFixed(2)}`;
}

export function trialDaysLeft(store) {
  if (!store.trialEndsAt) return 0;
  return Math.max(0, Math.ceil((new Date(store.trialEndsAt) - Date.now()) / (24 * 60 * 60 * 1000)));
}
