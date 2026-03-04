/**
 * 향조(Accord) 라벨 공통 스타일
 * - ProductCard, ProductDetailModal 등에서 재사용
 * - colorClass는 @/constants/productFilters SCENT_FAMILIES.colorClass와 매칭
 */
export type AccordLabelStyle = {
  bg: string
  border: string
  text: string
}

export const ACCORD_LABEL_STYLES: Record<string, AccordLabelStyle> = {
  floral: { bg: '#fce7f3', border: '#fccee8', text: '#a3004c' },
  citrus: { bg: '#fffde5', border: '#fff085', text: '#894b00' },
  oriental: { bg: '#f3e8ff', border: '#d9b5ff', text: '#6e11b0' },
  aromatic: { bg: '#f0fdf4', border: '#b9f8cf', text: '#008236' },
  base: { bg: '#747474', border: '#d8d8d8', text: '#e9e9e9' },
  animalic: { bg: '#fef2f2', border: '#ffc9c9', text: '#ef0009' },
  woody: { bg: '#fff7ed', border: '#fed7aa', text: '#c2410c' },
}
