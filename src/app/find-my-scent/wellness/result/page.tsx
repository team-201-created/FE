/** 웰니스 테스트 결과 페이지 — result_id 있으면 API 조회, 목 모드에서만 실패 시 목 폴백 */
import { loadProfilingResultPageProps } from '../../_lib/loadProfilingResultPageProps'
import { ProfilingResultLoadError } from '../../_components/ProfilingResultLoadError'
import { ResultPageWithAnalyzing } from '../../_components/ResultPageWithAnalyzing'

type PageProps = {
  searchParams: Promise<{ result_id?: string; skip_analyzing?: string }>
}

export default async function WellnessResultPage({ searchParams }: PageProps) {
  const params = await searchParams
  const loaded = await loadProfilingResultPageProps(params.result_id)
  const shouldSkipAnalyzing = params.skip_analyzing === '1'

  if (!loaded.ok) {
    return (
      <ProfilingResultLoadError
        message={loaded.errorMessage}
        resultType="HEALTH"
      />
    )
  }

  return (
    <ResultPageWithAnalyzing
      resultType="HEALTH"
      contentBoxProps={loaded.contentBoxProps}
      analyzingDurationMs={shouldSkipAnalyzing ? 0 : undefined}
    />
  )
}
