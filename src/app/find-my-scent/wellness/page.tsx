'use client'

/** 건강 테스트: 클라이언트에서 질문 조회 (MSW·실API 공통) */
import { ProfilingTestPage } from '../_components/ProfilingTestPage'

export default function WellnessPage() {
  return <ProfilingTestPage testType="HEALTH" />
}
