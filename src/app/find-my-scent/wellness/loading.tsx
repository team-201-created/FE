import { PageCenter } from '@/components/common/PageCenter'

/** 건강 테스트 로딩 (Suspense fallback) */
export default function WellnessLoading() {
  return (
    <PageCenter>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-[var(--color-black-primary)]" />
    </PageCenter>
  )
}
