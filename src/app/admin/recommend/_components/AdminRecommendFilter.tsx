import { AdminSelect } from '@/app/admin/_components'
import {
  ADOPTION_STATUS_OPTIONS,
  INPUT_TYPE_OPTIONS,
  PUBLISH_STATUS_OPTIONS,
} from '@/app/admin/_constants/labels'
import { RecommendTabId } from '@/app/admin/recommend/_types'
import AdminFilterIcon from '@/assets/icons/adminFilter.svg'
import Button from '@/components/common/Button'

interface AdminRecommendFilterProps {
  activeTab: RecommendTabId
  statusVal: string | null
  inputTypeVal: string | null
  onFilterChange: (key: string, val: string) => void
  onReset: () => void
}

export function AdminRecommendFilter({
  activeTab,
  statusVal,
  inputTypeVal,
  onFilterChange,
  onReset,
}: AdminRecommendFilterProps) {
  const statusOptions =
    activeTab === 'product-pools'
      ? ADOPTION_STATUS_OPTIONS
      : PUBLISH_STATUS_OPTIONS
  const statusLabel = activeTab === 'product-pools' ? '채택상태' : '발행상태'

  const hasActiveFilter =
    (!!statusVal && statusVal !== 'all') ||
    (!!inputTypeVal && inputTypeVal !== 'all')

  return (
    <div className="border-gray-light bg-gray-white mb-6 flex items-center gap-4 rounded-xl border px-5 py-3">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <AdminFilterIcon width={20} height={20} />
        <span>필터</span>
      </div>

      <div className="bg-gray-light h-5 w-px" />

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium whitespace-nowrap">
            {statusLabel}
          </span>
          <AdminSelect
            options={statusOptions}
            value={statusVal ?? 'all'}
            onChange={(val) => onFilterChange('status', val)}
            width="w-28"
          />
        </div>

        {activeTab === 'blend-maps' && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium whitespace-nowrap">유형</span>
            <AdminSelect
              options={INPUT_TYPE_OPTIONS}
              value={inputTypeVal ?? 'all'}
              onChange={(val) => onFilterChange('input_type', val)}
              width="w-28"
            />
          </div>
        )}
      </div>

      {hasActiveFilter && (
        <Button
          type="button"
          size="w32h32"
          onClick={onReset}
          className="hover:bg-gray-light hover:text-gray-primary flex items-center rounded-full"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </Button>
      )}
    </div>
  )
}
