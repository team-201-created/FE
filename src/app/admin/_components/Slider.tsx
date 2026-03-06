'use client'

import React from 'react'
import { cn } from '@/lib/cn'
import Input from '@/components/common/Input'

interface SliderProps {
  label?: string
  min: number
  max: number
  step?: number
  value: number
  onChange: (value: number) => void
  helperText?: string
  className?: string
}

const Slider = ({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  helperText,
  className,
}: SliderProps) => {
  // 범위를 벗어나지 않는 값 계산
  const clampedValue = Math.min(Math.max(value, min), max)

  const percentage = ((clampedValue - min) / (max - min)) * 100

  // 핸들러: 숫자 인풋 입력 시
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)
    // max만 즉시 제한 하기
    if (val <= max) {
      // 소숫점 들어오면 반올림
      const steppedValue = Math.round(val / step) * step
      onChange(steppedValue)
    }
  }

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)
    // 이미 max 제한 했으니 값이 범위 안에 있으면 두고 min보다 작으면 보장 및 빈 값 체크
    if (val < min || isNaN(val)) onChange(min)
  }

  // 핸들러: 슬라이더 바 조작 시
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value))
  }

  return (
    <div
      className={cn('flex w-full flex-col gap-2', className)}
      style={{ '--progress': `${percentage}%` } as React.CSSProperties}
    >
      <div className="flex items-center justify-between">
        {label && <label className="px-1 font-bold">{label}</label>}
        <Input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="[&]:bg-gray-light h-8 w-20 px-2 py-0.5 text-right font-bold [&]:border-none [&::-webkit-inner-spin-button]:appearance-none"
          wrapperClassName="w-auto"
        />
      </div>

      {/* 눈에 보일 슬라이더 */}
      <div className="group relative flex h-6 items-center">
        <div className="absolute h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="bg-black-primary h-full origin-left transition-transform duration-150 ease-out"
            style={{ transform: 'scaleX(calc(var(--progress)))' }}
          />
        </div>

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={clampedValue}
          onChange={handleSliderChange}
          className="absolute z-10 h-full w-full cursor-pointer opacity-0"
        />

        {/* 포인터 */}
        <div
          className="border-black-primary pointer-events-none absolute h-4 w-4 rounded-full border-2 bg-white transition-transform duration-150 ease-out group-hover:scale-110"
          style={{
            left: 'var(--progress)',
            transform: 'translateX(-50%)',
          }}
        />
      </div>

      <div className="flex justify-between px-1">
        <span className="text-[10px] font-medium text-gray-500">{min}</span>
        <span className="text-[10px] font-medium text-gray-500">{max}</span>
      </div>

      {helperText && (
        <span className="px-1 text-xs text-gray-400 italic">{helperText}</span>
      )}
    </div>
  )
}

export default Slider
