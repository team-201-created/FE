import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { fetchAdminTestDetail } from '@/app/admin/test/_api/adminFetchTestDetail'
import type { TestFormData } from '@/app/admin/test/create/_types'
import TestEditContent from './_page/TestEditContent'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '어드민 테스트 수정',
}

interface TestEditPageProps {
  params: Promise<{ id: string }>
}

export default async function TestEditPage({ params }: TestEditPageProps) {
  const { id } = await params
  const testId = Number(id)

  if (isNaN(testId)) notFound()

  let initialData: TestFormData | undefined

  try {
    const result = await fetchAdminTestDetail(testId)
    const item = result.data

    initialData = {
      name: item.name,
      description: item.description ?? '',
      profiling_type: item.profiling_type,
      questions: item.questions.map((q, idx) => ({
        key: q.id.toString(),
        question_key: q.question_key,
        question_text: q.question_text,
        selection_type: q.selection_type,
        is_required: q.is_required,
        sort_order: idx + 1,
        options: q.options.map((o, oIdx) => ({
          key: o.id.toString(),
          answer_option_key: o.answer_option_key,
          answer_option_text: o.answer_option_text,
          sort_order: oIdx + 1,
        })),
      })),
    }
  } catch {
    notFound()
  }

  if (!initialData) notFound()

  return <TestEditContent testId={testId} initialData={initialData} />
}
