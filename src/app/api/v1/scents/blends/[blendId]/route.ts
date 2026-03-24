/**
 * 조합 상세 — 브라우저는 같은 출처로 호출하고, 서버에서 실 API로 프록시 (CORS 회피)
 * NEXT_PUBLIC_API_URL 미설정 시 MSW와 동일한 목 데이터 응답
 */
import { NextResponse } from 'next/server'
import { mockBlendDetails } from '@/mocks/data/comboDetails'

export async function GET(
  _request: Request,
  context: { params: Promise<{ blendId: string }> }
) {
  const { blendId } = await context.params
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim()

  if (baseUrl) {
    const upstream = await fetch(`${baseUrl}/api/v1/scents/blends/${blendId}`, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    })
    const body = await upstream.text()
    return new NextResponse(body, {
      status: upstream.status,
      headers: {
        'Content-Type':
          upstream.headers.get('Content-Type') || 'application/json',
      },
    })
  }

  const id = Number(blendId)
  const found = mockBlendDetails.find((item) => item.id === id)
  if (!found) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'SCENT_COMBINATION_NOT_FOUND',
          message: '조합 향 정보를 찾을 수 없습니다.',
          details: { combination_id: id },
        },
      },
      { status: 404 }
    )
  }
  return NextResponse.json({ success: true, data: { ...found } })
}
