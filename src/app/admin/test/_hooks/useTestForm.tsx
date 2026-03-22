'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TestFormData, Question, Option } from '../create/_types'
import { DEFAULT_TEMPLATES } from '../create/_constants/presets'
import { useModalStore } from '@/store/useModalStore'
import { TestPreviewModal } from '../create/_components/TestPreviewModal'

type ActionResult =
  | { success: true }
  | { success: false; message?: string | null; reason?: string | null }

interface UseTestFormOptions {
  initialData: TestFormData
  onSave: (formData: TestFormData) => Promise<ActionResult>
  resetQuestionsOnCategoryChange?: boolean
}

export const useTestForm = ({
  initialData,
  onSave,
  resetQuestionsOnCategoryChange = false,
}: UseTestFormOptions) => {
  const router = useRouter()
  const { openAlert, openModal, closeModal } = useModalStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uiCategory, setUiCategory] = useState<string>(
    initialData.profiling_type
  )
  const [formData, setFormData] = useState<TestFormData>(initialData)

  const generateUniqueId = (prefix: string) =>
    `${prefix}-${Math.random().toString(36).substring(2, 9)}`

  const updateField = <K extends keyof TestFormData>(
    key: K,
    value: TestFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const updateCategory = (categoryName: string) => {
    setUiCategory(categoryName)
    if (resetQuestionsOnCategoryChange) {
      setFormData((prev) => ({
        ...prev,
        profiling_type: categoryName,
        questions: (DEFAULT_TEMPLATES[categoryName] || []).map((q, idx) => ({
          ...q,
          key: generateUniqueId(q.question_key),
          sort_order: idx + 1,
          options: q.options.map((o) => ({
            ...o,
            key: generateUniqueId(o.answer_option_key),
          })),
        })),
      }))
    }
  }

  // --- Question Actions ---
  const addQuestion = () => {
    const newQuestion: Question = {
      key: generateUniqueId('mood'),
      question_key: 'mood',
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
        key: generateUniqueId('opt'),
        answer_option_key: generateUniqueId('opt'),
        answer_option_text: '',
        sort_order: options.length + 1,
      }
      return [...options, newOption]
    })
  }

  const removeOption = (qKey: string, optKey: string) => {
    modifyQuestionOptions(qKey, (options) => {
      const filtered = options.filter((o) => o.key !== optKey)
      return filtered.map((o, idx) => ({ ...o, sort_order: idx + 1 }))
    })
  }

  const updateOption = (
    qKey: string,
    optKey: string,
    updates: Partial<Option>
  ) => {
    modifyQuestionOptions(qKey, (options) =>
      options.map((o) => (o.key === optKey ? { ...o, ...updates } : o))
    )
  }

  const reorderOptions = (qKey: string, options: Option[]) => {
    const reordered = options.map((o, idx) => ({ ...o, sort_order: idx + 1 }))
    updateQuestion(qKey, { options: reordered })
  }

  const validate = (): string | null => {
    if (!formData.name.trim()) {
      return '테스트 이름을 입력해주세요.'
    }

    if (formData.questions.length === 0) {
      return '테스트 질문을 1개 이상 추가해주세요.'
    }

    const questionKeys = formData.questions.map((q) => q.question_key)
    if (new Set(questionKeys).size !== questionKeys.length) {
      return '중복된 유형의 질문이 있습니다. 각 질문 유형은 한 번만 사용할 수 있습니다.'
    }

    for (let i = 0; i < formData.questions.length; i++) {
      const q = formData.questions[i]

      if (!q.question_text.trim()) {
        return `${i + 1}번 질문의 내용을 입력해주세요.`
      }

      if (q.question_text.length > 50) {
        return `${i + 1}번 질문의 내용이 제한 글자수를 초과했습니다. \n(최대 50자)`
      }

      if (q.options.length === 0) {
        return `${i + 1}번 질문의 답변 선택지를 1개 이상 추가해주세요.`
      }

      for (let j = 0; j < q.options.length; j++) {
        if (!q.options[j].answer_option_text.trim()) {
          return `${i + 1}번 질문의 ${j + 1}번 선택지 내용을 입력해주세요.`
        }

        if (q.options[j].answer_option_text.length > 50) {
          return `${i + 1}번 질문의 ${j + 1}번 선택지 내용이 제한 글자수를 초과했습니다. \n (최대 50자)`
        }
      }
    }

    return null
  }

  const handleSave = async () => {
    const validationError = validate()
    if (validationError) {
      openAlert({
        type: 'danger',
        title: '입력 오류',
        content: validationError,
        confirmText: '확인',
      })
      return
    }

    setIsSubmitting(true)
    try {
      const result = await onSave(formData)
      if (result.success) {
        router.push('/admin/test')
      } else {
        openAlert({
          type: 'danger',
          title: result.message ?? '저장 실패',
          content: result.reason ?? '저장에 실패했습니다.',
          confirmText: '확인',
        })
      }
    } catch {
      openAlert({
        type: 'danger',
        title: '저장 실패',
        content: '저장 중 오류가 발생했습니다.',
        confirmText: '확인',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePreview = () => {
    openModal(<TestPreviewModal formData={formData} onClose={closeModal} />)
  }

  return {
    state: {
      uiCategory,
      formData,
      isSubmitting,
    },
    actions: {
      updateField,
      updateCategory,
      handleSave,
      handlePreview,
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
