import { useEffect, RefObject } from 'react'

/**
 * 특정 엘리먼트 외부 클릭을 감지하는 커스텀 훅입니다.
 */
export function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void,
  enabled: boolean = true,
  ignoreRefs: Array<RefObject<HTMLElement | null>> = []
) {
  useEffect(() => {
    if (!enabled) return

    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node
      const el = ref?.current

      if (!el || el.contains(target)) {
        return
      }

      // 무시할 대상들(ignoreRefs) 중 하나라도 클릭되었다면 무시
      const isIgnored = ignoreRefs.some((ignoreRef) =>
        ignoreRef.current?.contains(target)
      )

      if (isIgnored) return

      handler()
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler, enabled, ignoreRefs])
}
