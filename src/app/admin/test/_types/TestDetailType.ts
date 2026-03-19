export interface TestDetailOption {
  id: number
  answer_option_key: string
  answer_option_text: string
}

export interface TestDetailQuestion {
  id: number
  question_key: string
  question_text: string
  selection_type: 'SINGLE' | 'MULTI'
  is_required: boolean
  options: TestDetailOption[]
}

export interface TestDetailItem {
  id: number
  name: string
  description: string
  profiling_type: string
  publish_status: string
  questions: TestDetailQuestion[]
  created_at: string
  updated_at: string
}

export interface TestDetailResponse {
  success: boolean
  data: TestDetailItem
}
