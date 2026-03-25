/**
 * 향기 저장소 목록 카드(blendCategory)와 동일 규칙:
 * API `categories[].name.kr` → 트림, 빈 값 제외, 등장 순서 유지하며 중복 제거
 */
export function mapBlendCategoryKrLabels(
  categories: { name?: { kr?: string; en?: string } }[] | null | undefined
): string[] {
  if (!Array.isArray(categories) || categories.length === 0) return []
  const names = categories
    .map((c) => c.name?.kr?.trim())
    .filter((name): name is string => Boolean(name))
  return Array.from(new Set(names))
}
