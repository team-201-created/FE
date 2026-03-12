'use client'

import { AdminStatusCell } from '@/app/admin/_components'
import { toggleTestPublishAction } from '../_actions/testActions'
import { useTransition } from 'react'

interface TestStatusCellProps {
  testId: number
  status: 'PUBLISHED' | 'UNPUBLISHED'
}

export function TestStatusCell({ testId, status }: TestStatusCellProps) {
  const [isPending, startTransition] = useTransition()

  const handleToggle = () => {
    startTransition(async () => {
      const result = await toggleTestPublishAction(
        testId,
        status === 'PUBLISHED' ? 'UNPUBLISHED' : 'PUBLISHED'
      )
      if (result.success) {
        console.log('상태가 변경되었습니다.')
      } else {
        console.error('상태 변경에 실패했습니다.')
      }
    })
  }

  return <AdminStatusCell slot={3} status={status} onClick={handleToggle} />
}
