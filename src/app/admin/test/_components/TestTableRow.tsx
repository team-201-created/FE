'use client'

import { AdminTableRow } from '@/app/admin/_components'
import { useModalStore } from '@/store/useModalStore'
import { getTestDetailAction } from '../_actions/testActions'
import { TestPreviewModal } from '../create/_components/TestPreviewModal'
import type { TestFormData } from '../create/_types'

interface TestTableRowProps {
  testId: number
  children: React.ReactNode
}

export function TestTableRow({ testId, children }: TestTableRowProps) {
  const { openModal, closeModal, openAlert } = useModalStore()

  const handleClick = async () => {
    const result = await getTestDetailAction(testId)

    if (!result.success || !result.data) {
      openAlert({
        type: 'danger',
        title: '조회 실패',
        content: result.message ?? '테스트 정보를 불러오는데 실패했습니다.',
        confirmText: '확인',
      })
      return
    }

    const formData: TestFormData = {
      name: result.data.name,
      description: result.data.description ?? '',
      profiling_type: result.data.profiling_type,
      questions: result.data.questions.map((q, idx) => ({
        key: q.id.toString(),
        question_key: q.question_key,
        question_text: q.question_text,
        selection_type: q.selection_type,
        is_required: q.is_required,
        sort_order: idx + 1,
        options: q.options.map((o, oIdx) => ({
          key: o.id.toString(),
          answer_option_key: o.answer_option_key,
          answer_option_text: o.answer_option_text,
          sort_order: oIdx + 1,
        })),
      })),
    }

    openModal(<TestPreviewModal formData={formData} onClose={closeModal} />)
  }

  return <AdminTableRow onClick={handleClick}>{children}</AdminTableRow>
}
