'use client'

import StorageCard from '@/components/storage/StorageCard'
import type {
  AnalysisInputDataType,
  AnalysisResultItem,
  AnalysisResultListApiResponse,
} from './_types'
import { useEffect, useState } from 'react'
import { resolveApiMediaUrl } from '@/lib/resolveApiMediaUrl'
import HeartIcon from '@/assets/icons/heart.svg'
import AdminTestIcon from '@/assets/icons/adminTest.svg'
import AdminRecommendationIcon from '@/assets/icons/adminRecommendation.svg'

const TAB_LIST = [
  { key: 'preference', label: '취향 테스트', icon: AdminTestIcon },
  { key: 'wellness', label: '웰니스 케어 진단', icon: HeartIcon },
  { key: 'ai_ootd', label: 'AI OOTD', icon: AdminRecommendationIcon },
  { key: 'ai_interior', label: 'AI 인테리어', icon: AdminRecommendationIcon },
] as const

type TabKey = (typeof TAB_LIST)[number]['key']

const ANALYSIS_RESULTS_API_PATH = '/api/v1/users/me/analysis-results'
const DEFAULT_SORT = 'created_at_desc'
const DEFAULT_PAGE = 1
const DEFAULT_SIZE = 50

const TAB_TO_INPUT_TYPES: Record<TabKey, AnalysisInputDataType[]> = {
  preference: ['PREFERENCE'],
  wellness: ['HEALTH'],
  ai_ootd: ['OOTD'],
  ai_interior: ['INTERIOR'],
}

const toAccordId = (raw: string | undefined): string => {
  if (!raw) return 'base'
  return raw.trim().toLowerCase()
}

const mapBlendCategories = (item: AnalysisResultItem): string[] => {
  if (!item.matched_blend) return ['base']

  const elements = Array.isArray(item.matched_blend.contained_elements)
    ? item.matched_blend.contained_elements
    : []

  const ids = elements
    .map((element) => toAccordId(element.category.en))
    .filter(Boolean)

  const uniqueIds = Array.from(new Set(ids))
  return uniqueIds.length > 0 ? uniqueIds : ['base']
}

const getElementCategory = (item: AnalysisResultItem): string => {
  if (!item.matched_blend) return 'base'

  const elements = Array.isArray(item.matched_blend.contained_elements)
    ? item.matched_blend.contained_elements
    : []

  const first = elements[0]
  return toAccordId(first?.category.en)
}

const requestAnalysisResults = async (params: {
  input_data_type: AnalysisInputDataType
  sort: string
  page: number
  size: number
}): Promise<AnalysisResultListApiResponse> => {
  const query = new URLSearchParams({
    input_data_type: params.input_data_type,
    sort: params.sort,
    page: String(params.page),
    size: String(params.size),
  }).toString()

  const response = await fetch(`${ANALYSIS_RESULTS_API_PATH}?${query}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-store',
  })

  const data = (await response
    .json()
    .catch(() => null)) as AnalysisResultListApiResponse | null

  if (!response.ok || !data) {
    throw new Error('데이터를 불러오지 못했습니다')
  }

  return data
}

export default function ProfileStoragePage() {
  const [activeTab, setActiveTab] = useState<TabKey>('preference')
  const [storageData, setStorageData] = useState<AnalysisResultItem[]>([])
  const [tabCounts, setTabCounts] = useState<Record<TabKey, number> | null>(
    null
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTabCounts() {
      try {
        const [preferenceRes, healthRes, ootdRes, interiorRes] =
          await Promise.all([
            requestAnalysisResults({
              input_data_type: 'PREFERENCE',
              sort: DEFAULT_SORT,
              page: DEFAULT_PAGE,
              size: 1,
            }),
            requestAnalysisResults({
              input_data_type: 'HEALTH',
              sort: DEFAULT_SORT,
              page: DEFAULT_PAGE,
              size: 1,
            }),
            requestAnalysisResults({
              input_data_type: 'OOTD',
              sort: DEFAULT_SORT,
              page: DEFAULT_PAGE,
              size: 1,
            }),
            requestAnalysisResults({
              input_data_type: 'INTERIOR',
              sort: DEFAULT_SORT,
              page: DEFAULT_PAGE,
              size: 1,
            }),
          ])

        setTabCounts({
          preference: preferenceRes.data?.count ?? 0,
          wellness: healthRes.data?.count ?? 0,
          ai_ootd: ootdRes.data?.count ?? 0,
          ai_interior: interiorRes.data?.count ?? 0,
        })
      } catch {
        setTabCounts({ preference: 0, wellness: 0, ai_ootd: 0, ai_interior: 0 })
      }
    }

    fetchTabCounts()
  }, [])

  useEffect(() => {
    async function fetchStorageByTab() {
      setLoading(true)
      setError(null)

      try {
        const inputTypes = TAB_TO_INPUT_TYPES[activeTab]
        const responses = await Promise.all(
          inputTypes.map((inputType) =>
            requestAnalysisResults({
              input_data_type: inputType,
              sort: DEFAULT_SORT,
              page: DEFAULT_PAGE,
              size: DEFAULT_SIZE,
            })
          )
        )

        const mergedResults = responses
          .flatMap((res) => (res.success && res.data ? res.data.results : []))
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )

        setStorageData(mergedResults)
      } catch (e: any) {
        setError(e?.message || '데이터를 불러오지 못했습니다')
        setStorageData([])
      } finally {
        setLoading(false)
      }
    }

    fetchStorageByTab()
  }, [activeTab])

  return (
    <div className="mb-6 flex flex-col items-center text-2xl">
      <h1 className="mt-6 text-[36px] font-bold">향기 저장소</h1>
      <p className="text-gray my-2 text-[16px]">
        추천받았던 향기들을 다시 확인해보세요
      </p>

      {/* 상단 탭 버튼 */}
      <div className="my-8 flex h-13.5 w-195 items-center justify-center gap-4 rounded-full bg-white">
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
        {!loading && !error && storageData.length === 0 && (
          <div className="text-gray-500">저장된 결과가 없습니다.</div>
        )}
        {!loading &&
          !error &&
          storageData.map((item) => (
            <StorageCard
              key={item.id}
              blendName={item.matched_blend?.name ?? '추천 블렌드 생성 중'}
              blendImageUrl={resolveApiMediaUrl(item.matched_blend?.image_url)}
              productType={item.product_type}
              elementCategory={getElementCategory(item)}
              blendCategory={mapBlendCategories(item)}
              createdAt={item.created_at ?? ''}
              onDetail={() => console.log('자세히 보기 클릭')}
            />
          ))}
      </div>
    </div>
  )
}
