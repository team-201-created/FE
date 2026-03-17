'use client'

import { useOptimistic, useTransition } from 'react'
import { AdminStatusCell } from './admin-table/AdminTable'
import { useModalStore } from '@/store/useModalStore'
import { getNextStatus } from '@/app/admin/_utils'

interface AdminStatusToggleCellProps {
  id: number | string
  status: string
  slot: number
  onToggle: (nextStatus: any) => Promise<{ success: boolean }>
  trueLabel?: string
  falseLabel?: string
}

export function AdminStatusToggleCell({
  status,
  slot,
  onToggle,
  trueLabel,
  falseLabel,
}: AdminStatusToggleCellProps) {
  const [isPending, startTransition] = useTransition()
  const { openAlert } = useModalStore()

  const [optimisticStatus, addOptimisticStatus] = useOptimistic(
    status,
    (_, newStatus: string) => newStatus
  )

  const handleToggle = () => {
    const nextStatus = getNextStatus(status)
    if (!nextStatus) return

    startTransition(async () => {
      addOptimisticStatus(nextStatus)

      const result = await onToggle(nextStatus)

      if (!result.success) {
        openAlert({
          type: 'danger',
          title: '오류',
          content: '상태 변경에 실패했습니다.',
          confirmText: '확인',
        })
      }
    })
  }

  return (
    <AdminStatusCell
      slot={slot}
      status={optimisticStatus as any}
      trueLabel={trueLabel}
      falseLabel={falseLabel}
      onClick={handleToggle}
      isPending={isPending}
    />
  )
}
