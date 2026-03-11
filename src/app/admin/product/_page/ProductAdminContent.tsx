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
import type {
  AdminElementListResponse,
  ProductTabId,
} from '../_types/AdminProductType'
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
    router.replace(`/admin/product?type=${tabId}`, { scroll: false })
  }

  const handleOpenRegisterModal = () => {
    // 🔥 무한 루프 방지 핵심: 렌더링 함수 내부가 아닌 "이벤트 핸들러"에서 호출!!
    // 또한 page.tsx 의 오버페칭(초기 로딩 낭비) 문제도 완벽하게 해결!
    const elementPromise =
      activeTab === 'BLEND'
        ? fetchAdminProductList('ELEMENT', { size: 100 })
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
