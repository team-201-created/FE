'use client'

/** 단품/조합 목록 조회 (캐시된 promise + use로 suspense 대응) */
import { use } from 'react'
import {
  fetchSingles,
  fetchCombinations,
  type SinglesResponse,
  type CombinationsResponse,
} from '../_api/productsClient'

let singlesPromise: Promise<SinglesResponse> | null = null
let combinationsPromise: Promise<CombinationsResponse> | null = null

export type SingleItem = SinglesResponse['data']['items'][number]
export type CombinationItem = CombinationsResponse['data']['items'][number]

export function useSinglesList(): SingleItem[] {
  if (!singlesPromise) {
    singlesPromise = fetchSingles({ page: 1, size: 100 })
  }
  const res = use(singlesPromise)
  return res.data.items
}

export function useCombinationsList(): CombinationItem[] {
  if (!combinationsPromise) {
    combinationsPromise = fetchCombinations({ page: 1, size: 100 })
  }
  const res = use(combinationsPromise)
  return res.data.items
}
