'use client'

import Button from '@/components/common/Button'
import TrashIcon from '@/assets/icons/trash.svg'
import { deleteCategoryAction } from '@/app/admin/category/_lib/categoryAction'
import { useModalStore } from '@/store/useModalStore'

interface CategoryDeleteButtonProps {
  categoryId: number
}

export function CategoryDeleteButton({
  categoryId,
}: CategoryDeleteButtonProps) {
  const { openAlert, closeModal } = useModalStore()

  const handleDelete = async () => {
    openAlert({
      type: 'danger',
      title: '카테고리 삭제',
      content: '해당 카테고리를 정말 삭제하시겠습니까?',
      confirmText: '삭제',
      onConfirm: async () => {
        try {
          const result = await deleteCategoryAction(categoryId)
          if (result.success) {
            closeModal()
          } else {
            alert('삭제에 실패했습니다.')
          }
        } catch {
          alert('삭제 중 오류가 발생했습니다.')
        }
      },
    })
  }

  return (
    <Button color="none" size="w32h32" rounded="sm" onClick={handleDelete}>
      <TrashIcon
        width={16}
        height={16}
        className="hover:text-danger text-gray-400 transition-colors"
      />
    </Button>
  )
}
