/** @type {import('next').NextConfig} */

const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  ...(process.env.NODE_ENV === 'production' ? [] : ["'unsafe-eval'"]),
  'https://www.googletagmanager.com',
  'https://mc.yandex.ru',
  'https://yastatic.net'
]

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=()'
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
      "block-all-mixed-content",
      `script-src ${scriptSrc.join(' ')}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://*.supabase.co https://mc.yandex.ru https://www.google-analytics.com https://region1.google-analytics.com",
      "manifest-src 'self'",
      "worker-src 'self'",
      "frame-src 'self' https://mc.yandex.ru"
    ].join('; ')
  }
]

const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate'
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/'
          }
        ]
      },
      {
        source: '/admin-crm',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive'
          }
        ]
      },
      {
        source: '/admin-client-checks',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive'
          }
        ]
      }
    ]
  },

  async redirects() {
    return [
      {
        source: '/.well-known/change-password',
        destination: '/account',
        permanent: false
      }
    ]
  },

  async rewrites() {
    return [
      {
        source: '/app',
        destination: '/app/index.html'
      },
      {
        source: '/app/',
        destination: '/app/index.html'
      }
    ]
  }
}

module.exports = nextConfig
