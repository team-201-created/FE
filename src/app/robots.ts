import type { MetadataRoute } from 'next'

const BASE_URL = 'https://oz-scent-match.duckdns.org'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/login', '/profile'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
