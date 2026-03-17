import React from 'react'
import {
  AdminTableRow,
  AdminTableCell,
  AdminFirstCell,
  AdminDateCell,
  AdminTypeCell,
  AdminTableEmpty,
  AdminPagination,
} from '@/app/admin/_components'
import { fetchAdminTests } from '../_api/adminFetchTest'
import { TestDeleteButton } from './TestDeleteButton'
import { TestStatusCell } from './TestStatusCell'

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

  const response = await fetchAdminTests({
    page: currentPage,
    size: pageSize,
    profiling_type: searchParams.profiling_type,
    publish_status: searchParams.publish_status,
    q: searchParams.q,
  })

  const tests = response?.data?.content || []
  const totalPages = response?.data?.total_pages ?? 1

  if (!tests.length && currentPage === 1) {
    return <AdminTableEmpty />
  }

  return (
    <>
      {tests.map((test) => (
        <AdminTableRow key={test.id}>
          <AdminFirstCell>{test.name}</AdminFirstCell>

          <AdminTypeCell slot={2} type={test.profiling_type} />

          <TestStatusCell testId={test.id} status={test.publish_status} />

          <AdminTableCell slot={4}>-</AdminTableCell>

          <AdminDateCell slot={5} date={test.created_at} />

          <AdminDateCell slot={6} date={test.updated_at} />

          <AdminTableCell slot={7}>
            <TestDeleteButton testId={test.id} />
          </AdminTableCell>
        </AdminTableRow>
      ))}

      <AdminPagination currentPage={currentPage} totalPages={totalPages} />
    </>
  )
}
