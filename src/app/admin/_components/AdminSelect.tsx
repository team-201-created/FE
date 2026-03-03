'use client'

import React, { useState, useRef } from 'react'
import { cn } from '@/lib/cn'
import Button from '@/components/common/Button'

interface AdminSelectProps {
  options: { label: string; value: string }[]
  value?: string
  onChange?: (value: string) => void
  className?: string
  width?: string
}

/**
 * 어드민 전용 선택 컴포넌트
 */
export const AdminSelect = ({
  options,
  value,
  onChange,
  className,
  width = 'w-32',
}: AdminSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const backdropRef = useRef<HTMLDivElement>(null)

  const selectedOption =
    options.find((opt) => opt.value === value) || options[0]

  const toggle = () => {
    setIsOpen((prev) => {
      if (!prev) setTimeout(() => backdropRef.current?.focus(), 0)
      return !prev
    })
  }
  const close = () => setIsOpen(false)

  const handleSelect = (val: string) => {
    onChange?.(val)
    close()
  }

  return (
    <div className={cn('relative', className)}>
      {isOpen && (
        <div
          ref={backdropRef}
          className="fixed inset-0 z-40 cursor-pointer"
          tabIndex={-1}
          onClick={close}
          onKeyDown={(e) => e.key === 'Escape' && close()}
        />
      )}

      <Button
        type="button"
        onClick={toggle}
        className={cn(
          'border-gray-light text-black-primary flex h-12 cursor-pointer items-center justify-between rounded-xl border-2 bg-white px-4 font-medium transition-all',
          width,
          isOpen && 'border-violet-300'
        )}
      >
        <span>{selectedOption?.label}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            'transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </Button>

      {isOpen && (
        <ul
          className={cn(
            'absolute top-full left-0 z-50 mt-1 origin-top cursor-pointer overflow-hidden rounded-md border border-neutral-200 bg-white',
            width
          )}
          role="listbox"
        >
          {options.map((opt) => (
            <li key={opt.value} role="none">
              <button
                type="button"
                role="option"
                aria-selected={opt.value === value}
                className={cn(
                  'hover:bg-gray-light hover:text-black-primary w-full cursor-pointer px-4 py-3 text-left text-sm transition-colors',
                  opt.value === value ? 'font-bold' : ''
                )}
                onClick={() => handleSelect(opt.value)}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
