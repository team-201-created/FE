export type ProductTabId = 'ELEMENT' | 'BLEND'

export interface AdminProductCategory {
  name: {
    kr: string
    en: string
  }
}

export interface AdminElementProduct {
  id: number
  name: string
  thumbnail_image_url: string
  element_category: AdminProductCategory
}

export interface AdminBlendProduct {
  id: number
  name: string
  thumbnail_image_url: string
  blend_categories: AdminProductCategory[]
}

export interface AdminPaginatedData<T> {
  results: T[]
  page: number
  size: number
  count: number
  total_pages: number
}

export interface AdminElementListResponse {
  success: boolean
  data: AdminPaginatedData<AdminElementProduct>
}

export interface AdminBlendListResponse {
  success: boolean
  data: AdminPaginatedData<AdminBlendProduct>
}
