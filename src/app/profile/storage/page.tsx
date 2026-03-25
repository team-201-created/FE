'use client'

import StorageCard from '@/components/storage/StorageCard'
import type {
  AnalysisInputDataType,
  AnalysisResultItem,
  AnalysisResultListApiResponse,
} from './_types'
import { useEffect, useState } from 'react'
import { LoginRequiredTestModal } from '@/app/find-my-scent/_components/LoginRequiredTestModal'
import { resolveApiMediaUrl } from '@/lib/resolveApiMediaUrl'
import { useAuthStore } from '@/store/useAuthStore'
import { useRouter } from 'next/navigation'
import StorageCardSkeleton from '@/components/storage/StorageCardSkeleton'
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
const MIN_SKELETON_MS = 500

const TAB_TO_INPUT_TYPES: Record<TabKey, AnalysisInputDataType[]> = {
  preference: ['PREFERENCE'],
  wellness: ['HEALTH'],
  ai_ootd: ['OOTD'],
  ai_interior: ['INTERIOR'],
}

const ALL_INPUT_TYPES: AnalysisInputDataType[] = [
  'PREFERENCE',
  'HEALTH',
  'OOTD',
  'INTERIOR',
]

const INPUT_TYPE_TO_TAB: Record<AnalysisInputDataType, TabKey> = {
  PREFERENCE: 'preference',
  HEALTH: 'wellness',
  OOTD: 'ai_ootd',
  INTERIOR: 'ai_interior',
}

const RESULT_PATH_BY_INPUT_TYPE: Record<AnalysisInputDataType, string> = {
  PREFERENCE: '/find-my-scent/taste-test/result',
  HEALTH: '/find-my-scent/wellness/result',
  OOTD: '/find-my-scent/ai-visual/result',
  INTERIOR: '/find-my-scent/ai-visual/result',
}

const toAccordId = (raw: string | undefined): string => {
  if (!raw) return 'base'
  return raw.trim().toLowerCase()
}

const mapBlendCategories = (item: AnalysisResultItem): string[] => {
  if (!item.matched_blend) return []

  const categories = Array.isArray(item.matched_blend.categories)
    ? item.matched_blend.categories
    : []

  const names = categories
    .map((category) => category.name?.kr?.trim())
    .filter((name): name is string => Boolean(name))

  return Array.from(new Set(names))
}

const mapElementCategories = (item: AnalysisResultItem): string[] => {
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

const fetchResultsByInputTypes = async (
  inputTypes: AnalysisInputDataType[],
  size: number
) => {
  const responses = await Promise.all(
    inputTypes.map((inputType) =>
      requestAnalysisResults({
        input_data_type: inputType,
        sort: DEFAULT_SORT,
        page: DEFAULT_PAGE,
        size,
      })
    )
  )

  return responses
}

const emptyTabCounts: Record<TabKey, number> = {
  preference: 0,
  wellness: 0,
  ai_ootd: 0,
  ai_interior: 0,
}

export default function ProfileStoragePage() {
  const router = useRouter()
  const { isInitialized, isLoggedIn } = useAuthStore()
  const [activeTab, setActiveTab] = useState<TabKey>('preference')
  const [storageData, setStorageData] = useState<AnalysisResultItem[]>([])
  const [tabCounts, setTabCounts] = useState<Record<TabKey, number> | null>(
    null
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isInitialized || isLoggedIn !== true) return

    let cancelled = false

    async function fetchTabCounts() {
      try {
        const responses = await fetchResultsByInputTypes(ALL_INPUT_TYPES, 1)

        if (cancelled) return

        const nextCounts = responses.reduce<Record<TabKey, number>>(
          (acc, response, index) => {
            const inputType = ALL_INPUT_TYPES[index]
            const tabKey = INPUT_TYPE_TO_TAB[inputType]
            acc[tabKey] = response.data?.count ?? 0
            return acc
          },
          { ...emptyTabCounts }
        )

        setTabCounts(nextCounts)
      } catch {
        if (!cancelled) setTabCounts({ ...emptyTabCounts })
      }
    }

    void fetchTabCounts()

    return () => {
      cancelled = true
    }
  }, [isInitialized, isLoggedIn])

  useEffect(() => {
    if (!isInitialized || isLoggedIn !== true) return

    let cancelled = false

    async function fetchStorageByTab() {
      const startedAt = Date.now()

      if (!cancelled) {
        setLoading(true)
        setError(null)
      }

      try {
        const inputTypes = TAB_TO_INPUT_TYPES[activeTab]
        const responses = await fetchResultsByInputTypes(
          inputTypes,
          DEFAULT_SIZE
        )

        const mergedResults = responses
          .flatMap((res) => (res.success && res.data ? res.data.results : []))
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )

        if (!cancelled) setStorageData(mergedResults)
      } catch (error: unknown) {
        if (cancelled) return

        const message =
          error instanceof Error
            ? error.message
            : '데이터를 불러오지 못했습니다'
        setError(message)
        setStorageData([])
      } finally {
        const elapsed = Date.now() - startedAt
        const remaining = MIN_SKELETON_MS - elapsed

        if (remaining > 0) {
          await new Promise((resolve) => setTimeout(resolve, remaining))
        }

        if (!cancelled) setLoading(false)
      }
    }

    void fetchStorageByTab()

    return () => {
      cancelled = true
    }
  }, [activeTab, isInitialized, isLoggedIn])

  if (!isInitialized) {
    return null
  }

  if (isLoggedIn !== true) {
    return <LoginRequiredTestModal isOpen onClose={() => undefined} />
  }

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
        {loading && <StorageCardSkeleton />}
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
              elementCategory={mapElementCategories(item)}
              blendCategory={mapBlendCategories(item)}
              createdAt={item.created_at ?? ''}
              onDetail={() => {
                const resultPath =
                  RESULT_PATH_BY_INPUT_TYPE[item.input_data_type]
                router.push(
                  `${resultPath}?result_id=${item.id}&skip_analyzing=1`
                )
              }}
            />
          ))}
      </div>
    </div>
  )
}
