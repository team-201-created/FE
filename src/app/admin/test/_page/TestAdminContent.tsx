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
import { cn } from '@/lib/cn'
import { useRouter } from 'next/navigation'
import { FILTER_OPTIONS } from '@/app/admin/_constants/labels'
import { ErrorBoundary } from 'react-error-boundary'
import { useAdminTable } from '@/app/admin/_hooks/useAdminTable'

interface TestAdminContentProps {
  children: React.ReactNode
  searchParams: { [key: string]: string | undefined }
}

export default function TestAdminContent({
  children,
  searchParams,
}: TestAdminContentProps) {
  const router = useRouter()

  const { searchTerm, setSearchTerm, onFilterChange, isPending } =
    useAdminTable({
      searchDelay: 300,
    })

  const handleCreateTest = () => {
    router.push('/admin/test/create')
  }

  return (
    <AdminListCard className={cn(isPending && 'pointer-events-none')}>
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
            key={JSON.stringify(searchParams)}
            fallback={<AdminTableLoading />}
          >
            {children}
          </Suspense>
        </ErrorBoundary>
      </AdminTable>
    </AdminListCard>
  )
}
