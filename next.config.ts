import type { NextConfig } from 'next'

type RemotePattern = NonNullable<
  NonNullable<NextConfig['images']>['remotePatterns']
>[number]

/**
 * next/image 외부 호스트 허용 — 개발/스테이징 API·CDN 도메인
 * (미설정 시 외부 절대 URL 이미지에서 "hostname is not configured" 런타임 에러)
 */
function buildImageRemotePatterns(): RemotePattern[] {
  const patterns: RemotePattern[] = []
  const seen = new Set<string>()

  const pushFromUrl = (raw: string | undefined) => {
    const trimmed = raw?.trim()
    if (!trimmed) return
    try {
      const url = new URL(trimmed)
      const key = `${url.protocol}//${url.host}`
      if (seen.has(key)) return
      seen.add(key)
      const protocol = (url.protocol === 'https:' ? 'https' : 'http') as
        | 'http'
        | 'https'
      const entry: RemotePattern = {
        protocol,
        hostname: url.hostname,
        pathname: '/**',
      }
      if (url.port) entry.port = url.port
      patterns.push(entry)
    } catch {
      /* ignore */
    }
  }

  pushFromUrl(process.env.NEXT_PUBLIC_API_URL)
  pushFromUrl(process.env.NEXT_PUBLIC_API_BASE_URL)

  const extra = process.env.NEXT_PUBLIC_IMAGE_REMOTE_HOSTNAMES?.split(',') ?? []
  for (const part of extra) {
    const h = part.trim()
    if (!h) continue
    if (h.startsWith('http://') || h.startsWith('https://')) {
      pushFromUrl(h)
      continue
    }
    patterns.push({ protocol: 'https', hostname: h, pathname: '/**' })
    patterns.push({ protocol: 'http', hostname: h, pathname: '/**' })
  }

  for (const hostname of ['localhost', '127.0.0.1']) {
    patterns.push({ protocol: 'http', hostname, pathname: '/**' })
    patterns.push({ protocol: 'https', hostname, pathname: '/**' })
  }

  return patterns
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: buildImageRemotePatterns(),
  },
  reactCompiler: true,
  // Next.js 16: Turbopack 기본 사용. SVG를 React 컴포넌트로 import 하기 위해 SVGR 사용
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          { loader: require.resolve('@svgr/webpack'), options: { icon: true } },
        ],
        as: '*.js',
      },
    },
  },
}

export default nextConfig
