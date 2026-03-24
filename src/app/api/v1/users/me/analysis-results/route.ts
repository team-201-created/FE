import { NextRequest, NextResponse } from 'next/server'
import { getApiBaseUrl, proxyWithRefresh } from '@/lib/auth/serverAuthProxy'

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
    const baseUrl = getApiBaseUrl()

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

    const backendUrl = buildBackendUrl(baseUrl, request)

    return proxyWithRefresh({
      requestWithAccessToken: (accessToken) =>
        fetchAnalysisResults(backendUrl, accessToken),
      fallbackError: {
        code: 'ANALYSIS_RESULTS_FETCH_FAILED',
        message: '테스트 결과 목록 조회에 실패했습니다.',
      },
    })
  } catch {
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
