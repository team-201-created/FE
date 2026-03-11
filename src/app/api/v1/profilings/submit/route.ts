/**
 * 테스트 제출 (MSW 미가로챔 시 fallback)
 * POST /api/v1/profilings/submit
 */
import { NextResponse } from 'next/server'
import { mockProfilingResultDetail } from '@/mocks/data/profilingResults'

export async function POST(request: Request) {
  let body: {
    profiling_type?: string
    product_type?: string
    responses?: unknown[]
  }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'BAD_REQUEST',
          message: '요청 본문이 올바르지 않습니다.',
          details: null,
        },
      },
      { status: 400 }
    )
  }

  if (!body?.profiling_type || !Array.isArray(body?.responses)) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'BAD_REQUEST',
          message: '필수 항목이 누락되었습니다.',
          details: null,
        },
      },
      { status: 400 }
    )
  }

  return NextResponse.json(
    {
      success: true,
      data: {
        result_id: mockProfilingResultDetail.id,
        message: '테스트가 제출되었습니다.',
      },
    },
    { status: 201 }
  )
}
