/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'source.unsplash.com'],
  }
})
