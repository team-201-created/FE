/**
 * 조합 상세 목 데이터 (API 명세: GET /api/v1/scents/blends/{blend_id})
 * blend_categories[], contained_elements[] (name, category.kr/en), purchase_url
 */
const blendCat = (id: number, kr: string, en: string) => ({
  id,
  name: { kr, en },
})
const elem = (name: string, kr: string, en: string) => ({
  name,
  category: { kr, en },
})

export const mockBlendDetails = [
  {
    id: 11,
    name: '하트 시그널',
    image_url: '/img/11.svg',
    description: '포근한 무드를 위한 한줄 설명',
    blend_categories: [
      blendCat(2, '기분전환', 'Refresh'),
      blendCat(7, '로맨틱', 'Romantic'),
    ],
    contained_elements: [
      elem('샌달우드', '우디', 'Woody'),
      elem('로즈', '플로럴', 'Floral'),
    ],
    purchase_url: 'https://www.coupang.com',
  },
  {
    id: 12,
    name: '포레스트 워크',
    image_url: '/img/12.svg',
    description: '숙면 무드를 위한 한줄 설명',
    blend_categories: [blendCat(2, '숙면', 'Sleep')],
    contained_elements: [
      elem('샌달우드', '우디', 'Woody'),
      elem('라벤더', '아로마틱', 'Aromatic'),
    ],
    purchase_url: 'https://www.coupang.com',
  },
  {
    id: 13,
    name: '모닝 에너지',
    image_url: '/img/13.svg',
    description: '기분전환 무드를 위한 한줄 설명',
    blend_categories: [blendCat(2, '기분전환', 'Refresh')],
    contained_elements: [
      elem('베르가못', '시트러스', 'Citrus'),
      elem('리차징', '베이스', 'Base'),
    ],
    purchase_url: 'https://www.coupang.com',
  },
  {
    id: 14,
    name: '딥 릴렉스',
    image_url: '/img/14.svg',
    description: '휴식 무드를 위한 한줄 설명',
    blend_categories: [blendCat(2, '휴식', 'Relax')],
    contained_elements: [
      elem('라벤더', '아로마틱', 'Aromatic'),
      elem('샌달우드', '우디', 'Woody'),
    ],
    purchase_url: 'https://www.coupang.com',
  },
  {
    id: 15,
    name: '로맨틱 나이트',
    image_url: '/img/15.svg',
    description: '로맨틱 무드를 위한 한줄 설명',
    blend_categories: [blendCat(7, '로맨틱', 'Romantic')],
    contained_elements: [
      elem('로즈', '플로럴', 'Floral'),
      elem('인센스', '오리엔탈', 'Oriental'),
    ],
    purchase_url: 'https://www.coupang.com',
  },
  {
    id: 16,
    name: '액티브 플로우',
    image_url: '/img/16.svg',
    description: '운동 무드를 위한 한줄 설명',
    blend_categories: [blendCat(2, '운동', 'Active')],
    contained_elements: [
      elem('베르가못', '시트러스', 'Citrus'),
      elem('라벤더', '아로마틱', 'Aromatic'),
    ],
    purchase_url: 'https://www.coupang.com',
  },
  {
    id: 17,
    name: '포커스 블렌드',
    image_url: '/img/17.svg',
    description: '집중 무드를 위한 한줄 설명',
    blend_categories: [blendCat(2, '집중', 'Focus')],
    contained_elements: [
      elem('샌달우드', '우디', 'Woody'),
      elem('베르가못', '시트러스', 'Citrus'),
    ],
    purchase_url: 'https://www.coupang.com',
  },
] as const
