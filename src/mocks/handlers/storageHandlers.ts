import { http, HttpResponse } from 'msw'
import data from '../data/storage'

export const storageHandlers = [
  // 테스트 결과 목록 조회
  http.get('*/api/v1/users/me/analysis-results', ({ request }) => {
    const url = new URL(request.url)
    const inputDataType = url.searchParams.get('input_data_type')
    const page = Number(url.searchParams.get('page') ?? 1)
    const size = Number(url.searchParams.get('size') ?? 10)

    let filtered = data
    if (inputDataType === 'PREFERENCE') {
      filtered = data.filter((item) => item.input_data_type === 'PREFERENCE')
    }
    if (inputDataType === 'HEALTH') {
      filtered = data.filter((item) => item.input_data_type === 'HEALTH')
    }
    if (inputDataType === 'OOTD') {
      filtered = data.filter((item) => item.input_data_type === 'OOTD')
    }
    if (inputDataType === 'INTERIOR') {
      filtered = data.filter((item) => item.input_data_type === 'INTERIOR')
    }

    const start = (page - 1) * size
    const results = filtered.slice(start, start + size)

    return HttpResponse.json({
      success: true,
      data: {
        results,
        page,
        size,
        count: filtered.length,
        total_pages: Math.ceil(filtered.length / size),
      },
    })
  }),
]
