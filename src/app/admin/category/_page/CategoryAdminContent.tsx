'use client'

import React, { ReactNode, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { AdminPageHeader } from '@/app/admin/_components/AdminPageHeader'
import { AdminTabGroup } from '@/app/admin/_components/AdminTabGroup'
import type { CategoryTabId } from '../_types/AdminCategoryType'
import {
  AdminFilterBar,
  AdminListCard,
  AdminTable,
  AdminTableError,
  AdminTableLoading,
} from '../../_components'
import { CATEGORY_TABLE_HEADERS } from '@/constants/admin'
import { ErrorBoundary } from 'react-error-boundary'
import { CategoryPostModal } from '../_components/CategoryPostModal'
import { useModalStore } from '@/store/useModalStore'

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
  const router = useRouter()
  const { openModal } = useModalStore()

  const handleTabChange = (tabId: string) => {
    router.push(`/admin/category?tab=${tabId}`)
  }

  const handleCreateSuccess = () => {
    // 성공 시 데이터 리프레시
    router.refresh()
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

      <AdminFilterBar
        searchPlaceholder="카테고리명 검색"
        filterOptions={[{ label: '전체', value: 'all' }]}
      />

      <AdminTabGroup
        tabs={CATEGORY_TABS}
        activeTab={activeTab}
        onChange={handleTabChange}
      />

      <AdminTable headers={CATEGORY_TABLE_HEADERS}>
        <ErrorBoundary fallback={<AdminTableError />}>
          <Suspense key={activeTab} fallback={<AdminTableLoading />}>
            {children}
          </Suspense>
        </ErrorBoundary>
      </AdminTable>
    </AdminListCard>
  )
}
