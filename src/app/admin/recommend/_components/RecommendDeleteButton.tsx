'use client'

import React from 'react'
import Button from '@/components/common/Button'
import TrashIcon from '@/assets/icons/trash.svg'
import { deleteRecommendAction } from '../_actions/recommendActions'
import { useModalStore } from '@/store/useModalStore'
import { RecommendTabId } from '../_types'

interface RecommendDeleteButtonProps {
  tabId: RecommendTabId
  id: number
}

export function RecommendDeleteButton({
  tabId,
  id,
}: RecommendDeleteButtonProps) {
  const { openAlert, closeModal } = useModalStore()

  const handleDelete = async () => {
    openAlert({
      type: 'danger',
      title: `${tabId === 'product-pools' ? '후보군' : '추천맵'} 삭제`,
      content: `선택한 ${tabId === 'product-pools' ? '후보군' : '추천맵'}을 삭제하시겠습니까?`,
      confirmText: '삭제',
      onConfirm: async () => {
        try {
          const result = await deleteRecommendAction(tabId, id)
          if (result.success) {
            closeModal()
          } else {
            alert('삭제에 실패했습니다.')
          }
        } catch (error) {
          console.error('Delete error:', error)
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
