'use client'

import { Suspense } from 'react'
import { cn } from '@/lib/cn'
import {
  AdminListCard,
  AdminPageHeader,
  AdminSearchBar,
  AdminTable,
  AdminTabGroup,
  AdminTableError,
  AdminTableLoading,
} from '@/app/admin/_components'
import type { ProductTabId } from '@/app/admin/product/_types/AdminProductType'
import { PRODUCT_TABLE_HEADERS } from '@/constants/admin'
import { ProductPostModal } from '@/app/admin/product/_page/ProductPostModal'
import { ErrorBoundary } from 'react-error-boundary'
import { useModalStore } from '@/store/useModalStore'
import { fetchAdminProductList } from '@/app/admin/product/_api/adminFetchProductList'
import {
  fetchElementCategoriesAction,
  fetchBlendCategoriesAction,
} from '@/app/admin/product/_lib/productActions'
import type { AdminCategoryListResponse } from '@/app/admin/category/_types/AdminCategoryType'
import { useAdminTable } from '@/app/admin/_hooks/useAdminTable'

const PRODUCT_TABS: { id: ProductTabId; label: string }[] = [
  { id: 'ELEMENT', label: '단품' },
  { id: 'BLEND', label: '조합' },
]

type ProductAdminContentProps = {
  activeTab: ProductTabId
  children: React.ReactNode
  searchParams: { [key: string]: string | undefined }
}

export default function ProductAdminContent({
  activeTab,
  children,
  searchParams,
}: ProductAdminContentProps) {
  const { openModal } = useModalStore()

  const { searchTerm, setSearchTerm, onFilterChange, onTabChange, isPending } =
    useAdminTable({
      resetParamsOnTabChange: ['scent_category_id'],
    })

  const activeTabLabel =
    PRODUCT_TABS.find((t) => t.id === activeTab)?.label || '단품'

  const handleOpenRegisterModal = () => {
    const elementPromiseForBlend =
      activeTab === 'BLEND'
        ? fetchAdminProductList('ELEMENT')
        : Promise.resolve(null)

    const categoryPromiseForElement: Promise<AdminCategoryListResponse | null> =
      activeTab === 'ELEMENT'
        ? fetchElementCategoriesAction()
        : Promise.resolve(null)

    const categoryPromiseForBlend: Promise<AdminCategoryListResponse | null> =
      activeTab === 'BLEND'
        ? fetchBlendCategoriesAction()
        : Promise.resolve(null)

    openModal(
      <Suspense fallback={null}>
        <ProductPostModal
          activeTab={activeTab}
          elementPromiseForBlend={elementPromiseForBlend}
          categoryPromiseForElement={categoryPromiseForElement}
          categoryPromiseForBlend={categoryPromiseForBlend}
        />
      </Suspense>
    )
  }

  return (
    <AdminListCard className={cn(isPending && 'pointer-events-none')}>
      <AdminPageHeader
        title={`${activeTabLabel} 목록`}
        buttonText="상품 등록"
        onButtonClick={handleOpenRegisterModal}
      />

      <AdminSearchBar
        searchValue={searchTerm}
        searchPlaceholder="상품명 검색"
        filterOptions={[{ label: '전체', value: 'all' }]}
        onSearchChange={setSearchTerm}
        onFilterChange={(val) => onFilterChange('scent_category_id', val)}
      />

      <AdminTabGroup
        tabs={PRODUCT_TABS}
        activeTab={activeTab}
        onChange={onTabChange}
      />

      <AdminTable headers={PRODUCT_TABLE_HEADERS}>
        <ErrorBoundary fallback={<AdminTableError />}>
          <Suspense
            key={`${activeTab}-${searchParams.q ?? ''}-${searchParams.page ?? ''}`}
            fallback={<AdminTableLoading type="product" />}
          >
            {children}
          </Suspense>
        </ErrorBoundary>
      </AdminTable>
    </AdminListCard>
  )
}
