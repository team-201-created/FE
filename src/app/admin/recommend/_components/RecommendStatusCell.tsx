'use client'

import { AdminStatusToggleCell } from '@/app/admin/_components'
import { toggleRecommendStatusAction } from '../_actions/recommendActions'
import { RecommendTabId } from '../_types'

interface RecommendStatusCellProps {
  id: number
  tabId: RecommendTabId
  status: string
  trueLabel?: string
  falseLabel?: string
}

export function RecommendStatusCell({
  id,
  tabId,
  status,
  trueLabel,
  falseLabel,
}: RecommendStatusCellProps) {
  const handleToggle = (nextStatus: string) =>
    toggleRecommendStatusAction(tabId, id, nextStatus)

  return (
    <AdminStatusToggleCell
      id={id}
      status={status}
      slot={3}
      onToggle={handleToggle}
      trueLabel={trueLabel}
      falseLabel={falseLabel}
    />
  )
}
