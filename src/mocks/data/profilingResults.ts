/**
 * GET /api/v1/profilings/results/:result_id 목 데이터
 */
import type { ProfilingResultDetail } from '@/app/find-my-scent/_types'

export const mockProfilingResultDetail: ProfilingResultDetail = {
  id: 42,
  input_data_type: 'PREFERENCE',
  product_type: 'DIFFUSER',
  input_data_summary:
    '차분한 무드와 가을 숲을 선호하는 당신에게 포근한 우디 향을 추천합니다.',
  recommended_blend: {
    name: '포근한 숲',
    image_url: '/img/17.svg',
    description:
      '따뜻한 우디 향. 깊고 신비로운 오리엔탈 조합 향기가 당신만의 개성을 표현합니다.',
    contained_elements: [
      { name: '시더우드', category: { kr: '우디', en: 'Woody' } },
      { name: '라벤더', category: { kr: '아로마틱', en: 'Aromatic' } },
    ],
  },
  recommended_products: [{ purchase_url: 'https://www.coupang.com/' }],
  created_at: '2026-02-28T14:30:00Z',
}
