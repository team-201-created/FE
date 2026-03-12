import { fetchAdminCategories } from '../_api/adminFetchCategory'
import type { CategoryChild, CategoryTabId } from '../_types/AdminCategoryType'
import {
  AdminTableRow,
  AdminFirstCell,
  AdminTableCell,
  AdminDateCell,
  AdminTableEmpty,
} from '@/app/admin/_components'
import AdminCategoryIcon from '@/assets/icons/adminCategory.svg'

import { CategoryDeleteButton } from './CategoryDeleteButton'

interface CategoryTableServerProps {
  activeTab: CategoryTabId
  searchParams: {
    q?: string
  }
}

export async function CategoryTableServer({
  activeTab,
  searchParams,
}: CategoryTableServerProps) {
  const response = await fetchAdminCategories({ root_category: activeTab })

  // response.data.categories[0] 계층 구조
  const rootCategory = response?.data?.categories?.[0]
  const allItems = rootCategory?.children || []

  // 로컬 필터링 (명칭 검색)
  const items = allItems.filter((item) => {
    if (!searchParams.q) return true
    const q = searchParams.q.toLowerCase()
    return (
      item.name.kr.toLowerCase().includes(q) ||
      item.name.en.toLowerCase().includes(q)
    )
  })

  if (!items.length) {
    return <AdminTableEmpty />
  }

  return (
    <>
      {items.map((item: CategoryChild) => (
        <AdminTableRow key={item.category_id}>
          <AdminFirstCell>
            <div className="flex items-center gap-2">
              <div className="bg-black-primary rounded-[10px] p-2 text-white">
                <AdminCategoryIcon width={20} height={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-black-primary text-[16px] font-bold">
                  {item.name.kr}
                </span>
                <span className="text-[12px] font-normal text-gray-400">
                  {item.name.en}
                </span>
              </div>
            </div>
          </AdminFirstCell>

          <AdminDateCell slot={6} date={item.created_at} />

          <AdminTableCell slot={7}>
            <div className="flex justify-center">
              <CategoryDeleteButton categoryId={item.category_id} />
            </div>
          </AdminTableCell>
        </AdminTableRow>
      ))}
    </>
  )
}
