'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/cn'
import {
  AdminListCard,
  AdminPageHeader,
  AdminTable,
  AdminTableRow,
  AdminTableCell,
  AdminFilterBar,
  AdminTabGroup,
} from '@/app/admin/_components'
import {
  RECOMMEND_MOCK_DATA,
  RECOMMEND_TABLE_HEADERS,
  RecommendData,
} from '@/constants/admin'
import Button from '@/components/common/Button'
import TrashIcon from '@/assets/icons/trash.svg' // 기존 trash 아이콘이 있다고 가정하거나 혹은 PenIcon 자리 대체

const RECOMMEND_TABS = [
  { id: 'SCENT_MAP', label: '향조합 추천맵' },
  { id: 'PRODUCT_CANDIDATES', label: '제품 후보군' },
  { id: 'PRODUCT_MAP', label: '제품 추천맵' },
]

export default function RecommendAdminPage() {
  const [activeTab, setActiveTab] = useState('SCENT_MAP')

  const activeTabLabel =
    RECOMMEND_TABS.find((t) => t.id === activeTab)?.label || ''

  return (
    <AdminListCard>
      <AdminPageHeader title={`${activeTabLabel} 목록`} buttonText={'등록'} />
      <AdminFilterBar
        searchPlaceholder="검색"
        filterOptions={[{ label: '전체', value: 'all' }]}
      />

      <AdminTabGroup
        tabs={RECOMMEND_TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <AdminTable headers={RECOMMEND_TABLE_HEADERS}>
        {RECOMMEND_MOCK_DATA.map((row: RecommendData) => (
          <AdminTableRow key={row.id}>
            <AdminTableCell slot={1} className="text-lg font-bold">
              {row.productCount}
            </AdminTableCell>

            <AdminTableCell slot={2}>
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold transition-colors',
                  row.status === '노출'
                    ? 'bg-status-success-bg text-status-success-text'
                    : 'bg-status-neutral-bg text-status-neutral-text'
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

            <AdminTableCell slot={4} className="text-gray">
              {row.createdAt}
            </AdminTableCell>

            <AdminTableCell slot={5} className="text-gray">
              {row.updatedAt}
            </AdminTableCell>

            <AdminTableCell slot={7}>
              <Button color="none" size="w32h32" rounded="sm">
                <TrashIcon
                  width={16}
                  height={16}
                  className="hover:text-red-500"
                />
              </Button>
            </AdminTableCell>
          </AdminTableRow>
        ))}
      </AdminTable>
    </AdminListCard>
  )
}
