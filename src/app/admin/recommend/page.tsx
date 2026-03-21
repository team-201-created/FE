import { Suspense } from 'react'
import type { Metadata } from 'next'
import RecommendAdminContent from './_page/RecommendAdminContent'
import { RecommendTableServer } from './_components/RecommendTableServer'
import { RecommendTabId } from './_types'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '어드민 추천 관리',
}

interface RecommendAdminPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>
}

const VALID_TABS: RecommendTabId[] = [
  'blend-maps',
  'product-pools',
  'product-maps',
]

export default async function RecommendAdminPage({
  searchParams,
}: RecommendAdminPageProps) {
  const params = await searchParams
  const tabParam = params?.tab
  const isValidTab =
    !tabParam || VALID_TABS.includes(tabParam as RecommendTabId)

  if (!isValidTab) {
    notFound()
  }

  const activeTab: RecommendTabId = (tabParam as RecommendTabId) || 'blend-maps'

  return (
    <Suspense fallback={null}>
      <RecommendAdminContent activeTab={activeTab} searchParams={params}>
        <RecommendTableServer activeTab={activeTab} searchParams={params} />
      </RecommendAdminContent>
    </Suspense>
  )
}
