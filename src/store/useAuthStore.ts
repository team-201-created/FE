import { create } from 'zustand'
import { logoutAction } from '@/lib/auth/sessionActions'
import type { User } from '@/types'

interface AuthState {
  isLoggedIn?: boolean // undefined: 초기 상태, true: 로그인, false: 로그아웃
  user: User | null
  login: (user: User) => void
  logout: () => Promise<void>
  initialize: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: undefined,
  user: null,
  login: (user) => set({ isLoggedIn: true, user }),
  logout: async () => {
    // httpOnly 쿠키 삭제는 Server Action에서만 가능
    await logoutAction()
    localStorage.removeItem('user')
    set({ isLoggedIn: false, user: null })
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
      } catch (e) {
        console.error('Failed to parse user from localStorage', e)
        localStorage.removeItem('user')
      }
      set({ isLoggedIn: !!user, user })
    }
  },
}))
