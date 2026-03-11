'use client'

import { use, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import {
  AdminListCard,
  AdminPageHeader,
  AdminTable,
  AdminFilterBar,
  AdminTabGroup,
  AdminTableError,
  AdminTableLoading,
  AdminTableEmpty,
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
import { useModalStore } from '@/store/useModalStore'
import { ErrorBoundary } from 'react-error-boundary'

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

  const { openModal, openAlert } = useModalStore()

  const handleOpenPostModal = () => {
    openModal(<RecommendPostModal activeTab={activeTab} />)
  }

  return (
    <AdminListCard>
      <AdminPageHeader
        title={`${activeTabLabel} 목록`}
        buttonText={'등록'}
        onButtonClick={handleOpenPostModal}
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
        <ErrorBoundary fallback={<AdminTableError />}>
          <Suspense key={activeTab} fallback={<AdminTableLoading />}>
            <TableBodyWrapper
              recommendDataPromise={recommendDataPromise}
              activeTab={activeTab}
              onTogglePublish={handleTogglePublish}
            />
          </Suspense>
        </ErrorBoundary>
      </AdminTable>
    </AdminListCard>
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

  if (!recommendData.length) {
    return <AdminTableEmpty />
  }

  return (
    <ActiveTabContent data={recommendData} onTogglePublish={onTogglePublish} />
  )
}
