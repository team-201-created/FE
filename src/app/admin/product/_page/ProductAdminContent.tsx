'use client'

import { use, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  AdminListCard,
  AdminPageHeader,
  AdminFilterBar,
  AdminTable,
  AdminTableRow,
  AdminTableCell,
  AdminTabGroup,
  AdminFirstCell,
  AdminTableLoading,
  AdminTableError,
  AdminTableEmpty,
} from '@/app/admin/_components'
import Button from '@/components/common/Button'
import PenIcon from '@/assets/icons/pen.svg'
import type {
  AdminElementListResponse,
  AdminBlendListResponse,
  AdminElementProduct,
  AdminBlendProduct,
  ProductTabId,
} from '../_types/AdminProductType'
import { PRODUCT_TABLE_HEADERS } from '@/constants/admin'
import { useModalStore } from '@/store/useModalStore'
import { ProductPostModal } from './ProductPostModal'
import { ErrorBoundary } from 'react-error-boundary'
import {
  getAccordLabel,
  ACCORD_LABEL_PILL_SM_CLASS,
} from '@/constants/accordLabelStyles'

const PRODUCT_TABS: { id: ProductTabId; label: string }[] = [
  { id: 'ELEMENT', label: '단품' },
  { id: 'BLEND', label: '조합' },
]

type ProductAdminContentProps = {
  dataPromise: Promise<AdminElementListResponse | AdminBlendListResponse>
  activeTab: ProductTabId
}

export default function ProductAdminContent({
  dataPromise,
  activeTab,
}: ProductAdminContentProps) {
  const router = useRouter()
  // const { openModal } = useModalStore()

  const activeTabLabel =
    PRODUCT_TABS.find((t) => t.id === activeTab)?.label || '단품'

  const handleTabChange = (tabId: string) => {
    router.replace(`/admin/product?type=${tabId}`, { scroll: false })
  }

  const handleOpenRegisterModal = () => {
    // openModal(<ProductPostModal activeTab={activeTab} />)
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
            <TableBodyWrapper dataPromise={dataPromise} activeTab={activeTab} />
          </Suspense>
        </ErrorBoundary>
      </AdminTable>
    </AdminListCard>
  )
}

function TableBodyWrapper({
  dataPromise,
  activeTab,
}: {
  dataPromise: Promise<AdminElementListResponse | AdminBlendListResponse>
  activeTab: ProductTabId
}) {
  const response = use(dataPromise)
  const items = response?.data?.results || []

  if (!items.length) {
    return <AdminTableEmpty />
  }

  return (
    <>
      {items.map((item: AdminElementProduct | AdminBlendProduct) => {
        const isSingle = activeTab === 'ELEMENT'
        const elementItem = item as AdminElementProduct
        const blendItem = item as AdminBlendProduct

        return (
          <AdminTableRow key={item.id}>
            <AdminTableCell slot={1}>
              <div className="flex items-center gap-3">
                <Image
                  src={item.thumbnail_image_url || ''}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="h-20 w-20 rounded-md object-cover"
                />
                <span className="text-[16px] font-bold">{item.name}</span>
              </div>
            </AdminTableCell>

            <AdminTableCell slot={2}>
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {isSingle
                  ? (() => {
                      const familyId =
                        elementItem.element_category?.name?.en?.toLowerCase() ||
                        'base'
                      const krName =
                        elementItem.element_category?.name?.kr || '미지정'
                      const { style } = getAccordLabel(familyId)
                      return (
                        <span
                          className={ACCORD_LABEL_PILL_SM_CLASS}
                          style={{
                            backgroundColor: style.bg,
                            borderColor: style.border,
                            color: style.text,
                          }}
                        >
                          {krName}
                        </span>
                      )
                    })()
                  : blendItem.blend_categories
                      ?.filter((c) => c.name?.kr)
                      .map((c) => {
                        const krName = c.name.kr
                        return (
                          <span
                            key={`${blendItem.id}-${krName}`}
                            className={ACCORD_LABEL_PILL_SM_CLASS}
                          >
                            # {krName}
                          </span>
                        )
                      })}
              </div>
            </AdminTableCell>

            <AdminTableCell slot={4}>
              {isSingle ? '단품' : '조합'}
            </AdminTableCell>

            <AdminTableCell slot={7}>
              <Button color="none" size="w32h32" rounded="sm">
                <PenIcon width={16} height={16} />
              </Button>
            </AdminTableCell>
          </AdminTableRow>
        )
      })}
    </>
  )
}
