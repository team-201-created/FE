'use client'

/** 단품/조합 목록 조회 (캐시된 promise + use로 suspense 대응) — API 명세 최종본 기준 */
import { use } from 'react'
import {
  fetchElements,
  fetchBlends,
  type ElementsListResponse,
  type BlendsListResponse,
} from '../_api/productsClient'

let elementsPromise: Promise<ElementsListResponse> | null = null
let blendsPromise: Promise<BlendsListResponse> | null = null

export type SingleItem = ElementsListResponse['data']['results'][number]
export type CombinationItem = BlendsListResponse['data']['results'][number]

export function useSinglesList(): SingleItem[] {
  if (!elementsPromise) {
    elementsPromise = fetchElements({ page: 1, size: 100 })
  }
  const res = use(elementsPromise)
  return res.data.results
}

export function useCombinationsList(): CombinationItem[] {
  if (!blendsPromise) {
    blendsPromise = fetchBlends({ page: 1, size: 100 })
  }
  const res = use(blendsPromise)
  return res.data.results
}
