'use client'

import { useEffect, useState } from 'react'

/** 향 목록 로딩 시 스켈레톤 UI (단품/조합 공용) */
const CARD_COUNT = 8

/** 스켈레톤 최소 노출 시간(ms). 이 시간만큼 지난 뒤 실제 목록 표시 */
export const SCENT_LIST_SKELETON_DELAY_MS = 800

type SkeletonDelayProps = {
  /** 스켈레톤을 보여줄 최소 시간(ms) */
  delayMs?: number
  children: React.ReactNode
}

/** 지정한 시간(ms) 동안 스켈레톤을 보여준 뒤 children 렌더 */
export function SkeletonDelay({
  delayMs = SCENT_LIST_SKELETON_DELAY_MS,
  children,
}: SkeletonDelayProps) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), delayMs)
    return () => window.clearTimeout(id)
  }, [delayMs])

  if (!ready) return <ScentListSkeleton />
  return <>{children}</>
}

function FilterBarSkeleton() {
  return (
    <div className="mb-6 flex flex-col overflow-hidden rounded-[20px] bg-white shadow-sm">
      <div className="flex items-center gap-2 p-2">
        <div className="h-10 flex-1 animate-pulse rounded-full bg-neutral-200" />
        <div className="h-10 w-24 animate-pulse rounded-full bg-neutral-200" />
      </div>
    </div>
  )
}

function CardSkeleton() {
  return (
    <div className="rounded-2xl bg-white shadow-md">
      <div className="aspect-square w-full animate-pulse rounded-t-2xl bg-neutral-200" />
      <div className="space-y-3 p-3">
        <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-200" />
        <div className="flex gap-1">
          <div className="h-6 w-14 animate-pulse rounded-full bg-neutral-200" />
          <div className="h-6 w-16 animate-pulse rounded-full bg-neutral-200" />
        </div>
      </div>
    </div>
  )
}

export function ScentListSkeleton() {
  return (
    <>
      <FilterBarSkeleton />
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {Array.from({ length: CARD_COUNT }, (_, i) => (
          <li key={i}>
            <CardSkeleton />
          </li>
        ))}
      </ul>
    </>
  )
}
