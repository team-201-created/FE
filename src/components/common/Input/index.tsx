import React, { forwardRef } from 'react'
import { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'
import { inputVariants, helperVariants } from './Input.variants'

export interface InputProps
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string
  helperText?: string
  wrapperClassName?: string // Input wrapper 클래스 네임을 받아서 더 커스텀할 css를 받을 수 있게끔
  labelClassName?: string // Input label 클래스 네임을 받아서 더 커스텀할 css를 받을 수 있게끔
  helperClassName?: string // Input helper 클래스 네임을 받아서 더 커스텀할 css를 받을 수 있게끔
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      status,
      label,
      helperText,
      wrapperClassName,
      labelClassName,
      helperClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('flex w-full flex-col gap-1.5', wrapperClassName)}>
        {label && (
          <label
            className={cn(
              'text-black-secondary px-1 text-sm font-medium',
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        <input
          className={cn(inputVariants({ status, className }))}
          ref={ref}
          {...props}
        />
        {helperText && (
          <span
            className={cn(
              helperVariants({ status, className: helperClassName })
            )}
          >
            {helperText}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
