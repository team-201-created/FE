'use client'

import React, { ReactNode, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { AdminPageHeader } from '@/app/admin/_components/AdminPageHeader'
import { AdminTabGroup } from '@/app/admin/_components/AdminTabGroup'
import type { CategoryTabId } from '../_types/AdminCategoryType'
import {
  AdminSearchBar,
  AdminListCard,
  AdminTable,
  AdminTableError,
  AdminTableLoading,
} from '../../_components'
import { CATEGORY_TABLE_HEADERS } from '@/constants/admin'
import { ErrorBoundary } from 'react-error-boundary'
import { CategoryPostModal } from '../_components/CategoryPostModal'
import { useModalStore } from '@/store/useModalStore'
import { useAdminTable } from '@/app/admin/_hooks/useAdminTable'

export const CATEGORY_TABS: { id: CategoryTabId; label: string }[] = [
  { id: 'Element', label: '단품 관리' },
  { id: 'Blend', label: '조합 관리' },
]

interface CategoryAdminContentProps {
  activeTab: CategoryTabId
  children: ReactNode
}

export default function CategoryAdminContent({
  activeTab,
  children,
}: CategoryAdminContentProps) {
  const { openModal } = useModalStore()
  const searchParams = useSearchParams()

  const { searchTerm, setSearchTerm, onFilterChange, onTabChange } =
    useAdminTable({
      searchDelay: 500,
      resetParamsOnTabChange: ['category_id'],
    })

  const handleCreateSuccess = () => {
    // TODO: 모달 띄우기
  }

  return (
    <AdminListCard>
      <AdminPageHeader
        title="카테고리 관리"
        buttonText="카테고리 등록"
        onButtonClick={() =>
          openModal(
            <CategoryPostModal
              activeTab={activeTab}
              onSuccess={handleCreateSuccess}
            />
          )
        }
      />

      <AdminSearchBar
        searchValue={searchTerm}
        searchPlaceholder="카테고리명 검색"
        onSearchChange={setSearchTerm}
      />

      <AdminTabGroup
        tabs={CATEGORY_TABS}
        activeTab={activeTab}
        onChange={onTabChange}
      />

      <AdminTable headers={CATEGORY_TABLE_HEADERS}>
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
