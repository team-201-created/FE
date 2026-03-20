import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

/** MSW/목 응답 경로 외 실서버 연동 시 쿠키 access_token 을 Bearer 로 붙여 백엔드로 전달 */
export async function proxyToProfilingUpstream(
  upstreamPathWithQuery: string,
  init: RequestInit = {}
): Promise<NextResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim()
  if (!baseUrl) {
    return NextResponse.json(
      {
        success: false as const,
        error: {
          code: 'MISSING_API_URL',
          message: 'NEXT_PUBLIC_API_URL is not configured.',
          details: null,
        },
      },
      { status: 500 }
    )
  }

  const cookieStore = await cookies()
  const token = cookieStore.get('access_token')?.value

  if (!token) {
    return NextResponse.json(
      {
        success: false as const,
        error: {
          code: 'UNAUTHORIZED',
          message: '로그인이 필요합니다.',
          details: null,
        },
      },
      { status: 401 }
    )
  }

  const url = `${baseUrl}${upstreamPathWithQuery}`
  const upstream = await fetch(url, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      Authorization: `Bearer ${token}`,
      ...(init.headers as Record<string, string>),
    },
    cache: 'no-store',
  })

  const text = await upstream.text()
  let data: unknown = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = {
      success: false,
      error: {
        code: 'UPSTREAM_PARSE_ERROR',
        message: '서버 응답을 해석하지 못했습니다.',
        details: null,
      },
    }
  }

  return NextResponse.json(data, { status: upstream.status })
}
