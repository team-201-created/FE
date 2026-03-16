'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/useAuthStore'

export default function ClientLayoutInitializer({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    useAuthStore.getState().initialize()
  }, [])

  return <>{children}</>
}
