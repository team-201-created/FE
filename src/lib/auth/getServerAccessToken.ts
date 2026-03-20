/**
 * Route Handler / Server Action 등 서버에서 httpOnly가 아닌 access_token 쿠키 읽기.
 * next/headers는 정적 import하면 Client 번들 분석에 걸리므로 함수 내부에서만 동적 import합니다.
 */
export async function getServerAccessToken(): Promise<string | undefined> {
  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()
  return cookieStore.get('access_token')?.value
}
