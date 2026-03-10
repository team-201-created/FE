'use client'

/** find-my-scent 구간 에러 (질문 조회 실패 등) — "질문을 불러올 수 없습니다" + 다시 시도 */
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { PageCenter } from '@/components/common/PageCenter'

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function FindMyScentError({ error, reset }: ErrorProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleRetry = () => {
    startTransition(() => {
      router.refresh()
      reset()
    })
  }

  useEffect(() => {
    console.error('[find-my-scent]', error)
  }, [error])

  return (
    <PageCenter>
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-neutral-600">질문을 불러올 수 없습니다.</p>
        <button
          type="button"
          onClick={handleRetry}
          disabled={isPending}
          className="rounded-xl bg-[var(--color-black-primary)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {isPending ? '불러오는 중...' : '다시 시도'}
        </button>
      </div>
    </PageCenter>
  )
}
