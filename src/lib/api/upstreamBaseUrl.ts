/** NEXT_PUBLIC_API_URL 정규화 — 끝 슬래시 제거 후 `${base}/api/v1/...` 연결 */
export function getUpstreamApiBaseUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim()
  if (!raw) return null
  return raw.replace(/\/+$/, '')
}
