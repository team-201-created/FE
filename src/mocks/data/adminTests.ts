export const mockAdminTests = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `테스트 ${i + 1}`,
  profiling_type: ['PREFERENCE', 'HEALTH', 'INTERIOR', 'OOTD'][i % 4],
  publish_status: i % 3 === 0 ? 'UNPUBLISHED' : 'PUBLISHED',
  created_at: `2026-0${(i % 2) + 1}-15T10:00:00Z`,
  updated_at: `2026-0${(i % 2) + 1}-20T10:00:00Z`,
}))
