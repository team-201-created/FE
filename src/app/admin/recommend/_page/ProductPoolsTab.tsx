'use client'

import {
  AdminTableRow,
  AdminTableCell,
  AdminDateCell,
  AdminFirstCell,
  AdminStatusCell,
  AdminTypeCell,
} from '@/app/admin/_components'
import { RecommendDeleteButton } from '../_components/RecommendDeleteButton'
import {
  ProductPoolsItemResponse,
  RecommendTabProps,
} from '@/app/admin/recommend/_types'

export const ProductPoolsTab = ({
  data,
  onTogglePublish,
}: RecommendTabProps<ProductPoolsItemResponse>) => {
  return (
    <>
      {data.map((row) => (
        <AdminTableRow key={row.id}>
          <AdminFirstCell>{row.product_count}개</AdminFirstCell>

          <AdminTypeCell slot={2} type={row.product_type} />

          <AdminStatusCell
            slot={3}
            status={row.adoption_status === 'ADOPTED' ? 'ADOPTED' : 'UNADOPTED'}
            trueLabel="채택"
            falseLabel="미채택"
            onClick={
              onTogglePublish ? () => onTogglePublish(row.id) : undefined
            }
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
