/** 조합 향기 목록: 서버에서 목록 조회 후 클라이언트에 전달 */
import { fetchCombinations } from '../_api/productsClient'
import { ComboPageClient } from './ComboPageClient'

export default async function ProductsComboPage() {
  const { data } = await fetchCombinations({ page: 1, size: 100 })
  return <ComboPageClient initialItems={data.items} />
}
