import { useEffect, useState } from 'react'
import { TestListItem } from '@/app/admin/test/_types'
import { fetchAdminTests, FormsFetchOptions } from '@/app/admin/test/_api'

export const useTestList = (options: FormsFetchOptions = {}) => {
  const [tests, setTests] = useState<TestListItem[]>([])

  useEffect(() => {
    const loadTests = async () => {
      const response = await fetchAdminTests(options)
      if (response.success) {
        setTests(response.data.content)
      }
    }
    loadTests()
  }, [
    options.publish_status,
    options.profiling_type,
    options.page,
    options.size,
  ])

  const handleTogglePublish = (id: number) => {
    setTests((prev) => {
      const target = prev.find((t) => t.id === id)
      if (!target) return prev

      return prev.map((test) => {
        if (test.id === id) {
          return {
            ...test,
            publish_status:
              test.publish_status === 'PUBLISHED' ? 'UNPUBLISHED' : 'PUBLISHED',
            updated_at: new Date().toISOString(),
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
