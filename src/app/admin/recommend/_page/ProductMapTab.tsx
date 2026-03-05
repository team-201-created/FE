'use client'

import {
  AdminTableRow,
  AdminTableCell,
  AdminDateCell,
  AdminFirstCell,
  AdminStatusCell,
  AdminTypeCell,
} from '@/app/admin/_components'
import Button from '@/components/common/Button'
import TrashIcon from '@/assets/icons/trash.svg'
import { ProductMapItemResponse } from '@/app/admin/recommend/_types'

interface ProductMapTabProps {
  data: ProductMapItemResponse[]
  onTogglePublish: (id: number) => void
}

export const ProductMapTab = ({
  data,
  onTogglePublish,
}: ProductMapTabProps) => {
  return (
    <>
      {data.map((row) => (
        <AdminTableRow key={row.id}>
          <AdminFirstCell>{row.product_count}개</AdminFirstCell>

          <AdminTypeCell slot={2} type={row.product_type} />

          <AdminStatusCell
            slot={3}
            status={
              row.adoption_status === 'ADOPTED' ? 'PUBLISHED' : 'UNPUBLISHED'
            }
            trueLabel="채택"
            falseLabel="미채택"
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
