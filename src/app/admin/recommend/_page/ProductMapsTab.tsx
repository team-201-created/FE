'use client'

import {
  AdminTableRow,
  AdminTableCell,
  AdminDateCell,
  AdminFirstCell,
  AdminStatusCell,
} from '@/app/admin/_components'
import Button from '@/components/common/Button'
import TrashIcon from '@/assets/icons/trash.svg'
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
            onClick={() => onTogglePublish(row.id)}
          />

          <AdminTableCell slot={4} />
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
    </>
  )
}
