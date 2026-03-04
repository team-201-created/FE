'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import { cn } from '@/lib/cn'

// ─── 모션 ─────────────────────────────────────────────────────────────────
const PILL_TRANSITION = {
  type: 'spring',
  stiffness: 350,
  damping: 30,
} as const

const PILL_LAYOUT_ID = 'perfume-segment-pill' as const

// ─── 스타일 ─────────────────────────────────────────────────────────────────
const styles = {
  nav: 'flex w-full max-w-[15rem] overflow-hidden rounded-full bg-white/70 p-1.5 shadow-[0_1px_14px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.04)]',
  link: 'relative flex flex-1 items-center justify-center rounded-full py-3 text-sm font-medium transition-[transform,box-shadow] duration-75 ease-out',
  linkInactive:
    'text-neutral-600 hover:bg-neutral-50/80 active:translate-y-[2px]',
  linkActive: 'text-white',
  pill: 'absolute inset-0 z-0 rounded-full bg-[var(--color-black-primary)] ',
  label: 'relative z-10',
} as const

// ─── 세그먼트 정의 ─────────────────────────────────────────────────────────
const SEGMENTS = [
  { href: '/products/single', label: '단품 향기' },
  { href: '/products/combo', label: '조합 향기' },
] as const

export function PerfumeSegmentNav() {
  const pathname = usePathname()

  return (
    <nav className={styles.nav} aria-label="향기 유형 선택">
      {SEGMENTS.map(({ href, label }) => {
        const isActive = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              styles.link,
              isActive ? styles.linkActive : styles.linkInactive
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            {isActive && (
              <motion.div
                layoutId={PILL_LAYOUT_ID}
                className={styles.pill}
                transition={PILL_TRANSITION}
              />
            )}
            <span className={styles.label}>{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
