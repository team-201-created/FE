'use client'

import { use } from 'react'
import { AdminSelect } from '@/app/admin/_components/AdminSelect'
import type { AdminCategoryListResponse } from '@/app/admin/category/_types/AdminCategoryType'

interface CategorySelectWrapperProps {
  categoryPromise: Promise<AdminCategoryListResponse | null>
  value: string
  onChange: (value: string) => void
  placeholder: string
}

export function CategorySelectWrapper({
  categoryPromise,
  value,
  onChange,
  placeholder,
}: CategorySelectWrapperProps) {
  const res = use(categoryPromise)
  const options =
    res?.data.categories
      .flatMap((c) => c.children)
      .map((c) => ({ label: c.name.kr, value: String(c.category_id) })) ?? []

  return (
    <AdminSelect
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      width="w-full"
    />
  )
}
