import { Suspense } from 'react'
import type { Metadata } from 'next'
import ProductAdminContent from './_page/ProductAdminContent'
import type { ProductTabId } from './_types/AdminProductType'
import { ProductTableServer } from './_components/ProductTableServer'
import { AdminTableLoading } from '../_components'

export const metadata: Metadata = {
  title: '어드민 상품 관리',
}

interface ProductAdminPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ProductAdminPage({
  searchParams,
}: ProductAdminPageProps) {
  const params = await searchParams

  const typeParam = params?.tab || 'ELEMENT'
  const activeTab: ProductTabId =
    typeof typeParam === 'string' && typeParam === 'BLEND' ? 'BLEND' : 'ELEMENT'

  return (
    <Suspense fallback={<AdminTableLoading />}>
      <ProductAdminContent activeTab={activeTab}>
        <ProductTableServer activeTab={activeTab} searchParams={params} />
      </ProductAdminContent>
    </Suspense>
  )
}
