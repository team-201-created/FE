'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  AdminListCard,
  AdminPageHeader,
  AdminTable,
  AdminFilterBar,
  AdminTabGroup,
} from '@/app/admin/_components'
import { RECOMMEND_TAB_HEADERS } from '@/constants/admin'
import {
  RecommendTabId,
  RecommendListItem,
  RecommendTabProps,
  RECOMMEND_TABS,
} from '@/app/admin/recommend/_types'
import {
  BlendMapsTab,
  ProductPoolsTab,
  ProductMapsTab,
  RecommendPostModal,
} from '@/app/admin/recommend/_page'

const TAB_COMPONENTS: Record<
  RecommendTabId,
  React.ComponentType<RecommendTabProps<any>>
> = {
  'blend-maps': BlendMapsTab,
  'product-pools': ProductPoolsTab,
  'product-maps': ProductMapsTab,
}

interface RecommendAdminContentProps {
  recommendData: RecommendListItem[]
  activeTab: RecommendTabId
}

export default function RecommendAdminContent({
  recommendData,
  activeTab,
}: RecommendAdminContentProps) {
  const router = useRouter()
  const [isPostModalOpen, setIsPostModalOpen] = useState(false)

  const activeTabLabel =
    RECOMMEND_TABS.find((t) => t.id === activeTab)?.label || ''

  const handleTabChange = (tabId: string) => {
    router.push(`/admin/recommend?tab=${tabId}`, { scroll: false })
  }

  const handleTogglePublish = async (dataId: number) => {
    if (!dataId) return

    // TODO: 실제 상태 변경 API 호출 (Patch 등)
    // 성공 시:
    router.refresh()
  }

  const ActiveTabContent = TAB_COMPONENTS[activeTab]

  return (
    <>
      <AdminListCard>
        <AdminPageHeader
          title={`${activeTabLabel} 목록`}
          buttonText={'등록'}
          onButtonClick={() => setIsPostModalOpen(true)}
        />
        <AdminFilterBar
          searchPlaceholder="검색"
          filterOptions={[{ label: '전체', value: 'all' }]}
        />
        <AdminTabGroup
          tabs={RECOMMEND_TABS}
          activeTab={activeTab}
          onChange={handleTabChange}
        />
        <AdminTable headers={RECOMMEND_TAB_HEADERS[activeTab]}>
          {ActiveTabContent && (
            <ActiveTabContent
              data={recommendData}
              onTogglePublish={handleTogglePublish}
            />
          )}
        </AdminTable>
      </AdminListCard>

      <RecommendPostModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        activeTab={activeTab}
      />
    </>
  )
}
