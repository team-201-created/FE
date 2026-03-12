'use client'

import { cn } from '@/lib/cn'

type ModalOverlayProps = {
  children: React.ReactNode
  onClose: () => void
  /** overlay 클릭 시 닫기 (기본 true) */
  closeOnBackdrop?: boolean
  className?: string
}

const overlayClass =
  'fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4'

/**
 * 모달 백드롭: 배경 클릭 시 onClose 호출, children 클릭은 전파 중단으로 닫히지 않음
 */
export function ModalOverlay({
  children,
  onClose,
  closeOnBackdrop = true,
  className,
}: ModalOverlayProps) {
  return (
    <div
      className={cn(overlayClass, className)}
      onClick={
        closeOnBackdrop
          ? (e) => e.target === e.currentTarget && onClose()
          : undefined
      }
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>
  )
}
