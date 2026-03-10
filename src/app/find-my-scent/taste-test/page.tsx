/** 취향 테스트: 서버에서 질문 조회 후 클라이언트 퀴즈에 전달 */
import {
  fetchProfilingFormActive,
  toQuizQuestions,
} from '../_api/profilingClient'
import { ProfilingQuizClient } from '../_components/ProfilingQuizClient'
import { PageCenter } from '@/components/common/PageCenter'

export default async function TasteTestPage() {
  const { data } = await fetchProfilingFormActive('PREFERENCE')
  const questions = toQuizQuestions(data)

  if (questions.length === 0) {
    return (
      <PageCenter>
        <p className="text-neutral-500">진행 중인 테스트가 없어요.</p>
      </PageCenter>
    )
  }

  return (
    <ProfilingQuizClient testType="PREFERENCE" initialQuestions={questions} />
  )
}
