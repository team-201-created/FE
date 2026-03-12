'use client'

/** 상품 상세 모달: openDetail(id) 시 fetch 호출 → mapper 적용 → 로딩/에러/product 관리 */
import { useState } from 'react'
import { FetchError } from '@/lib/api'
import type { ProductDetailModalProduct } from '@/components/products/ProductDetailModal'

type FetchDetailFn<T> = (id: number) => Promise<T>

export function useProductDetailModal<T>(
  fetchDetail: FetchDetailFn<T>,
  mapToModalProduct: (response: T) => ProductDetailModalProduct
) {
  const [isOpen, setIsOpen] = useState(false)
  const [product, setProduct] = useState<ProductDetailModalProduct | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const openDetail = async (id: number) => {
    setIsOpen(true)
    setProduct(null)
    setApiError(null)
    setIsLoading(true)
    try {
      const response = await fetchDetail(id)
      setProduct(mapToModalProduct(response))
    } catch (e) {
      setApiError(
        e instanceof FetchError ? e.message : '상세 조회에 실패했습니다.'
      )
      setIsOpen(false)
    } finally {
      setIsLoading(false)
    }
  }

  const closeDetail = () => {
    setIsOpen(false)
    setProduct(null)
    setApiError(null)
  }

  const clearApiError = () => setApiError(null)

  return {
    isOpen,
    product,
    isLoading,
    apiError,
    openDetail,
    closeDetail,
    clearApiError,
  }
}
