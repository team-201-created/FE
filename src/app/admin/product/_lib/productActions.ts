'use server'

import { revalidatePath } from 'next/cache'
import { deleteAdminProduct } from '../_api/adminDeleteProduct'
import {
  createAdminElement,
  createAdminBlend,
  getAdminProductPresignedUrl,
  type CreateElementBody,
  type CreateBlendBody,
} from '../_api/adminCreateProduct'
import {
  fetchAdminElementCategories,
  fetchAdminBlendCategories,
} from '@/app/admin/category/_api/adminFetchCategory'
import { ProductTabId } from '../_types/AdminProductType'

/**
 * 향조(element) 카테고리 목록 조회 Server Action
 * - authFetch는 서버에서만 쿠키를 읽으므로 Server Action으로 감쌈
 */
export async function fetchElementCategoriesAction() {
  return fetchAdminElementCategories()
}

/**
 * 테마(blend) 카테고리 목록 조회 Server Action
 */
export async function fetchBlendCategoriesAction() {
  return fetchAdminBlendCategories()
}

/**
 * 상품 삭제 Server Action
 */
export async function deleteProductAction(type: ProductTabId, id: number) {
  try {
    await deleteAdminProduct(type, id)
    revalidatePath('/admin/product')
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}

/**
 * 상품 이미지 S3 Presigned URL 발급 Server Action
 */
export async function getProductPresignedUrlAction(
  file_name: string,
  file_size: number
) {
  try {
    const data = await getAdminProductPresignedUrl(file_name, file_size)
    return { success: true as const, data: data.data }
  } catch (error) {
    return { success: false as const, error }
  }
}

/**
 * 향 단품 등록 Server Action
 */
export async function createElementAction(body: CreateElementBody) {
  try {
    await createAdminElement(body)
    revalidatePath('/admin/product')
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}

/**
 * 향 조합 등록 Server Action
 */
export async function createBlendAction(body: CreateBlendBody) {
  try {
    await createAdminBlend(body)
    revalidatePath('/admin/product')
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}
