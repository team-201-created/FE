'use client'

import React from 'react'
import { AdminSelect } from '@/app/admin/_components'

import { BlendMapsFormProps } from '@/app/admin/recommend/_types'

export const BlendMapsForm = ({ value, onChange }: BlendMapsFormProps) => {
  return (
    <div className="flex flex-col gap-2 py-5">
      <label className="text-lg font-bold">테스트 유형</label>
      <AdminSelect
        value={value}
        onChange={onChange}
        width="w-full"
        options={[
          // 유형 고정값
          { label: '취향', value: 'PREFERENCE' },
          { label: '건강', value: 'HEALTH' },
          { label: 'OOTD', value: 'OOTD' },
          { label: '인테리어', value: 'INTERIOR' },
        ]}
      />
      <span className="text-sm text-gray-500">
        선택한 테스트의 모든 가능한 조합을 계산하여 추천 맵이 생성됩니다.
      </span>
    </div>
  )
}
