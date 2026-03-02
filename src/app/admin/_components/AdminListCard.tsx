'use client'

import React from 'react'

export const AdminListCard = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-[20px] bg-white p-8 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
    {children}
  </div>
)
