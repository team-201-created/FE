import Link from 'next/link'

const RETEST_HREF = {
  PREFERENCE: '/find-my-scent/taste-test',
  HEALTH: '/find-my-scent/wellness',
} as const

type ProfilingResultLoadErrorProps = {
  message: string
  resultType: keyof typeof RETEST_HREF
}

/** 실 API 환경에서 결과 조회 실패 시 (목 폴백 없음) */
export function ProfilingResultLoadError({
  message,
  resultType,
}: ProfilingResultLoadErrorProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-[var(--background-light-bg)] px-4 py-16 text-center">
      <p className="max-w-md text-sm text-neutral-600">{message}</p>
      <Link
        href={RETEST_HREF[resultType]}
        className="rounded-xl bg-[var(--color-black-primary)] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        테스트 다시 하기
      </Link>
    </div>
  )
}
