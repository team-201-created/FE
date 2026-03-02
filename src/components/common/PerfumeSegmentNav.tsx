'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/cn'

const styles = {
  nav: 'flex w-full max-w-[15rem] overflow-hidden rounded-full bg-white/70 p-1.5 shadow-[0_1px_14px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.04)]',
  link: 'flex flex-1 items-center justify-center rounded-full py-3 text-sm font-medium transition-[transform,box-shadow] duration-75 ease-out',
  active: 'perfume-segment-active',
  inactive:
    'bg-white text-neutral-600 shadow-[0_2px_0_rgba(0,0,0,0.07)] hover:bg-neutral-50 active:translate-y-[2px] active:shadow-none',
} as const

export function PerfumeSegmentNav() {
  const pathname = usePathname()
  const isSingle = pathname === '/products/single'
  const isCombo = pathname === '/products/combo'

  return (
    <nav className={styles.nav} aria-label="향기 유형 선택">
      <Link
        href="/products/single"
        className={cn(styles.link, isSingle ? styles.active : styles.inactive)}
        aria-current={isSingle ? 'page' : undefined}
      >
        단품 향기
      </Link>
      <Link
        href="/products/combo"
        className={cn(styles.link, isCombo ? styles.active : styles.inactive)}
        aria-current={isCombo ? 'page' : undefined}
      >
        조합 향기
      </Link>
    </nav>
  )
}
