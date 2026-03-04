'use client'

import { cn } from '@/lib/cn'
import {
  AdminFilterBar,
  AdminListCard,
  AdminPageHeader,
  AdminTable,
  AdminTableRow,
  AdminTableCell,
} from '@/app/admin/_components'
import { TEST_TABLE_HEADERS } from '@/constants/admin'
import { useRouter } from 'next/navigation'
import { useTestList } from '@/app/admin/test/_hooks'
import {
  getStatusStyles,
  getTypeStyles,
  formatDate,
} from '@/app/admin/test/_utils'
import TrashIcon from '@/assets/icons/trash.svg'
import Button from '@/components/common/Button'
import { FILTER_OPTIONS, TYPE_LABELS } from '@/app/admin/test/_constants'

export default function TestAdminPage() {
  const router = useRouter()
  const { tests, handleTogglePublish } = useTestList()

  const handleCreateTest = () => {
    router.push('/admin/test/create')
  }

  return (
    <AdminListCard>
      <AdminPageHeader
        title="테스트 목록"
        buttonText="테스트 등록"
        onButtonClick={handleCreateTest}
      />

      <AdminFilterBar
        searchPlaceholder="테스트명 검색"
        filterOptions={FILTER_OPTIONS}
      />

      <AdminTable headers={TEST_TABLE_HEADERS}>
        {tests.map((row) => (
          <AdminTableRow key={row.id}>
            <AdminTableCell slot={1}>{row.name}</AdminTableCell>

            <AdminTableCell slot={2}>
              <span
                className={cn(
                  'inline-flex rounded-lg px-2.5 py-1 text-[11px] font-bold transition-colors',
                  getTypeStyles(row.profiling_type)
                )}
              >
                {TYPE_LABELS[row.profiling_type] || row.profiling_type}
              </span>
            </AdminTableCell>

            <AdminTableCell slot={3} className="font-bold">
              <button
                type="button"
                onClick={() => handleTogglePublish(row.id)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold transition-all active:scale-95',
                  getStatusStyles(row.publish_status)
                )}
              >
                <div
                  className={cn(
                    'h-1.5 w-1.5 rounded-full',
                    row.publish_status === 'PUBLISHED'
                      ? 'bg-status-success-text'
                      : 'bg-status-neutral-text'
                  )}
                />
                {row.publish_status === 'PUBLISHED' ? '발행' : '미 발행'}
              </button>
            </AdminTableCell>

            <AdminTableCell slot={4} className="text-black-secondary">
              -
            </AdminTableCell>

            <AdminTableCell slot={5} className="text-gray text-[13px]">
              {formatDate(row.created_at)}
            </AdminTableCell>

            <AdminTableCell slot={6} className="text-gray text-[13px]">
              {formatDate(row.updated_at)}
            </AdminTableCell>

            <AdminTableCell slot={7}>
              <Button color="none" size="w32h32" rounded="sm">
                <TrashIcon width={16} height={16} />
              </Button>
            </AdminTableCell>
          </AdminTableRow>
        ))}
      </AdminTable>
    </AdminListCard>
  )
}
