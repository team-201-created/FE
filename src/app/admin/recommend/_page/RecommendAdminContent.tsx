'use client'

import React, { Suspense } from 'react'
import {
  AdminListCard,
  AdminPageHeader,
  AdminTable,
  AdminSearchBar,
  AdminTabGroup,
  AdminTableError,
  AdminTableLoading,
} from '@/app/admin/_components'
import { RECOMMEND_TAB_HEADERS } from '@/constants/admin'
import { RecommendTabId, RECOMMEND_TABS } from '@/app/admin/recommend/_types'
import { RecommendPostModal } from '@/app/admin/recommend/_page'

import { useModalStore } from '@/store/useModalStore'
import { ErrorBoundary } from 'react-error-boundary'
import { useAdminTable } from '@/app/admin/_hooks/useAdminTable'
import { cn } from '@/lib/cn'
import {
  ADOPTION_STATUS_OPTIONS,
  PUBLISH_STATUS_OPTIONS,
} from '@/app/admin/_constants/labels'

interface RecommendAdminContentProps {
  activeTab: RecommendTabId
  children: React.ReactNode
  searchParams: { [key: string]: string | undefined }
}

export default function RecommendAdminContent({
  activeTab,
  children,
  searchParams,
}: RecommendAdminContentProps) {
  const { openModal } = useModalStore()

  const { searchTerm, setSearchTerm, onFilterChange, onTabChange, isPending } =
    useAdminTable({
      resetParamsOnTabChange: ['status', 'input_type'],
    })

  const activeTabLabel =
    RECOMMEND_TABS.find((t) => t.id === activeTab)?.label || ''

  const getFilterOptions = () => {
    return activeTab === 'product-pools'
      ? ADOPTION_STATUS_OPTIONS
      : PUBLISH_STATUS_OPTIONS
  }
  const handleOpenPostModal = () => {
    openModal(<RecommendPostModal activeTab={activeTab} />)
  }

  return (
    <AdminListCard className={cn(isPending && 'pointer-events-none')}>
      <AdminPageHeader
        title={`${activeTabLabel} 목록`}
        buttonText={'등록'}
        onButtonClick={handleOpenPostModal}
      />
      <AdminSearchBar
        searchValue={searchTerm}
        searchPlaceholder={`${activeTabLabel} 검색`}
        filterOptions={getFilterOptions()}
        onSearchChange={setSearchTerm}
        onFilterChange={(val) => onFilterChange('status', val)}
      />
      <AdminTabGroup
        tabs={RECOMMEND_TABS}
        activeTab={activeTab}
        onChange={onTabChange}
      />
      <AdminTable headers={RECOMMEND_TAB_HEADERS[activeTab]}>
        <ErrorBoundary fallback={<AdminTableError />}>
          <Suspense
            key={`${activeTab}-${JSON.stringify(searchParams)}`}
            fallback={<AdminTableLoading />}
          >
            {children}
          </Suspense>
        </ErrorBoundary>
      </AdminTable>
    </AdminListCard>
  )
}
