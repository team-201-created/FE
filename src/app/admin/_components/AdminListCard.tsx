'use client'

import React from 'react'
import { cn } from '@/lib/cn'

export const AdminListCard = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => (
  <div className={cn('rounded-[20px] bg-white p-8', className)}>{children}</div>
)
