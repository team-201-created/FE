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
import { processCategoryItems } from '@/app/admin/_utils/categoryUtils'

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
  const rootCategoryItems = rootCategory?.children || []

  // 카테고리는 페이징이 현재 UI상 없어도 로직상 안전하게 처리
  const { items } = processCategoryItems(rootCategoryItems, {
    q: searchParams.q,
    pageSize: 100, // 카테고리는 현재 전체 노출이므로
  })

  if (!items || items.length === 0) {
    return <AdminTableEmpty />
  }

  return (
    <>
      {items.map((item: CategoryChild) => (
        <AdminTableRow key={item.category_id}>
          <AdminFirstCell>
            <div className="flex items-center gap-2">
              <div className="bg-black-primary rounded-lg p-2 text-white">
                <AdminCategoryIcon width={20} height={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-md font-bold">{item.name.kr}</span>
                <span className="text-xs font-normal text-gray-500">
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
