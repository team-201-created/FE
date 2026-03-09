'use server'

import { updateTag } from 'next/cache'

// 추천 시스템 관리자 페이지의 캐시를 강제로 무효화하는 액션
export async function updateRecommendList({ tabId }: { tabId: string }) {
  updateTag(tabId)
}
