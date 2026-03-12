'use client'

import StorageCard from '@/components/storage/StorageCard'
import { useEffect, useState } from 'react'
import { apiFetch } from '@/lib/api'
import HeartIcon from '@/assets/icons/heart.svg'
import AdminTestIcon from '@/assets/icons/adminTest.svg'
import AdminRecommendationIcon from '@/assets/icons/adminRecommendation.svg'

const TAB_LIST = [
  { key: 'preference', label: '취향 테스트', icon: AdminTestIcon },
  { key: 'wellness', label: '웰니스 케어 진단', icon: HeartIcon },
  { key: 'ai', label: 'AI 추천', icon: AdminRecommendationIcon },
] as const

type TabKey = (typeof TAB_LIST)[number]['key']

export default function ProfileStoragePage() {
  const [activeTab, setActiveTab] = useState<TabKey>('preference')
  const [storageData, setStorageData] = useState<any[]>([])
  const [tabCounts, setTabCounts] = useState<Record<TabKey, number> | null>(
    null
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStorage() {
      setLoading(true)
      setError(null)
      try {
        const res = await apiFetch<{ data: any[] }>('/api/v1/storage')
        setStorageData(res.data)
        setTabCounts({
          preference: res.data.filter(
            (item: any) => item.input_data_type === 'PREFERENCE'
          ).length,
          wellness: res.data.filter(
            (item: any) => item.input_data_type === 'WELLNESS'
          ).length,
          ai: res.data.filter(
            (item: any) => item.input_data_type === 'AI_VISUAL'
          ).length,
        })
      } catch (e: any) {
        setError(e?.message || '데이터를 불러오지 못했습니다')
      } finally {
        setLoading(false)
      }
    }
    fetchStorage()
  }, [])
  const handleDelete = async (id: number) => {
    try {
      await apiFetch.delete(`/api/v1/storage/${id}`)
      setStorageData((prev) => {
        const newData = prev.filter((item) => item.id !== id)
        setTabCounts({
          preference: newData.filter(
            (item) => item.input_data_type === 'PREFERENCE'
          ).length,
          wellness: newData.filter(
            (item) => item.input_data_type === 'WELLNESS'
          ).length,
          ai: newData.filter((item) => item.input_data_type === 'AI_VISUAL')
            .length,
        })
        return newData
      })
    } catch (e) {
      alert('삭제에 실패했습니다.')
    }
  }

  return (
    <div className="mb-6 flex flex-col items-center text-2xl">
      <h1 className="mt-6 text-[36px] font-bold">향기 저장소</h1>
      <p className="text-gray my-2 text-[16px]">
        추천받았던 향기들을 다시 확인해보세요
      </p>

      {/* 상단 탭 버튼 */}
      <div className="my-8 flex h-13.5 w-141 items-center justify-center gap-4 rounded-full bg-white">
        {TAB_LIST.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={
              activeTab === tab.key
                ? 'bg-black-primary w-fit rounded-full px-5 py-2 font-bold text-white shadow'
                : 'text-black-primary w-fit rounded-full bg-white px-5 py-2 font-normal'
            }
            style={{ transition: 'all 0.2s' }}
          >
            <span className="flex items-center gap-2">
              <tab.icon width={20} height={20} />
              <span className="text-[14px] font-semibold">{tab.label}</span>
              <span className="text-black-primary ml-2 rounded-full bg-neutral-100 px-2 py-0.5 text-[13px] font-bold">
                {tabCounts ? tabCounts[tab.key] : 0}
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* 카드 영역 */}
      <div className="flex flex-wrap justify-center">
        {loading && <div>로딩 중...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {!loading &&
          !error &&
          storageData
            .filter((item) => {
              if (activeTab === 'preference')
                return item.input_data_type === 'PREFERENCE'
              if (activeTab === 'wellness')
                return item.input_data_type === 'WELLNESS'
              if (activeTab === 'ai')
                return item.input_data_type === 'AI_VISUAL'
              return true
            })
            .map((item) => (
              <StorageCard
                key={item.id}
                blendName={item.recommended_blend.name}
                blendImageUrl={item.recommended_blend.image_url}
                productType={item.product_type}
                elementCategory={item.recommended_blend.element_category}
                blendCategory={item.recommended_blend.blend_category}
                createdAt={item.created_at}
                onDelete={() => handleDelete(item.id)}
                onDetail={() => console.log('자세히 보기 클릭')}
              />
            ))}
      </div>
    </div>
  )
}
