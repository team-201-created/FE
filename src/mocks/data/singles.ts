/**
 * 단품 목록 목 데이터 (API 명세: GET /api/v1/scents/singles)
 * 참고: 단품 이름·향조 목록
 */
/** 단품 이미지: public/img/1.svg ~ 20.svg */
export const mockSinglesItems = [
  {
    id: 1,
    name: '리차징',
    image_url: '/img/1.svg',
    accord_option: { id: 301, name: '베이스' },
  },
  {
    id: 2,
    name: '차밍',
    image_url: '/img/2.svg',
    accord_option: { id: 301, name: '베이스' },
  },
  {
    id: 3,
    name: '리프레싱',
    image_url: '/img/3.svg',
    accord_option: { id: 301, name: '베이스' },
  },
  {
    id: 4,
    name: '밸런싱',
    image_url: '/img/4.svg',
    accord_option: { id: 301, name: '베이스' },
  },
  {
    id: 5,
    name: '릴랙싱',
    image_url: '/img/5.svg',
    accord_option: { id: 301, name: '베이스' },
  },
  {
    id: 6,
    name: '베르가못',
    image_url: '/img/6.svg',
    accord_option: { id: 302, name: '시트러스' },
  },
  {
    id: 7,
    name: '자몽',
    image_url: '/img/7.svg',
    accord_option: { id: 302, name: '시트러스' },
  },
  {
    id: 8,
    name: '유자',
    image_url: '/img/8.svg',
    accord_option: { id: 302, name: '시트러스' },
  },
  {
    id: 9,
    name: '라벤더',
    image_url: '/img/9.svg',
    accord_option: { id: 303, name: '아로마틱' },
  },
  {
    id: 10,
    name: '로즈마리',
    image_url: '/img/10.svg',
    accord_option: { id: 303, name: '아로마틱' },
  },
  {
    id: 11,
    name: '버베나',
    image_url: '/img/11.svg',
    accord_option: { id: 303, name: '아로마틱' },
  },
  {
    id: 12,
    name: '샌달우드',
    image_url: '/img/12.svg',
    accord_option: { id: 304, name: '우디' },
  },
  {
    id: 13,
    name: '파인',
    image_url: '/img/13.svg',
    accord_option: { id: 304, name: '우디' },
  },
  {
    id: 14,
    name: '네롤리',
    image_url: '/img/14.svg',
    accord_option: { id: 305, name: '플로럴' },
  },
  {
    id: 15,
    name: '로즈',
    image_url: '/img/15.svg',
    accord_option: { id: 305, name: '플로럴' },
  },
  {
    id: 16,
    name: '라일락',
    image_url: '/img/16.svg',
    accord_option: { id: 305, name: '플로럴' },
  },
  {
    id: 17,
    name: '인센스',
    image_url: '/img/17.svg',
    accord_option: { id: 306, name: '오리엔탈' },
  },
  {
    id: 18,
    name: '베티버',
    image_url: '/img/18.svg',
    accord_option: { id: 306, name: '오리엔탈' },
  },
  {
    id: 19,
    name: '앰버',
    image_url: '/img/19.svg',
    accord_option: { id: 307, name: '애니멀릭' },
  },
  {
    id: 20,
    name: '머스크',
    image_url: '/img/20.svg',
    accord_option: { id: 307, name: '애니멀릭' },
  },
] as const

export const mockSinglesPageMeta = {
  page: 1,
  size: 20,
  total_count: 20,
  total_pages: 1,
  has_next: false,
  has_prev: false,
}
