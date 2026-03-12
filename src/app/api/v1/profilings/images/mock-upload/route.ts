/**
 * Mock 이미지 업로드 수신 (presigned_url로 PUT 시, MSW 미가로챔 시 fallback)
 * PUT /api/v1/profilings/images/mock-upload
 */
import { NextResponse } from 'next/server'

export async function PUT() {
  return new NextResponse(null, { status: 200 })
}
