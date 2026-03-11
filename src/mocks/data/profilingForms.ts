/**
 * 향기 성향 테스트 항목 조회 목 데이터
 * API 명세: GET /api/v1/profilings/forms/active?profiling_type=PREFERENCE|HEALTH
 */
import type { ProfilingForm } from '@/app/find-my-scent/_types'

/** 취향 테스트(PREFERENCE) 활성 폼 목 데이터 */
export const mockProfilingFormPREFERENCE: ProfilingForm = {
  form_id: 1,
  name: '취향 테스트 v1',
  profiling_type: 'PREFERENCE',
  questions: [
    {
      id: 1,
      question_key: 'mood',
      question_text: '평소 선호하는 분위기는 무엇인가요?',
      selection_type: 'SINGLE',
      is_required: true,
      options: [
        {
          id: 1,
          answer_option_key: 'calm',
          answer_option_text: '차분하고 편안한',
        },
        {
          id: 2,
          answer_option_key: 'energetic',
          answer_option_text: '활기차고 경쾌한',
        },
        {
          id: 3,
          answer_option_key: 'elegant',
          answer_option_text: '우아하고 세련된',
        },
        {
          id: 4,
          answer_option_key: 'mysterious',
          answer_option_text: '신비롭고 깊은',
        },
        {
          id: 5,
          answer_option_key: 'fresh',
          answer_option_text: '자연스럽고 청량한',
        },
      ],
    },
    {
      id: 2,
      question_key: 'intensity',
      question_text: '선호하는 향의 강도는?',
      selection_type: 'SINGLE',
      is_required: true,
      options: [
        { id: 6, answer_option_key: 'subtle', answer_option_text: '은은하게' },
        { id: 7, answer_option_key: 'medium', answer_option_text: '적당히' },
        { id: 8, answer_option_key: 'strong', answer_option_text: '선명하게' },
      ],
    },
    {
      id: 3,
      question_key: 'situation',
      question_text: '좋아하는 시간대나 상황을 골라주세요.',
      selection_type: 'MULTI',
      is_required: false,
      options: [
        {
          id: 9,
          answer_option_key: 'morning',
          answer_option_text: '아침, 상쾌할 때',
        },
        {
          id: 10,
          answer_option_key: 'work',
          answer_option_text: '업무·집중할 때',
        },
        {
          id: 11,
          answer_option_key: 'evening',
          answer_option_text: '휴식·저녁',
        },
        {
          id: 12,
          answer_option_key: 'special',
          answer_option_text: '특별한 날',
        },
      ],
    },
    {
      id: 4,
      question_key: 'note',
      question_text: '선호하는 노트 계열이 있나요?',
      selection_type: 'SINGLE',
      is_required: true,
      options: [
        { id: 13, answer_option_key: 'floral', answer_option_text: '플로럴' },
        { id: 14, answer_option_key: 'citrus', answer_option_text: '시트러스' },
        { id: 15, answer_option_key: 'woody', answer_option_text: '우디' },
        {
          id: 16,
          answer_option_key: 'unknown',
          answer_option_text: '잘 모르겠음',
        },
      ],
    },
    {
      id: 5,
      question_key: 'purpose',
      question_text: '사용 목적을 선택해주세요.',
      selection_type: 'MULTI',
      is_required: false,
      options: [
        { id: 17, answer_option_key: 'daily', answer_option_text: '데일리' },
        {
          id: 18,
          answer_option_key: 'special_day',
          answer_option_text: '특별한 날',
        },
        { id: 19, answer_option_key: 'gift', answer_option_text: '선물' },
        { id: 20, answer_option_key: 'sleep', answer_option_text: '수면·휴식' },
      ],
    },
    {
      id: 6,
      question_key: 'longevity',
      question_text: '향수의 지속력에 대한 선호는?',
      selection_type: 'SINGLE',
      is_required: true,
      options: [
        {
          id: 21,
          answer_option_key: 'long_subtle',
          answer_option_text: '은은하게 오래',
        },
        {
          id: 22,
          answer_option_key: 'short_strong',
          answer_option_text: '강하게 짧게',
        },
        {
          id: 23,
          answer_option_key: 'medium',
          answer_option_text: '중간 정도',
        },
        {
          id: 24,
          answer_option_key: 'depends',
          answer_option_text: '상황에 따라 다름',
        },
        {
          id: 25,
          answer_option_key: 'unknown',
          answer_option_text: '잘 모르겠음',
        },
      ],
    },
  ],
}

/** 건강 테스트(HEALTH) 활성 폼 목 데이터 */
export const mockProfilingFormHEALTH: ProfilingForm = {
  form_id: 2,
  name: '웰니스 케어 진단 v1',
  profiling_type: 'HEALTH',
  questions: [
    {
      id: 101,
      question_key: 'condition',
      question_text: '요즘 가장 신경 쓰이는 상태를 골라주세요.',
      selection_type: 'MULTI',
      is_required: true,
      options: [
        { id: 201, answer_option_key: 'sleep', answer_option_text: '숙면' },
        { id: 202, answer_option_key: 'focus', answer_option_text: '집중' },
        { id: 203, answer_option_key: 'relax', answer_option_text: '휴식' },
        { id: 204, answer_option_key: 'mood', answer_option_text: '기분 전환' },
      ],
    },
    {
      id: 102,
      question_key: 'frequency',
      question_text: '아로마를 활용하고 싶은 시간대는?',
      selection_type: 'SINGLE',
      is_required: true,
      options: [
        { id: 205, answer_option_key: 'morning', answer_option_text: '아침' },
        { id: 206, answer_option_key: 'day', answer_option_text: '낮' },
        {
          id: 207,
          answer_option_key: 'night',
          answer_option_text: '저녁·취침 전',
        },
      ],
    },
    {
      id: 103,
      question_key: 'stress_level',
      question_text: '요즘 스트레스 수준은 어느 정도인가요?',
      selection_type: 'SINGLE',
      is_required: true,
      options: [
        { id: 208, answer_option_key: 'low', answer_option_text: '낮음' },
        { id: 209, answer_option_key: 'medium', answer_option_text: '보통' },
        { id: 210, answer_option_key: 'high', answer_option_text: '높음' },
      ],
    },
    {
      id: 104,
      question_key: 'usage_place',
      question_text: '아로마를 주로 사용할 공간은?',
      selection_type: 'MULTI',
      is_required: false,
      options: [
        { id: 211, answer_option_key: 'bedroom', answer_option_text: '침실' },
        { id: 212, answer_option_key: 'living', answer_option_text: '거실' },
        {
          id: 213,
          answer_option_key: 'office',
          answer_option_text: '업무 공간',
        },
        { id: 214, answer_option_key: 'bathroom', answer_option_text: '욕실' },
      ],
    },
    {
      id: 105,
      question_key: 'scent_preference',
      question_text: '선호하는 웰니스 향 계열이 있나요?',
      selection_type: 'SINGLE',
      is_required: true,
      options: [
        {
          id: 215,
          answer_option_key: 'lavender',
          answer_option_text: '라벤더 (진정)',
        },
        {
          id: 216,
          answer_option_key: 'citrus',
          answer_option_text: '시트러스 (상쾌)',
        },
        {
          id: 217,
          answer_option_key: 'woody',
          answer_option_text: '우디 (안정)',
        },
        {
          id: 218,
          answer_option_key: 'unknown',
          answer_option_text: '잘 모르겠음',
        },
      ],
    },
    {
      id: 106,
      question_key: 'goal',
      question_text: '아로마 테라피로 가장 얻고 싶은 효과는?',
      selection_type: 'MULTI',
      is_required: false,
      options: [
        {
          id: 219,
          answer_option_key: 'better_sleep',
          answer_option_text: '수면 질 개선',
        },
        {
          id: 220,
          answer_option_key: 'energy',
          answer_option_text: '에너지 보충',
        },
        { id: 221, answer_option_key: 'calm', answer_option_text: '마음 안정' },
        {
          id: 222,
          answer_option_key: 'concentration',
          answer_option_text: '집중력 향상',
        },
      ],
    },
  ],
}
