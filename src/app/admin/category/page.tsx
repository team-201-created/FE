import { Suspense } from 'react'
import type { Metadata } from 'next'
import CategoryAdminContent from './_page/CategoryAdminContent'
import type { CategoryTabId } from './_types/AdminCategoryType'
import { CategoryTableServer } from './_components/CategoryTableServer'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: '어드민 카테고리 관리',
}

interface CategoryAdminPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>
}

export default async function CategoryAdminPage({
  searchParams,
}: CategoryAdminPageProps) {
  const params = await searchParams

  const tabParam = params?.tab
  const isValidTab = !tabParam || tabParam === 'ELEMENT' || tabParam === 'BLEND'

  if (!isValidTab) {
    notFound()
  }

  const activeTab: CategoryTabId = (tabParam as CategoryTabId) || 'ELEMENT'

  return (
    <Suspense fallback={null}>
      <CategoryAdminContent activeTab={activeTab} searchParams={params}>
        <CategoryTableServer activeTab={activeTab} searchParams={params} />
      </CategoryAdminContent>
    </Suspense>
  )
}
