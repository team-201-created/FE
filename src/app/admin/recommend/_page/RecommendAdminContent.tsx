'use client'

import { useState, use, Suspense } from 'react'
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
  RecommendTabProps,
  RECOMMEND_TABS,
  RecommendListItem,
  RecommendApiResponse,
} from '@/app/admin/recommend/_types'
import {
  BlendMapsTab,
  ProductPoolsTab,
  ProductMapsTab,
  RecommendPostModal,
} from '@/app/admin/recommend/_page'

import { updateRecommendList } from '@/app/admin/recommend/_actions/recommendActions'

const TAB_COMPONENTS: Record<
  RecommendTabId,
  React.ComponentType<RecommendTabProps<any>>
> = {
  'blend-maps': BlendMapsTab,
  'product-pools': ProductPoolsTab,
  'product-maps': ProductMapsTab,
}

interface RecommendAdminContentProps {
  recommendDataPromise: Promise<RecommendApiResponse<RecommendListItem>>
  activeTab: RecommendTabId
}

export default function RecommendAdminContent({
  recommendDataPromise,
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
    await updateRecommendList({ tabId: activeTab })
  }

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
          <Suspense
            key={activeTab}
            fallback={
              <h1 className="py-20 text-center text-gray-400">
                데이터 불러오는 중...
              </h1>
            }
          >
            <TableBodyWrapper
              recommendDataPromise={recommendDataPromise}
              activeTab={activeTab}
              onTogglePublish={handleTogglePublish}
            />
          </Suspense>
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

function TableBodyWrapper({
  recommendDataPromise,
  activeTab,
  onTogglePublish,
}: {
  recommendDataPromise: Promise<RecommendApiResponse<RecommendListItem>>
  activeTab: RecommendTabId
  onTogglePublish: (id: number) => void
}) {
  const response = use(recommendDataPromise)
  const recommendData = response?.success ? response.data.content : []
  const ActiveTabContent = TAB_COMPONENTS[activeTab]

  return (
    <ActiveTabContent data={recommendData} onTogglePublish={onTogglePublish} />
  )
}
