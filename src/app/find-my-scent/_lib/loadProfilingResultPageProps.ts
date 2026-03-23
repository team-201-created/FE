import {
  fetchProfilingResult,
  resultDetailToContentBoxProps,
} from '../_api/profilingClient'
import { FetchError } from '@/lib/api/fetchError'
import { mockProfilingResultDetail } from '@/mocks/data/profilingResults'

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true'

export type ProfilingResultPageLoad =
  | {
      ok: true
      contentBoxProps: ReturnType<typeof resultDetailToContentBoxProps>
    }
  | { ok: false; errorMessage: string }

/**
 * 결과 페이지용 데이터 로드.
 * - NEXT_PUBLIC_USE_MOCK_API=true: 실패·누락 시 mockProfilingResultDetail 폴백
 * - false: 실 API만 사용, 실패 시 ok:false (목 폴백 없음)
 */
export async function loadProfilingResultPageProps(
  resultIdParam: string | undefined
): Promise<ProfilingResultPageLoad> {
  const resultId = resultIdParam ? Number(resultIdParam) : null

  if (resultId == null || !Number.isInteger(resultId) || resultId <= 0) {
    if (USE_MOCK) {
      return {
        ok: true,
        contentBoxProps: resultDetailToContentBoxProps(
          mockProfilingResultDetail
        ),
      }
    }
    return {
      ok: false,
      errorMessage:
        '결과 정보가 없습니다. 테스트를 완료한 뒤 다시 시도해 주세요.',
    }
  }

  try {
    const res = await fetchProfilingResult(resultId)
    if (res.success && res.data) {
      return {
        ok: true,
        contentBoxProps: resultDetailToContentBoxProps(res.data),
      }
    }
    if (USE_MOCK) {
      return {
        ok: true,
        contentBoxProps: resultDetailToContentBoxProps(
          mockProfilingResultDetail
        ),
      }
    }
    return {
      ok: false,
      errorMessage:
        (res as { error?: { message?: string } }).error?.message ??
        '결과를 불러오지 못했습니다.',
    }
  } catch (err) {
    if (USE_MOCK) {
      return {
        ok: true,
        contentBoxProps: resultDetailToContentBoxProps(
          mockProfilingResultDetail
        ),
      }
    }
    const message =
      err instanceof FetchError
        ? err.message
        : err instanceof Error
          ? err.message
          : '결과를 불러오지 못했습니다.'
    return {
      ok: false,
      errorMessage: message,
    }
  }
}
