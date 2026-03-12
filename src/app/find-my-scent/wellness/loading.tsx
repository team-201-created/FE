import { PageCenter } from '@/components/common/PageCenter'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'

/** 건강 테스트 로딩 (Suspense fallback) */
export default function WellnessLoading() {
  return (
    <PageCenter>
      <LoadingSpinner />
    </PageCenter>
  )
}
