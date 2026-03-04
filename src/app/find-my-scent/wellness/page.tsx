'use client'

import { QuizView } from '../_components/QuizView'

/* TODO: 목데이터 연동 시 제거 - 더미 타입 & 데이터 */
type QuestionType = 'SINGLE' | 'MULTI'
type QuestionOption = { id: string; text: string }
type Question = {
  id: string
  text: string
  required: boolean
  questionType: QuestionType
  options: QuestionOption[]
}
const MOCK_QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: '평소 선호하는 분위기는 무엇인가요?',
    required: true,
    questionType: 'SINGLE',
    options: [
      { id: 'q1-a', text: '차분하고 편안한' },
      { id: 'q1-b', text: '활기차고 경쾌한' },
      { id: 'q1-c', text: '우아하고 세련된' },
      { id: 'q1-d', text: '신비롭고 깊은' },
      { id: 'q1-e', text: '자연스럽고 청량한' },
    ],
  },
  {
    id: 'q2',
    text: '선호하는 향의 강도는?',
    required: true,
    questionType: 'SINGLE',
    options: [
      { id: 'q2-a', text: '은은하게' },
      { id: 'q2-b', text: '적당히' },
      { id: 'q2-c', text: '선명하게' },
    ],
  },
  {
    id: 'q3',
    text: '좋아하는 시간대나 상황을 골라주세요.',
    required: false,
    questionType: 'MULTI',
    options: [
      { id: 'q3-a', text: '아침, 상쾌할 때' },
      { id: 'q3-b', text: '업무·집중할 때' },
      { id: 'q3-c', text: '휴식·저녁' },
      { id: 'q3-d', text: '특별한 날' },
    ],
  },
  {
    id: 'q4',
    text: '선호하는 노트 계열이 있나요?',
    required: true,
    questionType: 'SINGLE',
    options: [
      { id: 'q4-a', text: '플로럴' },
      { id: 'q4-b', text: '시트러스' },
      { id: 'q4-c', text: '우디' },
      { id: 'q4-d', text: '잘 모르겠음' },
    ],
  },
  {
    id: 'q5',
    text: '사용 목적을 선택해주세요.',
    required: false,
    questionType: 'MULTI',
    options: [
      { id: 'q5-a', text: '데일리' },
      { id: 'q5-b', text: '특별한 날' },
      { id: 'q5-c', text: '선물' },
      { id: 'q5-d', text: '수면·휴식' },
    ],
  },
  {
    id: 'q6',
    text: '향수의 지속력에 대한 선호는?',
    required: true,
    questionType: 'SINGLE',
    options: [
      { id: 'q6-a', text: '은은하게 오래' },
      { id: 'q6-b', text: '강하게 짧게' },
      { id: 'q6-c', text: '중간 정도' },
      { id: 'q6-d', text: '상황에 따라 다름' },
      { id: 'q6-e', text: '잘 모르겠음' },
    ],
  },
]

export default function WellnessPage() {
  return <QuizView testType="HEALTH" questions={MOCK_QUESTIONS} />
}
