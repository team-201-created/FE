/**
 * 활성 프로파일링 폼 조회 (MSW 미가로챔 시 fallback)
 * - MSW 사용 시에는 worker가 이 요청을 가로챔
 * - worker 미등록/미동작 시 요청이 서버로 오면 같은 목데이터로 응답
 */
import { NextResponse } from 'next/server'
import {
  mockProfilingFormPREFERENCE,
  mockProfilingFormHEALTH,
} from '@/mocks/data/profilingForms'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const profilingType = searchParams.get('profiling_type')

  if (profilingType !== 'PREFERENCE' && profilingType !== 'HEALTH') {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INVALID_PARAMETER',
          message: 'profiling_type은 PREFERENCE 또는 HEALTH여야 합니다.',
          details: { field: 'profiling_type' },
        },
      },
      { status: 400 }
    )
  }

  const form =
    profilingType === 'HEALTH'
      ? mockProfilingFormHEALTH
      : mockProfilingFormPREFERENCE

  return NextResponse.json({ success: true, data: form })
}
