import { useCallback, useState } from 'react'
<<<<<<< HEAD
import { ScentMapItemResponse } from '@/app/admin/recommend/_types'
import { fetchAdminScentMaps } from '@/app/admin/recommend/_api'

export const useRecommendList = () => {
  const [data, setData] = useState<ScentMapItemResponse[]>([])
=======
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
>>>>>>> b20e080 (feat: 추천관리 페이지를 TAB-ID 별로 구조화 (#65))
  const [isLoading, setIsLoading] = useState(false)

  const getRecommendList = useCallback(async (tabId: string) => {
    setIsLoading(true)
    if (tabId === 'SCENT_MAP') {
<<<<<<< HEAD
      setIsLoading(true)
      const response = await fetchAdminScentMaps()
=======
      const response = await fetchAdminScentMaps()
      if (response.success) {
        setData(response.data.content)
      }
    } else if (tabId === 'PRODUCT_MAP') {
      const response = await fetchAdminProductMaps()
>>>>>>> b20e080 (feat: 추천관리 페이지를 TAB-ID 별로 구조화 (#65))
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
