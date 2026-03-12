// 표준 fetch옵션 상속 + 추가 옵션
/** params: null/undefined 값은 쿼리에서 제외되며, 숫자는 문자열로 변환됨 (createFetch 내부 처리) */
export type FetchOptions = RequestInit & {
  params?: Record<string, string | number | undefined | null>
  cache?: 'no-store' | 'force-cache'
  next?: {
    revalidate?: number | false // 재검증 주기 (초)
    tags?: string[] // On-demand 재검증용 태그
  }
}

// 인터셉터에 전달되는 요청 정보
export type FetchArgs = {
  url: string
  options: FetchOptions
}

// 인터셉터 정의
export type FetchInterceptor = {
  request?: (args: FetchArgs) => FetchArgs | Promise<FetchArgs>
  response?: (
    response: Response,
    requestArgs: FetchArgs
  ) => Response | Promise<Response>
}

// createFetch 설정
export type FetchConfig = {
  baseUrl: string
  headers?: Record<string, string>
  interceptors?: FetchInterceptor
}

// 생성된 fetch 인스턴스의 인터페이스
export interface FetchInstance {
  <T>(url: string, options?: FetchOptions): Promise<T>
  get: <T>(url: string, options?: FetchOptions) => Promise<T>
  post: <T>(url: string, body?: unknown, options?: FetchOptions) => Promise<T>
  put: <T>(url: string, body?: unknown, options?: FetchOptions) => Promise<T>
  patch: <T>(url: string, body?: unknown, options?: FetchOptions) => Promise<T>
  delete: <T>(url: string, options?: FetchOptions) => Promise<T>
}

// 서버 에러 응답 구조 타입
export type ApiErrorResponse = {
  success: false
  error: {
    code: string
    message: string
    details?: {
      field?: string
      reason?: string
    }
  }
}
