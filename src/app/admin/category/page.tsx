import type { Metadata } from 'next'
import CategoryAdminContent from './_page/CategoryAdminContent'
import type { CategoryTabId } from './_types/AdminCategoryType'
import { CategoryTableServer } from './_components/CategoryTableServer'

export const metadata: Metadata = {
  title: '카테고리 관리',
}

interface CategoryAdminPageProps {
  searchParams: Promise<{ tab?: string }>
}

export default async function CategoryAdminPage({
  searchParams,
}: CategoryAdminPageProps) {
  const params = await searchParams

  const tabParam = params?.tab || 'Element'
  const activeTab: CategoryTabId =
    typeof tabParam === 'string' && tabParam === 'Blend' ? 'Blend' : 'Element'

  return (
    <CategoryAdminContent activeTab={activeTab}>
      <CategoryTableServer activeTab={activeTab} />
    </CategoryAdminContent>
  )
}
