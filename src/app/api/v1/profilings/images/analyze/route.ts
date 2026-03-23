/**
 * AI 분석 테스트 제출
 * POST /api/v1/profilings/images/analyze
 * Body: { image_url, image_type (OOTD|INTERIOR), product_type (DIFFUSER|PERFUME) }
 *
 * - NEXT_PUBLIC_USE_MOCK_API=true: 로컬 mock result_id
 * - 그 외: 백엔드 프록시
 */
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { mockProfilingResultDetail } from '@/mocks/data/profilingResults'

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true'

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get('access_token')?.value
  const authHeader = request.headers.get('Authorization')
  const bearer =
    authHeader?.startsWith('Bearer ') && authHeader.length > 7
      ? authHeader
      : token
        ? `Bearer ${token}`
        : null

  if (!bearer) {
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

  if (USE_MOCK) {
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

  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim()
  if (!baseUrl) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'MISSING_API_URL',
          message: 'NEXT_PUBLIC_API_URL is not configured.',
          details: null,
        },
      },
      { status: 500 }
    )
  }

  const upstream = await fetch(`${baseUrl}/api/v1/profilings/images/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: bearer,
    },
    body: JSON.stringify({ image_url, image_type, product_type }),
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
