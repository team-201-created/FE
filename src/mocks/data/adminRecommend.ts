export const mockAdminBlendMaps = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  input_type: ['PREFERENCE', 'HEALTH', 'INTERIOR', 'OOTD'][i % 4],
  publish_status: i % 3 === 0 ? 'UNPUBLISHED' : 'PUBLISHED',
  created_at: `2024-03-${String((i % 28) + 1).padStart(2, '0')}T10:00:00Z`,
  updated_at: `2024-03-${String((i % 28) + 1).padStart(2, '0')}T12:00:00Z`,
}))

export const mockAdminProductPools = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  product_type: ['DIFFUSER', 'PERFUME'][i % 2],
  product_count: Math.floor(Math.random() * 100) + 10,
  adoption_status: i % 4 === 0 ? 'UNADOPTED' : 'ADOPTED',
  created_at: `2026-02-${String((i % 28) + 1).padStart(2, '0')}T10:00:00Z`,
  updated_at: `2026-02-${String((i % 28) + 1).padStart(2, '0')}T12:00:00Z`,
}))

export const mockAdminProductMaps = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  product_pool_id: i + 1,
  publish_status: i % 3 === 0 ? 'UNPUBLISHED' : 'PUBLISHED',
  created_at: `2026-02-${String((i % 28) + 1).padStart(2, '0')}T10:00:00Z`,
  updated_at: `2026-02-${String((i % 28) + 1).padStart(2, '0')}T12:00:00Z`,
}))
