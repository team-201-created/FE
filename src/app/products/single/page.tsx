import type { Metadata } from 'next'
import { FetchError } from '@/lib/api'

export const metadata: Metadata = {
  title: '단품 향기',
  description:
    '취향에 맞는 단품 향기 제품을 한번에 찾아보세요. 향조 필터로 나만의 시그니처 향을 탐색할 수 있습니다.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/products/single`,
  },
}
import { SkeletonDelay } from '@/components/products/ScentListSkeleton'
import { fetchElements } from '../_api/productsClient'
import { ProductsListError } from '../_components/ProductsListError'
import { SinglePageClient } from './SinglePageClient'

/** 빌드 시 프리렌더 스킵 — 배포 환경에서 fetch 실패(ECONNREFUSED) 방지 */
export const dynamic = 'force-dynamic'

export default async function ProductsSinglePage() {
  let data: Awaited<ReturnType<typeof fetchElements>>['data'] | null = null
  let errorMessage: string | null = null

  try {
    const res = await fetchElements({ page: 1, size: 100 })
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
      <SinglePageClient initialItems={data.results} />
    </SkeletonDelay>
  )
}
