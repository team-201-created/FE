'use server'

import { revalidatePath } from 'next/cache'
import { deleteAdminProduct } from '../_api/adminDeleteProduct'
import { ProductTabId } from '../_types/AdminProductType'

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
