import { create } from 'zustand'
import { logoutAction } from '@/lib/auth/sessionActions'
import type { User } from '@/types'

interface AuthState {
  isInitialized: boolean
  /** 로그인 시 /api/auth/me 동기화 완료 여부(헤더·관리자 메뉴 판단용) */
  userProfileLoaded: boolean
  isLoggedIn?: boolean
  user: User | null
  login: (user: User) => void
  logout: () => Promise<void>
  initialize: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isInitialized: false,
  userProfileLoaded: false,
  isLoggedIn: undefined,
  user: null,
  login: (user) => set({ isLoggedIn: true, user, userProfileLoaded: true }),
  logout: async () => {
    // httpOnly 쿠키 삭제는 Server Action에서만 가능
    await logoutAction()
    localStorage.removeItem('user')
    set({ isLoggedIn: false, user: null, userProfileLoaded: true })
  },
  initialize: () => {
    if (typeof window !== 'undefined') {
      // user 정보만 localStorage에 저장
      const storedUser = localStorage.getItem('user')
      let user = null
      try {
        if (storedUser) {
          user = JSON.parse(storedUser)
        }
      } catch {
        localStorage.removeItem('user')
      }
      set({ isLoggedIn: !!user, user })
    }
  },
}))
