/** AI 비주얼 분석 결과 페이지 — result_id 있으면 API 조회, 없거나 실패 시 목데이터 */
import {
  fetchProfilingResult,
  resultDetailToContentBoxProps,
} from '../../_api/profilingClient'
import { ResultPageWithAnalyzing } from '../../_components/ResultPageWithAnalyzing'
import { mockProfilingResultDetail } from '@/mocks/data/profilingResults'

type PageProps = {
  searchParams: Promise<{ result_id?: string; skip_analyzing?: string }>
}

export default async function AIResultPage({ searchParams }: PageProps) {
  const params = await searchParams
  const resultId = params.result_id ? Number(params.result_id) : null
  const shouldSkipAnalyzing = params.skip_analyzing === '1'

  let contentBoxProps: ReturnType<typeof resultDetailToContentBoxProps>
  if (resultId != null && Number.isInteger(resultId) && resultId > 0) {
    try {
      const res = await fetchProfilingResult(resultId)
      if (res.success && res.data) {
        contentBoxProps = resultDetailToContentBoxProps(res.data)
      } else {
        contentBoxProps = resultDetailToContentBoxProps(
          mockProfilingResultDetail
        )
      }
    } catch {
      contentBoxProps = resultDetailToContentBoxProps(mockProfilingResultDetail)
    }
  } else {
    contentBoxProps = resultDetailToContentBoxProps(mockProfilingResultDetail)
  }

  return (
    <ResultPageWithAnalyzing
      resultType="AI"
      contentBoxProps={contentBoxProps}
      analyzingDurationMs={shouldSkipAnalyzing ? 0 : undefined}
    />
  )
}
