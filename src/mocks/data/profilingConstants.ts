/**
 * 프로파일링 목데이터 공통 상수
 * - GET forms/active 응답의 pipeline_snapshot_id와 동일해야 함
 * - POST submit 시 body.pipeline_snapshot_id 검증(MSW)에 사용
 */
export const MOCK_PIPELINE_SNAPSHOT_ID = {
  PREFERENCE: 1,
  HEALTH: 2,
} as const
