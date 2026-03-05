import { useCallback, useState } from 'react'
import { BlendMapItemResponse } from '@/app/admin/recommend/_types'
import { fetchAdminBlendMaps } from '@/app/admin/recommend/_api'

export const useRecommendList = () => {
  const [data, setData] = useState<BlendMapItemResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getRecommendList = useCallback(async (tabId: string) => {
    if (tabId === 'SCENT_MAP') {
      setIsLoading(true)
      const response = await fetchAdminBlendMaps()
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
