'use client'

import { useEffect } from 'react'
import {
  clearStoredUser,
  fetchLatestUserProfileResult,
  writeStoredUser,
} from '@/lib/auth/userClient'
import { useAuthStore } from '@/store/useAuthStore'

/** 쿠키 기준 최신 프로필(is_admin 등) 동기화 — same-origin /api/v1/users/me */
async function syncUserProfileFromApi(): Promise<void> {
  const result = await fetchLatestUserProfileResult()

  if (result.status === 401) {
    clearStoredUser()
    useAuthStore.setState({ isLoggedIn: false, user: null })
    return
  }

  if (!result.user) return

  writeStoredUser(result.user)
  useAuthStore.setState({
    isLoggedIn: true,
    user: result.user,
  })
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
        clearStoredUser()
        useAuthStore.setState({ isLoggedIn: false, user: null })
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
