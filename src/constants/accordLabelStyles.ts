/**
 * 향조 라벨 & 향기 노트 스타일
 *
 * [향조 라벨]
 * - getAccordLabels(ids) 로 id 배열 → { id, label, style }[] 변환
 * - getAccordLabelsUnique(ids) 동일하나 id 중복 제거(첫 등장 순서 유지, 소문자 정규화)
 * - pill: ACCORD_LABEL_PILL_SM_CLASS(카드) / ACCORD_LABEL_PILL_MD_CLASS(모달)
 * - style.bg, style.border, style.text 를 인라인 style 로 넣어서 렌더
 *
 * [향기 노트]
 * - SCENT_NOTE_LINE_CLASS, pill: SCENT_NOTE_PILL_CLASS
 */
import { SCENT_FAMILIES } from '@/constants/productFilters'

export type AccordLabelStyle = { bg: string; border: string; text: string }

// 향조 라벨 스타일
export const ACCORD_LABEL_STYLES: Record<string, AccordLabelStyle> = {
  floral: { bg: '#fce7f3', border: '#fccee8', text: '#a3004c' },
  citrus: { bg: '#fffde5', border: '#fff085', text: '#894b00' },
  oriental: { bg: '#f3e8ff', border: '#d9b5ff', text: '#6e11b0' },
  aromatic: { bg: '#f0fdf4', border: '#b9f8cf', text: '#008236' },
  base: { bg: '#747474', border: '#d8d8d8', text: '#e9e9e9' },
  animalic: { bg: '#fef2f2', border: '#ffc9c9', text: '#ef0009' },
  woody: { bg: '#fff7ed', border: '#fed7aa', text: '#c2410c' },
}

// 향조 라벨 매핑
const familyMap = Object.fromEntries(
  SCENT_FAMILIES.map((f) => [f.id, f])
) as Record<string, (typeof SCENT_FAMILIES)[number]>

// 향조 라벨 타입
export type AccordLabel = { id: string; label: string; style: AccordLabelStyle }

// 향조 라벨 조회 (주어진 라벨 외 id는 base 스타일 사용)
export const getAccordLabel = (id: string): AccordLabel => {
  const family = familyMap[id]
  if (family) {
    const style =
      ACCORD_LABEL_STYLES[family.colorClass] ?? ACCORD_LABEL_STYLES.base
    return { id, label: family.label, style }
  }
  return { id, label: id, style: ACCORD_LABEL_STYLES.base }
}

// 향조 라벨 여러 개 조회
export const getAccordLabels = (ids: string[]): AccordLabel[] =>
  ids.map(getAccordLabel)

/** React key 충돌 방지·UI 중복 라벨 방지: 동일 향조 id는 한 번만 */
export const getAccordLabelsUnique = (ids: string[]): AccordLabel[] => {
  const seen = new Set<string>()
  const unique: string[] = []
  for (const raw of ids) {
    const id = raw.trim().toLowerCase()
    if (!id || seen.has(id)) continue
    seen.add(id)
    unique.push(id)
  }
  return getAccordLabels(unique)
}

// 향조 라벨 스타일 클래스
export const ACCORD_LABEL_PILL_SM_CLASS =
  'inline-block rounded-full border px-2 py-0.5 text-xs font-medium'

// 향조 라벨 스타일 클래스
export const ACCORD_LABEL_PILL_MD_CLASS =
  'inline-block rounded-full border px-3 py-1 text-sm font-medium'

// 기타 스타일 클래스 (카드 한 줄)
export const SCENT_NOTE_LINE_CLASS = 'line-clamp-1 text-xs text-neutral-500'
// 향기 노트 스타일 클래스
export const SCENT_NOTE_PILL_CLASS =
  'rounded-lg bg-neutral-100 px-3 py-1.5 text-sm text-neutral-700'
