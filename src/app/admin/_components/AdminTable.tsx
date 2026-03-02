'use client'

import { cn } from '@/lib/cn'

interface AdminTableProps {
  headers: { label: string; align?: 'left' | 'center' | 'right' }[]
  children: React.ReactNode
}

const TABLE_GRID_LAYOUT = 'grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr_80px]'

interface AdminTableCellProps {
  slot: number
  children: React.ReactNode
  className?: string
}

// 슬롯 번호(1~7)에 따른 그리드 위치를 지정
export const AdminTableCell = ({
  slot,
  children,
  className,
}: AdminTableCellProps) => (
  <div
    style={{ gridColumn: slot }}
    className={cn(
      'p-4',
      slot === 1
        ? 'text-black-primary px-6 text-left text-[16px] font-bold'
        : 'text-center text-[14px]',
      className
    )}
  >
    {children}
  </div>
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
      'border-gray-white grid h-full items-center border-b transition-colors hover:bg-neutral-50/50',
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
