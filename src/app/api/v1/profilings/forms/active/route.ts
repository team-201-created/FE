/**
 * 활성 프로파일링 폼 조회
 * - Query: profiling_type (PREFERENCE | HEALTH), product_type (PERFUME | DIFFUSER)
 * - NEXT_PUBLIC_USE_MOCK_API=true: 목 응답
 * - 그 외: httpOnly access_token 으로 백엔드 프록시
 */
import { NextResponse } from 'next/server'
import {
  mockProfilingFormPREFERENCE,
  mockProfilingFormHEALTH,
} from '@/mocks/data/profilingForms'
import { proxyToProfilingUpstream } from '../../_lib/upstreamProxy'

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true'

const PRODUCT_TYPES = ['PERFUME', 'DIFFUSER'] as const

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const profilingType = searchParams.get('profiling_type')
  const productType = searchParams.get('product_type')

  if (profilingType !== 'PREFERENCE' && profilingType !== 'HEALTH') {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INVALID_PARAMETER',
          message: 'profiling_type은 PREFERENCE 또는 HEALTH여야 합니다.',
          details: {
            field: 'profiling_type',
            reason: 'invalid_value',
          },
        },
      },
      { status: 400 }
    )
  }

  if (
    !productType ||
    !PRODUCT_TYPES.includes(productType as (typeof PRODUCT_TYPES)[number])
  ) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INVALID_PARAMETER',
          message: 'product_type은 PERFUME 또는 DIFFUSER여야 합니다.',
          details: {
            field: 'product_type',
            reason: 'invalid_value',
          },
        },
      },
      { status: 400 }
    )
  }

  if (USE_MOCK) {
    const form =
      profilingType === 'HEALTH'
        ? mockProfilingFormHEALTH
        : mockProfilingFormPREFERENCE

    return NextResponse.json({ success: true, data: form })
  }

  const q = new URLSearchParams({
    profiling_type: profilingType,
    product_type: productType,
  })
  return proxyToProfilingUpstream(
    `/api/v1/profilings/forms/active?${q.toString()}`,
    {
      method: 'GET',
    }
  )
}
