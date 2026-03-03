'use client'

import React from 'react'
import Button from '@/components/common/Button'
import AdminTestPlusIcon from '@/assets/icons/adminTestPlus.svg'
import { cn } from '@/lib/cn'

interface AdminPageHeaderProps {
  title: string
  buttonText?: string
  onButtonClick?: () => void
  buttonIcon?: 'plus' | 'save' | 'none'
  leftContent?: React.ReactNode
  rightContent?: React.ReactNode
  className?: string
}

export const AdminPageHeader = ({
  title,
  buttonText,
  onButtonClick,
  buttonIcon = 'plus',
  leftContent,
  rightContent,
  className,
}: AdminPageHeaderProps) => (
  <div className={cn('mb-8 flex items-center justify-between', className)}>
    <div className="flex flex-col gap-2">
      {leftContent}
      <h2 className="text-black-primary text-xl font-bold">{title}</h2>
    </div>

    <div className="flex items-center gap-2">
      {rightContent}
      {buttonText && (
        <Button
          color={buttonIcon === 'save' ? 'none' : 'primary'}
          size="w139h40"
          rounded="sm"
          onClick={onButtonClick}
          className={cn(
            buttonIcon === 'save' &&
              'bg-purple-primary text-white hover:bg-purple-700'
          )}
        >
          <div className="flex items-center gap-2">
            {buttonIcon === 'plus' && (
              <AdminTestPlusIcon width={20} height={20} />
            )}
            <span>{buttonText}</span>
          </div>
        </Button>
      )}
    </div>
  </div>
)
