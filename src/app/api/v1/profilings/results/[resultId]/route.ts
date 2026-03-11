/**
 * 결과 상세 조회 (MSW 미가로챔 시 fallback)
 * GET /api/v1/profilings/results/:resultId
 */
import { NextResponse } from 'next/server'
import { mockProfilingResultDetail } from '@/mocks/data/profilingResults'

export async function GET(
  _request: Request,
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

  return NextResponse.json({
    success: true,
    data: { ...mockProfilingResultDetail, id },
  })
}
