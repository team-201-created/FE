import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!

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
