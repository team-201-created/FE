'use client'

import React from 'react'
import Button from '@/components/common/Button'
import TrashIcon from '@/assets/icons/trash.svg'
import { deleteTestAction } from '../_actions/testActions'
import { useModalStore } from '@/store/useModalStore'

interface TestDeleteButtonProps {
  testId: number
}

export function TestDeleteButton({ testId }: TestDeleteButtonProps) {
  const { openAlert, closeAll } = useModalStore()

  const handleDelete = async () => {
    openAlert({
      type: 'danger',
      title: '테스트 삭제',
      content: '해당 테스트를 삭제하시겠습니까?',
      confirmText: '삭제',
      onConfirm: async () => {
        const result = await deleteTestAction(testId)
        if (result.success) {
          closeAll()
        } else {
          openAlert({
            type: 'danger',
            title: result.message ?? '삭제 실패',
            content: result.reason ?? '테스트 삭제에 실패했습니다.',
            confirmText: '확인',
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
