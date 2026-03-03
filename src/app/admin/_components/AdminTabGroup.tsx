'use client'

import React from 'react'
import { cn } from '@/lib/cn'
import Button from '@/components/common/Button'

interface AdminTabGroupProps {
  tabs: { id: string; label: string }[]
  activeTab: string
  onChange: (id: string) => void
  className?: string
  /** 탭들을 부모 너비에 맞춰 균등하게 배분할지 여부임 */
  fullWidth?: boolean
}

/**
 * 어드민 목록 페이지에서 사용되는 공통 탭 그룹 컴포넌트
 */
export const AdminTabGroup = ({
  tabs,
  activeTab,
  onChange,
  className,
  fullWidth = false,
}: AdminTabGroupProps) => {
  return (
    <div className={cn('flex gap-4 pb-4', fullWidth && 'w-full', className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <Button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'cursor-pointer rounded-xl text-sm font-semibold transition-all',
              fullWidth && 'flex-1',
              isActive
                ? 'bg-black-primary text-white'
                : 'bg-gray-light text-black-primary border-none shadow-none hover:bg-neutral-200'
            )}
          >
            {tab.label}
          </Button>
        )
      })}
    </div>
  )
}
