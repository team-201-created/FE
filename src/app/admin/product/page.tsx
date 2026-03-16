import { Suspense } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductAdminContent from './_page/ProductAdminContent'
import type { ProductTabId } from './_types/AdminProductType'
import { ProductTableServer } from './_components/ProductTableServer'

export const metadata: Metadata = {
  title: '어드민 상품 관리',
}

interface ProductAdminPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>
}

export default async function ProductAdminPage({
  searchParams,
}: ProductAdminPageProps) {
  const params = await searchParams

  const tabParam = params?.tab
  const isValidTab = !tabParam || tabParam === 'ELEMENT' || tabParam === 'BLEND'

  if (!isValidTab) {
    notFound()
  }

  const activeTab: ProductTabId = (tabParam as ProductTabId) || 'ELEMENT'

  return (
    <Suspense fallback={null}>
      <ProductAdminContent activeTab={activeTab} searchParams={params}>
        <ProductTableServer activeTab={activeTab} searchParams={params} />
      </ProductAdminContent>
    </Suspense>
  )
}
