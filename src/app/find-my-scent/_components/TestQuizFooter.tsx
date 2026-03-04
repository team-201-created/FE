import { cn } from '@/lib/cn'

type TestQuizFooterProps = {
  isFirst: boolean
  isLast: boolean
  canGoNext: boolean
  onPrev: () => void
  onNext: () => void
}

const styles = {
  wrap: 'flex w-full gap-3',
  prev: 'flex flex-1 items-center justify-center gap-1 rounded-xl border border-neutral-200 bg-white py-3.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50',
  prevHidden: 'invisible',
  next: 'flex flex-1 items-center justify-center gap-1 rounded-xl py-3.5 text-sm font-medium transition-colors disabled:cursor-not-allowed',
  nextActive: 'bg-[var(--color-black-primary)] text-white hover:opacity-90',
  nextInactive: 'bg-neutral-200 text-neutral-500',
  arrow: 'text-base',
} as const

export function TestQuizFooter({
  isFirst,
  isLast,
  canGoNext,
  onPrev,
  onNext,
}: TestQuizFooterProps) {
  const prevClassName = cn(styles.prev, isFirst && styles.prevHidden)
  const nextClassName = cn(
    styles.next,
    canGoNext ? styles.nextActive : styles.nextInactive
  )
  const nextLabel = isLast ? '결과 보기' : '다음'

  return (
    <footer className={styles.wrap}>
      <button type="button" onClick={onPrev} className={prevClassName}>
        <span className={styles.arrow}>‹</span> 이전
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={!canGoNext}
        className={nextClassName}
      >
        {nextLabel} <span className={styles.arrow}>›</span>
      </button>
    </footer>
  )
}
