'use client'

import { useState, useRef } from 'react'
import { cn } from '@/lib/cn'
import Button from '@/components/common/Button'
import { useOutsideClick } from '@/hooks/useOutsideClick'

interface AdminSelectProps {
  options: { label: string; value: string; secondaryLabel?: string }[]
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
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedOption =
    options.find((opt) => opt.value === value) || options[0]

  const toggle = () => setIsOpen((prev) => !prev)
  const close = () => setIsOpen(false)

  useOutsideClick(containerRef, close, isOpen)

  const handleSelect = (val: string) => {
    onChange?.(val)
    close()
  }

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <Button
        type="button"
        onClick={toggle}
        className={cn(
          'border-gray-light text-black-primary flex h-12 cursor-pointer items-center justify-between rounded-xl border-2 bg-white px-4 font-medium transition-all active:scale-100',
          width,
          isOpen && 'border-black-primary'
        )}
      >
        <span className="truncate">{selectedOption?.label}</span>
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
            'ml-2 shrink-0 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </Button>

      {isOpen && (
        <ul
          className={cn(
            'absolute z-10 mt-1 max-h-60 cursor-pointer overflow-y-auto rounded-md border border-neutral-200 bg-white shadow-lg',
            width
          )}
          role="listbox"
        >
          {options.map((opt) => (
            <li key={opt.value} role="listitem">
              <button
                type="button"
                role="option"
                aria-selected={opt.value === value}
                className={cn(
                  'hover:bg-gray-light hover:text-black-primary flex w-full cursor-pointer items-center justify-between px-4 py-3 text-left text-sm transition-colors',
                  opt.value === value ? 'bg-gray-light font-bold' : ''
                )}
                onClick={() => handleSelect(opt.value)}
              >
                <span>{opt.label}</span>
                {opt.secondaryLabel && (
                  <span className="ml-2 text-[12px] font-normal text-gray-400">
                    {opt.secondaryLabel}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
