'use client'

import React from 'react'
import { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'
import { modalVariants } from './Modal.variants'
import { useModal } from './useModal'
import { ModalPortal } from './ModalPortal'
import ModalCloseIcon from '@/assets/icons/modalClose.svg'

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
    <ModalPortal>
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center bg-black/50',
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
              className="text-black-secondary absolute top-5 right-5 cursor-pointer rounded-md p-1"
              aria-label="Close modal"
            >
              <ModalCloseIcon width={24} height={24} />
            </button>
          )}
          {children}
        </div>
      </div>
    </ModalPortal>
  )
}

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
