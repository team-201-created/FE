/**
 * 단품 목록 목 데이터 (API 명세: GET /api/v1/scents/elements)
 * data.results[] — thumbnail_image_url, element_category.name.kr/en
 */
const category = (kr: string, en: string) => ({ name: { kr, en } })

export const mockElementsResults = [
  {
    id: 1,
    name: '리차징',
    thumbnail_image_url: '/img/1.svg',
    element_category: category('베이스', 'Base'),
  },
  {
    id: 2,
    name: '차밍',
    thumbnail_image_url: '/img/2.svg',
    element_category: category('베이스', 'Base'),
  },
  {
    id: 3,
    name: '리프레싱',
    thumbnail_image_url: '/img/3.svg',
    element_category: category('베이스', 'Base'),
  },
  {
    id: 4,
    name: '밸런싱',
    thumbnail_image_url: '/img/4.svg',
    element_category: category('베이스', 'Base'),
  },
  {
    id: 5,
    name: '릴랙싱',
    thumbnail_image_url: '/img/5.svg',
    element_category: category('베이스', 'Base'),
  },
  {
    id: 6,
    name: '베르가못',
    thumbnail_image_url: '/img/6.svg',
    element_category: category('시트러스', 'Citrus'),
  },
  {
    id: 7,
    name: '자몽',
    thumbnail_image_url: '/img/7.svg',
    element_category: category('시트러스', 'Citrus'),
  },
  {
    id: 8,
    name: '유자',
    thumbnail_image_url: '/img/8.svg',
    element_category: category('시트러스', 'Citrus'),
  },
  {
    id: 9,
    name: '라벤더',
    thumbnail_image_url: '/img/9.svg',
    element_category: category('아로마틱', 'Aromatic'),
  },
  {
    id: 10,
    name: '로즈마리',
    thumbnail_image_url: '/img/10.svg',
    element_category: category('아로마틱', 'Aromatic'),
  },
  {
    id: 11,
    name: '버베나',
    thumbnail_image_url: '/img/11.svg',
    element_category: category('아로마틱', 'Aromatic'),
  },
  {
    id: 12,
    name: '샌달우드',
    thumbnail_image_url: '/img/12.svg',
    element_category: category('우디', 'Woody'),
  },
  {
    id: 13,
    name: '파인',
    thumbnail_image_url: '/img/13.svg',
    element_category: category('우디', 'Woody'),
  },
  {
    id: 14,
    name: '네롤리',
    thumbnail_image_url: '/img/14.svg',
    element_category: category('플로럴', 'Floral'),
  },
  {
    id: 15,
    name: '로즈',
    thumbnail_image_url: '/img/15.svg',
    element_category: category('플로럴', 'Floral'),
  },
  {
    id: 16,
    name: '라일락',
    thumbnail_image_url: '/img/16.svg',
    element_category: category('플로럴', 'Floral'),
  },
  {
    id: 17,
    name: '인센스',
    thumbnail_image_url: '/img/17.svg',
    element_category: category('오리엔탈', 'Oriental'),
  },
  {
    id: 18,
    name: '베티버',
    thumbnail_image_url: '/img/18.svg',
    element_category: category('오리엔탈', 'Oriental'),
  },
  {
    id: 19,
    name: '앰버',
    thumbnail_image_url: '/img/19.svg',
    element_category: category('애니멀릭', 'Animalic'),
  },
  {
    id: 20,
    name: '머스크',
    thumbnail_image_url: '/img/20.svg',
    element_category: category('머스크', 'Musk'),
  },
] as const

/** @deprecated 새 명세는 mockElementsResults 사용 */
export const mockSinglesItems = mockElementsResults
