'use client'

import Button from '@/components/common/Button'
import TrashIcon from '@/assets/icons/trash.svg'
import { deleteCategoryAction } from '@/app/admin/category/_lib/categoryAction'
import { useModalStore } from '@/store/useModalStore'
import type { RootCategory } from '@/app/admin/category/_types/AdminCategoryType'

interface CategoryDeleteButtonProps {
  rootCategory: RootCategory
  categoryId: number
}

export function CategoryDeleteButton({
  rootCategory,
  categoryId,
}: CategoryDeleteButtonProps) {
  const { openAlert, closeAll } = useModalStore()

  const handleDelete = async () => {
    openAlert({
      type: 'danger',
      title: '카테고리 삭제',
      content: '해당 카테고리를 정말 삭제하시겠습니까?',
      confirmText: '삭제',
      onConfirm: async () => {
        const result = await deleteCategoryAction(rootCategory, categoryId)
        if (result.success) {
          closeAll()
        } else {
          openAlert({
            type: 'danger',
            title: result.message ?? '카테고리 삭제 실패',
            content: result.reason ?? '카테고리 삭제에 실패했습니다.',
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
    <Button color="none" size="w32h32" rounded="sm" onClick={handleDelete}>
      <TrashIcon
        width={16}
        height={16}
        className="hover:text-danger text-gray-400 transition-colors"
      />
    </Button>
  )
}
