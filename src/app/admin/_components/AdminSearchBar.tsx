'use client'

import { useState } from 'react'
import Input from '@/components/common/Input'
import AdminSearchIcon from '@/assets/icons/adminSearch.svg'
import { AdminSelect } from './AdminSelect'

interface AdminFilterBarProps {
  searchValue?: string
  filterValue?: string
  searchPlaceholder?: string
  filterOptions?: { label: string; value: string }[]
  onSearchChange?: (val: string) => void
  onFilterChange?: (val: string) => void
}

export const AdminSearchBar = ({
  searchValue,
  filterValue,
  searchPlaceholder = '검색',
  filterOptions,
  onSearchChange,
  onFilterChange,
}: AdminFilterBarProps) => {
  // 내부 필터 값
  const [internalFilter, setInternalFilter] = useState('')

  // 외부 필터 값이 있으면 그것을 우선 사용
  const activeFilterValue =
    filterValue !== undefined ? filterValue : internalFilter

  const handleFilterChange = (val: string) => {
    setInternalFilter(val)
    onFilterChange?.(val)
  }

  return (
    <div className="mb-6 flex gap-3">
      <div className="relative flex-1">
        <Input
          value={searchValue}
          placeholder={searchPlaceholder}
          className="h-12 w-full rounded-xl border-neutral-200 bg-white pl-11 text-sm transition-all outline-none focus:border-violet-300"
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
        <div className="absolute top-1/2 left-4 -translate-y-1/2">
          <AdminSearchIcon width={20} height={20} />
        </div>
      </div>
      {filterOptions && (
        <AdminSelect
          options={filterOptions}
          value={activeFilterValue}
          onChange={handleFilterChange}
          width="w-32"
        />
      )}
    </div>
  )
}
