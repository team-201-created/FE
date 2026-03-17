import { cn } from '@/lib/cn'

import { TABLE_GRID_LAYOUT } from './AdminTable.constants'

/**
 * 테이블 스켈레톤
 */
export const AdminTableSkeletonRow = ({
  type = 'default',
}: {
  type?: 'default' | 'product'
}) => (
  <div
    className={cn(
      'border-gray-white grid animate-pulse items-center border-b',
      type === 'product' ? 'h-[112px]' : 'h-[72px]',
      TABLE_GRID_LAYOUT
    )}
  >
    <div className="p-3 md:p-4">
      {type === 'product' ? (
        <div className="flex items-center gap-3">
          <div className="h-20 w-20 rounded-lg bg-neutral-200" />
          <div className="h-4 w-32 rounded bg-neutral-200" />
        </div>
      ) : (
        <div className="h-4 w-3/4 rounded bg-neutral-200" />
      )}
    </div>

    {[2, 3, 4, 5, 6].map((slot) => (
      <div key={slot} className="flex justify-center p-3 md:p-4">
        <div
          className={cn(
            'rounded bg-neutral-100',
            slot === 3 ? 'h-6 w-20 rounded-full bg-neutral-50' : 'h-4 w-16'
          )}
        />
      </div>
    ))}

    <div className="flex justify-center p-3 text-center md:p-4">
      <div className="h-8 w-8 rounded bg-neutral-100" />
    </div>
  </div>
)

/**
 * 여러 개의 스켈레톤 행
 */
export const AdminTableLoading = ({
  rowCount = 10,
  type = 'default',
}: {
  rowCount?: number
  type?: 'default' | 'product'
}) => (
  <div className="flex flex-col">
    {Array.from({ length: rowCount }).map((_, idx) => (
      <AdminTableSkeletonRow key={idx} type={type} />
    ))}
  </div>
)
