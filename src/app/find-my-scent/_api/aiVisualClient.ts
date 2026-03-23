/**
 * AI 비주얼 분석 API (명세 기준)
 * 1. 파일 첨부 시: PUT presigned-url → PUT S3 업로드
 * 2. 「분석 시작」버튼: POST /api/v1/profilings/images/analyze 만 호출
 */

export type PhotoType = 'INTERIOR' | 'OOTD'
export type ProductType = 'DIFFUSER' | 'PERFUME'

/** PUT /api/v1/profilings/images/presigned-url 성공 data */
export type PresignedUrlData = {
  presigned_url: string
  image_url: string
  key: string
  expires_in: number
}

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

type PresignedUrlApiResponse = {
  success: boolean
  data?: PresignedUrlData
  error?: { code: string; message: string; details?: unknown }
}

type AnalyzeResponse = {
  success: boolean
  data?: { result_id: number; message: string }
  error?: { code: string; message: string; details?: unknown }
}

/**
 * PUT /api/v1/profilings/images/presigned-url
 * Body: { file_name, file_size }
 */
async function requestPresignedUrl(
  file_name: string,
  file_size: number
): Promise<PresignedUrlData> {
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

  const json: PresignedUrlApiResponse = await res.json().catch(() => ({
    success: false,
    error: { code: 'UNKNOWN', message: '응답을 파싱할 수 없습니다.' },
  }))

  if (!res.ok || !json.success || !json.data) {
    throw new Error(
      json.error?.message ?? `presigned URL 발급 실패 (${res.status})`
    )
  }

  return json.data
}

/**
 * presigned URL로 파일 업로드 (S3 PUT)
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
 * 파일 첨부 후: Presigned URL 발급 → S3 업로드까지 수행.
 * 반환값의 image_url 을 분석 제출 시 사용합니다.
 */
export async function uploadImageViaPresignedUrl(
  file: File
): Promise<PresignedUrlData> {
  const file_name = file.name || 'upload.jpg'
  const file_size = file.size

  const data = await requestPresignedUrl(file_name, file_size)
  await uploadToPresignedUrl(data.presigned_url, file)
  return data
}

/**
 * POST /api/v1/profilings/images/analyze
 * 「분석 시작」버튼에서만 호출.
 */
export async function submitAiVisualAnalyze(
  image_url: string,
  image_type: PhotoType,
  product_type: ProductType = 'DIFFUSER'
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
