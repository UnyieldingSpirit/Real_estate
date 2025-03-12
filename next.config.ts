/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['olx.uz', 'via.placeholder.com']
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*' // Replace with your actual backend URL
      }
    ]
  }
}

module.exports = nextConfig