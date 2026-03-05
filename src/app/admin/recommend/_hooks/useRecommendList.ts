import { useCallback, useState } from 'react'
import {
  ScentMapItemResponse,
  ProductMapItemResponse,
} from '@/app/admin/recommend/_types'
import {
  fetchAdminScentMaps,
  fetchAdminProductMaps,
} from '@/app/admin/recommend/_api'

export const useRecommendList = () => {
  const [data, setData] = useState<
    (ScentMapItemResponse | ProductMapItemResponse)[]
  >([])
  const [isLoading, setIsLoading] = useState(false)

  const getRecommendList = useCallback(async (tabId: string) => {
    setIsLoading(true)
    if (tabId === 'SCENT_MAP') {
      const response = await fetchAdminScentMaps()
      if (response.success) {
        setData(response.data.content)
      }
    } else if (tabId === 'PRODUCT_MAP') {
      const response = await fetchAdminProductMaps()
      if (response.success) {
        setData(response.data.content)
      }
    } else {
      setData([])
    }
    setIsLoading(false)
  }, [])

  const handleTogglePublish = async (id: number, currentTab: string) => {
    if (!id) return

    // TODO: toggle 발행 / 미발행 or 채택 / 비채택 api 호출
    await getRecommendList(currentTab)
  }

  return {
    data,
    isLoading,
    getRecommendList,
    handleTogglePublish,
  }
}
