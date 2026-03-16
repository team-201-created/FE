'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useTransition } from 'react'
import { cn } from '@/lib/cn'

interface AdminPaginationProps {
  currentPage: number
  totalPages: number
}

/** 현재 페이지 기준으로 표시할 페이지 번호 목록 default - 5개 */
function getPageRange(current: number, total: number): number[] {
  const PAGE_WINDOW = 5
  let start = Math.max(1, current - Math.floor(PAGE_WINDOW / 2))
  const end = Math.min(total, start + PAGE_WINDOW - 1)

  // start 보정
  start = Math.max(1, end - PAGE_WINDOW + 1)

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

const NAV_BASE =
  'flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors'
const NAV_ENABLED = 'cursor-pointer text-gray-600 hover:bg-gray-100'
const NAV_DISABLED = 'cursor-not-allowed text-gray-300'
const PAGE_BASE = `${NAV_BASE} cursor-pointer`
const PAGE_ACTIVE = 'bg-black-primary text-white font-bold'
const PAGE_INACTIVE = 'text-gray-600 hover:bg-gray-100'

export function AdminPagination({
  currentPage,
  totalPages,
}: AdminPaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [_isPending, startTransition] = useTransition()
  const searchParams = useSearchParams()

  const goTo = useCallback(
    (targetPage: number) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', String(targetPage))
      const url = `${pathname}?${params.toString()}`

      startTransition(() => {
        router.push(url, { scroll: false })
      })
    },
    [pathname, router, searchParams]
  )

  if (totalPages <= 1) return null

  const pageRange = getPageRange(currentPage, totalPages)
  const isFirst = currentPage === 1
  const isLast = currentPage === totalPages

  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      <button
        type="button"
        aria-label="처음 페이지"
        className={cn(NAV_BASE, isFirst ? NAV_DISABLED : NAV_ENABLED)}
        onClick={() => !isFirst && goTo(1)}
        disabled={isFirst}
      >
        «
      </button>

      <button
        type="button"
        aria-label="이전 페이지"
        className={cn(NAV_BASE, isFirst ? NAV_DISABLED : NAV_ENABLED)}
        onClick={() => !isFirst && goTo(currentPage - 1)}
        disabled={isFirst}
      >
        ‹
      </button>

      {pageRange.map((p) => (
        <button
          key={p}
          type="button"
          aria-label={`${p}번째 페이지`}
          aria-current={p === currentPage ? 'page' : undefined}
          className={cn(
            PAGE_BASE,
            p === currentPage ? PAGE_ACTIVE : PAGE_INACTIVE
          )}
          onClick={() => goTo(p)}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        aria-label="다음 페이지"
        className={cn(NAV_BASE, isLast ? NAV_DISABLED : NAV_ENABLED)}
        onClick={() => !isLast && goTo(currentPage + 1)}
        disabled={isLast}
      >
        ›
      </button>

      <button
        type="button"
        aria-label="마지막 페이지"
        className={cn(NAV_BASE, isLast ? NAV_DISABLED : NAV_ENABLED)}
        onClick={() => !isLast && goTo(totalPages)}
        disabled={isLast}
      >
        »
      </button>
    </div>
  )
}
