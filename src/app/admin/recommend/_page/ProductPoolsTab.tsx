'use client'

import {
  AdminTableRow,
  AdminTableCell,
  AdminDateCell,
  AdminFirstCell,
  AdminTypeCell,
} from '@/app/admin/_components'
import { RecommendDeleteButton } from '../_components/RecommendDeleteButton'
import { RecommendStatusCell } from '../_components/RecommendStatusCell'
import {
  ProductPoolsItemResponse,
  RecommendTabProps,
} from '@/app/admin/recommend/_types'

export const ProductPoolsTab = ({
  data,
}: RecommendTabProps<ProductPoolsItemResponse>) => {
  return (
    <>
      {data.map((row) => (
        <AdminTableRow key={row.id}>
          <AdminFirstCell>{row.product_count}개</AdminFirstCell>

          <AdminTypeCell slot={2} type={row.product_type} />

          <RecommendStatusCell
            id={row.id}
            tabId="product-pools"
            status={row.adoption_status}
            trueLabel="채택"
            falseLabel="미채택"
          />

          <AdminTableCell slot={4} />
          <AdminDateCell slot={5} date={row.created_at} />
          <AdminDateCell slot={6} date={row.updated_at} />
          <AdminTableCell slot={7}>
            <RecommendDeleteButton tabId="product-pools" id={row.id} />
          </AdminTableCell>
        </AdminTableRow>
      ))}
    </>
  )
}
