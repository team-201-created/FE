'use client'

import Button from '@/components/common/Button'
import TrashIcon from '@/assets/icons/trash.svg'
import { deleteProductAction } from '../_lib/productActions'
import { useModalStore } from '@/store/useModalStore'
import { ProductTabId } from '../_types/AdminProductType'

interface ProductDeleteButtonProps {
  type: ProductTabId
  id: number
}

export function ProductDeleteButton({ type, id }: ProductDeleteButtonProps) {
  const { openAlert, closeAll } = useModalStore()

  const handleDelete = async () => {
    openAlert({
      type: 'danger',
      title: '상품 삭제',
      content: `해당 상품을 정말 삭제하시겠습니까?`,
      confirmText: '삭제',
      onConfirm: async () => {
        const result = await deleteProductAction(type, id)
        if (result.success) {
          closeAll()
        } else {
          openAlert({
            type: 'danger',
            title: result.message ?? '삭제 실패',
            content: result.reason ?? '상품 삭제에 실패했습니다.',
            confirmText: '확인',
            onConfirm: () => {
              closeAll()
            },
          })
        }
      },
    })
  }

  return (
    <Button
      color="none"
      size="w32h32"
      rounded="sm"
      onClick={(e) => {
        e.stopPropagation()
        handleDelete()
      }}
    >
      <TrashIcon
        width={16}
        height={16}
        className="hover:text-danger text-gray-400 transition-colors"
      />
    </Button>
  )
}
