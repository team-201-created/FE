/**
 * 헤더 네비게이션 링크 데이터
 * Header 컴포넌트에서 import 해서 사용합니다.
 */
export const headerNavLinks = {
  perfume: [
    { label: '단품 상품 리스트', href: '/products/single' },
    { label: '조합 상품 리스트', href: '/products/combo' },
  ],
  findMyScent: [
    { title: '취향 추천 테스트', subtitle: '취향 정보 기반 향기 추천', href: '/find-my-scent/taste-test' },
    { title: '웰니스 케어 진단', subtitle: '건강 정보 기반 아로마 테라피', href: '/find-my-scent/wellness' },
    { title: 'AI 비주얼 분석', subtitle: '사진 기반 향기 추천', href: '/find-my-scent/ai-visual' },
  ],
  profile: [
    { label: '내 정보 수정', href: '/profile', icon: 'pencil' },
    { label: '향기 저장소', href: '/profile/storage', icon: 'heart' },
    { label: '관리자 페이지', href: '/admin', icon: 'gear' },
    { label: '로그아웃', href: '/login', icon: 'logout' },
  ],
} as const
