'use client'

import { useState } from 'react'
import {
  AdminFilterBar,
  AdminListCard,
  AdminPageHeader,
  AdminTable,
  AdminTableRow,
  AdminTableCell,
  AdminTabGroup,
  AdminFirstCell,
} from '@/app/admin/_components'
import {
  PRODUCT_MOCK_DATA,
  PRODUCT_TABLE_HEADERS,
  ProductData,
} from '@/constants/admin'
import Button from '@/components/common/Button'
import PenIcon from '@/assets/icons/pen.svg'

const PRODUCT_TABS = [
  { id: 'SINGLE', label: '단품' },
  { id: 'COMBO', label: '조합' },
]

export default function ProductAdminPage() {
  const [activeTab, setActiveTab] = useState('SINGLE')

  const activeTabLabel =
    PRODUCT_TABS.find((t) => t.id === activeTab)?.label || ''

  const filteredData = PRODUCT_MOCK_DATA.filter((row) =>
    activeTab === 'SINGLE' ? row.type === '단품' : row.type === '조합'
  )

  return (
    <AdminListCard>
      <AdminPageHeader
        title={`${activeTabLabel} 목록`}
        buttonText="상품 등록"
      />

      <AdminFilterBar
        searchPlaceholder="상품명 검색"
        filterOptions={[{ label: '전체', value: 'all' }]}
      />

      <AdminTabGroup
        tabs={PRODUCT_TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <AdminTable headers={PRODUCT_TABLE_HEADERS}>
        {filteredData.map((row: ProductData) => (
          <AdminTableRow key={row.id}>
            <AdminFirstCell>{row.name}</AdminFirstCell>

            <AdminTableCell
              slot={2}
              className="text-black-secondary font-medium"
            >
              {row.category}
            </AdminTableCell>

            <AdminTableCell
              slot={4}
              className="text-black-secondary font-medium"
            >
              {row.type}
            </AdminTableCell>

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
