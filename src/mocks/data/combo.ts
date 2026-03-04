/**
 * 조합 목록 목 데이터 (API 명세: GET /api/v1/scents/combinations)
 * 테마(향기노트): 기분전환, 숙면, 집중, 휴식, 로맨틱, 운동, 포근
 */
export const mockCombinationsItems = [
  {
    id: 11,
    name: '하트 시그널',
    image_url: '/img/11.svg',
    theme_option: { id: 201, name: '포근' },
    accord_options: [
      { id: 304, name: '우디' },
      { id: 307, name: '머스크' },
    ],
  },
  {
    id: 12,
    name: '포레스트 워크',
    image_url: '/img/12.svg',
    theme_option: { id: 202, name: '숙면' },
    accord_options: [
      { id: 304, name: '우디' },
      { id: 303, name: '아로마틱' },
    ],
  },
  {
    id: 13,
    name: '모닝 에너지',
    image_url: '/img/13.svg',
    theme_option: { id: 203, name: '기분전환' },
    accord_options: [
      { id: 302, name: '시트러스' },
      { id: 301, name: '베이스' },
    ],
  },
  {
    id: 14,
    name: '딥 릴렉스',
    image_url: '/img/14.svg',
    theme_option: { id: 204, name: '휴식' },
    accord_options: [
      { id: 303, name: '아로마틱' },
      { id: 304, name: '우디' },
    ],
  },
  {
    id: 15,
    name: '로맨틱 나이트',
    image_url: '/img/15.svg',
    theme_option: { id: 205, name: '로맨틱' },
    accord_options: [
      { id: 305, name: '플로럴' },
      { id: 306, name: '오리엔탈' },
    ],
  },
  {
    id: 16,
    name: '액티브 플로우',
    image_url: '/img/16.svg',
    theme_option: { id: 206, name: '운동' },
    accord_options: [
      { id: 302, name: '시트러스' },
      { id: 303, name: '아로마틱' },
    ],
  },
  {
    id: 17,
    name: '포커스 블렌드',
    image_url: '/img/17.svg',
    theme_option: { id: 207, name: '집중' },
    accord_options: [
      { id: 304, name: '우디' },
      { id: 302, name: '시트러스' },
    ],
  },
] as const

export const mockCombinationsPageMeta = {
  page: 1,
  size: 20,
  total_count: 7,
  total_pages: 1,
  has_next: false,
  has_prev: false,
}
