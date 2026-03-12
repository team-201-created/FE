'use client'

import { Suspense } from 'react'
import { useRouter } from 'next/navigation'
import {
  AdminListCard,
  AdminPageHeader,
  AdminFilterBar,
  AdminTable,
  AdminTabGroup,
  AdminTableError,
  AdminTableLoading,
} from '@/app/admin/_components'
import type { ProductTabId } from '../_types/AdminProductType'
import { PRODUCT_TABLE_HEADERS } from '@/constants/admin'
import { ProductPostModal } from './ProductPostModal'
import { ErrorBoundary } from 'react-error-boundary'
import { useModalStore } from '@/store/useModalStore'
import { fetchAdminProductList } from '../_api/adminFetchProductList'

const PRODUCT_TABS: { id: ProductTabId; label: string }[] = [
  { id: 'ELEMENT', label: '단품' },
  { id: 'BLEND', label: '조합' },
]

type ProductAdminContentProps = {
  activeTab: ProductTabId
  children: React.ReactNode
}

export default function ProductAdminContent({
  activeTab,
  children,
}: ProductAdminContentProps) {
  const router = useRouter()
  const { openModal } = useModalStore()

  const activeTabLabel =
    PRODUCT_TABS.find((t) => t.id === activeTab)?.label || '단품'

  const handleTabChange = (tabId: string) => {
    router.replace(`/admin/product?tab=${tabId}`, { scroll: false })
  }

  const handleOpenRegisterModal = () => {
    const elementPromise =
      activeTab === 'BLEND'
        ? fetchAdminProductList('ELEMENT')
        : Promise.resolve(null)

    openModal(
      <Suspense fallback={null}>
        <ProductPostModal
          activeTab={activeTab}
          elementPromise={elementPromise}
        />
      </Suspense>
    )
  }

  return (
    <AdminListCard>
      <AdminPageHeader
        title={`${activeTabLabel} 목록`}
        buttonText="상품 등록"
        onButtonClick={handleOpenRegisterModal}
      />

      <AdminFilterBar
        searchPlaceholder="상품명 검색"
        filterOptions={[{ label: '전체', value: 'all' }]}
      />

      <AdminTabGroup
        tabs={PRODUCT_TABS}
        activeTab={activeTab}
        onChange={handleTabChange}
      />

      <AdminTable headers={PRODUCT_TABLE_HEADERS}>
        <ErrorBoundary fallback={<AdminTableError />}>
          <Suspense key={activeTab} fallback={<AdminTableLoading />}>
            {children}
          </Suspense>
        </ErrorBoundary>
      </AdminTable>
    </AdminListCard>
  )
}
