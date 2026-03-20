'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import type { User } from '@/types'

/** 쿠키 기준 최신 프로필(is_admin 등) 동기화 — same-origin /api/auth/me */
async function syncUserProfileFromApi(): Promise<void> {
  try {
    const res = await fetch('/api/auth/me', {
      credentials: 'include',
      headers: { Accept: 'application/json' },
    })
    const body = (await res.json()) as {
      success?: boolean
      data?: User
    }
    if (res.status === 401) {
      localStorage.removeItem('user')
      useAuthStore.setState({ isLoggedIn: false, user: null })
      return
    }
    if (res.ok && body.success && body.data) {
      localStorage.setItem('user', JSON.stringify(body.data))
      useAuthStore.setState({
        isLoggedIn: true,
        user: body.data,
      })
    }
  } catch {
    // 네트워크 오류 시 localStorage 사용자 유지
  }
}

export default function ClientLayoutInitializer({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    let cancelled = false
    const run = async () => {
      useAuthStore.getState().initialize()
      if (!useAuthStore.getState().isLoggedIn) {
        if (!cancelled) useAuthStore.setState({ userProfileLoaded: true })
        return
      }
      await syncUserProfileFromApi()
      if (!cancelled) useAuthStore.setState({ userProfileLoaded: true })
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  return children
}
