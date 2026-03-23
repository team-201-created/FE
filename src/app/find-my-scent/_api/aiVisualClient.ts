/**
 * AI 비주얼 분석 API (명세 기준)
 * 1. PUT presigned-url → 2. PUT 파일 업로드 → 3. POST analyze → result_id
 * - MSW: /api/v1/profilings/images/*, /api/v1/profilings/results/:id
 */

export type PhotoType = 'INTERIOR' | 'OOTD'
export type ProductType = 'DIFFUSER' | 'PERFUME'

/** MSW/목 모드에서만 Bearer 부착 — 실 API는 쿠키(access_token) + BFF */
function getAiVisualAuthHeaders(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  if (process.env.NEXT_PUBLIC_USE_MOCK_API === 'true') {
    return { Authorization: 'Bearer mock-dev-token' }
  }
  const token = (window as unknown as { __AI_VISUAL_TOKEN?: string })
    .__AI_VISUAL_TOKEN
  return token ? { Authorization: `Bearer ${token}` } : {}
}

type PresignedUrlResponse = {
  success: boolean
  data?: {
    presigned_url: string
    image_url: string
    key: string
    expires_in: number
  }
  error?: { code: string; message: string; details?: unknown }
}

type AnalyzeResponse = {
  success: boolean
  data?: { result_id: number; message: string }
  error?: { code: string; message: string; details?: unknown }
}

/**
 * 1. presigned URL 발급
 * PUT /api/v1/profilings/images/presigned-url
 * Body: { file_name, file_size } (백엔드 명세)
 */
async function getPresignedUrl(
  file_name: string,
  file_size: number
): Promise<{ presigned_url: string; image_url: string }> {
  const res = await fetch('/api/v1/profilings/images/presigned-url', {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...getAiVisualAuthHeaders(),
    },
    body: JSON.stringify({ file_name, file_size }),
  })

  const json: PresignedUrlResponse = await res.json().catch(() => ({
    success: false,
    error: { code: 'UNKNOWN', message: '응답을 파싱할 수 없습니다.' },
  }))

  if (!res.ok || !json.success || !json.data) {
    throw new Error(
      json.error?.message ?? `presigned URL 발급 실패 (${res.status})`
    )
  }

  return {
    presigned_url: json.data.presigned_url,
    image_url: json.data.image_url,
  }
}

/**
 * 2. presigned URL로 파일 업로드
 */
async function uploadToPresignedUrl(
  presigned_url: string,
  file: File
): Promise<void> {
  const res = await fetch(presigned_url, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
    },
  })
  if (!res.ok) {
    throw new Error(`이미지 업로드 실패 (${res.status})`)
  }
}

/**
 * 3. AI 분석 제출
 * POST /api/v1/profilings/images/analyze
 */
async function submitAnalyze(
  image_url: string,
  image_type: PhotoType,
  product_type: ProductType
): Promise<number> {
  const res = await fetch('/api/v1/profilings/images/analyze', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...getAiVisualAuthHeaders(),
    },
    body: JSON.stringify({ image_url, image_type, product_type }),
  })

  const json: AnalyzeResponse = await res.json().catch(() => ({
    success: false,
    error: { code: 'UNKNOWN', message: '응답을 파싱할 수 없습니다.' },
  }))

  if (!res.ok || !json.success || json.data?.result_id == null) {
    throw new Error(json.error?.message ?? `분석 제출 실패 (${res.status})`)
  }

  return json.data.result_id
}

/**
 * AI 비주얼 분석 전체 플로우: presigned URL 발급 → 업로드 → 분석 제출 → result_id 반환
 */
export async function submitAiVisualAnalysis(
  photoType: PhotoType,
  file: File,
  productType: ProductType = 'DIFFUSER'
): Promise<number> {
  const file_name = file.name || 'upload.jpg'

  const { presigned_url, image_url } = await getPresignedUrl(
    file_name,
    file.size
  )

  await uploadToPresignedUrl(presigned_url, file)

  return submitAnalyze(image_url, photoType, productType)
}
