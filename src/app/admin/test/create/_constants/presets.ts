import { Question } from '../_types'

export const DEFAULT_TEMPLATES: Record<string, Question[]> = {
  PREFERENCE: [
    {
      key: 'taste-mood',
      question_key: 'mood',
      question_text: '무드',
      selection_type: 'SINGLE',
      is_required: true,
      sort_order: 1,
      options: [
        {
          key: 'calm',
          answer_option_key: 'calm',
          answer_option_text: '차분',
          sort_order: 1,
        },
        {
          key: 'vital',
          answer_option_key: 'vital',
          answer_option_text: '활기',
          sort_order: 2,
        },
        {
          key: 'cozy',
          answer_option_key: 'cozy',
          answer_option_text: '포근',
          sort_order: 3,
        },
        {
          key: 'focused',
          answer_option_key: 'focused',
          answer_option_text: '집중',
          sort_order: 4,
        },
      ],
    },
    {
      key: 'taste-season',
      question_key: 'season',
      question_text: '계절감',
      selection_type: 'SINGLE',
      is_required: true,
      sort_order: 2,
      options: [
        {
          key: 'spring',
          answer_option_key: 'spring',
          answer_option_text: '봄',
          sort_order: 1,
        },
        {
          key: 'summer',
          answer_option_key: 'summer',
          answer_option_text: '여름',
          sort_order: 2,
        },
        {
          key: 'autumn',
          answer_option_key: 'autumn',
          answer_option_text: '가을',
          sort_order: 3,
        },
        {
          key: 'winter',
          answer_option_key: 'winter',
          answer_option_text: '겨울',
          sort_order: 4,
        },
      ],
    },
    {
      key: 'taste-space',
      question_key: 'space',
      question_text: '공간감',
      selection_type: 'SINGLE',
      is_required: true,
      sort_order: 3,
      options: [
        {
          key: 'forest',
          answer_option_key: 'forest',
          answer_option_text: '숲',
          sort_order: 1,
        },
        {
          key: 'sea',
          answer_option_key: 'sea',
          answer_option_text: '바다',
          sort_order: 2,
        },
        {
          key: 'city',
          answer_option_key: 'city',
          answer_option_text: '도시',
          sort_order: 3,
        },
        {
          key: 'village',
          answer_option_key: 'village',
          answer_option_text: '시골',
          sort_order: 4,
        },
      ],
    },
    {
      key: 'taste-gender',
      question_key: 'gender',
      question_text: '성별',
      selection_type: 'SINGLE',
      is_required: true,
      sort_order: 4,
      options: [
        {
          key: 'male',
          answer_option_key: 'male',
          answer_option_text: '남',
          sort_order: 1,
        },
        {
          key: 'female',
          answer_option_key: 'female',
          answer_option_text: '여',
          sort_order: 2,
        },
        {
          key: 'neutral',
          answer_option_key: 'neutral',
          answer_option_text: '중성',
          sort_order: 3,
        },
      ],
    },
    {
      key: 'taste-age',
      question_key: 'age',
      question_text: '연령',
      selection_type: 'SINGLE',
      is_required: true,
      sort_order: 5,
      options: [
        {
          key: 'teen',
          answer_option_key: 'teen',
          answer_option_text: '10대',
          sort_order: 1,
        },
        {
          key: 'twenties',
          answer_option_key: 'twenties',
          answer_option_text: '20대',
          sort_order: 2,
        },
        {
          key: 'thirties',
          answer_option_key: 'thirties',
          answer_option_text: '30대',
          sort_order: 3,
        },
        {
          key: 'forties',
          answer_option_key: 'forties',
          answer_option_text: '40대',
          sort_order: 4,
        },
        {
          key: 'fifties',
          answer_option_key: 'fifties',
          answer_option_text: '50대',
          sort_order: 5,
        },
      ],
    },
    {
      key: 'taste-scent',
      question_key: 'scent',
      question_text: '향조',
      selection_type: 'MULTI',
      is_required: true,
      sort_order: 6,
      options: [
        {
          key: 'citrus',
          answer_option_key: 'citrus',
          answer_option_text: '시트러스',
          sort_order: 1,
        },
        {
          key: 'aromatic',
          answer_option_key: 'aromatic',
          answer_option_text: '아로마틱',
          sort_order: 2,
        },
        {
          key: 'oriental',
          answer_option_key: 'oriental',
          answer_option_text: '오리엔탈',
          sort_order: 3,
        },
        {
          key: 'woody',
          answer_option_key: 'woody',
          answer_option_text: '우디',
          sort_order: 4,
        },
        {
          key: 'animalic',
          answer_option_key: 'animalic',
          answer_option_text: '애니멀릭',
          sort_order: 5,
        },
        {
          key: 'floral',
          answer_option_key: 'floral',
          answer_option_text: '플로럴',
          sort_order: 6,
        },
      ],
    },
    {
      key: 'taste-dislike-scent',
      question_key: 'dislike-scent',
      question_text: '기피 향조',
      selection_type: 'MULTI',
      is_required: true,
      sort_order: 7,
      options: [
        {
          key: 'citrus',
          answer_option_key: 'citrus',
          answer_option_text: '시트러스',
          sort_order: 1,
        },
        {
          key: 'aromatic',
          answer_option_key: 'aromatic',
          answer_option_text: '아로마틱',
          sort_order: 2,
        },
        {
          key: 'oriental',
          answer_option_key: 'oriental',
          answer_option_text: '오리엔탈',
          sort_order: 3,
        },
        {
          key: 'woody',
          answer_option_key: 'woody',
          answer_option_text: '우디',
          sort_order: 4,
        },
        {
          key: 'animalic',
          answer_option_key: 'animalic',
          answer_option_text: '애니멀릭',
          sort_order: 5,
        },
        {
          key: 'floral',
          answer_option_key: 'floral',
          answer_option_text: '플로럴',
          sort_order: 6,
        },
      ],
    },
    {
      key: 'taste-products',
      question_key: 'products',
      question_text: '관심 제품군',
      selection_type: 'SINGLE',
      is_required: true,
      sort_order: 8,
      options: [
        {
          key: 'diffuser',
          answer_option_key: 'diffuser',
          answer_option_text: '디퓨저',
          sort_order: 1,
        },
        {
          key: 'perfume',
          answer_option_key: 'perfume',
          answer_option_text: '향수',
          sort_order: 2,
        },
      ],
    },
  ],
  HEALTH: [
    {
      key: 'health-sleep',
      question_key: 'sleep',
      question_text: '수면 상태',
      selection_type: 'SINGLE',
      is_required: true,
      sort_order: 1,
      options: [
        {
          key: 'sleep-well',
          answer_option_key: 'sleep-well',
          answer_option_text: '잘잔다',
          sort_order: 1,
        },
        {
          key: 'wake-often',
          answer_option_key: 'wake-often',
          answer_option_text: '자주 깬다',
          sort_order: 2,
        },
        {
          key: 'hard-to-fall-asleep',
          answer_option_key: 'hard-to-fall-asleep',
          answer_option_text: '잠들기 어렵다',
          sort_order: 3,
        },
        {
          key: 'always-tired',
          answer_option_key: 'always-tired',
          answer_option_text: '항상 피곤하다',
          sort_order: 4,
        },
      ],
    },
    {
      key: 'health-stress',
      question_key: 'stress',
      question_text: '스트레스 수준',
      selection_type: 'SINGLE',
      is_required: true,
      sort_order: 2,
      options: [
        {
          key: 'none',
          answer_option_key: 'none',
          answer_option_text: '거의 없다',
          sort_order: 1,
        },
        {
          key: 'sometimes',
          answer_option_key: 'sometimes',
          answer_option_text: '가끔 느낀다',
          sort_order: 2,
        },
        {
          key: 'often',
          answer_option_key: 'often',
          answer_option_text: '자주 느낀다',
          sort_order: 3,
        },
        {
          key: 'always',
          answer_option_key: 'always',
          answer_option_text: '항상 느낀다',
          sort_order: 4,
        },
      ],
    },
    {
      key: 'health-anxiety',
      question_key: 'anxiety',
      question_text: '불안 정도',
      selection_type: 'SINGLE',
      is_required: true,
      sort_order: 3,
      options: [
        {
          key: 'none',
          answer_option_key: 'none',
          answer_option_text: '거의 없다',
          sort_order: 1,
        },
        {
          key: 'sometimes',
          answer_option_key: 'sometimes',
          answer_option_text: '가끔 느낀다',
          sort_order: 2,
        },
        {
          key: 'often',
          answer_option_key: 'often',
          answer_option_text: '자주 느낀다',
          sort_order: 3,
        },
        {
          key: 'always',
          answer_option_key: 'always',
          answer_option_text: '항상 느낀다',
          sort_order: 4,
        },
      ],
    },
    {
      key: 'health-focus',
      question_key: 'focus',
      question_text: '집중력',
      selection_type: 'SINGLE',
      is_required: true,
      sort_order: 4,
      options: [
        {
          key: 'focus-good',
          answer_option_key: 'focus-good',
          answer_option_text: '잘 집중한다',
          sort_order: 1,
        },
        {
          key: 'distract-sometimes',
          answer_option_key: 'distract-sometimes',
          answer_option_text: '가끔 산만하다',
          sort_order: 2,
        },
        {
          key: 'distract-often',
          answer_option_key: 'distract-often',
          answer_option_text: '자주 산만하다',
          sort_order: 3,
        },
        {
          key: 'focus-very-hard',
          answer_option_key: 'focus-very-hard',
          answer_option_text: '집중이 매우 어렵다',
          sort_order: 4,
        },
      ],
    },
    {
      key: 'health-improvement',
      question_key: 'improvement',
      question_text: '원하는 개선 영역',
      selection_type: 'MULTI',
      is_required: true,
      sort_order: 5,
      options: [
        {
          key: 'relax-stress',
          answer_option_key: 'relax-stress',
          answer_option_text: '스트레스 완화',
          sort_order: 1,
        },
        {
          key: 'improve-sleep',
          answer_option_key: 'improve-sleep',
          answer_option_text: '수면개선',
          sort_order: 2,
        },
        {
          key: 'relieve-anxiety',
          answer_option_key: 'relieve-anxiety',
          answer_option_text: '불안해소',
          sort_order: 3,
        },
        {
          key: 'improve-focus',
          answer_option_key: 'improve-focus',
          answer_option_text: '집중력 향상',
          sort_order: 4,
        },
      ],
    },
    {
      key: 'health-products',
      question_key: 'products-health',
      question_text: '관심 제품군',
      selection_type: 'SINGLE',
      is_required: true,
      sort_order: 6,
      options: [
        {
          key: 'diffuser',
          answer_option_key: 'diffuser',
          answer_option_text: '디퓨저',
          sort_order: 1,
        },
        {
          key: 'perfume',
          answer_option_key: 'perfume',
          answer_option_text: '향수',
          sort_order: 2,
        },
      ],
    },
  ],
  INTERIOR: [
    {
      key: 'interior-photo',
      question_key: 'photo-interior',
      question_text: '사진 첨부',
      selection_type: 'PHOTO',
      is_required: true,
      sort_order: 1,
      options: [],
    },
    {
      key: 'interior-products',
      question_key: 'products-interior',
      question_text: '관심 제품군',
      selection_type: 'SINGLE',
      is_required: true,
      sort_order: 2,
      options: [
        {
          key: 'diffuser',
          answer_option_key: 'diffuser',
          answer_option_text: '디퓨저',
          sort_order: 1,
        },
        {
          key: 'perfume',
          answer_option_key: 'perfume',
          answer_option_text: '향수',
          sort_order: 2,
        },
      ],
    },
  ],
  OOTD: [
    {
      key: 'ootd-photo',
      question_key: 'photo-ootd',
      question_text: '사진 첨부',
      selection_type: 'PHOTO',
      is_required: true,
      sort_order: 1,
      options: [],
    },
    {
      key: 'ootd-products',
      question_key: 'products-ootd',
      question_text: '관심 제품군',
      selection_type: 'SINGLE',
      is_required: true,
      sort_order: 2,
      options: [
        {
          key: 'diffuser',
          answer_option_key: 'diffuser',
          answer_option_text: '디퓨저',
          sort_order: 1,
        },
        {
          key: 'perfume',
          answer_option_key: 'perfume',
          answer_option_text: '향수',
          sort_order: 2,
        },
      ],
    },
  ],
}

/**
 * 관리자가 선택할 수 있는 프리셋 목록
 */
export const ALL_PRESETS: Question[] = Object.values(DEFAULT_TEMPLATES).flat()

/**
 * 테스트 유형별 고정된 질문 키 옵션들 (AdminSelect용)
 */
export const CATEGORIZED_PRESET_OPTIONS: Record<
  string,
  { label: string; value: string }[]
> = Object.keys(DEFAULT_TEMPLATES).reduce(
  (acc, type) => {
    acc[type] = [
      ...DEFAULT_TEMPLATES[type].map((q) => ({
        label: `${q.question_text} (${q.question_key})`,
        value: q.question_key,
      })),
    ]
    return acc
  },
  {} as Record<string, { label: string; value: string }[]>
)

/**
 * 템플릿 데이터를 기반으로 질문 ID별 선택 가능한 벨류(Value) 옵션들을 생성하기.
 */
export const STANDARD_OPTIONS: Record<
  string,
  { label: string; value: string }[]
> = Object.values(DEFAULT_TEMPLATES)
  .flat()
  .reduce(
    (acc, q) => {
      if (q.options.length > 0 && !acc[q.question_key]) {
        acc[q.question_key] = q.options.map((o) => ({
          label: o.answer_option_text,
          value: o.answer_option_key,
        }))
      }
      return acc
    },
    {} as Record<string, { label: string; value: string }[]>
  )
