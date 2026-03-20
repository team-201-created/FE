/**
 * 테스트 제출
 * - NEXT_PUBLIC_USE_MOCK_API=true: 기존 목 검증·응답
 * - 그 외: 백엔드 프록시
 */
import { NextResponse } from 'next/server'
import { authFetch, FetchError } from '@/lib/api'
import { MOCK_PIPELINE_SNAPSHOT_ID } from '@/mocks/data/profilingConstants'
import { mockProfilingResultDetail } from '@/mocks/data/profilingResults'

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true'

const PRODUCT_TYPES = ['DIFFUSER', 'PERFUME'] as const
const PROFILING_TYPES = ['PREFERENCE', 'HEALTH'] as const

export async function POST(request: Request) {
  let body: {
    pipeline_snapshot_id?: number
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

  if (!USE_MOCK) {
    try {
      const data = await authFetch.post<unknown>(
        '/api/v1/profilings/submit',
        body,
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

  if (
    body?.pipeline_snapshot_id == null ||
    typeof body.pipeline_snapshot_id !== 'number' ||
    !body?.profiling_type ||
    !body?.product_type ||
    !Array.isArray(body?.responses)
  ) {
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

  if (
    !PRODUCT_TYPES.includes(body.product_type as (typeof PRODUCT_TYPES)[number])
  ) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'BAD_REQUEST',
          message: 'product_type이 올바르지 않습니다.',
          details: { field: 'product_type', reason: 'invalid' },
        },
      },
      { status: 400 }
    )
  }

  if (
    !PROFILING_TYPES.includes(
      body.profiling_type as (typeof PROFILING_TYPES)[number]
    )
  ) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'BAD_REQUEST',
          message: 'profiling_type이 올바르지 않습니다.',
          details: { field: 'profiling_type', reason: 'invalid' },
        },
      },
      { status: 400 }
    )
  }

  const expectedSnapshot =
    body.profiling_type === 'HEALTH'
      ? MOCK_PIPELINE_SNAPSHOT_ID.HEALTH
      : MOCK_PIPELINE_SNAPSHOT_ID.PREFERENCE
  if (body.pipeline_snapshot_id !== expectedSnapshot) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'BAD_REQUEST',
          message:
            'pipeline_snapshot_id가 활성 폼과 일치하지 않습니다. 최신 폼을 다시 불러오세요.',
          details: { field: 'pipeline_snapshot_id', reason: 'invalid' },
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
