import { NextResponse } from 'next/server'
import { getServerAccessToken } from '@/lib/auth/getServerAccessToken'

/**
 * MSW/목 외 실서버 연동: Bearer로 백엔드에 전달 후 응답·상태를 그대로 클라이언트에 반환.
 *
 * lib/api의 authFetch는 실패 시 handleResponse로 throw·정상 시 json()만 반환하므로
 * 업스트림 4xx 본문을 그대로 넘기는 BFF 프록시 용도로는 사용할 수 없습니다.
 */
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

  const token = await getServerAccessToken()
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
