export type RootCategory = 'element' | 'blend'

export interface CategoryName {
  kr: string
  en: string
}

export interface CategoryChild {
  category_id: number
  name: CategoryName
  created_at: string
  updated_at: string
}

export interface CategoryItem {
  category_id: number
  name: CategoryName
  children: CategoryChild[]
  created_at: string
  updated_at: string
}

export interface AdminCategoryListResponse {
  success: boolean
  data: {
    categories: CategoryItem[]
  }
}

export interface CreateCategoryRequest {
  parent_id: number | null
  level: string
  name: CategoryName
}

export interface AdminCreateCategoryResponse {
  success: boolean
  data: CategoryChild
}
