/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['assets.amanirenas.uk', 'placehold.co'],
  },
  // Disable font optimization in build (Google Fonts fetched at runtime)
  optimizeFonts: false,
};

module.exports = nextConfig;
