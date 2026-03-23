const data = [
  {
    id: 1,
    input_data_type: 'PREFERENCE',
    product_type: 'DIFFUSER',
    matched_blend: {
      id: 5,
      name: '포근한 숲',
      image_url: '/img/5.svg',
      categories: [
        { name: { kr: '휴식', en: 'Rest' } },
        { name: { kr: '기분전환', en: 'Refresh' } },
      ],
      contained_elements: [
        { name: '리차징', category: { kr: '베이스', en: 'Base' } },
        { name: '라벤더', category: { kr: '아로마틱', en: 'Aromatic' } },
      ],
    },
    created_at: '2026-02-28T14:30:00Z',
  },
  {
    id: 7,
    input_data_type: 'PREFERENCE',
    product_type: 'CANDLE',
    matched_blend: {
      id: 11,
      name: '달콤한 라벤더',
      image_url: '/img/11.svg',
      categories: [
        { name: { kr: '휴식', en: 'Rest' } },
        { name: { kr: '기분전환', en: 'Refresh' } },
      ],
      contained_elements: [
        { name: '로즈', category: { kr: '플로럴', en: 'Floral' } },
        { name: '라벤더', category: { kr: '아로마틱', en: 'Aromatic' } },
      ],
    },
    created_at: '2026-03-04T12:00:00Z',
  },
  {
    id: 8,
    input_data_type: 'PREFERENCE',
    product_type: 'PERFUME',
    matched_blend: {
      id: 12,
      name: '상큼한 시트러스',
      image_url: '/img/12.svg',
      categories: [
        { name: { kr: '기분전환', en: 'Refresh' } },
        { name: { kr: '집중', en: 'Focus' } },
      ],
      contained_elements: [
        { name: '자몽', category: { kr: '시트러스', en: 'Citrus' } },
        { name: '오렌지', category: { kr: '시트러스', en: 'Citrus' } },
      ],
    },
    created_at: '2026-03-04T13:30:00Z',
  },
  {
    id: 2,
    input_data_type: 'HEALTH',
    product_type: 'CANDLE',
    matched_blend: {
      id: 6,
      name: '상쾌한 바람',
      image_url: '/img/6.svg',
      categories: [
        { name: { kr: '운동', en: 'Workout' } },
        { name: { kr: '집중', en: 'Focus' } },
      ],
      contained_elements: [
        { name: '레몬', category: { kr: '시트러스', en: 'Citrus' } },
        { name: '민트', category: { kr: '아로마틱', en: 'Aromatic' } },
      ],
    },
    created_at: '2026-03-01T09:15:00Z',
  },
  {
    id: 3,
    input_data_type: 'OOTD',
    product_type: 'PERFUME',
    matched_blend: {
      id: 7,
      name: '따뜻한 햇살',
      image_url: '/img/7.svg',
      categories: [
        { name: { kr: '기분전환', en: 'Refresh' } },
        { name: { kr: '로맨틱', en: 'Romantic' } },
      ],
      contained_elements: [
        { name: '로즈', category: { kr: '플로럴', en: 'Floral' } },
        { name: '앰버', category: { kr: '오리엔탈', en: 'Oriental' } },
      ],
    },
    created_at: '2026-03-02T18:45:00Z',
  },
  {
    id: 4,
    input_data_type: 'PREFERENCE',
    product_type: 'DIFFUSER',
    matched_blend: {
      id: 8,
      name: '싱그러운 잎새',
      image_url: '/img/8.svg',
      categories: [
        { name: { kr: '포근', en: 'Cozy' } },
        { name: { kr: '운동', en: 'Workout' } },
      ],
      contained_elements: [
        { name: '시더우드', category: { kr: '우디', en: 'Woody' } },
        { name: '파촐리', category: { kr: '오리엔탈', en: 'Oriental' } },
      ],
    },
    created_at: '2026-03-03T10:00:00Z',
  },
  {
    id: 5,
    input_data_type: 'HEALTH',
    product_type: 'CANDLE',
    matched_blend: {
      id: 9,
      name: '달콤한 과일',
      image_url: '/img/9.svg',
      categories: [
        { name: { kr: '로맨틱', en: 'Romantic' } },
        { name: { kr: '숙면', en: 'Sleep' } },
      ],
      contained_elements: [
        { name: '바닐라', category: { kr: '오리엔탈', en: 'Oriental' } },
        { name: '머스크', category: { kr: '애니멀릭', en: 'Animalic' } },
      ],
    },
    created_at: '2026-03-03T15:30:00Z',
  },
  {
    id: 6,
    input_data_type: 'INTERIOR',
    product_type: 'PERFUME',
    matched_blend: {
      id: 10,
      name: '시원한 바다',
      image_url: '/img/10.svg',
      categories: [
        { name: { kr: '집중', en: 'Focus' } },
        { name: { kr: '숙면', en: 'Sleep' } },
      ],
      contained_elements: [
        { name: '해조', category: { kr: '베이스', en: 'Base' } },
        { name: '민트', category: { kr: '아로마틱', en: 'Aromatic' } },
      ],
    },
    created_at: '2026-03-04T08:20:00Z',
  },
]
export default data
