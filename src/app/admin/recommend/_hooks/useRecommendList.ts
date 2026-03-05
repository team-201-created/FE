import { useCallback, useState } from 'react'
import { ScentMapItemResponse } from '@/app/admin/recommend/_types'
import { fetchAdminScentMaps } from '@/app/admin/recommend/_api'

export const useRecommendList = () => {
  const [data, setData] = useState<ScentMapItemResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getRecommendList = useCallback(async (tabId: string) => {
    if (tabId === 'SCENT_MAP') {
      setIsLoading(true)
      const response = await fetchAdminScentMaps()
      if (response.success) {
        setData(response.data.content)
      }
      setIsLoading(false)
    } else {
      setData([])
    }
  }, [])

  const handleTogglePublish = async (id: number, currentTab: string) => {
    if (!id) return

    // TODO: toggle publish api 호출
    await getRecommendList(currentTab)
  }

  return {
    data,
    isLoading,
    getRecommendList,
    handleTogglePublish,
  }
}
