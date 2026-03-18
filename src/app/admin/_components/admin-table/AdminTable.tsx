import React from 'react'
import { cn } from '@/lib/cn'
import { AdminTableHeader } from '@/constants/admin'
import { TABLE_GRID_LAYOUT } from './AdminTable.constants'

export * from './AdminTableCells'
export * from './AdminTableSkeleton'
export * from './AdminStatusCell'

interface AdminTableProps {
  headers: AdminTableHeader[]
  children: React.ReactNode
}

/**
 * 테이블 메인 뼈대
 */
export const AdminTable = ({ headers, children }: AdminTableProps) => (
  <div className="w-full overflow-x-auto text-sm">
    <div className="min-w-[800px]">
      <div
        className={cn(
          'bg-gray-white text-black-secondary border-gray-light grid items-center border-b',
          TABLE_GRID_LAYOUT
        )}
      >
        {headers.map((header, idx) =>
          header.label ? (
            <div
              key={header.label || idx}
              className={cn(
                'p-3 text-xs font-semibold md:p-4 md:text-sm',
                idx === 0 ? 'px-4 text-left md:px-6' : 'text-center'
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
  </div>
)

/**
 * 테이블 행(Row)
 */
export const AdminTableRow = ({
  children,
  className,
  type = 'default',
}: {
  children: React.ReactNode
  className?: string
  type?: 'default' | 'product'
}) => (
  <div
    className={cn(
      'border-gray-white grid cursor-pointer items-center border-b transition-colors hover:bg-neutral-100',
      type === 'product' ? 'min-h-[112px]' : 'min-h-[72px]',
      TABLE_GRID_LAYOUT,
      className
    )}
  >
    {children}
  </div>
)

/**
 * 에러 상태
 */
export const AdminTableError = ({
  message = '데이터를 불러오는 중 문제가 발생했습니다.',
}: {
  message?: string
}) => (
  <div className="text-danger flex w-full justify-center py-20 text-center font-medium">
    {message}
  </div>
)

/**
 * 데이터 없음 상태
 */
export const AdminTableEmpty = ({
  message = '등록된 데이터가 없습니다.',
}: {
  message?: string
}) => (
  <div className="flex w-full justify-center py-20 text-center font-medium">
    {message}
  </div>
)
