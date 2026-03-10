'use client'

/** 취향 테스트: 클라이언트에서 질문 조회 (MSW·실API 공통) */
import { ProfilingTestPage } from '../_components/ProfilingTestPage'

export default function TasteTestPage() {
  return <ProfilingTestPage testType="PREFERENCE" />
}
