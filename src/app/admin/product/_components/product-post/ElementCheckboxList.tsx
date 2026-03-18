'use client'

import { use } from 'react'
import type { AdminElementListResponse } from '../../_types/AdminProductType'

interface ElementCheckboxListProps {
  elementPromise: Promise<AdminElementListResponse | null>
  selectedIds: number[]
  onToggle: (id: number) => void
}

export function ElementCheckboxList({
  elementPromise,
  selectedIds,
  onToggle,
}: ElementCheckboxListProps) {
  const elementResponse = use(elementPromise)
  const elementList = elementResponse?.data?.results ?? []

  if (elementList.length === 0) {
    return (
      <span className="col-span-2 my-auto text-center text-xs">
        등록된 단품 데이터가 없습니다.
      </span>
    )
  }

  return (
    <>
      {elementList.map((el) => {
        const isChecked = selectedIds.includes(el.id)
        return (
          <label
            key={el.id}
            className="flex cursor-pointer items-center gap-2 rounded px-1.5 py-1 hover:bg-neutral-50"
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => onToggle(el.id)}
              className="accent-black-primary"
            />
            <span className="truncate text-xs">
              {el.name} (ID: {el.id})
            </span>
          </label>
        )
      })}
    </>
  )
}
