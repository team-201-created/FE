'use client'

import React, { Suspense } from 'react'
import {
  AdminSearchBar,
  AdminListCard,
  AdminPageHeader,
  AdminTable,
  AdminTableError,
  AdminTableLoading,
} from '@/app/admin/_components'
import { TEST_TABLE_HEADERS } from '@/constants/admin'
import { useRouter, useSearchParams } from 'next/navigation'
import { FILTER_OPTIONS } from '@/app/admin/test/_constants'
import { ErrorBoundary } from 'react-error-boundary'

import { useAdminTable } from '@/app/admin/_hooks/useAdminTable'

interface TestAdminContentProps {
  children: React.ReactNode
}

export default function TestAdminContent({ children }: TestAdminContentProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { searchTerm, setSearchTerm, onFilterChange } = useAdminTable({
    searchDelay: 300,
  })

  const handleCreateTest = () => {
    router.push('/admin/test/create')
  }

  return (
    <AdminListCard>
      <AdminPageHeader
        title="테스트 목록"
        buttonText="테스트 등록"
        onButtonClick={handleCreateTest}
      />

      <AdminSearchBar
        searchValue={searchTerm}
        searchPlaceholder="테스트명 검색"
        filterOptions={FILTER_OPTIONS}
        onSearchChange={setSearchTerm}
        onFilterChange={(val) => onFilterChange('profiling_type', val)}
      />

      <AdminTable headers={TEST_TABLE_HEADERS}>
        <ErrorBoundary fallback={<AdminTableError />}>
          <Suspense
            key={`${searchParams.toString()}`}
            fallback={<AdminTableLoading />}
          >
            {children}
          </Suspense>
        </ErrorBoundary>
      </AdminTable>
    </AdminListCard>
  )
}
