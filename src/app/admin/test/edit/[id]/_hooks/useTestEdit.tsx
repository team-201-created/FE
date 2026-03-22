'use client'

import { TestFormData } from '@/app/admin/test/create/_types'
import { updateTestAction } from '@/app/admin/test/_actions/testActions'
import { useTestForm } from '@/app/admin/test/_hooks/useTestForm'

export const useTestEdit = (testId: number, initialData: TestFormData) => {
  return useTestForm({
    initialData,
    onSave: (formData) =>
      updateTestAction(testId, {
        name: formData.name,
        description: formData.description,
        questions: formData.questions.map((q) => ({
          question_key: q.question_key,
          question_text: q.question_text,
          selection_type: q.selection_type,
          is_required: q.is_required,
          sort_order: q.sort_order,
          options: q.options.map((o) => ({
            answer_option_key: o.answer_option_key,
            answer_option_text: o.answer_option_text,
            sort_order: o.sort_order,
          })),
        })),
      }),
  })
}
