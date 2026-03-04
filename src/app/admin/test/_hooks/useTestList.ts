import { useEffect, useState } from 'react'
import { TestListItem } from '@/app/admin/test/_types'
import { fetchAdminTests } from '@/app/admin/test/_api'

export const useTestList = () => {
  const [tests, setTests] = useState<TestListItem[]>([])

  useEffect(() => {
    const loadTests = async () => {
      const response = await fetchAdminTests()
      if (response.success) {
        setTests(response.data.content)
      }
    }
    loadTests()
  }, [])

  const handleTogglePublish = (id: number) => {
    setTests((prev) => {
      const target = prev.find((t) => t.id === id)
      if (!target) return prev

      const sameTypeTests = prev.filter(
        (t) => t.profiling_type === target.profiling_type
      )

      if (
        target.publish_status === 'PUBLISHED' &&
        sameTypeTests.filter((t) => t.publish_status === 'PUBLISHED').length <=
          1
      ) {
        alert('각 유형별로 최소 하나 이상의 테스트는 발행 상태여야 합니다.')
        return prev
      }

      return prev.map((test) => {
        if (test.id === id) {
          return {
            ...test,
            publish_status:
              test.publish_status === 'PUBLISHED' ? 'UNPUBLISHED' : 'PUBLISHED',
            updated_at: new Date().toISOString(),
          }
        }
        if (
          test.profiling_type === target.profiling_type &&
          target.publish_status === 'UNPUBLISHED'
        ) {
          return {
            ...test,
            publish_status: 'UNPUBLISHED',
          }
        }
        return test
      })
    })
  }

  return {
    tests,
    handleTogglePublish,
  }
}
