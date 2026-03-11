import type { Metadata } from 'next'
import { fetchAdminProductList } from './_api/adminFetchProductList'
import ProductAdminContent from './_page/ProductAdminContent'
import type { ProductTabId } from './_types/AdminProductType'

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

  const typeParam = params?.type || 'ELEMENT'
  const activeTab: ProductTabId =
    typeof typeParam === 'string' && typeParam === 'BLEND' ? 'BLEND' : 'ELEMENT'

  // 페치 함수 호출 Promise 자체를 Client 컴포넌트로 전달
  const dataPromise = fetchAdminProductList(activeTab)

  return <ProductAdminContent dataPromise={dataPromise} activeTab={activeTab} />
}
