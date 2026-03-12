import React from 'react'
import { RECOMMEND_API } from '../_api'
import { RecommendTabId } from '../_types'
import { BlendMapsTab, ProductPoolsTab, ProductMapsTab } from '../_page'
import { AdminTableEmpty } from '@/app/admin/_components'

const MAP_COMPONENTS: Record<RecommendTabId, React.ComponentType<any>> = {
  'blend-maps': BlendMapsTab,
  'product-pools': ProductPoolsTab,
  'product-maps': ProductMapsTab,
}

interface RecommendTableServerProps {
  activeTab: RecommendTabId
  searchParams: {
    page?: string
    size?: string
    q?: string
    status?: string
    input_type?: string
    sort?: string
  }
}

export async function RecommendTableServer({
  activeTab,
  searchParams,
}: RecommendTableServerProps) {
  // Option 없이 전체 데이터를 가져옵니다 (Next.js 캐싱 활용)
  const response = await RECOMMEND_API.get(activeTab)

  const allData = response?.success ? response.data.content : []

  // 받아온 데이터를 기반으로 직접 필터링
  const recommendData = allData.filter((item: any) => {
    const q = searchParams.q?.toLowerCase()
    const matchesSearch = q ? item.id.toString().includes(q) : true

    // URL에서 온 'status' 파라미터를 사용함
    const queryStatus = searchParams.status

    // Product Pools는 adoption_status를 사용하고 나머지는 publish_status를 사용함
    const itemStatus =
      activeTab === 'product-pools' ? item.adoption_status : item.publish_status

    const matchesStatus = queryStatus ? itemStatus === queryStatus : true

    return matchesSearch && matchesStatus
  })
  const ActiveTabContent = MAP_COMPONENTS[activeTab]

  if (!recommendData.length) {
    return <AdminTableEmpty />
  }

  return <ActiveTabContent data={recommendData} />
}
