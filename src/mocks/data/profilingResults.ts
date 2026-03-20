/**
 * GET /api/v1/profilings/results/:result_id 목 데이터
 *
 * ProfilingResultDetail — 제출 시 선택한 product_type(DIFFUSER | PERFUME)에 따라
 * 실서버는 결과가 달라질 수 있음. 목에서는 공통 샘플 1건 사용.
 */
import type { ProfilingResultDetail } from '@/app/find-my-scent/_types'

export const mockProfilingResultDetail: ProfilingResultDetail = {
  id: 42,
  /** PREFERENCE | HEALTH | AI 등 */
  input_data_type: 'PREFERENCE',
  /** 제출 시 선택한 product_type과 맞추려면 MSW에서 submit 직후 별도 저장 로직 필요 */
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

/** 향수(PERFUME) 제출 시 결과 페이지 UI 확인용 보조 목 (선택) */
export const mockProfilingResultDetailPerfume: ProfilingResultDetail = {
  ...mockProfilingResultDetail,
  id: 43,
  product_type: 'PERFUME',
  input_data_summary:
    '우아한 플로럴과 시트러스를 선호하는 당신에게 맞춤 향수 블렌드를 추천합니다.',
}
