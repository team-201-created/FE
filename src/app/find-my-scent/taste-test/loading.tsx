import { PageCenter } from '@/components/common/PageCenter'

/** 취향 테스트 질문 로딩 중 (Suspense fallback) */
export default function TasteTestLoading() {
  return (
    <PageCenter>
      <p className="text-neutral-500">질문을 불러오는 중...</p>
    </PageCenter>
  )
}
