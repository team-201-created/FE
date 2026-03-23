import { NextRequest, NextResponse } from 'next/server'

/**
 * 소셜 authorize URL — 브라우저는 localhost 동일 출처로만 호출 (CORS 회피).
 * 서버에서만 upstream(duckdns 등)으로 요청합니다.
 */
function upstreamBase(): string | null {
  const u = process.env.NEXT_PUBLIC_API_URL?.trim()
  return u || null
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ provider: string }> }
) {
  const base = upstreamBase()
  if (!base) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: {
          code: 'MISSING_API_URL',
          message: 'NEXT_PUBLIC_API_URL is not configured.',
        },
      },
      { status: 500 }
    )
  }

  const { provider } = await context.params
  const search = request.nextUrl.search
  const root = base.replace(/\/$/, '')

  const primaryUrl = `${root}/api/v1/auth/social/${provider}/authorize-url${search}`
  let upstream = await fetch(primaryUrl, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  })

  if (upstream.status === 404) {
    const fallbackUrl = `${root}/api/v1/auth/${provider}/authorize-url${search}`
    upstream = await fetch(fallbackUrl, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    })
  }

  const text = await upstream.text()
  const contentType =
    upstream.headers.get('content-type') || 'application/json; charset=utf-8'

  return new NextResponse(text, {
    status: upstream.status,
    headers: { 'Content-Type': contentType },
  })
}
