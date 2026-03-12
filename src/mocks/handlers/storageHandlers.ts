import { http, HttpResponse } from 'msw'
import data from '../data/storage'

export const storageHandlers = [
  // 스토리지 목록 조회
  http.get('*/api/v1/storage', () => {
    return HttpResponse.json({
      success: true,
      data,
    })
  }),

  // 스토리지 아이템 삭제
  http.delete('*/api/v1/storage/:id', ({ params }) => {
    const id = Number(params.id)
    const idx = data.findIndex((item) => item.id === id)
    if (idx !== -1) data.splice(idx, 1)
    return HttpResponse.json({ success: true })
  }),
]
