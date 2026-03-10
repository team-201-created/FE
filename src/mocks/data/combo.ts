/**
 * 조합 목록 목 데이터 (API 명세: GET /api/v1/scents/blends)
 * data.results[] — thumbnail_image_url, blend_categories[].name.kr/en
 */
const bc = (kr: string, en: string) => [{ name: { kr, en } }]

export const mockBlendsResults = [
  {
    id: 11,
    name: '하트 시그널',
    thumbnail_image_url: '/img/11.svg',
    blend_categories: bc('포근', 'Cozy'),
  },
  {
    id: 12,
    name: '포레스트 워크',
    thumbnail_image_url: '/img/12.svg',
    blend_categories: bc('숙면', 'Sleep'),
  },
  {
    id: 13,
    name: '모닝 에너지',
    thumbnail_image_url: '/img/13.svg',
    blend_categories: bc('기분전환', 'Refresh'),
  },
  {
    id: 14,
    name: '딥 릴렉스',
    thumbnail_image_url: '/img/14.svg',
    blend_categories: bc('휴식', 'Relax'),
  },
  {
    id: 15,
    name: '로맨틱 나이트',
    thumbnail_image_url: '/img/15.svg',
    blend_categories: bc('로맨틱', 'Romantic'),
  },
  {
    id: 16,
    name: '액티브 플로우',
    thumbnail_image_url: '/img/16.svg',
    blend_categories: bc('운동', 'Active'),
  },
  {
    id: 17,
    name: '포커스 블렌드',
    thumbnail_image_url: '/img/17.svg',
    blend_categories: bc('집중', 'Focus'),
  },
] as const

/** @deprecated 새 명세는 mockBlendsResults 사용 */
export const mockCombinationsItems = mockBlendsResults
