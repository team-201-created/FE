'use client'

import { useState } from 'react'
import { TestFormData, Question, Option } from '../_types'
import { DEFAULT_TEMPLATES } from '../_constants/presets'

export const useTestCreate = () => {
  // UI 전용 상태: 현재 선택된 탭 카테고리 (취향, 건강, 인테리어, OOTD)
  const [uiCategory, setUiCategory] = useState<string>('PREFERENCE')

  const [formData, setFormData] = useState<TestFormData>(() => ({
    name: '',
    description: '',
    profiling_type: 'PREFERENCE',
    questions: DEFAULT_TEMPLATES['PREFERENCE'].map((q, idx) => ({
      ...q,
      key: `${q.question_key}-${Date.now()}`, // 임시 키 생성
      sort_order: idx + 1,
      options: q.options.map((o) => ({
        ...o,
        key: `${o.answer_option_key}-${Date.now()}`, // 마찬가지 임시 키 생성
      })),
    })),
  }))

  // Helper for generating unique keys/ids
  const generateUid = (prefix: string) =>
    `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  const updateField = <K extends keyof TestFormData>(
    key: K,
    value: TestFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const updateCategory = (category: string) => {
    setUiCategory(category)

    const typeMap: Record<string, string> = {
      취향: 'PREFERENCE',
      건강: 'HEALTH',
      인테리어: 'PREFERENCE',
      OOTD: 'PREFERENCE',
    }

    const apiType = typeMap[category] || 'PREFERENCE'

    setFormData((prev) => ({
      ...prev,
      profiling_type: apiType,
      questions: (DEFAULT_TEMPLATES[category] || []).map((q, idx) => ({
        ...q,
        key: generateUid(q.question_key),
        sort_order: idx + 1,
      })),
    }))
  }

  // --- Question Actions ---
  const addQuestion = () => {
    const newQuestion: Question = {
      key: generateUid('custom'),
      question_key: 'custom-type',
      question_text: '',
      selection_type: 'SINGLE',
      is_required: true,
      sort_order: formData.questions.length + 1,
      options: [],
    }
    setFormData((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }))
  }

  const removeQuestion = (qKey: string) => {
    setFormData((prev) => {
      const filtered = prev.questions.filter((q) => q.key !== qKey)
      const reordered = filtered.map((q, idx) => ({
        ...q,
        sort_order: idx + 1,
      }))
      return { ...prev, questions: reordered }
    })
  }

  const updateQuestion = (qKey: string, updates: Partial<Question>) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.key === qKey ? { ...q, ...updates } : q
      ),
    }))
  }

  const reorderQuestions = (questions: Question[]) => {
    const reordered = questions.map((q, idx) => ({ ...q, sort_order: idx + 1 }))
    setFormData((prev) => ({ ...prev, questions: reordered }))
  }

  // --- Option Actions ---
  const modifyQuestionOptions = (
    qKey: string,
    transformer: (options: Option[]) => Option[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.key === qKey ? { ...q, options: transformer(q.options) } : q
      ),
    }))
  }

  const addOption = (qKey: string) => {
    modifyQuestionOptions(qKey, (options) => {
      const newOption: Option = {
        key: generateUid('opt'),
        answer_option_key: generateUid('opt'),
        answer_option_text: '',
        sort_order: options.length + 1,
      }
      return [...options, newOption]
    })
  }

  const removeOption = (qKey: string, optUid: string) => {
    modifyQuestionOptions(qKey, (options) => {
      const filtered = options.filter((o) => o.key !== optUid)
      return filtered.map((o, idx) => ({ ...o, sort_order: idx + 1 }))
    })
  }

  const updateOption = (
    qKey: string,
    optUid: string,
    updates: Partial<Option>
  ) => {
    modifyQuestionOptions(qKey, (options) =>
      options.map((o) => (o.key === optUid ? { ...o, ...updates } : o))
    )
  }

  const reorderOptions = (qKey: string, options: Option[]) => {
    const reordered = options.map((o, idx) => ({ ...o, sort_order: idx + 1 }))
    updateQuestion(qKey, { options: reordered })
  }

  const handleSave = () => {
    const payload = {
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
    }
    console.log('요청 페이로드 : ', payload)
  }

  return {
    state: {
      uiCategory,
      formData,
    },
    actions: {
      updateField,
      updateCategory,
      handleSave,
      question: {
        add: addQuestion,
        remove: removeQuestion,
        update: updateQuestion,
        reorder: reorderQuestions,
      },
      option: {
        add: addOption,
        remove: removeOption,
        update: updateOption,
        reorder: reorderOptions,
      },
    },
  }
}
