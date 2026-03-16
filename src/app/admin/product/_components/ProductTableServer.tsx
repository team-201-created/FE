import Image from 'next/image'
import {
  AdminTableRow,
  AdminTableCell,
  AdminTableEmpty,
  AdminPagination,
} from '@/app/admin/_components'
import { fetchAdminProductList } from '../_api/adminFetchProductList'
import type {
  ProductTabId,
  AdminElementProduct,
  AdminBlendProduct,
} from '../_types/AdminProductType'
import {
  getAccordLabel,
  ACCORD_LABEL_PILL_SM_CLASS,
} from '@/constants/accordLabelStyles'
import { ProductDeleteButton } from './ProductDeleteButton'

interface ProductTableServerProps {
  activeTab: ProductTabId
  searchParams: {
    q?: string
    scent_category_id?: string
    page?: string
    [key: string]: any
  }
}

export async function ProductTableServer({
  activeTab,
  searchParams,
}: ProductTableServerProps) {
  const currentPage = Math.max(1, Number(searchParams.page) || 1)

  const response = await fetchAdminProductList(activeTab, {
    q: searchParams.q,
    page: currentPage,
    size: 10,
  })

  const items = response?.data?.results || []
  const totalPages = response?.data?.total_pages ?? 1

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
              <ProductDeleteButton type={activeTab} id={item.id} />
            </AdminTableCell>
          </AdminTableRow>
        )
      })}

      <AdminPagination currentPage={currentPage} totalPages={totalPages} />
    </>
  )
}
