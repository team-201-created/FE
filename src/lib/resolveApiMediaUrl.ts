/**
 * API가 주는 이미지 URL을 Next/Image 및 브라우저에서 올바르게 요청되도록 정규화합니다.
 * - 절대 URL(http/https, //)은 그대로 둡니다.
 * - 상대 경로(/uploads/...)는 NEXT_PUBLIC_API_URL 기준으로 절대 URL로 만듭니다.
 *   (그렇지 않으면 localhost:3000/uploads/... 로 가서 404가 납니다.)
 */
export function resolveApiMediaUrl(url: string | null | undefined): string {
  if (url == null || !String(url).trim()) return ''
  const u = String(url).trim()
  if (
    u.startsWith('http://') ||
    u.startsWith('https://') ||
    u.startsWith('//') ||
    u.startsWith('data:') ||
    u.startsWith('blob:')
  ) {
    return u
  }
  const base =
    process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/$/, '') ||
    'http://localhost:3000'
  const path = u.startsWith('/') ? u : `/${u}`
  try {
    return new URL(path, `${base}/`).href
  } catch {
    return u
  }
}
