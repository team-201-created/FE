'use client'

import { use, useState, useRef } from 'react'
import Button from '@/components/common/Button'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import type { AdminCategoryListResponse } from '@/app/admin/category/_types/AdminCategoryType'

interface CategoryMultiSelectWrapperProps {
  categoryPromise: Promise<AdminCategoryListResponse | null>
  selectedIds: number[]
  onChange: (ids: number[]) => void
  placeholder: string
}

export function CategoryMultiSelectWrapper({
  categoryPromise,
  selectedIds,
  onChange,
  placeholder,
}: CategoryMultiSelectWrapperProps) {
  const res = use(categoryPromise)
  const categories = res?.data.categories.flatMap((c) => c.children) ?? []
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  useOutsideClick(containerRef, () => setIsOpen(false), isOpen)

  const toggleId = (id: number) => {
    onChange(
      selectedIds.includes(id)
        ? selectedIds.filter((v) => v !== id)
        : [...selectedIds, id]
    )
  }

  const triggerLabel =
    selectedIds.length === 0
      ? placeholder
      : categories
          .filter((c) => selectedIds.includes(c.category_id))
          .map((c) => c.name.kr)
          .join(', ')

  return (
    <div ref={containerRef} className="relative w-full">
      <Button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`border-gray-light text-black-primary flex h-12 w-full cursor-pointer items-center justify-between rounded-xl border-2 bg-white px-4 font-medium transition-all active:scale-100 ${isOpen ? 'border-black-primary' : ''}`}
      >
        <span className="truncate">{triggerLabel}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`ml-2 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </Button>
      {isOpen && (
        <ul
          className="absolute z-10 mt-1 max-h-60 w-full cursor-pointer overflow-y-auto rounded-md border border-neutral-200 bg-white shadow-lg"
          role="listbox"
        >
          {categories.map((cat) => {
            const checked = selectedIds.includes(cat.category_id)
            return (
              <li key={cat.category_id} role="listitem">
                <button
                  type="button"
                  role="option"
                  aria-selected={checked}
                  onClick={() => toggleId(cat.category_id)}
                  className={`hover:bg-gray-light flex w-full cursor-pointer items-center gap-2 px-4 py-3 text-left text-sm transition-colors ${checked ? 'bg-gray-light font-bold' : ''}`}
                >
                  <span
                    className={`flex size-4 shrink-0 items-center justify-center rounded border text-xs ${checked ? 'border-black-primary bg-black-primary text-white' : 'border-neutral-300'}`}
                  >
                    {checked && '✓'}
                  </span>
                  {cat.name.kr}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
