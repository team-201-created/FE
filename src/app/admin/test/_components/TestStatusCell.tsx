'use client'

import { AdminStatusToggleCell } from '@/app/admin/_components'
import { toggleTestPublishAction } from '../_actions/testActions'

interface TestStatusCellProps {
  testId: number
  status: 'PUBLISHED' | 'UNPUBLISHED'
}

export function TestStatusCell({ testId, status }: TestStatusCellProps) {
  const handleToggle = (nextStatus: 'PUBLISHED' | 'UNPUBLISHED') =>
    toggleTestPublishAction(testId, nextStatus)

  return (
    <AdminStatusToggleCell
      id={testId}
      status={status}
      slot={3}
      onToggle={handleToggle}
    />
  )
}
