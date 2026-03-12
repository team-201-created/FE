import { Suspense } from 'react'
import type { Metadata } from 'next'
import RecommendAdminContent from './_page/RecommendAdminContent'
import { RecommendTableServer } from './_components/RecommendTableServer'
import { RecommendTabId } from './_types'
import { AdminTableLoading } from '../_components'

export const metadata: Metadata = {
  title: '어드민 추천 관리',
}

interface PageProps {
  searchParams: Promise<{
    tab?: string
    page?: string
    size?: string
    q?: string
    publish_status?: string
    input_type?: string
    sort?: string
  }>
}

const VALID_TABS: RecommendTabId[] = [
  'blend-maps',
  'product-pools',
  'product-maps',
]

export default async function RecommendAdminPage({ searchParams }: PageProps) {
  const params = await searchParams
  const rawTab = params.tab as string

  // 유효한 탭인지 검사하고 아니면 기본값으로 고정
  const activeTab = VALID_TABS.includes(rawTab as RecommendTabId)
    ? (rawTab as RecommendTabId)
    : 'blend-maps'

  return (
    <Suspense fallback={<AdminTableLoading />}>
      <RecommendAdminContent activeTab={activeTab}>
        <RecommendTableServer activeTab={activeTab} searchParams={params} />
      </RecommendAdminContent>
    </Suspense>
  )
}
