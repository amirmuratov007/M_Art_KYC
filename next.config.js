/** @type {import('next').NextConfig} */

const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  ...(process.env.NODE_ENV === 'production' ? [] : ["'unsafe-eval'"]),
  'https://telegram.org',
  'https://www.googletagmanager.com',
  'https://mc.yandex.ru',
  'https://yastatic.net'
]

const connectSrc = [
  "'self'",
  'https://*.supabase.co',
  'https://mc.yandex.ru',
  'https://www.google-analytics.com',
  'https://region1.google-analytics.com'
]

const privatePageHeaders = [
  { key: 'Cache-Control', value: 'private, no-store, max-age=0' },
  { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
  { key: 'Referrer-Policy', value: 'no-referrer' }
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
    key: 'X-Permitted-Cross-Domain-Policies',
    value: 'none'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin'
  },
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'same-origin'
  },
  {
    key: 'Origin-Agent-Cluster',
    value: '?1'
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
      "frame-ancestors 'none'",
      "object-src 'none'",
      `script-src ${scriptSrc.join(' ')}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      `connect-src ${connectSrc.join(' ')}`,
      "manifest-src 'self'",
      "worker-src 'self'",
      "frame-src 'self' https://mc.yandex.ru"
    ].join('; ')
  }
]

const telegramMiniAppHeaders = securityHeaders
  .filter(({ key }) => !['X-Frame-Options', 'Cross-Origin-Opener-Policy', 'Cross-Origin-Resource-Policy', 'Content-Security-Policy'].includes(key))
  .concat([
    {
      key: 'Content-Security-Policy',
      value: [
        "default-src 'self'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'self' https://web.telegram.org https://*.telegram.org",
        "object-src 'none'",
        `script-src ${scriptSrc.join(' ')}`,
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: blob: https:",
        "font-src 'self' data:",
        `connect-src ${connectSrc.join(' ')}`,
        "manifest-src 'self'",
        "worker-src 'self'",
        "frame-src 'self' https://mc.yandex.ru"
      ].join('; ')
    },
    { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
    { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' }
  ])

const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname
  },

  async headers() {
    return [
      {
        source: '/((?!risk-radar(?:/|$)).*)',
        headers: securityHeaders
      },
      {
        source: '/risk-radar',
        headers: telegramMiniAppHeaders
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
        source: '/analyst/:path*',
        headers: privatePageHeaders
      },
      {
        source: '/admin-crm',
        headers: privatePageHeaders
      },
      {
        source: '/admin-client-checks',
        headers: privatePageHeaders
      },
      {
        source: '/account',
        headers: privatePageHeaders
      },
      {
        source: '/app/:path*',
        headers: privatePageHeaders
      }
    ]
  },

  async redirects() {
    return [
      {
        source: '/analyst/risk-intelligence',
        destination: '/analyst/heimdall-sa',
        permanent: false
      },
      {
        source: '/analyst/risk-intelligence/:path*',
        destination: '/analyst/heimdall-sa',
        permanent: false
      },
      {
        source: '/analyst/ai/:path*',
        destination: '/analyst/heimdall-sa',
        permanent: false
      },
      {
        source: '/analyst/risk-intelligence-en',
        destination: '/analyst/heimdall-sa',
        permanent: false
      },
      {
        source: '/analyst/risk-intelligence-en/:path*',
        destination: '/analyst/heimdall-sa',
        permanent: false
      },
      {
        source: '/analyst/cases',
        destination: '/admin-crm',
        permanent: false
      },
      {
        source: '/analyst/cases/:path*',
        destination: '/admin-crm',
        permanent: false
      },
      {
        source: '/analyst/new-case',
        destination: '/analyst/heimdall-sa',
        permanent: false
      },
      {
        source: '/analyst/report/:path*',
        destination: '/analyst/heimdall-sa',
        permanent: false
      },
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
