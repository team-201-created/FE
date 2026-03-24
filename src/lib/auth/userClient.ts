import type { ApiResponse, User } from '@/types'

const USER_STORAGE_KEY = 'user'

export const readStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null

  const raw = localStorage.getItem(USER_STORAGE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as User
  } catch {
    localStorage.removeItem(USER_STORAGE_KEY)
    return null
  }
}

export const writeStoredUser = (user: User) => {
  if (typeof window === 'undefined') return
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
}

export const clearStoredUser = () => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(USER_STORAGE_KEY)
}

export type LatestUserProfileResult = {
  user: User | null
  status: number | null
}

export async function fetchLatestUserProfileResult(): Promise<LatestUserProfileResult> {
  try {
    const response = await fetch('/api/v1/users/me', {
      credentials: 'include',
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    })

    const body = (await response
      .json()
      .catch(() => null)) as ApiResponse<User | null> | null

    if (response.ok && body?.success && body.data) {
      return { user: body.data, status: response.status }
    }

    return { user: null, status: response.status }
  } catch {
    // 네트워크 실패 시 null 반환 (호출부에서 fallback 처리)
    return { user: null, status: null }
  }
}

export async function fetchLatestUserProfile(): Promise<User | null> {
  const result = await fetchLatestUserProfileResult()
  return result.user
}
