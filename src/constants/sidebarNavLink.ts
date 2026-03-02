// 관리자 사이드바 네비게이션 데이터

export const ADMIN_SIDEBAR_NAV_LINKS = [
  { label: '상품 관리', href: '/admin/product', iconType: 'product' },
  { label: '카테고리 관리', href: '/admin/category', iconType: 'category' },
  { label: '테스트 관리', href: '/admin/test', iconType: 'test' },
  { label: '추천 관리', href: '/admin/recommend', iconType: 'recommend' },
] as const
