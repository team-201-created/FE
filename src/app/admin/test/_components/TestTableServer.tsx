import React from 'react'
import {
  AdminTableCell,
  AdminFirstCell,
  AdminDateCell,
  AdminTypeCell,
  AdminTableEmpty,
  AdminTableError,
  AdminPagination,
  AdminPageGuard,
} from '@/app/admin/_components'
import { fetchAdminTests } from '../_api/adminFetchTest'
import { TestStatusCell } from './TestStatusCell'
import { TestTableRow } from './TestTableRow'
import { TestDeleteButton } from './TestDeleteButton'
import { TestEditButton } from './TestEditButton'

interface TestTableServerProps {
  searchParams: {
    page?: string
    size?: string
    q?: string
    profiling_type?: string
    publish_status?: string
  }
}

export async function TestTableServer({ searchParams }: TestTableServerProps) {
  const currentPage = Math.max(1, Number(searchParams.page) || 1)
  const pageSize = 10

  let tests: any[] = []
  let totalPages = 1

  try {
    const response = await fetchAdminTests({
      page: currentPage,
      size: pageSize,
      profiling_type: searchParams.profiling_type,
      publish_status: searchParams.publish_status,
      search: searchParams.q,
    })
    tests = response?.data?.results || []
    totalPages = response?.data?.total_pages ?? 1
  } catch {
    if (currentPage > 1) return <AdminPageGuard currentPage={currentPage} />
    return <AdminTableError />
  }

  if (!tests.length) {
    if (currentPage > 1) return <AdminPageGuard currentPage={currentPage} />
    return <AdminTableEmpty />
  }

  return (
    <>
      {tests.map((test) => (
        <TestTableRow key={test.id} testId={test.id}>
          <AdminFirstCell>{test.name}</AdminFirstCell>

          <AdminTypeCell slot={2} type={test.profiling_type} />

          <TestStatusCell testId={test.id} status={test.publish_status} />

          <AdminDateCell slot={5} date={test.created_at} />

          <AdminDateCell slot={6} date={test.updated_at} />

          <AdminTableCell slot={7}>
            <div className="flex items-center gap-1">
              <TestEditButton testId={test.id} />
              <TestDeleteButton testId={test.id} />
            </div>
          </AdminTableCell>
        </TestTableRow>
      ))}

      <AdminPagination currentPage={currentPage} totalPages={totalPages} />
    </>
  )
}
