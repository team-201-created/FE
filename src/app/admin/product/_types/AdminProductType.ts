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

export interface AdminElementDetail {
  id: number
  name: string
  image_url: string
  description: string | null
  element_category: {
    id: number
    name: { kr: string; en: string }
  }
}

export interface AdminBlendDetail {
  id: number
  name: string
  image_url: string
  description: string | null
  blend_categories: { id: number; name: { kr: string; en: string } }[]
  contained_elements: { name: string; category: { kr: string; en: string } }[]
  purchase_url: string | null
}

export interface AdminElementDetailResponse {
  success: boolean
  data: AdminElementDetail
}

export interface AdminBlendDetailResponse {
  success: boolean
  data: AdminBlendDetail
}

export interface AdminBlendListResponse {
  success: boolean
  data: AdminPaginatedData<AdminBlendProduct>
}
