'use client'

import {
  AdminFilterBar,
  AdminListCard,
  AdminPageHeader,
  AdminTable,
  AdminTableRow,
  AdminTableCell,
  AdminFirstCell,
} from '@/app/admin/_components'
import Button from '@/components/common/Button'
import PenIcon from '@/assets/icons/pen.svg'
import {
  CATEGORY_MOCK_DATA,
  CATEGORY_TABLE_HEADERS,
  CategoryData,
} from '@/constants/admin'

export default function CategoryAdminPage() {
  return (
    <AdminListCard>
      <AdminPageHeader title="카테고리 관리" buttonText="카테고리 등록" />

      <AdminFilterBar
        searchPlaceholder="카테고리명 검색"
        filterOptions={[
          { label: '전체', value: 'all' },
          { label: '사용중', value: 'active' },
          { label: '미사용', value: 'inactive' },
        ]}
      />

      <AdminTable headers={CATEGORY_TABLE_HEADERS}>
        {CATEGORY_MOCK_DATA.map((row: CategoryData) => (
          <AdminTableRow key={row.id}>
            <AdminFirstCell>{row.name}</AdminFirstCell>

            <AdminTableCell slot={7} className="flex justify-center">
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
