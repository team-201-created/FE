/** 조합 향기 목록: 서버에서 목록 조회 후 클라이언트에 전달 */
import { FetchError } from '@/lib/api'
import { SkeletonDelay } from '@/components/products/ScentListSkeleton'
import { fetchBlends } from '../_api/productsClient'
import { ProductsListError } from '../_components/ProductsListError'
import { ComboPageClient } from './ComboPageClient'

/** 빌드 시 프리렌더 스킵 — 배포 환경에서 fetch 실패(ECONNREFUSED) 방지 */
export const dynamic = 'force-dynamic'

export default async function ProductsComboPage() {
  let data: Awaited<ReturnType<typeof fetchBlends>>['data'] | null = null
  let errorMessage: string | null = null

  try {
    const res = await fetchBlends({ page: 1, size: 100 })
    data = res.data
  } catch (e) {
    errorMessage =
      e instanceof FetchError ? e.message : '목록을 불러올 수 없습니다.'
  }

  if (errorMessage) {
    return <ProductsListError message={errorMessage} />
  }
  if (!data) {
    return <ProductsListError message="목록을 불러올 수 없습니다." />
  }
  return (
    <SkeletonDelay>
      <ComboPageClient initialItems={data.results} />
    </SkeletonDelay>
  )
}
