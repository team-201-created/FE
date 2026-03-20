export interface AccordLabelStyle {
  label: string
  style: string
}

/**
 * API 응답의 공통적인 구조를 정의합니다.
 */
export interface ApiResponse<T> {
  success: boolean
  data: T
  error?: {
    code: string
    message: string
  }
}

/**
 * 사용자 정보 타입을 정의합니다.
 */
export interface User {
  id: number // 또는 string, 백엔드 데이터 타입에 따라 조절
  nickname: string
  email?: string
  profileImageUrl?: string
  /** 내 정보 조회 등에서 내려오는 관리자 여부 */
  is_admin?: boolean
}

/**
 * 소셜 로그인 콜백 API 응답의 data 타입을 정의합니다.
 */
export interface AuthTokens {
  access_token: string
  refresh_token: string
  expires_in: number // access_token 만료 시간 (초)
  refresh_expires_in: number // refresh_token 만료 시간 (초)
  user: User
}

/**
 * 소셜 로그인 URL 요청 API 응답의 data 타입을 정의합니다.
 */
export interface AuthorizeUrl {
  authorize_url: string
}
