import Image from 'next/image'
import {
  AdminTableRow,
  AdminTableCell,
  AdminTableEmpty,
  AdminPagination,
} from '@/app/admin/_components'
import { fetchAdminProductList } from '@/app/admin/product/_api/adminFetchProductList'
import type {
  ProductTabId,
  AdminElementProduct,
  AdminBlendProduct,
} from '@/app/admin/product/_types/AdminProductType'
import {
  getAccordLabel,
  ACCORD_LABEL_PILL_SM_CLASS,
} from '@/constants/accordLabelStyles'
import { ProductDeleteButton } from './ProductDeleteButton'
import { ProductEditButton } from './ProductEditButton'
import { resolveApiMediaUrl } from '@/lib/resolveApiMediaUrl'

const PAGE_SIZE = 10

interface ProductTableServerProps {
  activeTab: ProductTabId
  searchParams: {
    q?: string
    page?: string
    [key: string]: string | undefined
  }
}

export async function ProductTableServer({
  activeTab,
  searchParams,
}: ProductTableServerProps) {
  const response = await fetchAdminProductList(activeTab, {
    q: searchParams.q,
    page: searchParams.page ? Number(searchParams.page) : 1,
    size: PAGE_SIZE,
  })
  const items = (response?.data?.results || []) as (
    | AdminElementProduct
    | AdminBlendProduct
  )[]
  const totalPages = response?.data?.total_pages ?? 1
  const currentPage = response?.data?.page ?? 1

  if (items.length === 0) {
    return <AdminTableEmpty />
  }

  return (
    <>
      {items.map((item) => {
        const isSingle = activeTab === 'ELEMENT'
        const elementItem = item as AdminElementProduct
        const blendItem = item as AdminBlendProduct

        return (
          <AdminTableRow key={item.id} type="product">
            <AdminTableCell slot={1}>
              <div className="flex items-center gap-3">
                {resolveApiMediaUrl(item.thumbnail_image_url) ? (
                  <Image
                    src={resolveApiMediaUrl(item.thumbnail_image_url)}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="h-20 w-20 rounded-md object-cover"
                  />
                ) : (
                  <div className="h-20 w-20 rounded-md bg-neutral-100" />
                )}
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
              <div className="flex items-center gap-1">
                <ProductEditButton type={activeTab} id={item.id} />
                <ProductDeleteButton type={activeTab} id={item.id} />
              </div>
            </AdminTableCell>
          </AdminTableRow>
        )
      })}

      <AdminPagination currentPage={currentPage} totalPages={totalPages} />
    </>
  )
}
