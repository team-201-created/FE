import { PageCenter } from '@/components/common/PageCenter'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'

/** 취향 테스트 로딩 (Suspense fallback) */
export default function TasteTestLoading() {
  return (
    <PageCenter>
      <LoadingSpinner />
    </PageCenter>
  )
}
