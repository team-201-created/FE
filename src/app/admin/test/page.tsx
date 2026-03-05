'use client'

import {
  AdminFilterBar,
  AdminListCard,
  AdminPageHeader,
  AdminTable,
  AdminTableRow,
  AdminTableCell,
  AdminFirstCell,
  AdminDateCell,
  AdminStatusCell,
  AdminTypeCell,
} from '@/app/admin/_components'
import { TEST_TABLE_HEADERS } from '@/constants/admin'
import { useRouter } from 'next/navigation'
import { useTestList } from '@/app/admin/test/_hooks'

import TrashIcon from '@/assets/icons/trash.svg'
import Button from '@/components/common/Button'
import { FILTER_OPTIONS } from '@/app/admin/test/_constants'

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
            <AdminFirstCell>{row.name}</AdminFirstCell>

            <AdminTypeCell slot={2} type={row.profiling_type} />

            <AdminStatusCell
              slot={3}
              status={row.publish_status}
              onClick={() => handleTogglePublish(row.id)}
            />

            <AdminTableCell slot={4} className="text-black-secondary">
              -
            </AdminTableCell>

            <AdminDateCell slot={5} date={row.created_at} />

            <AdminDateCell slot={6} date={row.updated_at} />

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
