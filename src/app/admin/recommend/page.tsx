import { Suspense } from 'react'
import { RECOMMEND_API } from './_api'
import { RecommendTabId, RecommendListItem } from './_types'
import RecommendAdminContent from './_page/RecommendAdminContent'

interface PageProps {
  searchParams: Promise<{ tab?: string }>
}

async function getRecommendData(
  activeTab: RecommendTabId
): Promise<RecommendListItem[]> {
  try {
    const response = await RECOMMEND_API.get(activeTab)
    return response?.success ? response.data.content : []
  } catch (error) {
    console.error('데이터 불러오기 실패', error)
    return []
  }
}

export default async function RecommendAdminPage({ searchParams }: PageProps) {
  const params = await searchParams

  // 넘겨줄 데이터 먼저 받아오기
  const activeTab = (params.tab as RecommendTabId) || 'blend-maps'
  const recommendData = await getRecommendData(activeTab)

  // TODO: fallback UI 처리해주기
  return (
    <Suspense fallback={<div>목록 조회 중... </div>}>
      <RecommendAdminContent
        recommendData={recommendData}
        activeTab={activeTab}
      />
    </Suspense>
  )
}
