import { CategoryItem } from '@/app/admin/category/_types/AdminCategoryType'

export const mockCategoryElement: CategoryItem = {
  category_id: 1,
  name: { kr: '향조', en: 'Scent Note' },
  created_at: '2026-02-01T10:00:00Z',
  updated_at: '2026-02-01T10:00:00Z',
  children: [
    {
      category_id: 101,
      name: { kr: '베이스', en: 'Base' },
      created_at: '2026-02-10T10:00:00Z',
      updated_at: '2026-02-10T10:00:00Z',
    },
    {
      category_id: 102,
      name: { kr: '시트러스', en: 'Citrus' },
      created_at: '2026-02-10T10:00:00Z',
      updated_at: '2026-02-10T10:00:00Z',
    },
    {
      category_id: 103,
      name: { kr: '아로마틱', en: 'Aromatic' },
      created_at: '2026-02-10T10:00:00Z',
      updated_at: '2026-02-10T10:00:00Z',
    },
    {
      category_id: 104,
      name: { kr: '우디', en: 'Woody' },
      created_at: '2026-02-10T10:00:00Z',
      updated_at: '2026-02-10T10:00:00Z',
    },
    {
      category_id: 105,
      name: { kr: '플로럴', en: 'Floral' },
      created_at: '2026-02-10T10:00:00Z',
      updated_at: '2026-02-10T10:00:00Z',
    },
    {
      category_id: 106,
      name: { kr: '오리엔탈', en: 'Oriental' },
      created_at: '2026-02-10T10:00:00Z',
      updated_at: '2026-02-10T10:00:00Z',
    },
    {
      category_id: 107,
      name: { kr: '애니멀릭', en: 'Animalic' },
      created_at: '2026-02-10T10:00:00Z',
      updated_at: '2026-02-10T10:00:00Z',
    },
    {
      category_id: 108,
      name: { kr: '머스크', en: 'Musk' },
      created_at: '2026-02-10T10:00:00Z',
      updated_at: '2026-02-10T10:00:00Z',
    },
  ],
}

export const mockCategoryBlend: CategoryItem = {
  category_id: 2,
  name: { kr: '테마', en: 'Theme' },
  created_at: '2026-02-01T10:00:00Z',
  updated_at: '2026-02-01T10:00:00Z',
  children: [
    {
      category_id: 201,
      name: { kr: '포근', en: 'Cozy' },
      created_at: '2026-02-15T10:00:00Z',
      updated_at: '2026-02-15T10:00:00Z',
    },
    {
      category_id: 202,
      name: { kr: '숙면', en: 'Sleep' },
      created_at: '2026-02-15T10:00:00Z',
      updated_at: '2026-02-15T10:00:00Z',
    },
    {
      category_id: 203,
      name: { kr: '기분전환', en: 'Refresh' },
      created_at: '2026-02-15T10:00:00Z',
      updated_at: '2026-02-15T10:00:00Z',
    },
    {
      category_id: 204,
      name: { kr: '휴식', en: 'Relax' },
      created_at: '2026-02-15T10:00:00Z',
      updated_at: '2026-02-15T10:00:00Z',
    },
    {
      category_id: 205,
      name: { kr: '로맨틱', en: 'Romantic' },
      created_at: '2026-02-15T10:00:00Z',
      updated_at: '2026-02-15T10:00:00Z',
    },
    {
      category_id: 206,
      name: { kr: '운동', en: 'Active' },
      created_at: '2026-02-15T10:00:00Z',
      updated_at: '2026-02-15T10:00:00Z',
    },
    {
      category_id: 207,
      name: { kr: '집중', en: 'Focus' },
      created_at: '2026-02-15T10:00:00Z',
      updated_at: '2026-02-15T10:00:00Z',
    },
  ],
}
