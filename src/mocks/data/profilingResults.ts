/**
 * GET /api/v1/profilings/results/{result_id} 목 데이터
 *
 * API 성공 스키마와 동일. 제출(product_type 등)에 따라 실서버는 필드가 달라질 수 있음.
 */
import type { ProfilingResultDetail } from '@/app/find-my-scent/_types'

/** 명세 Success Response Example 기준 기본 샘플 */
export const mockProfilingResultDetail: ProfilingResultDetail = {
  id: 42,
  input_data_type: 'PREFERENCE',
  product_type: 'DIFFUSER',
  input_data_summary: '차분한 무드와 가을 숲을 선호하는 당신에게...',
  recommended_blend: {
    name: '포근한 숲',
    image_url: '/images/blend_5.jpg',
    description: '따뜻한 우디 향',
    contained_elements: [
      { name: '시더우드', category: { kr: '우디', en: 'Woody' } },
      { name: '라벤더', category: { kr: '아로마틱', en: 'Aromatic' } },
    ],
  },
  recommended_products: [
    { purchase_url: 'https://shop.example.com/product/1' },
  ],
  created_at: '2026-02-28T14:30:00Z',
}

/** 향수(PERFUME) 제출 시 결과 페이지 UI 확인용 보조 목 (선택) */
export const mockProfilingResultDetailPerfume: ProfilingResultDetail = {
  ...mockProfilingResultDetail,
  id: 43,
  product_type: 'PERFUME',
  input_data_summary:
    '우아한 플로럴과 시트러스를 선호하는 당신에게 맞춤 향수 블렌드를 추천합니다.',
}
