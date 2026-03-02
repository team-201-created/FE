'use client'

import { useEffect, useState } from 'react'

const useMock = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true'

/** 목데이터 사용 시 MSW worker 준비 후 렌더. fetch가 worker보다 먼저 나가는 경쟁 방지. */
export function MockProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(!useMock)

  useEffect(() => {
    if (!useMock) return
    import('@/mocks/browser')
      .then(({ worker }) => worker.start({ quiet: true }))
      .then(() => setReady(true))
  }, [])

  if (!ready) return null
  return <>{children}</>
}
