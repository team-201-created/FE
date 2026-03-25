/**
 * 조합 목록 목 데이터 (API 명세: GET /api/v1/scents/blends)
 * data.results[] — thumbnail_image_url, blend_categories[].name.kr/en, contained_elements[]
 */
const bc = (kr: string, en: string) => [{ name: { kr, en } }]
const ce = (...categories: Array<{ kr: string; en: string }>) =>
  categories.map((category, i) => ({
    name: `원료${i + 1}`,
    category,
  }))

export const mockBlendsResults = [
  {
    id: 11,
    name: '하트 시그널',
    thumbnail_image_url: '/img/11.svg',
    blend_categories: bc('포근', 'Cozy'),
    contained_elements: ce(
      { kr: '플로럴', en: 'floral' },
      { kr: '우디', en: 'woody' }
    ),
  },
  {
    id: 12,
    name: '포레스트 워크',
    thumbnail_image_url: '/img/12.svg',
    blend_categories: bc('숙면', 'Sleep'),
    contained_elements: ce(
      { kr: '우디', en: 'woody' },
      { kr: '아로마틱', en: 'aromatic' }
    ),
  },
  {
    id: 13,
    name: '모닝 에너지',
    thumbnail_image_url: '/img/13.svg',
    blend_categories: bc('기분전환', 'Refresh'),
    contained_elements: ce(
      { kr: '시트러스', en: 'citrus' },
      { kr: '아로마틱', en: 'aromatic' }
    ),
  },
  {
    id: 14,
    name: '딥 릴렉스',
    thumbnail_image_url: '/img/14.svg',
    blend_categories: bc('휴식', 'Relax'),
    contained_elements: ce(
      { kr: '베이스', en: 'base' },
      { kr: '우디', en: 'woody' }
    ),
  },
  {
    id: 15,
    name: '로맨틱 나이트',
    thumbnail_image_url: '/img/15.svg',
    blend_categories: bc('로맨틱', 'Romantic'),
    contained_elements: ce(
      { kr: '플로럴', en: 'floral' },
      { kr: '오리엔탈', en: 'oriental' }
    ),
  },
  {
    id: 16,
    name: '액티브 플로우',
    thumbnail_image_url: '/img/16.svg',
    blend_categories: bc('운동', 'Active'),
    contained_elements: ce(
      { kr: '시트러스', en: 'citrus' },
      { kr: '우디', en: 'woody' }
    ),
  },
  {
    id: 17,
    name: '포커스 블렌드',
    thumbnail_image_url: '/img/17.svg',
    blend_categories: bc('집중', 'Focus'),
    contained_elements: ce(
      { kr: '아로마틱', en: 'aromatic' },
      { kr: '베이스', en: 'base' }
    ),
  },
] as const

/** @deprecated 새 명세는 mockBlendsResults 사용 */
export const mockCombinationsItems = mockBlendsResults
