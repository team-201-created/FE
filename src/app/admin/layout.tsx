'use client'

import { AdminSidebar } from '@/app/admin/_components/AdminSidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen px-36 py-16">
      <div className="mb-10">
        <h1 className="text-black-primary text-[36px] font-bold">
          관리자 대시보드
        </h1>
      </div>
      <div className="flex items-start gap-6">
        <AdminSidebar />
        <main className="min-h-[500px] flex-1">{children}</main>
      </div>
    </div>
  )
}
