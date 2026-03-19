import {
  AdminTableRow,
  AdminTableCell,
  AdminDateCell,
  AdminFirstCell,
  AdminTypeCell,
} from '@/app/admin/_components'
// import { RecommendDeleteButton } from '../_components/RecommendDeleteButton' // TODO: DELETE API 미개발, 추후 활성화
import { RecommendStatusCell } from '../_components/RecommendStatusCell'
import {
  BlendMapsItemResponse,
  RecommendTabProps,
} from '@/app/admin/recommend/_types'

export const BlendMapsTab = ({
  data,
}: RecommendTabProps<BlendMapsItemResponse>) => {
  return (
    <>
      {data.map((row) => (
        <AdminTableRow key={row.id}>
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
            {/* <RecommendDeleteButton tabId="blend-maps" id={row.id} /> TODO: DELETE API 미개발, 추후 활성화 */}
          </AdminTableCell>
        </AdminTableRow>
      ))}
    </>
  )
}
