'use client'

import { cn } from '@/lib/cn'
import { AdminTableCell } from './AdminTableCells'

interface AdminStatusCellProps {
  slot: number
  status: 'PUBLISHED' | 'UNPUBLISHED' | 'ADOPTED' | 'UNADOPTED'
  trueLabel?: string
  falseLabel?: string
  onClick?: () => void
  isPending?: boolean
}

/**
 * 상태 배지 셀
 */
export const AdminStatusCell = ({
  slot,
  status,
  trueLabel = '발행',
  falseLabel = '미발행',
  onClick,
  isPending,
}: AdminStatusCellProps) => {
  const isPublished = status === 'PUBLISHED' || status === 'ADOPTED'
  const content = (
    <>
      <div
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          isPublished ? 'bg-status-success-text' : 'bg-status-neutral-text'
        )}
      />
      {isPending ? '처리 중...' : isPublished ? trueLabel : falseLabel}
    </>
  )

  const statusClass = cn(
    'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all',
    isPublished
      ? 'bg-status-success-bg text-status-success-text'
      : 'bg-status-neutral-bg text-status-neutral-text',
    isPending && 'opacity-50'
  )

  return (
    <AdminTableCell slot={slot}>
      {onClick ? (
        <button
          type="button"
          onClick={onClick}
          disabled={isPending}
          className={cn(statusClass, !isPending && 'cursor-pointer')}
        >
          {content}
        </button>
      ) : (
        <div className={statusClass}>{content}</div>
      )}
    </AdminTableCell>
  )
}
