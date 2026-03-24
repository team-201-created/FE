/**
 * 단품 상세 — 브라우저는 같은 출처로 호출하고, 서버에서 실 API로 프록시 (CORS 회피)
 * NEXT_PUBLIC_API_URL 미설정 시 MSW와 동일한 목 데이터 응답
 */
import { NextResponse } from 'next/server'
import { mockElementDetails } from '@/mocks/data/singlesDetails'

export async function GET(
  _request: Request,
  context: { params: Promise<{ elementId: string }> }
) {
  const { elementId } = await context.params
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim()

  if (baseUrl) {
    const upstream = await fetch(
      `${baseUrl}/api/v1/scents/elements/${elementId}`,
      {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      }
    )
    const body = await upstream.text()
    return new NextResponse(body, {
      status: upstream.status,
      headers: {
        'Content-Type':
          upstream.headers.get('Content-Type') || 'application/json',
      },
    })
  }

  const id = Number(elementId)
  const found = mockElementDetails.find((item) => item.id === id)
  if (!found) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INVALID_PATH_PARAMETER',
          message: '경로 파라미터가 올바르지 않습니다.',
          details: { field: 'element_id', reason: 'not_found' },
        },
      },
      { status: 404 }
    )
  }
  return NextResponse.json({ success: true, data: { ...found } })
}
