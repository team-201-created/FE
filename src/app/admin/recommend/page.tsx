import { RECOMMEND_API } from './_api'
import { RecommendTabId } from './_types'
import RecommendAdminContent from './_page/RecommendAdminContent'

interface PageProps {
  searchParams: Promise<{ tab?: string }>
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

  const recommendDataPromise = RECOMMEND_API.get(activeTab)

  return (
    <RecommendAdminContent
      recommendDataPromise={recommendDataPromise}
      activeTab={activeTab}
    />
  )
}
