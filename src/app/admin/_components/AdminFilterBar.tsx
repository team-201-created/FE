'use client'

import { useState } from 'react'
import Input from '@/components/common/Input'
import AdminSearchIcon from '@/assets/icons/adminSearch.svg'
import { AdminSelect } from './AdminSelect'

interface AdminFilterBarProps {
  searchPlaceholder?: string
  filterOptions?: { label: string; value: string }[]
  onSearchChange?: (val: string) => void
  onFilterChange?: (val: string) => void
}

export const AdminFilterBar = ({
  searchPlaceholder = '검색',
  filterOptions,
  onSearchChange,
  onFilterChange,
}: AdminFilterBarProps) => {
  // 현재 선택된 필터 값 관리 (기본값: 첫 번째 옵션이 있다면 그 값)
  const [currentFilter, setCurrentFilter] = useState(
    filterOptions && filterOptions.length > 0 ? filterOptions[0].value : ''
  )

  const handleFilterChange = (val: string) => {
    setCurrentFilter(val)
    onFilterChange?.(val)
  }

  return (
    <div className="mb-6 flex gap-3">
      <div className="relative flex-1">
        <Input
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
          value={currentFilter}
          onChange={handleFilterChange}
          width="w-32"
        />
      )}
    </div>
  )
}
