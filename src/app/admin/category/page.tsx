import { Suspense } from 'react'
import type { Metadata } from 'next'
import CategoryAdminContent from './_page/CategoryAdminContent'
import type { RootCategory } from './_types/AdminCategoryType'
import { CategoryTableServer } from './_components/CategoryTableServer'
import {
  fetchAdminElementCategories,
  fetchAdminBlendCategories,
} from './_api/adminFetchCategory'
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
  const isValidTab = !tabParam || tabParam === 'element' || tabParam === 'blend'

  if (!isValidTab) {
    notFound()
  }

  const rootCategory: RootCategory = (tabParam as RootCategory) || 'element'

  // Promise만 생성
  const categoryResponsePromise =
    rootCategory === 'element'
      ? fetchAdminElementCategories()
      : fetchAdminBlendCategories()

  return (
    <Suspense fallback={null}>
      <CategoryAdminContent
        rootCategory={rootCategory}
        categoryResponsePromise={categoryResponsePromise}
        searchParams={params}
      >
        <CategoryTableServer
          rootCategory={rootCategory}
          categoryResponsePromise={categoryResponsePromise}
          searchParams={params}
        />
      </CategoryAdminContent>
    </Suspense>
  )
}
