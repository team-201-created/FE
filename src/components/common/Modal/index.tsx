'use client'

import React from 'react'
import { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'
import { modalVariants } from './Modal.variants'
import { useModal } from './useModal'

// --- Types ---
export interface ModalProps extends VariantProps<typeof modalVariants> {
  isOpen: boolean
  onClose: () => void
  outsideCloseEnabled?: boolean
  ignoreRefs?: Array<React.RefObject<HTMLElement | null>>
  showCloseButton?: boolean
  children: React.ReactNode
  overlayClassName?: string
  className?: string
}

// --- Main Modal Component ---
export function Modal({
  isOpen,
  onClose,
  outsideCloseEnabled = true,
  ignoreRefs = [],
  showCloseButton = true,
  children,
  size,
  rounded,
  className,
  overlayClassName,
}: ModalProps) {
  const { modalRef } = useModal({
    isOpen,
    onClose,
    outsideCloseEnabled,
    ignoreRefs,
  })

  if (!isOpen) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center bg-black/50',
        overlayClassName
      )}
    >
      <div
        ref={modalRef}
        className={cn(modalVariants({ size, rounded }), className)}
      >
        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            className="hover:bg-gray-white text-black-secondary absolute top-5 right-5 z-[110] rounded-md p-1 transition-colors"
            aria-label="Close modal"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
        {children}
      </div>
    </div>
  )
}

// --- Sub Components ---

Modal.Header = function ModalHeader({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('border-gray-light border-b p-6', className)}>
      <h2 className="text-black-primary text-xl font-bold">{children}</h2>
    </div>
  )
}

Modal.Content = function ModalContent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn('p-6', className)}>{children}</div>
}

Modal.Footer = function ModalFooter({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('border-gray-light border-t p-6', className)}>
      {children}
    </div>
  )
}

export default Modal
