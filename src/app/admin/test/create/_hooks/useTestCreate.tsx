'use client'

import { useState } from 'react'
import { TestFormData } from '../_types'
import { DEFAULT_TEMPLATES } from '../_constants/presets'
import { createTestAction } from '../../_actions/testActions'
import { useTestForm } from '../../_hooks/useTestForm'

const generateId = (prefix: string) =>
  `${prefix}-${Math.random().toString(36).substring(2, 9)}`

export const useTestCreate = () => {
  const [initialData] = useState<TestFormData>(() => ({
    name: '',
    description: '',
    profiling_type: 'PREFERENCE',
    questions: (DEFAULT_TEMPLATES['PREFERENCE'] || []).map((q, idx) => ({
      ...q,
      key: generateId(q.question_key),
      sort_order: idx + 1,
      options: q.options.map((o) => ({
        ...o,
        key: generateId(o.answer_option_key),
      })),
    })),
  }))

  return useTestForm({
    initialData,
    onSave: (formData) =>
      createTestAction({
        name: formData.name,
        description: formData.description,
        profiling_type: formData.profiling_type,
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
    resetQuestionsOnCategoryChange: true,
  })
}
