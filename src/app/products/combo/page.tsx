/** 조합 향기 목록: 서버에서 목록 조회 후 클라이언트에 전달 */
import { fetchBlends } from '../_api/productsClient'
import { ComboPageClient } from './ComboPageClient'

export default async function ProductsComboPage() {
  const { data } = await fetchBlends({ page: 1, size: 100 })
  return <ComboPageClient initialItems={data.results} />
}
