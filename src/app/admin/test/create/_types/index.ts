export interface Option {
  key: string // 내부 체크용 키
  answer_option_key: string
  answer_option_text: string
  sort_order: number
}

export interface Question {
  key: string // 내부 체크용 키
  question_key: string
  question_text: string
  selection_type: 'SINGLE' | 'MULTI' | 'PHOTO'
  is_required: boolean
  sort_order: number
  options: Option[]
}

export interface TestFormData {
  name: string
  description: string
  profiling_type: string
  questions: Question[]
}
