/**
 * 결과 상세 조회
 * - NEXT_PUBLIC_USE_MOCK_API=true: 목 응답
 * - 그 외: 백엔드 프록시
 */
import { NextResponse } from 'next/server'
import { mockProfilingResultDetail } from '@/mocks/data/profilingResults'
import { proxyToProfilingUpstream } from '../../_lib/upstreamProxy'

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

  return proxyToProfilingUpstream(`/api/v1/profilings/results/${id}`, {
    method: 'GET',
  })
}
