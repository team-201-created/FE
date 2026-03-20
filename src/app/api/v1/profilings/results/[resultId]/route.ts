/**
 * 결과 상세 조회
 * - NEXT_PUBLIC_USE_MOCK_API=true: 목 응답
 * - 그 외: 백엔드 프록시
 */
import { NextResponse } from 'next/server'
import { authFetch, FetchError } from '@/lib/api'
import { mockProfilingResultDetail } from '@/mocks/data/profilingResults'

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ resultId: string }> }
) {
  const { resultId } = await params
  const id = Number(resultId)
  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: '리소스를 찾을 수 없습니다.',
          details: null,
        },
      },
      { status: 404 }
    )
  }

  if (USE_MOCK) {
    return NextResponse.json({
      success: true,
      data: { ...mockProfilingResultDetail, id },
    })
  }

  try {
    const data = await authFetch.get<unknown>(
      `/api/v1/profilings/results/${id}`,
      {
        cache: 'no-store',
      }
    )
    return NextResponse.json(data)
  } catch (error) {
    if (error instanceof FetchError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: error.code,
            message: error.message,
            details: error.details ?? null,
          },
        },
        { status: error.status || 500 }
      )
    }
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'UPSTREAM_UNKNOWN',
          message: '서버 요청 중 오류가 발생했습니다.',
          details: null,
        },
      },
      { status: 500 }
    )
  }
}
