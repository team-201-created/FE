/**
 * 관리자 대시보드에서 사용하는 상수 및 모의 데이터 타입 정의
 */
export interface AdminTableHeader {
  label: string
}

export interface TestData {
  id: number
  name: string
  type: string
  status: string
  participants: string
  createdAt: string
  updatedAt: string
}

export interface ProductData {
  id: number
  name: string
  category: string
  type: string
}

export interface CategoryData {
  id: number
  name: string
}

export interface RecommendData {
  id: number
  productCount: string
  status: '노출' | '비노출'
  createdAt: string
  updatedAt: string
}

export const TEST_TABLE_HEADERS: AdminTableHeader[] = [
  { label: '테스트명' },
  { label: '유형' },
  { label: '노출 상태' },
  { label: '참여자 수' },
  { label: '생성일' },
  { label: '수정일' },
  { label: '작업' },
]

export const PRODUCT_TABLE_HEADERS: AdminTableHeader[] = [
  { label: '상품명' },
  { label: '카테고리' },
  { label: '' },
  { label: '종류' },
  { label: '' },
  { label: '' },
  { label: '작업' },
]

export const CATEGORY_TABLE_HEADERS: AdminTableHeader[] = [
  { label: '카테고리명' },
  { label: '' },
  { label: '' },
  { label: '' },
  { label: '' },
  { label: '생성 일시' },
  { label: '작업' },
]

export const BLEND_MAPS_HEADERS: AdminTableHeader[] = [
  { label: 'ID' },
  { label: '입력 유형' },
  { label: '노출 상태' },
  { label: '' },
  { label: '생성일시' },
  { label: '수정일시' },
  { label: '작업' },
]

export const PRODUCT_POOLS_HEADERS: AdminTableHeader[] = [
  { label: '제품 개수' },
  { label: '제품 유형' },
  { label: '채택 상태' },
  { label: '' },
  { label: '생성일시' },
  { label: '수정일시' },
  { label: '작업' },
]

export const PRODUCT_MAPS_HEADERS: AdminTableHeader[] = [
  { label: 'ID' },
  { label: '' },
  { label: '노출 상태' },
  { label: '' },
  { label: '생성일시' },
  { label: '수정일시' },
  { label: '작업' },
]

export const RECOMMEND_TAB_HEADERS: Record<string, AdminTableHeader[]> = {
  'blend-maps': BLEND_MAPS_HEADERS,
  'product-pools': PRODUCT_POOLS_HEADERS,
  'product-maps': PRODUCT_MAPS_HEADERS,
}

export const TEST_MOCK_DATA: TestData[] = [
  {
    id: 1,
    name: '나에게 맞는 향기 찾기',
    type: '취향',
    status: '노출',
    participants: '1,247명',
    createdAt: '2024-02-01',
    updatedAt: '2024-02-15',
  },
  {
    id: 2,
    name: '웰니스 향기 테스트',
    type: '건강',
    status: '비노출',
    participants: '892명',
    createdAt: '2024-01-20',
    updatedAt: '2024-02-10',
  },
  {
    id: 3,
    name: '수면 개선 아로마',
    type: '건강',
    status: '노출',
    participants: '1,567명',
    createdAt: '2024-01-28',
    updatedAt: '2024-02-14',
  },
]

export const PRODUCT_MOCK_DATA: ProductData[] = [
  { id: 1, name: '시그니처 우디 향수', category: 'woody', type: '단품' },
  { id: 2, name: '플로럴 믹스 패키지', category: 'floral', type: '조합' },
]

export const CATEGORY_MOCK_DATA: CategoryData[] = [
  { id: 1, name: 'Single (단품)' },
  { id: 2, name: 'Combo (조합)' },
  { id: 3, name: 'Special Edition' },
]

export const RECOMMEND_MOCK_DATA: RecommendData[] = [
  {
    id: 1,
    productCount: '50개',
    status: '노출',
    createdAt: '2024-02-20',
    updatedAt: '2024-02-20',
  },
  {
    id: 2,
    productCount: '35개',
    status: '비노출',
    createdAt: '2024-02-18',
    updatedAt: '2024-02-18',
  },
]
