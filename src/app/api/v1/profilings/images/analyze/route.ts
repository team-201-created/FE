/**
 * AI 분석 테스트 제출 (MSW 미가로챔 시 fallback)
 * POST /api/v1/profilings/images/analyze
 * Body: { image_url, image_type (OOTD|INTERIOR), product_type (DIFFUSER|PERFUME) }
 */
import { NextResponse } from 'next/server'
import { mockProfilingResultDetail } from '@/mocks/data/profilingResults'

export async function POST(request: Request) {
  const auth = request.headers.get('Authorization')
  if (!auth?.startsWith('Bearer ')) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: '인증이 필요합니다.',
          details: null,
        },
      },
      { status: 401 }
    )
  }

  let body: {
    image_url?: string
    image_type?: string
    product_type?: string
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

  const { image_url, image_type, product_type } = body ?? {}
  if (!image_url || !image_type || !product_type) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'BAD_REQUEST',
          message: 'image_url, image_type, product_type은 필수입니다.',
          details: null,
        },
      },
      { status: 400 }
    )
  }
  if (!['OOTD', 'INTERIOR'].includes(image_type)) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'BAD_REQUEST',
          message: 'image_type은 OOTD 또는 INTERIOR여야 합니다.',
          details: null,
        },
      },
      { status: 400 }
    )
  }
  if (!['DIFFUSER', 'PERFUME'].includes(product_type)) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'BAD_REQUEST',
          message: 'product_type은 DIFFUSER 또는 PERFUME이어야 합니다.',
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
        message: '사진 분석이 완료되었습니다.',
      },
    },
    { status: 201 }
  )
}
