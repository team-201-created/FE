/** AI 조합 향기 분석 결과 페이지 — API 미연동 시 목데이터 표시 */
import { resultDetailToContentBoxProps } from '../../_api/profilingClient'
import { ResultPageWithAnalyzing } from '../../_components/ResultPageWithAnalyzing'
import { mockProfilingResultDetail } from '@/mocks/data/profilingResults'

export default function AIResultPage() {
  const contentBoxProps = resultDetailToContentBoxProps(
    mockProfilingResultDetail
  )
  return (
    <ResultPageWithAnalyzing
      resultType="AI"
      contentBoxProps={contentBoxProps}
    />
  )
}
