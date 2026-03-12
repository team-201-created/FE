import React from 'react'
import {
  AdminTableRow,
  AdminTableCell,
  AdminFirstCell,
  AdminDateCell,
  AdminTypeCell,
  AdminTableEmpty,
} from '@/app/admin/_components'
import { fetchAdminTests } from '../_api/adminFetchTest'
import { TestDeleteButton } from './TestDeleteButton'
import { TestStatusCell } from './TestStatusCell'

interface TestTableServerProps {
  searchParams: {
    q?: string
    profiling_type?: string
    publish_status?: string
  }
}

export async function TestTableServer({ searchParams }: TestTableServerProps) {
  const response = await fetchAdminTests()

  const allTests = response?.data?.content || []

  // 받아온 데이터를 기반으로 직접 필터링 (필요 시)
  const tests = allTests.filter((test) => {
    const matchesSearch = searchParams.q
      ? test.name.toLowerCase().includes(searchParams.q.toLowerCase())
      : true
    const matchesType = searchParams.profiling_type
      ? test.profiling_type === searchParams.profiling_type
      : true
    const matchesStatus = searchParams.publish_status
      ? test.publish_status === searchParams.publish_status
      : true
    return matchesSearch && matchesType && matchesStatus
  })

  if (!tests.length) {
    return <AdminTableEmpty />
  }

  return (
    <>
      {tests.map((test) => (
        <AdminTableRow key={test.id}>
          <AdminFirstCell>{test.name}</AdminFirstCell>

          <AdminTypeCell slot={2} type={test.profiling_type} />

          <TestStatusCell testId={test.id} status={test.publish_status} />

          <AdminTableCell slot={4} className="text-black-secondary">
            -
          </AdminTableCell>

          <AdminDateCell slot={5} date={test.created_at} />

          <AdminDateCell slot={6} date={test.updated_at} />

          <AdminTableCell slot={7}>
            <TestDeleteButton testId={test.id} />
          </AdminTableCell>
        </AdminTableRow>
      ))}
    </>
  )
}
