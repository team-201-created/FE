/**
 * 조합 목록 조회 (MSW 미가로챔 시 fallback)
 * - MSW 사용 시에는 worker가 이 요청을 가로챔
 * - worker 미등록/미동작 시 요청이 서버로 오면 같은 목데이터로 응답
 * - 실 API 연동 시 NEXT_PUBLIC_API_BASE_URL 설정으로 외부 서버 사용
 */
import { NextResponse } from 'next/server'
import { mockBlendsResults } from '@/mocks/data/combo'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number(searchParams.get('page') ?? 1)
  const size = Number(searchParams.get('size') ?? 10)

  const start = (page - 1) * size
  const results = [...mockBlendsResults].slice(start, start + size)
  const count = mockBlendsResults.length
  const total_pages = Math.ceil(count / size) || 1

  return NextResponse.json({
    success: true,
    data: {
      results: results.map((item) => ({ ...item })),
      page,
      size,
      count,
      total_pages,
    },
  })
}
