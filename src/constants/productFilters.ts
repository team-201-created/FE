/** 향조 (Fragrance Family) - 단품/조합 공통 필터 */
export const SCENT_FAMILIES = [
  { id: 'woody', label: 'Woody', colorClass: 'woody' },
  { id: 'citrus', label: 'Citrus', colorClass: 'citrus' },
  { id: 'floral', label: 'Floral', colorClass: 'floral' },
  { id: 'aromatic', label: 'Aromatic', colorClass: 'aromatic' },
  { id: 'oriental', label: 'Oriental', colorClass: 'oriental' },
  { id: 'animalic', label: 'Animalic', colorClass: 'animalic' },
  { id: 'base', label: 'Base', colorClass: 'base' },
] as const

/** 향기 노트(테마) - 조합 페이지 필터 */
export const SCENT_NOTES = [
  '#기분전환',
  '#숙면',
  '#집중',
  '#휴식',
  '#로맨틱',
  '#운동',
  '#포근',
] as const
