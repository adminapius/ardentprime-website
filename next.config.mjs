/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/demo',
        destination: '/',
        permanent: true,
      },
      {
        source: '/case-studies',
        destination: '/news',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
