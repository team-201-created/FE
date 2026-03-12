/** 조합 향기 목록: 서버에서 목록 조회 후 클라이언트에 전달 */
import { SkeletonDelay } from '@/components/products/ScentListSkeleton'
import { fetchBlends } from '../_api/productsClient'
import { ComboPageClient } from './ComboPageClient'

/** 빌드 시 프리렌더 스킵 — 배포 환경에서 fetch 실패(ECONNREFUSED) 방지 */
export const dynamic = 'force-dynamic'

export default async function ProductsComboPage() {
  const { data } = await fetchBlends({ page: 1, size: 100 })
  return (
    <SkeletonDelay>
      <ComboPageClient initialItems={data.results} />
    </SkeletonDelay>
  )
}
