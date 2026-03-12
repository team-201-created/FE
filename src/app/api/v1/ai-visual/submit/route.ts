/**
 * AI 비주얼 분석 제출 (MSW 미가로챔 시 fallback)
 * POST /api/v1/ai-visual/submit
 * body: FormData { photo_type: 'INTERIOR' | 'OOTD', file: File }
 */
import { NextResponse } from 'next/server'
import { mockProfilingResultDetail } from '@/mocks/data/profilingResults'

export async function POST(request: Request) {
  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'BAD_REQUEST',
          message: '요청 본문이 올바르지 않습니다.',
        },
      },
      { status: 400 }
    )
  }

  const photoType = formData.get('photo_type') as string | null
  const file = formData.get('file')

  if (!photoType || !file || !(file instanceof File)) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'BAD_REQUEST',
          message: 'photo_type과 file이 필요합니다.',
        },
      },
      { status: 400 }
    )
  }

  if (!['INTERIOR', 'OOTD'].includes(photoType)) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'BAD_REQUEST',
          message: 'photo_type은 INTERIOR 또는 OOTD여야 합니다.',
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
        message: 'AI 비주얼 분석이 제출되었습니다.',
      },
    },
    { status: 201 }
  )
}
