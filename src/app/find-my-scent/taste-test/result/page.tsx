/** 취향 테스트 결과 페이지 — result_id 있으면 서버에서 조회 후 표시 */
import {
  fetchProfilingResult,
  resultDetailToContentBoxProps,
} from '../../_api/profilingClient'
import { ResultPageWithAnalyzing } from '../../_components/ResultPageWithAnalyzing'

type PageProps = { searchParams: Promise<{ result_id?: string }> }

export default async function TasteTestResultPage({ searchParams }: PageProps) {
  const params = await searchParams
  const resultId = params.result_id ? Number(params.result_id) : null

  let contentBoxProps:
    | ReturnType<typeof resultDetailToContentBoxProps>
    | undefined
  if (resultId != null && Number.isInteger(resultId) && resultId > 0) {
    try {
      const res = await fetchProfilingResult(resultId)
      if (res.success && res.data) {
        contentBoxProps = resultDetailToContentBoxProps(res.data)
      }
    } catch {
      // fallback: contentBoxProps 없이 더미로 표시
    }
  }

  return (
    <ResultPageWithAnalyzing
      resultType="PREFERENCE"
      contentBoxProps={contentBoxProps}
    />
  )
}
