// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [ // 'domains' yerine 'remotePatterns' kullanmak daha modern ve esnektir
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**', // Bu domain altındaki tüm yollara izin ver
      },
      // Varsa diğer domainler için de pattern ekleyebilirsin
      // { protocol: 'https', hostname: 'placehold.co' },
    ],
    // VEYA eski yöntem (hala çalışır ama remotePatterns tercih edilir):
    // domains: ['via.placeholder.com', 'placehold.co'],
  },
}

module.exports = nextConfig;