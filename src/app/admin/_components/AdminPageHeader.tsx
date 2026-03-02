'use client'

import React from 'react'
import Button from '@/components/common/Button'
import AdminTestPlusIcon from '@/assets/icons/adminTestPlus.svg'

interface AdminPageHeaderProps {
  title: string
  buttonText?: string
  onButtonClick?: () => void
}

export const AdminPageHeader = ({
  title,
  buttonText,
  onButtonClick,
}: AdminPageHeaderProps) => (
  <div className="mb-4 flex items-center justify-between">
    <h2 className="text-black-primary text-xl font-bold">{title}</h2>
    {buttonText && (
      <Button
        color="primary"
        size="w139h40"
        rounded="sm"
        onClick={onButtonClick}
      >
        <div className="flex items-center gap-2">
          <AdminTestPlusIcon width={20} height={20} />
          <span>{buttonText}</span>
        </div>
      </Button>
    )}
  </div>
)
