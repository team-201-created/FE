'use client'

import React from 'react'
import { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'
import { modalVariants } from './Modal.variants'
import { useModal } from './useModal'
import ModalCloseIcon from '@/assets/icons/modalClose.svg'

export interface ModalProps extends VariantProps<typeof modalVariants> {
  isOpen: boolean
  onClose: () => void
  showCloseButton?: boolean
  overflowVisible?: boolean
  children: React.ReactNode
}

export function Modal({
  isOpen,
  onClose,
  showCloseButton = true,
  overflowVisible = false,
  children,
  size,
  rounded,
}: ModalProps) {
  const { modalRef } = useModal({
    isOpen,
    onClose,
  })

  if (!isOpen) return null

  return (
    <div
      ref={modalRef}
      className={cn(
        modalVariants({ size, rounded }),
        overflowVisible ? 'overflow-visible' : 'overflow-hidden'
      )}
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
