'use client'

import { useRouter } from 'next/navigation'
import Button from '@/components/common/Button'
import PenIcon from '@/assets/icons/pen.svg'

interface TestEditButtonProps {
  testId: number
}

export function TestEditButton({ testId }: TestEditButtonProps) {
  const router = useRouter()

  return (
    <Button
      color="none"
      size="w32h32"
      rounded="sm"
      onClick={(e) => {
        e.stopPropagation()
        router.push(`/admin/test/edit/${testId}`)
      }}
    >
      <PenIcon width={16} height={16} className="text-gray-secondary" />
    </Button>
  )
}
