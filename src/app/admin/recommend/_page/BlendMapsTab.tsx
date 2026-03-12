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
  BlendMapsItemResponse,
  RecommendTabProps,
} from '@/app/admin/recommend/_types'

export const BlendMapsTab = ({
  data,
  onTogglePublish,
}: RecommendTabProps<BlendMapsItemResponse>) => {
  return (
    <>
      {data.map((row) => (
        <AdminTableRow key={row.id}>
          <AdminFirstCell>{row.id}</AdminFirstCell>

          <AdminTypeCell slot={2} type={row.input_type} />

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
            <RecommendDeleteButton tabId="blend-maps" id={row.id} />
          </AdminTableCell>
        </AdminTableRow>
      ))}
    </>
  )
}
