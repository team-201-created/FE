'use client'

/** error가 있으면 팝업 표시, close로 닫기 (에러 피드백 모달용) */
import { useState } from 'react'

export function useErrorPopup(error: Error | null) {
  const [dismissed, setDismissed] = useState(false)
  if (!error && dismissed) setDismissed(false)

  const isOpen = Boolean(error) && !dismissed
  return { isOpen, close: () => setDismissed(true) }
}
