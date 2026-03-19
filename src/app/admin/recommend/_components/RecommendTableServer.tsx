import React from 'react'
import { RECOMMEND_API } from '../_api'
import { RecommendTabId } from '../_types'
import { BlendMapsTab, ProductPoolsTab, ProductMapsTab } from '../_page'
import { AdminTableEmpty, AdminPagination } from '@/app/admin/_components'

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
  const currentPage = Math.max(1, Number(searchParams.page) || 1)
  const pageSize = 10

  const options = {
    page: currentPage,
    size: pageSize,
    ...(activeTab === 'product-pools'
      ? { adoption_status: searchParams.status }
      : { publish_status: searchParams.status }),
    input_type: searchParams.input_type,
  }

  const response = await RECOMMEND_API.get(activeTab, options as any)

  const responseData = response?.success ? response.data.results : []
  const totalPages = response?.data?.total_pages ?? 1

  const q = searchParams.q?.toLowerCase()
  const recommendData = q
    ? responseData.filter((item: any) => String(item.id).includes(q))
    : responseData

  const ActiveTabContent = MAP_COMPONENTS[activeTab]

  if (!recommendData.length && currentPage === 1) {
    return <AdminTableEmpty />
  }

  return (
    <>
      <ActiveTabContent data={recommendData} />
      <AdminPagination currentPage={currentPage} totalPages={totalPages} />
    </>
  )
}
