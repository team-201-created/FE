'use client'

import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
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

interface RecommendAdminContentProps {
  activeTab: RecommendTabId
  children: React.ReactNode
}

export default function RecommendAdminContent({
  activeTab,
  children,
}: RecommendAdminContentProps) {
  const { openModal } = useModalStore()
  const searchParams = useSearchParams()

  const { searchTerm, setSearchTerm, onFilterChange, onTabChange } =
    useAdminTable({
      searchDelay: 500,
      resetParamsOnTabChange: ['status', 'input_type'],
    })

  const activeTabLabel =
    RECOMMEND_TABS.find((t) => t.id === activeTab)?.label || ''

  const getFilterOptions = () => {
    if (activeTab === 'product-pools') {
      return [
        { label: '전체', value: 'all' },
        { label: '채택', value: 'ADOPTED' },
        { label: '미채택', value: 'UNADOPTED' },
      ]
    }
    return [
      { label: '전체', value: 'all' },
      { label: '발행', value: 'PUBLISHED' },
      { label: '미발행', value: 'UNPUBLISHED' },
    ]
  }
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
            key={`${activeTab}-${searchParams.toString()}`}
            fallback={<AdminTableLoading />}
          >
            {children}
          </Suspense>
        </ErrorBoundary>
      </AdminTable>
    </AdminListCard>
  )
}
