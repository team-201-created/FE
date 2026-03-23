'use client'

import React, { ReactNode, Suspense } from 'react'
import type {
  AdminCategoryListResponse,
  RootCategory,
} from '@/app/admin/category/_types/AdminCategoryType'
import {
  AdminPageHeader,
  AdminTabGroup,
  AdminSearchBar,
  AdminListCard,
  AdminTable,
  AdminTableError,
  AdminTableLoading,
} from '@/app/admin/_components'
import { CATEGORY_TABLE_HEADERS } from '@/constants/admin'
import { ErrorBoundary } from 'react-error-boundary'
import { CategoryPostModal } from '@/app/admin/category/_components/CategoryPostModal'
import { useModalStore } from '@/store/useModalStore'
import { useAdminTable } from '@/app/admin/_hooks/useAdminTable'
import { cn } from '@/lib/cn'

export const CATEGORY_TABS: { id: RootCategory; label: string }[] = [
  { id: 'element', label: '단품 관리' },
  { id: 'blend', label: '조합 관리' },
]

interface CategoryAdminContentProps {
  rootCategory: RootCategory
  categoryResponsePromise: Promise<AdminCategoryListResponse>
  children: ReactNode
  searchParams: { [key: string]: string | undefined }
}

export default function CategoryAdminContent({
  rootCategory,
  categoryResponsePromise,
  children,
  searchParams,
}: CategoryAdminContentProps) {
  const { openModal } = useModalStore()

  const { searchTerm, setSearchTerm, onTabChange, isPending } = useAdminTable({
    resetParamsOnTabChange: ['category_id'],
  })

  return (
    <AdminListCard className={cn(isPending && 'pointer-events-none')}>
      <AdminPageHeader
        title="카테고리 관리"
        buttonText="카테고리 등록"
        onButtonClick={() =>
          openModal(
            // Promise가 미해결인 채로 모달이 열릴 경우를 대비한 Suspense
            <Suspense fallback={null}>
              <CategoryPostModal
                rootCategory={rootCategory}
                categoryResponsePromise={categoryResponsePromise}
              />
            </Suspense>
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
        activeTab={rootCategory}
        onChange={onTabChange}
      />

      <AdminTable headers={CATEGORY_TABLE_HEADERS}>
        <ErrorBoundary fallback={<AdminTableError />}>
          <Suspense
            key={`${rootCategory}-${JSON.stringify(searchParams)}`}
            fallback={<AdminTableLoading />}
          >
            {children}
          </Suspense>
        </ErrorBoundary>
      </AdminTable>
    </AdminListCard>
  )
}
