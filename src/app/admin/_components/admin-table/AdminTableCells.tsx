import { cn } from '@/lib/cn'
import { formatDate, getTypeStyles } from '@/app/admin/_utils'
import { PRODUCT_TYPE_LABELS, TYPE_LABELS } from '@/app/admin/_constants/labels'

interface AdminTableCellProps {
  slot?: number
  children?: React.ReactNode
  className?: string
}

/**
 * 기본 데이터 셀
 */
export const AdminTableCell = ({
  slot,
  children,
  className,
}: AdminTableCellProps) => (
  <div
    style={{ gridColumn: slot }}
    className={cn('p-3 text-center text-sm md:p-4 md:text-base', className)}
  >
    {children}
  </div>
)

/**
 * 첫 번째 열 전용 셀
 */
export const AdminFirstCell = ({
  children,
  className,
}: AdminTableCellProps) => (
  <div
    style={{ gridColumn: 1 }}
    className={cn(
      'text-black-primary p-3 text-left text-sm font-bold md:p-4 md:text-base',
      className
    )}
  >
    {children}
  </div>
)

/**
 * 타입(카테고리) 배지 셀
 */
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
        'inline-flex rounded-lg px-2 py-0.5 text-xs font-bold transition-colors md:px-2.5 md:py-1 md:text-sm',
        getTypeStyles(type)
      )}
    >
      {PRODUCT_TYPE_LABELS[type] || TYPE_LABELS[type] || type}
    </span>
  </AdminTableCell>
)

/**
 * 날짜 표시 셀
 */
export const AdminDateCell = ({
  slot,
  date,
}: {
  slot: number
  date: string
}) => (
  <AdminTableCell slot={slot} className="text-gray-primary text-xs md:text-sm">
    {formatDate(date)}
  </AdminTableCell>
)
