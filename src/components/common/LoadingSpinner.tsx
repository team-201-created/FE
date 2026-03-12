import { cn } from '@/lib/cn'

const baseClass =
  'animate-spin rounded-full border-2 border-neutral-300 border-t-[var(--color-black-primary)]'

type LoadingSpinnerProps = {
  className?: string
  size?: 'sm' | 'md'
}

const sizeClass = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
} as const

/**
 * 공통 로딩 스피너 (Suspense fallback, 버튼 내 로딩 등)
 */
export function LoadingSpinner({
  className,
  size = 'md',
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(sizeClass[size], baseClass, className)}
      role="status"
      aria-label="로딩 중"
    />
  )
}
