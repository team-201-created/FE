/**
 * API 상세 응답 → ProductDetailModal용 데이터로 변환
 * (fetch는 훅/호출부, 변환 로직만 여기서 관리)
 */
import type { ProductDetailModalProduct } from '@/components/products/ProductDetailModal'
import {
  blendCategoryKrToNoteLabel,
  elementCategoryToScentFamilyId,
  scentCategoryKrToId,
  type BlendDetailResponse,
  type ElementDetailResponse,
} from './productsClient'
import { resolveApiMediaUrl } from '@/lib/resolveApiMediaUrl'

export function mapElementDetailToModalProduct(
  res: ElementDetailResponse
): ProductDetailModalProduct {
  const data = res.data
  const raw =
    typeof data.image_url === 'string'
      ? data.image_url
      : (data.image_url?.[0] ?? '')
  const imageUrl = resolveApiMediaUrl(raw)
  const kr = data.element_category?.name?.kr ?? ''
  const scentFamilyId = scentCategoryKrToId[kr] ?? 'woody'
  return {
    name: data.name,
    imageUrl,
    scentFamilyIds: [scentFamilyId],
    noteLabels: [],
    oneLineDescription: data.description ?? '',
    productLink: undefined,
  }
}

export function mapBlendDetailToModalProduct(
  res: BlendDetailResponse
): ProductDetailModalProduct {
  const data = res.data
  const mapped = data.contained_elements
    .map((el) => elementCategoryToScentFamilyId(el.category ?? {}))
    .filter((id): id is string => Boolean(id))
  const scentFamilyIds = mapped.length > 0 ? mapped : ['woody']
  const noteLabels = data.blend_categories
    .map((c) => blendCategoryKrToNoteLabel[c.name?.kr ?? ''])
    .filter(Boolean)
  return {
    name: data.name,
    imageUrl: resolveApiMediaUrl(data.image_url),
    scentFamilyIds,
    noteLabels,
    oneLineDescription: data.description ?? '',
    productLink: data.purchase_url ?? undefined,
  }
}
