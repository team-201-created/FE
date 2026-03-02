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
import { TEST_MOCK_DATA, TEST_TABLE_HEADERS, TestData } from '@/constants/admin'
import PenIcon from '@/assets/icons/pen.svg'
import Button from '@/components/common/Button'

const getStatusStyles = (status: TestData['status']) => {
  switch (status) {
    case '노출':
      return 'bg-status-success-bg text-status-success-text'
    case '비노출':
    default:
      return 'bg-status-neutral-bg text-status-neutral-text'
  }
}

const getTypeStyles = (type: TestData['type']) => {
  switch (type) {
    case '취향':
      return 'bg-status-purple-bg text-status-purple-text'
    case '건강':
    default:
      return 'bg-status-info-bg text-status-info-text'
  }
}

export default function TestAdminPage() {
  return (
    <AdminListCard>
      <AdminPageHeader title="테스트 목록" buttonText="테스트 등록" />

      <AdminFilterBar
        searchPlaceholder="테스트명 검색"
        filterOptions={[
          { label: '전체', value: 'all' },
          { label: '취향', value: 'taste' },
          { label: '건강', value: 'wellness' },
          { label: '사진', value: 'picture' },
        ]}
      />

      <AdminTable headers={TEST_TABLE_HEADERS}>
        {TEST_MOCK_DATA.map((row: TestData) => (
          <AdminTableRow key={row.id}>
            <AdminTableCell slot={1}>{row.name}</AdminTableCell>

            <AdminTableCell slot={2}>
              <span
                className={cn(
                  'inline-flex rounded-lg px-2.5 py-1 text-[11px] font-bold transition-colors',
                  getTypeStyles(row.type)
                )}
              >
                {row.type}
              </span>
            </AdminTableCell>

            <AdminTableCell slot={3} className="font-bold">
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold transition-colors',
                  getStatusStyles(row.status)
                )}
              >
                <div
                  className={cn(
                    'h-1.5 w-1.5 rounded-full',
                    row.status === '노출'
                      ? 'bg-status-success-text'
                      : 'bg-status-neutral-text'
                  )}
                />
                {row.status}
              </span>
            </AdminTableCell>

            <AdminTableCell slot={4} className="text-black-secondary">
              {row.participants}
            </AdminTableCell>

            <AdminTableCell slot={5} className="text-gray">
              {row.createdAt}
            </AdminTableCell>

            <AdminTableCell slot={6} className="text-gray">
              {row.updatedAt}
            </AdminTableCell>

            <AdminTableCell slot={7}>
              <Button color="none" size="w32h32" rounded="sm">
                <PenIcon width={16} height={16} />
              </Button>
            </AdminTableCell>
          </AdminTableRow>
        ))}
      </AdminTable>
    </AdminListCard>
  )
}
