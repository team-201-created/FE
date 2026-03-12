'use client'

import {
  AdminTableRow,
  AdminTableCell,
  AdminDateCell,
  AdminFirstCell,
  AdminStatusCell,
} from '@/app/admin/_components'
import { RecommendDeleteButton } from '../_components/RecommendDeleteButton'
import {
  ProductMapsItemResponse,
  RecommendTabProps,
} from '@/app/admin/recommend/_types'

export const ProductMapsTab = ({
  data,
  onTogglePublish,
}: RecommendTabProps<ProductMapsItemResponse>) => {
  return (
    <>
      {data.map((row) => (
        <AdminTableRow key={row.id}>
          <AdminFirstCell>{row.id}</AdminFirstCell>

          <AdminStatusCell
            slot={3}
            status={row.publish_status}
            onClick={
              onTogglePublish ? () => onTogglePublish(row.id) : undefined
            }
          />

          <AdminTableCell slot={4} />
          <AdminDateCell slot={5} date={row.created_at} />
          <AdminDateCell slot={6} date={row.updated_at} />
          <AdminTableCell slot={7}>
            <RecommendDeleteButton tabId="product-maps" id={row.id} />
          </AdminTableCell>
        </AdminTableRow>
      ))}
    </>
  )
}
