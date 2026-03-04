/**
 * 조합 상세 목 데이터 (API 명세: GET /api/v1/scents/blends/{blend_id})
 * Success Response 형식에 맞춤
 */
export const mockBlendDetails = [
  {
    id: 11,
    name: '하트 시그널',
    image_url: '/img/11.svg',
    description: '포근한 무드를 위한 한줄 설명',
    theme_option: { id: 201, name: '포근' },
    accord_options: [
      { id: 304, name: '우디' },
      { id: 307, name: '머스크' },
    ],
    product_link: 'https://www.naver.com',
  },
  {
    id: 12,
    name: '포레스트 워크',
    image_url: '/img/12.svg',
    description: '숙면 무드를 위한 한줄 설명',
    theme_option: { id: 202, name: '숙면' },
    accord_options: [
      { id: 304, name: '우디' },
      { id: 303, name: '아로마틱' },
    ],
    product_link: 'https://www.naver.com',
  },
  {
    id: 13,
    name: '모닝 에너지',
    image_url: '/img/13.svg',
    description: '기분전환 무드를 위한 한줄 설명',
    theme_option: { id: 203, name: '기분전환' },
    accord_options: [
      { id: 302, name: '시트러스' },
      { id: 301, name: '베이스' },
    ],
    product_link: 'https://www.naver.com',
  },
  {
    id: 14,
    name: '딥 릴렉스',
    image_url: '/img/14.svg',
    description: '휴식 무드를 위한 한줄 설명',
    theme_option: { id: 204, name: '휴식' },
    accord_options: [
      { id: 303, name: '아로마틱' },
      { id: 304, name: '우디' },
    ],
    product_link: 'https://www.naver.com',
  },
  {
    id: 15,
    name: '로맨틱 나이트',
    image_url: '/img/15.svg',
    description: '로맨틱 무드를 위한 한줄 설명',
    theme_option: { id: 205, name: '로맨틱' },
    accord_options: [
      { id: 305, name: '플로럴' },
      { id: 306, name: '오리엔탈' },
    ],
    product_link: 'https://www.naver.com',
  },
  {
    id: 16,
    name: '액티브 플로우',
    image_url: '/img/16.svg',
    description: '운동 무드를 위한 한줄 설명',
    theme_option: { id: 206, name: '운동' },
    accord_options: [
      { id: 302, name: '시트러스' },
      { id: 303, name: '아로마틱' },
    ],
    product_link: 'https://www.naver.com',
  },
  {
    id: 17,
    name: '포커스 블렌드',
    image_url: '/img/17.svg',
    description: '집중 무드를 위한 한줄 설명',
    theme_option: { id: 207, name: '집중' },
    accord_options: [
      { id: 304, name: '우디' },
      { id: 302, name: '시트러스' },
    ],
    product_link: 'https://www.naver.com',
  },
] as const
