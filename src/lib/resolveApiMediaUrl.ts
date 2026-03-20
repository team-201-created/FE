/**
 * API가 주는 이미지 URL 정리 (null/공백 → 빈 문자열, 그 외 trim만).
 * 상품/썸네일은 S3 등 절대 URL(https://...)으로 온다고 가정합니다.
 */
export function resolveApiMediaUrl(url: string | null | undefined): string {
  if (url == null || !String(url).trim()) return ''
  return String(url).trim()
}
