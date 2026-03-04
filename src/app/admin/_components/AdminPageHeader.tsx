'use client'

import React from 'react'
import Button from '@/components/common/Button'
import { cn } from '@/lib/cn'

interface AdminPageHeaderProps {
  title: string
  buttonText?: string
  onButtonClick?: () => void
  buttonIcon?: 'plus' | 'save' | 'none'
  leftContent?: React.ReactNode
  rightContent?: React.ReactNode
  containerClassName?: string
}

export const AdminPageHeader = ({
  title,
  buttonText,
  onButtonClick,
  leftContent,
  rightContent,
  containerClassName,
}: AdminPageHeaderProps) => (
  <div
    className={cn('mb-6 flex items-center justify-between', containerClassName)}
  >
    <div className="flex flex-col gap-2">
      {leftContent}
      <h2 className="text-black-primary text-xl font-bold">{title}</h2>
    </div>

    <div className="flex items-center gap-2">
      {rightContent}
      {buttonText && (
        <Button
          color="primary"
          size="w139h40"
          rounded="sm"
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      )}
    </div>
  </div>
)
