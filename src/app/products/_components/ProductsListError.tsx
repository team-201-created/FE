'use client'

/** 목록 조회 실패 시 표시 (SSR fetch 예외 처리용) */
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { PageCenter } from '@/components/common/PageCenter'

type ProductsListErrorProps = {
  message?: string
}

export function ProductsListError({
  message = '목록을 불러올 수 없습니다.',
}: ProductsListErrorProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleRetry = () => {
    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <PageCenter>
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-neutral-600">{message}</p>
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
