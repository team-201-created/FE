export type AnalysisInputDataType =
  | 'PREFERENCE'
  | 'HEALTH'
  | 'OOTD'
  | 'INTERIOR'

export interface AnalysisResultCategoryName {
  kr: string
  en: string
}

export interface AnalysisResultCategory {
  name: AnalysisResultCategoryName
}

export interface AnalysisResultElement {
  name: string
  category: AnalysisResultCategoryName
}

export interface AnalysisResultBlend {
  id: number
  name: string
  image_url: string
  categories: AnalysisResultCategory[]
  contained_elements: AnalysisResultElement[]
}

export interface AnalysisResultItem {
  id: number
  input_data_type: AnalysisInputDataType
  product_type: string
  matched_blend: AnalysisResultBlend | null
  created_at: string
}

export interface AnalysisResultListData {
  results: AnalysisResultItem[]
  page: number
  size: number
  count: number
  total_pages: number
}

export interface AnalysisResultListApiResponse {
  success: boolean
  data?: AnalysisResultListData
}
