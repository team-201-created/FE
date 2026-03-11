'use client'

import { cn } from '@/lib/cn'
import { AdminTableHeader } from '@/constants/admin'
import { formatDate, getTypeStyles } from '@/app/admin/test/_utils'
import {
  PRODUCT_TYPE_LABELS,
  TYPE_LABELS,
} from '@/app/admin/test/_constants/testListLabels'

interface AdminTableProps {
  headers: AdminTableHeader[]
  children: React.ReactNode
}

const TABLE_GRID_LAYOUT = 'grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr_80px]'

interface AdminTableCellProps {
  slot?: number
  children?: React.ReactNode
  className?: string
}

// 슬롯 번호(2~7)에 따른 그리드 위치를 지정
export const AdminTableCell = ({
  slot,
  children,
  className,
}: AdminTableCellProps) => (
  <div
    style={{ gridColumn: slot }}
    className={cn('p-4 text-center text-[14px]', className)}
  >
    {children}
  </div>
)

// 첫 번째 열 Cell
export const AdminFirstCell = ({
  children,
  className,
}: AdminTableCellProps) => (
  <div
    style={{ gridColumn: 1 }}
    className={cn(
      'text-black-primary p-4 px-6 text-left text-[16px] font-bold',
      className
    )}
  >
    {children}
  </div>
)

export const AdminTypeCell = ({
  slot,
  type,
  className,
}: {
  slot: number
  type: string
  className?: string
}) => (
  <AdminTableCell
    slot={slot}
    className={cn('text-gray text-[13px]', className)}
  >
    <span
      className={cn(
        'inline-flex rounded-lg px-2.5 py-1 text-[11px] font-bold transition-colors',
        getTypeStyles(type)
      )}
    >
      {PRODUCT_TYPE_LABELS[type] || TYPE_LABELS[type] || type}
    </span>
  </AdminTableCell>
)

// 발행/미발행 Cell
export const AdminStatusCell = ({
  slot,
  status,
  trueLabel = '발행',
  falseLabel = '미발행',
  onClick,
}: {
  slot: number
  status: 'PUBLISHED' | 'UNPUBLISHED'
  trueLabel?: string
  falseLabel?: string
  onClick: () => void
}) => {
  const isPublished = status === 'PUBLISHED'
  return (
    <AdminTableCell slot={slot}>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold',
          isPublished
            ? 'bg-status-success-bg text-status-success-text'
            : 'bg-status-neutral-bg text-status-neutral-text'
        )}
      >
        <div
          className={cn(
            'h-1.5 w-1.5 rounded-full',
            isPublished ? 'bg-status-success-text' : 'bg-status-neutral-text'
          )}
        />
        {isPublished ? trueLabel : falseLabel}
      </button>
    </AdminTableCell>
  )
}

// 생성일시 or 수정일시 Cell
export const AdminDateCell = ({
  slot,
  date,
}: {
  slot: number
  date: string
}) => (
  <AdminTableCell slot={slot} className="text-gray text-[13px]">
    {formatDate(date)}
  </AdminTableCell>
)

// 테이블 행(Row)
export const AdminTableRow = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => (
  <div
    className={cn(
      'border-gray-white grid h-full cursor-pointer items-center border-b',
      TABLE_GRID_LAYOUT,
      className
    )}
  >
    {children}
  </div>
)

export const AdminTable = ({ headers, children }: AdminTableProps) => (
  <div className="w-full text-sm">
    <div
      className={cn(
        'bg-gray-white text-black-secondary border-gray-light grid items-center border-b',
        TABLE_GRID_LAYOUT
      )}
    >
      {headers.map((header, idx) =>
        // 라벨이 없으면 렌더링하지 않게
        header.label ? (
          <div
            key={header.label || idx}
            className={cn(
              'px-4 py-4 font-semibold',
              idx === 0 ? 'px-6 text-left' : 'text-center'
            )}
            style={{ gridColumn: idx + 1 }}
          >
            {header.label}
          </div>
        ) : null
      )}
    </div>
    <div className="flex flex-col">{children}</div>
  </div>
)

// 테이블 예외상황 처리 - 에러
export const AdminTableError = ({
  message = '데이터를 불러오는 중 문제가 발생했습니다.',
}: {
  message?: string
}) => (
  <div className="text-danger flex w-full justify-center py-20 text-center font-medium">
    {message}
  </div>
)

// 테이블 예외상황 처리 - 로딩
export const AdminTableLoading = ({
  message = '데이터를 불러오는 중입니다...',
}: {
  message?: string
}) => (
  <div className="flex w-full justify-center py-20 text-center">{message}</div>
)

// 테이블 예외상황 처리 - 빈 데이터
export const AdminTableEmpty = ({
  message = '등록된 데이터가 없습니다.',
}: {
  message?: string
}) => (
  <div className="flex w-full justify-center py-20 text-center font-medium">
    {message}
  </div>
)
