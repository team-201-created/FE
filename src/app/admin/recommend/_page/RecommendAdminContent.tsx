'use client'

import React, { Suspense } from 'react'
import {
  AdminListCard,
  AdminPageHeader,
  AdminTable,
  AdminTabGroup,
  AdminTableError,
  AdminTableLoading,
} from '@/app/admin/_components'
import Button from '@/components/common/Button'
import { RECOMMEND_TAB_HEADERS } from '@/constants/admin'
import { RecommendTabId, RECOMMEND_TABS } from '@/app/admin/recommend/_types'
import { RecommendPostModal } from '@/app/admin/recommend/_page'
import { AdminRecommendFilter } from '@/app/admin/recommend/_components/AdminRecommendFilter'

import { useModalStore } from '@/store/useModalStore'
import { ErrorBoundary } from 'react-error-boundary'
import { useAdminTable } from '@/app/admin/_hooks/useAdminTable'
import { cn } from '@/lib/cn'

interface RecommendAdminContentProps {
  activeTab: RecommendTabId
  children: React.ReactNode
  searchParams: { [key: string]: string | undefined }
}

export default function RecommendAdminContent({
  activeTab,
  children,
}: RecommendAdminContentProps) {
  const { openModal } = useModalStore()

  const { onFilterChange, onTabChange, resetParams, isPending, searchParams } =
    useAdminTable({
      resetParamsOnTabChange: ['status', 'input_type'],
    })

  const activeTabLabel =
    RECOMMEND_TABS.find((t) => t.id === activeTab)?.label || ''

  const handleOpenPostModal = () => {
    openModal(<RecommendPostModal activeTab={activeTab} />)
  }

  const handleOpenPipelineModal = () => {
    openModal(<RecommendPostModal activeTab="pipeline" />)
  }

  return (
    <AdminListCard className={cn(isPending && 'pointer-events-none')}>
      <AdminPageHeader
        title={`${activeTabLabel} 목록`}
        buttonText={'등록'}
        onButtonClick={handleOpenPostModal}
      />
      <AdminRecommendFilter
        activeTab={activeTab}
        statusVal={searchParams.get('status')}
        inputTypeVal={searchParams.get('input_type')}
        onFilterChange={onFilterChange}
        onReset={() => resetParams(['status', 'input_type'])}
      />
      <div className="flex items-center justify-between">
        <AdminTabGroup
          tabs={RECOMMEND_TABS}
          activeTab={activeTab}
          onChange={onTabChange}
        />
        <Button
          color="primary"
          rounded="sm"
          onClick={handleOpenPipelineModal}
          className="mb-4 shrink-0 text-sm font-semibold"
        >
          파이프라인 생성
        </Button>
      </div>
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
