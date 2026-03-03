'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import { cn } from '@/lib/cn'
import { ADMIN_SIDEBAR_NAV_LINKS } from '@/constants/sidebarNavLink'
import AdminBoxIcon from '@/assets/icons/adminBox.svg'
import AdminCategoryIcon from '@/assets/icons/adminCategory.svg'
import AdminTestIcon from '@/assets/icons/adminTest.svg'
import AdminRecommendationIcon from '@/assets/icons/adminRecommendation.svg'

const SIDEBAR_ACTIVE_TRANSITION = {
  type: 'spring',
  stiffness: 350,
  damping: 30,
} as const

const ICON_MAP = {
  product: <AdminBoxIcon width={20} height={20} />,
  category: <AdminCategoryIcon width={20} height={20} />,
  test: <AdminTestIcon width={20} height={20} />,
  recommend: <AdminRecommendationIcon width={20} height={20} />,
}

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-60">
      <nav className="rounded-2xl bg-white p-4 shadow-md">
        <ul className="flex flex-col gap-2">
          {ADMIN_SIDEBAR_NAV_LINKS.map((item) => {
            const isSidebarActive = pathname.startsWith(item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'group text-md relative flex items-center gap-3 rounded-2xl px-4 py-3 font-medium transition-colors duration-300',
                    isSidebarActive
                      ? 'text-white'
                      : 'text-gray-primary hover:text-black-primary'
                  )}
                >
                  {isSidebarActive && (
                    <motion.div
                      layoutId="sidebar-active-pill"
                      className="bg-black-primary absolute inset-0 z-0 rounded-2xl"
                      transition={SIDEBAR_ACTIVE_TRANSITION}
                    />
                  )}

                  <span className="relative">
                    {ICON_MAP[item.iconType as keyof typeof ICON_MAP]}
                  </span>
                  <span className="relative">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
