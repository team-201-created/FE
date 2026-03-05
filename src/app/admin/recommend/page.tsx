'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import {
  AdminListCard,
  AdminPageHeader,
  AdminTable,
  AdminTableRow,
  AdminTableCell,
  AdminFilterBar,
  AdminTabGroup,
  AdminDateCell,
  AdminFirstCell,
  AdminStatusCell,
  AdminTypeCell,
} from '@/app/admin/_components'
import { RECOMMEND_TABLE_HEADERS } from '@/constants/admin'
import Button from '@/components/common/Button'
import TrashIcon from '@/assets/icons/trash.svg'
import { useRecommendList } from './_hooks'
import { getTypeFirstTextColor } from '@/app/admin/test/_utils'
import { TEST_TYPE_TABS } from '@/app/admin/test/create/_constants'

const RECOMMEND_TABS = [
  { id: 'SCENT_MAP', label: '향조합 추천맵' },
  { id: 'PRODUCT_CANDIDATES', label: '제품 후보군' },
  { id: 'PRODUCT_MAP', label: '제품 추천맵' },
]

export default function RecommendAdminPage() {
  const [activeTab, setActiveTab] = useState('SCENT_MAP')
  const { data, handleTogglePublish, getRecommendList } = useRecommendList()

  const activeTabLabel =
    RECOMMEND_TABS.find((t) => t.id === activeTab)?.label || ''

  // 1. 처음 페이지에 들어왔을 때만 실행 (Mount)
  useEffect(() => {
    getRecommendList(activeTab)
  }, [getRecommendList]) // 초기 로드는 최초 1회만
  // 2. 사용자가 탭을 클릭했을 때 실행 (Event)
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    getRecommendList(tabId) // 클릭하는 순간 바로 데이터 요청!
  }

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
        onChange={handleTabChange}
      />
      <AdminTable headers={RECOMMEND_TABLE_HEADERS}>
        {data.map((row) => (
          <AdminTableRow key={row.id}>
            <AdminFirstCell>
              <span className={cn(getTypeFirstTextColor(row.input_type))}>
                {TEST_TYPE_TABS.find((t) => t.id === row.input_type)?.label ||
                  row.input_type}
              </span>
            </AdminFirstCell>

            <AdminTypeCell slot={2} type={row.input_type} />

            <AdminStatusCell
              slot={3}
              status={row.publish_status}
              onClick={() => handleTogglePublish(row.id, activeTab)}
            />
            <AdminDateCell slot={5} date={row.created_at} />
            <AdminDateCell slot={6} date={row.updated_at} />
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
