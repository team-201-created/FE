import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { postTokenRefresh } from '@/lib/api/auth'

const BASE_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
}

const clearAuthCookies = (response: NextResponse) => {
  response.cookies.set('access_token', '', { maxAge: 0, path: '/' })
  response.cookies.set('refresh_token', '', { maxAge: 0, path: '/' })
}

const buildBackendUrl = (baseUrl: string, request: NextRequest): string => {
  const url = new URL(request.url)
  const query = url.searchParams.toString()
  const suffix = query ? `?${query}` : ''
  return `${baseUrl}/api/v1/users/me/analysis-results${suffix}`
}

const fetchAnalysisResults = async (url: string, accessToken: string) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  })
}

export async function GET(request: NextRequest) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim()

    if (!baseUrl) {
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

    const cookieStore = await cookies()
    let accessToken = cookieStore.get('access_token')?.value
    const refreshToken = cookieStore.get('refresh_token')?.value
    const backendUrl = buildBackendUrl(baseUrl, request)

    if (!accessToken && !refreshToken) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: {
            code: 'NOT_AUTHENTICATED',
            message: '인증이 필요합니다.',
          },
        },
        { status: 401 }
      )
    }

    // 1) access 토큰으로 우선 요청
    if (accessToken) {
      const upstream = await fetchAnalysisResults(backendUrl, accessToken)
      if (upstream.ok) {
        const data = await upstream.json()
        return NextResponse.json(data, { status: upstream.status })
      }

      // 401이 아니면 그대로 전달
      if (upstream.status !== 401) {
        const errorData = await upstream.json().catch(() => null)
        return NextResponse.json(
          errorData ?? {
            success: false,
            data: null,
            error: {
              code: 'ANALYSIS_RESULTS_FETCH_FAILED',
              message: '테스트 결과 목록 조회에 실패했습니다.',
            },
          },
          { status: upstream.status }
        )
      }
    }

    // 2) access 토큰이 없거나 만료된 경우 refresh 시도
    if (!refreshToken) {
      const response = NextResponse.json(
        {
          success: false,
          data: null,
          error: {
            code: 'NOT_AUTHENTICATED',
            message: '인증이 필요합니다.',
          },
        },
        { status: 401 }
      )
      clearAuthCookies(response)
      return response
    }

    try {
      const refreshed = await postTokenRefresh(refreshToken)
      accessToken = refreshed.data.access_token

      const upstream = await fetchAnalysisResults(backendUrl, accessToken)
      const body = await upstream.json().catch(() => null)

      const response = NextResponse.json(
        body ?? {
          success: false,
          data: null,
          error: {
            code: 'ANALYSIS_RESULTS_FETCH_FAILED',
            message: '테스트 결과 목록 조회에 실패했습니다.',
          },
        },
        { status: upstream.status }
      )

      response.cookies.set('access_token', refreshed.data.access_token, {
        ...BASE_COOKIE_OPTIONS,
        maxAge: refreshed.data.expires_in,
      })
      response.cookies.set('refresh_token', refreshed.data.refresh_token, {
        ...BASE_COOKIE_OPTIONS,
        maxAge: refreshed.data.refresh_expires_in,
      })

      return response
    } catch {
      const response = NextResponse.json(
        {
          success: false,
          data: null,
          error: {
            code: 'NOT_AUTHENTICATED',
            message: '인증이 필요합니다.',
          },
        },
        { status: 401 }
      )
      clearAuthCookies(response)
      return response
    }
  } catch (error) {
    console.error('Analysis results API error:', error)
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: {
          code: 'ANALYSIS_RESULTS_FAILED',
          message: '테스트 결과 목록을 조회하는 중 오류가 발생했습니다.',
        },
      },
      { status: 500 }
    )
  }
}
