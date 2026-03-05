import { cn } from '@/lib/cn'

const baseClass =
  'flex min-h-screen items-center justify-center bg-[var(--background-light-bg)]'

type PageCenterProps = {
  children: React.ReactNode
  className?: string
}

export function PageCenter({ children, className }: PageCenterProps) {
  return <div className={cn(baseClass, className)}>{children}</div>
}
