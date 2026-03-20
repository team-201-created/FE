import { AdminSidebar } from '@/app/admin/_components/AdminSidebar'
import { AdminAccessGuard } from '@/components/common/AdminAccessGuard'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminAccessGuard>
      <div className="min-h-screen px-6 py-10 md:px-12 lg:px-24 xl:px-36 xl:py-16">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-black-primary text-[2.25rem] font-bold">
            관리자 대시보드
          </h1>
        </div>
        <div className="flex flex-col items-start gap-6 md:flex-row">
          <div className="w-full md:w-auto">
            <AdminSidebar />
          </div>
          <main className="min-h-[500px] w-full flex-1">{children}</main>
        </div>
      </div>
    </AdminAccessGuard>
  )
}
