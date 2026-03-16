import { create } from 'zustand'
import type { User } from '@/types'

interface AuthState {
  isLoggedIn?: boolean // undefined: 초기 상태, true: 로그인, false: 로그아웃
  user: User | null
  login: (user: User) => void
  logout: () => void
  initialize: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: undefined,
  user: null,
  login: (user) => set({ isLoggedIn: true, user }),
  logout: () => set({ isLoggedIn: false, user: null }),
  initialize: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken')
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
      set({ isLoggedIn: !!token, user })
    }
  },
}))
