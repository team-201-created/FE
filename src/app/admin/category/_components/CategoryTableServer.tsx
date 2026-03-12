import { fetchAdminCategories } from '../_api/adminFetchCategory'
import type { CategoryChild, CategoryTabId } from '../_types/AdminCategoryType'
import {
  AdminTableRow,
  AdminFirstCell,
  AdminTableCell,
  AdminDateCell,
  AdminTableEmpty,
} from '@/app/admin/_components'
import Button from '@/components/common/Button'
import TrashIcon from '@/assets/icons/trash.svg'
import AdminCategoryIcon from '@/assets/icons/adminCategory.svg'

interface CategoryTableServerProps {
  activeTab: CategoryTabId
}

export async function CategoryTableServer({
  activeTab,
}: CategoryTableServerProps) {
  const response = await fetchAdminCategories({ root_category: activeTab })

  // response.data.categories[0] 계층 구조
  const rootCategory = response?.data?.categories?.[0]
  const items = rootCategory?.children || []

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
              <Button color="none" size="w32h32" rounded="sm">
                <TrashIcon
                  width={16}
                  height={16}
                  className="hover:text-black-primary text-gray-400 transition-colors"
                />
              </Button>
            </div>
          </AdminTableCell>
        </AdminTableRow>
      ))}
    </>
  )
}
