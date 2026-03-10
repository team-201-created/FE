/** 단품 향기 목록: 서버에서 목록 조회 후 클라이언트에 전달 */
import { fetchSingles } from '../_api/productsClient'
import { SinglePageClient } from './SinglePageClient'

export default async function ProductsSinglePage() {
  const { data } = await fetchSingles({ page: 1, size: 100 })
  return <SinglePageClient initialItems={data.items} />
}
