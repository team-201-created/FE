'use client'

import {
  AdminTableRow,
  AdminTableCell,
  AdminDateCell,
  AdminFirstCell,
} from '@/app/admin/_components'
import { RecommendDeleteButton } from '../_components/RecommendDeleteButton'
import { RecommendStatusCell } from '../_components/RecommendStatusCell'
import {
  ProductMapsItemResponse,
  RecommendTabProps,
} from '@/app/admin/recommend/_types'
import { useModalStore } from '@/store/useModalStore'
import { RecommendDetailModal } from './RecommendDetailModal'

export const ProductMapsTab = ({
  data,
}: RecommendTabProps<ProductMapsItemResponse>) => {
  const { openModal } = useModalStore()

  return (
    <>
      {data.map((row) => (
        <AdminTableRow
          key={row.id}
          onClick={() =>
            openModal(<RecommendDetailModal tab="product-maps" id={row.id} />)
          }
        >
          <AdminFirstCell>{row.id}</AdminFirstCell>

          <RecommendStatusCell
            id={row.id}
            tabId="product-maps"
            status={row.publish_status}
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
