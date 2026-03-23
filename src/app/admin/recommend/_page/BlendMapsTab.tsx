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
  BlendMapsItemResponse,
  RecommendTabProps,
} from '@/app/admin/recommend/_types'
import { useModalStore } from '@/store/useModalStore'
import { RecommendDetailModal } from './RecommendDetailModal'

export const BlendMapsTab = ({
  data,
}: RecommendTabProps<BlendMapsItemResponse>) => {
  const { openModal } = useModalStore()

  return (
    <>
      {data.map((row) => (
        <AdminTableRow
          key={row.id}
          onClick={() =>
            openModal(<RecommendDetailModal tab="blend-maps" id={row.id} />)
          }
        >
          <AdminFirstCell>{row.id}</AdminFirstCell>

          <AdminTypeCell slot={2} type={row.input_type} />

          <RecommendStatusCell
            id={row.id}
            tabId="blend-maps"
            status={row.publish_status}
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
