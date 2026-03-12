/** 단품 향기 목록: 서버에서 목록 조회 후 클라이언트에 전달 */
import { SkeletonDelay } from '@/components/products/ScentListSkeleton'
import { fetchElements } from '../_api/productsClient'
import { SinglePageClient } from './SinglePageClient'

/** 빌드 시 프리렌더 스킵 — 배포 환경에서 fetch 실패(ECONNREFUSED) 방지 */
export const dynamic = 'force-dynamic'

export default async function ProductsSinglePage() {
  const { data } = await fetchElements({ page: 1, size: 100 })
  return (
    <SkeletonDelay>
      <SinglePageClient initialItems={data.results} />
    </SkeletonDelay>
  )
}
