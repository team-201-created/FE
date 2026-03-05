'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  AdminListCard,
  AdminPageHeader,
  AdminTable,
  AdminFilterBar,
  AdminTabGroup,
} from '@/app/admin/_components'
import { RECOMMEND_TABLE_HEADERS } from '@/constants/admin'
import { useRecommendList } from './_hooks'
import {
  ScentMapItemResponse,
  ProductMapItemResponse,
} from '@/app/admin/recommend/_types'
import { ScentMapTab, ProductMapTab } from '@/app/admin/recommend/_page'

const RECOMMEND_TABS = [
  { id: 'SCENT_MAP', label: '향조합 추천맵' },
  { id: 'PRODUCT_MAP', label: '제품 후보군' },
  { id: 'PRODUCT_CANDIDATES', label: '제품 추천맵' },
]

export default function RecommendAdminPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeTab = searchParams.get('tab') || 'SCENT_MAP'

  const { data, handleTogglePublish, getRecommendList } = useRecommendList()

  const activeTabLabel =
    RECOMMEND_TABS.find((t) => t.id === activeTab)?.label || ''

  useEffect(() => {
    getRecommendList(activeTab)
  }, [getRecommendList, activeTab])

  const handleTabChange = (tabId: string) => {
    router.push(`/admin/recommend?tab=${tabId}`, { scroll: false })
  }

  return (
    <AdminListCard>
      <AdminPageHeader title={`${activeTabLabel} 목록`} buttonText={'등록'} />
      <AdminFilterBar
        searchPlaceholder="검색"
        filterOptions={[{ label: '전체', value: 'all' }]}
      />
      <AdminTabGroup
        tabs={RECOMMEND_TABS}
        activeTab={activeTab}
        onChange={handleTabChange}
      />
      <AdminTable headers={RECOMMEND_TABLE_HEADERS}>
        {activeTab === 'SCENT_MAP' && (
          <ScentMapTab
            data={data as ScentMapItemResponse[]}
            onTogglePublish={(id: number) => handleTogglePublish(id, activeTab)}
          />
        )}
        {activeTab === 'PRODUCT_MAP' && (
          <ProductMapTab
            data={data as ProductMapItemResponse[]}
            onTogglePublish={(id: number) => handleTogglePublish(id, activeTab)}
          />
        )}
      </AdminTable>
    </AdminListCard>
  )
}
