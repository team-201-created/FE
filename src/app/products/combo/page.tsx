import type { Metadata } from 'next'
import { FetchError } from '@/lib/api'

export const metadata: Metadata = {
  title: '조합 향기',
  description:
    '여러 향기를 조합한 블렌드 제품을 탐색하세요. AI 추천과 향조 필터로 나만의 완벽한 향기 조합을 찾아드립니다.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/products/combo`,
  },
}
import { SkeletonDelay } from '@/components/products/ScentListSkeleton'
import {
  enrichBlendListItemsWithContainedElements,
  fetchBlends,
} from '../_api/productsClient'
import { ProductsListError } from '../_components/ProductsListError'
import { ComboPageClient } from './ComboPageClient'

/** 빌드 시 프리렌더 스킵 — 배포 환경에서 fetch 실패(ECONNREFUSED) 방지 */
export const dynamic = 'force-dynamic'

export default async function ProductsComboPage() {
  let data: Awaited<ReturnType<typeof fetchBlends>>['data'] | null = null
  let errorMessage: string | null = null

  try {
    const res = await fetchBlends({ page: 1, size: 100 })
    const results = await enrichBlendListItemsWithContainedElements(
      res.data.results
    )
    data = { ...res.data, results }
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
