'use client'

/** products 구간 에러 바운더리 (목록/상세 등 예기치 않은 예외) */
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { PageCenter } from '@/components/common/PageCenter'

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ProductsError({ error, reset }: ErrorProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleRetry = () => {
    startTransition(() => {
      router.refresh()
      reset()
    })
  }

  useEffect(() => {
    console.error('[products]', error)
  }, [error])

  return (
    <PageCenter>
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-neutral-600">일시적인 오류가 발생했습니다.</p>
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
